var asm1;(function (asm)
{
    asm.FullName = "Structs.cs.ciljs, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    /* static System.Void Program.Main()*/
    asm.x6000001_init = function ()
    {
        (asm1.A().init)();
        asm.x6000001 = asm.x6000001_;
    };;
    asm.x6000001 = function ()
    {
        asm.x6000001_init.apply(this,arguments);
        return asm.x6000001_.apply(this,arguments);
    };;
    asm.x6000001_ = function Main()
    {
        var t0;
        var loc0;
        CILJS.init_base_types();
        t0 = asm1.A();
        loc0 = new (asm1.A())();
        /* IL_00: nop  */
        /* IL_01: ldloca.s 0 */
        /* IL_04: initobj A */
        loc0 = new t0();
        /* IL_09: ldloca.s 0 */
        /* IL_0B: ldc.i4 123456789 */
        /* IL_10: stfld Int32 Value */
        loc0.Value = (123456789|0);
        /* IL_15: ldloc.0  */
        /* IL_16: call Void Print(A) */
        asm1.x6000003(CILJS.clone_value(loc0));
        /* IL_1B: nop  */
        /* IL_1C: ldloc.0  */
        /* IL_1D: call Void Mutate(A) */
        asm1.x6000002(CILJS.clone_value(loc0));
        /* IL_22: nop  */
        /* IL_23: ldloc.0  */
        /* IL_24: call Void Print(A) */
        asm1.x6000003(CILJS.clone_value(loc0));
        /* IL_29: nop  */
        /* IL_2A: ret  */
        return ;
    };
    /* static System.Void Program.Mutate(A)*/
    asm.x6000002 = function Mutate(arg0)
    {
        /* IL_00: nop  */
        /* IL_01: ldarga.s 0 */
        /* IL_03: ldc.i4 999 */
        /* IL_08: stfld Int32 Value */
        arg0.Value = (999|0);
        /* IL_0D: ldarg.0  */
        /* IL_0E: call Void Print(A) */
        asm1.x6000003(CILJS.clone_value(arg0));
        /* IL_13: nop  */
        /* IL_14: ret  */
        return ;
    };;
    /* static System.Void Program.Print(A)*/
    asm.x6000003 = function Print(arg0)
    {
        var t0;
        t0 = (asm0)["System.Int32"]();
        /* IL_00: nop  */
        /* IL_01: ldarg.0  */
        /* IL_02: ldfld Int32 Value */
        /* IL_07: box System.Int32 */
        /* IL_0C: call Void WriteLine(System.Object) */
        asm0.x600005a({
                'boxed': arg0.Value,
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_11: nop  */
        /* IL_12: ret  */
        return ;
    };;
    /*  Program..ctor()*/
    asm.x6000004 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0  */
        /* IL_01: call Void .ctor() */
        /* IL_06: nop  */
        /* IL_07: ret  */
        return ;
    };;
    asm.A = CILJS.declare_type(
        "A",
        [],
        function ()
        {
            return {};
        },
        function ()
        {
            this.init = CILJS.nop;
            CILJS.init_type(this,asm,"A",true,false,false,false,false,[],[],(asm0)["System.ValueType"](),CILJS.is_inst_value_type(this),Array,"asm1.t2000002");
            this.GenericTypeMetadataName = "asm1.t2000002";
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x6000176");
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
            this.prototype.Value = 0;
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
            CILJS.init_type(this,asm,"Program",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm1.t2000003");
            this.GenericTypeMetadataName = "asm1.t2000003";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.entryPoint = asm.x6000001;
})(asm1 || (asm1 = {}));