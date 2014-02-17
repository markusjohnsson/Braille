using Braille.AssemblyTransform;
using Braille.JSAst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Braille.MethodTransform
{
    class InsertFrameLabelsTask
    {
        public void Process(IEnumerable<Frame> method)
        {
            InternalProcess(method);
        }

        private void InternalProcess(IEnumerable<Frame> method)
        {
            foreach (var f in method)
            {
                switch (f.Instruction.OpCode.Name)
                {
                    case "br":
                    case "br.s":
                    case "beq":
                    case "beq.s":
                    case "bge":
                    case "bge.s":
                    case "bgt":
                    case "bgt.s":
                    case "ble":
                    case "ble.s":
                    case "blt":
                    case "blt.s":
                    case "bne":
                    case "bne.s":
                    case "brtrue":
                    case "brfalse":
                        {
                            var targetPosition = GetTargetPosition(f.Instruction);
                            var targetFrame = method.Where(f2 => f2.ContainsPosition(targetPosition)).First();
                            targetFrame.IsLabel = true;
                        }
                        break;
                    case "switch":
                        var i = f.Instruction;
                        var switchEndPosition = 1 + i.Position + i.Size;
                        var frameAfterSwitch = method.Where(f2 => f2.ContainsPosition(switchEndPosition)).First();
                        frameAfterSwitch.IsLabel = true;
                        foreach (var targetOffset in (int[])f.Instruction.Data)
                        {
                            var targetPosition = 1 + i.Position + i.Size + targetOffset;
                            var targetFrame = method.Where(f2 => f2.ContainsPosition(targetPosition)).First();
                            targetFrame.IsLabel = true;
                        }
                        break;
                }
            }
        }

        private int GetTargetPosition(ILInstruction i)
        {
            int data;
            if (i.Data is byte)
                data = (byte)i.Data;
            else
                data = (int)i.Data;

            return 1 + i.Position + i.Size + data;
        }

    }
}
