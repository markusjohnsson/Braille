var asm1;(function (asm)
{
    asm.FullName = "CallStaticMethods.cs.ciljs, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    /* static System.Void Program.Callee()*/
    asm.x6000001 = function Callee()
    {
        var t0;
        t0 = (asm0)["System.Object"]();
        /* IL_00: nop  */
        /* IL_01: ldstr Called! */
        /* IL_06: ldc.i4.0  */
        /* IL_07: newarr System.Object */
        /* IL_0C: call Void WriteLine(System.String, System.Object[]) */
        asm0.x600005b(CILJS.new_string("Called!"),CILJS.new_array(t0,(0|0)));
        /* IL_11: nop  */
        /* IL_12: ret  */
        return ;
    };;
    /* static System.Void Program.Main()*/
    asm.x6000002 = function Main()
    {
        CILJS.init_base_types();
        /* IL_00: nop  */
        /* IL_01: call Void Callee() */
        asm1.x6000001();
        /* IL_06: nop  */
        /* IL_07: ret  */
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
            CILJS.init_type(this,asm,"Program",false,false,false,false,false,[],[],(asm0)["System.Object"](),CILJS.is_inst_default(this),Array,"asm1.t2000002",null);
            this.GenericTypeMetadataName = "asm1.t2000002";
            CILJS.declare_virtual(this,"asm0.x60000ed","asm0.x60000ed");
            CILJS.declare_virtual(this,"asm0.x60000f0","asm0.x60000f0");
            CILJS.declare_virtual(this,"asm0.x60000f1","asm0.x60000f1");
        },
        "function Program() { c.init(); }");
    asm.entryPoint = asm.x6000002;
})(asm1 || (asm1 = {}));
if (module){
    module.exports = asm1;
}
