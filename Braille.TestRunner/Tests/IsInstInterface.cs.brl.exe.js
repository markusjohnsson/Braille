var asm1; (function (asm)
{
    asm.FullName = "IsInstInterface.cs.brl, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    
    asm.next_hash = 1;

    function nop() {}

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
    /* Void .ctor()*/
    asm.x600000c = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* Void .ctor()*/
    asm.x600000d = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x600000c)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* Void .ctor()*/
    asm.x600000e = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x600000c)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* Void .ctor()*/
    asm.x600000f = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        (asm1.x600000e)(arg0);
        /* IL_06: ret */
        return ;
    };;
    /* static Void Main()*/
    asm.x6000010_init = function ()
    {
        ((asm1.A)().init)();
        ((asm1.B)().init)();
        ((asm1.C)().init)();
        ((asm1.D)().init)();
        asm.x6000010 = asm.x6000010_;
    };;
    asm.x6000010 = function ()
    {
        (asm.x6000010_init.apply)(this,arguments);
        return (asm.x6000010_.apply)(this,arguments);
    };;
    asm.x6000010_ = function Main()
    {
        var t0;
        var t1;
        var t2;
        var t3;
        t0 = (asm1.A)();
        t1 = (asm1.B)();
        t2 = (asm1.C)();
        t3 = (asm1.D)();
        /* IL_00: newobj Void .ctor()*/
        /* IL_05: call Void TestImpl(System.Object)*/
        (asm1.x6000011)(newobj(t0,asm1.x600000c,[
            null
        ]));
        /* IL_0A: newobj Void .ctor()*/
        /* IL_0F: call Void TestImpl(System.Object)*/
        (asm1.x6000011)(newobj(t1,asm1.x600000d,[
            null
        ]));
        /* IL_14: newobj Void .ctor()*/
        /* IL_19: call Void TestImpl(System.Object)*/
        (asm1.x6000011)(newobj(t2,asm1.x600000e,[
            null
        ]));
        /* IL_1E: newobj Void .ctor()*/
        /* IL_23: call Void TestImpl(System.Object)*/
        (asm1.x6000011)(newobj(t3,asm1.x600000f,[
            null
        ]));
        /* IL_28: ret */
        return ;
    };
    /* static Void TestImpl(System.Object)*/
    asm.x6000011_init = function ()
    {
        ((asm1.I1)().init)();
        ((asm1.I2)().init)();
        ((asm1.I3)().init)();
        asm.x6000011 = asm.x6000011_;
    };;
    asm.x6000011 = function (arg0)
    {
        (asm.x6000011_init.apply)(this,arguments);
        return (asm.x6000011_.apply)(this,arguments);
    };;
    asm.x6000011_ = function TestImpl(arg0)
    {
        var t0;
        var t1;
        var t2;
        var st_02;
        var st_05;
        var st_08;
        var __pos_0__;
        t0 = (asm1.I1)();
        t1 = (asm1.I2)();
        t2 = (asm1.I3)();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: ldarg.0 */
                /* IL_01: isinst I1*/
                /* IL_06: brtrue.s IL_0F*/
                
                if ((t0.IsInst)(arg0)){
                    __pos_0__ = 0xF;
                    continue;
                }
                /* IL_08: ldstr false*/
                st_02 = new_string("false");
                /* IL_0D: br.s IL_14*/
                __pos_0__ = 0x14;
                continue;
                case 0xF:
                /* IL_0F: ldstr true*/
                st_02 = new_string("true");
                case 0x14:
                /* IL_14: call Void Log(System.Object)*/
                (asm1.x6000001)(st_02);
                /* IL_19: ldarg.0 */
                /* IL_1A: isinst I2*/
                /* IL_1F: brtrue.s IL_28*/
                
                if ((t1.IsInst)(arg0)){
                    __pos_0__ = 0x28;
                    continue;
                }
                /* IL_21: ldstr false*/
                st_05 = new_string("false");
                /* IL_26: br.s IL_2D*/
                __pos_0__ = 0x2D;
                continue;
                case 0x28:
                /* IL_28: ldstr true*/
                st_05 = new_string("true");
                case 0x2D:
                /* IL_2D: call Void Log(System.Object)*/
                (asm1.x6000001)(st_05);
                /* IL_32: ldarg.0 */
                /* IL_33: isinst I3*/
                /* IL_38: brtrue.s IL_41*/
                
                if ((t2.IsInst)(arg0)){
                    __pos_0__ = 0x41;
                    continue;
                }
                /* IL_3A: ldstr false*/
                st_08 = new_string("false");
                /* IL_3F: br.s IL_46*/
                __pos_0__ = 0x46;
                continue;
                case 0x41:
                /* IL_41: ldstr true*/
                st_08 = new_string("true");
                case 0x46:
                /* IL_46: call Void Log(System.Object)*/
                (asm1.x6000001)(st_08);
                /* IL_4B: ret */
                return ;
            }
        }
    };
    /* Void .ctor()*/
    asm.x6000012 = function _ctor(arg0)
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
                TestLog.CustomAttributes = [];
                TestLog.Methods = [];
                TestLog.BaseType = ((asm0)["System.Object"])();
                TestLog.FullName = "TestLog";
                TestLog.Assembly = asm;
                TestLog.Interfaces = [];
                TestLog.IsInst = function (t) { return t instanceof TestLog ? t : null; };
                TestLog.IsValueType = false;
                TestLog.IsPrimitive = false;
                TestLog.IsInterface = false;
                TestLog.IsGenericTypeDefinition = false;
                TestLog.IsNullable = false;
                TestLog.ArrayType = Array;
                TestLog.MetadataName = "asm1.t2000002";
                TestLog.GenericArguments = {};
                (TestLog.GenericArguments)["asm1.t2000002"] = [];
                (TestLog.GenericArguments)["asm0.t2000002"] = [];
                TestLog.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000008;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                TestLog.prototype.ifacemap = {};
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
                TestHelper.CustomAttributes = [];
                TestHelper.Methods = [];
                TestHelper.BaseType = ((asm0)["System.Object"])();
                TestHelper.FullName = "TestHelper";
                TestHelper.Assembly = asm;
                TestHelper.Interfaces = [];
                TestHelper.IsInst = function (t) { return t instanceof TestHelper ? t : null; };
                TestHelper.IsValueType = false;
                TestHelper.IsPrimitive = false;
                TestHelper.IsInterface = false;
                TestHelper.IsGenericTypeDefinition = false;
                TestHelper.IsNullable = false;
                TestHelper.ArrayType = Array;
                TestHelper.MetadataName = "asm1.t2000006";
                TestHelper.GenericArguments = {};
                (TestHelper.GenericArguments)["asm1.t2000006"] = [];
                (TestHelper.GenericArguments)["asm0.t2000002"] = [];
                TestHelper.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000008;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                TestHelper.prototype.ifacemap = {};
            };
            TestHelper.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.I1 = (function ()
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
            function I1()
            {
                (I1.init)();
                this.constructor = I1;
            };
            c = I1;
            ct = c;
            I1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                I1.CustomAttributes = [];
                I1.Methods = [];
                I1.BaseType = null;
                I1.FullName = "I1";
                I1.Assembly = asm;
                I1.Interfaces = [];
                I1.IsInst = function (t) { try { return (t.type || t.constructor).Interfaces.indexOf(I1) != -1 ? t : null; } catch (e) { return false; } };
                I1.IsValueType = false;
                I1.IsPrimitive = false;
                I1.IsInterface = true;
                I1.IsGenericTypeDefinition = false;
                I1.IsNullable = false;
                I1.ArrayType = Array;
                I1.MetadataName = "asm1.t2000007";
                I1.GenericArguments = {};
                (I1.GenericArguments)["asm1.t2000007"] = [];
                I1.prototype.vtable = {};
                I1.prototype.ifacemap = {};
            };
            I1.prototype = {};
            return c;
        };
    })();
    asm.I2 = (function ()
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
            function I2()
            {
                (I2.init)();
                this.constructor = I2;
            };
            c = I2;
            ct = c;
            I2.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                I2.CustomAttributes = [];
                I2.Methods = [];
                I2.BaseType = null;
                I2.FullName = "I2";
                I2.Assembly = asm;
                I2.Interfaces = [];
                I2.IsInst = function (t) { try { return (t.type || t.constructor).Interfaces.indexOf(I2) != -1 ? t : null; } catch (e) { return false; } };
                I2.IsValueType = false;
                I2.IsPrimitive = false;
                I2.IsInterface = true;
                I2.IsGenericTypeDefinition = false;
                I2.IsNullable = false;
                I2.ArrayType = Array;
                I2.MetadataName = "asm1.t2000008";
                I2.GenericArguments = {};
                (I2.GenericArguments)["asm1.t2000008"] = [];
                I2.prototype.vtable = {};
                I2.prototype.ifacemap = {};
            };
            I2.prototype = {};
            return c;
        };
    })();
    asm.I3 = (function ()
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
            function I3()
            {
                (I3.init)();
                this.constructor = I3;
            };
            c = I3;
            ct = c;
            I3.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                I3.CustomAttributes = [];
                I3.Methods = [];
                I3.BaseType = null;
                I3.FullName = "I3";
                I3.Assembly = asm;
                I3.Interfaces = [
                    (asm1.I2)()
                ];
                I3.IsInst = function (t) { try { return (t.type || t.constructor).Interfaces.indexOf(I3) != -1 ? t : null; } catch (e) { return false; } };
                I3.IsValueType = false;
                I3.IsPrimitive = false;
                I3.IsInterface = true;
                I3.IsGenericTypeDefinition = false;
                I3.IsNullable = false;
                I3.ArrayType = Array;
                I3.MetadataName = "asm1.t2000009";
                I3.GenericArguments = {};
                (I3.GenericArguments)["asm1.t2000009"] = [];
                I3.prototype.vtable = {};
                I3.prototype.ifacemap = {};
            };
            I3.prototype = {};
            return c;
        };
    })();
    asm.A = (function ()
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
            function A()
            {
                (A.init)();
                this.constructor = A;
            };
            c = A;
            ct = c;
            A.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                A.CustomAttributes = [];
                A.Methods = [];
                A.BaseType = ((asm0)["System.Object"])();
                A.FullName = "A";
                A.Assembly = asm;
                A.Interfaces = [];
                A.IsInst = function (t) { return t instanceof A ? t : null; };
                A.IsValueType = false;
                A.IsPrimitive = false;
                A.IsInterface = false;
                A.IsGenericTypeDefinition = false;
                A.IsNullable = false;
                A.ArrayType = Array;
                A.MetadataName = "asm1.t200000a";
                A.GenericArguments = {};
                (A.GenericArguments)["asm1.t200000a"] = [];
                (A.GenericArguments)["asm0.t2000002"] = [];
                A.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000008;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                A.prototype.ifacemap = {};
            };
            A.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.B = (function ()
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
            function B()
            {
                (B.init)();
                this.constructor = B;
            };
            c = B;
            ct = c;
            B.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                B.CustomAttributes = [];
                B.Methods = [];
                B.BaseType = (asm1.A)();
                B.FullName = "B";
                B.Assembly = asm;
                B.Interfaces = [
                    (asm1.I1)(),
                    (asm1.I2)()
                ];
                B.IsInst = function (t) { return t instanceof B ? t : null; };
                B.IsValueType = false;
                B.IsPrimitive = false;
                B.IsInterface = false;
                B.IsGenericTypeDefinition = false;
                B.IsNullable = false;
                B.ArrayType = Array;
                B.MetadataName = "asm1.t200000b";
                B.GenericArguments = {};
                (B.GenericArguments)["asm1.t200000b"] = [];
                (B.GenericArguments)["asm1.t200000a"] = [];
                (B.GenericArguments)["asm0.t2000002"] = [];
                B.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000008;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                B.prototype.ifacemap = {};
                tree_set([
                    (asm1.I1)()
                ],B.prototype.ifacemap,{});
                tree_set([
                    (asm1.I2)()
                ],B.prototype.ifacemap,{});
            };
            B.prototype = new ((asm1.A)())();
            return c;
        };
    })();
    asm.C = (function ()
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
            function C()
            {
                (C.init)();
                this.constructor = C;
            };
            c = C;
            ct = c;
            C.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                C.CustomAttributes = [];
                C.Methods = [];
                C.BaseType = (asm1.A)();
                C.FullName = "C";
                C.Assembly = asm;
                C.Interfaces = [
                    (asm1.I3)(),
                    (asm1.I2)()
                ];
                C.IsInst = function (t) { return t instanceof C ? t : null; };
                C.IsValueType = false;
                C.IsPrimitive = false;
                C.IsInterface = false;
                C.IsGenericTypeDefinition = false;
                C.IsNullable = false;
                C.ArrayType = Array;
                C.MetadataName = "asm1.t200000c";
                C.GenericArguments = {};
                (C.GenericArguments)["asm1.t200000c"] = [];
                (C.GenericArguments)["asm1.t200000a"] = [];
                (C.GenericArguments)["asm0.t2000002"] = [];
                C.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000008;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                C.prototype.ifacemap = {};
                tree_set([
                    (asm1.I3)()
                ],C.prototype.ifacemap,{});
                tree_set([
                    (asm1.I2)()
                ],C.prototype.ifacemap,{});
            };
            C.prototype = new ((asm1.A)())();
            return c;
        };
    })();
    asm.D = (function ()
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
            function D()
            {
                (D.init)();
                this.constructor = D;
            };
            c = D;
            ct = c;
            D.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                D.CustomAttributes = [];
                D.Methods = [];
                D.BaseType = (asm1.C)();
                D.FullName = "D";
                D.Assembly = asm;
                D.Interfaces = [
                    (asm1.I2)(),
                    (asm1.I3)()
                ];
                D.IsInst = function (t) { return t instanceof D ? t : null; };
                D.IsValueType = false;
                D.IsPrimitive = false;
                D.IsInterface = false;
                D.IsGenericTypeDefinition = false;
                D.IsNullable = false;
                D.ArrayType = Array;
                D.MetadataName = "asm1.t200000d";
                D.GenericArguments = {};
                (D.GenericArguments)["asm1.t200000d"] = [];
                (D.GenericArguments)["asm1.t200000c"] = [];
                (D.GenericArguments)["asm1.t200000a"] = [];
                (D.GenericArguments)["asm0.t2000002"] = [];
                D.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000008;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                D.prototype.ifacemap = {};
                tree_set([
                    (asm1.I2)()
                ],D.prototype.ifacemap,{});
                tree_set([
                    (asm1.I3)()
                ],D.prototype.ifacemap,{});
            };
            D.prototype = new ((asm1.C)())();
            return c;
        };
    })();
    asm.Program = (function ()
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
            function Program()
            {
                (Program.init)();
                this.constructor = Program;
            };
            c = Program;
            ct = c;
            Program.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Program.CustomAttributes = [];
                Program.Methods = [];
                Program.BaseType = ((asm0)["System.Object"])();
                Program.FullName = "Program";
                Program.Assembly = asm;
                Program.Interfaces = [];
                Program.IsInst = function (t) { return t instanceof Program ? t : null; };
                Program.IsValueType = false;
                Program.IsPrimitive = false;
                Program.IsInterface = false;
                Program.IsGenericTypeDefinition = false;
                Program.IsNullable = false;
                Program.ArrayType = Array;
                Program.MetadataName = "asm1.t200000e";
                Program.GenericArguments = {};
                (Program.GenericArguments)["asm1.t200000e"] = [];
                (Program.GenericArguments)["asm0.t2000002"] = [];
                Program.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000008;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                Program.prototype.ifacemap = {};
            };
            Program.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.entryPoint = asm.x6000010;
})(asm1 || (asm1 = {}));
