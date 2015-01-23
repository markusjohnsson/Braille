var asm1; (function (asm)
{
    asm.FullName = "GenericInterface.cs.brl, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    
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
    /* Void NonGeneric()*/
    asm.x600000f = function NonGeneric(arg0)
    {
        /* IL_00: ldstr A.NonGeneric*/
        /* IL_05: call Void Log(System.Object)*/
        (asm1.x6000001)(new_string("A.NonGeneric"));
        /* IL_0A: ret */
        return ;
    };;
    /* Void GenericArg(System.Int32)*/
    asm.x6000010 = function GenericArg(arg0,arg1)
    {
        /* IL_00: ldstr A.GenericArg*/
        /* IL_05: call Void Log(System.Object)*/
        (asm1.x6000001)(new_string("A.GenericArg"));
        /* IL_0A: ldarg.0 */
        /* IL_0B: ldarg.1 */
        /* IL_0C: stfld Int32 field*/
        arg0.Afield = arg1;
        /* IL_11: ret */
        return ;
    };;
    /* Int32 GenericReturn()*/
    asm.x6000011 = function GenericReturn(arg0)
    {
        /* IL_00: ldstr A.GenericReturn*/
        /* IL_05: call Void Log(System.Object)*/
        (asm1.x6000001)(new_string("A.GenericReturn"));
        /* IL_0A: ldarg.0 */
        /* IL_0B: ldfld Int32 field*/
        /* IL_10: ret */
        return arg0.Afield;
    };;
    /* Void .ctor()*/
    asm.x6000012 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* Void NonGeneric()*/
    asm.x6000013 = function NonGeneric(arg0)
    {
        /* IL_00: ldstr B.NonGeneric*/
        /* IL_05: call Void Log(System.Object)*/
        (asm1.x6000001)(new_string("B.NonGeneric"));
        /* IL_0A: ret */
        return ;
    };;
    /* Void GenericArg(T)*/
    asm.x6000014 = function GenericArg(arg0,arg1)
    {
        /* IL_00: ldstr B.NonGeneric*/
        /* IL_05: call Void Log(System.Object)*/
        (asm1.x6000001)(new_string("B.NonGeneric"));
        /* IL_0A: ldarg.0 */
        /* IL_0B: ldarg.1 */
        /* IL_0C: stfld T field*/
        arg0.B_1field = arg1;
        /* IL_11: ret */
        return ;
    };;
    /* T GenericReturn()*/
    asm.x6000015 = function GenericReturn(arg0)
    {
        /* IL_00: ldstr B.GenericReturn*/
        /* IL_05: call Void Log(System.Object)*/
        (asm1.x6000001)(new_string("B.GenericReturn"));
        /* IL_0A: ldarg.0 */
        /* IL_0B: ldfld T field*/
        /* IL_10: ret */
        return arg0.B_1field;
    };;
    /* Void .ctor()*/
    asm.x6000016 = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* static Void Main()*/
    asm.x6000017_init = function ()
    {
        ((asm1.A)().init)();
        (((asm0)["System.Int32"])().init)();
        (((asm0)["System.String"])().init)();
        (((asm1)["B`1"])(((asm0)["System.String"])()).init)();
        asm.x6000017 = asm.x6000017_;
    };;
    asm.x6000017 = function ()
    {
        (asm.x6000017_init.apply)(this,arguments);
        return (asm.x6000017_.apply)(this,arguments);
    };;
    asm.x6000017_ = function Main()
    {
        var t0;
        var t1;
        var t2;
        var t3;
        t0 = (asm1.A)();
        t1 = ((asm0)["System.Int32"])();
        t2 = ((asm0)["System.String"])();
        t3 = ((asm1)["B`1"])(((asm0)["System.String"])());
        /* IL_00: newobj Void .ctor()*/
        /* IL_05: ldc.i4 12345*/
        /* IL_0A: call Void Run[System.Int32](I`1[System.Int32], System.Int32)*/
        ((asm1.x6000018)(((asm0)["System.Int32"])()))(newobj(t0,asm1.x6000012,[
            null
        ]),(12345|0));
        /* IL_0F: newobj Void .ctor()*/
        /* IL_14: ldstr Hello*/
        /* IL_19: call Void Run[System.String](I`1[System.String], System.String)*/
        ((asm1.x6000018)(((asm0)["System.String"])()))(newobj(t3,asm1.x6000016,[
            null
        ]),new_string("Hello"));
        /* IL_1E: ret */
        return ;
    };
    /* static Void Run[T](I`1[T], T)*/
    asm.x6000018_init = function (T)
    {
        return function ()
        {
            (((asm1)["I`1"])(T).init)();
        };
    };;
    asm.x6000018 = function (T)
    {
        return function (arg0,arg1)
        {
            ((asm.x6000018_init)(T).apply)(this,arguments);
            return ((asm.x6000018_)(T).apply)(this,arguments);
        };
    };;
    asm.x6000018_ = function (T)
    {
        return function Run(arg0,arg1)
        {
            var t0;
            var t1;
            t0 = T;
            t1 = ((asm1)["I`1"])(T);
            /* IL_00: ldarg.0 */
            /* IL_01: callvirt Void NonGeneric()*/
            ((((arg0.ifacemap)[t1])[t0].x600000c)())(convert_box_to_pointer_as_needed(arg0));
            /* IL_06: ldarg.0 */
            /* IL_07: ldarg.1 */
            /* IL_08: callvirt Void GenericArg(T)*/
            ((((arg0.ifacemap)[t1])[t0].x600000d)())(convert_box_to_pointer_as_needed(arg0),arg1);
            /* IL_0D: ldarg.0 */
            /* IL_0E: callvirt T GenericReturn()*/
            /* IL_13: box T*/
            /* IL_18: call Void Log(System.Object)*/
            (asm1.x6000001)(box(((((arg0.ifacemap)[t1])[t0].x600000e)())(convert_box_to_pointer_as_needed(arg0)),t0));
            /* IL_1D: ret */
            return ;
        };
    };
    /* Void .ctor()*/
    asm.x6000019 = function _ctor(arg0)
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
    (asm)["I`1"] = (function ()
    {
        var ct;
        ct = {};
        return function (T)
        {
            var c;
            var initialized;
            c = tree_get([
                T
            ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function I_1()
            {
                (I_1.init)();
                this.constructor = I_1;
            };
            c = I_1;
            tree_set([
                T
            ],ct,c);
            I_1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                I_1.CustomAttributes = [];
                I_1.Methods = [
                    [
                        asm1,
                        "x600000c",
                        "NonGeneric"
                    ],
                    [
                        asm1,
                        "x600000d",
                        "GenericArg"
                    ],
                    [
                        asm1,
                        "x600000e",
                        "GenericReturn"
                    ]
                ];
                I_1.BaseType = null;
                I_1.FullName = "I`1";
                I_1.Assembly = asm;
                I_1.Interfaces = [];
                I_1.IsInst = function (t) { try { return (t.type || t.constructor).Interfaces.indexOf(I_1) != -1 ? t : null; } catch (e) { return false; } };
                I_1.IsValueType = false;
                I_1.IsPrimitive = false;
                I_1.IsInterface = true;
                I_1.IsGenericTypeDefinition = true;
                I_1.IsNullable = false;
                I_1.ArrayType = Array;
                I_1.MetadataName = "asm1.t2000007";
                I_1.GenericArguments = {};
                (I_1.GenericArguments)["asm1.t2000007"] = [
                    T
                ];
                I_1.prototype.vtable = {
                    'asm1.x600000c': function ()
                    {
                        return asm1.x600000c;
                    },
                    'asm1.x600000d': function ()
                    {
                        return asm1.x600000d;
                    },
                    'asm1.x600000e': function ()
                    {
                        return asm1.x600000e;
                    }
                };
                I_1.prototype.ifacemap = {};
            };
            I_1.prototype = {};
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
                A.Methods = [
                    [
                        asm1,
                        "x600000f",
                        "NonGeneric"
                    ],
                    [
                        asm1,
                        "x6000010",
                        "GenericArg"
                    ],
                    [
                        asm1,
                        "x6000011",
                        "GenericReturn"
                    ]
                ];
                A.BaseType = ((asm0)["System.Object"])();
                A.FullName = "A";
                A.Assembly = asm;
                A.Interfaces = [
                    ((asm1)["I`1"])(((asm0)["System.Int32"])())
                ];
                A.IsInst = function (t) { return t instanceof A ? t : null; };
                A.IsValueType = false;
                A.IsPrimitive = false;
                A.IsInterface = false;
                A.IsGenericTypeDefinition = false;
                A.IsNullable = false;
                A.ArrayType = Array;
                A.MetadataName = "asm1.t2000008";
                A.GenericArguments = {};
                (A.GenericArguments)["asm1.t2000008"] = [];
                (A.GenericArguments)["asm0.t2000002"] = [];
                A.prototype.Afield = 0;
                A.prototype.vtable = {
                    'asm1.x600000f': function ()
                    {
                        return asm1.x600000f;
                    },
                    'asm1.x6000010': function ()
                    {
                        return asm1.x6000010;
                    },
                    'asm1.x6000011': function ()
                    {
                        return asm1.x6000011;
                    },
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
                tree_set([
                    ((asm1)["I`1"])(((asm0)["System.Int32"])()),
                    ((asm0)["System.Int32"])()
                ],A.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x600000f;
                    },
                    'x600000d': function ()
                    {
                        return asm1.x6000010;
                    },
                    'x600000e': function ()
                    {
                        return asm1.x6000011;
                    }
                });
            };
            A.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["B`1"] = (function ()
    {
        var ct;
        ct = {};
        return function (T)
        {
            var c;
            var initialized;
            c = tree_get([
                T
            ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function B_1()
            {
                (B_1.init)();
                this.constructor = B_1;
            };
            c = B_1;
            tree_set([
                T
            ],ct,c);
            B_1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                B_1.CustomAttributes = [];
                B_1.Methods = [
                    [
                        asm1,
                        "x6000013",
                        "NonGeneric"
                    ],
                    [
                        asm1,
                        "x6000014",
                        "GenericArg"
                    ],
                    [
                        asm1,
                        "x6000015",
                        "GenericReturn"
                    ]
                ];
                B_1.BaseType = ((asm0)["System.Object"])();
                B_1.FullName = "B`1";
                B_1.Assembly = asm;
                B_1.Interfaces = [
                    ((asm1)["I`1"])(T)
                ];
                B_1.IsInst = function (t) { return t instanceof B_1 ? t : null; };
                B_1.IsValueType = false;
                B_1.IsPrimitive = false;
                B_1.IsInterface = false;
                B_1.IsGenericTypeDefinition = true;
                B_1.IsNullable = false;
                B_1.ArrayType = Array;
                B_1.MetadataName = "asm1.t2000009";
                B_1.GenericArguments = {};
                (B_1.GenericArguments)["asm1.t2000009"] = [
                    T
                ];
                (B_1.GenericArguments)["asm0.t2000002"] = [];
                B_1.prototype.B_1field = ((T.IsValueType) ? (((T.IsPrimitive) ? (0) : (new T()))) : (null));
                B_1.prototype.vtable = {
                    'asm1.x6000013': function ()
                    {
                        return asm1.x6000013;
                    },
                    'asm1.x6000014': function ()
                    {
                        return asm1.x6000014;
                    },
                    'asm1.x6000015': function ()
                    {
                        return asm1.x6000015;
                    },
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
                B_1.prototype.ifacemap = {};
                tree_set([
                    ((asm1)["I`1"])(T),
                    T
                ],B_1.prototype.ifacemap,{
                    'x600000c': function ()
                    {
                        return asm1.x6000013;
                    },
                    'x600000d': function ()
                    {
                        return asm1.x6000014;
                    },
                    'x600000e': function ()
                    {
                        return asm1.x6000015;
                    }
                });
            };
            B_1.prototype = new (((asm0)["System.Object"])())();
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
                Program.MetadataName = "asm1.t200000a";
                Program.GenericArguments = {};
                (Program.GenericArguments)["asm1.t200000a"] = [];
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
    asm.entryPoint = asm.x6000017;
})(asm1 || (asm1 = {}));
