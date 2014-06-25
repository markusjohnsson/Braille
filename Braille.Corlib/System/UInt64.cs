using System.Runtime.CompilerServices;
using Braille.Runtime.TranslatorServices;

namespace System
{
    public struct UInt64
    {
        public override string ToString()
        {
            var a = this;
            var ten = 10UL;

            var s = "";

            do
            {
                var r = a % ten;
                s = GetLowString(a);
                a = a / ten;
            } while (a > 0);

            return s;
        }

        [JsReplace("{0}[0].toString()")]
        private static extern string GetLowString(ulong a);    

        [JsAssemblyStatic(Name = "UInt64_RightShift")]
        [JsImport(@"
            function (lhs, rhs) {
                n = n & 0x3f;

                if (n > 32) {
                    return asm0.UInt64_RightShift(
                        asm0.UInt64_RightShift(a, 32), n - 32);
                }

                var m = (1 << n) - 1;

                var br = (a[1] & m) << (32 - n);
                var bt = a[1] >>> n;
                var at = a[0] >>> n;

                return new Uint32Array([ at | br, bt ]);
            }")]
        public extern static ulong operator >>(ulong lhs, int n);

        [JsAssemblyStatic(Name = "UInt64_Division")]
        [JsImport(@"
            function UInt64_Division(n, d) {

                if (d[0] == 0 && d[1] == 0)
                    throw new Error('System.DivideByZeroException');
      
                var q = new Uint32Array([0, 0]);
                var r = new Uint32Array([0, 0]);

                for (var i = 63; i >= 0; i--) {
                    r = asm0.XInt64_LeftShift(r, 1);

                    var li = i < 32 ? 0 : 1;
                    var s = (i - 32 * li);

                    r[0] |= (n[li] & (1 << s)) >>> s;

                    if (asm0.UInt64_GreaterThanOrEqual(r, d)) {
                        r = asm0.XInt64_Subtraction(r, d);
                        q[li] |= 1 << s;
                    }
                }

                return q;    
            }")]
        public extern static ulong operator /(ulong n, ulong d);

        [JsAssemblyStatic(Name = "XInt64_Multiplication")]
        [JsImport(@"
            function XInt64_GreaterThan(a, b) {
                if (a[0] == 0 && a[1] == 0)
                    return a;

                if (b[0] == 0 && b[1] == 0)
                    return b;

                if (asm0.UInt64_GreaterThan(a, b))
                    return asm0.XInt64_Multiplication(b, a);

                var s = new Uint32Array([0, 0]);

                if (a[0] & 1 == 1) {
                    s[0] = b[0];
                    s[1] = b[1];
                }

                var l = new Uint32Array([1, 0]);

                while (!asm0.XUint64_Equality(a, l)) {
                    a = asm0.XInt64_RightShift(a, 1);
                    b = asm0.XInt64_LeftShift(b, 1);

                    if (a[0] & 1 == 1)
                        s = asm0.Xint64_Addition(b, s);
                }

                return s;
            }")]
        public extern static ulong operator *(ulong a, ulong b);

        public const ulong MAX_VALUE = 0xffffffffffffffff;
    }
}