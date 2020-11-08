﻿using System;
using System.Collections.Generic;

namespace CilJs.JSAst
{
    class JSArrayLookupExpression: JSExpression
    {
        private JSExpression _Array;
        public JSExpression Array
        {
            get
            {
                return _Array;
            }
            set
            {
                if (value == null)
                    throw new InvalidOperationException();
                _Array = value;
            }
        }
        private JSExpression _Indexer;
        public JSExpression Indexer
        {
            get
            {
                return _Indexer;
            }
            set
            {
                if (value == null)
                    throw new InvalidOperationException();
                _Indexer = value;
            }
        }

        public override void Emit(Emitter emitter)
        {
            if (Array is JSIdentifier)
                emitter.Emit(Array);
            else
                emitter.EmitParenthesized(Array);
            emitter.EmitBracketed(Indexer);
        }

        public override IEnumerable<JSExpression> GetChildren()
        {
            yield return Array;
            yield return Indexer;
        }
    }
}
