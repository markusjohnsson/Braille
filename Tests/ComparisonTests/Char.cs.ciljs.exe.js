
var asm1 = {};
var asm = asm1;
var asm0 = CILJS.find_assembly("mscorlib");
asm.FullName = "Char.cs.ciljs, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";/* static System.Void Program.Main()*/

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
};;/* static System.Void Program.Log(String)*/

asm.x6000002 = function Log(arg0)
{
    var t0;
    
    t0 = asm0["System.Char"]();
    /* IL_00: nop  */
    /* IL_01: ldarg.0  */
    /* IL_02: ldc.i4.0  */
    /* IL_03: callvirt Char get_Chars(System.Int32) */
    /* IL_08: box System.Char */
    /* IL_0D: call Void WriteLine(System.Object) */
    
    asm0.x60000a1(CILJS.make_box(asm0.x60000e8(arg0,0),t0));
    /* IL_12: nop  */
    /* IL_13: ldarg.0  */
    /* IL_14: ldc.i4.1  */
    /* IL_15: callvirt Char get_Chars(System.Int32) */
    /* IL_1A: box System.Char */
    /* IL_1F: call Void WriteLine(System.Object) */
    
    asm0.x60000a1(CILJS.make_box(asm0.x60000e8(arg0,1),t0));
    /* IL_24: nop  */
    /* IL_25: ldarg.0  */
    /* IL_26: ldc.i4.2  */
    /* IL_27: callvirt Char get_Chars(System.Int32) */
    /* IL_2C: box System.Char */
    /* IL_31: call Void WriteLine(System.Object) */
    
    asm0.x60000a1(CILJS.make_box(asm0.x60000e8(arg0,2),t0));
    /* IL_36: nop  */
    /* IL_37: ldarg.0  */
    /* IL_38: ldc.i4.3  */
    /* IL_39: callvirt Char get_Chars(System.Int32) */
    /* IL_3E: box System.Char */
    /* IL_43: call Void WriteLine(System.Object) */
    
    asm0.x60000a1(CILJS.make_box(asm0.x60000e8(arg0,3),t0));
    /* IL_48: nop  */
    /* IL_49: ret  */
    
    return ;
};;/*  Program..ctor()*/

asm.x6000003 = function _ctor(arg0)
{
    /* IL_00: ldarg.0  */
    /* IL_01: call Void .ctor() */
    /* IL_06: nop  */
    /* IL_07: ret  */
    
    return ;
};;
asm.Program = CILJS.declare_type(
    [],
    function ()
    {
        
        return asm0["System.Object"]();
    },
    function (type)
    {
        
        type.init = CILJS.nop;
        
        CILJS.init_type(type,asm,"Program",false,false,false,false,false,[],[],asm0["System.Object"](),CILJS.is_inst_default(type),Array,"asm1.t2000002",null);
        
        type.TypeMetadataName = "asm1.t2000002";
        
        CILJS.declare_virtual(type,"asm0.x60000ca",asm0,"x60000ca");
        
        CILJS.declare_virtual(type,"asm0.x60000cd",asm0,"x60000cd");
        
        CILJS.declare_virtual(type,"asm0.x60000ce",asm0,"x60000ce");
    },
    function ()
    {
        
        return function Program()
        {
            
            Program.init();
        };
    });
asm.entryPoint = asm.x6000001;
CILJS.declare_assembly("Char.cs.ciljs",asm);
if (typeof module != "undefined"){
    
    module.exports = asm1;
}
//# sourceMappingURL=Char.cs.ciljs.exe.js.map
