var asm2; (function (asm)
{
    asm.FullName = "IsInstGenericSubclass.cs.ciljs, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    /*  A..ctor()*/
    asm.x6000001 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /*  B..ctor()*/
    asm.x6000002 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /*  C..ctor()*/
    asm.x6000003 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /*  C`1..ctor()*/
    asm.x6000004 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        asm2.x6000003(arg0);
        /* IL_06: ret */
        return ;
    };;
    /*  D..ctor()*/
    asm.x6000005 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        asm2.x6000004(arg0);
        /* IL_06: ret */
        return ;
    };;
    /*  E..ctor()*/
    asm.x6000006 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        asm2.x6000004(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* static System.Void Program.Main()*/
    asm.x6000007_init = function ()
    {
        (asm2.A().init)();
        (asm2.D().init)();
        (asm2.E().init)();
        (asm2.B().init)();
        asm.x6000007 = asm.x6000007_;
    };;
    asm.x6000007 = function ()
    {
        asm.x6000007_init.apply(this,arguments);
        return asm.x6000007_.apply(this,arguments);
    };;
    asm.x6000007_ = function Main()
    {
        var t0;
        var t1;
        var t2;
        var t3;
        CILJS.init_base_types();
        t0 = asm2.A();
        t1 = asm2.D();
        t2 = asm2.E();
        t3 = asm2.B();
        /* IL_00: call Void TestCreate[A]()*/
        (asm2.x6000008(asm2.A()))();
        /* IL_05: newobj Void .ctor()*/
        /* IL_0A: call Void Test1(C)*/
        asm2.x6000009(CILJS.newobj(t1,asm2.x6000005,[null]));
        /* IL_0F: newobj Void .ctor()*/
        /* IL_14: call Void Test1(C)*/
        asm2.x6000009(CILJS.newobj(t2,asm2.x6000006,[null]));
        /* IL_19: newobj Void .ctor()*/
        /* IL_1E: call Void Test2[A](C`1[A])*/
        (asm2.x600000a(asm2.A()))(CILJS.newobj(t1,asm2.x6000005,[null]));
        /* IL_23: newobj Void .ctor()*/
        /* IL_28: call Void Test2[B](C`1[B])*/
        (asm2.x600000a(asm2.B()))(CILJS.newobj(t2,asm2.x6000006,[null]));
        /* IL_2D: ret */
        return ;
    };
    /* static System.Void Program.TestCreate<T>()*/
    asm.x6000008_init = function (T)
    {
        return function ()
        {
            (asm2.D().init)();
            ((asm2)["C`1"](T).init)();
        };
    };;
    asm.x6000008 = function (T)
    {
        return function ()
        {
            (asm.x6000008_init(T).apply)(this,arguments);
            return (asm.x6000008_(T).apply)(this,arguments);
        };
    };;
    asm.x6000008_ = function (T)
    {
        return function TestCreate()
        {
            var t0;
            var t1;
            var t2;
            var loc0;
            t0 = asm2.D();
            t1 = T;
            t2 = (asm2)["C`1"](t1);
            /* IL_00: newobj Void .ctor()*/
            /* IL_05: castclass C`1[T]*/
            /* IL_0A: stloc.0 */
            loc0 = CILJS.cast_class(CILJS.newobj(t0,asm2.x6000005,[null]),t2);
            /* IL_0B: ldloc.0 */
            /* IL_0C: call Void Test1(C)*/
            asm2.x6000009(loc0);
            /* IL_11: ldloc.0 */
            /* IL_12: call Void Test2[T](C`1[T])*/
            (asm2.x600000a(T))(loc0);
            /* IL_17: ret */
            return ;
        };
    };
    /* static System.Void Program.Test1(C)*/
    asm.x6000009_init = function ()
    {
        (asm2.A().init)();
        ((asm2)["C`1"](asm2.A()).init)();
        (asm2.B().init)();
        ((asm2)["C`1"](asm2.B()).init)();
        asm.x6000009 = asm.x6000009_;
    };;
    asm.x6000009 = function (arg0)
    {
        asm.x6000009_init.apply(this,arguments);
        return asm.x6000009_.apply(this,arguments);
    };;
    asm.x6000009_ = function Test1(arg0)
    {
        var t0;
        var t1;
        var t2;
        var t3;
        var t4;
        t0 = asm2.A();
        t1 = (asm2)["C`1"](t0);
        t2 = (asm0)["System.Boolean"]();
        t3 = asm2.B();
        t4 = (asm2)["C`1"](t3);
        /* IL_00: ldarg.0 */
        /* IL_01: isinst C`1[A]*/
        /* IL_06: ldnull */
        /* IL_08: cgt.un */
        /* IL_09: box System.Boolean*/
        /* IL_0E: call Void Log(System.Object)*/
        asm1.x6000001({
                'boxed': ((t1.IsInst(arg0) !== null) ? (1) : (0)),
                'type': t2,
                'vtable': t2.prototype.vtable,
                'ifacemap': t2.prototype.ifacemap
            });
        /* IL_13: ldarg.0 */
        /* IL_14: isinst C`1[B]*/
        /* IL_19: ldnull */
        /* IL_1B: cgt.un */
        /* IL_1C: box System.Boolean*/
        /* IL_21: call Void Log(System.Object)*/
        asm1.x6000001({
                'boxed': ((t4.IsInst(arg0) !== null) ? (1) : (0)),
                'type': t2,
                'vtable': t2.prototype.vtable,
                'ifacemap': t2.prototype.ifacemap
            });
        /* IL_26: ldarg.0 */
        /* IL_27: ldnull */
        /* IL_29: ceq */
        /* IL_2A: ldc.i4.0 */
        /* IL_2C: ceq */
        /* IL_2D: box System.Boolean*/
        /* IL_32: call Void Log(System.Object)*/
        asm1.x6000001({
                'boxed': ((((arg0 === null) ? (1) : (0)) === (0|0)) ? (1) : (0)),
                'type': t2,
                'vtable': t2.prototype.vtable,
                'ifacemap': t2.prototype.ifacemap
            });
        /* IL_37: ret */
        return ;
    };
    /* static System.Void Program.Test2<T>(C`1)*/
    asm.x600000a_init = function (T)
    {
        return function ()
        {
            (asm2.A().init)();
            ((asm2)["C`1"](asm2.A()).init)();
            (asm2.B().init)();
            ((asm2)["C`1"](asm2.B()).init)();
            asm.x600000a = asm.x600000a_;
        };
    };;
    asm.x600000a = function (T)
    {
        return function (arg0)
        {
            (asm.x600000a_init(T).apply)(this,arguments);
            return (asm.x600000a_(T).apply)(this,arguments);
        };
    };;
    asm.x600000a_ = function (T)
    {
        return function Test2(arg0)
        {
            var t0;
            var t1;
            var t2;
            var t3;
            var t4;
            t0 = asm2.A();
            t1 = (asm2)["C`1"](t0);
            t2 = (asm0)["System.Boolean"]();
            t3 = asm2.B();
            t4 = (asm2)["C`1"](t3);
            /* IL_00: ldarg.0 */
            /* IL_01: isinst C`1[A]*/
            /* IL_06: ldnull */
            /* IL_08: cgt.un */
            /* IL_09: box System.Boolean*/
            /* IL_0E: call Void Log(System.Object)*/
            asm1.x6000001({
                    'boxed': ((t1.IsInst(arg0) !== null) ? (1) : (0)),
                    'type': t2,
                    'vtable': t2.prototype.vtable,
                    'ifacemap': t2.prototype.ifacemap
                });
            /* IL_13: ldarg.0 */
            /* IL_14: isinst C`1[B]*/
            /* IL_19: ldnull */
            /* IL_1B: cgt.un */
            /* IL_1C: box System.Boolean*/
            /* IL_21: call Void Log(System.Object)*/
            asm1.x6000001({
                    'boxed': ((t4.IsInst(arg0) !== null) ? (1) : (0)),
                    'type': t2,
                    'vtable': t2.prototype.vtable,
                    'ifacemap': t2.prototype.ifacemap
                });
            /* IL_26: ldarg.0 */
            /* IL_27: ldnull */
            /* IL_29: ceq */
            /* IL_2A: ldc.i4.0 */
            /* IL_2C: ceq */
            /* IL_2D: box System.Boolean*/
            /* IL_32: call Void Log(System.Object)*/
            asm1.x6000001({
                    'boxed': ((((arg0 === null) ? (1) : (0)) === (0|0)) ? (1) : (0)),
                    'type': t2,
                    'vtable': t2.prototype.vtable,
                    'ifacemap': t2.prototype.ifacemap
                });
            /* IL_37: ldarg.0 */
            /* IL_38: ldnull */
            /* IL_3A: ceq */
            /* IL_3B: ldc.i4.0 */
            /* IL_3D: ceq */
            /* IL_3E: box System.Boolean*/
            /* IL_43: call Void Log(System.Object)*/
            asm1.x6000001({
                    'boxed': ((((arg0 === null) ? (1) : (0)) === (0|0)) ? (1) : (0)),
                    'type': t2,
                    'vtable': t2.prototype.vtable,
                    'ifacemap': t2.prototype.ifacemap
                });
            /* IL_48: ret */
            return ;
        };
    };
    /*  Program..ctor()*/
    asm.x600000b = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.A = CILJS.declare_type(
        "A",
        [],
        function ()
        {
            return (asm0)["System.Object"]();
        },
        function ()
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"A",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm2.t2000002");
            this.GenericTypeMetadataName = "asm2.t2000002";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.B = CILJS.declare_type(
        "B",
        [],
        function ()
        {
            return (asm0)["System.Object"]();
        },
        function ()
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"B",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm2.t2000003");
            this.GenericTypeMetadataName = "asm2.t2000003";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.C = CILJS.declare_type(
        "C",
        [],
        function ()
        {
            return (asm0)["System.Object"]();
        },
        function ()
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"C",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm2.t2000004");
            this.GenericTypeMetadataName = "asm2.t2000004";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    (asm)["C`1"] = CILJS.declare_type(
        "C_1",
        ["T"],
        function (T)
        {
            return asm2.C();
        },
        function (T)
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"C`1",false,false,false,true,false,[],[],asm2.C(),CILJS.is_inst_default(this),Array,"asm2.t2000005");
            (this.GenericArguments)["asm2.t2000005"] = [T];
            this.GenericTypeMetadataName = ("asm2.t2000005<" + (T.GenericTypeMetadataName + ">"));
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.D = CILJS.declare_type(
        "D",
        [],
        function ()
        {
            (asm2.A().init)();
            return (asm2)["C`1"](asm2.A());
        },
        function ()
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"D",false,false,false,false,false,[],[],(asm2)["C`1"](asm2.A()),CILJS.is_inst_default(this),Array,"asm2.t2000006");
            (this.GenericArguments)["asm2.t2000005"] = [asm2.A()];
            this.GenericTypeMetadataName = "asm2.t2000006";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.E = CILJS.declare_type(
        "E",
        [],
        function ()
        {
            (asm2.B().init)();
            return (asm2)["C`1"](asm2.B());
        },
        function ()
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"E",false,false,false,false,false,[],[],(asm2)["C`1"](asm2.B()),CILJS.is_inst_default(this),Array,"asm2.t2000007");
            (this.GenericArguments)["asm2.t2000005"] = [asm2.B()];
            this.GenericTypeMetadataName = "asm2.t2000007";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.Program = CILJS.declare_type(
        "Program",
        [],
        function ()
        {
            return (asm0)["System.Object"]();
        },
        function ()
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"Program",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm2.t2000008");
            this.GenericTypeMetadataName = "asm2.t2000008";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.entryPoint = asm.x6000007;
})(asm2 || (asm2 = {}));
