var asm1;(function (asm)
{
    asm.FullName = "Char.cs.ciljs, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    /* static System.Void Program.Main()*/
    asm.x6000001 = function Main()
    {
        CILJS.init_base_types();
        /* IL_00: nop  */
        /* IL_01: ldstr hello world */
        /* IL_06: call Void Log(System.String) */
        asm1.x6000002(CILJS.new_string("hello world"));
        /* IL_0B: nop  */
        /* IL_0C: ldstr xyzw */
        /* IL_11: call Void Log(System.String) */
        asm1.x6000002(CILJS.new_string("xyzw"));
        /* IL_16: nop  */
        /* IL_17: ldstr 1234 */
        /* IL_1C: call Void Log(System.String) */
        asm1.x6000002(CILJS.new_string("1234"));
        /* IL_21: nop  */
        /* IL_22: ret  */
        return ;
    };;
    /* static System.Void Program.Log(String)*/
    asm.x6000002 = function Log(arg0)
    {
        var t0;
        t0 = (asm0)["System.Char"]();
        /* IL_00: nop  */
        /* IL_01: ldarg.0  */
        /* IL_02: ldc.i4.0  */
        /* IL_03: callvirt Char get_Chars(System.Int32) */
        /* IL_08: box System.Char */
        /* IL_0D: call Void WriteLine(System.Object) */
        asm0.x600005a({
                'boxed': asm0.x6000125(arg0,(0|0)),
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_12: nop  */
        /* IL_13: ldarg.0  */
        /* IL_14: ldc.i4.1  */
        /* IL_15: callvirt Char get_Chars(System.Int32) */
        /* IL_1A: box System.Char */
        /* IL_1F: call Void WriteLine(System.Object) */
        asm0.x600005a({
                'boxed': asm0.x6000125(arg0,(1|0)),
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_24: nop  */
        /* IL_25: ldarg.0  */
        /* IL_26: ldc.i4.2  */
        /* IL_27: callvirt Char get_Chars(System.Int32) */
        /* IL_2C: box System.Char */
        /* IL_31: call Void WriteLine(System.Object) */
        asm0.x600005a({
                'boxed': asm0.x6000125(arg0,(2|0)),
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_36: nop  */
        /* IL_37: ldarg.0  */
        /* IL_38: ldc.i4.3  */
        /* IL_39: callvirt Char get_Chars(System.Int32) */
        /* IL_3E: box System.Char */
        /* IL_43: call Void WriteLine(System.Object) */
        asm0.x600005a({
                'boxed': asm0.x6000125(arg0,(3|0)),
                'type': t0,
                'vtable': t0.prototype.vtable,
                'ifacemap': t0.prototype.ifacemap
            });
        /* IL_48: nop  */
        /* IL_49: ret  */
        return ;
    };;
    /*  Program..ctor()*/
    asm.x6000003 = function _ctor(arg0)
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
            CILJS.init_type(this,asm,"Program",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm1.t2000002");
            this.GenericTypeMetadataName = "asm1.t2000002";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        });
    asm.entryPoint = asm.x6000001;
})(asm1 || (asm1 = {}));