using System.Runtime.CompilerServices;
using Braille.Runtime.TranslatorServices;

namespace System
{
    public struct Char
    {
        public const char MinValue = (char)0;
        public const char MaxValue = (char)65535;

        public override string ToString()
        {
            return ToStringImpl(this);
        }

        [JsImport("function(o) { return new_string(String.fromCharCode(o.boxed)); }")]
        private extern static string ToStringImpl(object o);

        [JsImport("function(o) { return \"0123456789\".indexOf(String.fromCharCode(o.boxed)) != -1; }")]
        public extern static bool IsDigit(char p);
    }
}
