﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CilJs.JSAst
{
    class JSIfStatement : JSStatement
    {
        public JSIfStatement()
        {
            Statements = new List<JSStatement>();
        }

        public JSExpression Condition { get; set; }

        public List<JSStatement> Statements { get; set; }
        public List<JSStatement> ElseStatements { get; set; }

        public override void Emit(Emitter emitter)
        {
            emitter.EmitNewLineAndIndentation();
            emitter.EmitString("if ");
            emitter.EmitParenthesized(Condition);
            emitter.EmitString("{");

            emitter.Formatting.IncreaseIndentation();

            if (Statements != null)
            {
                foreach (var s in Statements)
                {
                    emitter.EmitNewLineAndIndentation();
                    emitter.Emit(s);
                }
            }

            emitter.Formatting.DecreaseIndentation();

            emitter.EmitNewLineAndIndentation();
            emitter.EmitString("}");

            if (ElseStatements != null) 
            {
                emitter.EmitNewLineAndIndentation();
                emitter.EmitString("else {");

                emitter.Formatting.IncreaseIndentation();

                foreach (var s in ElseStatements)
                {
                    emitter.EmitNewLineAndIndentation();
                    emitter.Emit(s);
                }

                emitter.Formatting.DecreaseIndentation();

                emitter.EmitNewLineAndIndentation();
                emitter.EmitString("}");
            }
        }

        public override IEnumerable<JSExpression> GetChildren()
        {
            yield return Condition;

            if (Statements != null)
            {
                foreach (var s in Statements)
                    yield return s;
            }
        }
    }
}
