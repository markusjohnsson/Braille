var asm1; (function (asm)
{
    asm.FullName = "StringEquality.cs.brl, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    asm.next_hash = (1|0);
    /* static Void Log(System.Object)*/
    asm.x6000001 = braille_test_log;;
    /* Void .ctor()*/
    asm.x6000002 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* Void .ctor()*/
    asm.x600000b = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* static Void Cmp(System.String)*/
    asm.x600000c_init = function ()
    {
        ((asm0)["System.Boolean"]().init)();
        asm.x600000c = asm.x600000c_;
    };;
    asm.x600000c = function (arg0)
    {
        asm.x600000c_init.apply(this,arguments);
        return asm.x600000c_.apply(this,arguments);
    };;
    asm.x600000c_ = function Cmp(arg0)
    {
        var t0;
        t0 = (asm0)["System.Boolean"]();
        /* IL_00: ldarg.0 */
        /* IL_01: ldstr Hello World*/
        /* IL_06: call Boolean op_Equality(System.String, System.String)*/
        /* IL_0B: box System.Boolean*/
        /* IL_10: call Void Log(System.Object)*/
        asm1.x6000001({
                'boxed': asm0.x600017b(arg0,BLR.new_string("Hello World")),
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_15: ldarg.0 */
        /* IL_16: ldstr Hello World*/
        /* IL_1B: callvirt Boolean Equals(System.String)*/
        /* IL_20: box System.Boolean*/
        /* IL_25: call Void Log(System.Object)*/
        asm1.x6000001({
                'boxed': ((arg0.vtable)["asm0.x600017c"]())(arg0,BLR.new_string("Hello World")),
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_2A: ldstr Hello World*/
        /* IL_2F: ldarg.0 */
        /* IL_30: callvirt Boolean Equals(System.String)*/
        /* IL_35: box System.Boolean*/
        /* IL_3A: call Void Log(System.Object)*/
        asm1.x6000001({
                'boxed': (((BLR.new_string("Hello World").vtable)["asm0.x600017c"])())(BLR.new_string("Hello World"),arg0),
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_3F: ret */
        return ;
    };
    /* static Void Main()*/
    asm.x600000d_init = function ()
    {
        ((asm0)["System.ValueType"]().init)();
        asm.x600000d = asm.x600000d_;
    };;
    asm.x600000d = function ()
    {
        asm.x600000d_init.apply(this,arguments);
        return asm.x600000d_.apply(this,arguments);
    };;
    asm.x600000d_ = function Main()
    {
        var t0;
        t0 = (asm0)["System.ValueType"]();
        /* IL_00: ldstr Hello World*/
        /* IL_05: call Void Cmp(System.String)*/
        asm1.x600000c(BLR.new_string("Hello World"));
        /* IL_0A: ldstr Hello, World*/
        /* IL_0F: call Void Cmp(System.String)*/
        asm1.x600000c(BLR.new_string("Hello, World"));
        /* IL_14: ldstr Hello*/
        /* IL_19: call Void Cmp(System.String)*/
        asm1.x600000c(BLR.new_string("Hello"));
        /* IL_1E: ret */
        return ;
    };
    /* Void .ctor()*/
    asm.x600000e = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
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
            BLR.declare_virtual(this,"asm0.x6000005","asm0.x6000005");
            BLR.declare_virtual(this,"asm0.x6000008","asm0.x6000008");
            BLR.declare_virtual(this,"asm0.x6000009","asm0.x6000009");
        });
    asm.TestHelper = BLR.declare_type(
        "TestHelper",
        [],
        function ()
        {
            return new ((asm0)["System.Object"]())();
        },
        function ()
        {
            this.init = BLR.nop;
            BLR.init_type(this,asm,"TestHelper",false,false,false,false,false,[],[],(asm0)["System.Object"](),BLR.is_inst_default(this),Array,"asm1.t2000006");
            BLR.declare_virtual(this,"asm0.x6000005","asm0.x6000005");
            BLR.declare_virtual(this,"asm0.x6000008","asm0.x6000008");
            BLR.declare_virtual(this,"asm0.x6000009","asm0.x6000009");
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
            BLR.init_type(this,asm,"Program",false,false,false,false,false,[],[],(asm0)["System.Object"](),BLR.is_inst_default(this),Array,"asm1.t2000007");
            BLR.declare_virtual(this,"asm0.x6000005","asm0.x6000005");
            BLR.declare_virtual(this,"asm0.x6000008","asm0.x6000008");
            BLR.declare_virtual(this,"asm0.x6000009","asm0.x6000009");
        });
    asm.entryPoint = asm.x600000d;
})(asm1 || (asm1 = {}));