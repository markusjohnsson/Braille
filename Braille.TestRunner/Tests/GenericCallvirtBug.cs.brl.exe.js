var asm1;(function (asm)
{
    asm.FullName = "GenericCallvirtBug.cs.brl, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    asm.next_hash = (1|0);
    /* static System.Void TestLog.Log(Object)*/
    asm.x6000001 = braille_test_log;;
    /*  TestLog..ctor()*/
    asm.x6000002 = function _ctor(arg0)
    {
        var __pos__;
        __pos__ = 0x0;
        /* IL_00: ldarg.0  */
        /* IL_01: call Void .ctor() */
        /* IL_06: ret  */
        return ;
    };;
    /* System.Void A`1.Y<TResult>()*/
    asm.x600000a = function (TResult)
    {
        return function Y(arg0)
        {
            var t0;
            var __pos__;
            t0 = TResult;
            __pos__ = 0x0;
            /* IL_00: nop  GenericCallvirtBug.cs:20:5*/
            /* IL_01: ldtoken TResult */
            /* IL_06: call Type GetTypeFromHandle(System.RuntimeTypeHandle) */
            /* IL_0B: callvirt String get_Name() */
            /* IL_10: call Void Log(System.Object) */
            asm1.x6000001((((asm0.x60000e1(BLR.new_handle((asm0)["System.RuntimeTypeHandle"](),t0)).vtable)["asm0.x600003e"])())(asm0.x60000e1(BLR.new_handle((asm0)["System.RuntimeTypeHandle"](),t0))));
            /* IL_15: nop  */
            /* IL_16: ret  GenericCallvirtBug.cs:22:5*/
            return ;
        };
    };;
    /*  A`1..ctor()*/
    asm.x600000b = function _ctor(arg0)
    {
        var __pos__;
        __pos__ = 0x0;
        /* IL_00: ldarg.0  */
        /* IL_01: call Void .ctor() */
        /* IL_06: ret  */
        return ;
    };;
    /* System.Void B.X()*/
    asm.x600000d = function X(arg0)
    {
        var t0;
        var __pos__;
        t0 = (((arguments)[0].constructor.GenericArguments)["asm1.t2000007"])[0];
        __pos__ = 0x0;
        /* IL_00: nop  GenericCallvirtBug.cs:14:9*/
        /* IL_01: ldarg.0  */
        /* IL_02: ldfld A`1 a */
        /* IL_07: callvirt Void Y[T]() */
        (asm1.x600000a((((arguments)[0].constructor.GenericArguments)["asm1.t2000007"])[0]))(arg0.Ba);
        /* IL_0C: nop  */
        /* IL_0D: ret  GenericCallvirtBug.cs:16:9*/
        return ;
    };;
    /*  B..ctor(A`1)*/
    asm.x600000c = function _ctor(arg0, arg1)
    {
        var __pos__;
        __pos__ = 0x0;
        /* IL_00: ldarg.0  */
        /* IL_01: call Void .ctor() */
        /* IL_06: nop  */
        /* IL_07: nop  GenericCallvirtBug.cs:9:9*/
        /* IL_08: ldarg.0  */
        /* IL_09: ldarg.1  */
        /* IL_0A: stfld A`1 a */
        arg0.Ba = arg1;
        /* IL_0F: nop  GenericCallvirtBug.cs:11:9*/
        /* IL_10: ret  */
        return ;
    };;
    /* static System.Void Program.Main()*/
    asm.x600000e_init = function ()
    {
        ((asm1)["A`1"]((asm0)["System.String"]()).init)();
        ((asm1)["A`1+B"]((asm0)["System.String"]()).init)();
        asm.x600000e = asm.x600000e_;
    };;
    asm.x600000e = function ()
    {
        BLR.init_base_types();
        asm.x600000e_init.apply(this,arguments);
        return asm.x600000e_.apply(this,arguments);
    };;
    asm.x600000e_ = function Main()
    {
        var t0;
        var t1;
        var t2;
        var __pos__;
        var loc0;
        t0 = (asm0)["System.String"]();
        t1 = (asm1)["A`1"](t0);
        t2 = (asm1)["A`1+B"](t0);
        __pos__ = 0x0;
        /* IL_00: nop  GenericCallvirtBug.cs:28:5*/
        /* IL_01: newobj Void .ctor() */
        /* IL_06: newobj Void .ctor(A`1[System.String]) */
        /* IL_0B: stloc.0  */
        loc0 = BLR.newobj(t2,asm1.x600000c,[null, BLR.newobj(t1,asm1.x600000b,[null])]);
        /* IL_0C: ldloc.0  */
        /* IL_0D: callvirt Void X() */
        asm1.x600000d(loc0);
        /* IL_12: nop  */
        /* IL_13: ret  GenericCallvirtBug.cs:31:5*/
        return ;
    };
    /*  Program..ctor()*/
    asm.x600000f = function _ctor(arg0)
    {
        var __pos__;
        __pos__ = 0x0;
        /* IL_00: ldarg.0  */
        /* IL_01: call Void .ctor() */
        /* IL_06: ret  */
        return ;
    };;
    asm.TestLog = BLR.declare_type(
        "TestLog",
        [],
        function ()
        {
            return new ((asm0)["System.Object"]())();
        },
        function ()
        {
            this.init = BLR.nop;
            BLR.init_type(this,asm,"TestLog",false,false,false,false,false,[],[],(asm0)["System.Object"](),BLR.is_inst_default(this),Array,"asm1.t2000002");
            this.GenericTypeMetadataName = "asm1.t2000002";
            BLR.declare_virtual(this,"asm0.x6000005","asm0.x6000005");
            BLR.declare_virtual(this,"asm0.x6000008","asm0.x6000008");
            BLR.declare_virtual(this,"asm0.x6000009","asm0.x6000009");
        });
    (asm)["A`1"] = BLR.declare_type(
        "A_1",
        ["T"],
        function (T)
        {
            return new ((asm0)["System.Object"]())();
        },
        function (T)
        {
            this.init = BLR.nop;
            BLR.init_type(this,asm,"A`1",false,false,false,true,false,[],[],(asm0)["System.Object"](),BLR.is_inst_default(this),Array,"asm1.t2000006");
            (this.GenericArguments)["asm1.t2000006"] = [T];
            this.GenericTypeMetadataName = ("asm1.t2000006<" + (T.GenericTypeMetadataName + ">"));
            BLR.declare_virtual(this,"asm0.x6000005","asm0.x6000005");
            BLR.declare_virtual(this,"asm0.x6000008","asm0.x6000008");
            BLR.declare_virtual(this,"asm0.x6000009","asm0.x6000009");
        });
    (asm)["A`1+B"] = BLR.declare_type(
        "B",
        ["T"],
        function (T)
        {
            return new ((asm0)["System.Object"]())();
        },
        function (T)
        {
            this.init = BLR.nop;
            BLR.init_type(this,asm,"A`1+B",false,false,false,true,false,[],[
                    [asm1, "x600000d", "X"]
                ],(asm0)["System.Object"](),BLR.is_inst_default(this),Array,"asm1.t2000007");
            (this.GenericArguments)["asm1.t2000007"] = [T];
            this.GenericTypeMetadataName = ("asm1.t2000007<" + (T.GenericTypeMetadataName + ">"));
            BLR.declare_virtual(this,"asm0.x6000005","asm0.x6000005");
            BLR.declare_virtual(this,"asm0.x6000008","asm0.x6000008");
            BLR.declare_virtual(this,"asm0.x6000009","asm0.x6000009");
            this.prototype.Ba = null;
        });
    asm.Program = BLR.declare_type(
        "Program",
        [],
        function ()
        {
            return new ((asm0)["System.Object"]())();
        },
        function ()
        {
            this.init = BLR.nop;
            BLR.init_type(this,asm,"Program",false,false,false,false,false,[],[],(asm0)["System.Object"](),BLR.is_inst_default(this),Array,"asm1.t2000008");
            this.GenericTypeMetadataName = "asm1.t2000008";
            BLR.declare_virtual(this,"asm0.x6000005","asm0.x6000005");
            BLR.declare_virtual(this,"asm0.x6000008","asm0.x6000008");
            BLR.declare_virtual(this,"asm0.x6000009","asm0.x6000009");
        });
    asm.entryPoint = asm.x600000e;
})(asm1 || (asm1 = {}));
