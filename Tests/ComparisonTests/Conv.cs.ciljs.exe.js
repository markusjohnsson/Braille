var asm1;(function (asm)
{
    asm.FullName = "Conv.cs.ciljs, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    /* static System.Void Program.Test(Int64)*/
    asm.x6000001 = function Test(arg0)
    {
        var t0;
        var t1;
        var t2;
        var t3;
        var t4;
        t0 = (asm0)["System.Int32"]();
        t1 = (asm0)["System.UInt32"]();
        t2 = (asm0)["System.Int64"]();
        t3 = (asm0)["System.UInt64"]();
        t4 = (asm0)["System.Double"]();
        /* IL_00: nop  */
        /* IL_01: ldarg.0  */
        /* IL_02: conv.i4  */
        /* IL_03: box System.Int32 */
        /* IL_08: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.to_number_signed(arg0),t0));
        /* IL_0D: nop  */
        /* IL_0E: ldarg.0  */
        /* IL_0F: conv.u4  */
        /* IL_10: box System.UInt32 */
        /* IL_15: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.to_number_signed(arg0),t1));
        /* IL_1A: nop  */
        /* IL_1B: ldarg.0  */
        /* IL_1C: box System.Int64 */
        /* IL_21: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(arg0,t2));
        /* IL_26: nop  */
        /* IL_27: ldarg.0  */
        /* IL_28: box System.UInt64 */
        /* IL_2D: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(arg0,t3));
        /* IL_32: nop  */
        /* IL_33: ldarg.0  */
        /* IL_34: conv.r8  */
        /* IL_35: box System.Double */
        /* IL_3A: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.to_number_signed(arg0),t4));
        /* IL_3F: nop  */
        /* IL_40: ret  */
        return ;
    };;
    /* static System.Void Program.Test(UInt64)*/
    asm.x6000002 = function Test(arg0)
    {
        var t0;
        var t1;
        var t2;
        var t3;
        var t4;
        t0 = (asm0)["System.Int32"]();
        t1 = (asm0)["System.UInt32"]();
        t2 = (asm0)["System.Int64"]();
        t3 = (asm0)["System.UInt64"]();
        t4 = (asm0)["System.Double"]();
        /* IL_00: nop  */
        /* IL_01: ldarg.0  */
        /* IL_02: conv.i4  */
        /* IL_03: box System.Int32 */
        /* IL_08: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.to_number_signed(arg0),t0));
        /* IL_0D: nop  */
        /* IL_0E: ldarg.0  */
        /* IL_0F: conv.u4  */
        /* IL_10: box System.UInt32 */
        /* IL_15: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.to_number_signed(arg0),t1));
        /* IL_1A: nop  */
        /* IL_1B: ldarg.0  */
        /* IL_1C: box System.Int64 */
        /* IL_21: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(arg0,t2));
        /* IL_26: nop  */
        /* IL_27: ldarg.0  */
        /* IL_28: box System.UInt64 */
        /* IL_2D: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(arg0,t3));
        /* IL_32: nop  */
        /* IL_33: ldarg.0  */
        /* IL_34: conv.r.un  */
        /* IL_35: conv.r8  */
        /* IL_36: box System.Double */
        /* IL_3B: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.to_number_unsigned(arg0),t4));
        /* IL_40: nop  */
        /* IL_41: ret  */
        return ;
    };;
    /* static System.Void Program.Test(Int32)*/
    asm.x6000003 = function Test(arg0)
    {
        var t0;
        var t1;
        var t2;
        var t3;
        var t4;
        t0 = (asm0)["System.Int32"]();
        t1 = (asm0)["System.UInt32"]();
        t2 = (asm0)["System.Int64"]();
        t3 = (asm0)["System.UInt64"]();
        t4 = (asm0)["System.Double"]();
        /* IL_00: nop  */
        /* IL_01: ldarg.0  */
        /* IL_02: box System.Int32 */
        /* IL_07: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(arg0,t0));
        /* IL_0C: nop  */
        /* IL_0D: ldarg.0  */
        /* IL_0E: box System.UInt32 */
        /* IL_13: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(arg0,t1));
        /* IL_18: nop  */
        /* IL_19: ldarg.0  */
        /* IL_1A: conv.i8  */
        /* IL_1B: box System.Int64 */
        /* IL_20: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.conv_i8(arg0),t2));
        /* IL_25: nop  */
        /* IL_26: ldarg.0  */
        /* IL_27: conv.i8  */
        /* IL_28: box System.UInt64 */
        /* IL_2D: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(CILJS.conv_i8(arg0),t3));
        /* IL_32: nop  */
        /* IL_33: ldarg.0  */
        /* IL_34: conv.r8  */
        /* IL_35: box System.Double */
        /* IL_3A: call Void WriteLine(System.Object) */
        asm0.x60000a1(CILJS.make_box(arg0,t4));
        /* IL_3F: nop  */
        /* IL_40: ret  */
        return ;
    };;
    /* static System.Void Program.Main()*/
    asm.x6000004 = function Main()
    {
        CILJS.init_base_types();
        /* IL_00: nop  */
        /* IL_01: ldc.i4.1  */
        /* IL_02: conv.i8  */
        /* IL_03: call Void Test(System.Int64) */
        asm1.x6000001(CILJS.conv_i8((1|0)));
        /* IL_08: nop  */
        /* IL_09: ldc.i4.m1  */
        /* IL_0A: conv.i8  */
        /* IL_0B: call Void Test(System.Int64) */
        asm1.x6000001(CILJS.conv_i8((-1|0)));
        /* IL_10: nop  */
        /* IL_11: ldc.i4.1  */
        /* IL_12: conv.i8  */
        /* IL_13: call Void Test(System.UInt64) */
        asm1.x6000002(CILJS.conv_i8((1|0)));
        /* IL_18: nop  */
        /* IL_19: ldc.i4.1  */
        /* IL_1A: call Void Test(System.Int32) */
        asm1.x6000003((1|0));
        /* IL_1F: nop  */
        /* IL_20: ldc.i4.m1  */
        /* IL_21: call Void Test(System.Int32) */
        asm1.x6000003((-1|0));
        /* IL_26: nop  */
        /* IL_27: ret  */
        return ;
    };;
    /*  Program..ctor()*/
    asm.x6000005 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0  */
        /* IL_01: call Void .ctor() */
        /* IL_06: nop  */
        /* IL_07: ret  */
        return ;
    };;
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
            CILJS.init_type(this,asm,"Program",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm1.t2000002",null);
            this.GenericTypeMetadataName = "asm1.t2000002";
            CILJS.declare_virtual(this,"asm0.x60000ca","asm0.x60000ca");
            CILJS.declare_virtual(this,"asm0.x60000cd","asm0.x60000cd");
            CILJS.declare_virtual(this,"asm0.x60000ce","asm0.x60000ce");
        },
        "function Program() { c.init(); }");
    asm.entryPoint = asm.x6000004;
})(asm1 || (asm1 = {}));
if (typeof module != "undefined"){
    module.exports = asm1;
}
//# sourceMappingURL=Conv.cs.ciljs.exe.js.map
