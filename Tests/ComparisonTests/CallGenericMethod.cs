﻿
public interface I<T> { T Prop { get; set; } }

public class A<T> : I<T>
{
    public T Prop
    {
        get; set;
    }
}

public class Program
{
    public static void Main()
    {
        Y(123);
        Y("Hello");
    }

    public static void Y<T>(T t)
    {
        X(new A<T>() { Prop = t });
    }

    public static void X<T>(I<T> t)
    {
        System.Console.WriteLine(t.Prop);
    }
}
