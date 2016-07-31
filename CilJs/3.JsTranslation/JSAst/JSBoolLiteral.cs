﻿using System.Collections.Generic;

namespace CilJs.JSAst
{
    class JSBoolLiteral: JSExpression
    {
        public bool Value { get; set; }

        public override void Emit(Emitter emitter)
        {
            if (Value)
                emitter.EmitString("true");
            else
                emitter.EmitString("false");
        }

        public override IEnumerable<JSExpression> GetChildren()
        {
            yield break;
        }
    }
}
