﻿
using System;
using System.Runtime.InteropServices;

public struct A
{
    public int x;
}

public struct B
{
    public A a;
    public C c;
}

public class C { }

public class Program
{
    private static C c1;
    private static C c2;

    public static void Main()
    {
        TestA(new A());
        TestA(new A { x = 0 });
        TestA(new A { x = 123 });
        TestA(new A { x = 321 });
        TestA(default(A));
        TestA(default(B).a);

        c1 = new C();
        TestB(new B());
        TestB(new B { a = new A { x = 123 } });
        TestB(new B { a = new A { x = 123 }, c = null });
        TestB(new B { a = new A { x = 123 }, c = c1 });
        TestB(new B { a = new A { x = 123 }, c = c2 });
        TestB(new B { a = new A { x = 123 }, c = new C() });
        TestB(new B { a = new A { x = 22 } });
        TestB(new B { a = new A { x = 22 }, c = null });
        TestB(new B { a = new A { x = 22 }, c = c1 });
        TestB(new B { a = new A { x = 22 }, c = c2 });
        TestB(new B { a = new A { x = 22 }, c = new C() });
    }

    public static void TestA(A a)
    {
        A a2 = new A { x = 321 };
        A a3 = default(A);
        A a4 = new A();
        System.Console.WriteLine(a.Equals(a2));
        System.Console.WriteLine(a.Equals(a3));
        System.Console.WriteLine(a.Equals(a4));
        System.Console.WriteLine(Object.ReferenceEquals(a, a2));
        System.Console.WriteLine(Object.ReferenceEquals(a, a3));
        System.Console.WriteLine(Object.ReferenceEquals(a, a4));
    }

    public static void TestB(B b)
    {
        var b2 = new B {a = new A {x = 123}};
        var b3 = default(B);
        var b4 = new B {a = new A {x = 22}, c = c1};
        System.Console.WriteLine(b.Equals(b2));
        System.Console.WriteLine(b.Equals(b3));
        System.Console.WriteLine(b.Equals(b4));
        System.Console.WriteLine(Object.ReferenceEquals(b, b2));
        System.Console.WriteLine(Object.ReferenceEquals(b, b3));
        System.Console.WriteLine(Object.ReferenceEquals(b, b4));

    }
}