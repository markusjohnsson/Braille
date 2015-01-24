var asm1; (function (asm)
{
    asm.FullName = "iface4.cs.brl, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    
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
    /* Int32 IVehicle.Start()*/
    asm.x6000010 = function IVehicle_Start(arg0)
    {
        /* IL_00: ldc.i4.1 */
        /* IL_01: ret */
        return (1|0);
    };;
    /* Int32 Stop()*/
    asm.x6000011 = function Stop(arg0)
    {
        /* IL_00: ldc.i4.2 */
        /* IL_01: ret */
        return (2|0);
    };;
    /* Int32 Turn()*/
    asm.x6000012 = function Turn(arg0)
    {
        /* IL_00: ldc.i4.3 */
        /* IL_01: ret */
        return (3|0);
    };;
    /* Int32 Walk()*/
    asm.x6000013 = function Walk(arg0)
    {
        /* IL_00: ldc.i4.1 */
        /* IL_01: ret */
        return (1|0);
    };;
    /* Void .ctor()*/
    asm.x6000014 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* Int32 Turn()*/
    asm.x6000015 = function Turn(arg0)
    {
        /* IL_00: ldc.i4.4 */
        /* IL_01: ret */
        return (4|0);
    };;
    /* Void .ctor()*/
    asm.x6000016 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x6000014)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* Int32 Stop()*/
    asm.x6000017 = function Stop(arg0)
    {
        /* IL_00: ldc.i4.6 */
        /* IL_01: ret */
        return (6|0);
    };;
    /* Int32 IVehicle.Start()*/
    asm.x6000018 = function IVehicle_Start(arg0)
    {
        /* IL_00: ldc.i4.5 */
        /* IL_01: ret */
        return (5|0);
    };;
    /* Int32 IVehicle.Turn()*/
    asm.x6000019 = function IVehicle_Turn(arg0)
    {
        /* IL_00: ldc.i4.7 */
        /* IL_01: ret */
        return (7|0);
    };;
    /* Int32 Turn()*/
    asm.x600001a = function Turn(arg0)
    {
        /* IL_00: ldc.i4.8 */
        /* IL_01: ret */
        return (8|0);
    };;
    /* Void .ctor()*/
    asm.x600001b = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x6000014)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* Void .ctor()*/
    asm.x600001c = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x6000016)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* static Int32 Main()*/
    asm.x600001d_init = function ()
    {
        ((asm1.Derived1)().init)();
        ((asm1.Derived2)().init)();
        ((asm1.Derived3)().init)();
        ((asm1.Base)().init)();
        ((asm1.IVehicle)().init)();
        asm.x600001d = asm.x600001d_;
    };;
    asm.x600001d = function ()
    {
        (asm.x600001d_init.apply)(this,arguments);
        return (asm.x600001d_.apply)(this,arguments);
    };;
    asm.x600001d_ = function Main()
    {
        var t0;
        var t1;
        var t2;
        var t3;
        var t4;
        var __pos_0__;
        var loc0;
        var loc1;
        var loc2;
        var loc3;
        var loc4;
        t0 = (asm1.Derived1)();
        t1 = (asm1.Derived2)();
        t2 = (asm1.Derived3)();
        t3 = (asm1.Base)();
        t4 = (asm1.IVehicle)();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: newobj Void .ctor()*/
                /* IL_05: stloc.0 */
                loc0 = newobj(t0,asm1.x6000016,[
                    null
                ]);
                /* IL_06: newobj Void .ctor()*/
                /* IL_0B: stloc.1 */
                loc1 = newobj(t1,asm1.x600001b,[
                    null
                ]);
                /* IL_0C: newobj Void .ctor()*/
                /* IL_11: stloc.2 */
                loc2 = newobj(t2,asm1.x600001c,[
                    null
                ]);
                /* IL_12: ldloc.1 */
                /* IL_13: stloc.3 */
                loc3 = loc1;
                /* IL_14: newobj Void .ctor()*/
                /* IL_19: stloc.s 4*/
                loc4 = newobj(t3,asm1.x6000014,[
                    null
                ]);
                /* IL_1B: ldloc.0 */
                /* IL_1C: callvirt Int32 Turn()*/
                /* IL_21: ldc.i4.4 */
                /* IL_22: beq.s IL_26*/
                
                if ((((loc0.vtable)["asm1.x6000012"])())(loc0) === (4|0)){
                    __pos_0__ = 0x26;
                    continue;
                }
                /* IL_24: ldc.i4.1 */
                /* IL_25: ret */
                return (1|0);
                case 0x26:
                /* IL_26: ldloc.0 */
                /* IL_27: callvirt Int32 Turn()*/
                /* IL_2C: ldc.i4.4 */
                /* IL_2D: beq.s IL_31*/
                
                if ((((loc0.ifacemap)[t4].x600000e)())(loc0) === (4|0)){
                    __pos_0__ = 0x31;
                    continue;
                }
                /* IL_2F: ldc.i4.2 */
                /* IL_30: ret */
                return (2|0);
                case 0x31:
                /* IL_31: ldloc.1 */
                /* IL_32: callvirt Int32 Turn()*/
                /* IL_37: ldc.i4.8 */
                /* IL_38: beq.s IL_3D*/
                
                if ((((loc1.vtable)["asm1.x6000012"])())(loc1) === (8|0)){
                    __pos_0__ = 0x3D;
                    continue;
                }
                /* IL_3A: ldc.i4.s 10*/
                /* IL_3C: ret */
                return (10|0);
                case 0x3D:
                /* IL_3D: ldloc.1 */
                /* IL_3E: callvirt Int32 Turn()*/
                /* IL_43: ldc.i4.7 */
                /* IL_44: beq.s IL_48*/
                
                if ((((loc1.ifacemap)[t4].x600000e)())(loc1) === (7|0)){
                    __pos_0__ = 0x48;
                    continue;
                }
                /* IL_46: ldc.i4.3 */
                /* IL_47: ret */
                return (3|0);
                case 0x48:
                /* IL_48: ldloc.3 */
                /* IL_49: callvirt Int32 Turn()*/
                /* IL_4E: ldc.i4.8 */
                /* IL_4F: beq.s IL_53*/
                
                if ((((loc3.vtable)["asm1.x6000012"])())(loc3) === (8|0)){
                    __pos_0__ = 0x53;
                    continue;
                }
                /* IL_51: ldc.i4.4 */
                /* IL_52: ret */
                return (4|0);
                case 0x53:
                /* IL_53: ldloc.3 */
                /* IL_54: callvirt Int32 Turn()*/
                /* IL_59: ldc.i4.7 */
                /* IL_5A: beq.s IL_5E*/
                
                if ((((loc3.ifacemap)[t4].x600000e)())(loc3) === (7|0)){
                    __pos_0__ = 0x5E;
                    continue;
                }
                /* IL_5C: ldc.i4.5 */
                /* IL_5D: ret */
                return (5|0);
                case 0x5E:
                /* IL_5E: ldloc.s 4*/
                /* IL_60: callvirt Int32 Stop()*/
                /* IL_65: ldc.i4.2 */
                /* IL_66: beq.s IL_6A*/
                
                if ((((loc4.ifacemap)[t4].x600000d)())(loc4) === (2|0)){
                    __pos_0__ = 0x6A;
                    continue;
                }
                /* IL_68: ldc.i4.6 */
                /* IL_69: ret */
                return (6|0);
                case 0x6A:
                /* IL_6A: ldloc.0 */
                /* IL_6B: callvirt Int32 Stop()*/
                /* IL_70: ldc.i4.2 */
                /* IL_71: beq.s IL_75*/
                
                if ((((loc0.ifacemap)[t4].x600000d)())(loc0) === (2|0)){
                    __pos_0__ = 0x75;
                    continue;
                }
                /* IL_73: ldc.i4.7 */
                /* IL_74: ret */
                return (7|0);
                case 0x75:
                /* IL_75: ldloc.1 */
                /* IL_76: callvirt Int32 Stop()*/
                /* IL_7B: ldc.i4.6 */
                /* IL_7C: beq.s IL_80*/
                
                if ((((loc1.ifacemap)[t4].x600000d)())(loc1) === (6|0)){
                    __pos_0__ = 0x80;
                    continue;
                }
                /* IL_7E: ldc.i4.8 */
                /* IL_7F: ret */
                return (8|0);
                case 0x80:
                /* IL_80: ldloc.2 */
                /* IL_81: callvirt Int32 Walk()*/
                /* IL_86: ldc.i4.1 */
                /* IL_87: beq.s IL_8C*/
                
                if ((((loc2.vtable)["asm1.x6000013"])())(loc2) === (1|0)){
                    __pos_0__ = 0x8C;
                    continue;
                }
                /* IL_89: ldc.i4.s 9*/
                /* IL_8B: ret */
                return (9|0);
                case 0x8C:
                /* IL_8C: ldc.i4.0 */
                /* IL_8D: ret */
                return (0|0);
            }
        }
    };
    /* Void .ctor()*/
    asm.x600001e = function _ctor(arg0)
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
    asm.IVehicle = (function ()
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
            function IVehicle()
            {
                (IVehicle.init)();
                this.constructor = IVehicle;
            };
            c = IVehicle;
            ct = c;
            IVehicle.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(IVehicle,"IVehicle",asm,false,false,true,false,false,[],[
                    [
                        asm1,
                        "x600000c",
                        "Start"
                    ],
                    [
                        asm1,
                        "x600000d",
                        "Stop"
                    ],
                    [
                        asm1,
                        "x600000e",
                        "Turn"
                    ]
                ],null,is_inst_interface(IVehicle),Array,"asm1.t2000007");
                IVehicle.Interfaces = [];
                declare_virtual(IVehicle,"asm1.x600000c","asm1.x600000c");
                declare_virtual(IVehicle,"asm1.x600000d","asm1.x600000d");
                declare_virtual(IVehicle,"asm1.x600000e","asm1.x600000e");
            };
            IVehicle.prototype = {};
            return c;
        };
    })();
    asm.IWalker = (function ()
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
            function IWalker()
            {
                (IWalker.init)();
                this.constructor = IWalker;
            };
            c = IWalker;
            ct = c;
            IWalker.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(IWalker,"IWalker",asm,false,false,true,false,false,[],[
                    [
                        asm1,
                        "x600000f",
                        "Walk"
                    ]
                ],null,is_inst_interface(IWalker),Array,"asm1.t2000008");
                IWalker.Interfaces = [];
                declare_virtual(IWalker,"asm1.x600000f","asm1.x600000f");
            };
            IWalker.prototype = {};
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
                        "x6000011",
                        "Stop"
                    ],
                    [
                        asm1,
                        "x6000012",
                        "Turn"
                    ],
                    [
                        asm1,
                        "x6000013",
                        "Walk"
                    ]
                ],((asm0)["System.Object"])(),is_inst_default(Base),Array,"asm1.t2000009");
                Base.Interfaces = [
                    (asm1.IVehicle)()
                ];
                declare_virtual(Base,"asm1.x6000010","asm1.x6000010");
                declare_virtual(Base,"asm1.x6000011","asm1.x6000011");
                declare_virtual(Base,"asm1.x6000012","asm1.x6000012");
                declare_virtual(Base,"asm1.x6000013","asm1.x6000013");
                declare_virtual(Base,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Base,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Base,"asm0.x6000009","asm0.x6000009");
                tree_set([
                    (asm1.IVehicle)()
                ],Base.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x6000010;
                    },
                    'x600000d': function ()
                    {
                        return asm1.x6000011;
                    },
                    'x600000e': function ()
                    {
                        return asm1.x6000012;
                    }
                });
            };
            Base.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.Derived1 = (function ()
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
            function Derived1()
            {
                (Derived1.init)();
                this.constructor = Derived1;
            };
            c = Derived1;
            ct = c;
            Derived1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(Derived1,"Derived1",asm,false,false,false,false,false,[],[
                    [
                        asm1,
                        "x6000015",
                        "Turn"
                    ]
                ],(asm1.Base)(),is_inst_default(Derived1),Array,"asm1.t200000a");
                Derived1.Interfaces = [
                    (asm1.IVehicle)()
                ];
                declare_virtual(Derived1,"asm1.x6000012","asm1.x6000015");
                declare_virtual(Derived1,"asm1.x6000011","asm1.x6000011");
                declare_virtual(Derived1,"asm1.x6000013","asm1.x6000013");
                declare_virtual(Derived1,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Derived1,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Derived1,"asm0.x6000009","asm0.x6000009");
                tree_set([
                    (asm1.IVehicle)()
                ],Derived1.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x6000010;
                    },
                    'x600000d': function ()
                    {
                        return asm1.x6000011;
                    },
                    'x600000e': function ()
                    {
                        return asm1.x6000015;
                    }
                });
            };
            Derived1.prototype = new ((asm1.Base)())();
            return c;
        };
    })();
    asm.Derived2 = (function ()
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
            function Derived2()
            {
                (Derived2.init)();
                this.constructor = Derived2;
            };
            c = Derived2;
            ct = c;
            Derived2.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(Derived2,"Derived2",asm,false,false,false,false,false,[],[
                    [
                        asm1,
                        "x6000017",
                        "Stop"
                    ],
                    [
                        asm1,
                        "x600001a",
                        "Turn"
                    ]
                ],(asm1.Base)(),is_inst_default(Derived2),Array,"asm1.t200000b");
                Derived2.Interfaces = [
                    (asm1.IVehicle)()
                ];
                declare_virtual(Derived2,"asm1.x6000017","asm1.x6000017");
                declare_virtual(Derived2,"asm1.x6000018","asm1.x6000018");
                declare_virtual(Derived2,"asm1.x6000019","asm1.x6000019");
                declare_virtual(Derived2,"asm1.x6000012","asm1.x600001a");
                declare_virtual(Derived2,"asm1.x6000011","asm1.x6000011");
                declare_virtual(Derived2,"asm1.x6000013","asm1.x6000013");
                declare_virtual(Derived2,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Derived2,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Derived2,"asm0.x6000009","asm0.x6000009");
                tree_set([
                    (asm1.IVehicle)()
                ],Derived2.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x6000018;
                    },
                    'x600000d': function ()
                    {
                        return asm1.x6000017;
                    },
                    'x600000e': function ()
                    {
                        return asm1.x6000019;
                    }
                });
            };
            Derived2.prototype = new ((asm1.Base)())();
            return c;
        };
    })();
    asm.Derived3 = (function ()
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
            function Derived3()
            {
                (Derived3.init)();
                this.constructor = Derived3;
            };
            c = Derived3;
            ct = c;
            Derived3.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                initType(Derived3,"Derived3",asm,false,false,false,false,false,[],[],(asm1.Derived1)(),is_inst_default(Derived3),Array,"asm1.t200000c");
                Derived3.Interfaces = [
                    (asm1.IWalker)(),
                    (asm1.IVehicle)()
                ];
                declare_virtual(Derived3,"asm1.x6000012","asm1.x6000015");
                declare_virtual(Derived3,"asm1.x6000011","asm1.x6000011");
                declare_virtual(Derived3,"asm1.x6000013","asm1.x6000013");
                declare_virtual(Derived3,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Derived3,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Derived3,"asm0.x6000009","asm0.x6000009");
                tree_set([
                    (asm1.IWalker)()
                ],Derived3.prototype.ifacemap,{
                    'x600000f': function ()
                    {
                        return asm1.x6000013;
                    }
                });
                tree_set([
                    (asm1.IVehicle)()
                ],Derived3.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x6000010;
                    },
                    'x600000d': function ()
                    {
                        return asm1.x6000011;
                    },
                    'x600000e': function ()
                    {
                        return asm1.x6000015;
                    }
                });
            };
            Derived3.prototype = new ((asm1.Derived1)())();
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
                initType(Test,"Test",asm,false,false,false,false,false,[],[],((asm0)["System.Object"])(),is_inst_default(Test),Array,"asm1.t200000d");
                Test.Interfaces = [];
                declare_virtual(Test,"asm0.x6000005","asm0.x6000005");
                declare_virtual(Test,"asm0.x6000008","asm0.x6000008");
                declare_virtual(Test,"asm0.x6000009","asm0.x6000009");
            };
            Test.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.entryPoint = asm.x600001d;
})(asm1 || (asm1 = {}));
