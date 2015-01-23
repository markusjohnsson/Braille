var asm1; (function (asm)
{
    asm.FullName = "GenericDelegate.cs.brl, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null";
    
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
    /* TResult Invoke(T)*/
    asm.x600000d = function Invoke()
    {
        
                                var m = arguments[0]._methodPtr;
                                var t = arguments[0]._target;
                                if (t != null)
                                    arguments[0] = t;
                                else
                                    arguments = Array.prototype.slice.call(arguments, 1);
                                return m.apply(null, arguments);
    };;
    /* Void .ctor(System.Object, System.IntPtr)*/
    asm.x600000c = function ctor()
    {
        arguments[0]._methodPtr = arguments[2]; arguments[0]._target = arguments[1];;
    };;
    /* Void .ctor()*/
    asm.x600000e = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* Void .ctor()*/
    asm.x600000f = function _ctor(arg0)
    {
        /* IL_00: ldarg.0 */
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    /* static Void Main()*/
    asm.x6000010_init = function ()
    {
        ((asm1.Program)().init)();
        ((asm1.IntWrapper)().init)();
        ((asm1.StringWrapper)().init)();
        (((asm1)["MFunc`2"])((asm1.IntWrapper)(),(asm1.StringWrapper)()).init)();
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
        var __pos_0__;
        t0 = (asm1.Program)();
        t1 = (asm1.IntWrapper)();
        t2 = (asm1.StringWrapper)();
        t3 = ((asm1)["MFunc`2"])((asm1.IntWrapper)(),(asm1.StringWrapper)());
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: ldsfld MFunc`2 CS$<>9__CachedAnonymousMethodDelegate2*/
                /* IL_05: brtrue.s IL_18*/
                
                if ((t0)["CS$<>9__CachedAnonymousMethodDelegate2"]){
                    __pos_0__ = 0x18;
                    continue;
                }
                /* IL_07: ldnull */
                /* IL_09: ldftn StringWrapper <Main>b__1(IntWrapper)*/
                /* IL_0E: newobj Void .ctor(System.Object, System.IntPtr)*/
                /* IL_13: stsfld MFunc`2 CS$<>9__CachedAnonymousMethodDelegate2*/
                (t0)["CS$<>9__CachedAnonymousMethodDelegate2"] = newobj(t3,asm1.x600000c,[
                    null,
                    null,
                    (function ()
                    {
                        (asm1.x6000013_init)();
                        return asm1.x6000013;
                    })()
                ]);
                case 0x18:
                /* IL_18: ldsfld MFunc`2 CS$<>9__CachedAnonymousMethodDelegate2*/
                /* IL_1D: call Void CallDelegate(MFunc`2[IntWrapper,StringWrapper])*/
                (asm1.x6000011)((t0)["CS$<>9__CachedAnonymousMethodDelegate2"]);
                /* IL_22: ret */
                return ;
            }
        }
    };
    /* static Void CallDelegate(MFunc`2[IntWrapper,StringWrapper])*/
    asm.x6000011_init = function ()
    {
        ((asm1.IntWrapper)().init)();
        asm.x6000011 = asm.x6000011_;
    };;
    asm.x6000011 = function (arg0)
    {
        (asm.x6000011_init.apply)(this,arguments);
        return (asm.x6000011_.apply)(this,arguments);
    };;
    asm.x6000011_ = function CallDelegate(arg0)
    {
        var t0;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var loc0;
        t0 = (asm1.IntWrapper)();
        /* IL_00: ldarg.0 */
        st_03 = arg0;
        /* IL_01: newobj Void .ctor()*/
        /* IL_06: stloc.0 */
        loc0 = newobj(t0,asm1.x600000e,[
            null
        ]);
        /* IL_07: ldloc.0 */
        st_01 = loc0;
        /* IL_08: ldc.i4.s 123*/
        st_02 = (123|0);
        /* IL_0A: stfld Int32 Value*/
        st_01.Value = st_02;
        /* IL_0F: ldloc.0 */
        st_04 = loc0;
        /* IL_10: callvirt StringWrapper Invoke(IntWrapper)*/
        st_05 = (st_03._methodPtr.apply)(null,((st_03._target) ? ([
            st_03._target,
            st_04
        ]) : ([
            st_04
        ])));
        /* IL_15: ldfld String Value*/
        st_06 = st_05.Value;
        /* IL_1A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_06);
        /* IL_1F: ret */
        return ;
    };
    /* static StringWrapper <Main>b__1(IntWrapper)*/
    asm.x6000013_init = function ()
    {
        ((asm1.StringWrapper)().init)();
        asm.x6000013 = asm.x6000013_;
    };;
    asm.x6000013 = function (arg0)
    {
        (asm.x6000013_init.apply)(this,arguments);
        return (asm.x6000013_.apply)(this,arguments);
    };;
    asm.x6000013_ = function _Main_b__1(arg0)
    {
        var t0;
        var loc0;
        t0 = (asm1.StringWrapper)();
        /* IL_00: newobj Void .ctor()*/
        /* IL_05: stloc.0 */
        loc0 = newobj(t0,asm1.x600000f,[
            null
        ]);
        /* IL_06: ldloc.0 */
        /* IL_07: ldstr Result*/
        /* IL_0C: stfld String Value*/
        loc0.Value = new_string("Result");
        /* IL_11: ldloc.0 */
        /* IL_12: ret */
        return loc0;
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
    (asm)["MFunc`2"] = (function ()
    {
        var ct;
        ct = {};
        return function (T,TResult)
        {
            var c;
            var initialized;
            c = tree_get([
                T,
                TResult
            ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function MFunc_2()
            {
                (MFunc_2.init)();
                this.constructor = MFunc_2;
            };
            c = MFunc_2;
            tree_set([
                T,
                TResult
            ],ct,c);
            MFunc_2.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                MFunc_2.CustomAttributes = [];
                MFunc_2.Methods = [
                    [
                        asm1,
                        "x600000d",
                        "Invoke"
                    ]
                ];
                MFunc_2.BaseType = ((asm0)["System.MulticastDelegate"])();
                MFunc_2.FullName = "MFunc`2";
                MFunc_2.Assembly = asm;
                MFunc_2.Interfaces = [];
                MFunc_2.IsInst = function (t) { return t instanceof MFunc_2 ? t : null; };
                MFunc_2.IsValueType = false;
                MFunc_2.IsPrimitive = false;
                MFunc_2.IsInterface = false;
                MFunc_2.IsGenericTypeDefinition = true;
                MFunc_2.IsNullable = false;
                MFunc_2.ArrayType = Array;
                MFunc_2.MetadataName = "asm1.t2000007";
                MFunc_2.GenericArguments = {};
                (MFunc_2.GenericArguments)["asm1.t2000007"] = [
                    T,
                    TResult
                ];
                (MFunc_2.GenericArguments)["asm0.t2000028"] = [];
                (MFunc_2.GenericArguments)["asm0.t2000027"] = [];
                (MFunc_2.GenericArguments)["asm0.t2000002"] = [];
                MFunc_2.prototype._invocationList = null;
                MFunc_2.prototype._methodPtr = null;
                MFunc_2.prototype._target = null;
                MFunc_2.prototype.vtable = {
                    'asm1.x600000d': function ()
                    {
                        return asm1.x600000d;
                    },
                    'asm0.x6000073': function ()
                    {
                        return asm0.x600007c;
                    },
                    'asm0.x6000072': function ()
                    {
                        return asm0.x600007d;
                    },
                    'asm0.x6000008': function ()
                    {
                        return asm0.x6000074;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000077;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    }
                };
                MFunc_2.prototype.ifacemap = {};
            };
            MFunc_2.prototype = {};
            return c;
        };
    })();
    asm.IntWrapper = (function ()
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
            function IntWrapper()
            {
                (IntWrapper.init)();
                this.constructor = IntWrapper;
            };
            c = IntWrapper;
            ct = c;
            IntWrapper.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IntWrapper.CustomAttributes = [];
                IntWrapper.Methods = [];
                IntWrapper.BaseType = ((asm0)["System.Object"])();
                IntWrapper.FullName = "IntWrapper";
                IntWrapper.Assembly = asm;
                IntWrapper.Interfaces = [];
                IntWrapper.IsInst = function (t) { return t instanceof IntWrapper ? t : null; };
                IntWrapper.IsValueType = false;
                IntWrapper.IsPrimitive = false;
                IntWrapper.IsInterface = false;
                IntWrapper.IsGenericTypeDefinition = false;
                IntWrapper.IsNullable = false;
                IntWrapper.ArrayType = Array;
                IntWrapper.MetadataName = "asm1.t2000008";
                IntWrapper.GenericArguments = {};
                (IntWrapper.GenericArguments)["asm1.t2000008"] = [];
                (IntWrapper.GenericArguments)["asm0.t2000002"] = [];
                IntWrapper.prototype.Value = 0;
                IntWrapper.prototype.vtable = {
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
                IntWrapper.prototype.ifacemap = {};
            };
            IntWrapper.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.StringWrapper = (function ()
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
            function StringWrapper()
            {
                (StringWrapper.init)();
                this.constructor = StringWrapper;
            };
            c = StringWrapper;
            ct = c;
            StringWrapper.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                StringWrapper.CustomAttributes = [];
                StringWrapper.Methods = [];
                StringWrapper.BaseType = ((asm0)["System.Object"])();
                StringWrapper.FullName = "StringWrapper";
                StringWrapper.Assembly = asm;
                StringWrapper.Interfaces = [];
                StringWrapper.IsInst = function (t) { return t instanceof StringWrapper ? t : null; };
                StringWrapper.IsValueType = false;
                StringWrapper.IsPrimitive = false;
                StringWrapper.IsInterface = false;
                StringWrapper.IsGenericTypeDefinition = false;
                StringWrapper.IsNullable = false;
                StringWrapper.ArrayType = Array;
                StringWrapper.MetadataName = "asm1.t2000009";
                StringWrapper.GenericArguments = {};
                (StringWrapper.GenericArguments)["asm1.t2000009"] = [];
                (StringWrapper.GenericArguments)["asm0.t2000002"] = [];
                StringWrapper.prototype.Value = null;
                StringWrapper.prototype.vtable = {
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
                StringWrapper.prototype.ifacemap = {};
            };
            StringWrapper.prototype = new (((asm0)["System.Object"])())();
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
                (Program)["CS$<>9__CachedAnonymousMethodDelegate2"] = null;
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
    asm.entryPoint = asm.x6000010;
})(asm1 || (asm1 = {}));
