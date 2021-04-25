using System.Runtime.CompilerServices;
using CilJs.Runtime.TranslatorServices;

namespace System
{
    public struct Int32 : IComparable<int>, IComparable, IEquatable<Int32>
    {
        public const int MaxValue = 0x7fffffff;
        public const int MinValue = -2147483648;

        public override string ToString()
        {
            return InternalFormatting.SignedPrimitiveToString(this);
        }

        [JsReplace("CILJS.newString({0}.toString(16))")]
        private static extern string toHex(int n);

        public string ToString(string p)
        {
            int n = this;

            if (p == "X")
                return toHex(n);

            throw new NotSupportedException();
        }

        public int CompareTo(object p)
        {
            return CompareTo((int)p);
        }

        public int CompareTo(int p)
        {
            int n = this;

            if (n < p)
                return -1;

            if (n > p)
                return 1;

            return 0;
        }

        public override bool Equals(object other)
        {
            if (!(other is int))
                return false;
            return Equals((int)other);
        }

        public bool Equals(int other)
        {
            var a = this;
            var b = other;
            return a == b;
        }

        public override int GetHashCode()
        {
            return (int)this;
        }

        [JsReplace("parseInt({0}.jsstr)")]
        public static extern int Parse(string s);
    }
}
