var asm1; (function (asm)
{
    asm.FullName = "iface3.cs.brl, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    
    asm.next_hash = 1;

    function nop() {}

    function initType(type, fullname, assembly, isValueType, isPrimitive, isInterface, isGenericTypeDefinition, isNullable, customAttributes, methods, baseType, isInst, arrayType, metadataName)
    {
        type.FullName = fullname;
        type.Assembly = assembly;
        type.IsValueType = isValueType;
        type.IsPrimitive = isPrimitive;
        type.IsInterface = isInterface;
        type.IsGenericTypeDefinition = isGenericTypeDefinition;
        type.IsNullable = isNullable;

        type.CustomAttributes = customAttributes;
        type.Methods = methods;
        type.BaseType = baseType;
        type.IsInst = isInst;
        type.ArrayType = arrayType;
        type.MetadataName = metadataName;

        type.GenericArguments = {};
        type.prototype.vtable = {};
        type.prototype.ifacemap = {};
    }

    function is_inst_interface(interfaceType){
        return function (t) { try { return (t.type || t.constructor).Interfaces.indexOf(interfaceType) != -1 ? t : null; } catch (e) { return false; } };
    }

    function is_inst_primitive(primitiveType) {
        return function (t) { try { return t.type == primitiveType ? t : null; } catch (e) { return false; } }
    }

    function is_inst_array(T) {
        return function (t) { return t instanceof asm0['System.Array']() && (t.etype == T || t.etype.prototype instanceof T) ? t : null; };
    }

    function is_inst_default(type) {
        return function (t) { return t instanceof type ? t : null; };
    }

    function declare_virtual(type, slot, target) {
        type.prototype.vtable[slot] = new Function('return '+target+';');
    }

    function clone_value(v) {
        if (v == null) return v;
        if (typeof v === 'number') return v;
        if (typeof v === 'function') return v;
        if (!v.constructor.IsValueType) return v;
        var result = new v.constructor();
        for (var p in v) {
            if (v.hasOwnProperty(p))
                result[p] = clone_value(v[p]);
        }
        return result;
    }

    function value_equals(a, b) {

        if (typeof a !== typeof b)
            return 0;

        if (a === null)
            return b === null ? 1 : 0;

        if (typeof a === 'object' && typeof a.constructor !== 'undefined' && a.constructor.IsValueType) {
            
            for (var p in a) {
                var av = a[p];
                var bv = b[p];
                    
                if (! value_equals(av, bv))
                    return 0;
            }
            
            return 1;
        }
        else 
        {
            return a === b ? 1 : 0;
        }
    }

    function unsigned_value(a) {
        if (a < 0)
            return 0xffffffff + a + 1;
        else
            return a;
    }

    function box(v, type) {
        if (v === null)
            return v;
    
        if (type.IsNullable) {
            if (v.has_value)
                return box(v.value, type.GenericArguments[type.MetadataName][0]);
            else
                return null;
        }

        if (!type.IsValueType)
            return v;
    
        return {
            'boxed': v,
            'type': type,
            'vtable': type.prototype.vtable,
            'ifacemap': type.prototype.ifacemap
        };
    }

    function unbox(o, type) {
        if (o == null) {
            var t = asm0['System.InvalidCastException']();
            var e = new t();
            e.stack = new Error().stack;
            throw e;
        }
        return cast_class(o.boxed, type);
    }

    function unbox_any(o, type) {
        if (type.IsNullable) {
            var result = new type();
            if (o !== null) {
                result.value = cast_class(o.boxed, type.GenericArguments[type.MetadataName][0]);
                result.has_value = true;
            }
            return result;
        }

        if (type.IsValueType) {

            if (o == null) {
                var t = asm0['System.InvalidCastException']();
                throw new t();
            }

            return cast_class(o.boxed, type);
        }
        else
            return cast_class(o, type);
    }

    function convert_box_to_pointer_as_needed(o) {
        if (typeof o.boxed !== "undefined" &&
            typeof o.type !== "undefined" &&
            typeof o.type.IsValueType) 
        {
            return { 'r': function () { return o.boxed; },
                     'w': function (v) { return o.boxed = v; } };
        }
        else {
            return o;
        }
    }

    function dereference_pointer_as_needed(p) {
        if (typeof p.r === "function" &&
            typeof p.w === "function") 
        {
            var v = p.r();
            if (typeof v !== 'number' && ! v.constructor.IsValueType)
            {
                return v;
            }
        }

        return p;
    }

    function tree_get(a, s) {
        var c = s;
        for (var i = 0; c && i < a.length; i++)
            c = c[a[i]];
        return c;
    }

    function tree_set(a, s, v) {
        if (a.length == 1) {
            s[a[0]] = v;
        }
        else {
            var c = s[a[0]];
            if (!c) s[a[0]] = c = {};
            tree_set(a.slice(1), c, v);
        }
    }

    function new_string(jsstr) {
        var r = new (asm0['System.String']())();
        r.jsstr = jsstr;
        return r;
    }

    function new_handle(type, value) {
        var r = new type();
        r.value = value;
        return r;
    }

    function new_array(type, length) {
        var ctor = type.ArrayType || Array;
        var r = new (asm0['System.Array`1'](type))();
        r.etype = type;
        r.jsarr = new ctor(length);
        return r;
    }

    function newobj(type, ctor, args) {
        var result = new type();
        
        if (type.IsValueType)
            args[0] = { 
                w: function(a) { result = a; }, 
                r: function() { return result; } 
            };
        else
            args[0] = result;
        
        ctor.apply(null, args);
        
        return result;
    }

    function cast_class(obj, type) {
        if (type.IsInst(obj) || (!type.IsValueType && obj === null)) {
            return obj;
        }
        else if (type.IsPrimitive) {
            if (typeof obj === 'undefined' || obj === null) {
            }
            else if (typeof obj == 'number') {
                return obj;
            }
            else if (typeof obj.length == 'number' && obj.length == 2) {
                return obj; 
            }
        }
        
        var t = asm0['System.InvalidCastException']();
        var e = new t();
        e.stack = new Error().stack;
        throw e;
    }

    function conv_u8(n) {
        if (n < 0) {
            n = 0x100000000 + n;
        }

        return make_uint64(n);
    }

    function conv_i8(n) {
        if (n < 0) {
            n = 0x100000000 + n;
            return new Uint32Array([ n | 0, 0xffffffff ]);
        }

        return make_uint64(n);
    }

    function make_uint64(n) {
        var bits32 = 0xffffffff;

        var floorN = Math.floor(n);
        var low = floorN | 0;
        var high = (floorN / 0x100000000) | 0;

        var low = low & bits32;
        var high = high & bits32;

        return new Uint32Array([low, high]);
    }

    function to_number(n) {
        return n[1] * 4294967296 + n[0];
    }
;
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
    /* Int32 ICommon.DoIt()*/
    asm.x600000d = function ICommon_DoIt(arg0)
    {
        /* IL_00: ldc.i4.1 */
        /* IL_01: ret */
        return (1|0);
    };;
    /* Int32 DoIt()*/
    asm.x600000e = function DoIt(arg0)
    {
        /* IL_00: ldc.i4.2 */
        /* IL_01: ret */
        return (2|0);
    };;
    /* Void .ctor()*/
    asm.x600000f = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* Int32 ICommon.DoIt()*/
    asm.x6000010 = function ICommon_DoIt(arg0)
    {
        /* IL_00: ldc.i4.3 */
        /* IL_01: ret */
        return (3|0);
    };;
    /* Int32 DoIt()*/
    asm.x6000011 = function DoIt(arg0)
    {
        /* IL_00: ldc.i4.4 */
        /* IL_01: ret */
        return (4|0);
    };;
    /* Void .ctor()*/
    asm.x6000012 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x600000f)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* Int32 DoIt()*/
    asm.x6000013 = function DoIt(arg0)
    {
        /* IL_00: ldc.i4.5 */
        /* IL_01: ret */
        return (5|0);
    };;
    /* Void .ctor()*/
    asm.x6000014 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x6000012)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* static Int32 Main()*/
    asm.x6000015_init = function ()
    {
        ((asm1.ReallyDerived)().init)();
        ((asm1.ICommon)().init)();
        asm.x6000015 = asm.x6000015_;
    };;
    asm.x6000015 = function ()
    {
        (asm.x6000015_init.apply)(this,arguments);
        return (asm.x6000015_.apply)(this,arguments);
    };;
    asm.x6000015_ = function Main()
    {
        var t0;
        var t1;
        var __pos_0__;
        var loc0;
        var loc1;
        var loc2;
        var loc3;
        t0 = (asm1.ReallyDerived)();
        t1 = (asm1.ICommon)();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: newobj Void .ctor()*/
                /* IL_05: stloc.0 */
                loc0 = newobj(t0,asm1.x6000014,[
                    null
                ]);
                /* IL_06: ldloc.0 */
                /* IL_07: stloc.1 */
                loc1 = loc0;
                /* IL_08: ldloc.0 */
                /* IL_09: stloc.2 */
                loc2 = loc0;
                /* IL_0A: ldloc.0 */
                /* IL_0B: stloc.3 */
                loc3 = loc0;
                /* IL_0C: ldloc.0 */
                /* IL_0D: callvirt Int32 DoIt()*/
                /* IL_12: ldc.i4.5 */
                /* IL_13: beq.s IL_17*/
                
                if ((((loc0.vtable)["asm1.x6000011"])())(loc0) === (5|0)){
                    __pos_0__ = 0x17;
                    continue;
                }
                /* IL_15: ldc.i4.1 */
                /* IL_16: ret */
                return (1|0);
                case 0x17:
                /* IL_17: ldloc.0 */
                /* IL_18: callvirt Int32 DoIt()*/
                /* IL_1D: ldc.i4.3 */
                /* IL_1E: beq.s IL_22*/
                
                if ((((loc0.ifacemap)[t1].x600000c)())(loc0) === (3|0)){
                    __pos_0__ = 0x22;
                    continue;
                }
                /* IL_20: ldc.i4.2 */
                /* IL_21: ret */
                return (2|0);
                case 0x22:
                /* IL_22: ldloc.1 */
                /* IL_23: callvirt Int32 DoIt()*/
                /* IL_28: ldc.i4.5 */
                /* IL_29: beq.s IL_2D*/
                
                if ((((loc1.vtable)["asm1.x6000011"])())(loc1) === (5|0)){
                    __pos_0__ = 0x2D;
                    continue;
                }
                /* IL_2B: ldc.i4.3 */
                /* IL_2C: ret */
                return (3|0);
                case 0x2D:
                /* IL_2D: ldloc.2 */
                /* IL_2E: callvirt Int32 DoIt()*/
                /* IL_33: ldc.i4.2 */
                /* IL_34: beq.s IL_38*/
                
                if ((((loc2.vtable)["asm1.x600000e"])())(loc2) === (2|0)){
                    __pos_0__ = 0x38;
                    continue;
                }
                /* IL_36: ldc.i4.4 */
                /* IL_37: ret */
                return (4|0);
                case 0x38:
                /* IL_38: ldloc.3 */
                /* IL_39: callvirt Int32 DoIt()*/
                /* IL_3E: ldc.i4.3 */
                /* IL_3F: beq.s IL_43*/
                
                if ((((loc3.ifacemap)[t1].x600000c)())(convert_box_to_pointer_as_needed(loc3)) === (3|0)){
                    __pos_0__ = 0x43;
                    continue;
                }
                /* IL_41: ldc.i4.5 */
                /* IL_42: ret */
                return (5|0);
                case 0x43:
                /* IL_43: ldc.i4.0 */
                /* IL_44: ret */
                return (0|0);
            }
        }
    };
    /* Void .ctor()*/
    asm.x6000016 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.TestLog = (function ()
    {
        var ct;
        ct = null;
        return function ()
        {
            var c;
            var initialized;
            c = ct;
            
            if (c){
                return c;
            }
            initialized = false;;
            function TestLog()
            {
                (TestLog.init)();
                this.constructor = TestLog;
            };
            c = TestLog;
            ct = c;
            TestLog.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(TestLog,"TestLog",asm,false,false,false,false,false,[],[],((asm0)["System.Object"])(),is_inst_default(TestLog),Array,"asm1.t2000002");
                TestLog.Interfaces = [];
                declare_virtual(TestLog,"asm0.x6000005","asm0.x6000005");
                declare_virtual(TestLog,"asm0.x6000008","asm0.x6000008");
                declare_virtual(TestLog,"asm0.x6000009","asm0.x6000009");
            };
            TestLog.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.TestHelper = (function ()
    {
        var ct;
        ct = null;
        return function ()
        {
            var c;
            var initialized;
            c = ct;
            
            if (c){
                return c;
            }
            initialized = false;;
            function TestHelper()
            {
                (TestHelper.init)();
                this.constructor = TestHelper;
            };
            c = TestHelper;
            ct = c;
            TestHelper.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(TestHelper,"TestHelper",asm,false,false,false,false,false,[],[],((asm0)["System.Object"])(),is_inst_default(TestHelper),Array,"asm1.t2000006");
                TestHelper.Interfaces = [];
                declare_virtual(TestHelper,"asm0.x6000005","asm0.x6000005");
                declare_virtual(TestHelper,"asm0.x6000008","asm0.x6000008");
                declare_virtual(TestHelper,"asm0.x6000009","asm0.x6000009");
            };
            TestHelper.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.ICommon = (function ()
    {
        var ct;
        ct = null;
        return function ()
        {
            var c;
            var initialized;
            c = ct;
            
            if (c){
                return c;
            }
            initialized = false;;
            function ICommon()
            {
                (ICommon.init)();
                this.constructor = ICommon;
            };
            c = ICommon;
            ct = c;
            ICommon.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(ICommon,"ICommon",asm,false,false,true,false,false,[],[
                    [
                        asm1,
                        "x600000c",
                        "DoIt"
                    ]
                ],null,is_inst_interface(ICommon),Array,"asm1.t2000007");
                ICommon.Interfaces = [];
                declare_virtual(ICommon,"asm1.x600000c","asm1.x600000c");
            };
            ICommon.prototype = {};
            return c;
        };
    })();
    asm.Base = (function ()
    {
        var ct;
        ct = null;
        return function ()
        {
            var c;
            var initialized;
            c = ct;
            
            if (c){
                return c;
            }
            initialized = false;;
            function Base()
            {
                (Base.init)();
                this.constructor = Base;
            };
            c = Base;
            ct = c;
            Base.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(Base,"Base",asm,false,false,false,false,false,[],[
                    [
                        asm1,
                        "x600000e",
                        "DoIt"
                    ]
                ],((asm0)["System.Object"])(),is_inst_default(Base),Array,"asm1.t2000008");
                Base.Interfaces = [
                    (asm1.ICommon)()
                ];
                declare_virtual(Base,"asm1.x600000d","asm1.x600000d");
                declare_virtual(Base,"asm1.x600000e","asm1.x600000e");
                declare_virtual(Base,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Base,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Base,"asm0.x6000009","asm0.x6000009");
                tree_set([
                    (asm1.ICommon)()
                ],Base.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x600000d;
                    }
                });
            };
            Base.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.Derived = (function ()
    {
        var ct;
        ct = null;
        return function ()
        {
            var c;
            var initialized;
            c = ct;
            
            if (c){
                return c;
            }
            initialized = false;;
            function Derived()
            {
                (Derived.init)();
                this.constructor = Derived;
            };
            c = Derived;
            ct = c;
            Derived.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(Derived,"Derived",asm,false,false,false,false,false,[],[
                    [
                        asm1,
                        "x6000011",
                        "DoIt"
                    ]
                ],(asm1.Base)(),is_inst_default(Derived),Array,"asm1.t2000009");
                Derived.Interfaces = [
                    (asm1.ICommon)()
                ];
                declare_virtual(Derived,"asm1.x6000010","asm1.x6000010");
                declare_virtual(Derived,"asm1.x6000011","asm1.x6000011");
                declare_virtual(Derived,"asm1.x600000e","asm1.x600000e");
                declare_virtual(Derived,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Derived,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Derived,"asm0.x6000009","asm0.x6000009");
                tree_set([
                    (asm1.ICommon)()
                ],Derived.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x6000010;
                    }
                });
            };
            Derived.prototype = new ((asm1.Base)())();
            return c;
        };
    })();
    asm.ReallyDerived = (function ()
    {
        var ct;
        ct = null;
        return function ()
        {
            var c;
            var initialized;
            c = ct;
            
            if (c){
                return c;
            }
            initialized = false;;
            function ReallyDerived()
            {
                (ReallyDerived.init)();
                this.constructor = ReallyDerived;
            };
            c = ReallyDerived;
            ct = c;
            ReallyDerived.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(ReallyDerived,"ReallyDerived",asm,false,false,false,false,false,[],[
                    [
                        asm1,
                        "x6000013",
                        "DoIt"
                    ]
                ],(asm1.Derived)(),is_inst_default(ReallyDerived),Array,"asm1.t200000a");
                ReallyDerived.Interfaces = [
                    (asm1.ICommon)()
                ];
                declare_virtual(ReallyDerived,"asm1.x6000011","asm1.x6000013");
                declare_virtual(ReallyDerived,"asm1.x600000e","asm1.x600000e");
                declare_virtual(ReallyDerived,"asm0.x6000005","asm0.x6000005");
                declare_virtual(ReallyDerived,"asm0.x6000008","asm0.x6000008");
                declare_virtual(ReallyDerived,"asm0.x6000009","asm0.x6000009");
                tree_set([
                    (asm1.ICommon)()
                ],ReallyDerived.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x6000010;
                    }
                });
            };
            ReallyDerived.prototype = new ((asm1.Derived)())();
            return c;
        };
    })();
    asm.Test = (function ()
    {
        var ct;
        ct = null;
        return function ()
        {
            var c;
            var initialized;
            c = ct;
            
            if (c){
                return c;
            }
            initialized = false;;
            function Test()
            {
                (Test.init)();
                this.constructor = Test;
            };
            c = Test;
            ct = c;
            Test.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(Test,"Test",asm,false,false,false,false,false,[],[],((asm0)["System.Object"])(),is_inst_default(Test),Array,"asm1.t200000b");
                Test.Interfaces = [];
                declare_virtual(Test,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Test,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Test,"asm0.x6000009","asm0.x6000009");
            };
            Test.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.entryPoint = asm.x6000015;
})(asm1 || (asm1 = {}));
