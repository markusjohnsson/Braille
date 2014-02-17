using Braille.JSAst;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Braille.MethodTransform
{
    class FrameToAstTransform
    {
        public IEnumerable<JSStatement> Process(Frame frame)
        {
            var opc = frame.Instruction.OpCode.Name;

            switch (opc)
            {
                case "br":
                case "br.s":
                    yield return new JSStatement
                    {
                        Expression = new JSBinaryExpression
                        {
                            Left = new JSIdentifier
                            {
                                Name = "__braille_pos__"
                            },
                            Operator = "=",
                            Right = new JSNumberLiteral { Value = GetTargetPosition(frame.Instruction) }
                        }
                    };
                    yield return new JSStatement
                    {
                        Expression = new JSContinueExpression()
                    };
                    break;

                case "beq":
                case "beq.s":
                    yield return CreateComparisonBranch(frame, "=");
                    break;

                case "bge":
                case "bge.s":
                    yield return CreateComparisonBranch(frame, ">=");
                    break;

                case "bgt":
                case "bgt.s":
                    yield return CreateComparisonBranch(frame, ">");
                    break;

                case "ble":
                case "ble.s":
                    yield return CreateComparisonBranch(frame, "<=");
                    break;

                case "blt":
                case "blt.s":
                    yield return CreateComparisonBranch(frame, "<");
                    break;

                case "brtrue":
                    yield return new JSIfStatement
                    {
                        Condition = ProcessInternal(frame.Values.Single()),
                        Statements = {
                            new JSStatement
                            {
                                Expression = new JSBinaryExpression
                                {
                                    Left = new JSIdentifier
                                    {
                                        Name = "__braille_pos__"
                                    },
                                    Operator = "=",
                                    Right = new JSNumberLiteral { Value = GetTargetPosition(frame.Instruction) }
                                }
                            },
                            new JSStatement
                            {
                                Expression = new JSContinueExpression()
                            }       
                        }
                    };
                    break;
                case "switch":

                    yield return new JSStatement
                    {
                        Expression = new JSVariableDelcaration
                        {
                            Name = "__braille_switch_value__",
                            Value = ProcessInternal(frame.Values.Single())
                        }
                    };
                    yield return new JSIfStatement
                    {
                        Condition = new JSBinaryExpression
                        {
                            Left = new JSIdentifier { Name = "__braille_switch_value__" },
                            Operator = ">=",
                            Right = new JSNumberLiteral { Value = ((int[])frame.Instruction.Data).Length }
                        },
                        Statements = {
                            new JSStatement
                            {
                                Expression = new JSBinaryExpression
                                {
                                    Left = new JSIdentifier
                                    {
                                        Name = "__braille_pos__"
                                    },
                                    Operator = "=",
                                    Right = new JSNumberLiteral { Value = GetTargetPosition(frame.Instruction) }
                                }
                            },
                            new JSStatement
                            {
                                Expression = new JSContinueExpression()
                            }       
                        }
                    };
                    yield return new JSStatement
                    {
                        Expression = new JSVariableDelcaration
                        {
                            Name = "__braille_jmp__",
                            Value = new JSArrayLiteral { Values = ((int[])frame.Instruction.Data).Select(d => new JSNumberLiteral { Value = d }) }
                        }
                    };
                    yield return new JSStatement
                    {
                        Expression = new JSBinaryExpression
                        {
                            Left = new JSIdentifier
                            {
                                Name = "__braille_pos__"
                            },
                            Operator = "=",
                            Right = new JSBinaryExpression
                            {
                                Left = new JSNumberLiteral { Value = GetTargetPosition(frame.Instruction) },
                                Operator = "+",
                                Right = new JSArrayLookupExpression
                                {
                                    Array = new JSIdentifier { Name = "__braille_jmp__" },
                                    Indexer = new JSIdentifier { Name = "__braille_switch_value__" }
                                }
                            }
                        }
                    };
                    yield return new JSStatement
                    {
                        Expression = new JSContinueExpression()
                    };
                    break;

                default:
                    yield return new JSStatement { Expression = ProcessInternal(frame) };
                    break;
            }

        }

        private JSIfStatement CreateComparisonBranch(Frame frame, string op)
        {
            return new JSIfStatement
            {
                Condition = new JSBinaryExpression
                {
                    Left = ProcessInternal(frame.Values.First()),
                    Right = ProcessInternal(frame.Values.Last()),
                    Operator = "==="
                },
                Statements = {
                            new JSStatement
                            {
                                Expression = new JSBinaryExpression
                                {
                                    Left = new JSIdentifier
                                    {
                                        Name = "__braille_pos__"
                                    },
                                    Operator = op,
                                    Right = new JSNumberLiteral { Value = GetTargetPosition(frame.Instruction) }
                                }
                            },
                            new JSStatement
                            {
                                Expression = new JSContinueExpression()
                            }       
                        }
            };
        }

        private double GetTargetPosition(ILInstruction i)
        {
            int data;
            if (i.Data is byte)
                data = (byte)i.Data;
            else if (i.Data is int)
                data = (int)i.Data;
            else
                data = 0;

            return 1 + i.Position + i.Size + data;
        }

        private JSExpression ProcessInternal(Frame frame)
        {
            if (frame == null || frame.Instruction == null)
                return new JSEmptyExpression();

            //if (frame.Instruction == null && frame.Handler != null )
            //{
            //    return new JSIdentifier { Name = "__braille_exception__" };
            //}

            var opc = frame.Instruction.OpCode.Name;

            var i = opc.IndexOf(".");
            var opc_ = i > 0 ? opc.Substring(0, i) : opc;

            switch (opc_)
            {
                case "add":
                    return new JSBinaryExpression
                    {
                        Left = ProcessInternal(frame.Values.First()),
                        Right = ProcessInternal(frame.Values.Last()),
                        Operator = "+"
                    };
                case "call":
                    {
                        var mi = ((MethodInfo)frame.Instruction.Data);
                        return new JSCallExpression
                        {
                            Function = new JSIdentifier { Name = mi.DeclaringType.FullName + "." + mi.Name },
                            Arguments = ProcessList(frame.Values)
                        };
                    }
                case "callvirt":
                    {
                        var mi = ((MethodInfo)frame.Instruction.Data);
                        return new JSCallExpression
                        {
                            Function = new JSIdentifier { Name = mi.DeclaringType.FullName + "." + mi.Name },
                            Arguments = ProcessList(frame.Values)
                        };
                    }
                case "ceq":
                    return new JSConditionalExpression
                    {
                        Condition = new JSBinaryExpression
                        {
                            Left = ProcessInternal(frame.Values.First()),
                            Right = ProcessInternal(frame.Values.Last()),
                            Operator = "==="
                        },
                        TrueValue = new JSNumberLiteral { Value = 1 },
                        FalseValue = new JSNumberLiteral { Value = 0 }
                    };
                case "cgt":
                    return new JSConditionalExpression
                    {
                        Condition = new JSBinaryExpression
                        {
                            Left = ProcessInternal(frame.Values.First()),
                            Right = ProcessInternal(frame.Values.Last()),
                            Operator = ">"
                        },
                        TrueValue = new JSNumberLiteral { Value = 1 },
                        FalseValue = new JSNumberLiteral { Value = 0 }
                    };
                case "clt":
                    return new JSConditionalExpression
                    {
                        Condition = new JSBinaryExpression
                        {
                            Left = ProcessInternal(frame.Values.First()),
                            Right = ProcessInternal(frame.Values.Last()),
                            Operator = "<"
                        },
                        TrueValue = new JSNumberLiteral { Value = 1 },
                        FalseValue = new JSNumberLiteral { Value = 0 }
                    };
                case "endfinally":
                    return new JSEmptyExpression();
                case "ldarg":
                    return new JSIdentifier
                    {
                        Name = "arguments[" + opc.Substring("ldarg.".Length) + "]"
                    };
                case "ldc":
                    if (opc == "ldc.i4")
                        return new JSNumberLiteral
                        {
                            Value = (int)frame.Instruction.Data
                        };
                    else if (opc == "ldc.i4.s")
                        return new JSNumberLiteral
                        {
                            Value = (int)(byte)frame.Instruction.Data
                        };
                    else if (opc == "ldc.i4.m1")
                        return new JSNumberLiteral
                        {
                            Value = -1
                        };
                    else //if (opc.StartsWith("ldc.i4"))
                        return new JSNumberLiteral
                        {
                            Value = int.Parse(opc.Substring("ldc.i4.".Length))
                        };
                case "ldfld":
                    return new JSIdentifier
                    {
                        Name = "this['" + (string)((FieldInfo)frame.Instruction.Data).Name + "']"
                    };
                case "ldloc":
                    {
                        var id = "";
                        if (frame.Instruction.Data != null)
                            id = frame.Instruction.Data.ToString();

                        return new JSIdentifier
                        {
                            Name = opc.Substring(2).Replace(".s", ".").Replace(".", "") + id
                        };
                    }
                case "ldloca":
                    {
                        var id = "";
                        if (frame.Instruction.Data != null)
                            id = frame.Instruction.Data.ToString();

                        return new JSIdentifier
                        {
                            Name = opc.Substring(2).Replace("a.", ".").Replace(".s", ".").Replace(".", "") + id
                        };
                    }
                case "ldstr":
                    return new JSStringLiteral
                    {
                        Value = (string)frame.Instruction.Data
                    };
                case "leave":
                    return new JSEmptyExpression();
                case "mul":
                    return new JSBinaryExpression
                    {
                        Left = ProcessInternal(frame.Values.First()),
                        Right = ProcessInternal(frame.Values.Last()),
                        Operator = "*"
                    };
                case "newobj":
                    var ctor = (ConstructorInfo)frame.Instruction.Data;
                    return new JSNewExpression
                    {
                        Constructor = new JSIdentifier { Name = ctor.DeclaringType.FullName },
                        Arguments = ProcessList(frame.Values)
                    };
                case "nop":
                    return new JSEmptyExpression();
                case "pop":
                    return ProcessInternal(frame.Values.Single());
                case "ret":
                    return new JSReturnExpression
                    {
                        Expression = ProcessInternal(frame.Values.SingleOrDefault())
                    };
                case "stloc":
                    return new JSVariableDelcaration
                    {
                        Name = opc.Substring(2).Replace(".", ""),
                        Value = ProcessInternal(frame.Values.Single())
                    };
                case "stfld":
                    return new JSBinaryExpression
                    {
                        Left = new JSArrayLookupExpression
                        {
                            Array = ProcessInternal(frame.Values.First()),
                            Indexer = new JSIdentifier
                            {
                                Name = (string)((FieldInfo)frame.Instruction.Data).Name
                            }
                        },
                        Right = ProcessInternal(frame.Values.Last()),
                        Operator = "="
                    };
                case "sub":
                    return new JSBinaryExpression
                    {
                        Left = ProcessInternal(frame.Values.First()),
                        Right = ProcessInternal(frame.Values.Last()),
                        Operator = "-"
                    };
                case "brtrue":
                case "brfalse":
                case "switch":
                default:
                    return new JSLineComment
                    {
                        Text = opc + ": opcode not implmented"
                    };
            }
        }

        private IEnumerable<JSExpression> ProcessList(IEnumerable<Frame> list)
        {
            foreach (var i in list)
                yield return ProcessInternal(i);
        }
    }
}