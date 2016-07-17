
using CilJs.JSAst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CilJs.Analysis;
using CilJs.Ast;

namespace CilJs.JsTranslation
{
    class BlockBuilder
    {
        public List<JSStatement> Statements = new List<JSStatement>();

        private int depth;
        public int Depth
        {
            get
            {
                return depth;
            }
        }

        private bool hasBranching; // mutable, refactor?

        private readonly int startPosition;
        private readonly int endPosition;
        private readonly bool hasFinally;
        private readonly bool isSubBlock;
        private readonly bool isFinally;

        public BlockBuilder(int depth, int startPosition, int endPosition, bool hasFinally, bool hasBranching, bool isSubBlock, bool isFinally)
        {
            this.depth = depth;
            this.startPosition = startPosition;
            this.endPosition = endPosition;
            this.hasFinally = hasFinally;
            this.hasBranching = hasBranching;
            this.isSubBlock = isSubBlock;
            this.isFinally = isFinally;
        }

        public IEnumerable<JSStatement> Build()
        {
            UpdatePositions();

            if (hasBranching)
            {
                yield return JSFactory.Statement(
                new JSVariableDelcaration
                {
                    Name = "in_block_" + Depth,
                    Value = new JSBoolLiteral { Value = true }
                });

                if (hasFinally)
                {
                    yield return JSFactory.Statement(
                        new JSVariableDelcaration
                        {
                            Name = "__finally_continuation_" + Depth + "__",
                            Value = new JSIdentifier { Name = "__pos__" }
                        });
                }

                if (depth == 0)
                {
                    yield return JSFactory.Statement(
                        new JSVariableDelcaration
                        {
                            Name = "__pos__",
                            Value = JSFactory.HexLiteral(0)
                        });
                }
                else
                {
                    // When control falls into the loop, __pos__ must be updated.
                    // We cannot do this unconditionally, however, b/c a jump could have occurred 
                    // that transferred control into the loop, not at the start position


                    if (isSubBlock)
                    {
                        yield return new JSIfStatement
                        {
                            Condition = new JSBinaryExpression
                            {
                                Left = JSFactory.Identifier("__pos__"),
                                Operator = ">",
                                Right = JSFactory.HexLiteral(endPosition)
                            },
                            Statements =
                            {
                                JSFactory.Statement(
                                    new JSVariableDelcaration
                                    {
                                        Name = "in_block_" + Depth,
                                        Value = new JSBoolLiteral { Value = false }
                                    })
                            }
                        };
                    }

                    if (isFinally)
                    {
                        yield return JSFactory.Statement(
                            new JSVariableDelcaration
                            {
                                Name = "__pos__",
                                Value = JSFactory.HexLiteral(startPosition)
                            });
                    }
                    else
                    {
                        yield return new JSIfStatement
                        {
                            Condition = new JSBinaryExpression
                            {
                                Left = JSFactory.Identifier("__pos__"),
                                Operator = "<",
                                Right = JSFactory.HexLiteral(startPosition)
                            },
                            Statements =
                            {
                                JSFactory.Statement(
                                    new JSVariableDelcaration
                                    {
                                        Name = "__pos__",
                                        Value = JSFactory.HexLiteral(startPosition)
                                    })
                            }
                        };
                    }
                }
                
                var body = new List<JSStatement>
                {
                    new JSSwitchStatement
                    {
                        Value = new JSIdentifier { Name = "__pos__" },
                        Statements = Statements
                    }
                };

                if (isFinally || isSubBlock)
                    body.Add(new JSBreakExpression().ToStatement());
                
                yield return new JSWhileLoopStatement
                {
                    Condition = new JSIdentifier { Name = "in_block_" + Depth },
                    Statements = body
                };
                
            }
            else
            {
                foreach (var stmnt in Statements
                    .Where(s => !(s is JSSwitchCase) && !((s is JSExpressionStatement) && (
                        ((JSExpressionStatement)s).Expression is JSBreakExpression))))
                {
                    yield return stmnt;
                }

            }
        }

        private void UpdatePositions()
        {
            var toRemove = new List<JSStatement>();

            foreach (var stmt in Statements)
            {
                foreach (var x in stmt.GetChildrenRecursive(_ => true))
                {
                    var ifier = x as JSIdentifier;

                    if (ifier != null && ifier.Name == "in_block")
                    {
                        if (hasBranching)
                        {
                            ifier.Name = "in_block_" + Depth;
                        }
                        else
                        {
                            toRemove.Add(stmt);
                        }
                    }

                    if (ifier != null && ifier.Name == "__finally_continuation__")
                    {
                        if (hasBranching)
                        {
                            ifier.Name = "__finally_continuation_" + Depth + "__";
                        }
                        else
                        {
                            toRemove.Add(stmt);
                        }
                    }
                }
            }

            Statements.RemoveAll(toRemove.Contains);
        }

        public void InsertLabel(JumpLabel label)
        {
            hasBranching = hasBranching || label.IntruducesBranching;

            Statements.Add(new JSSwitchCase { Value = new JSNumberLiteral { Value = label.Position, IsHex = true } });
        }

        public void InsertStatements(IEnumerable<JSStatement> statements)
        {
            Statements.AddRange(statements);
        }
    }
}
