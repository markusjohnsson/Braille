﻿
class A 
{
    public override string ToString() { return "A"; }
}
class B
{
    public override string ToString() { return "B"; }
}

class X
{
    public static readonly A Prop = new A();
}

class Y<T> where T : new()
{
    public static readonly object Prop = new T();
}

delegate T2 Func<T1, T2>(T1 t);

class P<T>
{
    public static readonly Func<T, bool> Always = (t) => true;
}

delegate bool Func (object o);
class Q
{
    public static readonly Func Always = (o) => true;
}
class Program
{
    public static void Main()
    {
        Is(X.Prop);
        Is(Y<object>.Prop);
        Is(Y<A>.Prop);
        Is(Y<B>.Prop);
        System.Console.WriteLine(Q.Always(null));
        System.Console.WriteLine(Q.Always(null));
    }

    public static void Is(object o)
    {
        System.Console.WriteLine(o.ToString());
        System.Console.WriteLine(o is A);
        System.Console.WriteLine(o is B);
    }
}
