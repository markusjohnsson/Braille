using CilJs.Ast;
using CilJs.Loading.Model;
using System.Collections.Generic;
using System.Linq;

namespace CilJs.Analysis.Passes
{
    public static class StackExtensions
    {
        public static IEnumerable<T> Pop<T>(this Stack<T> s, int n)
        {
            for (var i = 0; i < n; i++)
                yield return s.Pop();
        }
    }

    class AggregateExpressionsPass : IAnalysisPass
    {
        private Context ctx;

        public AggregateExpressionsPass(Context ctx)
        {
            this.ctx = ctx;
        }

        class span { public OpExpression from; public OpExpression to; }

        public void Run(CilMethod method)
        {
            ProcessBlock(method, method.Block);
        }

        private static void ProcessBlock(CilMethod method, Block block)
        {
            var spans = GetExpressionSpans(block).ToList();

            foreach (var span in spans)
            {
                // Debug.WriteLine("span: IL_{0:X} - IL_{1:X}", span.from.Instruction.Position, span.to.Instruction.Position);

                block.Ast.ReplaceRange(
                    from: span.from,
                    to: span.to,
                    replacement: AggregateExpression(method, block, span));
            }

            foreach (var subblock in GetBlocks(block.Ast))
                ProcessBlock(method, subblock);
        }

        private static IEnumerable<Block> GetBlocks(List<Node> list)
        {
            foreach (var item in list)
            {
                if (item is Block)
                    yield return item as Block;

                var pr = item as ProtectedRegion;
                if (pr != null)
                {
                    yield return pr.TryBlock;
                    foreach (var b in pr.CatchBlocks)
                        yield return b;
                    if (pr.FaultBlock != null)
                        yield return pr.FaultBlock;
                    if (pr.FinallyBlock != null)
                        yield return pr.FinallyBlock;
                }
            }
        }

        private static Node[] AggregateExpression(CilMethod method, Block block, span span)
        {
            var original = block.Ast.GetRange(span.from, span.to).Cast<OpExpression>().ToList();

            var stack = new Stack<Node>();

            Node last = null;

            foreach (var op in original)
            {
                var popCount = op.GetRealPopCount();
                if (popCount > 0)
                    op.Arguments = stack.Pop(popCount).Reverse().ToList();

                var pushCount = op.PushCount;
                if (pushCount > 0)
                    stack.Push(op);

                last = op;
            }

            Node[] result;
            if (stack.Any() && stack.Peek() == last)
                result = stack.Reverse().ToArray();
            else
                result = stack.Reverse().EndWith(last).ToArray();

            // check result and bail if not correct..
            //var resultNodes = result
            //    .Cast<OpExpression>()
            //    .SelectMany(node => node.PrefixTraversal())
            //    .Cast<OpInstruction>()
            //    .ToList();

            //if (original.Select(o => o.Instruction).Any(originalNode => resultNodes.Contains(originalNode) == false))
            //{
            //    Debug.WriteLine("Bailing expression aggregation");
            //    result = original.Cast<Node>().ToArray();
            //}

            return result;
        }

        private static IEnumerable<span> GetExpressionSpans(Block block)
        {
            OpExpression start = null;

            OpExpression prev = null;

            foreach (var node in block.Ast)
            {
                var expr = node as OpExpression;

                if (expr == null || expr.PushCount > 1)
                {
                    start = null;
                }
                else if (expr.PushCount == 0)
                {
                    if (start != null && prev != null && start != expr)
                        yield return new span { from = start, to = expr };

                    start = null;
                }
                else if (expr.StackBefore.Count == 0)
                {
                    if (start != null && prev != null && start != prev)
                        yield return new span { from = start, to = prev };

                    start = expr;
                }

                prev = expr;
            }

            if (start != null && prev != null && start != prev)
                yield return new span { from = start, to = prev };

        }
    }
}
