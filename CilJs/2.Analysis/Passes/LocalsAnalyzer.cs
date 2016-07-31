using CilJs.Analysis.Passes;
using CilJs.Ast;
using Managed.Reflection;
using System.Collections.Generic;
using System.Linq;

namespace CilJs.Analysis
{
    class LocalInfo
    {
        public bool IsUsed = false;
        public bool IsAssigned = false;

        public LocalVariableInfo ReflectionObject { get; set; }

        public bool NeedInit { get; set; }
    }

    class LocalsAnalyzer: IAnalysisPass
    {
        public void Run(CilMethod method)
        {
            IList<OpExpression> infos = method.OpTree;

            method.Locals = method
                .MethodBody
                .LocalVariables
                .Select(v => new LocalInfo { ReflectionObject = v })
                .ToArray();

            // TODO: this is probably not enough. need to do proper flow analysis. 

            foreach (var op in infos)
            {
                if (op.Instruction.OpCode.Name.StartsWith("stloc"))
                {
                    int id;
                    if (op.Instruction.Data != null)
                        id = int.Parse(op.Instruction.Data.ToString());
                    else
                        id = int.Parse(op.Instruction.OpCode.Name.Substring(5).Replace(".s", ".").Replace(".", ""));

                    method.Locals[id].IsAssigned = true;
                }
                else if (op.Instruction.OpCode.Name.StartsWith("ldloc"))
                {
                    int id;
                    if (op.Instruction.Data != null)
                        id = int.Parse(op.Instruction.Data.ToString());
                    else
                        id = int.Parse(op.Instruction.OpCode.Name.Substring(5).Replace(".s", ".").Replace(".", ""));

                    method.Locals[id].IsUsed = true;

                    if (!method.Locals[id].IsAssigned)
                        method.Locals[id].NeedInit = true;
                }
            }
        }
    }
}
