var asm0; (function (asm)
{
    
    asm.next_hash = 1;

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

    function box(v, type) {
        if (v === null)
            return v;
    
        if (type.IsNullable) {
            if (v.has_value)
                return box(v.value, type.GenericArguments[0]);
            else
                return null;
        }

        if (!type.IsValueType)
            return v;
    
        return {
            'boxed': v,
            'type': type,
            'vtable': type.prototype.vtable
        };
    }

    function unbox(o, type) {
        return cast_class(o.boxed, type);
    }

    function unbox_any(o, type) {
        if (type.IsNullable) {
            var result = new type();
            if (o !== null) {
                result.value = cast_class(o.boxed, type.GenericArguments[0]);
                result.has_value = true;
            }
            return result;
        }
    
        if (type.IsValueType)
            return cast_class(o.boxed, type);
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

    function new_string(str) {
        var r = new (asm0['System.String']())();
        r.jsstr = str;
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
        r.type = type;
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
        if (type.IsInst(obj) || (!type.IsValueType && obj === null))
            return obj;
        else {
            var t = asm0['System.InvalidCastException']();
            throw new t();
        }
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
    asm.x6000001 = function (a, b) { return Number(a === b); };;
    asm.x6000002 = function (o) { return o.hash || (o.hash = asm0.next_hash++); };;
    asm.x6000004 = function () { return asm0.ToJavaScriptString(this); };;
    asm.x6000005 = function ToString(arg0)
    {
        var st_00;
        var st_01;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldstr System.Object*/
        st_00 = new_string("System.Object");
        /* IL_06: stloc.0 */
        loc0 = st_00;
        /* IL_09: ldloc.0 */
        st_01 = loc0;
        /* IL_0A: ret */
        return st_01;
    };;
    asm.x6000006 = function GetHashCode(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call Int32 GetHashCode(System.Object)*/
        st_01 = (asm0.x6000002)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x6000007 = function ToJavaScriptString(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var __pos_0__;
        var loc2;
        var loc1;
        var loc0;
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldnull */
                st_01 = null;
                /* IL_04: ceq */
                st_02 = ((st_00 === st_01) ? (1) : (0));
                /* IL_05: ldc.i4.0 */
                st_03 = (0|0);
                /* IL_07: ceq */
                st_04 = ((st_02 === st_03) ? (1) : (0));
                /* IL_08: stloc.2 */
                loc2 = st_04;
                /* IL_09: ldloc.2 */
                st_05 = loc2;
                /* IL_0A: brtrue.s IL_19*/
                
                if (st_05){
                    __pos_0__ = 0x19;
                    continue;
                }
                /* IL_0C: ldstr */
                st_06 = new_string("");
                /* IL_11: ldfld Object jsstr*/
                st_07 = st_06.jsstr;
                /* IL_16: stloc.1 */
                loc1 = st_07;
                /* IL_17: br.s IL_39*/
                __pos_0__ = 0x39;
                continue;
                case 0x19:
                /* IL_19: nop */
                
                /* IL_1A: ldarg.0 */
                st_08 = arg0;
                /* IL_1B: callvirt String ToString()*/
                st_09 = (((st_08.vtable)["asm0.x6000005"])())(convert_box_to_pointer_as_needed(st_08));
                /* IL_20: stloc.0 */
                loc0 = st_09;
                /* IL_21: ldloc.0 */
                st_0A = loc0;
                /* IL_22: ldnull */
                st_0B = null;
                /* IL_24: ceq */
                st_0C = ((st_0A === st_0B) ? (1) : (0));
                /* IL_25: ldc.i4.0 */
                st_0D = (0|0);
                /* IL_27: ceq */
                st_0E = ((st_0C === st_0D) ? (1) : (0));
                /* IL_28: stloc.2 */
                loc2 = st_0E;
                /* IL_29: ldloc.2 */
                st_0F = loc2;
                /* IL_2A: brtrue.s IL_30*/
                
                if (st_0F){
                    __pos_0__ = 0x30;
                    continue;
                }
                /* IL_2C: ldnull */
                st_10 = null;
                /* IL_2D: stloc.1 */
                loc1 = st_10;
                /* IL_2E: br.s IL_39*/
                __pos_0__ = 0x39;
                continue;
                case 0x30:
                /* IL_30: ldloc.0 */
                st_11 = loc0;
                /* IL_31: ldfld Object jsstr*/
                st_12 = st_11.jsstr;
                /* IL_36: stloc.1 */
                loc1 = st_12;
                case 0x39:
                /* IL_39: ldloc.1 */
                st_13 = loc1;
                /* IL_3A: ret */
                return st_13;
            }
        }
    };;
    asm.ToJavaScriptString = asm.x6000007;
    asm.x6000008 = function ReferenceEquals(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Boolean ReferenceEqualsImpl(System.Object, System.Object)*/
        st_02 = (asm0.x6000001)(st_00,st_01);
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x6000009 = function Equals(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Boolean ReferenceEquals(System.Object, System.Object)*/
        st_02 = (asm0.x6000008)(st_00,st_01);
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x600000a = function GetType(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call Type GetType(System.Object)*/
        st_01 = (asm0.x60000c5)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x600000b = function _ctor(arg0)
    {
        /* IL_02: ret */
        return ;
    };;
    asm.x600000c = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x600000d = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x600000f = function get_ValidOn(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldfld AttributeTargets <ValidOn>k__BackingField*/
        st_01 = (st_00)["SystemAttributeUsageAttribute<ValidOn>k__BackingField"];
        /* IL_06: stloc.0 */
        loc0 = st_01;
        /* IL_09: ldloc.0 */
        st_02 = loc0;
        /* IL_0A: ret */
        return st_02;
    };;
    asm.x6000010 = function set_ValidOn(arg0,arg1)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: stfld AttributeTargets <ValidOn>k__BackingField*/
        (st_00)["SystemAttributeUsageAttribute<ValidOn>k__BackingField"] = st_01;
        /* IL_07: ret */
        return ;
    };;
    asm.x6000011 = function get_Inherited(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldfld Boolean <Inherited>k__BackingField*/
        st_01 = (st_00)["SystemAttributeUsageAttribute<Inherited>k__BackingField"];
        /* IL_06: stloc.0 */
        loc0 = st_01;
        /* IL_09: ldloc.0 */
        st_02 = loc0;
        /* IL_0A: ret */
        return st_02;
    };;
    asm.x6000012 = function set_Inherited(arg0,arg1)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: stfld Boolean <Inherited>k__BackingField*/
        (st_00)["SystemAttributeUsageAttribute<Inherited>k__BackingField"] = st_01;
        /* IL_07: ret */
        return ;
    };;
    asm.x600000e = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: ldarg.0 */
        st_01 = arg0;
        /* IL_09: ldarg.1 */
        st_02 = arg1;
        /* IL_0A: call Void set_ValidOn(System.AttributeTargets)*/
        (asm0.x6000010)(st_01,clone_value(st_02));
        /* IL_0F: nop */
        /* IL_10: nop */
        /* IL_11: ret */
        return ;
    };;
    asm.x6000013 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x6000014 = function ToString(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var __pos_0__;
        var loc0;
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldind.i1 */
                st_01 = (st_00.r)();
                /* IL_03: brtrue.s IL_0C*/
                
                if (st_01){
                    __pos_0__ = 0xC;
                    continue;
                }
                /* IL_05: ldstr False*/
                st_02 = new_string("False");
                /* IL_0A: br.s IL_11*/
                __pos_0__ = 0x11;
                continue;
                case 0xC:
                /* IL_0C: ldstr True*/
                st_02 = new_string("True");
                case 0x11:
                /* IL_11: nop */
                
                /* IL_12: stloc.0 */
                loc0 = st_02;
                /* IL_15: ldloc.0 */
                st_03 = loc0;
                /* IL_16: ret */
                return st_03;
            }
        }
    };;
    asm.x6000022_init = function ()
    {
        (((asm0)["System.Byte"])().init)();
        asm.x6000022 = asm.x6000022_;
    };;
    asm.x6000022 = function (arg0)
    {
        (asm.x6000022_init.apply)(this,arguments);
        return (asm.x6000022.apply)(this,arguments);
    };;
    asm.x6000022_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.Byte"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.u1 */
        st_01 = (st_00.r)();
        /* IL_03: box System.Byte*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x6000023_init = function ()
    {
        (((asm0)["System.Char"])().init)();
        asm.x6000023 = asm.x6000023_;
    };;
    asm.x6000023 = function (arg0)
    {
        (asm.x6000023_init.apply)(this,arguments);
        return (asm.x6000023.apply)(this,arguments);
    };;
    asm.x6000023_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.Char"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.u2 */
        st_01 = (st_00.r)();
        /* IL_03: box System.Char*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String ToStringImpl(System.Object)*/
        st_03 = (asm0.x6000024)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x6000024 = function(o) { return new_string(String.fromCharCode(o.boxed)); };;
    asm.x6000025 = (function (o) { console.log(o.jsstr); });;
    asm.x6000026 = function WriteLine(arg0)
    {
        var st_00;
        var st_01;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: callvirt String ToString()*/
        st_01 = (((st_00.vtable)["asm0.x6000005"])())(convert_box_to_pointer_as_needed(st_00));
        /* IL_07: call Void WriteLineImpl(System.String)*/
        (asm0.x6000025)(st_01);
        /* IL_0C: nop */
        /* IL_0D: ret */
        return ;
    };;
    asm.x6000027 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x6000028_init = function ()
    {
        (((asm0)["System.Double"])().init)();
        asm.x6000028 = asm.x6000028_;
    };;
    asm.x6000028 = function (arg0)
    {
        (asm.x6000028_init.apply)(this,arguments);
        return (asm.x6000028.apply)(this,arguments);
    };;
    asm.x6000028_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.Double"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.r8 */
        st_01 = (st_00.r)();
        /* IL_03: box System.Double*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x6000029 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x6000013)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x600002a = function get_CurrentManagedThreadId()
    {
        var st_00;
        var st_01;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldc.i4.0 */
        st_00 = (0|0);
        /* IL_02: stloc.0 */
        loc0 = st_00;
        /* IL_05: ldloc.0 */
        st_01 = loc0;
        /* IL_06: ret */
        return st_01;
    };;
    asm.x600002b = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x600002c_init = function ()
    {
        (((asm0)["System.Exception"])().init)();
        asm.x600002c = asm.x600002c_;
    };;
    asm.x600002c = function (arg0,arg1)
    {
        (asm.x600002c_init.apply)(this,arguments);
        return (asm.x600002c.apply)(this,arguments);
    };;
    asm.x600002c_ = function Combine(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var st_16;
        var st_17;
        var st_18;
        var st_19;
        var st_1A;
        var st_1B;
        var st_1C;
        var st_1D;
        var st_1E;
        var st_1F;
        var st_20;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.Exception"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldnull */
                st_01 = null;
                /* IL_04: ceq */
                st_02 = ((st_00 === st_01) ? (1) : (0));
                /* IL_05: ldc.i4.0 */
                st_03 = (0|0);
                /* IL_07: ceq */
                st_04 = ((st_02 === st_03) ? (1) : (0));
                /* IL_08: stloc.1 */
                loc1 = st_04;
                /* IL_09: ldloc.1 */
                st_05 = loc1;
                /* IL_0A: brtrue.s IL_20*/
                
                if (st_05){
                    __pos_0__ = 0x20;
                    continue;
                }
                /* IL_0C: nop */
                
                /* IL_0D: ldarg.1 */
                st_06 = arg1;
                /* IL_0E: ldnull */
                st_07 = null;
                /* IL_10: ceq */
                st_08 = ((st_06 === st_07) ? (1) : (0));
                /* IL_11: ldc.i4.0 */
                st_09 = (0|0);
                /* IL_13: ceq */
                st_0A = ((st_08 === st_09) ? (1) : (0));
                /* IL_14: stloc.1 */
                loc1 = st_0A;
                /* IL_15: ldloc.1 */
                st_0B = loc1;
                /* IL_16: brtrue.s IL_1C*/
                
                if (st_0B){
                    __pos_0__ = 0x1C;
                    continue;
                }
                /* IL_18: ldnull */
                st_0C = null;
                /* IL_19: stloc.0 */
                loc0 = st_0C;
                /* IL_1A: br.s IL_56*/
                __pos_0__ = 0x56;
                continue;
                case 0x1C:
                /* IL_1C: ldarg.1 */
                st_0D = arg1;
                /* IL_1D: stloc.0 */
                loc0 = st_0D;
                /* IL_1E: br.s IL_56*/
                __pos_0__ = 0x56;
                continue;
                case 0x20:
                /* IL_20: ldarg.1 */
                st_0E = arg1;
                /* IL_21: ldnull */
                st_0F = null;
                /* IL_23: ceq */
                st_10 = ((st_0E === st_0F) ? (1) : (0));
                /* IL_24: ldc.i4.0 */
                st_11 = (0|0);
                /* IL_26: ceq */
                st_12 = ((st_10 === st_11) ? (1) : (0));
                /* IL_27: stloc.1 */
                loc1 = st_12;
                /* IL_28: ldloc.1 */
                st_13 = loc1;
                /* IL_29: brtrue.s IL_2F*/
                
                if (st_13){
                    __pos_0__ = 0x2F;
                    continue;
                }
                /* IL_2B: ldarg.0 */
                st_14 = arg0;
                /* IL_2C: stloc.0 */
                loc0 = st_14;
                /* IL_2D: br.s IL_56*/
                __pos_0__ = 0x56;
                continue;
                case 0x2F:
                /* IL_2F: ldarg.0 */
                st_15 = arg0;
                /* IL_30: callvirt Type GetType()*/
                st_17 = (asm0.x600000a)(st_15);
                /* IL_35: ldarg.1 */
                st_16 = arg1;
                /* IL_36: callvirt Type GetType()*/
                st_18 = (asm0.x600000a)(st_16);
                /* IL_3C: ceq */
                st_19 = ((st_17 === st_18) ? (1) : (0));
                /* IL_3D: stloc.1 */
                loc1 = st_19;
                /* IL_3E: ldloc.1 */
                st_1A = loc1;
                /* IL_3F: brtrue.s IL_4C*/
                
                if (st_1A){
                    __pos_0__ = 0x4C;
                    continue;
                }
                /* IL_41: ldstr Incompatible delegate types*/
                st_1B = new_string("Incompatible delegate types");
                /* IL_46: newobj Void .ctor(System.String)*/
                st_1C = newobj(t0,asm0.x6000050,[ null,st_1B ]);
                /* IL_4B: throw */
                throw st_1C;
                case 0x4C:
                /* IL_4C: ldarg.0 */
                st_1D = arg0;
                /* IL_4D: ldarg.1 */
                st_1E = arg1;
                /* IL_4E: callvirt Delegate CombineImpl(System.Delegate)*/
                st_1F = (((st_1D.vtable)["asm0.x600002f"])())(st_1D,st_1E);
                /* IL_53: stloc.0 */
                loc0 = st_1F;
                case 0x56:
                /* IL_56: ldloc.0 */
                st_20 = loc0;
                /* IL_57: ret */
                return st_20;
            }
        }
    };
    asm.x600002d_init = function ()
    {
        (((asm0)["System.Exception"])().init)();
        asm.x600002d = asm.x600002d_;
    };;
    asm.x600002d = function (arg0,arg1)
    {
        (asm.x600002d_init.apply)(this,arguments);
        return (asm.x600002d.apply)(this,arguments);
    };;
    asm.x600002d_ = function Remove(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.Exception"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.1 */
                st_00 = arg1;
                /* IL_02: ldnull */
                st_01 = null;
                /* IL_04: ceq */
                st_02 = ((st_00 === st_01) ? (1) : (0));
                /* IL_05: ldc.i4.0 */
                st_03 = (0|0);
                /* IL_07: ceq */
                st_04 = ((st_02 === st_03) ? (1) : (0));
                /* IL_08: stloc.1 */
                loc1 = st_04;
                /* IL_09: ldloc.1 */
                st_05 = loc1;
                /* IL_0A: brtrue.s IL_10*/
                
                if (st_05){
                    __pos_0__ = 0x10;
                    continue;
                }
                /* IL_0C: ldarg.0 */
                st_06 = arg0;
                /* IL_0D: stloc.0 */
                loc0 = st_06;
                /* IL_0E: br.s IL_37*/
                __pos_0__ = 0x37;
                continue;
                case 0x10:
                /* IL_10: ldarg.0 */
                st_07 = arg0;
                /* IL_11: callvirt Type GetType()*/
                st_09 = (asm0.x600000a)(st_07);
                /* IL_16: ldarg.1 */
                st_08 = arg1;
                /* IL_17: callvirt Type GetType()*/
                st_0A = (asm0.x600000a)(st_08);
                /* IL_1D: ceq */
                st_0B = ((st_09 === st_0A) ? (1) : (0));
                /* IL_1E: stloc.1 */
                loc1 = st_0B;
                /* IL_1F: ldloc.1 */
                st_0C = loc1;
                /* IL_20: brtrue.s IL_2D*/
                
                if (st_0C){
                    __pos_0__ = 0x2D;
                    continue;
                }
                /* IL_22: ldstr Incompatible delegate types*/
                st_0D = new_string("Incompatible delegate types");
                /* IL_27: newobj Void .ctor(System.String)*/
                st_0E = newobj(t0,asm0.x6000050,[ null,st_0D ]);
                /* IL_2C: throw */
                throw st_0E;
                case 0x2D:
                /* IL_2D: ldarg.0 */
                st_0F = arg0;
                /* IL_2E: ldarg.1 */
                st_10 = arg1;
                /* IL_2F: callvirt Delegate RemoveImpl(System.Delegate)*/
                st_11 = (((st_0F.vtable)["asm0.x600002e"])())(st_0F,st_10);
                /* IL_34: stloc.0 */
                loc0 = st_11;
                case 0x37:
                /* IL_37: ldloc.0 */
                st_12 = loc0;
                /* IL_38: ret */
                return st_12;
            }
        }
    };
    asm.x600002e_init = function ()
    {
        (((asm0)["System.NotImplementedException"])().init)();
        asm.x600002e = asm.x600002e_;
    };;
    asm.x600002e = function (arg0,arg1)
    {
        (asm.x600002e_init.apply)(this,arguments);
        return (asm.x600002e.apply)(this,arguments);
    };;
    asm.x600002e_ = function RemoveImpl(arg0,arg1)
    {
        var t0;
        var st_00;
        t0 = ((asm0)["System.NotImplementedException"])();
        /* IL_00: nop */
        /* IL_01: newobj Void .ctor()*/
        st_00 = newobj(t0,asm0.x6000054,[ null ]);
        /* IL_06: throw */
        throw st_00;
    };
    asm.x600002f_init = function ()
    {
        (((asm0)["System.NotImplementedException"])().init)();
        asm.x600002f = asm.x600002f_;
    };;
    asm.x600002f = function (arg0,arg1)
    {
        (asm.x600002f_init.apply)(this,arguments);
        return (asm.x600002f.apply)(this,arguments);
    };;
    asm.x600002f_ = function CombineImpl(arg0,arg1)
    {
        var t0;
        var st_00;
        t0 = ((asm0)["System.NotImplementedException"])();
        /* IL_00: nop */
        /* IL_01: newobj Void .ctor()*/
        st_00 = newobj(t0,asm0.x6000054,[ null ]);
        /* IL_06: throw */
        throw st_00;
    };
    asm.x6000030_init = function ()
    {
        (((asm0)["System.Delegate"])().init)();
        asm.x6000030 = asm.x6000030_;
    };;
    asm.x6000030 = function (arg0,arg1)
    {
        (asm.x6000030_init.apply)(this,arguments);
        return (asm.x6000030.apply)(this,arguments);
    };;
    asm.x6000030_ = function Equals(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.Delegate"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_01 = arg0;
        /* IL_02: ldarg.1 */
        st_00 = arg1;
        /* IL_03: isinst System.Delegate*/
        st_02 = (t0.IsInst)(st_00);
        /* IL_08: call Boolean op_Equality(System.Delegate, System.Delegate)*/
        st_03 = (asm0.x6000031)(st_01,st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x6000031_init = function ()
    {
        (((asm0)["System.MulticastDelegate"])().init)();
        asm.x6000031 = asm.x6000031_;
    };;
    asm.x6000031 = function (arg0,arg1)
    {
        (asm.x6000031_init.apply)(this,arguments);
        return (asm.x6000031.apply)(this,arguments);
    };;
    asm.x6000031_ = function op_Equality(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var st_16;
        var st_17;
        var st_18;
        var st_19;
        var st_1A;
        var st_1B;
        var st_1C;
        var st_1D;
        var st_1E;
        var st_1F;
        var st_20;
        var st_21;
        var st_22;
        var st_23;
        var st_24;
        var st_25;
        var st_26;
        var st_27;
        var st_28;
        var st_29;
        var st_2A;
        var st_2B;
        var st_2C;
        var st_2D;
        var st_2E;
        var st_2F;
        var st_30;
        var st_31;
        var st_32;
        var st_33;
        var st_34;
        var st_35;
        var st_36;
        var st_37;
        var st_38;
        var st_39;
        var st_3A;
        var st_3B;
        var st_3C;
        var st_3D;
        var st_3E;
        var st_3F;
        var st_40;
        var st_41;
        var st_42;
        var st_43;
        var st_44;
        var st_45;
        var st_46;
        var st_47;
        var st_48;
        var st_49;
        var st_4A;
        var st_4B;
        var st_4C;
        var st_4D;
        var st_4E;
        var st_4F;
        var st_50;
        var st_51;
        var st_52;
        var st_53;
        var __pos_0__;
        var loc0;
        var loc1;
        var loc6;
        var loc5;
        var loc2;
        var loc3;
        var loc4;
        t0 = ((asm0)["System.MulticastDelegate"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: castclass System.MulticastDelegate*/
                st_01 = st_00;
                /* IL_07: stloc.0 */
                loc0 = st_01;
                /* IL_08: ldarg.1 */
                st_02 = arg1;
                /* IL_09: castclass System.MulticastDelegate*/
                st_03 = st_02;
                /* IL_0E: stloc.1 */
                loc1 = st_03;
                /* IL_0F: ldloc.0 */
                st_04 = loc0;
                /* IL_10: ldnull */
                st_05 = null;
                /* IL_12: ceq */
                st_06 = ((st_04 === st_05) ? (1) : (0));
                /* IL_13: ldc.i4.0 */
                st_07 = (0|0);
                /* IL_15: ceq */
                st_08 = ((st_06 === st_07) ? (1) : (0));
                /* IL_16: stloc.s 6*/
                loc6 = st_08;
                /* IL_18: ldloc.s 6*/
                st_09 = loc6;
                /* IL_1A: brtrue.s IL_27*/
                
                if (st_09){
                    __pos_0__ = 0x27;
                    continue;
                }
                /* IL_1C: ldloc.1 */
                st_0A = loc1;
                /* IL_1D: ldnull */
                st_0B = null;
                /* IL_1F: ceq */
                st_0C = ((st_0A === st_0B) ? (1) : (0));
                /* IL_20: stloc.s 5*/
                loc5 = st_0C;
                /* IL_22: br IL_112*/
                __pos_0__ = 0x112;
                continue;
                case 0x27:
                /* IL_27: ldloc.1 */
                st_0D = loc1;
                /* IL_28: ldnull */
                st_0E = null;
                /* IL_2A: ceq */
                st_0F = ((st_0D === st_0E) ? (1) : (0));
                /* IL_2B: ldc.i4.0 */
                st_10 = (0|0);
                /* IL_2D: ceq */
                st_11 = ((st_0F === st_10) ? (1) : (0));
                /* IL_2E: stloc.s 6*/
                loc6 = st_11;
                /* IL_30: ldloc.s 6*/
                st_12 = loc6;
                /* IL_32: brtrue.s IL_3C*/
                
                if (st_12){
                    __pos_0__ = 0x3C;
                    continue;
                }
                /* IL_34: ldc.i4.0 */
                st_13 = (0|0);
                /* IL_35: stloc.s 5*/
                loc5 = st_13;
                /* IL_37: br IL_112*/
                __pos_0__ = 0x112;
                continue;
                case 0x3C:
                /* IL_3C: ldloc.0 */
                st_14 = loc0;
                /* IL_3D: ldfld Object _methodPtr*/
                st_16 = st_14._methodPtr;
                /* IL_42: ldloc.1 */
                st_15 = loc1;
                /* IL_43: ldfld Object _methodPtr*/
                st_17 = st_15._methodPtr;
                /* IL_48: call Boolean ReferenceEquals(System.Object, System.Object)*/
                st_18 = (asm0.x6000008)(st_16,st_17);
                /* IL_4D: stloc.s 6*/
                loc6 = st_18;
                /* IL_4F: ldloc.s 6*/
                st_19 = loc6;
                /* IL_51: brtrue.s IL_5B*/
                
                if (st_19){
                    __pos_0__ = 0x5B;
                    continue;
                }
                /* IL_53: ldc.i4.0 */
                st_1A = (0|0);
                /* IL_54: stloc.s 5*/
                loc5 = st_1A;
                /* IL_56: br IL_112*/
                __pos_0__ = 0x112;
                continue;
                case 0x5B:
                /* IL_5B: ldloc.0 */
                st_1B = loc0;
                /* IL_5C: ldfld Object _target*/
                st_1D = st_1B._target;
                /* IL_61: ldloc.1 */
                st_1C = loc1;
                /* IL_62: ldfld Object _target*/
                st_1E = st_1C._target;
                /* IL_67: call Boolean ReferenceEquals(System.Object, System.Object)*/
                st_1F = (asm0.x6000008)(st_1D,st_1E);
                /* IL_6C: stloc.s 6*/
                loc6 = st_1F;
                /* IL_6E: ldloc.s 6*/
                st_20 = loc6;
                /* IL_70: brtrue.s IL_7A*/
                
                if (st_20){
                    __pos_0__ = 0x7A;
                    continue;
                }
                /* IL_72: ldc.i4.0 */
                st_21 = (0|0);
                /* IL_73: stloc.s 5*/
                loc5 = st_21;
                /* IL_75: br IL_112*/
                __pos_0__ = 0x112;
                continue;
                case 0x7A:
                /* IL_7A: ldloc.0 */
                st_22 = loc0;
                /* IL_7B: ldfld Delegate[] _invocationList*/
                st_23 = st_22._invocationList;
                /* IL_80: brfalse.s IL_8D*/
                
                if ((!(st_23))){
                    __pos_0__ = 0x8D;
                    continue;
                }
                /* IL_82: ldloc.1 */
                st_24 = loc1;
                /* IL_83: ldfld Delegate[] _invocationList*/
                st_25 = st_24._invocationList;
                /* IL_88: ldnull */
                st_26 = null;
                /* IL_8A: ceq */
                st_27 = ((st_25 === st_26) ? (1) : (0));
                /* IL_8B: br.s IL_8E*/
                __pos_0__ = 0x8E;
                continue;
                case 0x8D:
                /* IL_8D: ldc.i4.1 */
                st_27 = (1|0);
                case 0x8E:
                /* IL_8E: nop */
                
                /* IL_8F: stloc.s 6*/
                loc6 = st_27;
                /* IL_91: ldloc.s 6*/
                st_28 = loc6;
                /* IL_93: brtrue.s IL_F9*/
                
                if (st_28){
                    __pos_0__ = 0xF9;
                    continue;
                }
                /* IL_95: nop */
                
                /* IL_96: ldloc.0 */
                st_29 = loc0;
                /* IL_97: ldfld Delegate[] _invocationList*/
                st_2A = st_29._invocationList;
                /* IL_9C: ldlen */
                st_2B = st_2A.jsarr.length;
                /* IL_9D: conv.i4 */
                st_2F = (st_2B | 0);
                /* IL_9E: ldloc.1 */
                st_2C = loc1;
                /* IL_9F: ldfld Delegate[] _invocationList*/
                st_2D = st_2C._invocationList;
                /* IL_A4: ldlen */
                st_2E = st_2D.jsarr.length;
                /* IL_A5: conv.i4 */
                st_30 = (st_2E | 0);
                /* IL_A7: ceq */
                st_31 = ((st_2F === st_30) ? (1) : (0));
                /* IL_A8: stloc.s 6*/
                loc6 = st_31;
                /* IL_AA: ldloc.s 6*/
                st_32 = loc6;
                /* IL_AC: brtrue.s IL_B3*/
                
                if (st_32){
                    __pos_0__ = 0xB3;
                    continue;
                }
                /* IL_AE: ldc.i4.0 */
                st_33 = (0|0);
                /* IL_AF: stloc.s 5*/
                loc5 = st_33;
                /* IL_B1: br.s IL_112*/
                __pos_0__ = 0x112;
                continue;
                case 0xB3:
                /* IL_B3: ldc.i4.0 */
                st_34 = (0|0);
                /* IL_B4: stloc.2 */
                loc2 = st_34;
                /* IL_B5: br.s IL_E3*/
                __pos_0__ = 0xE3;
                continue;
                case 0xB7:
                /* IL_B7: nop */
                
                /* IL_B8: ldloc.0 */
                st_35 = loc0;
                /* IL_B9: ldfld Delegate[] _invocationList*/
                st_36 = st_35._invocationList;
                /* IL_BE: ldloc.2 */
                st_37 = loc2;
                /* IL_BF: ldelem.ref */
                st_38 = (st_36.jsarr)[st_37];
                /* IL_C0: stloc.3 */
                loc3 = st_38;
                /* IL_C1: ldloc.1 */
                st_39 = loc1;
                /* IL_C2: ldfld Delegate[] _invocationList*/
                st_3A = st_39._invocationList;
                /* IL_C7: ldloc.2 */
                st_3B = loc2;
                /* IL_C8: ldelem.ref */
                st_3C = (st_3A.jsarr)[st_3B];
                /* IL_C9: stloc.s 4*/
                loc4 = st_3C;
                /* IL_CB: ldloc.3 */
                st_3D = loc3;
                /* IL_CC: ldloc.s 4*/
                st_3E = loc4;
                /* IL_CE: call Boolean op_Equality(System.Delegate, System.Delegate)*/
                st_3F = (asm0.x6000031)(st_3D,st_3E);
                /* IL_D3: stloc.s 6*/
                loc6 = st_3F;
                /* IL_D5: ldloc.s 6*/
                st_40 = loc6;
                /* IL_D7: brtrue.s IL_DE*/
                
                if (st_40){
                    __pos_0__ = 0xDE;
                    continue;
                }
                /* IL_D9: ldc.i4.0 */
                st_41 = (0|0);
                /* IL_DA: stloc.s 5*/
                loc5 = st_41;
                /* IL_DC: br.s IL_112*/
                __pos_0__ = 0x112;
                continue;
                case 0xDE:
                /* IL_DE: nop */
                
                /* IL_DF: ldloc.2 */
                st_42 = loc2;
                /* IL_E0: ldc.i4.1 */
                st_43 = (1|0);
                /* IL_E1: add */
                st_44 = ((st_42 + st_43) | 0);
                /* IL_E2: stloc.2 */
                loc2 = st_44;
                case 0xE3:
                /* IL_E3: ldloc.2 */
                st_48 = loc2;
                /* IL_E4: ldloc.0 */
                st_45 = loc0;
                /* IL_E5: ldfld Delegate[] _invocationList*/
                st_46 = st_45._invocationList;
                /* IL_EA: ldlen */
                st_47 = st_46.jsarr.length;
                /* IL_EB: conv.i4 */
                st_49 = (st_47 | 0);
                /* IL_ED: clt */
                st_4A = ((st_48 < st_49) ? (1) : (0));
                /* IL_EE: stloc.s 6*/
                loc6 = st_4A;
                /* IL_F0: ldloc.s 6*/
                st_4B = loc6;
                /* IL_F2: brtrue.s IL_B7*/
                
                if (st_4B){
                    __pos_0__ = 0xB7;
                    continue;
                }
                /* IL_F4: ldc.i4.1 */
                st_4C = (1|0);
                /* IL_F5: stloc.s 5*/
                loc5 = st_4C;
                /* IL_F7: br.s IL_112*/
                __pos_0__ = 0x112;
                continue;
                case 0xF9:
                /* IL_F9: ldloc.0 */
                st_4D = loc0;
                /* IL_FA: ldfld Delegate[] _invocationList*/
                st_4E = st_4D._invocationList;
                /* IL_FF: brtrue.s IL_10C*/
                
                if (st_4E){
                    __pos_0__ = 0x10C;
                    continue;
                }
                /* IL_101: ldloc.1 */
                st_4F = loc1;
                /* IL_102: ldfld Delegate[] _invocationList*/
                st_50 = st_4F._invocationList;
                /* IL_107: ldnull */
                st_51 = null;
                /* IL_109: ceq */
                st_52 = ((st_50 === st_51) ? (1) : (0));
                /* IL_10A: br.s IL_10D*/
                __pos_0__ = 0x10D;
                continue;
                case 0x10C:
                /* IL_10C: ldc.i4.0 */
                st_52 = (0|0);
                case 0x10D:
                /* IL_10D: nop */
                
                /* IL_10E: stloc.s 5*/
                loc5 = st_52;
                case 0x112:
                /* IL_112: ldloc.s 5*/
                st_53 = loc5;
                /* IL_114: ret */
                return st_53;
            }
        }
    };
    asm.x6000032 = function op_Inequality(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Boolean op_Equality(System.Delegate, System.Delegate)*/
        st_02 = (asm0.x6000031)(st_00,st_01);
        /* IL_08: ldc.i4.0 */
        st_03 = (0|0);
        /* IL_0A: ceq */
        st_04 = ((st_02 === st_03) ? (1) : (0));
        /* IL_0B: stloc.0 */
        loc0 = st_04;
        /* IL_0E: ldloc.0 */
        st_05 = loc0;
        /* IL_0F: ret */
        return st_05;
    };;
    asm.x6000033 = function GetHashCode(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call Int32 GetHashCode()*/
        st_01 = (asm0.x6000006)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x6000034 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x6000035 = 
            function (list) { 

                var f = function () {
                    var result;
                    var arr = list.jsarr;
                    for (var i=0; i<arr.length; i++) {
                        var delegate = arr[i];
                        var m = delegate._methodPtr;
                        var t = delegate._target;
                        var args = [];
                        if (t != null)
                            args.push(t);
                        for (var j=1; j<arguments.length; j++)
                            args.push(arguments[j]);
                        result = m.apply(null, args)
                    }
                    return result;
                };
                
                var md = new list.jsarr[0].constructor();
                md._methodPtr = f;
                md._invocationList = list;
                return md;
            }
            ;;
    asm.x6000036_init = function ()
    {
        (((asm0)["System.Delegate"])().init)();
        asm.x6000036 = asm.x6000036_;
    };;
    asm.x6000036 = function (arg0,arg1)
    {
        (asm.x6000036_init.apply)(this,arguments);
        return (asm.x6000036.apply)(this,arguments);
    };;
    asm.x6000036_ = function CombineImpl(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var st_16;
        var st_17;
        var st_18;
        var st_19;
        var st_1A;
        var st_1B;
        var st_1C;
        var st_1D;
        var st_1E;
        var st_1F;
        var st_20;
        var st_21;
        var st_22;
        var st_23;
        var st_24;
        var st_25;
        var st_26;
        var st_27;
        var st_28;
        var st_29;
        var st_2A;
        var st_2B;
        var st_2C;
        var st_2D;
        var st_2E;
        var __pos_0__;
        var loc3;
        var loc0;
        var loc1;
        var loc2;
        t0 = ((asm0)["System.Delegate"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld Delegate[] _invocationList*/
                st_01 = st_00._invocationList;
                /* IL_07: ldnull */
                st_02 = null;
                /* IL_09: ceq */
                st_03 = ((st_01 === st_02) ? (1) : (0));
                /* IL_0A: stloc.3 */
                loc3 = st_03;
                /* IL_0B: ldloc.3 */
                st_04 = loc3;
                /* IL_0C: brtrue.s IL_4C*/
                
                if (st_04){
                    __pos_0__ = 0x4C;
                    continue;
                }
                /* IL_0E: nop */
                
                /* IL_0F: ldarg.0 */
                st_05 = arg0;
                /* IL_10: ldfld Delegate[] _invocationList*/
                st_06 = st_05._invocationList;
                /* IL_15: ldlen */
                st_07 = st_06.jsarr.length;
                /* IL_16: conv.i4 */
                st_08 = (st_07 | 0);
                /* IL_17: ldc.i4.1 */
                st_09 = (1|0);
                /* IL_18: add */
                st_0A = ((st_08 + st_09) | 0);
                /* IL_19: newarr System.Delegate*/
                st_0B = new_array(t0,st_0A);
                /* IL_1E: stloc.0 */
                loc0 = st_0B;
                /* IL_1F: ldc.i4.0 */
                st_0C = (0|0);
                /* IL_20: stloc.1 */
                loc1 = st_0C;
                /* IL_21: br.s IL_32*/
                __pos_0__ = 0x32;
                continue;
                case 0x23:
                /* IL_23: ldloc.0 */
                st_10 = loc0;
                /* IL_24: ldloc.1 */
                st_11 = loc1;
                /* IL_25: ldarg.0 */
                st_0D = arg0;
                /* IL_26: ldfld Delegate[] _invocationList*/
                st_0E = st_0D._invocationList;
                /* IL_2B: ldloc.1 */
                st_0F = loc1;
                /* IL_2C: ldelem.ref */
                st_12 = (st_0E.jsarr)[st_0F];
                /* IL_2D: stelem.ref */
                (st_10.jsarr)[st_11] = st_12;
                /* IL_2E: ldloc.1 */
                st_13 = loc1;
                /* IL_2F: ldc.i4.1 */
                st_14 = (1|0);
                /* IL_30: add */
                st_15 = ((st_13 + st_14) | 0);
                /* IL_31: stloc.1 */
                loc1 = st_15;
                case 0x32:
                /* IL_32: ldloc.1 */
                st_19 = loc1;
                /* IL_33: ldarg.0 */
                st_16 = arg0;
                /* IL_34: ldfld Delegate[] _invocationList*/
                st_17 = st_16._invocationList;
                /* IL_39: ldlen */
                st_18 = st_17.jsarr.length;
                /* IL_3A: conv.i4 */
                st_1A = (st_18 | 0);
                /* IL_3C: clt */
                st_1B = ((st_19 < st_1A) ? (1) : (0));
                /* IL_3D: stloc.3 */
                loc3 = st_1B;
                /* IL_3E: ldloc.3 */
                st_1C = loc3;
                /* IL_3F: brtrue.s IL_23*/
                
                if (st_1C){
                    __pos_0__ = 0x23;
                    continue;
                }
                /* IL_41: ldloc.0 */
                st_21 = loc0;
                /* IL_42: ldloc.0 */
                st_1D = loc0;
                /* IL_43: ldlen */
                st_1E = st_1D.jsarr.length;
                /* IL_44: conv.i4 */
                st_1F = (st_1E | 0);
                /* IL_45: ldc.i4.1 */
                st_20 = (1|0);
                /* IL_46: sub */
                st_22 = ((st_1F - st_20) | 0);
                /* IL_47: ldarg.1 */
                st_23 = arg1;
                /* IL_48: stelem.ref */
                (st_21.jsarr)[st_22] = st_23;
                /* IL_49: nop */
                
                /* IL_4A: br.s IL_5D*/
                __pos_0__ = 0x5D;
                continue;
                case 0x4C:
                /* IL_4C: nop */
                
                /* IL_4D: ldc.i4.2 */
                st_24 = (2|0);
                /* IL_4E: newarr System.Delegate*/
                st_25 = new_array(t0,st_24);
                /* IL_53: stloc.0 */
                loc0 = st_25;
                /* IL_54: ldloc.0 */
                st_26 = loc0;
                /* IL_55: ldc.i4.0 */
                st_27 = (0|0);
                /* IL_56: ldarg.0 */
                st_28 = arg0;
                /* IL_57: stelem.ref */
                (st_26.jsarr)[st_27] = st_28;
                /* IL_58: ldloc.0 */
                st_29 = loc0;
                /* IL_59: ldc.i4.1 */
                st_2A = (1|0);
                /* IL_5A: ldarg.1 */
                st_2B = arg1;
                /* IL_5B: stelem.ref */
                (st_29.jsarr)[st_2A] = st_2B;
                /* IL_5C: nop */
                
                case 0x5D:
                /* IL_5D: ldloc.0 */
                st_2C = loc0;
                /* IL_5E: call Delegate CreateMulticast(System.Delegate[])*/
                st_2D = (asm0.x6000035)(st_2C);
                /* IL_63: stloc.2 */
                loc2 = st_2D;
                /* IL_66: ldloc.2 */
                st_2E = loc2;
                /* IL_67: ret */
                return st_2E;
            }
        }
    };
    asm.x6000037_init = function ()
    {
        (((asm0)["System.Delegate"])().init)();
        asm.x6000037 = asm.x6000037_;
    };;
    asm.x6000037 = function (arg0,arg1)
    {
        (asm.x6000037_init.apply)(this,arguments);
        return (asm.x6000037.apply)(this,arguments);
    };;
    asm.x6000037_ = function RemoveImpl(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var st_16;
        var st_17;
        var st_18;
        var st_19;
        var st_1A;
        var st_1B;
        var st_1C;
        var st_1D;
        var st_1E;
        var st_1F;
        var st_20;
        var st_21;
        var st_22;
        var st_23;
        var st_24;
        var st_25;
        var st_26;
        var st_27;
        var st_28;
        var st_29;
        var st_2A;
        var st_2B;
        var st_2C;
        var st_2D;
        var st_2E;
        var st_2F;
        var st_30;
        var st_31;
        var st_32;
        var st_33;
        var st_34;
        var st_35;
        var st_36;
        var st_37;
        var st_38;
        var st_39;
        var st_3A;
        var st_3B;
        var st_3C;
        var st_3D;
        var st_3E;
        var st_3F;
        var st_40;
        var st_41;
        var st_42;
        var st_43;
        var st_44;
        var st_45;
        var st_46;
        var st_47;
        var st_48;
        var st_49;
        var st_4A;
        var st_4B;
        var st_4C;
        var st_4D;
        var st_4E;
        var st_4F;
        var st_50;
        var st_51;
        var st_52;
        var st_53;
        var st_54;
        var st_55;
        var st_56;
        var st_57;
        var st_58;
        var st_59;
        var st_5A;
        var st_5B;
        var st_5C;
        var st_5D;
        var st_5E;
        var st_5F;
        var st_60;
        var st_61;
        var st_62;
        var st_63;
        var st_64;
        var st_65;
        var st_66;
        var st_67;
        var st_68;
        var st_69;
        var st_6A;
        var st_6B;
        var st_6C;
        var st_6D;
        var st_6E;
        var st_6F;
        var __pos_0__;
        var loc5;
        var loc4;
        var loc0;
        var loc1;
        var loc2;
        var loc3;
        t0 = ((asm0)["System.Delegate"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld Delegate[] _invocationList*/
                st_01 = st_00._invocationList;
                /* IL_07: ldnull */
                st_02 = null;
                /* IL_09: ceq */
                st_03 = ((st_01 === st_02) ? (1) : (0));
                /* IL_0A: ldc.i4.0 */
                st_04 = (0|0);
                /* IL_0C: ceq */
                st_05 = ((st_03 === st_04) ? (1) : (0));
                /* IL_0D: stloc.s 5*/
                loc5 = st_05;
                /* IL_0F: ldloc.s 5*/
                st_06 = loc5;
                /* IL_11: brtrue.s IL_34*/
                
                if (st_06){
                    __pos_0__ = 0x34;
                    continue;
                }
                /* IL_13: nop */
                
                /* IL_14: ldarg.1 */
                st_07 = arg1;
                /* IL_15: ldarg.0 */
                st_08 = arg0;
                /* IL_16: call Boolean op_Equality(System.Delegate, System.Delegate)*/
                st_09 = (asm0.x6000031)(st_07,st_08);
                /* IL_1B: ldc.i4.0 */
                st_0A = (0|0);
                /* IL_1D: ceq */
                st_0B = ((st_09 === st_0A) ? (1) : (0));
                /* IL_1E: stloc.s 5*/
                loc5 = st_0B;
                /* IL_20: ldloc.s 5*/
                st_0C = loc5;
                /* IL_22: brtrue.s IL_2C*/
                
                if (st_0C){
                    __pos_0__ = 0x2C;
                    continue;
                }
                /* IL_24: ldnull */
                st_0D = null;
                /* IL_25: stloc.s 4*/
                loc4 = st_0D;
                /* IL_27: br IL_11B*/
                __pos_0__ = 0x11B;
                continue;
                case 0x2C:
                /* IL_2C: ldarg.0 */
                st_0E = arg0;
                /* IL_2D: stloc.s 4*/
                loc4 = st_0E;
                /* IL_2F: br IL_11B*/
                __pos_0__ = 0x11B;
                continue;
                case 0x34:
                /* IL_34: nop */
                
                /* IL_35: ldc.i4.0 */
                st_0F = (0|0);
                /* IL_36: stloc.0 */
                loc0 = st_0F;
                /* IL_37: ldc.i4.0 */
                st_10 = (0|0);
                /* IL_38: stloc.1 */
                loc1 = st_10;
                /* IL_39: br.s IL_5A*/
                __pos_0__ = 0x5A;
                continue;
                case 0x3B:
                /* IL_3B: ldarg.0 */
                st_11 = arg0;
                /* IL_3C: ldfld Delegate[] _invocationList*/
                st_12 = st_11._invocationList;
                /* IL_41: ldloc.1 */
                st_13 = loc1;
                /* IL_42: ldelem.ref */
                st_14 = (st_12.jsarr)[st_13];
                /* IL_43: ldarg.1 */
                st_15 = arg1;
                /* IL_44: call Boolean op_Inequality(System.Delegate, System.Delegate)*/
                st_16 = (asm0.x6000032)(st_14,st_15);
                /* IL_49: ldc.i4.0 */
                st_17 = (0|0);
                /* IL_4B: ceq */
                st_18 = ((st_16 === st_17) ? (1) : (0));
                /* IL_4C: stloc.s 5*/
                loc5 = st_18;
                /* IL_4E: ldloc.s 5*/
                st_19 = loc5;
                /* IL_50: brtrue.s IL_56*/
                
                if (st_19){
                    __pos_0__ = 0x56;
                    continue;
                }
                /* IL_52: ldloc.0 */
                st_1A = loc0;
                /* IL_53: ldc.i4.1 */
                st_1B = (1|0);
                /* IL_54: add */
                st_1C = ((st_1A + st_1B) | 0);
                /* IL_55: stloc.0 */
                loc0 = st_1C;
                case 0x56:
                /* IL_56: ldloc.1 */
                st_1D = loc1;
                /* IL_57: ldc.i4.1 */
                st_1E = (1|0);
                /* IL_58: add */
                st_1F = ((st_1D + st_1E) | 0);
                /* IL_59: stloc.1 */
                loc1 = st_1F;
                case 0x5A:
                /* IL_5A: ldloc.1 */
                st_23 = loc1;
                /* IL_5B: ldarg.0 */
                st_20 = arg0;
                /* IL_5C: ldfld Delegate[] _invocationList*/
                st_21 = st_20._invocationList;
                /* IL_61: ldlen */
                st_22 = st_21.jsarr.length;
                /* IL_62: conv.i4 */
                st_24 = (st_22 | 0);
                /* IL_64: clt */
                st_25 = ((st_23 < st_24) ? (1) : (0));
                /* IL_65: stloc.s 5*/
                loc5 = st_25;
                /* IL_67: ldloc.s 5*/
                st_26 = loc5;
                /* IL_69: brtrue.s IL_3B*/
                
                if (st_26){
                    __pos_0__ = 0x3B;
                    continue;
                }
                /* IL_6B: ldloc.0 */
                st_27 = loc0;
                /* IL_6C: ldc.i4.0 */
                st_28 = (0|0);
                /* IL_6E: ceq */
                st_29 = ((st_27 === st_28) ? (1) : (0));
                /* IL_6F: ldc.i4.0 */
                st_2A = (0|0);
                /* IL_71: ceq */
                st_2B = ((st_29 === st_2A) ? (1) : (0));
                /* IL_72: stloc.s 5*/
                loc5 = st_2B;
                /* IL_74: ldloc.s 5*/
                st_2C = loc5;
                /* IL_76: brtrue.s IL_80*/
                
                if (st_2C){
                    __pos_0__ = 0x80;
                    continue;
                }
                /* IL_78: ldnull */
                st_2D = null;
                /* IL_79: stloc.s 4*/
                loc4 = st_2D;
                /* IL_7B: br IL_11B*/
                __pos_0__ = 0x11B;
                continue;
                case 0x80:
                /* IL_80: ldloc.0 */
                st_2E = loc0;
                /* IL_81: ldc.i4.1 */
                st_2F = (1|0);
                /* IL_83: ceq */
                st_30 = ((st_2E === st_2F) ? (1) : (0));
                /* IL_84: ldc.i4.0 */
                st_31 = (0|0);
                /* IL_86: ceq */
                st_32 = ((st_30 === st_31) ? (1) : (0));
                /* IL_87: stloc.s 5*/
                loc5 = st_32;
                /* IL_89: ldloc.s 5*/
                st_33 = loc5;
                /* IL_8B: brtrue.s IL_C9*/
                
                if (st_33){
                    __pos_0__ = 0xC9;
                    continue;
                }
                /* IL_8D: ldc.i4.0 */
                st_34 = (0|0);
                /* IL_8E: stloc.1 */
                loc1 = st_34;
                /* IL_8F: br.s IL_B8*/
                __pos_0__ = 0xB8;
                continue;
                case 0x91:
                /* IL_91: ldarg.0 */
                st_35 = arg0;
                /* IL_92: ldfld Delegate[] _invocationList*/
                st_36 = st_35._invocationList;
                /* IL_97: ldloc.1 */
                st_37 = loc1;
                /* IL_98: ldelem.ref */
                st_38 = (st_36.jsarr)[st_37];
                /* IL_99: ldarg.1 */
                st_39 = arg1;
                /* IL_9A: call Boolean op_Inequality(System.Delegate, System.Delegate)*/
                st_3A = (asm0.x6000032)(st_38,st_39);
                /* IL_9F: ldc.i4.0 */
                st_3B = (0|0);
                /* IL_A1: ceq */
                st_3C = ((st_3A === st_3B) ? (1) : (0));
                /* IL_A2: stloc.s 5*/
                loc5 = st_3C;
                /* IL_A4: ldloc.s 5*/
                st_3D = loc5;
                /* IL_A6: brtrue.s IL_B4*/
                
                if (st_3D){
                    __pos_0__ = 0xB4;
                    continue;
                }
                /* IL_A8: ldarg.0 */
                st_3E = arg0;
                /* IL_A9: ldfld Delegate[] _invocationList*/
                st_3F = st_3E._invocationList;
                /* IL_AE: ldloc.1 */
                st_40 = loc1;
                /* IL_AF: ldelem.ref */
                st_41 = (st_3F.jsarr)[st_40];
                /* IL_B0: stloc.s 4*/
                loc4 = st_41;
                /* IL_B2: br.s IL_11B*/
                __pos_0__ = 0x11B;
                continue;
                case 0xB4:
                /* IL_B4: ldloc.1 */
                st_42 = loc1;
                /* IL_B5: ldc.i4.1 */
                st_43 = (1|0);
                /* IL_B6: add */
                st_44 = ((st_42 + st_43) | 0);
                /* IL_B7: stloc.1 */
                loc1 = st_44;
                case 0xB8:
                /* IL_B8: ldloc.1 */
                st_48 = loc1;
                /* IL_B9: ldarg.0 */
                st_45 = arg0;
                /* IL_BA: ldfld Delegate[] _invocationList*/
                st_46 = st_45._invocationList;
                /* IL_BF: ldlen */
                st_47 = st_46.jsarr.length;
                /* IL_C0: conv.i4 */
                st_49 = (st_47 | 0);
                /* IL_C2: clt */
                st_4A = ((st_48 < st_49) ? (1) : (0));
                /* IL_C3: stloc.s 5*/
                loc5 = st_4A;
                /* IL_C5: ldloc.s 5*/
                st_4B = loc5;
                /* IL_C7: brtrue.s IL_91*/
                
                if (st_4B){
                    __pos_0__ = 0x91;
                    continue;
                }
                case 0xC9:
                /* IL_C9: ldloc.0 */
                st_4C = loc0;
                /* IL_CA: newarr System.Delegate*/
                st_4D = new_array(t0,st_4C);
                /* IL_CF: stloc.2 */
                loc2 = st_4D;
                /* IL_D0: ldc.i4.0 */
                st_4E = (0|0);
                /* IL_D1: stloc.1 */
                loc1 = st_4E;
                /* IL_D2: ldc.i4.0 */
                st_4F = (0|0);
                /* IL_D3: stloc.3 */
                loc3 = st_4F;
                /* IL_D4: br.s IL_100*/
                __pos_0__ = 0x100;
                continue;
                case 0xD6:
                /* IL_D6: ldarg.0 */
                st_50 = arg0;
                /* IL_D7: ldfld Delegate[] _invocationList*/
                st_51 = st_50._invocationList;
                /* IL_DC: ldloc.1 */
                st_52 = loc1;
                /* IL_DD: ldelem.ref */
                st_53 = (st_51.jsarr)[st_52];
                /* IL_DE: ldarg.1 */
                st_54 = arg1;
                /* IL_DF: call Boolean op_Inequality(System.Delegate, System.Delegate)*/
                st_55 = (asm0.x6000032)(st_53,st_54);
                /* IL_E4: ldc.i4.0 */
                st_56 = (0|0);
                /* IL_E6: ceq */
                st_57 = ((st_55 === st_56) ? (1) : (0));
                /* IL_E7: stloc.s 5*/
                loc5 = st_57;
                /* IL_E9: ldloc.s 5*/
                st_58 = loc5;
                /* IL_EB: brtrue.s IL_FC*/
                
                if (st_58){
                    __pos_0__ = 0xFC;
                    continue;
                }
                /* IL_ED: ldloc.2 */
                st_60 = loc2;
                /* IL_EE: ldloc.3 */
                st_59 = loc3;
                /* IL_EF: dup */
                st_61 = (st_5A = st_59);
                /* IL_F0: ldc.i4.1 */
                st_5B = (1|0);
                /* IL_F1: add */
                st_5C = ((st_5A + st_5B) | 0);
                /* IL_F2: stloc.3 */
                loc3 = st_5C;
                /* IL_F3: ldarg.0 */
                st_5D = arg0;
                /* IL_F4: ldfld Delegate[] _invocationList*/
                st_5E = st_5D._invocationList;
                /* IL_F9: ldloc.1 */
                st_5F = loc1;
                /* IL_FA: ldelem.ref */
                st_62 = (st_5E.jsarr)[st_5F];
                /* IL_FB: stelem.ref */
                (st_60.jsarr)[st_61] = st_62;
                case 0xFC:
                /* IL_FC: ldloc.1 */
                st_63 = loc1;
                /* IL_FD: ldc.i4.1 */
                st_64 = (1|0);
                /* IL_FE: add */
                st_65 = ((st_63 + st_64) | 0);
                /* IL_FF: stloc.1 */
                loc1 = st_65;
                case 0x100:
                /* IL_100: ldloc.1 */
                st_69 = loc1;
                /* IL_101: ldarg.0 */
                st_66 = arg0;
                /* IL_102: ldfld Delegate[] _invocationList*/
                st_67 = st_66._invocationList;
                /* IL_107: ldlen */
                st_68 = st_67.jsarr.length;
                /* IL_108: conv.i4 */
                st_6A = (st_68 | 0);
                /* IL_10A: clt */
                st_6B = ((st_69 < st_6A) ? (1) : (0));
                /* IL_10B: stloc.s 5*/
                loc5 = st_6B;
                /* IL_10D: ldloc.s 5*/
                st_6C = loc5;
                /* IL_10F: brtrue.s IL_D6*/
                
                if (st_6C){
                    __pos_0__ = 0xD6;
                    continue;
                }
                /* IL_111: ldloc.2 */
                st_6D = loc2;
                /* IL_112: call Delegate CreateMulticast(System.Delegate[])*/
                st_6E = (asm0.x6000035)(st_6D);
                /* IL_117: stloc.s 4*/
                loc4 = st_6E;
                case 0x11B:
                /* IL_11B: ldloc.s 4*/
                st_6F = loc4;
                /* IL_11D: ret */
                return st_6F;
            }
        }
    };
    asm.x6000038 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x6000034)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x600003a = function Invoke()
    {
        
                                var m = arguments[0]._methodPtr;
                                var t = arguments[0]._target;
                                if (t != null)
                                    arguments[0] = t;
                                else
                                    arguments = Array.prototype.slice.call(arguments, 1);
                                return m.apply(null, arguments);
    };;
    asm.x6000039 = function ctor()
    {
        arguments[0]._methodPtr = arguments[2]; arguments[0]._target = arguments[1];;
    };;
    asm.x600003d_init = function ()
    {
        (((asm0)["System.Int16"])().init)();
        asm.x600003d = asm.x600003d_;
    };;
    asm.x600003d = function (arg0)
    {
        (asm.x600003d_init.apply)(this,arguments);
        return (asm.x600003d.apply)(this,arguments);
    };;
    asm.x600003d_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.Int16"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.i2 */
        st_01 = (st_00.r)();
        /* IL_03: box System.Int16*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x600003e_init = function ()
    {
        (((asm0)["System.Int32"])().init)();
        asm.x600003e = asm.x600003e_;
    };;
    asm.x600003e = function (arg0)
    {
        (asm.x600003e_init.apply)(this,arguments);
        return (asm.x600003e.apply)(this,arguments);
    };;
    asm.x600003e_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.Int32"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.i4 */
        st_01 = (st_00.r)();
        /* IL_03: box System.Int32*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x600003f = function(o) { return new_string(o.boxed.toString()); };;
    asm.x6000040_init = function ()
    {
        (((asm0)["System.IntPtr"])().init)();
        asm.x6000040 = asm.x6000040_;
    };;
    asm.x6000040 = function (arg0)
    {
        (asm.x6000040_init.apply)(this,arguments);
        return (asm.x6000040.apply)(this,arguments);
    };;
    asm.x6000040_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.IntPtr"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldobj System.IntPtr*/
        st_01 = st_00;
        /* IL_07: box System.IntPtr*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_0C: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_11: stloc.0 */
        loc0 = st_03;
        /* IL_14: ldloc.0 */
        st_04 = loc0;
        /* IL_15: ret */
        return st_04;
    };
    asm.x6000041 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x6000042 = function get_Value(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldfld Object value*/
        st_01 = (st_00.r)().value;
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x6000043 = function get_Value(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldfld Object value*/
        st_01 = (st_00.r)().value;
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x6000044_init = function ()
    {
        (((asm0)["System.SByte"])().init)();
        asm.x6000044 = asm.x6000044_;
    };;
    asm.x6000044 = function (arg0)
    {
        (asm.x6000044_init.apply)(this,arguments);
        return (asm.x6000044.apply)(this,arguments);
    };;
    asm.x6000044_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.SByte"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.i1 */
        st_01 = (st_00.r)();
        /* IL_03: box System.SByte*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x6000045_init = function ()
    {
        (((asm0)["System.Single"])().init)();
        asm.x6000045 = asm.x6000045_;
    };;
    asm.x6000045 = function (arg0)
    {
        (asm.x6000045_init.apply)(this,arguments);
        return (asm.x6000045.apply)(this,arguments);
    };;
    asm.x6000045_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.Single"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.r4 */
        st_01 = (st_00.r)();
        /* IL_03: box System.Single*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x6000046 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x600004e = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x6000051 = function get_Message(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldfld String <Message>k__BackingField*/
        st_01 = (st_00)["SystemException<Message>k__BackingField"];
        /* IL_06: stloc.0 */
        loc0 = st_01;
        /* IL_09: ldloc.0 */
        st_02 = loc0;
        /* IL_0A: ret */
        return st_02;
    };;
    asm.x6000052 = function set_Message(arg0,arg1)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: stfld String <Message>k__BackingField*/
        (st_00)["SystemException<Message>k__BackingField"] = st_01;
        /* IL_07: ret */
        return ;
    };;
    asm.x6000053 = function ToString(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call String get_Message()*/
        st_01 = (asm0.x6000051)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x600004f = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: nop */
        /* IL_09: ret */
        return ;
    };;
    asm.x6000050 = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: ldarg.0 */
        st_01 = arg0;
        /* IL_09: ldarg.1 */
        st_02 = arg1;
        /* IL_0A: call Void set_Message(System.String)*/
        (asm0.x6000052)(st_01,st_02);
        /* IL_0F: nop */
        /* IL_10: nop */
        /* IL_11: ret */
        return ;
    };;
    asm.x6000054 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600004f)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x6000055 = function _ctor(arg0)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldstr Operation not supported*/
        st_01 = new_string("Operation not supported");
        /* IL_06: call Void .ctor(System.String)*/
        (asm0.x6000050)(st_00,st_01);
        /* IL_0B: nop */
        /* IL_0C: nop */
        /* IL_0D: nop */
        /* IL_0E: ret */
        return ;
    };;
    asm.x6000056 = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: call Void .ctor(System.String)*/
        (asm0.x6000050)(st_00,st_01);
        /* IL_07: nop */
        /* IL_08: nop */
        /* IL_09: nop */
        /* IL_0A: ret */
        return ;
    };;
    asm.x600005a = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x600005b = function _ctor(arg0)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldstr Cannot cast from source type to destination type.*/
        st_01 = new_string("Cannot cast from source type to destination type.");
        /* IL_06: call Void .ctor(System.String)*/
        (asm0.x6000050)(st_00,st_01);
        /* IL_0B: nop */
        /* IL_0C: nop */
        /* IL_0D: nop */
        /* IL_0E: ret */
        return ;
    };;
    asm.x600005c = function _ctor(arg0)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldstr Operation is not valid due to the current state of the object*/
        st_01 = new_string("Operation is not valid due to the current state of the object");
        /* IL_06: call Void .ctor(System.String)*/
        (asm0.x6000050)(st_00,st_01);
        /* IL_0B: nop */
        /* IL_0C: nop */
        /* IL_0D: nop */
        /* IL_0E: ret */
        return ;
    };;
    asm.x600005d = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: call Void .ctor(System.String)*/
        (asm0.x6000050)(st_00,st_01);
        /* IL_07: nop */
        /* IL_08: nop */
        /* IL_09: nop */
        /* IL_0A: ret */
        return ;
    };;
    asm.x600005e_init = function ()
    {
        (((asm0)["System.Int64"])().init)();
        asm.x600005e = asm.x600005e_;
    };;
    asm.x600005e = function (arg0)
    {
        (asm.x600005e_init.apply)(this,arguments);
        return (asm.x600005e.apply)(this,arguments);
    };;
    asm.x600005e_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var st_16;
        var st_17;
        var st_18;
        var st_19;
        var st_1A;
        var st_1B;
        var st_1C;
        var st_1D;
        var st_1E;
        var st_1F;
        var st_20;
        var st_21;
        var st_22;
        var __pos_0__;
        var loc0;
        var loc1;
        var loc2;
        var loc5;
        var loc4;
        var loc3;
        t0 = ((asm0)["System.Int64"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldind.i8 */
                st_01 = (st_00.r)();
                /* IL_03: stloc.0 */
                loc0 = st_01;
                /* IL_04: ldc.i4.s 10*/
                st_02 = (10|0);
                /* IL_06: conv.i8 */
                st_03 = conv_i8(st_02);
                /* IL_07: stloc.1 */
                loc1 = st_03;
                /* IL_08: ldstr */
                st_04 = new_string("");
                /* IL_0D: stloc.2 */
                loc2 = st_04;
                /* IL_0E: ldloc.0 */
                st_06 = loc0;
                /* IL_0F: ldc.i4.0 */
                st_05 = (0|0);
                /* IL_10: conv.i8 */
                st_07 = conv_i8(st_05);
                /* IL_12: clt */
                st_08 = (asm0.Int64_LessThan)(st_06,st_07);
                /* IL_13: ldc.i4.0 */
                st_09 = (0|0);
                /* IL_15: ceq */
                st_0A = ((st_08 === st_09) ? (1) : (0));
                /* IL_16: stloc.s 5*/
                loc5 = st_0A;
                /* IL_18: ldloc.s 5*/
                st_0B = loc5;
                /* IL_1A: brtrue.s IL_37*/
                
                if (st_0B){
                    __pos_0__ = 0x37;
                    continue;
                }
                /* IL_1C: nop */
                
                /* IL_1D: ldstr -*/
                st_0F = new_string("-");
                /* IL_22: ldloc.0 */
                st_0C = loc0;
                /* IL_23: neg */
                st_0D = (asm0.Int64_UnaryNegation)(st_0C);
                /* IL_24: box System.Int64*/
                st_0E = {
                    'boxed': st_0D,
                    'type': t0,
                    'vtable': t0.prototype.vtable
                };
                /* IL_29: callvirt String ToString()*/
                st_10 = (((st_0E.vtable)["asm0.x6000005"])())(convert_box_to_pointer_as_needed(st_0E));
                /* IL_2E: call String Concat(System.String, System.String)*/
                st_11 = (asm0.x60000ae)(st_0F,st_10);
                /* IL_33: stloc.s 4*/
                loc4 = st_11;
                /* IL_35: br.s IL_5E*/
                __pos_0__ = 0x5E;
                continue;
                case 0x37:
                /* IL_37: nop */
                
                /* IL_38: ldloc.0 */
                st_12 = loc0;
                /* IL_39: ldloc.1 */
                st_13 = loc1;
                /* IL_3A: rem */
                st_14 = (asm0.Int64_Modulus)(st_12,st_13);
                /* IL_3B: stloc.3 */
                loc3 = st_14;
                /* IL_3C: ldloc.3 */
                st_15 = loc3;
                /* IL_3D: call String GetLowString(System.Int64)*/
                st_16 = new_string(st_15[0].toString());
                /* IL_42: ldloc.2 */
                st_17 = loc2;
                /* IL_43: call String Concat(System.String, System.String)*/
                st_18 = (asm0.x60000ae)(st_16,st_17);
                /* IL_48: stloc.2 */
                loc2 = st_18;
                /* IL_49: ldloc.0 */
                st_19 = loc0;
                /* IL_4A: ldloc.1 */
                st_1A = loc1;
                /* IL_4B: div */
                st_1B = (asm0.Int64_Division)(st_19,st_1A);
                /* IL_4C: stloc.0 */
                loc0 = st_1B;
                /* IL_4D: nop */
                
                /* IL_4E: ldloc.0 */
                st_1D = loc0;
                /* IL_4F: ldc.i4.0 */
                st_1C = (0|0);
                /* IL_50: conv.i8 */
                st_1E = conv_i8(st_1C);
                /* IL_52: cgt */
                st_1F = (asm0.Int64_GreaterThan)(st_1D,st_1E);
                /* IL_53: stloc.s 5*/
                loc5 = st_1F;
                /* IL_55: ldloc.s 5*/
                st_20 = loc5;
                /* IL_57: brtrue.s IL_37*/
                
                if (st_20){
                    __pos_0__ = 0x37;
                    continue;
                }
                /* IL_59: ldloc.2 */
                st_21 = loc2;
                /* IL_5A: stloc.s 4*/
                loc4 = st_21;
                case 0x5E:
                /* IL_5E: ldloc.s 4*/
                st_22 = loc4;
                /* IL_60: ret */
                return st_22;
            }
        }
    };
    asm.x600005f = function Equals(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.i8 */
        st_02 = (st_00.r)();
        /* IL_03: ldarg.1 */
        st_01 = arg1;
        /* IL_04: unbox.any System.Int64*/
        st_03 = unbox_any(st_01,((asm0)["System.Int64"])());
        /* IL_0A: ceq */
        st_04 = ((st_02 === st_03) ? (1) : (0));
        /* IL_0B: stloc.0 */
        loc0 = st_04;
        /* IL_0E: ldloc.0 */
        st_05 = loc0;
        /* IL_0F: ret */
        return st_05;
    };;
    asm.x6000060 = function GetHashCode(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.i8 */
        st_01 = (st_00.r)();
        /* IL_03: call Int32 GetLow(System.Int64)*/
        st_02 = st_01[0];
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x6000063 = 
            function XInt64_Addition(lhs, rhs) 
            {
                var x = new Uint16Array(lhs.buffer);
                var y = new Uint16Array(rhs.buffer);                

                var a = (x[0] + y[0]) | 0;
                var o1 = (a & 0xff0000) >> 16;
                var b = (o1 + x[1] + y[1]) | 0;
                var o2 = (b & 0xff0000) >> 16;
                var c = (o2 + x[2] + y[2]) | 0;
                var o3 = (c & 0xff0000) >> 16;
                var d = (o3 + x[3] + y[3]) | 0;

                return new Uint32Array(new Uint16Array([a & 0xffff, b & 0xffff, c & 0xffff, d & 0xffff]).buffer);
            };;
    asm.XInt64_Addition = asm.x6000063;
    asm.x6000064 = 
            function XInt64_Subtraction(lhs, rhs) 
            {
                if (lhs[0] >= rhs[0] && rhs[1] == 0)
                    return new Uint32Array([lhs[0]-rhs[0], lhs[1]]);

                var x = new Uint16Array(lhs.buffer);
                var y = new Uint16Array(rhs.buffer);

                var a = (x[0] - y[0]) | 0;
                var u = 0;
                if (a < 0) { a = 0x10000 + a; u = -1; }

                var b = (u + ((x[1] - y[1]) | 0)) | 0;
                u = 0;
                if (b < 0) { b = 0x10000 + b; u = -1; }

                var c = (u + ((x[2] - y[2]) | 0)) | 0;
                u = 0;
                if (c < 0) { c = 0x10000 + c; u = -1; }

                var d = (u + ((x[3] - y[3]) | 0)) | 0;
                if (d < 0) { d = 0x10000 + d; }
                
                return new Uint32Array(new Uint16Array([a & 0xffff, b & 0xffff, c & 0xffff, d & 0xffff]).buffer);
            };;
    asm.XInt64_Subtraction = asm.x6000064;
    asm.x6000065 = 
            function XInt64_BitwiseOr(lhs, rhs)
            {
                return new Uint32Array([lhs[0] | rhs[0], lhs[1] | rhs[1]]);
            }
            ;;
    asm.XInt64_BitwiseOr = asm.x6000065;
    asm.x6000066 = 
            function XInt64_BitwiseAnd(lhs, rhs) 
            {
                return new Uint32Array([lhs[0] & rhs[0], lhs[1] & rhs[1]]);
            }
            ;;
    asm.XInt64_BitwiseAnd = asm.x6000066;
    asm.x6000067 = 
            function XInt64_ExclusiveOr(lhs, rhs)
            {
                return new Uint32Array([lhs[0] ^ rhs[0], lhs[1] ^ rhs[1]]);
            }
            ;;
    asm.XInt64_ExclusiveOr = asm.x6000067;
    asm.x6000068 = 
            function XInt64_OnesComplement(a)
            {
                return new Uint32Array([~a[0], ~a[1]]);
            }
            ;;
    asm.XInt64_OnesComplement = asm.x6000068;
    asm.x6000069 = 
            function XInt64_LeftShift(lhs, n)
            {
                n = n & 0x3f;

                var maxShift = 8;
                if (n > maxShift) {
                    return asm0.XInt64_LeftShift(
                           asm0.XInt64_LeftShift(lhs, maxShift), n - maxShift);
                }
          
                var x = new Uint16Array(lhs.buffer);

                var a = (x[0] << n);
                var b = (x[1] << n) | ((a >>> 16) & 0xffff);
                var c = (x[2] << n) | ((b >>> 16) & 0xffff);
                var d = (x[3] << n) | ((c >>> 16) & 0xffff);

                return new Uint32Array(new Uint16Array([a & 0xffff, b & 0xffff, c & 0xffff, d & 0xffff]).buffer);
            }
            ;;
    asm.XInt64_LeftShift = asm.x6000069;
    asm.x600006a = 
            function XInt64_Equality(lhs, rhs)
            {
                return lhs[0] === rhs[0] && lhs[1] === rhs[1];
            }
            ;;
    asm.XInt64_Equality = asm.x600006a;
    asm.x600006b = 
            function XInt64_Inequality(lhs, rhs)
            {
                return lhs[0] !== rhs[0] && lhs[1] !== rhs[1];
            }
            ;;
    asm.XInt64_Inequality = asm.x600006b;
    asm.x600006c = function op_Decrement(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_01 = arg0;
        /* IL_02: ldc.i4.1 */
        st_00 = (1|0);
        /* IL_03: conv.i8 */
        st_02 = conv_i8(st_00);
        /* IL_04: sub */
        st_03 = (asm0.XInt64_Subtraction)(st_01,st_02);
        /* IL_05: stloc.0 */
        loc0 = st_03;
        /* IL_08: ldloc.0 */
        st_04 = loc0;
        /* IL_09: ret */
        return st_04;
    };;
    asm.XInt64_Decrement = asm.x600006c;
    asm.x600006d = function op_Increment(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_01 = arg0;
        /* IL_02: ldc.i4.1 */
        st_00 = (1|0);
        /* IL_03: conv.i8 */
        st_02 = conv_i8(st_00);
        /* IL_04: add */
        st_03 = (asm0.XInt64_Addition)(st_01,st_02);
        /* IL_05: stloc.0 */
        loc0 = st_03;
        /* IL_08: ldloc.0 */
        st_04 = loc0;
        /* IL_09: ret */
        return st_04;
    };;
    asm.XInt64_Increment = asm.x600006d;
    asm.x600006e = 
            function Int64_RightShift(a, n) {
                // Int64 (signed) uses arithmetic shift, UIn64 (unsigned) uses logical shift

                if (n === 0) {
                    var result2 = a;
                } else if (n > 32) {
                    result2 = asm0.Int64_RightShift(asm0.Int64_RightShift(a, 32), n - 32);
                } else {
                    var unsignedShift = asm0.UInt64_RightShift(a, n);

                    if (asm0.Int64_isNegative(a)) {
                        var outshift = asm0.UInt64_RightShift(new Uint32Array([0xffffff, 0xffffff]), n);
                        var inshift = asm0.XInt64_LeftShift(outshift, 64 - n);
                        var uresult = asm0.UInt64_BitwiseOr(unsignedShift, inshift);
                    } else {
                        uresult = unsignedShift;
                    }
                    result2 = uresult;
                }
                return result2;
            };;
    asm.Int64_RightShift = asm.x600006e;
    asm.x600006f = 
            function Int64_Division(n, d) {
                if (d[0] === 0 && d[1] === 0)
                    throw new Error("System.DivideByZeroException");

                if (asm0.Int64_isNegative(d))
                    return asm0.Int64_Division(
                      asm0.Int64_UnaryNegation(n), asm0.Int64_UnaryNegation(d));

                else if (asm0.Int64_isNegative(n))
                    return asm0.Int64_UnaryNegation(asm0.Int64_Division(asm0.Int64_UnaryNegation(n), d));
                else
                    return asm0.UInt64_Division(n, d);
            };;
    asm.Int64_Division = asm.x600006f;
    asm.x6000070 = 
            function Int64_Modulus(n, d) {
                if (d[0] === 0 && d[1] === 0)
                    throw new Error("System.DivideByZeroException");

                if (asm0.Int64_isNegative(d)) {
                    return asm0.Int64_Modulus(
                      n, asm0.Int64_UnaryNegation(d));
                }
                else if (asm0.Int64_isNegative(n))
                    return asm0.Int64_UnaryNegation(asm0.Int64_Modulus(asm0.Int64_UnaryNegation(n), d));
                else
                    return asm0.UInt64_Modulus(n, d);
            };;
    asm.Int64_Modulus = asm.x6000070;
    asm.x6000071 = 
            function Int64_GreaterThan (a, b) {
                var an = asm0.Int64_isNegative(a);
                var bn = asm0.Int64_isNegative(b);

                if (an === bn)
                    return asm0.UInt64_GreaterThan(a, b);
                else
                    return bn ? 1 : 0;
            };;
    asm.Int64_GreaterThan = asm.x6000071;
    asm.x6000072 = 
            function Int64_LessThan (a, b) {
                var an = asm0.Int64_isNegative(a);
                var bn = asm0.Int64_isNegative(b);

                if (an === bn)
                    return asm0.UInt64_LessThan(a, b);
                else
                    return an ? 1 : 0;
            };;
    asm.Int64_LessThan = asm.x6000072;
    asm.x6000073 = 
            function Int64_UnaryNegation (a) {
                var complement = asm0.XInt64_Subtraction(new Uint32Array([0xffffffff, 0xffffffff]), a);
                return asm0.XInt64_Addition(complement, conv_u8(1));
            };;
    asm.Int64_UnaryNegation = asm.x6000073;
    asm.x6000074 = 
            function isNegative(n) {
                return asm0.UInt64_GreaterThan(n, [0xffffffff, 0x7fffffff]);
            };;
    asm.Int64_isNegative = asm.x6000074;
    asm.x600007f = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x6000080 = function _ctor(arg0,arg1)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: nop */
        /* IL_09: ret */
        return ;
    };;
    asm.x6000081 = function InitializeArray(arg0,arg1)
    {
        /* IL_00: nop */
        /* IL_01: ret */
        return ;
    };;
    asm.x6000082 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x6000083 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: nop */
        /* IL_09: ret */
        return ;
    };;
    asm.x6000084_init = function ()
    {
        (((asm0)["System.EventArgs"])().init)();
        asm.x6000084 = asm.x6000084_;
    };;
    asm.x6000084 = function ()
    {
        (asm.x6000084_init.apply)(this,arguments);
        return (asm.x6000084.apply)(this,arguments);
    };;
    asm.x6000084_ = function _cctor()
    {
        var t0;
        var st_00;
        t0 = ((asm0)["System.EventArgs"])();
        /* IL_00: newobj Void .ctor()*/
        st_00 = newobj(t0,asm0.x6000083,[ null ]);
        /* IL_05: stsfld EventArgs Empty*/
        (t0)["Empty"] = st_00;
        /* IL_0A: ret */
        return ;
    };
    asm.x6000086 = function Invoke()
    {
        
                                var m = arguments[0]._methodPtr;
                                var t = arguments[0]._target;
                                if (t != null)
                                    arguments[0] = t;
                                else
                                    arguments = Array.prototype.slice.call(arguments, 1);
                                return m.apply(null, arguments);
    };;
    asm.x6000085 = function ctor()
    {
        arguments[0]._methodPtr = arguments[2]; arguments[0]._target = arguments[1];;
    };;
    asm.x6000087 = function get_Length(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call Int32 GetLengthImpl(System.Object)*/
        st_01 = (asm0.x6000088)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x6000088 = function(o) { return o.jsarr.length; };;
    asm.x6000089 = function(o, i) { return box(o.jsarr[i], o.type); };;
    asm.x600008a = function GetValue(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Object GetValueImpl(System.Object, System.Int32)*/
        st_02 = (asm0.x6000089)(st_00,st_01);
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x600008b = function GetEnumerator(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: callvirt IEnumerator GetEnumeratorImpl()*/
        st_01 = (((st_00.vtable)["asm0.x600008c"])())(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x600008d = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x600008f_init = function ()
    {
        (((asm0)["System.Array`1+ArrayEnumerator"])(((arguments)[0].constructor.GenericArguments)[0]).init)();
        asm.x600008f = asm.x600008f_;
    };;
    asm.x600008f = function (arg0)
    {
        (asm.x600008f_init.apply)(this,arguments);
        return (asm.x600008f.apply)(this,arguments);
    };;
    asm.x600008f_ = function GetEnumerator(arg0)
    {
        var t0;
        var t1;
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        t0 = ((arguments)[0].constructor.GenericArguments)[0];
        t1 = ((asm0)["System.Array`1+ArrayEnumerator"])(((arguments)[0].constructor.GenericArguments)[0]);
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: newobj Void .ctor(System.Array`1[T])*/
        st_01 = newobj(t1,asm0.x6000092,[ null,st_00 ]);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };
    asm.x6000090 = function GetEnumeratorImpl(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call IEnumerator`1 GetEnumerator()*/
        st_01 = (asm0.x600008f)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x6000091 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600008d)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x6000093 = function get_Current(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldfld Array`1 source*/
        st_02 = st_00.source;
        /* IL_07: ldarg.0 */
        st_01 = arg0;
        /* IL_08: ldfld Int32 index*/
        st_03 = st_01.index;
        /* IL_0D: callvirt T GetTypedValue(System.Int32)*/
        st_04 = st_02.jsarr[st_03];
        /* IL_12: stloc.0 */
        loc0 = st_04;
        /* IL_15: ldloc.0 */
        st_05 = loc0;
        /* IL_16: ret */
        return st_05;
    };;
    asm.x6000094 = function MoveNext(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: dup */
        st_04 = (st_01 = st_00);
        /* IL_03: ldfld Int32 index*/
        st_02 = st_01.index;
        /* IL_08: ldc.i4.1 */
        st_03 = (1|0);
        /* IL_09: add */
        st_05 = ((st_02 + st_03) | 0);
        /* IL_0A: stfld Int32 index*/
        st_04.index = st_05;
        /* IL_0F: ldarg.0 */
        st_06 = arg0;
        /* IL_10: ldfld Int32 index*/
        st_08 = st_06.index;
        /* IL_15: ldarg.0 */
        st_07 = arg0;
        /* IL_16: ldfld Int32 length*/
        st_09 = st_07.length;
        /* IL_1C: clt */
        st_0A = ((st_08 < st_09) ? (1) : (0));
        /* IL_1D: stloc.0 */
        loc0 = st_0A;
        /* IL_20: ldloc.0 */
        st_0B = loc0;
        /* IL_21: ret */
        return st_0B;
    };;
    asm.x6000095 = function System_Collections_IEnumerator_get_Current(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        t0 = ((arguments)[0].constructor.GenericArguments)[0];
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call T get_Current()*/
        st_01 = (asm0.x6000093)(st_00);
        /* IL_07: box T*/
        st_02 = box(st_01,t0);
        /* IL_0C: stloc.0 */
        loc0 = st_02;
        /* IL_0F: ldloc.0 */
        st_03 = loc0;
        /* IL_10: ret */
        return st_03;
    };;
    asm.x6000096 = function Reset(arg0)
    {
        var st_00;
        var st_01;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldc.i4.m1 */
        st_01 = (-1|0);
        /* IL_03: stfld Int32 index*/
        st_00.index = st_01;
        /* IL_08: ret */
        return ;
    };;
    asm.x6000097 = function Dispose(arg0)
    {
        /* IL_00: nop */
        /* IL_01: ret */
        return ;
    };;
    asm.x6000092 = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: ldarg.0 */
        st_01 = arg0;
        /* IL_09: ldarg.1 */
        st_02 = arg1;
        /* IL_0A: stfld Array`1 source*/
        st_01.source = st_02;
        /* IL_0F: ldarg.0 */
        st_03 = arg0;
        /* IL_10: ldc.i4.m1 */
        st_04 = (-1|0);
        /* IL_11: stfld Int32 index*/
        st_03.index = st_04;
        /* IL_16: ldarg.0 */
        st_06 = arg0;
        /* IL_17: ldarg.1 */
        st_05 = arg1;
        /* IL_18: callvirt Int32 get_Length()*/
        st_07 = (asm0.x6000087)(st_05);
        /* IL_1D: stfld Int32 length*/
        st_06.length = st_07;
        /* IL_22: nop */
        /* IL_23: ret */
        return ;
    };;
    asm.x6000098 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x6000099 = function _ctor(arg0,arg1)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: nop */
        /* IL_09: ret */
        return ;
    };;
    asm.x600009b = function get_HasValue(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldfld Boolean has_value*/
        st_01 = (st_00.r)().has_value;
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x600009c_init = function ()
    {
        (((asm0)["System.InvalidOperationException"])().init)();
        asm.x600009c = asm.x600009c_;
    };;
    asm.x600009c = function (arg0)
    {
        (asm.x600009c_init.apply)(this,arguments);
        return (asm.x600009c.apply)(this,arguments);
    };;
    asm.x600009c_ = function get_Value(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.InvalidOperationException"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld Boolean has_value*/
                st_01 = (st_00.r)().has_value;
                /* IL_07: stloc.1 */
                loc1 = st_01;
                /* IL_08: ldloc.1 */
                st_02 = loc1;
                /* IL_09: brtrue.s IL_16*/
                
                if (st_02){
                    __pos_0__ = 0x16;
                    continue;
                }
                /* IL_0B: ldstr Nullable object must have a value.*/
                st_03 = new_string("Nullable object must have a value.");
                /* IL_10: newobj Void .ctor(System.String)*/
                st_04 = newobj(t0,asm0.x600005d,[ null,st_03 ]);
                /* IL_15: throw */
                throw st_04;
                case 0x16:
                /* IL_16: ldarg.0 */
                st_05 = arg0;
                /* IL_17: ldfld T value*/
                st_06 = (st_05.r)().value;
                /* IL_1C: stloc.0 */
                loc0 = st_06;
                /* IL_1F: ldloc.0 */
                st_07 = loc0;
                /* IL_20: ret */
                return st_07;
            }
        }
    };
    asm.x600009d_init = function ()
    {
        (((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]).init)();
        asm.x600009d = asm.x600009d_;
    };;
    asm.x600009d = function (arg0,arg1)
    {
        (asm.x600009d_init.apply)(this,arguments);
        return (asm.x600009d.apply)(this,arguments);
    };;
    asm.x600009d_ = function Equals(arg0,arg1)
    {
        var t0;
        var t1;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = (((arguments)[0].r)().constructor.GenericArguments)[0];
        t1 = ((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]);
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.1 */
                st_00 = arg1;
                /* IL_02: ldnull */
                st_01 = null;
                /* IL_04: ceq */
                st_02 = ((st_00 === st_01) ? (1) : (0));
                /* IL_05: ldc.i4.0 */
                st_03 = (0|0);
                /* IL_07: ceq */
                st_04 = ((st_02 === st_03) ? (1) : (0));
                /* IL_08: stloc.1 */
                loc1 = st_04;
                /* IL_09: ldloc.1 */
                st_05 = loc1;
                /* IL_0A: brtrue.s IL_18*/
                
                if (st_05){
                    __pos_0__ = 0x18;
                    continue;
                }
                /* IL_0C: ldarg.0 */
                st_06 = arg0;
                /* IL_0D: ldfld Boolean has_value*/
                st_07 = (st_06.r)().has_value;
                /* IL_12: ldc.i4.0 */
                st_08 = (0|0);
                /* IL_14: ceq */
                st_09 = ((st_07 === st_08) ? (1) : (0));
                /* IL_15: stloc.0 */
                loc0 = st_09;
                /* IL_16: br.s IL_38*/
                __pos_0__ = 0x38;
                continue;
                case 0x18:
                /* IL_18: ldarg.1 */
                st_0A = arg1;
                /* IL_19: isinst System.Nullable`1[T]*/
                st_0B = (t1.IsInst)(st_0A);
                /* IL_1E: ldnull */
                st_0C = null;
                /* IL_20: cgt.un */
                st_0D = ((st_0B > st_0C) ? (1) : (0));
                /* IL_21: stloc.1 */
                loc1 = st_0D;
                /* IL_22: ldloc.1 */
                st_0E = loc1;
                /* IL_23: brtrue.s IL_29*/
                
                if (st_0E){
                    __pos_0__ = 0x29;
                    continue;
                }
                /* IL_25: ldc.i4.0 */
                st_0F = (0|0);
                /* IL_26: stloc.0 */
                loc0 = st_0F;
                /* IL_27: br.s IL_38*/
                __pos_0__ = 0x38;
                continue;
                case 0x29:
                /* IL_29: ldarg.0 */
                st_11 = arg0;
                /* IL_2A: ldarg.1 */
                st_10 = arg1;
                /* IL_2B: unbox.any System.Nullable`1[T]*/
                st_12 = unbox_any(st_10,t1);
                /* IL_30: call Boolean Equals(System.Nullable`1[T])*/
                st_13 = (asm0.x600009e)(st_11,clone_value(st_12));
                /* IL_35: stloc.0 */
                loc0 = st_13;
                case 0x38:
                /* IL_38: ldloc.0 */
                st_14 = loc0;
                /* IL_39: ret */
                return st_14;
            }
        }
    };
    asm.x600009e = function Equals(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = (((arguments)[0].r)().constructor.GenericArguments)[0];
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarga.s 1*/
                st_00 = {
                    'w': function ()
                    {
                        arg1 = (arguments)[0];
                    },
                    'r': function ()
                    {
                        return arg1;
                    }
                };
                /* IL_03: ldfld Boolean has_value*/
                st_02 = (st_00.r)().has_value;
                /* IL_08: ldarg.0 */
                st_01 = arg0;
                /* IL_09: ldfld Boolean has_value*/
                st_03 = (st_01.r)().has_value;
                /* IL_0F: ceq */
                st_04 = ((st_02 === st_03) ? (1) : (0));
                /* IL_10: stloc.1 */
                loc1 = st_04;
                /* IL_11: ldloc.1 */
                st_05 = loc1;
                /* IL_12: brtrue.s IL_18*/
                
                if (st_05){
                    __pos_0__ = 0x18;
                    continue;
                }
                /* IL_14: ldc.i4.0 */
                st_06 = (0|0);
                /* IL_15: stloc.0 */
                loc0 = st_06;
                /* IL_16: br.s IL_46*/
                __pos_0__ = 0x46;
                continue;
                case 0x18:
                /* IL_18: ldarg.0 */
                st_07 = arg0;
                /* IL_19: ldfld Boolean has_value*/
                st_08 = (st_07.r)().has_value;
                /* IL_1E: stloc.1 */
                loc1 = st_08;
                /* IL_1F: ldloc.1 */
                st_09 = loc1;
                /* IL_20: brtrue.s IL_26*/
                
                if (st_09){
                    __pos_0__ = 0x26;
                    continue;
                }
                /* IL_22: ldc.i4.1 */
                st_0A = (1|0);
                /* IL_23: stloc.0 */
                loc0 = st_0A;
                /* IL_24: br.s IL_46*/
                __pos_0__ = 0x46;
                continue;
                case 0x26:
                /* IL_26: ldarga.s 1*/
                st_0B = {
                    'w': function ()
                    {
                        arg1 = (arguments)[0];
                    },
                    'r': function ()
                    {
                        return arg1;
                    }
                };
                /* IL_28: ldflda T value*/
                st_0E = {
                    'w': function ()
                    {
                        (((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]))["value"] = (arguments)[0];
                    },
                    'r': function ()
                    {
                        return (((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]))["value"];
                    }
                };
                /* IL_2D: ldarg.0 */
                st_0C = arg0;
                /* IL_2E: ldfld T value*/
                st_0D = (st_0C.r)().value;
                /* IL_33: box T*/
                st_0F = box(st_0D,t0);
                /* IL_3E: callvirt Boolean Equals(System.Object)*/
                /* warning: ignoring prefixes constrained.*/
                st_10 = (((st_0E.vtable)["asm0.x6000009"])())(st_0E,st_0F);
                /* IL_43: stloc.0 */
                loc0 = st_10;
                case 0x46:
                /* IL_46: ldloc.0 */
                st_11 = loc0;
                /* IL_47: ret */
                return st_11;
            }
        }
    };;
    asm.x600009f = function GetHashCode(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var __pos_0__;
        var loc1;
        var loc0;
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld Boolean has_value*/
                st_01 = (st_00.r)().has_value;
                /* IL_07: stloc.1 */
                loc1 = st_01;
                /* IL_08: ldloc.1 */
                st_02 = loc1;
                /* IL_09: brtrue.s IL_0F*/
                
                if (st_02){
                    __pos_0__ = 0xF;
                    continue;
                }
                /* IL_0B: ldc.i4.0 */
                st_03 = (0|0);
                /* IL_0C: stloc.0 */
                loc0 = st_03;
                /* IL_0D: br.s IL_23*/
                __pos_0__ = 0x23;
                continue;
                case 0xF:
                /* IL_0F: ldarg.0 */
                st_04 = arg0;
                /* IL_10: ldflda T value*/
                st_05 = {
                    'w': function ()
                    {
                        (((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]))["value"] = (arguments)[0];
                    },
                    'r': function ()
                    {
                        return (((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]))["value"];
                    }
                };
                /* IL_1B: callvirt Int32 GetHashCode()*/
                /* warning: ignoring prefixes constrained.*/
                st_06 = (((st_05.vtable)["asm0.x6000006"])())(st_05);
                /* IL_20: stloc.0 */
                loc0 = st_06;
                case 0x23:
                /* IL_23: ldloc.0 */
                st_07 = loc0;
                /* IL_24: ret */
                return st_07;
            }
        }
    };;
    asm.x60000a0 = function GetValueOrDefault(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldfld T value*/
        st_01 = (st_00.r)().value;
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x60000a1 = function GetValueOrDefault(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var __pos_0__;
        var loc0;
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld Boolean has_value*/
                st_01 = (st_00.r)().has_value;
                /* IL_07: brtrue.s IL_0C*/
                
                if (st_01){
                    __pos_0__ = 0xC;
                    continue;
                }
                /* IL_09: ldarg.1 */
                st_03 = arg1;
                /* IL_0A: br.s IL_12*/
                __pos_0__ = 0x12;
                continue;
                case 0xC:
                /* IL_0C: ldarg.0 */
                st_02 = arg0;
                /* IL_0D: ldfld T value*/
                st_03 = (st_02.r)().value;
                case 0x12:
                /* IL_12: nop */
                
                /* IL_13: stloc.0 */
                loc0 = st_03;
                /* IL_16: ldloc.0 */
                st_04 = loc0;
                /* IL_17: ret */
                return st_04;
            }
        }
    };;
    asm.x60000a2_init = function ()
    {
        (((asm0)["System.String"])().init)();
        asm.x60000a2 = asm.x60000a2_;
    };;
    asm.x60000a2 = function (arg0)
    {
        (asm.x60000a2_init.apply)(this,arguments);
        return (asm.x60000a2.apply)(this,arguments);
    };;
    asm.x60000a2_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.String"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld Boolean has_value*/
                st_01 = (st_00.r)().has_value;
                /* IL_07: ldc.i4.0 */
                st_02 = (0|0);
                /* IL_09: ceq */
                st_03 = ((st_01 === st_02) ? (1) : (0));
                /* IL_0A: stloc.1 */
                loc1 = st_03;
                /* IL_0B: ldloc.1 */
                st_04 = loc1;
                /* IL_0C: brtrue.s IL_22*/
                
                if (st_04){
                    __pos_0__ = 0x22;
                    continue;
                }
                /* IL_0E: ldarg.0 */
                st_05 = arg0;
                /* IL_0F: ldflda T value*/
                st_06 = {
                    'w': function ()
                    {
                        (((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]))["value"] = (arguments)[0];
                    },
                    'r': function ()
                    {
                        return (((asm0)["System.Nullable`1"])((((arguments)[0].r)().constructor.GenericArguments)[0]))["value"];
                    }
                };
                /* IL_1A: callvirt String ToString()*/
                /* warning: ignoring prefixes constrained.*/
                st_07 = (((st_06.vtable)["asm0.x6000005"])())(st_06);
                /* IL_1F: stloc.0 */
                loc0 = st_07;
                /* IL_20: br.s IL_2A*/
                __pos_0__ = 0x2A;
                continue;
                case 0x22:
                /* IL_22: ldsfld String Empty*/
                st_08 = t0.Empty;
                /* IL_27: stloc.0 */
                loc0 = st_08;
                case 0x2A:
                /* IL_2A: ldloc.0 */
                st_09 = loc0;
                /* IL_2B: ret */
                return st_09;
            }
        }
    };
    asm.x60000a3_init = function (T)
    {
        return function ()
        {
            (((asm0)["System.Nullable`1"])(T).init)();
            asm.x60000a3 = asm.x60000a3_;
        };
    };;
    asm.x60000a3 = function (T)
    {
        return function (arg0)
        {
            ((asm.x60000a3_init)(T).apply)(this,arguments);
            return ((asm.x60000a3)(T).apply)(this,arguments);
        };
    };;
    asm.x60000a3_ = function (T)
    {
        return function op_Implicit(arg0)
        {
            var t0;
            var t1;
            var st_00;
            var st_01;
            var st_02;
            var loc0;
            t0 = T;
            t1 = ((asm0)["System.Nullable`1"])(T);
            /* IL_00: nop */
            /* IL_01: ldarg.0 */
            st_00 = arg0;
            /* IL_02: newobj Void .ctor(T)*/
            st_01 = newobj(t1,asm0.x600009a,[ null,clone_value(st_00) ]);
            /* IL_07: stloc.0 */
            loc0 = st_01;
            /* IL_0A: ldloc.0 */
            st_02 = loc0;
            /* IL_0B: ret */
            return st_02;
        };
    };
    asm.x60000a4 = function (T)
    {
        return function op_Explicit(arg0)
        {
            var st_00;
            var st_01;
            var st_02;
            var loc0;
            /* IL_00: nop */
            /* IL_01: ldarga.s 0*/
            st_00 = {
                'w': function ()
                {
                    arg0 = (arguments)[0];
                },
                'r': function ()
                {
                    return arg0;
                }
            };
            /* IL_03: call T get_Value()*/
            st_01 = (asm0.x600009c)(st_00);
            /* IL_08: stloc.0 */
            loc0 = st_01;
            /* IL_0B: ldloc.0 */
            st_02 = loc0;
            /* IL_0C: ret */
            return st_02;
        };
    };;
    asm.x60000a5 = function (T)
    {
        return function Box(arg0)
        {
            var t0;
            var st_00;
            var st_01;
            var st_02;
            var st_03;
            var st_04;
            var st_05;
            var st_06;
            var st_07;
            var __pos_0__;
            var loc1;
            var loc0;
            t0 = T;
            __pos_0__ = 0x0;
            
            while (__pos_0__ >= 0){
                
                switch (__pos_0__){
                    case 0x0:
                    /* IL_00: nop */
                    
                    /* IL_01: ldarga.s 0*/
                    st_00 = {
                        'w': function ()
                        {
                            arg0 = (arguments)[0];
                        },
                        'r': function ()
                        {
                            return arg0;
                        }
                    };
                    /* IL_03: ldfld Boolean has_value*/
                    st_01 = (st_00.r)().has_value;
                    /* IL_08: stloc.1 */
                    loc1 = st_01;
                    /* IL_09: ldloc.1 */
                    st_02 = loc1;
                    /* IL_0A: brtrue.s IL_10*/
                    
                    if (st_02){
                        __pos_0__ = 0x10;
                        continue;
                    }
                    /* IL_0C: ldnull */
                    st_03 = null;
                    /* IL_0D: stloc.0 */
                    loc0 = st_03;
                    /* IL_0E: br.s IL_1F*/
                    __pos_0__ = 0x1F;
                    continue;
                    case 0x10:
                    /* IL_10: ldarga.s 0*/
                    st_04 = {
                        'w': function ()
                        {
                            arg0 = (arguments)[0];
                        },
                        'r': function ()
                        {
                            return arg0;
                        }
                    };
                    /* IL_12: ldfld T value*/
                    st_05 = (st_04.r)().value;
                    /* IL_17: box T*/
                    st_06 = box(st_05,t0);
                    /* IL_1C: stloc.0 */
                    loc0 = st_06;
                    case 0x1F:
                    /* IL_1F: ldloc.0 */
                    st_07 = loc0;
                    /* IL_20: ret */
                    return st_07;
                }
            }
        };
    };;
    asm.x60000a6_init = function (T)
    {
        return function ()
        {
            (((asm0)["System.Nullable`1"])(T).init)();
            asm.x60000a6 = asm.x60000a6_;
        };
    };;
    asm.x60000a6 = function (T)
    {
        return function (arg0)
        {
            ((asm.x60000a6_init)(T).apply)(this,arguments);
            return ((asm.x60000a6)(T).apply)(this,arguments);
        };
    };;
    asm.x60000a6_ = function (T)
    {
        return function Unbox(arg0)
        {
            var t0;
            var t1;
            var loc2;
            var st_00;
            var st_01;
            var st_02;
            var st_03;
            var st_04;
            var st_05;
            var st_06;
            var st_07;
            var st_08;
            var st_09;
            var st_0A;
            var st_0B;
            var __pos_0__;
            var loc1;
            var loc0;
            t0 = T;
            t1 = ((asm0)["System.Nullable`1"])(T);
            loc2 = new (((asm0)["System.Nullable`1"])(T))();
            __pos_0__ = 0x0;
            
            while (__pos_0__ >= 0){
                
                switch (__pos_0__){
                    case 0x0:
                    /* IL_00: nop */
                    
                    /* IL_01: ldarg.0 */
                    st_00 = arg0;
                    /* IL_02: ldnull */
                    st_01 = null;
                    /* IL_04: ceq */
                    st_02 = ((st_00 === st_01) ? (1) : (0));
                    /* IL_05: ldc.i4.0 */
                    st_03 = (0|0);
                    /* IL_07: ceq */
                    st_04 = ((st_02 === st_03) ? (1) : (0));
                    /* IL_08: stloc.1 */
                    loc1 = st_04;
                    /* IL_09: ldloc.1 */
                    st_05 = loc1;
                    /* IL_0A: brtrue.s IL_18*/
                    
                    if (st_05){
                        __pos_0__ = 0x18;
                        continue;
                    }
                    /* IL_0C: ldloca.s 2*/
                    st_06 = {
                        'w': function ()
                        {
                            loc2 = (arguments)[0];
                        },
                        'r': function ()
                        {
                            return loc2;
                        }
                    };
                    /* IL_0F: initobj System.Nullable`1[T]*/
                    ((t1.IsValueType) ? ((st_06.w)(new t1())) : (null));
                    /* IL_14: ldloc.2 */
                    st_07 = loc2;
                    /* IL_15: stloc.0 */
                    loc0 = st_07;
                    /* IL_16: br.s IL_26*/
                    __pos_0__ = 0x26;
                    continue;
                    case 0x18:
                    /* IL_18: ldarg.0 */
                    st_08 = arg0;
                    /* IL_19: unbox.any T*/
                    st_09 = unbox_any(st_08,t0);
                    /* IL_1E: newobj Void .ctor(T)*/
                    st_0A = newobj(t1,asm0.x600009a,[ null,clone_value(st_09) ]);
                    /* IL_23: stloc.0 */
                    loc0 = st_0A;
                    case 0x26:
                    /* IL_26: ldloc.0 */
                    st_0B = loc0;
                    /* IL_27: ret */
                    return st_0B;
                }
            }
        };
    };
    asm.x600009a = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldc.i4.1 */
        st_01 = (1|0);
        /* IL_03: stfld Boolean has_value*/
        (st_00.r)().has_value = st_01;
        /* IL_08: ldarg.0 */
        st_02 = arg0;
        /* IL_09: ldarg.1 */
        st_03 = arg1;
        /* IL_0A: stfld T value*/
        (st_02.r)().value = st_03;
        /* IL_0F: ret */
        return ;
    };;
    asm.x60000a7 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x60000a8 = function(o) { return o.jsstr.length; };;
    asm.x60000a9 = function(a, b) { return a.jsstr === b.jsstr; };;
    asm.x60000aa = function (args) { return new_string(String.prototype.concat.apply('', args.jsarr)); };;
    asm.x60000ab = function (s, i) { return s.jsstr.charCodeAt(i); };;
    asm.x60000ac = function get_Chars(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Char GetChar(System.String, System.Int32)*/
        st_02 = (asm0.x60000ab)(st_00,st_01);
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x60000ae_init = function ()
    {
        (((asm0)["System.String"])().init)();
        asm.x60000ae = asm.x60000ae_;
    };;
    asm.x60000ae = function (arg0,arg1)
    {
        (asm.x60000ae_init.apply)(this,arguments);
        return (asm.x60000ae.apply)(this,arguments);
    };;
    asm.x60000ae_ = function Concat(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.String"])();
        /* IL_00: nop */
        /* IL_01: ldc.i4.2 */
        st_00 = (2|0);
        /* IL_02: newarr System.String*/
        st_01 = new_array(t0,st_00);
        /* IL_07: stloc.1 */
        loc1 = st_01;
        /* IL_08: ldloc.1 */
        st_02 = loc1;
        /* IL_09: ldc.i4.0 */
        st_03 = (0|0);
        /* IL_0A: ldarg.0 */
        st_04 = arg0;
        /* IL_0B: stelem.ref */
        (st_02.jsarr)[st_03] = st_04;
        /* IL_0C: ldloc.1 */
        st_05 = loc1;
        /* IL_0D: ldc.i4.1 */
        st_06 = (1|0);
        /* IL_0E: ldarg.1 */
        st_07 = arg1;
        /* IL_0F: stelem.ref */
        (st_05.jsarr)[st_06] = st_07;
        /* IL_10: ldloc.1 */
        st_08 = loc1;
        /* IL_11: call String ConcatImpl(System.String[])*/
        st_09 = (asm0.x60000aa)(st_08);
        /* IL_16: stloc.0 */
        loc0 = st_09;
        /* IL_19: ldloc.0 */
        st_0A = loc0;
        /* IL_1A: ret */
        return st_0A;
    };
    asm.x60000af_init = function ()
    {
        (((asm0)["System.String"])().init)();
        asm.x60000af = asm.x60000af_;
    };;
    asm.x60000af = function (arg0,arg1)
    {
        (asm.x60000af_init.apply)(this,arguments);
        return (asm.x60000af.apply)(this,arguments);
    };;
    asm.x60000af_ = function Concat(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.String"])();
        /* IL_00: nop */
        /* IL_01: ldc.i4.2 */
        st_00 = (2|0);
        /* IL_02: newarr System.String*/
        st_01 = new_array(t0,st_00);
        /* IL_07: stloc.1 */
        loc1 = st_01;
        /* IL_08: ldloc.1 */
        st_03 = loc1;
        /* IL_09: ldc.i4.0 */
        st_04 = (0|0);
        /* IL_0A: ldarg.0 */
        st_02 = arg0;
        /* IL_0B: callvirt String ToString()*/
        st_05 = (((st_02.vtable)["asm0.x6000005"])())(convert_box_to_pointer_as_needed(st_02));
        /* IL_10: stelem.ref */
        (st_03.jsarr)[st_04] = st_05;
        /* IL_11: ldloc.1 */
        st_07 = loc1;
        /* IL_12: ldc.i4.1 */
        st_08 = (1|0);
        /* IL_13: ldarg.1 */
        st_06 = arg1;
        /* IL_14: callvirt String ToString()*/
        st_09 = (((st_06.vtable)["asm0.x6000005"])())(convert_box_to_pointer_as_needed(st_06));
        /* IL_19: stelem.ref */
        (st_07.jsarr)[st_08] = st_09;
        /* IL_1A: ldloc.1 */
        st_0A = loc1;
        /* IL_1B: call String ConcatImpl(System.String[])*/
        st_0B = (asm0.x60000aa)(st_0A);
        /* IL_20: stloc.0 */
        loc0 = st_0B;
        /* IL_23: ldloc.0 */
        st_0C = loc0;
        /* IL_24: ret */
        return st_0C;
    };
    asm.x60000b0 = function Concat(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call String ConcatImpl(System.String[])*/
        st_01 = (asm0.x60000aa)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x60000b1_init = function ()
    {
        (((asm0)["System.Exception"])().init)();
        asm.x60000b1 = asm.x60000b1_;
    };;
    asm.x60000b1 = function (arg0)
    {
        (asm.x60000b1_init.apply)(this,arguments);
        return (asm.x60000b1.apply)(this,arguments);
    };;
    asm.x60000b1_ = function Concat(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        t0 = ((asm0)["System.Exception"])();
        /* IL_00: nop */
        /* IL_01: ldstr Not implemented*/
        st_00 = new_string("Not implemented");
        /* IL_06: newobj Void .ctor(System.String)*/
        st_01 = newobj(t0,asm0.x6000050,[ null,st_00 ]);
        /* IL_0B: throw */
        throw st_01;
    };
    asm.x60000b2 = function get_Length(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call Int32 GetLengthImpl(System.Object)*/
        st_01 = (asm0.x60000a8)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x60000b3 = function ToString(arg0)
    {
        var st_00;
        var st_01;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: stloc.0 */
        loc0 = st_00;
        /* IL_05: ldloc.0 */
        st_01 = loc0;
        /* IL_06: ret */
        return st_01;
    };;
    asm.x60000b4 = function op_Inequality(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Boolean EqualsImpl(System.String, System.String)*/
        st_02 = (asm0.x60000a9)(st_00,st_01);
        /* IL_08: ldc.i4.0 */
        st_03 = (0|0);
        /* IL_0A: ceq */
        st_04 = ((st_02 === st_03) ? (1) : (0));
        /* IL_0B: stloc.0 */
        loc0 = st_04;
        /* IL_0E: ldloc.0 */
        st_05 = loc0;
        /* IL_0F: ret */
        return st_05;
    };;
    asm.x60000b5 = function op_Equality(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Boolean EqualsImpl(System.String, System.String)*/
        st_02 = (asm0.x60000a9)(st_00,st_01);
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x60000b6 = function Equals(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldarg.1 */
        st_01 = arg1;
        /* IL_03: call Boolean EqualsImpl(System.String, System.String)*/
        st_02 = (asm0.x60000a9)(st_00,st_01);
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x60000b7_init = function ()
    {
        (((asm0)["System.String"])().init)();
        asm.x60000b7 = asm.x60000b7_;
    };;
    asm.x60000b7 = function (arg0,arg1)
    {
        (asm.x60000b7_init.apply)(this,arguments);
        return (asm.x60000b7.apply)(this,arguments);
    };;
    asm.x60000b7_ = function Equals(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.String"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_01 = arg0;
        /* IL_02: ldarg.1 */
        st_00 = arg1;
        /* IL_03: castclass System.String*/
        st_02 = cast_class(st_00,t0);
        /* IL_08: call Boolean Equals(System.String)*/
        st_03 = (asm0.x60000b6)(st_01,st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x60000b8 = 
            function (o) {
                var str = o.jsstr;
                var length = str.length;
                var h = 0;
                for (var i = 0; i < length; i += 1)
                    h = (h << 5) - h + str.charCodeAt(i);
                return h;
            };;
    asm.x60000b9 = function GetHashCode(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call Int32 GetHashCodeImpl(System.String)*/
        st_01 = (asm0.x60000b8)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x60000ba = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x60000bb_init = function ()
    {
        (((asm0)["System.String"])().init)();
        asm.x60000bb = asm.x60000bb_;
    };;
    asm.x60000bb = function ()
    {
        (asm.x60000bb_init.apply)(this,arguments);
        return (asm.x60000bb.apply)(this,arguments);
    };;
    asm.x60000bb_ = function _cctor()
    {
        var t0;
        var st_00;
        t0 = ((asm0)["System.String"])();
        /* IL_00: ldstr */
        st_00 = new_string("");
        /* IL_05: stsfld String Empty*/
        (t0)["Empty"] = st_00;
        /* IL_0A: ret */
        return ;
    };
    asm.x60000bd = function get_MemberName(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldfld String member_name*/
        st_01 = st_00.System_ReflectionDefaultMemberAttributemember_name;
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x60000bc = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000d)(st_00);
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: ldarg.0 */
        st_01 = arg0;
        /* IL_09: ldarg.1 */
        st_02 = arg1;
        /* IL_0A: stfld String member_name*/
        st_01.System_ReflectionDefaultMemberAttributemember_name = st_02;
        /* IL_0F: nop */
        /* IL_10: ret */
        return ;
    };;
    asm.x60000c0 = function GetTypeFromHandle(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call Type GetTypeFromHandle(System.RuntimeTypeHandle)*/
        st_01 = (asm0.x60000c6)(clone_value(st_00));
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_0A: ldloc.0 */
        st_02 = loc0;
        /* IL_0B: ret */
        return st_02;
    };;
    asm.x60000c1 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x600000c)(st_00);
        /* IL_06: ret */
        return ;
    };;
    asm.x60000c2 = function (o) { return o.type || o.constructor; };;
    asm.x60000c4_init = function ()
    {
        (((asm0)["System.Boolean"])().init)();
        (((asm0)["System.RuntimeType"])().init)();
        asm.x60000c4 = asm.x60000c4_;
    };;
    asm.x60000c4 = function (arg0)
    {
        (asm.x60000c4_init.apply)(this,arguments);
        return (asm.x60000c4.apply)(this,arguments);
    };;
    asm.x60000c4_ = function GetInstance(arg0)
    {
        var t0;
        var t1;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.Boolean"])();
        t1 = ((asm0)["System.RuntimeType"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld Type TypeInstance*/
                st_01 = st_00.TypeInstance;
                /* IL_07: call Boolean UnsafeCast[System.Boolean](System.Object)*/
                st_02 = st_01;
                /* IL_0C: stloc.1 */
                loc1 = st_02;
                /* IL_0D: ldloc.1 */
                st_03 = loc1;
                /* IL_0E: brtrue.s IL_1C*/
                
                if (st_03){
                    __pos_0__ = 0x1C;
                    continue;
                }
                /* IL_10: ldarg.0 */
                st_05 = arg0;
                /* IL_11: ldarg.0 */
                st_04 = arg0;
                /* IL_12: newobj Void .ctor(System.RuntimeType+constructor)*/
                st_06 = newobj(t1,asm0.x60000c3,[ null,st_04 ]);
                /* IL_17: stfld Type TypeInstance*/
                st_05.TypeInstance = st_06;
                case 0x1C:
                /* IL_1C: ldarg.0 */
                st_07 = arg0;
                /* IL_1D: ldfld Type TypeInstance*/
                st_08 = st_07.TypeInstance;
                /* IL_22: stloc.0 */
                loc0 = st_08;
                /* IL_25: ldloc.0 */
                st_09 = loc0;
                /* IL_26: ret */
                return st_09;
            }
        }
    };
    asm.x60000c5 = function GetType(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: call constructor GetConstructor(System.Object)*/
        st_01 = (asm0.x60000c2)(st_00);
        /* IL_07: call Type GetInstance(System.RuntimeType+constructor)*/
        st_02 = (asm0.x60000c4)(st_01);
        /* IL_0C: stloc.0 */
        loc0 = st_02;
        /* IL_0F: ldloc.0 */
        st_03 = loc0;
        /* IL_10: ret */
        return st_03;
    };;
    asm.x60000c6_init = function ()
    {
        (((asm0)["System.RuntimeType+constructor"])().init)();
        asm.x60000c6 = asm.x60000c6_;
    };;
    asm.x60000c6 = function (arg0)
    {
        (asm.x60000c6_init.apply)(this,arguments);
        return (asm.x60000c6.apply)(this,arguments);
    };;
    asm.x60000c6_ = function GetTypeFromHandle(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.RuntimeType+constructor"])();
        /* IL_00: nop */
        /* IL_01: ldarga.s 0*/
        st_00 = {
            'w': function ()
            {
                arg0 = (arguments)[0];
            },
            'r': function ()
            {
                return arg0;
            }
        };
        /* IL_03: ldfld Object value*/
        st_01 = (st_00.r)().value;
        /* IL_08: call constructor UnsafeCast[System.RuntimeType+constructor](System.Object)*/
        st_02 = st_01;
        /* IL_0D: call Type GetInstance(System.RuntimeType+constructor)*/
        st_03 = (asm0.x60000c4)(st_02);
        /* IL_12: stloc.0 */
        loc0 = st_03;
        /* IL_15: ldloc.0 */
        st_04 = loc0;
        /* IL_16: ret */
        return st_04;
    };
    asm.x60000c7 = function get_FullName(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldfld constructor ctor*/
        st_01 = st_00.SystemRuntimeTypector;
        /* IL_07: ldfld Object FullName*/
        st_02 = st_01.FullName;
        /* IL_0C: call String FromJsString(System.Object)*/
        st_03 = new_string(st_02);
        /* IL_11: stloc.0 */
        loc0 = st_03;
        /* IL_14: ldloc.0 */
        st_04 = loc0;
        /* IL_15: ret */
        return st_04;
    };;
    asm.x60000c8_init = function ()
    {
        (((asm0)["System.RuntimeType"])().init)();
        asm.x60000c8 = asm.x60000c8_;
    };;
    asm.x60000c8 = function (arg0,arg1)
    {
        (asm.x60000c8_init.apply)(this,arguments);
        return (asm.x60000c8.apply)(this,arguments);
    };;
    asm.x60000c8_ = function Equals(arg0,arg1)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var loc0;
        var loc1;
        t0 = ((asm0)["System.RuntimeType"])();
        /* IL_00: nop */
        /* IL_01: ldarg.1 */
        st_00 = arg1;
        /* IL_02: isinst System.RuntimeType*/
        st_01 = (t0.IsInst)(st_00);
        /* IL_07: stloc.0 */
        loc0 = st_01;
        /* IL_08: ldarg.0 */
        st_02 = arg0;
        /* IL_09: ldfld constructor ctor*/
        st_04 = st_02.SystemRuntimeTypector;
        /* IL_0E: ldloc.0 */
        st_03 = loc0;
        /* IL_0F: ldfld constructor ctor*/
        st_05 = st_03.SystemRuntimeTypector;
        /* IL_15: ceq */
        st_06 = ((st_04 === st_05) ? (1) : (0));
        /* IL_16: stloc.1 */
        loc1 = st_06;
        /* IL_19: ldloc.1 */
        st_07 = loc1;
        /* IL_1A: ret */
        return st_07;
    };
    asm.x60000c9_init = function ()
    {
        (((asm0)["System.Int32"])().init)();
        (((asm0)["System.Boolean"])().init)();
        asm.x60000c9 = asm.x60000c9_;
    };;
    asm.x60000c9 = function (arg0)
    {
        (asm.x60000c9_init.apply)(this,arguments);
        return (asm.x60000c9.apply)(this,arguments);
    };;
    asm.x60000c9_ = function GetHashCode(arg0)
    {
        var t0;
        var t1;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var __pos_0__;
        var loc1;
        var loc0;
        t0 = ((asm0)["System.Int32"])();
        t1 = ((asm0)["System.Boolean"])();
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldfld constructor ctor*/
                st_01 = st_00.SystemRuntimeTypector;
                /* IL_07: ldfld Int32 Hash*/
                st_02 = st_01.Hash;
                /* IL_0C: box System.Int32*/
                st_03 = {
                    'boxed': st_02,
                    'type': t0,
                    'vtable': t0.prototype.vtable
                };
                /* IL_11: call Boolean UnsafeCast[System.Boolean](System.Object)*/
                st_04 = st_03;
                /* IL_16: stloc.1 */
                loc1 = st_04;
                /* IL_17: ldloc.1 */
                st_05 = loc1;
                /* IL_18: brtrue.s IL_2B*/
                
                if (st_05){
                    __pos_0__ = 0x2B;
                    continue;
                }
                /* IL_1A: ldarg.0 */
                st_06 = arg0;
                /* IL_1B: ldfld constructor ctor*/
                st_08 = st_06.SystemRuntimeTypector;
                /* IL_20: ldarg.0 */
                st_07 = arg0;
                /* IL_21: call Int32 GetHashCode()*/
                st_09 = (asm0.x6000006)(st_07);
                /* IL_26: stfld Int32 Hash*/
                st_08.Hash = st_09;
                case 0x2B:
                /* IL_2B: ldarg.0 */
                st_0A = arg0;
                /* IL_2C: ldfld constructor ctor*/
                st_0B = st_0A.SystemRuntimeTypector;
                /* IL_31: ldfld Int32 Hash*/
                st_0C = st_0B.Hash;
                /* IL_36: stloc.0 */
                loc0 = st_0C;
                /* IL_39: ldloc.0 */
                st_0D = loc0;
                /* IL_3A: ret */
                return st_0D;
            }
        }
    };
    asm.x60000c3 = function _ctor(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        (asm0.x60000c1)(st_00);
        /* IL_06: nop */
        /* IL_07: nop */
        /* IL_08: ldarg.0 */
        st_01 = arg0;
        /* IL_09: ldarg.1 */
        st_02 = arg1;
        /* IL_0A: stfld constructor ctor*/
        st_01.SystemRuntimeTypector = st_02;
        /* IL_0F: nop */
        /* IL_10: ret */
        return ;
    };;
    asm.x60000ca = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x60000cb_init = function ()
    {
        (((asm0)["System.UInt16"])().init)();
        asm.x60000cb = asm.x60000cb_;
    };;
    asm.x60000cb = function (arg0)
    {
        (asm.x60000cb_init.apply)(this,arguments);
        return (asm.x60000cb.apply)(this,arguments);
    };;
    asm.x60000cb_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.UInt16"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.u2 */
        st_01 = (st_00.r)();
        /* IL_03: box System.UInt16*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x60000cc_init = function ()
    {
        (((asm0)["System.UInt32"])().init)();
        asm.x60000cc = asm.x60000cc_;
    };;
    asm.x60000cc = function (arg0)
    {
        (asm.x60000cc_init.apply)(this,arguments);
        return (asm.x60000cc.apply)(this,arguments);
    };;
    asm.x60000cc_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.UInt32"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.u4 */
        st_01 = (st_00.r)();
        /* IL_03: box System.UInt32*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_08: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_0D: stloc.0 */
        loc0 = st_03;
        /* IL_10: ldloc.0 */
        st_04 = loc0;
        /* IL_11: ret */
        return st_04;
    };
    asm.x60000cd = function ToString(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var __pos_0__;
        var loc0;
        var loc1;
        var loc2;
        var loc3;
        var loc5;
        var loc4;
        __pos_0__ = 0x0;
        
        while (__pos_0__ >= 0){
            
            switch (__pos_0__){
                case 0x0:
                /* IL_00: nop */
                
                /* IL_01: ldarg.0 */
                st_00 = arg0;
                /* IL_02: ldind.i8 */
                st_01 = (st_00.r)();
                /* IL_03: stloc.0 */
                loc0 = st_01;
                /* IL_04: ldc.i4.s 10*/
                st_02 = (10|0);
                /* IL_06: conv.i8 */
                st_03 = conv_i8(st_02);
                /* IL_07: stloc.1 */
                loc1 = st_03;
                /* IL_08: ldstr */
                st_04 = new_string("");
                /* IL_0D: stloc.2 */
                loc2 = st_04;
                case 0xE:
                /* IL_0E: nop */
                
                /* IL_0F: ldloc.0 */
                st_05 = loc0;
                /* IL_10: ldloc.1 */
                st_06 = loc1;
                /* IL_11: rem.un */
                st_07 = (asm0.UInt64_Modulus)(st_05,st_06);
                /* IL_12: stloc.3 */
                loc3 = st_07;
                /* IL_13: ldloc.3 */
                st_08 = loc3;
                /* IL_14: call String GetLowString(System.UInt64)*/
                st_09 = new_string(st_08[0].toString());
                /* IL_19: ldloc.2 */
                st_0A = loc2;
                /* IL_1A: call String Concat(System.String, System.String)*/
                st_0B = (asm0.x60000ae)(st_09,st_0A);
                /* IL_1F: stloc.2 */
                loc2 = st_0B;
                /* IL_20: ldloc.0 */
                st_0C = loc0;
                /* IL_21: ldloc.1 */
                st_0D = loc1;
                /* IL_22: div.un */
                st_0E = (asm0.UInt64_Division)(st_0C,st_0D);
                /* IL_23: stloc.0 */
                loc0 = st_0E;
                /* IL_24: nop */
                
                /* IL_25: ldloc.0 */
                st_10 = loc0;
                /* IL_26: ldc.i4.0 */
                st_0F = (0|0);
                /* IL_27: conv.i8 */
                st_11 = conv_i8(st_0F);
                /* IL_29: cgt.un */
                st_12 = (asm0.UInt64_GreaterThan)(st_10,st_11);
                /* IL_2A: stloc.s 5*/
                loc5 = st_12;
                /* IL_2C: ldloc.s 5*/
                st_13 = loc5;
                /* IL_2E: brtrue.s IL_0E*/
                
                if (st_13){
                    __pos_0__ = 0xE;
                    continue;
                }
                /* IL_30: ldloc.2 */
                st_14 = loc2;
                /* IL_31: stloc.s 4*/
                loc4 = st_14;
                /* IL_35: ldloc.s 4*/
                st_15 = loc4;
                /* IL_37: ret */
                return st_15;
            }
        }
    };;
    asm.x60000cf = 
            function UInt64_RightShift(a, n) {
                n = n & 0x3f;

                var maxShift = 8;
                if (n > maxShift) {
                    return asm0.UInt64_RightShift(
                        asm0.UInt64_RightShift(a, maxShift), n - maxShift);
                }

                var m = (1 << n) - 1;

                var br = (a[1] & m) << (32 - n);
                var bt = a[1] >>> n;
                var at = a[0] >>> n;

                return new Uint32Array([ at | br, bt ]);
            };;
    asm.UInt64_RightShift = asm.x60000cf;
    asm.x60000d0 = 
            function UInt64_Division(n, d) {

                if (d[0] == 0 && d[1] == 0)
                    throw new Error('System.DivideByZeroException');
      
                var q = new Uint32Array([0, 0]);
                var r = new Uint32Array([0, 0]);

                for (var i = 63; i >= 0; i--) {
                    r = asm0.XInt64_LeftShift(r, 1);

                    var li = i < 32 ? 0 : 1;
                    var s = (i - 32 * li);

                    r[0] |= (n[li] & (1 << s)) >>> s;

                    if (asm0.UInt64_GreaterThanOrEqual(r, d)) {
                        r = asm0.XInt64_Subtraction(r, d);
                        q[li] |= 1 << s;
                    }
                }

                return q;    
            };;
    asm.UInt64_Division = asm.x60000d0;
    asm.x60000d1 = 
            function XInt64_Multiplication(a, b) {
                if (a[0] == 0 && a[1] == 0)
                    return a;

                if (b[0] == 0 && b[1] == 0)
                    return b;

                if (asm0.UInt64_GreaterThan(a, b))
                    return asm0.XInt64_Multiplication(b, a);

                var s = new Uint32Array([0, 0]);

                if (a[0] & 1 == 1) {
                    s[0] = b[0];
                    s[1] = b[1];
                }

                var l = new Uint32Array([1, 0]);

                while (!asm0.XInt64_Equality(a, l)) {
                    a = asm0.UInt64_RightShift(a, 1);
                    b = asm0.XInt64_LeftShift(b, 1);

                    if (a[0] & 1 == 1)
                        s = asm0.XInt64_Addition(b, s);
                }

                return s;
            };;
    asm.XInt64_Multiplication = asm.x60000d1;
    asm.x60000d2 = 
            function UInt64_GreaterThanOrEqual (a, b) {
                var bdiff = a[1] - b[1];
                if (bdiff > 0)
                    return 1;

                if (bdiff < 0)
                    return 0;

                return a[0] >= b[0] ? 1: 0;
            };;
    asm.UInt64_GreaterThanOrEqual = asm.x60000d2;
    asm.x60000d3 = 
            function UInt64_LessThanOrEqual (a, b) {
                var bdiff = a[1] - b[1];
                if (bdiff < 0)
                    return 1;

                if (bdiff > 0)
                    return 0;

                return a[0] <= b[0] ? 1: 0;
            };;
    asm.UInt64_LessThanOrEqual = asm.x60000d3;
    asm.x60000d4 = 
            function UInt64_GreaterThan (a, b) {
                var bdiff = a[1] - b[1];
                if (bdiff > 0)
                    return 1;

                if (bdiff < 0)
                    return 0;

                return a[0] > b[0] ? 1: 0;
            };;
    asm.UInt64_GreaterThan = asm.x60000d4;
    asm.x60000d5 = 
            function UInt64_LessThan(a, b) {
                var bdiff = a[1] - b[1];
                if (bdiff < 0)
                    return 1;

                if (bdiff > 0)
                    return 0;

                return a[0] < b[0] ? 1: 0;
            };;
    asm.UInt64_LessThan = asm.x60000d5;
    asm.x60000d6 = 
            function UInt64_Modulus (n, d) {
                var greaterThanOrEqual = asm0.UInt64_GreaterThanOrEqual,
                    subtraction = asm0.XInt64_Subtraction,
                    leftShift = asm0.XInt64_LeftShift;

                if (d[0] == 0 && d[1] == 0)
                    throw new Error("System.DivideByZeroException");

                var r = new Uint32Array([0, 0]);

                for (var i = 63; i >= 0; i--) {
                    r = leftShift(r, 1);

                    var li = i < 32 ? 0 : 1;
                    var s = (i - 32 * li);

                    r[0] |= (n[li] & (1 << s)) >>> s;

                    if (greaterThanOrEqual(r, d)) {
                        r = subtraction(r, d);
                    }
                }

                return r;
            };;
    asm.UInt64_Modulus = asm.x60000d6;
    asm.x60000d7 = function Equals(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.i8 */
        st_02 = (st_00.r)();
        /* IL_03: ldarg.1 */
        st_01 = arg1;
        /* IL_04: unbox.any System.UInt64*/
        st_03 = unbox_any(st_01,((asm0)["System.UInt64"])());
        /* IL_0A: ceq */
        st_04 = ((st_02 === st_03) ? (1) : (0));
        /* IL_0B: stloc.0 */
        loc0 = st_04;
        /* IL_0E: ldloc.0 */
        st_05 = loc0;
        /* IL_0F: ret */
        return st_05;
    };;
    asm.x60000d8 = function GetHashCode(arg0)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var loc0;
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldind.i8 */
        st_01 = (st_00.r)();
        /* IL_03: call Int32 GetLow(System.UInt64)*/
        st_02 = st_01[0];
        /* IL_08: stloc.0 */
        loc0 = st_02;
        /* IL_0B: ldloc.0 */
        st_03 = loc0;
        /* IL_0C: ret */
        return st_03;
    };;
    asm.x60000da_init = function ()
    {
        (((asm0)["System.UIntPtr"])().init)();
        asm.x60000da = asm.x60000da_;
    };;
    asm.x60000da = function (arg0)
    {
        (asm.x60000da_init.apply)(this,arguments);
        return (asm.x60000da.apply)(this,arguments);
    };;
    asm.x60000da_ = function ToString(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var loc0;
        t0 = ((asm0)["System.UIntPtr"])();
        /* IL_00: nop */
        /* IL_01: ldarg.0 */
        st_00 = arg0;
        /* IL_02: ldobj System.UIntPtr*/
        st_01 = st_00;
        /* IL_07: box System.UIntPtr*/
        st_02 = {
            'boxed': st_01,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_0C: call String NumberStructToString(System.Object)*/
        st_03 = (asm0.x600003f)(st_02);
        /* IL_11: stloc.0 */
        loc0 = st_03;
        /* IL_14: ldloc.0 */
        st_04 = loc0;
        /* IL_15: ret */
        return st_04;
    };
    (asm)["System.Object"] = (function ()
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
            function $$Object()
            {
                ($$Object.init)();
                this.constructor = $$Object;
            };
            c = $$Object;
            ct = c;
            $$Object.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                $$Object.FullName = "System.Object";
                $$Object.Interfaces = [  ];
                $$Object.IsInst = function (t) { return t instanceof $$Object ? t : null; };
                $$Object.IsValueType = false;
                $$Object.IsPrimitive = false;
                $$Object.IsNullable = false;
                $$Object.ArrayType = Array;
                $$Object.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                $$Object.prototype.toString = asm0.x6000004;
            };
            $$Object.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Reflection.MemberInfo"] = (function ()
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
            function MemberInfo()
            {
                (MemberInfo.init)();
                this.constructor = MemberInfo;
            };
            c = MemberInfo;
            ct = c;
            MemberInfo.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                MemberInfo.FullName = "System.Reflection.MemberInfo";
                MemberInfo.Interfaces = [  ];
                MemberInfo.IsInst = function (t) { return t instanceof MemberInfo ? t : null; };
                MemberInfo.IsValueType = false;
                MemberInfo.IsPrimitive = false;
                MemberInfo.IsNullable = false;
                MemberInfo.ArrayType = Array;
                MemberInfo.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            MemberInfo.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.Attribute"] = (function ()
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
            function Attribute()
            {
                (Attribute.init)();
                this.constructor = Attribute;
            };
            c = Attribute;
            ct = c;
            Attribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Attribute.FullName = "System.Attribute";
                Attribute.Interfaces = [  ];
                Attribute.IsInst = function (t) { return t instanceof Attribute ? t : null; };
                Attribute.IsValueType = false;
                Attribute.IsPrimitive = false;
                Attribute.IsNullable = false;
                Attribute.ArrayType = Array;
                Attribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Attribute.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.AttributeUsageAttribute"] = (function ()
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
            function AttributeUsageAttribute()
            {
                (AttributeUsageAttribute.init)();
                this.constructor = AttributeUsageAttribute;
            };
            c = AttributeUsageAttribute;
            ct = c;
            AttributeUsageAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                AttributeUsageAttribute.FullName = "System.AttributeUsageAttribute";
                AttributeUsageAttribute.Interfaces = [  ];
                AttributeUsageAttribute.IsInst = function (t) { return t instanceof AttributeUsageAttribute ? t : null; };
                AttributeUsageAttribute.IsValueType = false;
                AttributeUsageAttribute.IsPrimitive = false;
                AttributeUsageAttribute.IsNullable = false;
                AttributeUsageAttribute.ArrayType = Array;
                (AttributeUsageAttribute.prototype)["SystemAttributeUsageAttribute<ValidOn>k__BackingField"] = new (((asm0)["System.AttributeTargets"])())();
                (AttributeUsageAttribute.prototype)["SystemAttributeUsageAttribute<Inherited>k__BackingField"] = false;
                AttributeUsageAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            AttributeUsageAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.ValueType"] = (function ()
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
            function ValueType()
            {
                (ValueType.init)();
                this.constructor = ValueType;
            };
            c = ValueType;
            ct = c;
            ValueType.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                ValueType.FullName = "System.ValueType";
                ValueType.Interfaces = [  ];
                ValueType.IsInst = function (t) { return t instanceof ValueType ? t : null; };
                ValueType.IsValueType = false;
                ValueType.IsPrimitive = false;
                ValueType.IsNullable = false;
                ValueType.ArrayType = Array;
                ValueType.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            ValueType.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.Boolean"] = (function ()
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
            function $$Boolean()
            {
                ($$Boolean.init)();
                this.constructor = $$Boolean;
            };
            c = $$Boolean;
            ct = c;
            $$Boolean.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                $$Boolean.FullName = "System.Boolean";
                $$Boolean.Interfaces = [  ];
                $$Boolean.IsInst = function (t) { return typeof t == 'number'; };
                $$Boolean.IsValueType = true;
                $$Boolean.IsPrimitive = true;
                $$Boolean.IsNullable = false;
                $$Boolean.ArrayType = Array;
                $$Boolean.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000014;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            $$Boolean.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Byte"] = (function ()
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
            function Byte()
            {
                (Byte.init)();
                this.constructor = Byte;
            };
            c = Byte;
            ct = c;
            Byte.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Byte.FullName = "System.Byte";
                Byte.Interfaces = [  ];
                Byte.IsInst = function (t) { return typeof t == 'number'; };
                Byte.IsValueType = true;
                Byte.IsPrimitive = true;
                Byte.IsNullable = false;
                Byte.ArrayType = Uint8Array;
                Byte.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000022;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Byte.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Char"] = (function ()
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
            function Char()
            {
                (Char.init)();
                this.constructor = Char;
            };
            c = Char;
            ct = c;
            Char.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Char.MinValue = 0;
                Char.MaxValue = 0;
                Char.FullName = "System.Char";
                Char.Interfaces = [  ];
                Char.IsInst = function (t) { return typeof t == 'number'; };
                Char.IsValueType = true;
                Char.IsPrimitive = true;
                Char.IsNullable = false;
                Char.ArrayType = Uint16Array;
                Char.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000023;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Char.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Console"] = (function ()
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
            function Console()
            {
                (Console.init)();
                this.constructor = Console;
            };
            c = Console;
            ct = c;
            Console.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Console.FullName = "System.Console";
                Console.Interfaces = [  ];
                Console.IsInst = function (t) { return t instanceof Console ? t : null; };
                Console.IsValueType = false;
                Console.IsPrimitive = false;
                Console.IsNullable = false;
                Console.ArrayType = Array;
                Console.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Console.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.Double"] = (function ()
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
            function Double()
            {
                (Double.init)();
                this.constructor = Double;
            };
            c = Double;
            ct = c;
            Double.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Double.Epsilon = 0;
                Double.MaxValue = 0;
                Double.MinValue = 0;
                Double.NaN = 0;
                Double.NegativeInfinity = 0;
                Double.PositiveInfinity = 0;
                Double.FullName = "System.Double";
                Double.Interfaces = [  ];
                Double.IsInst = function (t) { return typeof t == 'number'; };
                Double.IsValueType = true;
                Double.IsPrimitive = true;
                Double.IsNullable = false;
                Double.ArrayType = Float64Array;
                Double.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000028;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Double.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Enum"] = (function ()
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
            function Enum()
            {
                (Enum.init)();
                this.constructor = Enum;
            };
            c = Enum;
            ct = c;
            Enum.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Enum.FullName = "System.Enum";
                Enum.Interfaces = [  ];
                Enum.IsInst = function (t) { return t instanceof Enum ? t : null; };
                Enum.IsValueType = false;
                Enum.IsPrimitive = false;
                Enum.IsNullable = false;
                Enum.ArrayType = Array;
                Enum.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Enum.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Environment"] = (function ()
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
            function Environment()
            {
                (Environment.init)();
                this.constructor = Environment;
            };
            c = Environment;
            ct = c;
            Environment.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Environment.FullName = "System.Environment";
                Environment.Interfaces = [  ];
                Environment.IsInst = function (t) { return t instanceof Environment ? t : null; };
                Environment.IsValueType = false;
                Environment.IsPrimitive = false;
                Environment.IsNullable = false;
                Environment.ArrayType = Array;
                Environment.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Environment.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.FlagsAttribute"] = (function ()
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
            function FlagsAttribute()
            {
                (FlagsAttribute.init)();
                this.constructor = FlagsAttribute;
            };
            c = FlagsAttribute;
            ct = c;
            FlagsAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                FlagsAttribute.FullName = "System.FlagsAttribute";
                FlagsAttribute.Interfaces = [  ];
                FlagsAttribute.IsInst = function (t) { return t instanceof FlagsAttribute ? t : null; };
                FlagsAttribute.IsValueType = false;
                FlagsAttribute.IsPrimitive = false;
                FlagsAttribute.IsNullable = false;
                FlagsAttribute.ArrayType = Array;
                FlagsAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            FlagsAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.Delegate"] = (function ()
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
            function Delegate()
            {
                (Delegate.init)();
                this.constructor = Delegate;
            };
            c = Delegate;
            ct = c;
            Delegate.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Delegate.FullName = "System.Delegate";
                Delegate.Interfaces = [  ];
                Delegate.IsInst = function (t) { return t instanceof Delegate ? t : null; };
                Delegate.IsValueType = false;
                Delegate.IsPrimitive = false;
                Delegate.IsNullable = false;
                Delegate.ArrayType = Array;
                Delegate.prototype._methodPtr = null;
                Delegate.prototype._target = null;
                Delegate.prototype.vtable = {
                    'asm0.x600002e': function ()
                    {
                        return asm0.x600002e;
                    },
                    'asm0.x600002f': function ()
                    {
                        return asm0.x600002f;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000030;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000033;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    }
                };
            };
            Delegate.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.MulticastDelegate"] = (function ()
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
            function MulticastDelegate()
            {
                (MulticastDelegate.init)();
                this.constructor = MulticastDelegate;
            };
            c = MulticastDelegate;
            ct = c;
            MulticastDelegate.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                MulticastDelegate.FullName = "System.MulticastDelegate";
                MulticastDelegate.Interfaces = [  ];
                MulticastDelegate.IsInst = function (t) { return t instanceof MulticastDelegate ? t : null; };
                MulticastDelegate.IsValueType = false;
                MulticastDelegate.IsPrimitive = false;
                MulticastDelegate.IsNullable = false;
                MulticastDelegate.ArrayType = Array;
                MulticastDelegate.prototype._invocationList = null;
                MulticastDelegate.prototype._methodPtr = null;
                MulticastDelegate.prototype._target = null;
                MulticastDelegate.prototype.vtable = {
                    'asm0.x600002f': function ()
                    {
                        return asm0.x6000036;
                    },
                    'asm0.x600002e': function ()
                    {
                        return asm0.x6000037;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000030;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000033;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    }
                };
            };
            MulticastDelegate.prototype = new (((asm0)["System.Delegate"])())();
            return c;
        };
    })();
    (asm)["System.Func`2"] = (function ()
    {
        var ct;
        ct = {
            
        };
        return function (T,TResult)
        {
            var c;
            var initialized;
            c = tree_get([ T,TResult ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function Func_2()
            {
                (Func_2.init)();
                this.constructor = Func_2;
            };
            c = Func_2;
            tree_set([ T,TResult ],ct,c);
            Func_2.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Func_2.FullName = "System.Func`2";
                Func_2.Interfaces = [  ];
                Func_2.IsInst = function (t) { return t instanceof Func_2 ? t : null; };
                Func_2.IsValueType = false;
                Func_2.IsPrimitive = false;
                Func_2.IsNullable = false;
                Func_2.ArrayType = Array;
                Func_2.GenericArguments = [ T,TResult ];
                Func_2.prototype._invocationList = null;
                Func_2.prototype._methodPtr = null;
                Func_2.prototype._target = null;
                Func_2.prototype.vtable = {
                    'asm0.x600003a': function ()
                    {
                        return asm0.x600003a;
                    },
                    'asm0.x600002f': function ()
                    {
                        return asm0.x6000036;
                    },
                    'asm0.x600002e': function ()
                    {
                        return asm0.x6000037;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000030;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000033;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    }
                };
            };
            Func_2.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.ICloneable"] = (function ()
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
            function ICloneable()
            {
                (ICloneable.init)();
                this.constructor = ICloneable;
            };
            c = ICloneable;
            ct = c;
            ICloneable.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                ICloneable.FullName = "System.ICloneable";
                ICloneable.Interfaces = [  ];
                ICloneable.IsInst = function (t) { return t.constructor.Interfaces.indexOf(ICloneable) != -1 ? t : null; };
                ICloneable.IsValueType = false;
                ICloneable.IsPrimitive = false;
                ICloneable.IsNullable = false;
                ICloneable.ArrayType = Array;
                ICloneable.prototype.vtable = {
                    'asm0.x600003b': function ()
                    {
                        return asm0.x600003b;
                    }
                };
            };
            ICloneable.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.IDisposable"] = (function ()
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
            function IDisposable()
            {
                (IDisposable.init)();
                this.constructor = IDisposable;
            };
            c = IDisposable;
            ct = c;
            IDisposable.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IDisposable.FullName = "System.IDisposable";
                IDisposable.Interfaces = [  ];
                IDisposable.IsInst = function (t) { return t.constructor.Interfaces.indexOf(IDisposable) != -1 ? t : null; };
                IDisposable.IsValueType = false;
                IDisposable.IsPrimitive = false;
                IDisposable.IsNullable = false;
                IDisposable.ArrayType = Array;
                IDisposable.prototype.vtable = {
                    'asm0.x600003c': function ()
                    {
                        return asm0.x600003c;
                    }
                };
            };
            IDisposable.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Int16"] = (function ()
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
            function Int16()
            {
                (Int16.init)();
                this.constructor = Int16;
            };
            c = Int16;
            ct = c;
            Int16.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Int16.FullName = "System.Int16";
                Int16.Interfaces = [  ];
                Int16.IsInst = function (t) { return typeof t == 'number'; };
                Int16.IsValueType = true;
                Int16.IsPrimitive = true;
                Int16.IsNullable = false;
                Int16.ArrayType = Int16Array;
                Int16.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x600003d;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Int16.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Int32"] = (function ()
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
            function Int32()
            {
                (Int32.init)();
                this.constructor = Int32;
            };
            c = Int32;
            ct = c;
            Int32.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Int32.FullName = "System.Int32";
                Int32.Interfaces = [  ];
                Int32.IsInst = function (t) { return typeof t == 'number'; };
                Int32.IsValueType = true;
                Int32.IsPrimitive = true;
                Int32.IsNullable = false;
                Int32.ArrayType = Int32Array;
                Int32.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x600003e;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Int32.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.InternalFormatting"] = (function ()
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
            function InternalFormatting()
            {
                (InternalFormatting.init)();
                this.constructor = InternalFormatting;
            };
            c = InternalFormatting;
            ct = c;
            InternalFormatting.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                InternalFormatting.FullName = "System.InternalFormatting";
                InternalFormatting.Interfaces = [  ];
                InternalFormatting.IsInst = function (t) { return t instanceof InternalFormatting ? t : null; };
                InternalFormatting.IsValueType = false;
                InternalFormatting.IsPrimitive = false;
                InternalFormatting.IsNullable = false;
                InternalFormatting.ArrayType = Array;
                InternalFormatting.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            InternalFormatting.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.IntPtr"] = (function ()
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
            function IntPtr()
            {
                (IntPtr.init)();
                this.constructor = IntPtr;
            };
            c = IntPtr;
            ct = c;
            IntPtr.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IntPtr.FullName = "System.IntPtr";
                IntPtr.Interfaces = [  ];
                IntPtr.IsInst = function (t) { return typeof t == 'number'; };
                IntPtr.IsValueType = true;
                IntPtr.IsPrimitive = true;
                IntPtr.IsNullable = false;
                IntPtr.ArrayType = Array;
                IntPtr.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000040;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            IntPtr.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.ParamArrayAttribute"] = (function ()
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
            function ParamArrayAttribute()
            {
                (ParamArrayAttribute.init)();
                this.constructor = ParamArrayAttribute;
            };
            c = ParamArrayAttribute;
            ct = c;
            ParamArrayAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                ParamArrayAttribute.FullName = "System.ParamArrayAttribute";
                ParamArrayAttribute.Interfaces = [  ];
                ParamArrayAttribute.IsInst = function (t) { return t instanceof ParamArrayAttribute ? t : null; };
                ParamArrayAttribute.IsValueType = false;
                ParamArrayAttribute.IsPrimitive = false;
                ParamArrayAttribute.IsNullable = false;
                ParamArrayAttribute.ArrayType = Array;
                ParamArrayAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            ParamArrayAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.RuntimeFieldHandle"] = (function ()
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
            function RuntimeFieldHandle()
            {
                (RuntimeFieldHandle.init)();
                this.constructor = RuntimeFieldHandle;
            };
            c = RuntimeFieldHandle;
            ct = c;
            RuntimeFieldHandle.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                RuntimeFieldHandle.FullName = "System.RuntimeFieldHandle";
                RuntimeFieldHandle.Interfaces = [  ];
                RuntimeFieldHandle.IsInst = function (t) { return t instanceof RuntimeFieldHandle ? t : null; };
                RuntimeFieldHandle.IsValueType = true;
                RuntimeFieldHandle.IsPrimitive = false;
                RuntimeFieldHandle.IsNullable = false;
                RuntimeFieldHandle.ArrayType = Array;
                RuntimeFieldHandle.prototype.value = null;
                RuntimeFieldHandle.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            RuntimeFieldHandle.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.RuntimeTypeHandle"] = (function ()
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
            function RuntimeTypeHandle()
            {
                (RuntimeTypeHandle.init)();
                this.constructor = RuntimeTypeHandle;
            };
            c = RuntimeTypeHandle;
            ct = c;
            RuntimeTypeHandle.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                RuntimeTypeHandle.FullName = "System.RuntimeTypeHandle";
                RuntimeTypeHandle.Interfaces = [  ];
                RuntimeTypeHandle.IsInst = function (t) { return t instanceof RuntimeTypeHandle ? t : null; };
                RuntimeTypeHandle.IsValueType = true;
                RuntimeTypeHandle.IsPrimitive = false;
                RuntimeTypeHandle.IsNullable = false;
                RuntimeTypeHandle.ArrayType = Array;
                RuntimeTypeHandle.prototype.value = null;
                RuntimeTypeHandle.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            RuntimeTypeHandle.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.SByte"] = (function ()
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
            function SByte()
            {
                (SByte.init)();
                this.constructor = SByte;
            };
            c = SByte;
            ct = c;
            SByte.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                SByte.FullName = "System.SByte";
                SByte.Interfaces = [  ];
                SByte.IsInst = function (t) { return typeof t == 'number'; };
                SByte.IsValueType = true;
                SByte.IsPrimitive = true;
                SByte.IsNullable = false;
                SByte.ArrayType = Int8Array;
                SByte.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000044;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            SByte.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Single"] = (function ()
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
            function Single()
            {
                (Single.init)();
                this.constructor = Single;
            };
            c = Single;
            ct = c;
            Single.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Single.FullName = "System.Single";
                Single.Interfaces = [  ];
                Single.IsInst = function (t) { return typeof t == 'number'; };
                Single.IsValueType = true;
                Single.IsPrimitive = true;
                Single.IsNullable = false;
                Single.ArrayType = Float32Array;
                Single.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000045;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Single.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Runtime.InteropServices.OutAttribute"] = (function ()
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
            function OutAttribute()
            {
                (OutAttribute.init)();
                this.constructor = OutAttribute;
            };
            c = OutAttribute;
            ct = c;
            OutAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                OutAttribute.FullName = "System.Runtime.InteropServices.OutAttribute";
                OutAttribute.Interfaces = [  ];
                OutAttribute.IsInst = function (t) { return t instanceof OutAttribute ? t : null; };
                OutAttribute.IsValueType = false;
                OutAttribute.IsPrimitive = false;
                OutAttribute.IsNullable = false;
                OutAttribute.ArrayType = Array;
                OutAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            OutAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.Collections.IEnumerator"] = (function ()
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
            function IEnumerator()
            {
                (IEnumerator.init)();
                this.constructor = IEnumerator;
            };
            c = IEnumerator;
            ct = c;
            IEnumerator.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IEnumerator.FullName = "System.Collections.IEnumerator";
                IEnumerator.Interfaces = [ ((asm0)["System.IDisposable"])() ];
                IEnumerator.IsInst = function (t) { return t.constructor.Interfaces.indexOf(IEnumerator) != -1 ? t : null; };
                IEnumerator.IsValueType = false;
                IEnumerator.IsPrimitive = false;
                IEnumerator.IsNullable = false;
                IEnumerator.ArrayType = Array;
                IEnumerator.prototype.vtable = {
                    'asm0.x6000047': function ()
                    {
                        return asm0.x6000047;
                    },
                    'asm0.x6000048': function ()
                    {
                        return asm0.x6000048;
                    },
                    'asm0.x6000049': function ()
                    {
                        return asm0.x6000049;
                    }
                };
            };
            IEnumerator.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Collections.Generic.IEnumerator`1"] = (function ()
    {
        var ct;
        ct = {
            
        };
        return function (T)
        {
            var c;
            var initialized;
            c = tree_get([ T ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function IEnumerator_1()
            {
                (IEnumerator_1.init)();
                this.constructor = IEnumerator_1;
            };
            c = IEnumerator_1;
            tree_set([ T ],ct,c);
            IEnumerator_1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IEnumerator_1.FullName = "System.Collections.Generic.IEnumerator`1";
                IEnumerator_1.Interfaces = [ ((asm0)["System.Collections.IEnumerator"])(),((asm0)["System.IDisposable"])() ];
                IEnumerator_1.IsInst = function (t) { return t.constructor.Interfaces.indexOf(IEnumerator_1) != -1 ? t : null; };
                IEnumerator_1.IsValueType = false;
                IEnumerator_1.IsPrimitive = false;
                IEnumerator_1.IsNullable = false;
                IEnumerator_1.ArrayType = Array;
                IEnumerator_1.GenericArguments = [ T ];
                IEnumerator_1.prototype.vtable = {
                    'asm0.x600004a': function ()
                    {
                        return asm0.x600004a;
                    }
                };
            };
            IEnumerator_1.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Collections.IEnumerable"] = (function ()
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
            function IEnumerable()
            {
                (IEnumerable.init)();
                this.constructor = IEnumerable;
            };
            c = IEnumerable;
            ct = c;
            IEnumerable.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IEnumerable.FullName = "System.Collections.IEnumerable";
                IEnumerable.Interfaces = [  ];
                IEnumerable.IsInst = function (t) { return t.constructor.Interfaces.indexOf(IEnumerable) != -1 ? t : null; };
                IEnumerable.IsValueType = false;
                IEnumerable.IsPrimitive = false;
                IEnumerable.IsNullable = false;
                IEnumerable.ArrayType = Array;
                IEnumerable.prototype.vtable = {
                    'asm0.x600004b': function ()
                    {
                        return asm0.x600004b;
                    }
                };
            };
            IEnumerable.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Collections.Generic.IEnumerable`1"] = (function ()
    {
        var ct;
        ct = {
            
        };
        return function (T)
        {
            var c;
            var initialized;
            c = tree_get([ T ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function IEnumerable_1()
            {
                (IEnumerable_1.init)();
                this.constructor = IEnumerable_1;
            };
            c = IEnumerable_1;
            tree_set([ T ],ct,c);
            IEnumerable_1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IEnumerable_1.FullName = "System.Collections.Generic.IEnumerable`1";
                IEnumerable_1.Interfaces = [ ((asm0)["System.Collections.IEnumerable"])() ];
                IEnumerable_1.IsInst = function (t) { return t.constructor.Interfaces.indexOf(IEnumerable_1) != -1 ? t : null; };
                IEnumerable_1.IsValueType = false;
                IEnumerable_1.IsPrimitive = false;
                IEnumerable_1.IsNullable = false;
                IEnumerable_1.ArrayType = Array;
                IEnumerable_1.GenericArguments = [ T ];
                IEnumerable_1.prototype.vtable = {
                    'asm0.x600004c': function ()
                    {
                        return asm0.x600004c;
                    }
                };
            };
            IEnumerable_1.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Diagnostics.Debugger"] = (function ()
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
            function Debugger()
            {
                (Debugger.init)();
                this.constructor = Debugger;
            };
            c = Debugger;
            ct = c;
            Debugger.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Debugger.FullName = "System.Diagnostics.Debugger";
                Debugger.Interfaces = [  ];
                Debugger.IsInst = function (t) { return t instanceof Debugger ? t : null; };
                Debugger.IsValueType = false;
                Debugger.IsPrimitive = false;
                Debugger.IsNullable = false;
                Debugger.ArrayType = Array;
                Debugger.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Debugger.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.Exception"] = (function ()
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
            function Exception()
            {
                (Exception.init)();
                this.constructor = Exception;
            };
            c = Exception;
            ct = c;
            Exception.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Exception.FullName = "System.Exception";
                Exception.Interfaces = [  ];
                Exception.IsInst = function (t) { return t instanceof Exception ? t : null; };
                Exception.IsValueType = false;
                Exception.IsPrimitive = false;
                Exception.IsNullable = false;
                Exception.ArrayType = Array;
                (Exception.prototype)["SystemException<Message>k__BackingField"] = null;
                Exception.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000053;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Exception.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.NotImplementedException"] = (function ()
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
            function NotImplementedException()
            {
                (NotImplementedException.init)();
                this.constructor = NotImplementedException;
            };
            c = NotImplementedException;
            ct = c;
            NotImplementedException.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                NotImplementedException.FullName = "System.NotImplementedException";
                NotImplementedException.Interfaces = [  ];
                NotImplementedException.IsInst = function (t) { return t instanceof NotImplementedException ? t : null; };
                NotImplementedException.IsValueType = false;
                NotImplementedException.IsPrimitive = false;
                NotImplementedException.IsNullable = false;
                NotImplementedException.ArrayType = Array;
                NotImplementedException.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000053;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            NotImplementedException.prototype = new (((asm0)["System.Exception"])())();
            return c;
        };
    })();
    (asm)["System.NotSupportedException"] = (function ()
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
            function NotSupportedException()
            {
                (NotSupportedException.init)();
                this.constructor = NotSupportedException;
            };
            c = NotSupportedException;
            ct = c;
            NotSupportedException.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                NotSupportedException.FullName = "System.NotSupportedException";
                NotSupportedException.Interfaces = [  ];
                NotSupportedException.IsInst = function (t) { return t instanceof NotSupportedException ? t : null; };
                NotSupportedException.IsValueType = false;
                NotSupportedException.IsPrimitive = false;
                NotSupportedException.IsNullable = false;
                NotSupportedException.ArrayType = Array;
                NotSupportedException.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000053;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            NotSupportedException.prototype = new (((asm0)["System.Exception"])())();
            return c;
        };
    })();
    (asm)["System.Math"] = (function ()
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
            function Math()
            {
                (Math.init)();
                this.constructor = Math;
            };
            c = Math;
            ct = c;
            Math.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Math.PI = 0;
                Math.FullName = "System.Math";
                Math.Interfaces = [  ];
                Math.IsInst = function (t) { return t instanceof Math ? t : null; };
                Math.IsValueType = false;
                Math.IsPrimitive = false;
                Math.IsNullable = false;
                Math.ArrayType = Array;
                Math.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Math.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.InvalidCastException"] = (function ()
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
            function InvalidCastException()
            {
                (InvalidCastException.init)();
                this.constructor = InvalidCastException;
            };
            c = InvalidCastException;
            ct = c;
            InvalidCastException.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                InvalidCastException.FullName = "System.InvalidCastException";
                InvalidCastException.Interfaces = [  ];
                InvalidCastException.IsInst = function (t) { return t instanceof InvalidCastException ? t : null; };
                InvalidCastException.IsValueType = false;
                InvalidCastException.IsPrimitive = false;
                InvalidCastException.IsNullable = false;
                InvalidCastException.ArrayType = Array;
                InvalidCastException.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000053;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            InvalidCastException.prototype = new (((asm0)["System.Exception"])())();
            return c;
        };
    })();
    (asm)["System.InvalidOperationException"] = (function ()
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
            function InvalidOperationException()
            {
                (InvalidOperationException.init)();
                this.constructor = InvalidOperationException;
            };
            c = InvalidOperationException;
            ct = c;
            InvalidOperationException.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                InvalidOperationException.FullName = "System.InvalidOperationException";
                InvalidOperationException.Interfaces = [  ];
                InvalidOperationException.IsInst = function (t) { return t instanceof InvalidOperationException ? t : null; };
                InvalidOperationException.IsValueType = false;
                InvalidOperationException.IsPrimitive = false;
                InvalidOperationException.IsNullable = false;
                InvalidOperationException.ArrayType = Array;
                InvalidOperationException.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000053;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            InvalidOperationException.prototype = new (((asm0)["System.Exception"])())();
            return c;
        };
    })();
    (asm)["System.Int64"] = (function ()
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
            function Int64()
            {
                (Int64.init)();
                this.constructor = Int64;
            };
            c = Int64;
            ct = c;
            Int64.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Int64.MaxValue = 0;
                Int64.MinValue = 0;
                Int64.FullName = "System.Int64";
                Int64.Interfaces = [  ];
                Int64.IsInst = function (t) { return typeof t == 'number'; };
                Int64.IsValueType = true;
                Int64.IsPrimitive = true;
                Int64.IsNullable = false;
                Int64.ArrayType = Array;
                Int64.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x600005e;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x600005f;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000060;
                    }
                };
            };
            Int64.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["Braille.JavaScript.Number"] = (function ()
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
            function $$Number()
            {
                ($$Number.init)();
                this.constructor = $$Number;
            };
            c = $$Number;
            ct = c;
            $$Number.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                $$Number.FullName = "Braille.JavaScript.Number";
                $$Number.Interfaces = [  ];
                $$Number.IsInst = function (t) { return t instanceof $$Number ? t : null; };
                $$Number.IsValueType = true;
                $$Number.IsPrimitive = false;
                $$Number.IsNullable = false;
                $$Number.ArrayType = Array;
                $$Number.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            $$Number.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Runtime.CompilerServices.ExtensionAttribute"] = (function ()
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
            function ExtensionAttribute()
            {
                (ExtensionAttribute.init)();
                this.constructor = ExtensionAttribute;
            };
            c = ExtensionAttribute;
            ct = c;
            ExtensionAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                ExtensionAttribute.FullName = "System.Runtime.CompilerServices.ExtensionAttribute";
                ExtensionAttribute.Interfaces = [  ];
                ExtensionAttribute.IsInst = function (t) { return t instanceof ExtensionAttribute ? t : null; };
                ExtensionAttribute.IsValueType = false;
                ExtensionAttribute.IsPrimitive = false;
                ExtensionAttribute.IsNullable = false;
                ExtensionAttribute.ArrayType = Array;
                ExtensionAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            ExtensionAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.Runtime.CompilerServices.IndexerNameAttribute"] = (function ()
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
            function IndexerNameAttribute()
            {
                (IndexerNameAttribute.init)();
                this.constructor = IndexerNameAttribute;
            };
            c = IndexerNameAttribute;
            ct = c;
            IndexerNameAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                IndexerNameAttribute.FullName = "System.Runtime.CompilerServices.IndexerNameAttribute";
                IndexerNameAttribute.Interfaces = [  ];
                IndexerNameAttribute.IsInst = function (t) { return t instanceof IndexerNameAttribute ? t : null; };
                IndexerNameAttribute.IsValueType = false;
                IndexerNameAttribute.IsPrimitive = false;
                IndexerNameAttribute.IsNullable = false;
                IndexerNameAttribute.ArrayType = Array;
                IndexerNameAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            IndexerNameAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.Runtime.CompilerServices.RuntimeHelpers"] = (function ()
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
            function RuntimeHelpers()
            {
                (RuntimeHelpers.init)();
                this.constructor = RuntimeHelpers;
            };
            c = RuntimeHelpers;
            ct = c;
            RuntimeHelpers.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                RuntimeHelpers.FullName = "System.Runtime.CompilerServices.RuntimeHelpers";
                RuntimeHelpers.Interfaces = [  ];
                RuntimeHelpers.IsInst = function (t) { return t instanceof RuntimeHelpers ? t : null; };
                RuntimeHelpers.IsValueType = false;
                RuntimeHelpers.IsPrimitive = false;
                RuntimeHelpers.IsNullable = false;
                RuntimeHelpers.ArrayType = Array;
                RuntimeHelpers.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            RuntimeHelpers.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.EventArgs"] = (function ()
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
            function EventArgs()
            {
                (EventArgs.init)();
                this.constructor = EventArgs;
            };
            c = EventArgs;
            ct = c;
            EventArgs.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                EventArgs.Empty = null;
                EventArgs.FullName = "System.EventArgs";
                EventArgs.Interfaces = [  ];
                EventArgs.IsInst = function (t) { return t instanceof EventArgs ? t : null; };
                EventArgs.IsValueType = false;
                EventArgs.IsPrimitive = false;
                EventArgs.IsNullable = false;
                EventArgs.ArrayType = Array;
                (asm0.x6000084)();
                EventArgs.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            EventArgs.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.EventHandler"] = (function ()
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
            function EventHandler()
            {
                (EventHandler.init)();
                this.constructor = EventHandler;
            };
            c = EventHandler;
            ct = c;
            EventHandler.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                EventHandler.FullName = "System.EventHandler";
                EventHandler.Interfaces = [  ];
                EventHandler.IsInst = function (t) { return t instanceof EventHandler ? t : null; };
                EventHandler.IsValueType = false;
                EventHandler.IsPrimitive = false;
                EventHandler.IsNullable = false;
                EventHandler.ArrayType = Array;
                EventHandler.prototype._invocationList = null;
                EventHandler.prototype._methodPtr = null;
                EventHandler.prototype._target = null;
                EventHandler.prototype.vtable = {
                    'asm0.x6000086': function ()
                    {
                        return asm0.x6000086;
                    },
                    'asm0.x600002f': function ()
                    {
                        return asm0.x6000036;
                    },
                    'asm0.x600002e': function ()
                    {
                        return asm0.x6000037;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000030;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000033;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    }
                };
            };
            EventHandler.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Array"] = (function ()
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
            function Array()
            {
                (Array.init)();
                this.constructor = Array;
            };
            c = Array;
            ct = c;
            Array.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Array.FullName = "System.Array";
                Array.Interfaces = [ ((asm0)["System.Collections.IEnumerable"])() ];
                Array.IsInst = function (t) { return t instanceof Array ? t : null; };
                Array.IsValueType = false;
                Array.IsPrimitive = false;
                Array.IsNullable = false;
                Array.ArrayType = Array;
                Array.prototype.type = null;
                Array.prototype.jsarr = null;
                Array.prototype.vtable = {
                    'asm0.x600008b': function ()
                    {
                        return asm0.x600008b;
                    },
                    'asm0.x600008c': function ()
                    {
                        return asm0.x600008c;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                (Array.prototype)[((asm0)["System.Collections.IEnumerable"])()] = {
                    'x600004b': function ()
                    {
                        return asm0.x600008b;
                    }
                };
            };
            Array.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.Array`1"] = (function ()
    {
        var ct;
        ct = {
            
        };
        return function (T)
        {
            var c;
            var initialized;
            c = tree_get([ T ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function Array_1()
            {
                (Array_1.init)();
                this.constructor = Array_1;
            };
            c = Array_1;
            tree_set([ T ],ct,c);
            Array_1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Array_1.FullName = "System.Array`1";
                Array_1.Interfaces = [ ((asm0)["System.Collections.Generic.IEnumerable`1"])(T),((asm0)["System.Collections.IEnumerable"])() ];
                Array_1.IsInst = function (t) { return t instanceof asm0['System.Array']() && t.type.prototype instanceof T ? t : null; };
                Array_1.IsValueType = false;
                Array_1.IsPrimitive = false;
                Array_1.IsNullable = false;
                Array_1.ArrayType = Array;
                Array_1.GenericArguments = [ T ];
                Array_1.prototype.type = null;
                Array_1.prototype.jsarr = null;
                Array_1.prototype.vtable = {
                    'asm0.x600008f': function ()
                    {
                        return asm0.x600008f;
                    },
                    'asm0.x600008c': function ()
                    {
                        return asm0.x6000090;
                    },
                    'asm0.x600008b': function ()
                    {
                        return asm0.x600008b;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                (Array_1.prototype)[((asm0)["System.Collections.Generic.IEnumerable`1"])(T)] = {
                    'x600004c': function ()
                    {
                        return asm0.x600008f;
                    }
                };
                (Array_1.prototype)[((asm0)["System.Collections.IEnumerable"])()] = {
                    'x600004b': function ()
                    {
                        return asm0.x600008b;
                    }
                };
            };
            Array_1.prototype = new (((asm0)["System.Array"])())();
            return c;
        };
    })();
    (asm)["System.Array`1+ArrayEnumerator"] = (function ()
    {
        var ct;
        ct = {
            
        };
        return function (T)
        {
            var c;
            var initialized;
            c = tree_get([ T ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function ArrayEnumerator()
            {
                (ArrayEnumerator.init)();
                this.constructor = ArrayEnumerator;
            };
            c = ArrayEnumerator;
            tree_set([ T ],ct,c);
            ArrayEnumerator.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                ArrayEnumerator.FullName = "System.Array`1+ArrayEnumerator";
                ArrayEnumerator.Interfaces = [ ((asm0)["System.Collections.Generic.IEnumerator`1"])(T),((asm0)["System.Collections.IEnumerator"])(),((asm0)["System.IDisposable"])() ];
                ArrayEnumerator.IsInst = function (t) { return t instanceof ArrayEnumerator ? t : null; };
                ArrayEnumerator.IsValueType = false;
                ArrayEnumerator.IsPrimitive = false;
                ArrayEnumerator.IsNullable = false;
                ArrayEnumerator.ArrayType = Array;
                ArrayEnumerator.GenericArguments = [ T ];
                ArrayEnumerator.prototype.index = 0;
                ArrayEnumerator.prototype.length = 0;
                ArrayEnumerator.prototype.source = null;
                ArrayEnumerator.prototype.vtable = {
                    'asm0.x6000093': function ()
                    {
                        return asm0.x6000093;
                    },
                    'asm0.x6000094': function ()
                    {
                        return asm0.x6000094;
                    },
                    'asm0.x6000095': function ()
                    {
                        return asm0.x6000095;
                    },
                    'asm0.x6000096': function ()
                    {
                        return asm0.x6000096;
                    },
                    'asm0.x6000097': function ()
                    {
                        return asm0.x6000097;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
                (ArrayEnumerator.prototype)[((asm0)["System.Collections.Generic.IEnumerator`1"])(T)] = {
                    'x600004a': function ()
                    {
                        return asm0.x6000093;
                    }
                };
                (ArrayEnumerator.prototype)[((asm0)["System.Collections.IEnumerator"])()] = {
                    'x6000047': function ()
                    {
                        return asm0.x6000095;
                    },
                    'x6000048': function ()
                    {
                        return asm0.x6000094;
                    },
                    'x6000049': function ()
                    {
                        return asm0.x6000096;
                    }
                };
                (ArrayEnumerator.prototype)[((asm0)["System.IDisposable"])()] = {
                    'x600003c': function ()
                    {
                        return asm0.x6000097;
                    }
                };
            };
            ArrayEnumerator.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.Diagnostics.DebuggerStepThroughAttribute"] = (function ()
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
            function DebuggerStepThroughAttribute()
            {
                (DebuggerStepThroughAttribute.init)();
                this.constructor = DebuggerStepThroughAttribute;
            };
            c = DebuggerStepThroughAttribute;
            ct = c;
            DebuggerStepThroughAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                DebuggerStepThroughAttribute.FullName = "System.Diagnostics.DebuggerStepThroughAttribute";
                DebuggerStepThroughAttribute.Interfaces = [  ];
                DebuggerStepThroughAttribute.IsInst = function (t) { return t instanceof DebuggerStepThroughAttribute ? t : null; };
                DebuggerStepThroughAttribute.IsValueType = false;
                DebuggerStepThroughAttribute.IsPrimitive = false;
                DebuggerStepThroughAttribute.IsNullable = false;
                DebuggerStepThroughAttribute.ArrayType = Array;
                DebuggerStepThroughAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            DebuggerStepThroughAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.AttributeTargets"] = (function ()
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
            function AttributeTargets()
            {
                (AttributeTargets.init)();
                this.constructor = AttributeTargets;
            };
            c = AttributeTargets;
            ct = c;
            AttributeTargets.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                AttributeTargets.Assembly = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Module = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Class = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Struct = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Enum = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Constructor = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Method = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Property = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Field = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Event = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Interface = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Parameter = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.Delegate = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.ReturnValue = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.GenericParameter = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.All = new (((asm0)["System.AttributeTargets"])())();
                AttributeTargets.FullName = "System.AttributeTargets";
                AttributeTargets.Interfaces = [  ];
                AttributeTargets.IsInst = function (t) { return t instanceof AttributeTargets ? t : null; };
                AttributeTargets.IsValueType = true;
                AttributeTargets.IsPrimitive = false;
                AttributeTargets.IsNullable = false;
                AttributeTargets.ArrayType = Array;
                AttributeTargets.prototype.value__ = 0;
                AttributeTargets.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            AttributeTargets.prototype = new (((asm0)["System.Enum"])())();
            return c;
        };
    })();
    (asm)["System.ComVisibleAttribute"] = (function ()
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
            function ComVisibleAttribute()
            {
                (ComVisibleAttribute.init)();
                this.constructor = ComVisibleAttribute;
            };
            c = ComVisibleAttribute;
            ct = c;
            ComVisibleAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                ComVisibleAttribute.FullName = "System.ComVisibleAttribute";
                ComVisibleAttribute.Interfaces = [  ];
                ComVisibleAttribute.IsInst = function (t) { return t instanceof ComVisibleAttribute ? t : null; };
                ComVisibleAttribute.IsValueType = false;
                ComVisibleAttribute.IsPrimitive = false;
                ComVisibleAttribute.IsNullable = false;
                ComVisibleAttribute.ArrayType = Array;
                ComVisibleAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            ComVisibleAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.Nullable`1"] = (function ()
    {
        var ct;
        ct = {
            
        };
        return function (T)
        {
            var c;
            var initialized;
            c = tree_get([ T ],ct);
            
            if (c){
                return c;
            }
            initialized = false;;
            function Nullable_1()
            {
                (Nullable_1.init)();
                this.constructor = Nullable_1;
            };
            c = Nullable_1;
            tree_set([ T ],ct,c);
            Nullable_1.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Nullable_1.FullName = "System.Nullable`1";
                Nullable_1.Interfaces = [  ];
                Nullable_1.IsInst = function (t) { return t instanceof Nullable_1 ? t : null; };
                Nullable_1.IsValueType = true;
                Nullable_1.IsPrimitive = false;
                Nullable_1.IsNullable = true;
                Nullable_1.ArrayType = Array;
                Nullable_1.GenericArguments = [ T ];
                Nullable_1.prototype.value = ((T.IsValueType) ? (((T.IsPrimitive) ? (0) : (new T()))) : (null));
                Nullable_1.prototype.has_value = false;
                Nullable_1.prototype.vtable = {
                    'asm0.x6000009': function ()
                    {
                        return asm0.x600009d;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x600009f;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x60000a2;
                    }
                };
            };
            Nullable_1.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.SerializableAttribute"] = (function ()
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
            function SerializableAttribute()
            {
                (SerializableAttribute.init)();
                this.constructor = SerializableAttribute;
            };
            c = SerializableAttribute;
            ct = c;
            SerializableAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                SerializableAttribute.FullName = "System.SerializableAttribute";
                SerializableAttribute.Interfaces = [  ];
                SerializableAttribute.IsInst = function (t) { return t instanceof SerializableAttribute ? t : null; };
                SerializableAttribute.IsValueType = false;
                SerializableAttribute.IsPrimitive = false;
                SerializableAttribute.IsNullable = false;
                SerializableAttribute.ArrayType = Array;
                SerializableAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            SerializableAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.String"] = (function ()
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
            function $$String()
            {
                ($$String.init)();
                this.constructor = $$String;
            };
            c = $$String;
            ct = c;
            $$String.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                $$String.Empty = null;
                $$String.FullName = "System.String";
                $$String.Interfaces = [  ];
                $$String.IsInst = function (t) { return t instanceof $$String ? t : null; };
                $$String.IsValueType = false;
                $$String.IsPrimitive = false;
                $$String.IsNullable = false;
                $$String.ArrayType = Array;
                (asm0.x60000bb)();
                $$String.prototype.jsstr = null;
                $$String.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x60000b3;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x60000b7;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x60000b9;
                    }
                };
            };
            $$String.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.Reflection.DefaultMemberAttribute"] = (function ()
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
            function DefaultMemberAttribute()
            {
                (DefaultMemberAttribute.init)();
                this.constructor = DefaultMemberAttribute;
            };
            c = DefaultMemberAttribute;
            ct = c;
            DefaultMemberAttribute.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                DefaultMemberAttribute.FullName = "System.Reflection.DefaultMemberAttribute";
                DefaultMemberAttribute.Interfaces = [  ];
                DefaultMemberAttribute.IsInst = function (t) { return t instanceof DefaultMemberAttribute ? t : null; };
                DefaultMemberAttribute.IsValueType = false;
                DefaultMemberAttribute.IsPrimitive = false;
                DefaultMemberAttribute.IsNullable = false;
                DefaultMemberAttribute.ArrayType = Array;
                DefaultMemberAttribute.prototype.System_ReflectionDefaultMemberAttributemember_name = null;
                DefaultMemberAttribute.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            DefaultMemberAttribute.prototype = new (((asm0)["System.Attribute"])())();
            return c;
        };
    })();
    (asm)["System.Type"] = (function ()
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
            function Type()
            {
                (Type.init)();
                this.constructor = Type;
            };
            c = Type;
            ct = c;
            Type.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Type.FullName = "System.Type";
                Type.Interfaces = [  ];
                Type.IsInst = function (t) { return t instanceof Type ? t : null; };
                Type.IsValueType = false;
                Type.IsPrimitive = false;
                Type.IsNullable = false;
                Type.ArrayType = Array;
                Type.prototype.vtable = {
                    'asm0.x60000bf': function ()
                    {
                        return asm0.x60000bf;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Type.prototype = new (((asm0)["System.Reflection.MemberInfo"])())();
            return c;
        };
    })();
    (asm)["System.RuntimeType"] = (function ()
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
            function RuntimeType()
            {
                (RuntimeType.init)();
                this.constructor = RuntimeType;
            };
            c = RuntimeType;
            ct = c;
            RuntimeType.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                RuntimeType.FullName = "System.RuntimeType";
                RuntimeType.Interfaces = [  ];
                RuntimeType.IsInst = function (t) { return t instanceof RuntimeType ? t : null; };
                RuntimeType.IsValueType = false;
                RuntimeType.IsPrimitive = false;
                RuntimeType.IsNullable = false;
                RuntimeType.ArrayType = Array;
                RuntimeType.prototype.SystemRuntimeTypector = null;
                RuntimeType.prototype.vtable = {
                    'asm0.x60000bf': function ()
                    {
                        return asm0.x60000c7;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x60000c8;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x60000c9;
                    },
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    }
                };
            };
            RuntimeType.prototype = new (((asm0)["System.Type"])())();
            return c;
        };
    })();
    (asm)["System.RuntimeType+constructor"] = (function ()
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
            function constructor()
            {
                (constructor.init)();
                this.constructor = constructor;
            };
            c = constructor;
            ct = c;
            constructor.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                constructor.FullName = "System.RuntimeType+constructor";
                constructor.Interfaces = [  ];
                constructor.IsInst = function (t) { return t instanceof constructor ? t : null; };
                constructor.IsValueType = false;
                constructor.IsPrimitive = false;
                constructor.IsNullable = false;
                constructor.ArrayType = Array;
                constructor.prototype.FullName = null;
                constructor.prototype.TypeInstance = null;
                constructor.prototype.Hash = 0;
                constructor.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            constructor.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    (asm)["System.UInt16"] = (function ()
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
            function UInt16()
            {
                (UInt16.init)();
                this.constructor = UInt16;
            };
            c = UInt16;
            ct = c;
            UInt16.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                UInt16.FullName = "System.UInt16";
                UInt16.Interfaces = [  ];
                UInt16.IsInst = function (t) { return typeof t == 'number'; };
                UInt16.IsValueType = true;
                UInt16.IsPrimitive = true;
                UInt16.IsNullable = false;
                UInt16.ArrayType = Uint16Array;
                UInt16.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x60000cb;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            UInt16.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.UInt32"] = (function ()
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
            function UInt32()
            {
                (UInt32.init)();
                this.constructor = UInt32;
            };
            c = UInt32;
            ct = c;
            UInt32.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                UInt32.FullName = "System.UInt32";
                UInt32.Interfaces = [  ];
                UInt32.IsInst = function (t) { return typeof t == 'number'; };
                UInt32.IsValueType = true;
                UInt32.IsPrimitive = true;
                UInt32.IsNullable = false;
                UInt32.ArrayType = Uint32Array;
                UInt32.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x60000cc;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            UInt32.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.UInt64"] = (function ()
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
            function UInt64()
            {
                (UInt64.init)();
                this.constructor = UInt64;
            };
            c = UInt64;
            ct = c;
            UInt64.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                UInt64.MaxValue = 0;
                UInt64.FullName = "System.UInt64";
                UInt64.Interfaces = [  ];
                UInt64.IsInst = function (t) { return typeof t == 'number'; };
                UInt64.IsValueType = true;
                UInt64.IsPrimitive = true;
                UInt64.IsNullable = false;
                UInt64.ArrayType = Array;
                UInt64.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x60000cd;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x60000d7;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x60000d8;
                    }
                };
            };
            UInt64.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.UIntPtr"] = (function ()
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
            function UIntPtr()
            {
                (UIntPtr.init)();
                this.constructor = UIntPtr;
            };
            c = UIntPtr;
            ct = c;
            UIntPtr.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                UIntPtr.FullName = "System.UIntPtr";
                UIntPtr.Interfaces = [  ];
                UIntPtr.IsInst = function (t) { return typeof t == 'number'; };
                UIntPtr.IsValueType = true;
                UIntPtr.IsPrimitive = true;
                UIntPtr.IsNullable = false;
                UIntPtr.ArrayType = Array;
                UIntPtr.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x60000da;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            UIntPtr.prototype = {
                
            };
            return c;
        };
    })();
    (asm)["System.Void"] = (function ()
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
            function Void()
            {
                (Void.init)();
                this.constructor = Void;
            };
            c = Void;
            ct = c;
            Void.init = function ()
            {
                
                if (initialized){
                    return;
                }
                initialized = true;
                Void.FullName = "System.Void";
                Void.Interfaces = [  ];
                Void.IsInst = function (t) { return t instanceof Void ? t : null; };
                Void.IsValueType = true;
                Void.IsPrimitive = false;
                Void.IsNullable = false;
                Void.ArrayType = Array;
                Void.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Void.prototype = {
                
            };
            return c;
        };
    })();
})(asm0 || (asm0 = {}));
var asm1; (function (asm)
{
    
    asm.next_hash = 1;

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

    function box(v, type) {
        if (v === null)
            return v;
    
        if (type.IsNullable) {
            if (v.has_value)
                return box(v.value, type.GenericArguments[0]);
            else
                return null;
        }

        if (!type.IsValueType)
            return v;
    
        return {
            'boxed': v,
            'type': type,
            'vtable': type.prototype.vtable
        };
    }

    function unbox(o, type) {
        return cast_class(o.boxed, type);
    }

    function unbox_any(o, type) {
        if (type.IsNullable) {
            var result = new type();
            if (o !== null) {
                result.value = cast_class(o.boxed, type.GenericArguments[0]);
                result.has_value = true;
            }
            return result;
        }
    
        if (type.IsValueType)
            return cast_class(o.boxed, type);
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

    function new_string(str) {
        var r = new (asm0['System.String']())();
        r.jsstr = str;
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
        r.type = type;
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
        if (type.IsInst(obj) || (!type.IsValueType && obj === null))
            return obj;
        else {
            var t = asm0['System.InvalidCastException']();
            throw new t();
        }
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
    asm.x6000001 = braille_test_log;;
    asm.x6000002 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x600000b = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: call Void .ctor()*/
        /* IL_06: ret */
        return ;
    };;
    asm.x600000c_init = function ()
    {
        (((asm0)["System.Int64"])().init)();
        (((asm0)["System.Double"])().init)();
        asm.x600000c = asm.x600000c_;
    };;
    asm.x600000c = function ()
    {
        (asm.x600000c_init.apply)(this,arguments);
        return (asm.x600000c.apply)(this,arguments);
    };;
    asm.x600000c_ = function Main()
    {
        var t0;
        var t1;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_100;
        var st_101;
        var st_102;
        var st_103;
        var st_104;
        var st_105;
        var st_106;
        var st_107;
        var st_108;
        var st_109;
        var st_10A;
        var st_10B;
        var st_10C;
        var st_10D;
        var st_10E;
        var st_10F;
        var st_11;
        var st_110;
        var st_111;
        var st_112;
        var st_113;
        var st_114;
        var st_115;
        var st_116;
        var st_117;
        var st_118;
        var st_119;
        var st_11A;
        var st_11B;
        var st_11C;
        var st_11D;
        var st_11E;
        var st_11F;
        var st_12;
        var st_120;
        var st_121;
        var st_122;
        var st_123;
        var st_124;
        var st_125;
        var st_126;
        var st_127;
        var st_128;
        var st_129;
        var st_12A;
        var st_12B;
        var st_12C;
        var st_12D;
        var st_12E;
        var st_12F;
        var st_13;
        var st_130;
        var st_131;
        var st_132;
        var st_133;
        var st_134;
        var st_135;
        var st_136;
        var st_137;
        var st_138;
        var st_139;
        var st_13A;
        var st_13B;
        var st_13C;
        var st_13D;
        var st_13E;
        var st_13F;
        var st_14;
        var st_140;
        var st_141;
        var st_142;
        var st_143;
        var st_144;
        var st_145;
        var st_146;
        var st_147;
        var st_148;
        var st_149;
        var st_14A;
        var st_14B;
        var st_14C;
        var st_14D;
        var st_14E;
        var st_14F;
        var st_15;
        var st_150;
        var st_151;
        var st_152;
        var st_153;
        var st_154;
        var st_155;
        var st_156;
        var st_157;
        var st_158;
        var st_159;
        var st_15A;
        var st_15B;
        var st_15C;
        var st_15D;
        var st_15E;
        var st_15F;
        var st_16;
        var st_160;
        var st_161;
        var st_162;
        var st_163;
        var st_164;
        var st_165;
        var st_166;
        var st_167;
        var st_168;
        var st_169;
        var st_16A;
        var st_16B;
        var st_16C;
        var st_16D;
        var st_16E;
        var st_16F;
        var st_17;
        var st_170;
        var st_171;
        var st_172;
        var st_173;
        var st_174;
        var st_175;
        var st_176;
        var st_177;
        var st_178;
        var st_179;
        var st_17A;
        var st_17B;
        var st_17C;
        var st_17D;
        var st_17E;
        var st_17F;
        var st_18;
        var st_180;
        var st_181;
        var st_182;
        var st_183;
        var st_184;
        var st_185;
        var st_186;
        var st_187;
        var st_188;
        var st_189;
        var st_18A;
        var st_18B;
        var st_18C;
        var st_18D;
        var st_18E;
        var st_18F;
        var st_19;
        var st_190;
        var st_191;
        var st_192;
        var st_193;
        var st_194;
        var st_195;
        var st_196;
        var st_197;
        var st_198;
        var st_199;
        var st_19A;
        var st_19B;
        var st_19C;
        var st_19D;
        var st_19E;
        var st_19F;
        var st_1A;
        var st_1A0;
        var st_1A1;
        var st_1A2;
        var st_1A3;
        var st_1A4;
        var st_1A5;
        var st_1A6;
        var st_1A7;
        var st_1A8;
        var st_1A9;
        var st_1AA;
        var st_1AB;
        var st_1AC;
        var st_1AD;
        var st_1AE;
        var st_1AF;
        var st_1B;
        var st_1B0;
        var st_1B1;
        var st_1B2;
        var st_1B3;
        var st_1B4;
        var st_1B5;
        var st_1B6;
        var st_1B7;
        var st_1B8;
        var st_1B9;
        var st_1BA;
        var st_1BB;
        var st_1BC;
        var st_1BD;
        var st_1BE;
        var st_1BF;
        var st_1C;
        var st_1C0;
        var st_1C1;
        var st_1C2;
        var st_1C3;
        var st_1C4;
        var st_1C5;
        var st_1C6;
        var st_1C7;
        var st_1C8;
        var st_1C9;
        var st_1CA;
        var st_1CB;
        var st_1CC;
        var st_1CD;
        var st_1CE;
        var st_1CF;
        var st_1D;
        var st_1D0;
        var st_1D1;
        var st_1D2;
        var st_1D3;
        var st_1D4;
        var st_1D5;
        var st_1D6;
        var st_1D7;
        var st_1D8;
        var st_1D9;
        var st_1DA;
        var st_1DB;
        var st_1DC;
        var st_1DD;
        var st_1DE;
        var st_1DF;
        var st_1E;
        var st_1E0;
        var st_1E1;
        var st_1E2;
        var st_1E3;
        var st_1E4;
        var st_1E5;
        var st_1E6;
        var st_1E7;
        var st_1E8;
        var st_1E9;
        var st_1EA;
        var st_1EB;
        var st_1EC;
        var st_1ED;
        var st_1EE;
        var st_1EF;
        var st_1F;
        var st_1F0;
        var st_1F1;
        var st_1F2;
        var st_1F3;
        var st_1F4;
        var st_1F5;
        var st_1F6;
        var st_1F7;
        var st_1F8;
        var st_1F9;
        var st_1FA;
        var st_1FB;
        var st_1FC;
        var st_1FD;
        var st_1FE;
        var st_1FF;
        var st_20;
        var st_200;
        var st_201;
        var st_202;
        var st_203;
        var st_204;
        var st_205;
        var st_206;
        var st_207;
        var st_208;
        var st_209;
        var st_20A;
        var st_20B;
        var st_20C;
        var st_20D;
        var st_20E;
        var st_20F;
        var st_21;
        var st_210;
        var st_211;
        var st_212;
        var st_213;
        var st_214;
        var st_215;
        var st_216;
        var st_217;
        var st_218;
        var st_219;
        var st_21A;
        var st_21B;
        var st_21C;
        var st_21D;
        var st_21E;
        var st_21F;
        var st_22;
        var st_220;
        var st_221;
        var st_222;
        var st_223;
        var st_224;
        var st_225;
        var st_226;
        var st_227;
        var st_228;
        var st_229;
        var st_22A;
        var st_22B;
        var st_22C;
        var st_22D;
        var st_22E;
        var st_22F;
        var st_23;
        var st_230;
        var st_231;
        var st_232;
        var st_233;
        var st_234;
        var st_235;
        var st_236;
        var st_237;
        var st_238;
        var st_239;
        var st_23A;
        var st_23B;
        var st_23C;
        var st_23D;
        var st_23E;
        var st_23F;
        var st_24;
        var st_240;
        var st_241;
        var st_242;
        var st_243;
        var st_244;
        var st_245;
        var st_246;
        var st_247;
        var st_248;
        var st_249;
        var st_24A;
        var st_24B;
        var st_24C;
        var st_24D;
        var st_24E;
        var st_24F;
        var st_25;
        var st_250;
        var st_251;
        var st_252;
        var st_253;
        var st_254;
        var st_255;
        var st_256;
        var st_257;
        var st_258;
        var st_259;
        var st_25A;
        var st_25B;
        var st_25C;
        var st_25D;
        var st_25E;
        var st_25F;
        var st_26;
        var st_260;
        var st_261;
        var st_262;
        var st_263;
        var st_264;
        var st_265;
        var st_266;
        var st_267;
        var st_268;
        var st_269;
        var st_26A;
        var st_26B;
        var st_26C;
        var st_26D;
        var st_26E;
        var st_26F;
        var st_27;
        var st_270;
        var st_271;
        var st_272;
        var st_273;
        var st_274;
        var st_275;
        var st_276;
        var st_277;
        var st_278;
        var st_279;
        var st_27A;
        var st_27B;
        var st_27C;
        var st_27D;
        var st_27E;
        var st_27F;
        var st_28;
        var st_280;
        var st_281;
        var st_282;
        var st_283;
        var st_284;
        var st_285;
        var st_286;
        var st_287;
        var st_288;
        var st_289;
        var st_28A;
        var st_28B;
        var st_28C;
        var st_28D;
        var st_28E;
        var st_28F;
        var st_29;
        var st_290;
        var st_291;
        var st_292;
        var st_293;
        var st_294;
        var st_295;
        var st_296;
        var st_297;
        var st_298;
        var st_299;
        var st_29A;
        var st_29B;
        var st_29C;
        var st_29D;
        var st_29E;
        var st_29F;
        var st_2A;
        var st_2A0;
        var st_2A1;
        var st_2A2;
        var st_2A3;
        var st_2A4;
        var st_2A5;
        var st_2A6;
        var st_2A7;
        var st_2A8;
        var st_2A9;
        var st_2AA;
        var st_2AB;
        var st_2AC;
        var st_2AD;
        var st_2AE;
        var st_2AF;
        var st_2B;
        var st_2B0;
        var st_2B1;
        var st_2B2;
        var st_2B3;
        var st_2B4;
        var st_2B5;
        var st_2B6;
        var st_2B7;
        var st_2B8;
        var st_2B9;
        var st_2BA;
        var st_2BB;
        var st_2BC;
        var st_2BD;
        var st_2BE;
        var st_2BF;
        var st_2C;
        var st_2C0;
        var st_2C1;
        var st_2C2;
        var st_2C3;
        var st_2C4;
        var st_2C5;
        var st_2C6;
        var st_2C7;
        var st_2C8;
        var st_2C9;
        var st_2CA;
        var st_2CB;
        var st_2CC;
        var st_2CD;
        var st_2CE;
        var st_2CF;
        var st_2D;
        var st_2D0;
        var st_2D1;
        var st_2D2;
        var st_2D3;
        var st_2D4;
        var st_2D5;
        var st_2D6;
        var st_2D7;
        var st_2D8;
        var st_2D9;
        var st_2DA;
        var st_2DB;
        var st_2DC;
        var st_2DD;
        var st_2DE;
        var st_2DF;
        var st_2E;
        var st_2E0;
        var st_2E1;
        var st_2E2;
        var st_2E3;
        var st_2E4;
        var st_2E5;
        var st_2E6;
        var st_2E7;
        var st_2E8;
        var st_2E9;
        var st_2EA;
        var st_2EB;
        var st_2EC;
        var st_2ED;
        var st_2EE;
        var st_2EF;
        var st_2F;
        var st_2F0;
        var st_2F1;
        var st_2F2;
        var st_2F3;
        var st_2F4;
        var st_2F5;
        var st_2F6;
        var st_2F7;
        var st_2F8;
        var st_2F9;
        var st_2FA;
        var st_2FB;
        var st_2FC;
        var st_2FD;
        var st_2FE;
        var st_2FF;
        var st_30;
        var st_300;
        var st_301;
        var st_302;
        var st_303;
        var st_304;
        var st_305;
        var st_306;
        var st_307;
        var st_308;
        var st_309;
        var st_30A;
        var st_30B;
        var st_30C;
        var st_30D;
        var st_30E;
        var st_30F;
        var st_31;
        var st_310;
        var st_311;
        var st_312;
        var st_313;
        var st_314;
        var st_315;
        var st_316;
        var st_317;
        var st_318;
        var st_319;
        var st_31A;
        var st_31B;
        var st_31C;
        var st_31D;
        var st_31E;
        var st_31F;
        var st_32;
        var st_320;
        var st_321;
        var st_322;
        var st_323;
        var st_324;
        var st_325;
        var st_326;
        var st_327;
        var st_328;
        var st_329;
        var st_32A;
        var st_32B;
        var st_32C;
        var st_32D;
        var st_32E;
        var st_32F;
        var st_33;
        var st_330;
        var st_331;
        var st_332;
        var st_333;
        var st_334;
        var st_335;
        var st_336;
        var st_337;
        var st_338;
        var st_339;
        var st_33A;
        var st_33B;
        var st_33C;
        var st_33D;
        var st_33E;
        var st_33F;
        var st_34;
        var st_340;
        var st_341;
        var st_342;
        var st_343;
        var st_344;
        var st_345;
        var st_346;
        var st_347;
        var st_348;
        var st_349;
        var st_34A;
        var st_34B;
        var st_34C;
        var st_34D;
        var st_34E;
        var st_34F;
        var st_35;
        var st_350;
        var st_351;
        var st_352;
        var st_353;
        var st_354;
        var st_355;
        var st_356;
        var st_357;
        var st_358;
        var st_359;
        var st_35A;
        var st_35B;
        var st_35C;
        var st_35D;
        var st_35E;
        var st_35F;
        var st_36;
        var st_360;
        var st_361;
        var st_362;
        var st_363;
        var st_364;
        var st_365;
        var st_366;
        var st_367;
        var st_368;
        var st_369;
        var st_36A;
        var st_36B;
        var st_36C;
        var st_36D;
        var st_36E;
        var st_36F;
        var st_37;
        var st_370;
        var st_371;
        var st_372;
        var st_373;
        var st_374;
        var st_375;
        var st_376;
        var st_377;
        var st_378;
        var st_379;
        var st_37A;
        var st_37B;
        var st_37C;
        var st_37D;
        var st_37E;
        var st_37F;
        var st_38;
        var st_380;
        var st_381;
        var st_382;
        var st_383;
        var st_384;
        var st_385;
        var st_386;
        var st_387;
        var st_388;
        var st_389;
        var st_38A;
        var st_38B;
        var st_38C;
        var st_38D;
        var st_38E;
        var st_38F;
        var st_39;
        var st_390;
        var st_391;
        var st_392;
        var st_393;
        var st_394;
        var st_395;
        var st_396;
        var st_397;
        var st_398;
        var st_399;
        var st_39A;
        var st_39B;
        var st_39C;
        var st_39D;
        var st_39E;
        var st_39F;
        var st_3A;
        var st_3A0;
        var st_3A1;
        var st_3A2;
        var st_3A3;
        var st_3A4;
        var st_3A5;
        var st_3A6;
        var st_3A7;
        var st_3A8;
        var st_3A9;
        var st_3AA;
        var st_3AB;
        var st_3AC;
        var st_3AD;
        var st_3AE;
        var st_3AF;
        var st_3B;
        var st_3B0;
        var st_3B1;
        var st_3B2;
        var st_3B3;
        var st_3B4;
        var st_3B5;
        var st_3B6;
        var st_3B7;
        var st_3B8;
        var st_3B9;
        var st_3BA;
        var st_3BB;
        var st_3BC;
        var st_3BD;
        var st_3BE;
        var st_3BF;
        var st_3C;
        var st_3C0;
        var st_3C1;
        var st_3C2;
        var st_3C3;
        var st_3C4;
        var st_3C5;
        var st_3C6;
        var st_3C7;
        var st_3C8;
        var st_3C9;
        var st_3CA;
        var st_3CB;
        var st_3CC;
        var st_3CD;
        var st_3CE;
        var st_3CF;
        var st_3D;
        var st_3D0;
        var st_3D1;
        var st_3D2;
        var st_3D3;
        var st_3D4;
        var st_3D5;
        var st_3D6;
        var st_3D7;
        var st_3D8;
        var st_3D9;
        var st_3DA;
        var st_3DB;
        var st_3DC;
        var st_3DD;
        var st_3DE;
        var st_3DF;
        var st_3E;
        var st_3E0;
        var st_3E1;
        var st_3E2;
        var st_3E3;
        var st_3E4;
        var st_3E5;
        var st_3E6;
        var st_3E7;
        var st_3E8;
        var st_3E9;
        var st_3EA;
        var st_3EB;
        var st_3EC;
        var st_3ED;
        var st_3EE;
        var st_3EF;
        var st_3F;
        var st_3F0;
        var st_3F1;
        var st_3F2;
        var st_3F3;
        var st_3F4;
        var st_3F5;
        var st_3F6;
        var st_3F7;
        var st_3F8;
        var st_3F9;
        var st_3FA;
        var st_3FB;
        var st_3FC;
        var st_3FD;
        var st_3FE;
        var st_3FF;
        var st_40;
        var st_400;
        var st_401;
        var st_402;
        var st_403;
        var st_404;
        var st_405;
        var st_406;
        var st_407;
        var st_408;
        var st_409;
        var st_40A;
        var st_40B;
        var st_40C;
        var st_40D;
        var st_40E;
        var st_40F;
        var st_41;
        var st_410;
        var st_411;
        var st_412;
        var st_413;
        var st_414;
        var st_415;
        var st_416;
        var st_417;
        var st_418;
        var st_419;
        var st_41A;
        var st_41B;
        var st_41C;
        var st_41D;
        var st_41E;
        var st_41F;
        var st_42;
        var st_420;
        var st_421;
        var st_422;
        var st_423;
        var st_424;
        var st_425;
        var st_426;
        var st_427;
        var st_428;
        var st_429;
        var st_42A;
        var st_42B;
        var st_42C;
        var st_42D;
        var st_42E;
        var st_42F;
        var st_43;
        var st_430;
        var st_431;
        var st_432;
        var st_433;
        var st_434;
        var st_435;
        var st_436;
        var st_437;
        var st_438;
        var st_439;
        var st_43A;
        var st_43B;
        var st_43C;
        var st_43D;
        var st_43E;
        var st_43F;
        var st_44;
        var st_440;
        var st_441;
        var st_442;
        var st_443;
        var st_444;
        var st_445;
        var st_446;
        var st_447;
        var st_448;
        var st_449;
        var st_44A;
        var st_44B;
        var st_44C;
        var st_44D;
        var st_44E;
        var st_44F;
        var st_45;
        var st_450;
        var st_451;
        var st_452;
        var st_453;
        var st_454;
        var st_455;
        var st_456;
        var st_457;
        var st_458;
        var st_459;
        var st_45A;
        var st_45B;
        var st_45C;
        var st_45D;
        var st_45E;
        var st_45F;
        var st_46;
        var st_460;
        var st_461;
        var st_462;
        var st_463;
        var st_464;
        var st_465;
        var st_466;
        var st_467;
        var st_468;
        var st_469;
        var st_46A;
        var st_46B;
        var st_46C;
        var st_46D;
        var st_46E;
        var st_46F;
        var st_47;
        var st_470;
        var st_471;
        var st_472;
        var st_473;
        var st_474;
        var st_475;
        var st_476;
        var st_477;
        var st_478;
        var st_479;
        var st_47A;
        var st_47B;
        var st_47C;
        var st_47D;
        var st_47E;
        var st_47F;
        var st_48;
        var st_480;
        var st_481;
        var st_482;
        var st_483;
        var st_484;
        var st_485;
        var st_486;
        var st_487;
        var st_488;
        var st_489;
        var st_48A;
        var st_48B;
        var st_48C;
        var st_48D;
        var st_48E;
        var st_48F;
        var st_49;
        var st_490;
        var st_491;
        var st_492;
        var st_493;
        var st_494;
        var st_495;
        var st_496;
        var st_497;
        var st_498;
        var st_499;
        var st_49A;
        var st_49B;
        var st_49C;
        var st_49D;
        var st_49E;
        var st_49F;
        var st_4A;
        var st_4A0;
        var st_4A1;
        var st_4A2;
        var st_4A3;
        var st_4A4;
        var st_4A5;
        var st_4A6;
        var st_4A7;
        var st_4A8;
        var st_4A9;
        var st_4AA;
        var st_4AB;
        var st_4AC;
        var st_4AD;
        var st_4AE;
        var st_4AF;
        var st_4B;
        var st_4B0;
        var st_4B1;
        var st_4B2;
        var st_4B3;
        var st_4B4;
        var st_4B5;
        var st_4B6;
        var st_4B7;
        var st_4B8;
        var st_4B9;
        var st_4BA;
        var st_4BB;
        var st_4BC;
        var st_4BD;
        var st_4BE;
        var st_4BF;
        var st_4C;
        var st_4C0;
        var st_4C1;
        var st_4C2;
        var st_4C3;
        var st_4C4;
        var st_4C5;
        var st_4C6;
        var st_4C7;
        var st_4C8;
        var st_4C9;
        var st_4CA;
        var st_4CB;
        var st_4CC;
        var st_4CD;
        var st_4CE;
        var st_4CF;
        var st_4D;
        var st_4D0;
        var st_4D1;
        var st_4D2;
        var st_4D3;
        var st_4D4;
        var st_4D5;
        var st_4D6;
        var st_4D7;
        var st_4D8;
        var st_4D9;
        var st_4DA;
        var st_4DB;
        var st_4DC;
        var st_4DD;
        var st_4DE;
        var st_4DF;
        var st_4E;
        var st_4E0;
        var st_4E1;
        var st_4E2;
        var st_4E3;
        var st_4E4;
        var st_4E5;
        var st_4E6;
        var st_4E7;
        var st_4E8;
        var st_4E9;
        var st_4EA;
        var st_4EB;
        var st_4EC;
        var st_4ED;
        var st_4EE;
        var st_4EF;
        var st_4F;
        var st_4F0;
        var st_4F1;
        var st_4F2;
        var st_4F3;
        var st_4F4;
        var st_4F5;
        var st_4F6;
        var st_4F7;
        var st_4F8;
        var st_4F9;
        var st_4FA;
        var st_4FB;
        var st_4FC;
        var st_4FD;
        var st_4FE;
        var st_4FF;
        var st_50;
        var st_500;
        var st_501;
        var st_502;
        var st_503;
        var st_504;
        var st_505;
        var st_506;
        var st_507;
        var st_508;
        var st_509;
        var st_50A;
        var st_50B;
        var st_50C;
        var st_50D;
        var st_50E;
        var st_50F;
        var st_51;
        var st_510;
        var st_511;
        var st_512;
        var st_513;
        var st_514;
        var st_515;
        var st_516;
        var st_517;
        var st_518;
        var st_519;
        var st_51A;
        var st_51B;
        var st_51C;
        var st_51D;
        var st_51E;
        var st_51F;
        var st_52;
        var st_520;
        var st_521;
        var st_522;
        var st_523;
        var st_524;
        var st_525;
        var st_526;
        var st_527;
        var st_528;
        var st_529;
        var st_52A;
        var st_52B;
        var st_52C;
        var st_52D;
        var st_52E;
        var st_52F;
        var st_53;
        var st_530;
        var st_531;
        var st_532;
        var st_533;
        var st_534;
        var st_535;
        var st_536;
        var st_537;
        var st_538;
        var st_539;
        var st_53A;
        var st_53B;
        var st_53C;
        var st_53D;
        var st_53E;
        var st_53F;
        var st_54;
        var st_540;
        var st_541;
        var st_542;
        var st_543;
        var st_544;
        var st_545;
        var st_546;
        var st_547;
        var st_548;
        var st_549;
        var st_54A;
        var st_54B;
        var st_54C;
        var st_54D;
        var st_54E;
        var st_54F;
        var st_55;
        var st_550;
        var st_551;
        var st_552;
        var st_553;
        var st_554;
        var st_555;
        var st_556;
        var st_557;
        var st_558;
        var st_559;
        var st_55A;
        var st_55B;
        var st_55C;
        var st_55D;
        var st_55E;
        var st_55F;
        var st_56;
        var st_560;
        var st_561;
        var st_562;
        var st_563;
        var st_564;
        var st_565;
        var st_566;
        var st_567;
        var st_568;
        var st_569;
        var st_56A;
        var st_56B;
        var st_56C;
        var st_56D;
        var st_56E;
        var st_56F;
        var st_57;
        var st_570;
        var st_571;
        var st_572;
        var st_573;
        var st_574;
        var st_575;
        var st_576;
        var st_577;
        var st_578;
        var st_579;
        var st_57A;
        var st_57B;
        var st_57C;
        var st_57D;
        var st_57E;
        var st_57F;
        var st_58;
        var st_580;
        var st_581;
        var st_582;
        var st_583;
        var st_584;
        var st_585;
        var st_586;
        var st_587;
        var st_588;
        var st_589;
        var st_58A;
        var st_58B;
        var st_58C;
        var st_58D;
        var st_58E;
        var st_58F;
        var st_59;
        var st_590;
        var st_591;
        var st_592;
        var st_593;
        var st_594;
        var st_595;
        var st_596;
        var st_597;
        var st_598;
        var st_599;
        var st_59A;
        var st_59B;
        var st_59C;
        var st_59D;
        var st_59E;
        var st_59F;
        var st_5A;
        var st_5A0;
        var st_5A1;
        var st_5A2;
        var st_5A3;
        var st_5A4;
        var st_5A5;
        var st_5A6;
        var st_5A7;
        var st_5A8;
        var st_5A9;
        var st_5AA;
        var st_5AB;
        var st_5AC;
        var st_5AD;
        var st_5AE;
        var st_5AF;
        var st_5B;
        var st_5B0;
        var st_5B1;
        var st_5B2;
        var st_5B3;
        var st_5B4;
        var st_5B5;
        var st_5B6;
        var st_5B7;
        var st_5B8;
        var st_5B9;
        var st_5BA;
        var st_5BB;
        var st_5BC;
        var st_5BD;
        var st_5BE;
        var st_5BF;
        var st_5C;
        var st_5C0;
        var st_5C1;
        var st_5C2;
        var st_5C3;
        var st_5C4;
        var st_5C5;
        var st_5C6;
        var st_5C7;
        var st_5C8;
        var st_5C9;
        var st_5CA;
        var st_5CB;
        var st_5CC;
        var st_5CD;
        var st_5CE;
        var st_5CF;
        var st_5D;
        var st_5D0;
        var st_5D1;
        var st_5D2;
        var st_5D3;
        var st_5D4;
        var st_5D5;
        var st_5D6;
        var st_5D7;
        var st_5D8;
        var st_5D9;
        var st_5DA;
        var st_5DB;
        var st_5DC;
        var st_5DD;
        var st_5DE;
        var st_5DF;
        var st_5E;
        var st_5E0;
        var st_5E1;
        var st_5E2;
        var st_5E3;
        var st_5E4;
        var st_5E5;
        var st_5E6;
        var st_5E7;
        var st_5E8;
        var st_5E9;
        var st_5EA;
        var st_5EB;
        var st_5EC;
        var st_5ED;
        var st_5EE;
        var st_5EF;
        var st_5F;
        var st_5F0;
        var st_5F1;
        var st_5F2;
        var st_5F3;
        var st_5F4;
        var st_5F5;
        var st_5F6;
        var st_5F7;
        var st_5F8;
        var st_5F9;
        var st_5FA;
        var st_5FB;
        var st_5FC;
        var st_5FD;
        var st_5FE;
        var st_5FF;
        var st_60;
        var st_600;
        var st_601;
        var st_602;
        var st_603;
        var st_604;
        var st_605;
        var st_606;
        var st_607;
        var st_608;
        var st_609;
        var st_60A;
        var st_60B;
        var st_60C;
        var st_60D;
        var st_60E;
        var st_60F;
        var st_61;
        var st_610;
        var st_611;
        var st_612;
        var st_613;
        var st_614;
        var st_615;
        var st_616;
        var st_617;
        var st_618;
        var st_619;
        var st_61A;
        var st_61B;
        var st_61C;
        var st_61D;
        var st_61E;
        var st_61F;
        var st_62;
        var st_620;
        var st_621;
        var st_622;
        var st_623;
        var st_624;
        var st_625;
        var st_626;
        var st_627;
        var st_628;
        var st_629;
        var st_62A;
        var st_62B;
        var st_62C;
        var st_62D;
        var st_62E;
        var st_62F;
        var st_63;
        var st_630;
        var st_631;
        var st_632;
        var st_633;
        var st_634;
        var st_635;
        var st_636;
        var st_637;
        var st_638;
        var st_639;
        var st_63A;
        var st_63B;
        var st_63C;
        var st_63D;
        var st_63E;
        var st_63F;
        var st_64;
        var st_640;
        var st_641;
        var st_642;
        var st_643;
        var st_644;
        var st_645;
        var st_646;
        var st_647;
        var st_648;
        var st_649;
        var st_64A;
        var st_64B;
        var st_64C;
        var st_64D;
        var st_64E;
        var st_64F;
        var st_65;
        var st_650;
        var st_651;
        var st_652;
        var st_653;
        var st_654;
        var st_655;
        var st_656;
        var st_657;
        var st_658;
        var st_659;
        var st_65A;
        var st_65B;
        var st_65C;
        var st_65D;
        var st_65E;
        var st_65F;
        var st_66;
        var st_660;
        var st_661;
        var st_662;
        var st_663;
        var st_664;
        var st_665;
        var st_666;
        var st_667;
        var st_668;
        var st_669;
        var st_66A;
        var st_66B;
        var st_66C;
        var st_66D;
        var st_66E;
        var st_66F;
        var st_67;
        var st_670;
        var st_671;
        var st_672;
        var st_673;
        var st_674;
        var st_675;
        var st_676;
        var st_677;
        var st_678;
        var st_679;
        var st_67A;
        var st_67B;
        var st_67C;
        var st_67D;
        var st_67E;
        var st_67F;
        var st_68;
        var st_680;
        var st_681;
        var st_682;
        var st_683;
        var st_684;
        var st_685;
        var st_686;
        var st_687;
        var st_688;
        var st_689;
        var st_68A;
        var st_68B;
        var st_68C;
        var st_68D;
        var st_68E;
        var st_68F;
        var st_69;
        var st_690;
        var st_691;
        var st_692;
        var st_693;
        var st_694;
        var st_695;
        var st_696;
        var st_697;
        var st_698;
        var st_699;
        var st_69A;
        var st_69B;
        var st_69C;
        var st_69D;
        var st_69E;
        var st_69F;
        var st_6A;
        var st_6A0;
        var st_6A1;
        var st_6A2;
        var st_6A3;
        var st_6A4;
        var st_6A5;
        var st_6A6;
        var st_6A7;
        var st_6A8;
        var st_6A9;
        var st_6AA;
        var st_6AB;
        var st_6AC;
        var st_6AD;
        var st_6AE;
        var st_6AF;
        var st_6B;
        var st_6B0;
        var st_6B1;
        var st_6B2;
        var st_6B3;
        var st_6B4;
        var st_6B5;
        var st_6B6;
        var st_6B7;
        var st_6B8;
        var st_6B9;
        var st_6BA;
        var st_6BB;
        var st_6BC;
        var st_6BD;
        var st_6BE;
        var st_6BF;
        var st_6C;
        var st_6C0;
        var st_6C1;
        var st_6C2;
        var st_6C3;
        var st_6C4;
        var st_6C5;
        var st_6C6;
        var st_6C7;
        var st_6C8;
        var st_6C9;
        var st_6CA;
        var st_6CB;
        var st_6CC;
        var st_6CD;
        var st_6CE;
        var st_6CF;
        var st_6D;
        var st_6D0;
        var st_6D1;
        var st_6D2;
        var st_6D3;
        var st_6D4;
        var st_6D5;
        var st_6D6;
        var st_6D7;
        var st_6D8;
        var st_6D9;
        var st_6DA;
        var st_6DB;
        var st_6DC;
        var st_6DD;
        var st_6DE;
        var st_6DF;
        var st_6E;
        var st_6E0;
        var st_6E1;
        var st_6E2;
        var st_6E3;
        var st_6E4;
        var st_6E5;
        var st_6E6;
        var st_6E7;
        var st_6E8;
        var st_6E9;
        var st_6EA;
        var st_6EB;
        var st_6EC;
        var st_6ED;
        var st_6EE;
        var st_6EF;
        var st_6F;
        var st_6F0;
        var st_6F1;
        var st_6F2;
        var st_6F3;
        var st_6F4;
        var st_6F5;
        var st_6F6;
        var st_6F7;
        var st_6F8;
        var st_6F9;
        var st_6FA;
        var st_6FB;
        var st_6FC;
        var st_6FD;
        var st_6FE;
        var st_6FF;
        var st_70;
        var st_700;
        var st_701;
        var st_702;
        var st_703;
        var st_704;
        var st_705;
        var st_706;
        var st_707;
        var st_708;
        var st_709;
        var st_70A;
        var st_70B;
        var st_70C;
        var st_70D;
        var st_70E;
        var st_70F;
        var st_71;
        var st_710;
        var st_711;
        var st_712;
        var st_713;
        var st_714;
        var st_715;
        var st_716;
        var st_717;
        var st_718;
        var st_719;
        var st_71A;
        var st_71B;
        var st_71C;
        var st_71D;
        var st_71E;
        var st_71F;
        var st_72;
        var st_720;
        var st_721;
        var st_722;
        var st_723;
        var st_724;
        var st_725;
        var st_726;
        var st_727;
        var st_728;
        var st_729;
        var st_72A;
        var st_72B;
        var st_72C;
        var st_72D;
        var st_72E;
        var st_72F;
        var st_73;
        var st_730;
        var st_731;
        var st_732;
        var st_733;
        var st_734;
        var st_735;
        var st_736;
        var st_737;
        var st_738;
        var st_739;
        var st_73A;
        var st_73B;
        var st_73C;
        var st_73D;
        var st_73E;
        var st_73F;
        var st_74;
        var st_740;
        var st_741;
        var st_742;
        var st_743;
        var st_744;
        var st_745;
        var st_746;
        var st_747;
        var st_748;
        var st_749;
        var st_74A;
        var st_74B;
        var st_74C;
        var st_74D;
        var st_74E;
        var st_74F;
        var st_75;
        var st_750;
        var st_751;
        var st_752;
        var st_753;
        var st_754;
        var st_755;
        var st_756;
        var st_757;
        var st_758;
        var st_759;
        var st_75A;
        var st_75B;
        var st_75C;
        var st_75D;
        var st_75E;
        var st_75F;
        var st_76;
        var st_760;
        var st_761;
        var st_762;
        var st_763;
        var st_764;
        var st_765;
        var st_766;
        var st_767;
        var st_768;
        var st_769;
        var st_76A;
        var st_76B;
        var st_76C;
        var st_76D;
        var st_76E;
        var st_76F;
        var st_77;
        var st_770;
        var st_771;
        var st_772;
        var st_773;
        var st_774;
        var st_775;
        var st_776;
        var st_777;
        var st_778;
        var st_779;
        var st_77A;
        var st_77B;
        var st_77C;
        var st_77D;
        var st_77E;
        var st_77F;
        var st_78;
        var st_780;
        var st_781;
        var st_782;
        var st_783;
        var st_784;
        var st_785;
        var st_786;
        var st_787;
        var st_788;
        var st_789;
        var st_78A;
        var st_78B;
        var st_78C;
        var st_78D;
        var st_78E;
        var st_78F;
        var st_79;
        var st_790;
        var st_791;
        var st_792;
        var st_793;
        var st_794;
        var st_795;
        var st_796;
        var st_797;
        var st_798;
        var st_799;
        var st_79A;
        var st_79B;
        var st_79C;
        var st_79D;
        var st_79E;
        var st_79F;
        var st_7A;
        var st_7A0;
        var st_7A1;
        var st_7A2;
        var st_7A3;
        var st_7A4;
        var st_7A5;
        var st_7A6;
        var st_7A7;
        var st_7A8;
        var st_7A9;
        var st_7AA;
        var st_7AB;
        var st_7AC;
        var st_7AD;
        var st_7AE;
        var st_7AF;
        var st_7B;
        var st_7B0;
        var st_7B1;
        var st_7B2;
        var st_7B3;
        var st_7B4;
        var st_7B5;
        var st_7B6;
        var st_7B7;
        var st_7B8;
        var st_7B9;
        var st_7BA;
        var st_7BB;
        var st_7BC;
        var st_7BD;
        var st_7BE;
        var st_7BF;
        var st_7C;
        var st_7C0;
        var st_7C1;
        var st_7C2;
        var st_7C3;
        var st_7C4;
        var st_7C5;
        var st_7C6;
        var st_7C7;
        var st_7C8;
        var st_7C9;
        var st_7CA;
        var st_7CB;
        var st_7CC;
        var st_7CD;
        var st_7CE;
        var st_7CF;
        var st_7D;
        var st_7D0;
        var st_7D1;
        var st_7D2;
        var st_7D3;
        var st_7D4;
        var st_7D5;
        var st_7D6;
        var st_7D7;
        var st_7D8;
        var st_7D9;
        var st_7DA;
        var st_7DB;
        var st_7DC;
        var st_7DD;
        var st_7DE;
        var st_7DF;
        var st_7E;
        var st_7E0;
        var st_7E1;
        var st_7E2;
        var st_7E3;
        var st_7E4;
        var st_7E5;
        var st_7E6;
        var st_7E7;
        var st_7E8;
        var st_7E9;
        var st_7EA;
        var st_7EB;
        var st_7EC;
        var st_7ED;
        var st_7EE;
        var st_7EF;
        var st_7F;
        var st_7F0;
        var st_7F1;
        var st_7F2;
        var st_7F3;
        var st_7F4;
        var st_7F5;
        var st_7F6;
        var st_7F7;
        var st_7F8;
        var st_7F9;
        var st_7FA;
        var st_7FB;
        var st_7FC;
        var st_7FD;
        var st_7FE;
        var st_7FF;
        var st_80;
        var st_800;
        var st_801;
        var st_802;
        var st_803;
        var st_804;
        var st_805;
        var st_806;
        var st_807;
        var st_808;
        var st_809;
        var st_80A;
        var st_80B;
        var st_80C;
        var st_80D;
        var st_80E;
        var st_80F;
        var st_81;
        var st_810;
        var st_811;
        var st_812;
        var st_813;
        var st_814;
        var st_815;
        var st_816;
        var st_817;
        var st_818;
        var st_819;
        var st_81A;
        var st_81B;
        var st_81C;
        var st_81D;
        var st_81E;
        var st_81F;
        var st_82;
        var st_820;
        var st_821;
        var st_822;
        var st_823;
        var st_824;
        var st_825;
        var st_826;
        var st_827;
        var st_828;
        var st_829;
        var st_82A;
        var st_82B;
        var st_82C;
        var st_82D;
        var st_82E;
        var st_82F;
        var st_83;
        var st_830;
        var st_831;
        var st_832;
        var st_833;
        var st_834;
        var st_835;
        var st_836;
        var st_837;
        var st_838;
        var st_839;
        var st_83A;
        var st_83B;
        var st_83C;
        var st_83D;
        var st_83E;
        var st_83F;
        var st_84;
        var st_840;
        var st_841;
        var st_842;
        var st_843;
        var st_844;
        var st_845;
        var st_846;
        var st_847;
        var st_848;
        var st_849;
        var st_84A;
        var st_84B;
        var st_84C;
        var st_84D;
        var st_84E;
        var st_84F;
        var st_85;
        var st_850;
        var st_851;
        var st_852;
        var st_853;
        var st_854;
        var st_855;
        var st_856;
        var st_857;
        var st_858;
        var st_859;
        var st_85A;
        var st_85B;
        var st_85C;
        var st_85D;
        var st_85E;
        var st_85F;
        var st_86;
        var st_860;
        var st_861;
        var st_862;
        var st_863;
        var st_864;
        var st_865;
        var st_866;
        var st_867;
        var st_868;
        var st_869;
        var st_86A;
        var st_86B;
        var st_86C;
        var st_86D;
        var st_86E;
        var st_86F;
        var st_87;
        var st_870;
        var st_871;
        var st_872;
        var st_873;
        var st_874;
        var st_875;
        var st_876;
        var st_877;
        var st_878;
        var st_879;
        var st_87A;
        var st_87B;
        var st_87C;
        var st_87D;
        var st_87E;
        var st_87F;
        var st_88;
        var st_880;
        var st_881;
        var st_882;
        var st_883;
        var st_884;
        var st_885;
        var st_886;
        var st_887;
        var st_888;
        var st_889;
        var st_88A;
        var st_88B;
        var st_88C;
        var st_88D;
        var st_88E;
        var st_88F;
        var st_89;
        var st_890;
        var st_891;
        var st_892;
        var st_893;
        var st_894;
        var st_895;
        var st_896;
        var st_897;
        var st_898;
        var st_899;
        var st_89A;
        var st_89B;
        var st_89C;
        var st_89D;
        var st_89E;
        var st_89F;
        var st_8A;
        var st_8A0;
        var st_8A1;
        var st_8A2;
        var st_8A3;
        var st_8A4;
        var st_8A5;
        var st_8A6;
        var st_8A7;
        var st_8A8;
        var st_8A9;
        var st_8AA;
        var st_8AB;
        var st_8AC;
        var st_8AD;
        var st_8AE;
        var st_8AF;
        var st_8B;
        var st_8B0;
        var st_8B1;
        var st_8B2;
        var st_8B3;
        var st_8B4;
        var st_8B5;
        var st_8B6;
        var st_8B7;
        var st_8B8;
        var st_8B9;
        var st_8BA;
        var st_8BB;
        var st_8BC;
        var st_8BD;
        var st_8BE;
        var st_8BF;
        var st_8C;
        var st_8C0;
        var st_8C1;
        var st_8C2;
        var st_8C3;
        var st_8C4;
        var st_8C5;
        var st_8C6;
        var st_8C7;
        var st_8C8;
        var st_8C9;
        var st_8CA;
        var st_8CB;
        var st_8CC;
        var st_8CD;
        var st_8CE;
        var st_8CF;
        var st_8D;
        var st_8D0;
        var st_8D1;
        var st_8D2;
        var st_8D3;
        var st_8D4;
        var st_8D5;
        var st_8D6;
        var st_8D7;
        var st_8D8;
        var st_8D9;
        var st_8DA;
        var st_8DB;
        var st_8DC;
        var st_8DD;
        var st_8DE;
        var st_8DF;
        var st_8E;
        var st_8E0;
        var st_8E1;
        var st_8E2;
        var st_8E3;
        var st_8E4;
        var st_8E5;
        var st_8E6;
        var st_8E7;
        var st_8E8;
        var st_8E9;
        var st_8EA;
        var st_8EB;
        var st_8EC;
        var st_8ED;
        var st_8EE;
        var st_8EF;
        var st_8F;
        var st_8F0;
        var st_8F1;
        var st_8F2;
        var st_8F3;
        var st_8F4;
        var st_8F5;
        var st_8F6;
        var st_8F7;
        var st_8F8;
        var st_8F9;
        var st_8FA;
        var st_8FB;
        var st_8FC;
        var st_8FD;
        var st_8FE;
        var st_8FF;
        var st_90;
        var st_900;
        var st_901;
        var st_902;
        var st_903;
        var st_904;
        var st_905;
        var st_906;
        var st_907;
        var st_908;
        var st_909;
        var st_90A;
        var st_90B;
        var st_90C;
        var st_90D;
        var st_90E;
        var st_90F;
        var st_91;
        var st_910;
        var st_911;
        var st_912;
        var st_913;
        var st_914;
        var st_915;
        var st_92;
        var st_93;
        var st_94;
        var st_95;
        var st_96;
        var st_97;
        var st_98;
        var st_99;
        var st_9A;
        var st_9B;
        var st_9C;
        var st_9D;
        var st_9E;
        var st_9F;
        var st_A0;
        var st_A1;
        var st_A2;
        var st_A3;
        var st_A4;
        var st_A5;
        var st_A6;
        var st_A7;
        var st_A8;
        var st_A9;
        var st_AA;
        var st_AB;
        var st_AC;
        var st_AD;
        var st_AE;
        var st_AF;
        var st_B0;
        var st_B1;
        var st_B2;
        var st_B3;
        var st_B4;
        var st_B5;
        var st_B6;
        var st_B7;
        var st_B8;
        var st_B9;
        var st_BA;
        var st_BB;
        var st_BC;
        var st_BD;
        var st_BE;
        var st_BF;
        var st_C0;
        var st_C1;
        var st_C2;
        var st_C3;
        var st_C4;
        var st_C5;
        var st_C6;
        var st_C7;
        var st_C8;
        var st_C9;
        var st_CA;
        var st_CB;
        var st_CC;
        var st_CD;
        var st_CE;
        var st_CF;
        var st_D0;
        var st_D1;
        var st_D2;
        var st_D3;
        var st_D4;
        var st_D5;
        var st_D6;
        var st_D7;
        var st_D8;
        var st_D9;
        var st_DA;
        var st_DB;
        var st_DC;
        var st_DD;
        var st_DE;
        var st_DF;
        var st_E0;
        var st_E1;
        var st_E2;
        var st_E3;
        var st_E4;
        var st_E5;
        var st_E6;
        var st_E7;
        var st_E8;
        var st_E9;
        var st_EA;
        var st_EB;
        var st_EC;
        var st_ED;
        var st_EE;
        var st_EF;
        var st_F0;
        var st_F1;
        var st_F2;
        var st_F3;
        var st_F4;
        var st_F5;
        var st_F6;
        var st_F7;
        var st_F8;
        var st_F9;
        var st_FA;
        var st_FB;
        var st_FC;
        var st_FD;
        var st_FE;
        var st_FF;
        t0 = ((asm0)["System.Int64"])();
        t1 = ((asm0)["System.Double"])();
        /* IL_00: ldstr 1 - 21 ToString*/
        st_00 = new_string("1 - 21 ToString");
        /* IL_05: call Void Log(System.Object)*/
        (asm1.x6000001)(st_00);
        /* IL_0A: ldc.i4.1 */
        st_01 = (1|0);
        /* IL_0B: conv.i8 */
        st_02 = conv_i8(st_01);
        /* IL_0C: box System.Int64*/
        st_03 = {
            'boxed': st_02,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_11: call Void Log(System.Object)*/
        (asm1.x6000001)(st_03);
        /* IL_16: ldc.i4.2 */
        st_04 = (2|0);
        /* IL_17: conv.i8 */
        st_05 = conv_i8(st_04);
        /* IL_18: box System.Int64*/
        st_06 = {
            'boxed': st_05,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_06);
        /* IL_22: ldc.i4.3 */
        st_07 = (3|0);
        /* IL_23: conv.i8 */
        st_08 = conv_i8(st_07);
        /* IL_24: box System.Int64*/
        st_09 = {
            'boxed': st_08,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_29: call Void Log(System.Object)*/
        (asm1.x6000001)(st_09);
        /* IL_2E: ldc.i4.4 */
        st_0A = (4|0);
        /* IL_2F: conv.i8 */
        st_0B = conv_i8(st_0A);
        /* IL_30: box System.Int64*/
        st_0C = {
            'boxed': st_0B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_35: call Void Log(System.Object)*/
        (asm1.x6000001)(st_0C);
        /* IL_3A: ldc.i4.5 */
        st_0D = (5|0);
        /* IL_3B: conv.i8 */
        st_0E = conv_i8(st_0D);
        /* IL_3C: box System.Int64*/
        st_0F = {
            'boxed': st_0E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_41: call Void Log(System.Object)*/
        (asm1.x6000001)(st_0F);
        /* IL_46: ldc.i4.6 */
        st_10 = (6|0);
        /* IL_47: conv.i8 */
        st_11 = conv_i8(st_10);
        /* IL_48: box System.Int64*/
        st_12 = {
            'boxed': st_11,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_4D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_12);
        /* IL_52: ldc.i4.7 */
        st_13 = (7|0);
        /* IL_53: conv.i8 */
        st_14 = conv_i8(st_13);
        /* IL_54: box System.Int64*/
        st_15 = {
            'boxed': st_14,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_59: call Void Log(System.Object)*/
        (asm1.x6000001)(st_15);
        /* IL_5E: ldc.i4.8 */
        st_16 = (8|0);
        /* IL_5F: conv.i8 */
        st_17 = conv_i8(st_16);
        /* IL_60: box System.Int64*/
        st_18 = {
            'boxed': st_17,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_65: call Void Log(System.Object)*/
        (asm1.x6000001)(st_18);
        /* IL_6A: ldc.i4.s 9*/
        st_19 = (9|0);
        /* IL_6C: conv.i8 */
        st_1A = conv_i8(st_19);
        /* IL_6D: box System.Int64*/
        st_1B = {
            'boxed': st_1A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_72: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1B);
        /* IL_77: ldc.i4.s 10*/
        st_1C = (10|0);
        /* IL_79: conv.i8 */
        st_1D = conv_i8(st_1C);
        /* IL_7A: box System.Int64*/
        st_1E = {
            'boxed': st_1D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_7F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1E);
        /* IL_84: ldc.i4.s 11*/
        st_1F = (11|0);
        /* IL_86: conv.i8 */
        st_20 = conv_i8(st_1F);
        /* IL_87: box System.Int64*/
        st_21 = {
            'boxed': st_20,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_8C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_21);
        /* IL_91: ldc.i4.s 12*/
        st_22 = (12|0);
        /* IL_93: conv.i8 */
        st_23 = conv_i8(st_22);
        /* IL_94: box System.Int64*/
        st_24 = {
            'boxed': st_23,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_99: call Void Log(System.Object)*/
        (asm1.x6000001)(st_24);
        /* IL_9E: ldc.i4.s 13*/
        st_25 = (13|0);
        /* IL_A0: conv.i8 */
        st_26 = conv_i8(st_25);
        /* IL_A1: box System.Int64*/
        st_27 = {
            'boxed': st_26,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_27);
        /* IL_AB: ldc.i4.s 14*/
        st_28 = (14|0);
        /* IL_AD: conv.i8 */
        st_29 = conv_i8(st_28);
        /* IL_AE: box System.Int64*/
        st_2A = {
            'boxed': st_29,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_B3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2A);
        /* IL_B8: ldc.i4.s 15*/
        st_2B = (15|0);
        /* IL_BA: conv.i8 */
        st_2C = conv_i8(st_2B);
        /* IL_BB: box System.Int64*/
        st_2D = {
            'boxed': st_2C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2D);
        /* IL_C5: ldc.i4.s 16*/
        st_2E = (16|0);
        /* IL_C7: conv.i8 */
        st_2F = conv_i8(st_2E);
        /* IL_C8: box System.Int64*/
        st_30 = {
            'boxed': st_2F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_CD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_30);
        /* IL_D2: ldc.i4.s 17*/
        st_31 = (17|0);
        /* IL_D4: conv.i8 */
        st_32 = conv_i8(st_31);
        /* IL_D5: box System.Int64*/
        st_33 = {
            'boxed': st_32,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_DA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_33);
        /* IL_DF: ldc.i4.s 18*/
        st_34 = (18|0);
        /* IL_E1: conv.i8 */
        st_35 = conv_i8(st_34);
        /* IL_E2: box System.Int64*/
        st_36 = {
            'boxed': st_35,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_36);
        /* IL_EC: ldc.i4.s 19*/
        st_37 = (19|0);
        /* IL_EE: conv.i8 */
        st_38 = conv_i8(st_37);
        /* IL_EF: box System.Int64*/
        st_39 = {
            'boxed': st_38,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_F4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_39);
        /* IL_F9: ldc.i4.s 20*/
        st_3A = (20|0);
        /* IL_FB: conv.i8 */
        st_3B = conv_i8(st_3A);
        /* IL_FC: box System.Int64*/
        st_3C = {
            'boxed': st_3B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_101: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3C);
        /* IL_106: ldc.i4.s 21*/
        st_3D = (21|0);
        /* IL_108: conv.i8 */
        st_3E = conv_i8(st_3D);
        /* IL_109: box System.Int64*/
        st_3F = {
            'boxed': st_3E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_10E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3F);
        /* IL_113: ldstr (long)0xf, (long)0xff ... (long)0xffffffffff*/
        st_40 = new_string("(long)0xf, (long)0xff ... (long)0xffffffffff");
        /* IL_118: call Void Log(System.Object)*/
        (asm1.x6000001)(st_40);
        /* IL_11D: ldc.i4.s 15*/
        st_41 = (15|0);
        /* IL_11F: conv.i8 */
        st_42 = conv_i8(st_41);
        /* IL_120: box System.Int64*/
        st_43 = {
            'boxed': st_42,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_125: call Void Log(System.Object)*/
        (asm1.x6000001)(st_43);
        /* IL_12A: ldc.i4 255*/
        st_44 = (255|0);
        /* IL_12F: conv.i8 */
        st_45 = conv_i8(st_44);
        /* IL_130: box System.Int64*/
        st_46 = {
            'boxed': st_45,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_135: call Void Log(System.Object)*/
        (asm1.x6000001)(st_46);
        /* IL_13A: ldc.i4 4095*/
        st_47 = (4095|0);
        /* IL_13F: conv.i8 */
        st_48 = conv_i8(st_47);
        /* IL_140: box System.Int64*/
        st_49 = {
            'boxed': st_48,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_145: call Void Log(System.Object)*/
        (asm1.x6000001)(st_49);
        /* IL_14A: ldc.i4 65535*/
        st_4A = (65535|0);
        /* IL_14F: conv.i8 */
        st_4B = conv_i8(st_4A);
        /* IL_150: box System.Int64*/
        st_4C = {
            'boxed': st_4B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_155: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4C);
        /* IL_15A: ldc.i4 1048575*/
        st_4D = (1048575|0);
        /* IL_15F: conv.i8 */
        st_4E = conv_i8(st_4D);
        /* IL_160: box System.Int64*/
        st_4F = {
            'boxed': st_4E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_165: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4F);
        /* IL_16A: ldc.i4 16777215*/
        st_50 = (16777215|0);
        /* IL_16F: conv.i8 */
        st_51 = conv_i8(st_50);
        /* IL_170: box System.Int64*/
        st_52 = {
            'boxed': st_51,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_175: call Void Log(System.Object)*/
        (asm1.x6000001)(st_52);
        /* IL_17A: ldc.i4 268435455*/
        st_53 = (268435455|0);
        /* IL_17F: conv.i8 */
        st_54 = conv_i8(st_53);
        /* IL_180: box System.Int64*/
        st_55 = {
            'boxed': st_54,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_185: call Void Log(System.Object)*/
        (asm1.x6000001)(st_55);
        /* IL_18A: ldc.i4.m1 */
        st_56 = (-1|0);
        /* IL_18B: conv.u8 */
        st_57 = conv_u8(st_56);
        /* IL_18C: box System.Int64*/
        st_58 = {
            'boxed': st_57,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_191: call Void Log(System.Object)*/
        (asm1.x6000001)(st_58);
        /* IL_196: ldc.i8 68719476735*/
        st_59 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_19F: box System.Int64*/
        st_5A = {
            'boxed': st_59,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5A);
        /* IL_1A9: ldc.i8 1099511627775*/
        st_5B = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_1B2: box System.Int64*/
        st_5C = {
            'boxed': st_5B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5C);
        /* IL_1BC: ldc.i8 17592186044415*/
        st_5D = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1C5: box System.Int64*/
        st_5E = {
            'boxed': st_5D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1CA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5E);
        /* IL_1CF: ldc.i8 281474976710655*/
        st_5F = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_1D8: box System.Int64*/
        st_60 = {
            'boxed': st_5F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1DD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_60);
        /* IL_1E2: ldc.i8 4503599627370495*/
        st_61 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1EB: box System.Int64*/
        st_62 = {
            'boxed': st_61,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1F0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_62);
        /* IL_1F5: ldc.i8 72057594037927935*/
        st_63 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_1FE: box System.Int64*/
        st_64 = {
            'boxed': st_63,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_203: call Void Log(System.Object)*/
        (asm1.x6000001)(st_64);
        /* IL_208: ldstr (long)0x01, (long)0x0101 ... (long)0x01010101010101*/
        st_65 = new_string("(long)0x01, (long)0x0101 ... (long)0x01010101010101");
        /* IL_20D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_65);
        /* IL_212: ldc.i4.0 */
        st_66 = (0|0);
        /* IL_213: conv.i8 */
        st_67 = conv_i8(st_66);
        /* IL_214: box System.Int64*/
        st_68 = {
            'boxed': st_67,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_219: call Void Log(System.Object)*/
        (asm1.x6000001)(st_68);
        /* IL_21E: ldc.i4.1 */
        st_69 = (1|0);
        /* IL_21F: conv.i8 */
        st_6A = conv_i8(st_69);
        /* IL_220: box System.Int64*/
        st_6B = {
            'boxed': st_6A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_225: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6B);
        /* IL_22A: ldc.i4.s 16*/
        st_6C = (16|0);
        /* IL_22C: conv.i8 */
        st_6D = conv_i8(st_6C);
        /* IL_22D: box System.Int64*/
        st_6E = {
            'boxed': st_6D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_232: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6E);
        /* IL_237: ldc.i4 257*/
        st_6F = (257|0);
        /* IL_23C: conv.i8 */
        st_70 = conv_i8(st_6F);
        /* IL_23D: box System.Int64*/
        st_71 = {
            'boxed': st_70,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_242: call Void Log(System.Object)*/
        (asm1.x6000001)(st_71);
        /* IL_247: ldc.i4 4112*/
        st_72 = (4112|0);
        /* IL_24C: conv.i8 */
        st_73 = conv_i8(st_72);
        /* IL_24D: box System.Int64*/
        st_74 = {
            'boxed': st_73,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_252: call Void Log(System.Object)*/
        (asm1.x6000001)(st_74);
        /* IL_257: ldc.i4 65793*/
        st_75 = (65793|0);
        /* IL_25C: conv.i8 */
        st_76 = conv_i8(st_75);
        /* IL_25D: box System.Int64*/
        st_77 = {
            'boxed': st_76,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_262: call Void Log(System.Object)*/
        (asm1.x6000001)(st_77);
        /* IL_267: ldc.i4 1052688*/
        st_78 = (1052688|0);
        /* IL_26C: conv.i8 */
        st_79 = conv_i8(st_78);
        /* IL_26D: box System.Int64*/
        st_7A = {
            'boxed': st_79,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_272: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7A);
        /* IL_277: ldc.i4 16843009*/
        st_7B = (16843009|0);
        /* IL_27C: conv.i8 */
        st_7C = conv_i8(st_7B);
        /* IL_27D: box System.Int64*/
        st_7D = {
            'boxed': st_7C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_282: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7D);
        /* IL_287: ldc.i4 269488144*/
        st_7E = (269488144|0);
        /* IL_28C: conv.i8 */
        st_7F = conv_i8(st_7E);
        /* IL_28D: box System.Int64*/
        st_80 = {
            'boxed': st_7F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_292: call Void Log(System.Object)*/
        (asm1.x6000001)(st_80);
        /* IL_297: ldc.i8 4311810305*/
        st_81 = new Uint32Array([ 0x1010101,0x1 ]);
        /* IL_2A0: box System.Int64*/
        st_82 = {
            'boxed': st_81,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2A5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_82);
        /* IL_2AA: ldc.i8 68988964880*/
        st_83 = new Uint32Array([ 0x10101010,0x10 ]);
        /* IL_2B3: box System.Int64*/
        st_84 = {
            'boxed': st_83,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2B8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_84);
        /* IL_2BD: ldc.i8 1103823438081*/
        st_85 = new Uint32Array([ 0x1010101,0x101 ]);
        /* IL_2C6: box System.Int64*/
        st_86 = {
            'boxed': st_85,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2CB: call Void Log(System.Object)*/
        (asm1.x6000001)(st_86);
        /* IL_2D0: ldc.i8 17661175009296*/
        st_87 = new Uint32Array([ 0x10101010,0x1010 ]);
        /* IL_2D9: box System.Int64*/
        st_88 = {
            'boxed': st_87,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2DE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_88);
        /* IL_2E3: ldc.i8 282578800148737*/
        st_89 = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_2EC: box System.Int64*/
        st_8A = {
            'boxed': st_89,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2F1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8A);
        /* IL_2F6: ldstr Add 1*/
        st_8B = new_string("Add 1");
        /* IL_2FB: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8B);
        /* IL_300: ldc.i4.s 15*/
        st_8C = (15|0);
        /* IL_302: conv.i8 */
        st_8E = conv_i8(st_8C);
        /* IL_303: ldc.i4.1 */
        st_8D = (1|0);
        /* IL_304: conv.i8 */
        st_8F = conv_i8(st_8D);
        /* IL_305: call Int64 Add(System.Int64, System.Int64)*/
        st_90 = (asm1.x600000e)(st_8E,st_8F);
        /* IL_30A: box System.Int64*/
        st_91 = {
            'boxed': st_90,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_30F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_91);
        /* IL_314: ldc.i4 255*/
        st_92 = (255|0);
        /* IL_319: conv.i8 */
        st_94 = conv_i8(st_92);
        /* IL_31A: ldc.i4.1 */
        st_93 = (1|0);
        /* IL_31B: conv.i8 */
        st_95 = conv_i8(st_93);
        /* IL_31C: call Int64 Add(System.Int64, System.Int64)*/
        st_96 = (asm1.x600000e)(st_94,st_95);
        /* IL_321: box System.Int64*/
        st_97 = {
            'boxed': st_96,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_326: call Void Log(System.Object)*/
        (asm1.x6000001)(st_97);
        /* IL_32B: ldc.i4 4095*/
        st_98 = (4095|0);
        /* IL_330: conv.i8 */
        st_9A = conv_i8(st_98);
        /* IL_331: ldc.i4.1 */
        st_99 = (1|0);
        /* IL_332: conv.i8 */
        st_9B = conv_i8(st_99);
        /* IL_333: call Int64 Add(System.Int64, System.Int64)*/
        st_9C = (asm1.x600000e)(st_9A,st_9B);
        /* IL_338: box System.Int64*/
        st_9D = {
            'boxed': st_9C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_33D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_9D);
        /* IL_342: ldc.i4 65535*/
        st_9E = (65535|0);
        /* IL_347: conv.i8 */
        st_A0 = conv_i8(st_9E);
        /* IL_348: ldc.i4.1 */
        st_9F = (1|0);
        /* IL_349: conv.i8 */
        st_A1 = conv_i8(st_9F);
        /* IL_34A: call Int64 Add(System.Int64, System.Int64)*/
        st_A2 = (asm1.x600000e)(st_A0,st_A1);
        /* IL_34F: box System.Int64*/
        st_A3 = {
            'boxed': st_A2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_354: call Void Log(System.Object)*/
        (asm1.x6000001)(st_A3);
        /* IL_359: ldc.i4 1048575*/
        st_A4 = (1048575|0);
        /* IL_35E: conv.i8 */
        st_A6 = conv_i8(st_A4);
        /* IL_35F: ldc.i4.1 */
        st_A5 = (1|0);
        /* IL_360: conv.i8 */
        st_A7 = conv_i8(st_A5);
        /* IL_361: call Int64 Add(System.Int64, System.Int64)*/
        st_A8 = (asm1.x600000e)(st_A6,st_A7);
        /* IL_366: box System.Int64*/
        st_A9 = {
            'boxed': st_A8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_36B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_A9);
        /* IL_370: ldc.i4 16777215*/
        st_AA = (16777215|0);
        /* IL_375: conv.i8 */
        st_AC = conv_i8(st_AA);
        /* IL_376: ldc.i4.1 */
        st_AB = (1|0);
        /* IL_377: conv.i8 */
        st_AD = conv_i8(st_AB);
        /* IL_378: call Int64 Add(System.Int64, System.Int64)*/
        st_AE = (asm1.x600000e)(st_AC,st_AD);
        /* IL_37D: box System.Int64*/
        st_AF = {
            'boxed': st_AE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_382: call Void Log(System.Object)*/
        (asm1.x6000001)(st_AF);
        /* IL_387: ldc.i4 268435455*/
        st_B0 = (268435455|0);
        /* IL_38C: conv.i8 */
        st_B2 = conv_i8(st_B0);
        /* IL_38D: ldc.i4.1 */
        st_B1 = (1|0);
        /* IL_38E: conv.i8 */
        st_B3 = conv_i8(st_B1);
        /* IL_38F: call Int64 Add(System.Int64, System.Int64)*/
        st_B4 = (asm1.x600000e)(st_B2,st_B3);
        /* IL_394: box System.Int64*/
        st_B5 = {
            'boxed': st_B4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_399: call Void Log(System.Object)*/
        (asm1.x6000001)(st_B5);
        /* IL_39E: ldc.i4.m1 */
        st_B6 = (-1|0);
        /* IL_39F: conv.u8 */
        st_B8 = conv_u8(st_B6);
        /* IL_3A0: ldc.i4.1 */
        st_B7 = (1|0);
        /* IL_3A1: conv.i8 */
        st_B9 = conv_i8(st_B7);
        /* IL_3A2: call Int64 Add(System.Int64, System.Int64)*/
        st_BA = (asm1.x600000e)(st_B8,st_B9);
        /* IL_3A7: box System.Int64*/
        st_BB = {
            'boxed': st_BA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_3AC: call Void Log(System.Object)*/
        (asm1.x6000001)(st_BB);
        /* IL_3B1: ldc.i8 68719476735*/
        st_BD = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_3BA: ldc.i4.1 */
        st_BC = (1|0);
        /* IL_3BB: conv.i8 */
        st_BE = conv_i8(st_BC);
        /* IL_3BC: call Int64 Add(System.Int64, System.Int64)*/
        st_BF = (asm1.x600000e)(st_BD,st_BE);
        /* IL_3C1: box System.Int64*/
        st_C0 = {
            'boxed': st_BF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_3C6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_C0);
        /* IL_3CB: ldc.i8 1099511627775*/
        st_C2 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_3D4: ldc.i4.1 */
        st_C1 = (1|0);
        /* IL_3D5: conv.i8 */
        st_C3 = conv_i8(st_C1);
        /* IL_3D6: call Int64 Add(System.Int64, System.Int64)*/
        st_C4 = (asm1.x600000e)(st_C2,st_C3);
        /* IL_3DB: box System.Int64*/
        st_C5 = {
            'boxed': st_C4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_3E0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_C5);
        /* IL_3E5: ldc.i8 17592186044415*/
        st_C7 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_3EE: ldc.i4.1 */
        st_C6 = (1|0);
        /* IL_3EF: conv.i8 */
        st_C8 = conv_i8(st_C6);
        /* IL_3F0: call Int64 Add(System.Int64, System.Int64)*/
        st_C9 = (asm1.x600000e)(st_C7,st_C8);
        /* IL_3F5: box System.Int64*/
        st_CA = {
            'boxed': st_C9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_3FA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_CA);
        /* IL_3FF: ldc.i8 281474976710655*/
        st_CC = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_408: ldc.i4.1 */
        st_CB = (1|0);
        /* IL_409: conv.i8 */
        st_CD = conv_i8(st_CB);
        /* IL_40A: call Int64 Add(System.Int64, System.Int64)*/
        st_CE = (asm1.x600000e)(st_CC,st_CD);
        /* IL_40F: box System.Int64*/
        st_CF = {
            'boxed': st_CE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_414: call Void Log(System.Object)*/
        (asm1.x6000001)(st_CF);
        /* IL_419: ldc.i8 4503599627370495*/
        st_D1 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_422: ldc.i4.1 */
        st_D0 = (1|0);
        /* IL_423: conv.i8 */
        st_D2 = conv_i8(st_D0);
        /* IL_424: call Int64 Add(System.Int64, System.Int64)*/
        st_D3 = (asm1.x600000e)(st_D1,st_D2);
        /* IL_429: box System.Int64*/
        st_D4 = {
            'boxed': st_D3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_42E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_D4);
        /* IL_433: ldc.i8 72057594037927935*/
        st_D6 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_43C: ldc.i4.1 */
        st_D5 = (1|0);
        /* IL_43D: conv.i8 */
        st_D7 = conv_i8(st_D5);
        /* IL_43E: call Int64 Add(System.Int64, System.Int64)*/
        st_D8 = (asm1.x600000e)(st_D6,st_D7);
        /* IL_443: box System.Int64*/
        st_D9 = {
            'boxed': st_D8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_448: call Void Log(System.Object)*/
        (asm1.x6000001)(st_D9);
        /* IL_44D: ldstr Add 2*/
        st_DA = new_string("Add 2");
        /* IL_452: call Void Log(System.Object)*/
        (asm1.x6000001)(st_DA);
        /* IL_457: ldc.i4.s 15*/
        st_DB = (15|0);
        /* IL_459: conv.i8 */
        st_DD = conv_i8(st_DB);
        /* IL_45A: ldc.i4.2 */
        st_DC = (2|0);
        /* IL_45B: conv.i8 */
        st_DE = conv_i8(st_DC);
        /* IL_45C: call Int64 Add(System.Int64, System.Int64)*/
        st_DF = (asm1.x600000e)(st_DD,st_DE);
        /* IL_461: box System.Int64*/
        st_E0 = {
            'boxed': st_DF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_466: call Void Log(System.Object)*/
        (asm1.x6000001)(st_E0);
        /* IL_46B: ldc.i4 255*/
        st_E1 = (255|0);
        /* IL_470: conv.i8 */
        st_E3 = conv_i8(st_E1);
        /* IL_471: ldc.i4.2 */
        st_E2 = (2|0);
        /* IL_472: conv.i8 */
        st_E4 = conv_i8(st_E2);
        /* IL_473: call Int64 Add(System.Int64, System.Int64)*/
        st_E5 = (asm1.x600000e)(st_E3,st_E4);
        /* IL_478: box System.Int64*/
        st_E6 = {
            'boxed': st_E5,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_47D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_E6);
        /* IL_482: ldc.i4 4095*/
        st_E7 = (4095|0);
        /* IL_487: conv.i8 */
        st_E9 = conv_i8(st_E7);
        /* IL_488: ldc.i4.2 */
        st_E8 = (2|0);
        /* IL_489: conv.i8 */
        st_EA = conv_i8(st_E8);
        /* IL_48A: call Int64 Add(System.Int64, System.Int64)*/
        st_EB = (asm1.x600000e)(st_E9,st_EA);
        /* IL_48F: box System.Int64*/
        st_EC = {
            'boxed': st_EB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_494: call Void Log(System.Object)*/
        (asm1.x6000001)(st_EC);
        /* IL_499: ldc.i4 65535*/
        st_ED = (65535|0);
        /* IL_49E: conv.i8 */
        st_EF = conv_i8(st_ED);
        /* IL_49F: ldc.i4.2 */
        st_EE = (2|0);
        /* IL_4A0: conv.i8 */
        st_F0 = conv_i8(st_EE);
        /* IL_4A1: call Int64 Add(System.Int64, System.Int64)*/
        st_F1 = (asm1.x600000e)(st_EF,st_F0);
        /* IL_4A6: box System.Int64*/
        st_F2 = {
            'boxed': st_F1,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_4AB: call Void Log(System.Object)*/
        (asm1.x6000001)(st_F2);
        /* IL_4B0: ldc.i4 1048575*/
        st_F3 = (1048575|0);
        /* IL_4B5: conv.i8 */
        st_F5 = conv_i8(st_F3);
        /* IL_4B6: ldc.i4.2 */
        st_F4 = (2|0);
        /* IL_4B7: conv.i8 */
        st_F6 = conv_i8(st_F4);
        /* IL_4B8: call Int64 Add(System.Int64, System.Int64)*/
        st_F7 = (asm1.x600000e)(st_F5,st_F6);
        /* IL_4BD: box System.Int64*/
        st_F8 = {
            'boxed': st_F7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_4C2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_F8);
        /* IL_4C7: ldc.i4 16777215*/
        st_F9 = (16777215|0);
        /* IL_4CC: conv.i8 */
        st_FB = conv_i8(st_F9);
        /* IL_4CD: ldc.i4.2 */
        st_FA = (2|0);
        /* IL_4CE: conv.i8 */
        st_FC = conv_i8(st_FA);
        /* IL_4CF: call Int64 Add(System.Int64, System.Int64)*/
        st_FD = (asm1.x600000e)(st_FB,st_FC);
        /* IL_4D4: box System.Int64*/
        st_FE = {
            'boxed': st_FD,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_4D9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_FE);
        /* IL_4DE: ldc.i4 268435455*/
        st_FF = (268435455|0);
        /* IL_4E3: conv.i8 */
        st_101 = conv_i8(st_FF);
        /* IL_4E4: ldc.i4.2 */
        st_100 = (2|0);
        /* IL_4E5: conv.i8 */
        st_102 = conv_i8(st_100);
        /* IL_4E6: call Int64 Add(System.Int64, System.Int64)*/
        st_103 = (asm1.x600000e)(st_101,st_102);
        /* IL_4EB: box System.Int64*/
        st_104 = {
            'boxed': st_103,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_4F0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_104);
        /* IL_4F5: ldc.i4.m1 */
        st_105 = (-1|0);
        /* IL_4F6: conv.u8 */
        st_107 = conv_u8(st_105);
        /* IL_4F7: ldc.i4.2 */
        st_106 = (2|0);
        /* IL_4F8: conv.i8 */
        st_108 = conv_i8(st_106);
        /* IL_4F9: call Int64 Add(System.Int64, System.Int64)*/
        st_109 = (asm1.x600000e)(st_107,st_108);
        /* IL_4FE: box System.Int64*/
        st_10A = {
            'boxed': st_109,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_503: call Void Log(System.Object)*/
        (asm1.x6000001)(st_10A);
        /* IL_508: ldc.i8 68719476735*/
        st_10C = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_511: ldc.i4.2 */
        st_10B = (2|0);
        /* IL_512: conv.i8 */
        st_10D = conv_i8(st_10B);
        /* IL_513: call Int64 Add(System.Int64, System.Int64)*/
        st_10E = (asm1.x600000e)(st_10C,st_10D);
        /* IL_518: box System.Int64*/
        st_10F = {
            'boxed': st_10E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_51D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_10F);
        /* IL_522: ldc.i8 1099511627775*/
        st_111 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_52B: ldc.i4.2 */
        st_110 = (2|0);
        /* IL_52C: conv.i8 */
        st_112 = conv_i8(st_110);
        /* IL_52D: call Int64 Add(System.Int64, System.Int64)*/
        st_113 = (asm1.x600000e)(st_111,st_112);
        /* IL_532: box System.Int64*/
        st_114 = {
            'boxed': st_113,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_537: call Void Log(System.Object)*/
        (asm1.x6000001)(st_114);
        /* IL_53C: ldc.i8 17592186044415*/
        st_116 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_545: ldc.i4.2 */
        st_115 = (2|0);
        /* IL_546: conv.i8 */
        st_117 = conv_i8(st_115);
        /* IL_547: call Int64 Add(System.Int64, System.Int64)*/
        st_118 = (asm1.x600000e)(st_116,st_117);
        /* IL_54C: box System.Int64*/
        st_119 = {
            'boxed': st_118,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_551: call Void Log(System.Object)*/
        (asm1.x6000001)(st_119);
        /* IL_556: ldc.i8 281474976710655*/
        st_11B = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_55F: ldc.i4.2 */
        st_11A = (2|0);
        /* IL_560: conv.i8 */
        st_11C = conv_i8(st_11A);
        /* IL_561: call Int64 Add(System.Int64, System.Int64)*/
        st_11D = (asm1.x600000e)(st_11B,st_11C);
        /* IL_566: box System.Int64*/
        st_11E = {
            'boxed': st_11D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_56B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_11E);
        /* IL_570: ldc.i8 4503599627370495*/
        st_120 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_579: ldc.i4.2 */
        st_11F = (2|0);
        /* IL_57A: conv.i8 */
        st_121 = conv_i8(st_11F);
        /* IL_57B: call Int64 Add(System.Int64, System.Int64)*/
        st_122 = (asm1.x600000e)(st_120,st_121);
        /* IL_580: box System.Int64*/
        st_123 = {
            'boxed': st_122,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_585: call Void Log(System.Object)*/
        (asm1.x6000001)(st_123);
        /* IL_58A: ldc.i8 72057594037927935*/
        st_125 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_593: ldc.i4.2 */
        st_124 = (2|0);
        /* IL_594: conv.i8 */
        st_126 = conv_i8(st_124);
        /* IL_595: call Int64 Add(System.Int64, System.Int64)*/
        st_127 = (asm1.x600000e)(st_125,st_126);
        /* IL_59A: box System.Int64*/
        st_128 = {
            'boxed': st_127,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_59F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_128);
        /* IL_5A4: ldstr Add 0x1, 0x010, 0x0101 etc*/
        st_129 = new_string("Add 0x1, 0x010, 0x0101 etc");
        /* IL_5A9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_129);
        /* IL_5AE: ldc.i4.s 15*/
        st_12A = (15|0);
        /* IL_5B0: conv.i8 */
        st_12C = conv_i8(st_12A);
        /* IL_5B1: ldc.i4.0 */
        st_12B = (0|0);
        /* IL_5B2: conv.i8 */
        st_12D = conv_i8(st_12B);
        /* IL_5B3: call Int64 Add(System.Int64, System.Int64)*/
        st_12E = (asm1.x600000e)(st_12C,st_12D);
        /* IL_5B8: box System.Int64*/
        st_12F = {
            'boxed': st_12E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_5BD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_12F);
        /* IL_5C2: ldc.i4 255*/
        st_130 = (255|0);
        /* IL_5C7: conv.i8 */
        st_132 = conv_i8(st_130);
        /* IL_5C8: ldc.i4.1 */
        st_131 = (1|0);
        /* IL_5C9: conv.i8 */
        st_133 = conv_i8(st_131);
        /* IL_5CA: call Int64 Add(System.Int64, System.Int64)*/
        st_134 = (asm1.x600000e)(st_132,st_133);
        /* IL_5CF: box System.Int64*/
        st_135 = {
            'boxed': st_134,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_5D4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_135);
        /* IL_5D9: ldc.i4 4095*/
        st_136 = (4095|0);
        /* IL_5DE: conv.i8 */
        st_138 = conv_i8(st_136);
        /* IL_5DF: ldc.i4.s 16*/
        st_137 = (16|0);
        /* IL_5E1: conv.i8 */
        st_139 = conv_i8(st_137);
        /* IL_5E2: call Int64 Add(System.Int64, System.Int64)*/
        st_13A = (asm1.x600000e)(st_138,st_139);
        /* IL_5E7: box System.Int64*/
        st_13B = {
            'boxed': st_13A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_5EC: call Void Log(System.Object)*/
        (asm1.x6000001)(st_13B);
        /* IL_5F1: ldc.i4 65535*/
        st_13C = (65535|0);
        /* IL_5F6: conv.i8 */
        st_13E = conv_i8(st_13C);
        /* IL_5F7: ldc.i4 257*/
        st_13D = (257|0);
        /* IL_5FC: conv.i8 */
        st_13F = conv_i8(st_13D);
        /* IL_5FD: call Int64 Add(System.Int64, System.Int64)*/
        st_140 = (asm1.x600000e)(st_13E,st_13F);
        /* IL_602: box System.Int64*/
        st_141 = {
            'boxed': st_140,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_607: call Void Log(System.Object)*/
        (asm1.x6000001)(st_141);
        /* IL_60C: ldc.i4 1048575*/
        st_142 = (1048575|0);
        /* IL_611: conv.i8 */
        st_144 = conv_i8(st_142);
        /* IL_612: ldc.i4 4112*/
        st_143 = (4112|0);
        /* IL_617: conv.i8 */
        st_145 = conv_i8(st_143);
        /* IL_618: call Int64 Add(System.Int64, System.Int64)*/
        st_146 = (asm1.x600000e)(st_144,st_145);
        /* IL_61D: box System.Int64*/
        st_147 = {
            'boxed': st_146,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_622: call Void Log(System.Object)*/
        (asm1.x6000001)(st_147);
        /* IL_627: ldc.i4 16777215*/
        st_148 = (16777215|0);
        /* IL_62C: conv.i8 */
        st_14A = conv_i8(st_148);
        /* IL_62D: ldc.i4 65793*/
        st_149 = (65793|0);
        /* IL_632: conv.i8 */
        st_14B = conv_i8(st_149);
        /* IL_633: call Int64 Add(System.Int64, System.Int64)*/
        st_14C = (asm1.x600000e)(st_14A,st_14B);
        /* IL_638: box System.Int64*/
        st_14D = {
            'boxed': st_14C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_63D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_14D);
        /* IL_642: ldc.i4 268435455*/
        st_14E = (268435455|0);
        /* IL_647: conv.i8 */
        st_150 = conv_i8(st_14E);
        /* IL_648: ldc.i4 1052688*/
        st_14F = (1052688|0);
        /* IL_64D: conv.i8 */
        st_151 = conv_i8(st_14F);
        /* IL_64E: call Int64 Add(System.Int64, System.Int64)*/
        st_152 = (asm1.x600000e)(st_150,st_151);
        /* IL_653: box System.Int64*/
        st_153 = {
            'boxed': st_152,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_658: call Void Log(System.Object)*/
        (asm1.x6000001)(st_153);
        /* IL_65D: ldc.i4.m1 */
        st_154 = (-1|0);
        /* IL_65E: conv.u8 */
        st_156 = conv_u8(st_154);
        /* IL_65F: ldc.i4 16843009*/
        st_155 = (16843009|0);
        /* IL_664: conv.i8 */
        st_157 = conv_i8(st_155);
        /* IL_665: call Int64 Add(System.Int64, System.Int64)*/
        st_158 = (asm1.x600000e)(st_156,st_157);
        /* IL_66A: box System.Int64*/
        st_159 = {
            'boxed': st_158,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_66F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_159);
        /* IL_674: ldc.i8 68719476735*/
        st_15B = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_67D: ldc.i4 269488144*/
        st_15A = (269488144|0);
        /* IL_682: conv.i8 */
        st_15C = conv_i8(st_15A);
        /* IL_683: call Int64 Add(System.Int64, System.Int64)*/
        st_15D = (asm1.x600000e)(st_15B,st_15C);
        /* IL_688: box System.Int64*/
        st_15E = {
            'boxed': st_15D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_68D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_15E);
        /* IL_692: ldc.i8 1099511627775*/
        st_15F = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_69B: ldc.i8 4311810305*/
        st_160 = new Uint32Array([ 0x1010101,0x1 ]);
        /* IL_6A4: call Int64 Add(System.Int64, System.Int64)*/
        st_161 = (asm1.x600000e)(st_15F,st_160);
        /* IL_6A9: box System.Int64*/
        st_162 = {
            'boxed': st_161,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_6AE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_162);
        /* IL_6B3: ldc.i8 17592186044415*/
        st_163 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_6BC: ldc.i8 68988964880*/
        st_164 = new Uint32Array([ 0x10101010,0x10 ]);
        /* IL_6C5: call Int64 Add(System.Int64, System.Int64)*/
        st_165 = (asm1.x600000e)(st_163,st_164);
        /* IL_6CA: box System.Int64*/
        st_166 = {
            'boxed': st_165,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_6CF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_166);
        /* IL_6D4: ldc.i8 281474976710655*/
        st_167 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_6DD: ldc.i8 1103823438081*/
        st_168 = new Uint32Array([ 0x1010101,0x101 ]);
        /* IL_6E6: call Int64 Add(System.Int64, System.Int64)*/
        st_169 = (asm1.x600000e)(st_167,st_168);
        /* IL_6EB: box System.Int64*/
        st_16A = {
            'boxed': st_169,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_6F0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_16A);
        /* IL_6F5: ldc.i8 4503599627370495*/
        st_16B = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_6FE: ldc.i8 17661175009296*/
        st_16C = new Uint32Array([ 0x10101010,0x1010 ]);
        /* IL_707: call Int64 Add(System.Int64, System.Int64)*/
        st_16D = (asm1.x600000e)(st_16B,st_16C);
        /* IL_70C: box System.Int64*/
        st_16E = {
            'boxed': st_16D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_711: call Void Log(System.Object)*/
        (asm1.x6000001)(st_16E);
        /* IL_716: ldc.i8 72057594037927935*/
        st_16F = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_71F: ldc.i8 282578800148737*/
        st_170 = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_728: call Int64 Add(System.Int64, System.Int64)*/
        st_171 = (asm1.x600000e)(st_16F,st_170);
        /* IL_72D: box System.Int64*/
        st_172 = {
            'boxed': st_171,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_732: call Void Log(System.Object)*/
        (asm1.x6000001)(st_172);
        /* IL_737: ldstr Add -0x1, -0x010, -0x0101 etc*/
        st_173 = new_string("Add -0x1, -0x010, -0x0101 etc");
        /* IL_73C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_173);
        /* IL_741: ldc.i4.s 15*/
        st_174 = (15|0);
        /* IL_743: conv.i8 */
        st_176 = conv_i8(st_174);
        /* IL_744: ldc.i4.0 */
        st_175 = (0|0);
        /* IL_745: conv.i8 */
        st_177 = conv_i8(st_175);
        /* IL_746: call Int64 Add(System.Int64, System.Int64)*/
        st_178 = (asm1.x600000e)(st_176,st_177);
        /* IL_74B: box System.Int64*/
        st_179 = {
            'boxed': st_178,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_750: call Void Log(System.Object)*/
        (asm1.x6000001)(st_179);
        /* IL_755: ldc.i4 255*/
        st_17A = (255|0);
        /* IL_75A: conv.i8 */
        st_17C = conv_i8(st_17A);
        /* IL_75B: ldc.i4.m1 */
        st_17B = (-1|0);
        /* IL_75C: conv.i8 */
        st_17D = conv_i8(st_17B);
        /* IL_75D: call Int64 Add(System.Int64, System.Int64)*/
        st_17E = (asm1.x600000e)(st_17C,st_17D);
        /* IL_762: box System.Int64*/
        st_17F = {
            'boxed': st_17E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_767: call Void Log(System.Object)*/
        (asm1.x6000001)(st_17F);
        /* IL_76C: ldc.i4 4095*/
        st_180 = (4095|0);
        /* IL_771: conv.i8 */
        st_182 = conv_i8(st_180);
        /* IL_772: ldc.i4.s 240*/
        st_181 = (-16|0);
        /* IL_774: conv.i8 */
        st_183 = conv_i8(st_181);
        /* IL_775: call Int64 Add(System.Int64, System.Int64)*/
        st_184 = (asm1.x600000e)(st_182,st_183);
        /* IL_77A: box System.Int64*/
        st_185 = {
            'boxed': st_184,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_77F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_185);
        /* IL_784: ldc.i4 65535*/
        st_186 = (65535|0);
        /* IL_789: conv.i8 */
        st_188 = conv_i8(st_186);
        /* IL_78A: ldc.i4 -257*/
        st_187 = (-257|0);
        /* IL_78F: conv.i8 */
        st_189 = conv_i8(st_187);
        /* IL_790: call Int64 Add(System.Int64, System.Int64)*/
        st_18A = (asm1.x600000e)(st_188,st_189);
        /* IL_795: box System.Int64*/
        st_18B = {
            'boxed': st_18A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_79A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_18B);
        /* IL_79F: ldc.i4 1048575*/
        st_18C = (1048575|0);
        /* IL_7A4: conv.i8 */
        st_18E = conv_i8(st_18C);
        /* IL_7A5: ldc.i4 -4112*/
        st_18D = (-4112|0);
        /* IL_7AA: conv.i8 */
        st_18F = conv_i8(st_18D);
        /* IL_7AB: call Int64 Add(System.Int64, System.Int64)*/
        st_190 = (asm1.x600000e)(st_18E,st_18F);
        /* IL_7B0: box System.Int64*/
        st_191 = {
            'boxed': st_190,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_7B5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_191);
        /* IL_7BA: ldc.i4 16777215*/
        st_192 = (16777215|0);
        /* IL_7BF: conv.i8 */
        st_194 = conv_i8(st_192);
        /* IL_7C0: ldc.i4 -65793*/
        st_193 = (-65793|0);
        /* IL_7C5: conv.i8 */
        st_195 = conv_i8(st_193);
        /* IL_7C6: call Int64 Add(System.Int64, System.Int64)*/
        st_196 = (asm1.x600000e)(st_194,st_195);
        /* IL_7CB: box System.Int64*/
        st_197 = {
            'boxed': st_196,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_7D0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_197);
        /* IL_7D5: ldc.i4 268435455*/
        st_198 = (268435455|0);
        /* IL_7DA: conv.i8 */
        st_19A = conv_i8(st_198);
        /* IL_7DB: ldc.i4 -1052688*/
        st_199 = (-1052688|0);
        /* IL_7E0: conv.i8 */
        st_19B = conv_i8(st_199);
        /* IL_7E1: call Int64 Add(System.Int64, System.Int64)*/
        st_19C = (asm1.x600000e)(st_19A,st_19B);
        /* IL_7E6: box System.Int64*/
        st_19D = {
            'boxed': st_19C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_7EB: call Void Log(System.Object)*/
        (asm1.x6000001)(st_19D);
        /* IL_7F0: ldc.i4.m1 */
        st_19E = (-1|0);
        /* IL_7F1: conv.u8 */
        st_1A0 = conv_u8(st_19E);
        /* IL_7F2: ldc.i4 -16843009*/
        st_19F = (-16843009|0);
        /* IL_7F7: conv.i8 */
        st_1A1 = conv_i8(st_19F);
        /* IL_7F8: call Int64 Add(System.Int64, System.Int64)*/
        st_1A2 = (asm1.x600000e)(st_1A0,st_1A1);
        /* IL_7FD: box System.Int64*/
        st_1A3 = {
            'boxed': st_1A2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_802: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1A3);
        /* IL_807: ldc.i8 68719476735*/
        st_1A5 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_810: ldc.i4 -269488144*/
        st_1A4 = (-269488144|0);
        /* IL_815: conv.i8 */
        st_1A6 = conv_i8(st_1A4);
        /* IL_816: call Int64 Add(System.Int64, System.Int64)*/
        st_1A7 = (asm1.x600000e)(st_1A5,st_1A6);
        /* IL_81B: box System.Int64*/
        st_1A8 = {
            'boxed': st_1A7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_820: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1A8);
        /* IL_825: ldc.i8 1099511627775*/
        st_1A9 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_82E: ldc.i8 -4311810305*/
        st_1AA = new Uint32Array([ 0xFEFEFEFF,0xFFFFFFFE ]);
        /* IL_837: call Int64 Add(System.Int64, System.Int64)*/
        st_1AB = (asm1.x600000e)(st_1A9,st_1AA);
        /* IL_83C: box System.Int64*/
        st_1AC = {
            'boxed': st_1AB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_841: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1AC);
        /* IL_846: ldc.i8 17592186044415*/
        st_1AD = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_84F: ldc.i8 -68988964880*/
        st_1AE = new Uint32Array([ 0xEFEFEFF0,0xFFFFFFEF ]);
        /* IL_858: call Int64 Add(System.Int64, System.Int64)*/
        st_1AF = (asm1.x600000e)(st_1AD,st_1AE);
        /* IL_85D: box System.Int64*/
        st_1B0 = {
            'boxed': st_1AF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_862: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1B0);
        /* IL_867: ldc.i8 281474976710655*/
        st_1B1 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_870: ldc.i8 -1103823438081*/
        st_1B2 = new Uint32Array([ 0xFEFEFEFF,0xFFFFFEFE ]);
        /* IL_879: call Int64 Add(System.Int64, System.Int64)*/
        st_1B3 = (asm1.x600000e)(st_1B1,st_1B2);
        /* IL_87E: box System.Int64*/
        st_1B4 = {
            'boxed': st_1B3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_883: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1B4);
        /* IL_888: ldc.i8 4503599627370495*/
        st_1B5 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_891: ldc.i8 -17661175009296*/
        st_1B6 = new Uint32Array([ 0xEFEFEFF0,0xFFFFEFEF ]);
        /* IL_89A: call Int64 Add(System.Int64, System.Int64)*/
        st_1B7 = (asm1.x600000e)(st_1B5,st_1B6);
        /* IL_89F: box System.Int64*/
        st_1B8 = {
            'boxed': st_1B7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_8A4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1B8);
        /* IL_8A9: ldc.i8 72057594037927935*/
        st_1B9 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_8B2: ldc.i8 -282578800148737*/
        st_1BA = new Uint32Array([ 0xFEFEFEFF,0xFFFEFEFE ]);
        /* IL_8BB: call Int64 Add(System.Int64, System.Int64)*/
        st_1BB = (asm1.x600000e)(st_1B9,st_1BA);
        /* IL_8C0: box System.Int64*/
        st_1BC = {
            'boxed': st_1BB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_8C5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1BC);
        /* IL_8CA: ldstr Sub 1*/
        st_1BD = new_string("Sub 1");
        /* IL_8CF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1BD);
        /* IL_8D4: ldc.i4.s 15*/
        st_1BE = (15|0);
        /* IL_8D6: conv.i8 */
        st_1C0 = conv_i8(st_1BE);
        /* IL_8D7: ldc.i4.1 */
        st_1BF = (1|0);
        /* IL_8D8: conv.i8 */
        st_1C1 = conv_i8(st_1BF);
        /* IL_8D9: call Int64 Sub(System.Int64, System.Int64)*/
        st_1C2 = (asm1.x600000f)(st_1C0,st_1C1);
        /* IL_8DE: box System.Int64*/
        st_1C3 = {
            'boxed': st_1C2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_8E3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1C3);
        /* IL_8E8: ldc.i4 255*/
        st_1C4 = (255|0);
        /* IL_8ED: conv.i8 */
        st_1C6 = conv_i8(st_1C4);
        /* IL_8EE: ldc.i4.1 */
        st_1C5 = (1|0);
        /* IL_8EF: conv.i8 */
        st_1C7 = conv_i8(st_1C5);
        /* IL_8F0: call Int64 Sub(System.Int64, System.Int64)*/
        st_1C8 = (asm1.x600000f)(st_1C6,st_1C7);
        /* IL_8F5: box System.Int64*/
        st_1C9 = {
            'boxed': st_1C8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_8FA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1C9);
        /* IL_8FF: ldc.i4 4095*/
        st_1CA = (4095|0);
        /* IL_904: conv.i8 */
        st_1CC = conv_i8(st_1CA);
        /* IL_905: ldc.i4.1 */
        st_1CB = (1|0);
        /* IL_906: conv.i8 */
        st_1CD = conv_i8(st_1CB);
        /* IL_907: call Int64 Sub(System.Int64, System.Int64)*/
        st_1CE = (asm1.x600000f)(st_1CC,st_1CD);
        /* IL_90C: box System.Int64*/
        st_1CF = {
            'boxed': st_1CE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_911: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1CF);
        /* IL_916: ldc.i4 65535*/
        st_1D0 = (65535|0);
        /* IL_91B: conv.i8 */
        st_1D2 = conv_i8(st_1D0);
        /* IL_91C: ldc.i4.1 */
        st_1D1 = (1|0);
        /* IL_91D: conv.i8 */
        st_1D3 = conv_i8(st_1D1);
        /* IL_91E: call Int64 Sub(System.Int64, System.Int64)*/
        st_1D4 = (asm1.x600000f)(st_1D2,st_1D3);
        /* IL_923: box System.Int64*/
        st_1D5 = {
            'boxed': st_1D4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_928: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1D5);
        /* IL_92D: ldc.i4 1048575*/
        st_1D6 = (1048575|0);
        /* IL_932: conv.i8 */
        st_1D8 = conv_i8(st_1D6);
        /* IL_933: ldc.i4.1 */
        st_1D7 = (1|0);
        /* IL_934: conv.i8 */
        st_1D9 = conv_i8(st_1D7);
        /* IL_935: call Int64 Sub(System.Int64, System.Int64)*/
        st_1DA = (asm1.x600000f)(st_1D8,st_1D9);
        /* IL_93A: box System.Int64*/
        st_1DB = {
            'boxed': st_1DA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_93F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1DB);
        /* IL_944: ldc.i4 16777215*/
        st_1DC = (16777215|0);
        /* IL_949: conv.i8 */
        st_1DE = conv_i8(st_1DC);
        /* IL_94A: ldc.i4.1 */
        st_1DD = (1|0);
        /* IL_94B: conv.i8 */
        st_1DF = conv_i8(st_1DD);
        /* IL_94C: call Int64 Sub(System.Int64, System.Int64)*/
        st_1E0 = (asm1.x600000f)(st_1DE,st_1DF);
        /* IL_951: box System.Int64*/
        st_1E1 = {
            'boxed': st_1E0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_956: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1E1);
        /* IL_95B: ldc.i4 268435455*/
        st_1E2 = (268435455|0);
        /* IL_960: conv.i8 */
        st_1E4 = conv_i8(st_1E2);
        /* IL_961: ldc.i4.1 */
        st_1E3 = (1|0);
        /* IL_962: conv.i8 */
        st_1E5 = conv_i8(st_1E3);
        /* IL_963: call Int64 Sub(System.Int64, System.Int64)*/
        st_1E6 = (asm1.x600000f)(st_1E4,st_1E5);
        /* IL_968: box System.Int64*/
        st_1E7 = {
            'boxed': st_1E6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_96D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1E7);
        /* IL_972: ldc.i4.m1 */
        st_1E8 = (-1|0);
        /* IL_973: conv.u8 */
        st_1EA = conv_u8(st_1E8);
        /* IL_974: ldc.i4.1 */
        st_1E9 = (1|0);
        /* IL_975: conv.i8 */
        st_1EB = conv_i8(st_1E9);
        /* IL_976: call Int64 Sub(System.Int64, System.Int64)*/
        st_1EC = (asm1.x600000f)(st_1EA,st_1EB);
        /* IL_97B: box System.Int64*/
        st_1ED = {
            'boxed': st_1EC,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_980: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1ED);
        /* IL_985: ldc.i8 68719476735*/
        st_1EF = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_98E: ldc.i4.1 */
        st_1EE = (1|0);
        /* IL_98F: conv.i8 */
        st_1F0 = conv_i8(st_1EE);
        /* IL_990: call Int64 Sub(System.Int64, System.Int64)*/
        st_1F1 = (asm1.x600000f)(st_1EF,st_1F0);
        /* IL_995: box System.Int64*/
        st_1F2 = {
            'boxed': st_1F1,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_99A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1F2);
        /* IL_99F: ldc.i8 1099511627775*/
        st_1F4 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_9A8: ldc.i4.1 */
        st_1F3 = (1|0);
        /* IL_9A9: conv.i8 */
        st_1F5 = conv_i8(st_1F3);
        /* IL_9AA: call Int64 Sub(System.Int64, System.Int64)*/
        st_1F6 = (asm1.x600000f)(st_1F4,st_1F5);
        /* IL_9AF: box System.Int64*/
        st_1F7 = {
            'boxed': st_1F6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_9B4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1F7);
        /* IL_9B9: ldc.i8 17592186044415*/
        st_1F9 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_9C2: ldc.i4.1 */
        st_1F8 = (1|0);
        /* IL_9C3: conv.i8 */
        st_1FA = conv_i8(st_1F8);
        /* IL_9C4: call Int64 Sub(System.Int64, System.Int64)*/
        st_1FB = (asm1.x600000f)(st_1F9,st_1FA);
        /* IL_9C9: box System.Int64*/
        st_1FC = {
            'boxed': st_1FB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_9CE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1FC);
        /* IL_9D3: ldc.i8 281474976710655*/
        st_1FE = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_9DC: ldc.i4.1 */
        st_1FD = (1|0);
        /* IL_9DD: conv.i8 */
        st_1FF = conv_i8(st_1FD);
        /* IL_9DE: call Int64 Sub(System.Int64, System.Int64)*/
        st_200 = (asm1.x600000f)(st_1FE,st_1FF);
        /* IL_9E3: box System.Int64*/
        st_201 = {
            'boxed': st_200,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_9E8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_201);
        /* IL_9ED: ldc.i8 4503599627370495*/
        st_203 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_9F6: ldc.i4.1 */
        st_202 = (1|0);
        /* IL_9F7: conv.i8 */
        st_204 = conv_i8(st_202);
        /* IL_9F8: call Int64 Sub(System.Int64, System.Int64)*/
        st_205 = (asm1.x600000f)(st_203,st_204);
        /* IL_9FD: box System.Int64*/
        st_206 = {
            'boxed': st_205,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A02: call Void Log(System.Object)*/
        (asm1.x6000001)(st_206);
        /* IL_A07: ldc.i8 72057594037927935*/
        st_208 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_A10: ldc.i4.1 */
        st_207 = (1|0);
        /* IL_A11: conv.i8 */
        st_209 = conv_i8(st_207);
        /* IL_A12: call Int64 Sub(System.Int64, System.Int64)*/
        st_20A = (asm1.x600000f)(st_208,st_209);
        /* IL_A17: box System.Int64*/
        st_20B = {
            'boxed': st_20A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A1C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_20B);
        /* IL_A21: ldstr Sub -1*/
        st_20C = new_string("Sub -1");
        /* IL_A26: call Void Log(System.Object)*/
        (asm1.x6000001)(st_20C);
        /* IL_A2B: ldc.i4.s 15*/
        st_20D = (15|0);
        /* IL_A2D: conv.i8 */
        st_20F = conv_i8(st_20D);
        /* IL_A2E: ldc.i4.m1 */
        st_20E = (-1|0);
        /* IL_A2F: conv.i8 */
        st_210 = conv_i8(st_20E);
        /* IL_A30: call Int64 Sub(System.Int64, System.Int64)*/
        st_211 = (asm1.x600000f)(st_20F,st_210);
        /* IL_A35: box System.Int64*/
        st_212 = {
            'boxed': st_211,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A3A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_212);
        /* IL_A3F: ldc.i4 255*/
        st_213 = (255|0);
        /* IL_A44: conv.i8 */
        st_215 = conv_i8(st_213);
        /* IL_A45: ldc.i4.m1 */
        st_214 = (-1|0);
        /* IL_A46: conv.i8 */
        st_216 = conv_i8(st_214);
        /* IL_A47: call Int64 Sub(System.Int64, System.Int64)*/
        st_217 = (asm1.x600000f)(st_215,st_216);
        /* IL_A4C: box System.Int64*/
        st_218 = {
            'boxed': st_217,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A51: call Void Log(System.Object)*/
        (asm1.x6000001)(st_218);
        /* IL_A56: ldc.i4 4095*/
        st_219 = (4095|0);
        /* IL_A5B: conv.i8 */
        st_21B = conv_i8(st_219);
        /* IL_A5C: ldc.i4.m1 */
        st_21A = (-1|0);
        /* IL_A5D: conv.i8 */
        st_21C = conv_i8(st_21A);
        /* IL_A5E: call Int64 Sub(System.Int64, System.Int64)*/
        st_21D = (asm1.x600000f)(st_21B,st_21C);
        /* IL_A63: box System.Int64*/
        st_21E = {
            'boxed': st_21D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A68: call Void Log(System.Object)*/
        (asm1.x6000001)(st_21E);
        /* IL_A6D: ldc.i4 65535*/
        st_21F = (65535|0);
        /* IL_A72: conv.i8 */
        st_221 = conv_i8(st_21F);
        /* IL_A73: ldc.i4.m1 */
        st_220 = (-1|0);
        /* IL_A74: conv.i8 */
        st_222 = conv_i8(st_220);
        /* IL_A75: call Int64 Sub(System.Int64, System.Int64)*/
        st_223 = (asm1.x600000f)(st_221,st_222);
        /* IL_A7A: box System.Int64*/
        st_224 = {
            'boxed': st_223,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A7F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_224);
        /* IL_A84: ldc.i4 1048575*/
        st_225 = (1048575|0);
        /* IL_A89: conv.i8 */
        st_227 = conv_i8(st_225);
        /* IL_A8A: ldc.i4.m1 */
        st_226 = (-1|0);
        /* IL_A8B: conv.i8 */
        st_228 = conv_i8(st_226);
        /* IL_A8C: call Int64 Sub(System.Int64, System.Int64)*/
        st_229 = (asm1.x600000f)(st_227,st_228);
        /* IL_A91: box System.Int64*/
        st_22A = {
            'boxed': st_229,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_A96: call Void Log(System.Object)*/
        (asm1.x6000001)(st_22A);
        /* IL_A9B: ldc.i4 16777215*/
        st_22B = (16777215|0);
        /* IL_AA0: conv.i8 */
        st_22D = conv_i8(st_22B);
        /* IL_AA1: ldc.i4.m1 */
        st_22C = (-1|0);
        /* IL_AA2: conv.i8 */
        st_22E = conv_i8(st_22C);
        /* IL_AA3: call Int64 Sub(System.Int64, System.Int64)*/
        st_22F = (asm1.x600000f)(st_22D,st_22E);
        /* IL_AA8: box System.Int64*/
        st_230 = {
            'boxed': st_22F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_AAD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_230);
        /* IL_AB2: ldc.i4 268435455*/
        st_231 = (268435455|0);
        /* IL_AB7: conv.i8 */
        st_233 = conv_i8(st_231);
        /* IL_AB8: ldc.i4.m1 */
        st_232 = (-1|0);
        /* IL_AB9: conv.i8 */
        st_234 = conv_i8(st_232);
        /* IL_ABA: call Int64 Sub(System.Int64, System.Int64)*/
        st_235 = (asm1.x600000f)(st_233,st_234);
        /* IL_ABF: box System.Int64*/
        st_236 = {
            'boxed': st_235,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_AC4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_236);
        /* IL_AC9: ldc.i4.m1 */
        st_237 = (-1|0);
        /* IL_ACA: conv.u8 */
        st_239 = conv_u8(st_237);
        /* IL_ACB: ldc.i4.m1 */
        st_238 = (-1|0);
        /* IL_ACC: conv.i8 */
        st_23A = conv_i8(st_238);
        /* IL_ACD: call Int64 Sub(System.Int64, System.Int64)*/
        st_23B = (asm1.x600000f)(st_239,st_23A);
        /* IL_AD2: box System.Int64*/
        st_23C = {
            'boxed': st_23B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_AD7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_23C);
        /* IL_ADC: ldc.i8 68719476735*/
        st_23E = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_AE5: ldc.i4.m1 */
        st_23D = (-1|0);
        /* IL_AE6: conv.i8 */
        st_23F = conv_i8(st_23D);
        /* IL_AE7: call Int64 Sub(System.Int64, System.Int64)*/
        st_240 = (asm1.x600000f)(st_23E,st_23F);
        /* IL_AEC: box System.Int64*/
        st_241 = {
            'boxed': st_240,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_AF1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_241);
        /* IL_AF6: ldc.i8 1099511627775*/
        st_243 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_AFF: ldc.i4.m1 */
        st_242 = (-1|0);
        /* IL_B00: conv.i8 */
        st_244 = conv_i8(st_242);
        /* IL_B01: call Int64 Sub(System.Int64, System.Int64)*/
        st_245 = (asm1.x600000f)(st_243,st_244);
        /* IL_B06: box System.Int64*/
        st_246 = {
            'boxed': st_245,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_B0B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_246);
        /* IL_B10: ldc.i8 17592186044415*/
        st_248 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_B19: ldc.i4.m1 */
        st_247 = (-1|0);
        /* IL_B1A: conv.i8 */
        st_249 = conv_i8(st_247);
        /* IL_B1B: call Int64 Sub(System.Int64, System.Int64)*/
        st_24A = (asm1.x600000f)(st_248,st_249);
        /* IL_B20: box System.Int64*/
        st_24B = {
            'boxed': st_24A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_B25: call Void Log(System.Object)*/
        (asm1.x6000001)(st_24B);
        /* IL_B2A: ldc.i8 281474976710655*/
        st_24D = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_B33: ldc.i4.m1 */
        st_24C = (-1|0);
        /* IL_B34: conv.i8 */
        st_24E = conv_i8(st_24C);
        /* IL_B35: call Int64 Sub(System.Int64, System.Int64)*/
        st_24F = (asm1.x600000f)(st_24D,st_24E);
        /* IL_B3A: box System.Int64*/
        st_250 = {
            'boxed': st_24F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_B3F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_250);
        /* IL_B44: ldc.i8 4503599627370495*/
        st_252 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_B4D: ldc.i4.m1 */
        st_251 = (-1|0);
        /* IL_B4E: conv.i8 */
        st_253 = conv_i8(st_251);
        /* IL_B4F: call Int64 Sub(System.Int64, System.Int64)*/
        st_254 = (asm1.x600000f)(st_252,st_253);
        /* IL_B54: box System.Int64*/
        st_255 = {
            'boxed': st_254,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_B59: call Void Log(System.Object)*/
        (asm1.x6000001)(st_255);
        /* IL_B5E: ldc.i8 72057594037927935*/
        st_257 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_B67: ldc.i4.m1 */
        st_256 = (-1|0);
        /* IL_B68: conv.i8 */
        st_258 = conv_i8(st_256);
        /* IL_B69: call Int64 Sub(System.Int64, System.Int64)*/
        st_259 = (asm1.x600000f)(st_257,st_258);
        /* IL_B6E: box System.Int64*/
        st_25A = {
            'boxed': st_259,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_B73: call Void Log(System.Object)*/
        (asm1.x6000001)(st_25A);
        /* IL_B78: ldstr Sub 2*/
        st_25B = new_string("Sub 2");
        /* IL_B7D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_25B);
        /* IL_B82: ldc.i4.s 15*/
        st_25C = (15|0);
        /* IL_B84: conv.i8 */
        st_25E = conv_i8(st_25C);
        /* IL_B85: ldc.i4.2 */
        st_25D = (2|0);
        /* IL_B86: conv.i8 */
        st_25F = conv_i8(st_25D);
        /* IL_B87: call Int64 Sub(System.Int64, System.Int64)*/
        st_260 = (asm1.x600000f)(st_25E,st_25F);
        /* IL_B8C: box System.Int64*/
        st_261 = {
            'boxed': st_260,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_B91: call Void Log(System.Object)*/
        (asm1.x6000001)(st_261);
        /* IL_B96: ldc.i4 255*/
        st_262 = (255|0);
        /* IL_B9B: conv.i8 */
        st_264 = conv_i8(st_262);
        /* IL_B9C: ldc.i4.2 */
        st_263 = (2|0);
        /* IL_B9D: conv.i8 */
        st_265 = conv_i8(st_263);
        /* IL_B9E: call Int64 Sub(System.Int64, System.Int64)*/
        st_266 = (asm1.x600000f)(st_264,st_265);
        /* IL_BA3: box System.Int64*/
        st_267 = {
            'boxed': st_266,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_BA8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_267);
        /* IL_BAD: ldc.i4 4095*/
        st_268 = (4095|0);
        /* IL_BB2: conv.i8 */
        st_26A = conv_i8(st_268);
        /* IL_BB3: ldc.i4.2 */
        st_269 = (2|0);
        /* IL_BB4: conv.i8 */
        st_26B = conv_i8(st_269);
        /* IL_BB5: call Int64 Sub(System.Int64, System.Int64)*/
        st_26C = (asm1.x600000f)(st_26A,st_26B);
        /* IL_BBA: box System.Int64*/
        st_26D = {
            'boxed': st_26C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_BBF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_26D);
        /* IL_BC4: ldc.i4 65535*/
        st_26E = (65535|0);
        /* IL_BC9: conv.i8 */
        st_270 = conv_i8(st_26E);
        /* IL_BCA: ldc.i4.2 */
        st_26F = (2|0);
        /* IL_BCB: conv.i8 */
        st_271 = conv_i8(st_26F);
        /* IL_BCC: call Int64 Sub(System.Int64, System.Int64)*/
        st_272 = (asm1.x600000f)(st_270,st_271);
        /* IL_BD1: box System.Int64*/
        st_273 = {
            'boxed': st_272,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_BD6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_273);
        /* IL_BDB: ldc.i4 1048575*/
        st_274 = (1048575|0);
        /* IL_BE0: conv.i8 */
        st_276 = conv_i8(st_274);
        /* IL_BE1: ldc.i4.2 */
        st_275 = (2|0);
        /* IL_BE2: conv.i8 */
        st_277 = conv_i8(st_275);
        /* IL_BE3: call Int64 Sub(System.Int64, System.Int64)*/
        st_278 = (asm1.x600000f)(st_276,st_277);
        /* IL_BE8: box System.Int64*/
        st_279 = {
            'boxed': st_278,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_BED: call Void Log(System.Object)*/
        (asm1.x6000001)(st_279);
        /* IL_BF2: ldc.i4 16777215*/
        st_27A = (16777215|0);
        /* IL_BF7: conv.i8 */
        st_27C = conv_i8(st_27A);
        /* IL_BF8: ldc.i4.2 */
        st_27B = (2|0);
        /* IL_BF9: conv.i8 */
        st_27D = conv_i8(st_27B);
        /* IL_BFA: call Int64 Sub(System.Int64, System.Int64)*/
        st_27E = (asm1.x600000f)(st_27C,st_27D);
        /* IL_BFF: box System.Int64*/
        st_27F = {
            'boxed': st_27E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C04: call Void Log(System.Object)*/
        (asm1.x6000001)(st_27F);
        /* IL_C09: ldc.i4 268435455*/
        st_280 = (268435455|0);
        /* IL_C0E: conv.i8 */
        st_282 = conv_i8(st_280);
        /* IL_C0F: ldc.i4.2 */
        st_281 = (2|0);
        /* IL_C10: conv.i8 */
        st_283 = conv_i8(st_281);
        /* IL_C11: call Int64 Sub(System.Int64, System.Int64)*/
        st_284 = (asm1.x600000f)(st_282,st_283);
        /* IL_C16: box System.Int64*/
        st_285 = {
            'boxed': st_284,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C1B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_285);
        /* IL_C20: ldc.i4.m1 */
        st_286 = (-1|0);
        /* IL_C21: conv.u8 */
        st_288 = conv_u8(st_286);
        /* IL_C22: ldc.i4.2 */
        st_287 = (2|0);
        /* IL_C23: conv.i8 */
        st_289 = conv_i8(st_287);
        /* IL_C24: call Int64 Sub(System.Int64, System.Int64)*/
        st_28A = (asm1.x600000f)(st_288,st_289);
        /* IL_C29: box System.Int64*/
        st_28B = {
            'boxed': st_28A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C2E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_28B);
        /* IL_C33: ldc.i8 68719476735*/
        st_28D = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_C3C: ldc.i4.2 */
        st_28C = (2|0);
        /* IL_C3D: conv.i8 */
        st_28E = conv_i8(st_28C);
        /* IL_C3E: call Int64 Sub(System.Int64, System.Int64)*/
        st_28F = (asm1.x600000f)(st_28D,st_28E);
        /* IL_C43: box System.Int64*/
        st_290 = {
            'boxed': st_28F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C48: call Void Log(System.Object)*/
        (asm1.x6000001)(st_290);
        /* IL_C4D: ldc.i8 1099511627775*/
        st_292 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_C56: ldc.i4.2 */
        st_291 = (2|0);
        /* IL_C57: conv.i8 */
        st_293 = conv_i8(st_291);
        /* IL_C58: call Int64 Sub(System.Int64, System.Int64)*/
        st_294 = (asm1.x600000f)(st_292,st_293);
        /* IL_C5D: box System.Int64*/
        st_295 = {
            'boxed': st_294,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C62: call Void Log(System.Object)*/
        (asm1.x6000001)(st_295);
        /* IL_C67: ldc.i8 17592186044415*/
        st_297 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_C70: ldc.i4.2 */
        st_296 = (2|0);
        /* IL_C71: conv.i8 */
        st_298 = conv_i8(st_296);
        /* IL_C72: call Int64 Sub(System.Int64, System.Int64)*/
        st_299 = (asm1.x600000f)(st_297,st_298);
        /* IL_C77: box System.Int64*/
        st_29A = {
            'boxed': st_299,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C7C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_29A);
        /* IL_C81: ldc.i8 281474976710655*/
        st_29C = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_C8A: ldc.i4.2 */
        st_29B = (2|0);
        /* IL_C8B: conv.i8 */
        st_29D = conv_i8(st_29B);
        /* IL_C8C: call Int64 Sub(System.Int64, System.Int64)*/
        st_29E = (asm1.x600000f)(st_29C,st_29D);
        /* IL_C91: box System.Int64*/
        st_29F = {
            'boxed': st_29E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_C96: call Void Log(System.Object)*/
        (asm1.x6000001)(st_29F);
        /* IL_C9B: ldc.i8 4503599627370495*/
        st_2A1 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_CA4: ldc.i4.2 */
        st_2A0 = (2|0);
        /* IL_CA5: conv.i8 */
        st_2A2 = conv_i8(st_2A0);
        /* IL_CA6: call Int64 Sub(System.Int64, System.Int64)*/
        st_2A3 = (asm1.x600000f)(st_2A1,st_2A2);
        /* IL_CAB: box System.Int64*/
        st_2A4 = {
            'boxed': st_2A3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_CB0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2A4);
        /* IL_CB5: ldc.i8 72057594037927935*/
        st_2A6 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_CBE: ldc.i4.2 */
        st_2A5 = (2|0);
        /* IL_CBF: conv.i8 */
        st_2A7 = conv_i8(st_2A5);
        /* IL_CC0: call Int64 Sub(System.Int64, System.Int64)*/
        st_2A8 = (asm1.x600000f)(st_2A6,st_2A7);
        /* IL_CC5: box System.Int64*/
        st_2A9 = {
            'boxed': st_2A8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_CCA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2A9);
        /* IL_CCF: ldstr Sub -2*/
        st_2AA = new_string("Sub -2");
        /* IL_CD4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2AA);
        /* IL_CD9: ldc.i4.s 15*/
        st_2AB = (15|0);
        /* IL_CDB: conv.i8 */
        st_2AD = conv_i8(st_2AB);
        /* IL_CDC: ldc.i4.s 254*/
        st_2AC = (-2|0);
        /* IL_CDE: conv.i8 */
        st_2AE = conv_i8(st_2AC);
        /* IL_CDF: call Int64 Sub(System.Int64, System.Int64)*/
        st_2AF = (asm1.x600000f)(st_2AD,st_2AE);
        /* IL_CE4: box System.Int64*/
        st_2B0 = {
            'boxed': st_2AF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_CE9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2B0);
        /* IL_CEE: ldc.i4 255*/
        st_2B1 = (255|0);
        /* IL_CF3: conv.i8 */
        st_2B3 = conv_i8(st_2B1);
        /* IL_CF4: ldc.i4.s 254*/
        st_2B2 = (-2|0);
        /* IL_CF6: conv.i8 */
        st_2B4 = conv_i8(st_2B2);
        /* IL_CF7: call Int64 Sub(System.Int64, System.Int64)*/
        st_2B5 = (asm1.x600000f)(st_2B3,st_2B4);
        /* IL_CFC: box System.Int64*/
        st_2B6 = {
            'boxed': st_2B5,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D01: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2B6);
        /* IL_D06: ldc.i4 4095*/
        st_2B7 = (4095|0);
        /* IL_D0B: conv.i8 */
        st_2B9 = conv_i8(st_2B7);
        /* IL_D0C: ldc.i4.s 254*/
        st_2B8 = (-2|0);
        /* IL_D0E: conv.i8 */
        st_2BA = conv_i8(st_2B8);
        /* IL_D0F: call Int64 Sub(System.Int64, System.Int64)*/
        st_2BB = (asm1.x600000f)(st_2B9,st_2BA);
        /* IL_D14: box System.Int64*/
        st_2BC = {
            'boxed': st_2BB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D19: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2BC);
        /* IL_D1E: ldc.i4 65535*/
        st_2BD = (65535|0);
        /* IL_D23: conv.i8 */
        st_2BF = conv_i8(st_2BD);
        /* IL_D24: ldc.i4.s 254*/
        st_2BE = (-2|0);
        /* IL_D26: conv.i8 */
        st_2C0 = conv_i8(st_2BE);
        /* IL_D27: call Int64 Sub(System.Int64, System.Int64)*/
        st_2C1 = (asm1.x600000f)(st_2BF,st_2C0);
        /* IL_D2C: box System.Int64*/
        st_2C2 = {
            'boxed': st_2C1,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D31: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2C2);
        /* IL_D36: ldc.i4 1048575*/
        st_2C3 = (1048575|0);
        /* IL_D3B: conv.i8 */
        st_2C5 = conv_i8(st_2C3);
        /* IL_D3C: ldc.i4.s 254*/
        st_2C4 = (-2|0);
        /* IL_D3E: conv.i8 */
        st_2C6 = conv_i8(st_2C4);
        /* IL_D3F: call Int64 Sub(System.Int64, System.Int64)*/
        st_2C7 = (asm1.x600000f)(st_2C5,st_2C6);
        /* IL_D44: box System.Int64*/
        st_2C8 = {
            'boxed': st_2C7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D49: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2C8);
        /* IL_D4E: ldc.i4 16777215*/
        st_2C9 = (16777215|0);
        /* IL_D53: conv.i8 */
        st_2CB = conv_i8(st_2C9);
        /* IL_D54: ldc.i4.s 254*/
        st_2CA = (-2|0);
        /* IL_D56: conv.i8 */
        st_2CC = conv_i8(st_2CA);
        /* IL_D57: call Int64 Sub(System.Int64, System.Int64)*/
        st_2CD = (asm1.x600000f)(st_2CB,st_2CC);
        /* IL_D5C: box System.Int64*/
        st_2CE = {
            'boxed': st_2CD,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D61: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2CE);
        /* IL_D66: ldc.i4 268435455*/
        st_2CF = (268435455|0);
        /* IL_D6B: conv.i8 */
        st_2D1 = conv_i8(st_2CF);
        /* IL_D6C: ldc.i4.s 254*/
        st_2D0 = (-2|0);
        /* IL_D6E: conv.i8 */
        st_2D2 = conv_i8(st_2D0);
        /* IL_D6F: call Int64 Sub(System.Int64, System.Int64)*/
        st_2D3 = (asm1.x600000f)(st_2D1,st_2D2);
        /* IL_D74: box System.Int64*/
        st_2D4 = {
            'boxed': st_2D3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D79: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2D4);
        /* IL_D7E: ldc.i4.m1 */
        st_2D5 = (-1|0);
        /* IL_D7F: conv.u8 */
        st_2D7 = conv_u8(st_2D5);
        /* IL_D80: ldc.i4.s 254*/
        st_2D6 = (-2|0);
        /* IL_D82: conv.i8 */
        st_2D8 = conv_i8(st_2D6);
        /* IL_D83: call Int64 Sub(System.Int64, System.Int64)*/
        st_2D9 = (asm1.x600000f)(st_2D7,st_2D8);
        /* IL_D88: box System.Int64*/
        st_2DA = {
            'boxed': st_2D9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D8D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2DA);
        /* IL_D92: ldc.i8 68719476735*/
        st_2DC = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_D9B: ldc.i4.s 254*/
        st_2DB = (-2|0);
        /* IL_D9D: conv.i8 */
        st_2DD = conv_i8(st_2DB);
        /* IL_D9E: call Int64 Sub(System.Int64, System.Int64)*/
        st_2DE = (asm1.x600000f)(st_2DC,st_2DD);
        /* IL_DA3: box System.Int64*/
        st_2DF = {
            'boxed': st_2DE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_DA8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2DF);
        /* IL_DAD: ldc.i8 1099511627775*/
        st_2E1 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_DB6: ldc.i4.s 254*/
        st_2E0 = (-2|0);
        /* IL_DB8: conv.i8 */
        st_2E2 = conv_i8(st_2E0);
        /* IL_DB9: call Int64 Sub(System.Int64, System.Int64)*/
        st_2E3 = (asm1.x600000f)(st_2E1,st_2E2);
        /* IL_DBE: box System.Int64*/
        st_2E4 = {
            'boxed': st_2E3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_DC3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2E4);
        /* IL_DC8: ldc.i8 17592186044415*/
        st_2E6 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_DD1: ldc.i4.s 254*/
        st_2E5 = (-2|0);
        /* IL_DD3: conv.i8 */
        st_2E7 = conv_i8(st_2E5);
        /* IL_DD4: call Int64 Sub(System.Int64, System.Int64)*/
        st_2E8 = (asm1.x600000f)(st_2E6,st_2E7);
        /* IL_DD9: box System.Int64*/
        st_2E9 = {
            'boxed': st_2E8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_DDE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2E9);
        /* IL_DE3: ldc.i8 281474976710655*/
        st_2EB = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_DEC: ldc.i4.s 254*/
        st_2EA = (-2|0);
        /* IL_DEE: conv.i8 */
        st_2EC = conv_i8(st_2EA);
        /* IL_DEF: call Int64 Sub(System.Int64, System.Int64)*/
        st_2ED = (asm1.x600000f)(st_2EB,st_2EC);
        /* IL_DF4: box System.Int64*/
        st_2EE = {
            'boxed': st_2ED,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_DF9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2EE);
        /* IL_DFE: ldc.i8 4503599627370495*/
        st_2F0 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_E07: ldc.i4.s 254*/
        st_2EF = (-2|0);
        /* IL_E09: conv.i8 */
        st_2F1 = conv_i8(st_2EF);
        /* IL_E0A: call Int64 Sub(System.Int64, System.Int64)*/
        st_2F2 = (asm1.x600000f)(st_2F0,st_2F1);
        /* IL_E0F: box System.Int64*/
        st_2F3 = {
            'boxed': st_2F2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E14: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2F3);
        /* IL_E19: ldc.i8 72057594037927935*/
        st_2F5 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_E22: ldc.i4.s 254*/
        st_2F4 = (-2|0);
        /* IL_E24: conv.i8 */
        st_2F6 = conv_i8(st_2F4);
        /* IL_E25: call Int64 Sub(System.Int64, System.Int64)*/
        st_2F7 = (asm1.x600000f)(st_2F5,st_2F6);
        /* IL_E2A: box System.Int64*/
        st_2F8 = {
            'boxed': st_2F7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E2F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2F8);
        /* IL_E34: ldstr Sub 0x1, 0x010, 0x0101 etc*/
        st_2F9 = new_string("Sub 0x1, 0x010, 0x0101 etc");
        /* IL_E39: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2F9);
        /* IL_E3E: ldc.i4.s 15*/
        st_2FA = (15|0);
        /* IL_E40: conv.i8 */
        st_2FC = conv_i8(st_2FA);
        /* IL_E41: ldc.i4.0 */
        st_2FB = (0|0);
        /* IL_E42: conv.i8 */
        st_2FD = conv_i8(st_2FB);
        /* IL_E43: call Int64 Sub(System.Int64, System.Int64)*/
        st_2FE = (asm1.x600000f)(st_2FC,st_2FD);
        /* IL_E48: box System.Int64*/
        st_2FF = {
            'boxed': st_2FE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E4D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2FF);
        /* IL_E52: ldc.i4 255*/
        st_300 = (255|0);
        /* IL_E57: conv.i8 */
        st_302 = conv_i8(st_300);
        /* IL_E58: ldc.i4.1 */
        st_301 = (1|0);
        /* IL_E59: conv.i8 */
        st_303 = conv_i8(st_301);
        /* IL_E5A: call Int64 Sub(System.Int64, System.Int64)*/
        st_304 = (asm1.x600000f)(st_302,st_303);
        /* IL_E5F: box System.Int64*/
        st_305 = {
            'boxed': st_304,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E64: call Void Log(System.Object)*/
        (asm1.x6000001)(st_305);
        /* IL_E69: ldc.i4 4095*/
        st_306 = (4095|0);
        /* IL_E6E: conv.i8 */
        st_308 = conv_i8(st_306);
        /* IL_E6F: ldc.i4.s 16*/
        st_307 = (16|0);
        /* IL_E71: conv.i8 */
        st_309 = conv_i8(st_307);
        /* IL_E72: call Int64 Sub(System.Int64, System.Int64)*/
        st_30A = (asm1.x600000f)(st_308,st_309);
        /* IL_E77: box System.Int64*/
        st_30B = {
            'boxed': st_30A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E7C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_30B);
        /* IL_E81: ldc.i4 65535*/
        st_30C = (65535|0);
        /* IL_E86: conv.i8 */
        st_30E = conv_i8(st_30C);
        /* IL_E87: ldc.i4 257*/
        st_30D = (257|0);
        /* IL_E8C: conv.i8 */
        st_30F = conv_i8(st_30D);
        /* IL_E8D: call Int64 Sub(System.Int64, System.Int64)*/
        st_310 = (asm1.x600000f)(st_30E,st_30F);
        /* IL_E92: box System.Int64*/
        st_311 = {
            'boxed': st_310,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E97: call Void Log(System.Object)*/
        (asm1.x6000001)(st_311);
        /* IL_E9C: ldc.i4 1048575*/
        st_312 = (1048575|0);
        /* IL_EA1: conv.i8 */
        st_314 = conv_i8(st_312);
        /* IL_EA2: ldc.i4 4112*/
        st_313 = (4112|0);
        /* IL_EA7: conv.i8 */
        st_315 = conv_i8(st_313);
        /* IL_EA8: call Int64 Sub(System.Int64, System.Int64)*/
        st_316 = (asm1.x600000f)(st_314,st_315);
        /* IL_EAD: box System.Int64*/
        st_317 = {
            'boxed': st_316,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_EB2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_317);
        /* IL_EB7: ldc.i4 16777215*/
        st_318 = (16777215|0);
        /* IL_EBC: conv.i8 */
        st_31A = conv_i8(st_318);
        /* IL_EBD: ldc.i4 65793*/
        st_319 = (65793|0);
        /* IL_EC2: conv.i8 */
        st_31B = conv_i8(st_319);
        /* IL_EC3: call Int64 Sub(System.Int64, System.Int64)*/
        st_31C = (asm1.x600000f)(st_31A,st_31B);
        /* IL_EC8: box System.Int64*/
        st_31D = {
            'boxed': st_31C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_ECD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_31D);
        /* IL_ED2: ldc.i4 268435455*/
        st_31E = (268435455|0);
        /* IL_ED7: conv.i8 */
        st_320 = conv_i8(st_31E);
        /* IL_ED8: ldc.i4 1052688*/
        st_31F = (1052688|0);
        /* IL_EDD: conv.i8 */
        st_321 = conv_i8(st_31F);
        /* IL_EDE: call Int64 Sub(System.Int64, System.Int64)*/
        st_322 = (asm1.x600000f)(st_320,st_321);
        /* IL_EE3: box System.Int64*/
        st_323 = {
            'boxed': st_322,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_EE8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_323);
        /* IL_EED: ldc.i4.m1 */
        st_324 = (-1|0);
        /* IL_EEE: conv.u8 */
        st_326 = conv_u8(st_324);
        /* IL_EEF: ldc.i4 16843009*/
        st_325 = (16843009|0);
        /* IL_EF4: conv.i8 */
        st_327 = conv_i8(st_325);
        /* IL_EF5: call Int64 Sub(System.Int64, System.Int64)*/
        st_328 = (asm1.x600000f)(st_326,st_327);
        /* IL_EFA: box System.Int64*/
        st_329 = {
            'boxed': st_328,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_EFF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_329);
        /* IL_F04: ldc.i8 68719476735*/
        st_32B = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_F0D: ldc.i4 269488144*/
        st_32A = (269488144|0);
        /* IL_F12: conv.i8 */
        st_32C = conv_i8(st_32A);
        /* IL_F13: call Int64 Sub(System.Int64, System.Int64)*/
        st_32D = (asm1.x600000f)(st_32B,st_32C);
        /* IL_F18: box System.Int64*/
        st_32E = {
            'boxed': st_32D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_F1D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_32E);
        /* IL_F22: ldc.i8 1099511627775*/
        st_32F = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_F2B: ldc.i8 4311810305*/
        st_330 = new Uint32Array([ 0x1010101,0x1 ]);
        /* IL_F34: call Int64 Sub(System.Int64, System.Int64)*/
        st_331 = (asm1.x600000f)(st_32F,st_330);
        /* IL_F39: box System.Int64*/
        st_332 = {
            'boxed': st_331,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_F3E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_332);
        /* IL_F43: ldc.i8 17592186044415*/
        st_333 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_F4C: ldc.i8 68988964880*/
        st_334 = new Uint32Array([ 0x10101010,0x10 ]);
        /* IL_F55: call Int64 Sub(System.Int64, System.Int64)*/
        st_335 = (asm1.x600000f)(st_333,st_334);
        /* IL_F5A: box System.Int64*/
        st_336 = {
            'boxed': st_335,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_F5F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_336);
        /* IL_F64: ldc.i8 281474976710655*/
        st_337 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_F6D: ldc.i8 1103823438081*/
        st_338 = new Uint32Array([ 0x1010101,0x101 ]);
        /* IL_F76: call Int64 Sub(System.Int64, System.Int64)*/
        st_339 = (asm1.x600000f)(st_337,st_338);
        /* IL_F7B: box System.Int64*/
        st_33A = {
            'boxed': st_339,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_F80: call Void Log(System.Object)*/
        (asm1.x6000001)(st_33A);
        /* IL_F85: ldc.i8 4503599627370495*/
        st_33B = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_F8E: ldc.i8 17661175009296*/
        st_33C = new Uint32Array([ 0x10101010,0x1010 ]);
        /* IL_F97: call Int64 Sub(System.Int64, System.Int64)*/
        st_33D = (asm1.x600000f)(st_33B,st_33C);
        /* IL_F9C: box System.Int64*/
        st_33E = {
            'boxed': st_33D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_FA1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_33E);
        /* IL_FA6: ldc.i8 72057594037927935*/
        st_33F = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_FAF: ldc.i8 282578800148737*/
        st_340 = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_FB8: call Int64 Sub(System.Int64, System.Int64)*/
        st_341 = (asm1.x600000f)(st_33F,st_340);
        /* IL_FBD: box System.Int64*/
        st_342 = {
            'boxed': st_341,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_FC2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_342);
        /* IL_FC7: ldstr Sub -0x1, -0x010, -0x0101 etc*/
        st_343 = new_string("Sub -0x1, -0x010, -0x0101 etc");
        /* IL_FCC: call Void Log(System.Object)*/
        (asm1.x6000001)(st_343);
        /* IL_FD1: ldc.i4.s 15*/
        st_344 = (15|0);
        /* IL_FD3: conv.i8 */
        st_346 = conv_i8(st_344);
        /* IL_FD4: ldc.i4.0 */
        st_345 = (0|0);
        /* IL_FD5: conv.i8 */
        st_347 = conv_i8(st_345);
        /* IL_FD6: call Int64 Sub(System.Int64, System.Int64)*/
        st_348 = (asm1.x600000f)(st_346,st_347);
        /* IL_FDB: box System.Int64*/
        st_349 = {
            'boxed': st_348,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_FE0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_349);
        /* IL_FE5: ldc.i4 255*/
        st_34A = (255|0);
        /* IL_FEA: conv.i8 */
        st_34C = conv_i8(st_34A);
        /* IL_FEB: ldc.i4.m1 */
        st_34B = (-1|0);
        /* IL_FEC: conv.i8 */
        st_34D = conv_i8(st_34B);
        /* IL_FED: call Int64 Sub(System.Int64, System.Int64)*/
        st_34E = (asm1.x600000f)(st_34C,st_34D);
        /* IL_FF2: box System.Int64*/
        st_34F = {
            'boxed': st_34E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_FF7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_34F);
        /* IL_FFC: ldc.i4 4095*/
        st_350 = (4095|0);
        /* IL_1001: conv.i8 */
        st_352 = conv_i8(st_350);
        /* IL_1002: ldc.i4.s 240*/
        st_351 = (-16|0);
        /* IL_1004: conv.i8 */
        st_353 = conv_i8(st_351);
        /* IL_1005: call Int64 Sub(System.Int64, System.Int64)*/
        st_354 = (asm1.x600000f)(st_352,st_353);
        /* IL_100A: box System.Int64*/
        st_355 = {
            'boxed': st_354,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_100F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_355);
        /* IL_1014: ldc.i4 65535*/
        st_356 = (65535|0);
        /* IL_1019: conv.i8 */
        st_358 = conv_i8(st_356);
        /* IL_101A: ldc.i4 -257*/
        st_357 = (-257|0);
        /* IL_101F: conv.i8 */
        st_359 = conv_i8(st_357);
        /* IL_1020: call Int64 Sub(System.Int64, System.Int64)*/
        st_35A = (asm1.x600000f)(st_358,st_359);
        /* IL_1025: box System.Int64*/
        st_35B = {
            'boxed': st_35A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_102A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_35B);
        /* IL_102F: ldc.i4 1048575*/
        st_35C = (1048575|0);
        /* IL_1034: conv.i8 */
        st_35E = conv_i8(st_35C);
        /* IL_1035: ldc.i4 -4112*/
        st_35D = (-4112|0);
        /* IL_103A: conv.i8 */
        st_35F = conv_i8(st_35D);
        /* IL_103B: call Int64 Sub(System.Int64, System.Int64)*/
        st_360 = (asm1.x600000f)(st_35E,st_35F);
        /* IL_1040: box System.Int64*/
        st_361 = {
            'boxed': st_360,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1045: call Void Log(System.Object)*/
        (asm1.x6000001)(st_361);
        /* IL_104A: ldc.i4 16777215*/
        st_362 = (16777215|0);
        /* IL_104F: conv.i8 */
        st_364 = conv_i8(st_362);
        /* IL_1050: ldc.i4 -65793*/
        st_363 = (-65793|0);
        /* IL_1055: conv.i8 */
        st_365 = conv_i8(st_363);
        /* IL_1056: call Int64 Sub(System.Int64, System.Int64)*/
        st_366 = (asm1.x600000f)(st_364,st_365);
        /* IL_105B: box System.Int64*/
        st_367 = {
            'boxed': st_366,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1060: call Void Log(System.Object)*/
        (asm1.x6000001)(st_367);
        /* IL_1065: ldc.i4 268435455*/
        st_368 = (268435455|0);
        /* IL_106A: conv.i8 */
        st_36A = conv_i8(st_368);
        /* IL_106B: ldc.i4 -1052688*/
        st_369 = (-1052688|0);
        /* IL_1070: conv.i8 */
        st_36B = conv_i8(st_369);
        /* IL_1071: call Int64 Sub(System.Int64, System.Int64)*/
        st_36C = (asm1.x600000f)(st_36A,st_36B);
        /* IL_1076: box System.Int64*/
        st_36D = {
            'boxed': st_36C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_107B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_36D);
        /* IL_1080: ldc.i4.m1 */
        st_36E = (-1|0);
        /* IL_1081: conv.u8 */
        st_370 = conv_u8(st_36E);
        /* IL_1082: ldc.i4 -16843009*/
        st_36F = (-16843009|0);
        /* IL_1087: conv.i8 */
        st_371 = conv_i8(st_36F);
        /* IL_1088: call Int64 Sub(System.Int64, System.Int64)*/
        st_372 = (asm1.x600000f)(st_370,st_371);
        /* IL_108D: box System.Int64*/
        st_373 = {
            'boxed': st_372,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1092: call Void Log(System.Object)*/
        (asm1.x6000001)(st_373);
        /* IL_1097: ldc.i8 68719476735*/
        st_375 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_10A0: ldc.i4 -269488144*/
        st_374 = (-269488144|0);
        /* IL_10A5: conv.i8 */
        st_376 = conv_i8(st_374);
        /* IL_10A6: call Int64 Sub(System.Int64, System.Int64)*/
        st_377 = (asm1.x600000f)(st_375,st_376);
        /* IL_10AB: box System.Int64*/
        st_378 = {
            'boxed': st_377,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_10B0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_378);
        /* IL_10B5: ldc.i8 1099511627775*/
        st_379 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_10BE: ldc.i8 -4311810305*/
        st_37A = new Uint32Array([ 0xFEFEFEFF,0xFFFFFFFE ]);
        /* IL_10C7: call Int64 Sub(System.Int64, System.Int64)*/
        st_37B = (asm1.x600000f)(st_379,st_37A);
        /* IL_10CC: box System.Int64*/
        st_37C = {
            'boxed': st_37B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_10D1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_37C);
        /* IL_10D6: ldc.i8 17592186044415*/
        st_37D = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_10DF: ldc.i8 -68988964880*/
        st_37E = new Uint32Array([ 0xEFEFEFF0,0xFFFFFFEF ]);
        /* IL_10E8: call Int64 Sub(System.Int64, System.Int64)*/
        st_37F = (asm1.x600000f)(st_37D,st_37E);
        /* IL_10ED: box System.Int64*/
        st_380 = {
            'boxed': st_37F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_10F2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_380);
        /* IL_10F7: ldc.i8 281474976710655*/
        st_381 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_1100: ldc.i8 -1103823438081*/
        st_382 = new Uint32Array([ 0xFEFEFEFF,0xFFFFFEFE ]);
        /* IL_1109: call Int64 Sub(System.Int64, System.Int64)*/
        st_383 = (asm1.x600000f)(st_381,st_382);
        /* IL_110E: box System.Int64*/
        st_384 = {
            'boxed': st_383,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1113: call Void Log(System.Object)*/
        (asm1.x6000001)(st_384);
        /* IL_1118: ldc.i8 4503599627370495*/
        st_385 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1121: ldc.i8 -17661175009296*/
        st_386 = new Uint32Array([ 0xEFEFEFF0,0xFFFFEFEF ]);
        /* IL_112A: call Int64 Sub(System.Int64, System.Int64)*/
        st_387 = (asm1.x600000f)(st_385,st_386);
        /* IL_112F: box System.Int64*/
        st_388 = {
            'boxed': st_387,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1134: call Void Log(System.Object)*/
        (asm1.x6000001)(st_388);
        /* IL_1139: ldc.i8 72057594037927935*/
        st_389 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_1142: ldc.i8 -282578800148737*/
        st_38A = new Uint32Array([ 0xFEFEFEFF,0xFFFEFEFE ]);
        /* IL_114B: call Int64 Sub(System.Int64, System.Int64)*/
        st_38B = (asm1.x600000f)(st_389,st_38A);
        /* IL_1150: box System.Int64*/
        st_38C = {
            'boxed': st_38B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1155: call Void Log(System.Object)*/
        (asm1.x6000001)(st_38C);
        /* IL_115A: ldstr Mul 1*/
        st_38D = new_string("Mul 1");
        /* IL_115F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_38D);
        /* IL_1164: ldc.i4.s 15*/
        st_38E = (15|0);
        /* IL_1166: conv.i8 */
        st_390 = conv_i8(st_38E);
        /* IL_1167: ldc.i4.1 */
        st_38F = (1|0);
        /* IL_1168: conv.i8 */
        st_391 = conv_i8(st_38F);
        /* IL_1169: call Int64 Mul(System.Int64, System.Int64)*/
        st_392 = (asm1.x6000010)(st_390,st_391);
        /* IL_116E: box System.Int64*/
        st_393 = {
            'boxed': st_392,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1173: call Void Log(System.Object)*/
        (asm1.x6000001)(st_393);
        /* IL_1178: ldc.i4 255*/
        st_394 = (255|0);
        /* IL_117D: conv.i8 */
        st_396 = conv_i8(st_394);
        /* IL_117E: ldc.i4.1 */
        st_395 = (1|0);
        /* IL_117F: conv.i8 */
        st_397 = conv_i8(st_395);
        /* IL_1180: call Int64 Mul(System.Int64, System.Int64)*/
        st_398 = (asm1.x6000010)(st_396,st_397);
        /* IL_1185: box System.Int64*/
        st_399 = {
            'boxed': st_398,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_118A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_399);
        /* IL_118F: ldc.i4 4095*/
        st_39A = (4095|0);
        /* IL_1194: conv.i8 */
        st_39C = conv_i8(st_39A);
        /* IL_1195: ldc.i4.1 */
        st_39B = (1|0);
        /* IL_1196: conv.i8 */
        st_39D = conv_i8(st_39B);
        /* IL_1197: call Int64 Mul(System.Int64, System.Int64)*/
        st_39E = (asm1.x6000010)(st_39C,st_39D);
        /* IL_119C: box System.Int64*/
        st_39F = {
            'boxed': st_39E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_11A1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_39F);
        /* IL_11A6: ldc.i4 65535*/
        st_3A0 = (65535|0);
        /* IL_11AB: conv.i8 */
        st_3A2 = conv_i8(st_3A0);
        /* IL_11AC: ldc.i4.1 */
        st_3A1 = (1|0);
        /* IL_11AD: conv.i8 */
        st_3A3 = conv_i8(st_3A1);
        /* IL_11AE: call Int64 Mul(System.Int64, System.Int64)*/
        st_3A4 = (asm1.x6000010)(st_3A2,st_3A3);
        /* IL_11B3: box System.Int64*/
        st_3A5 = {
            'boxed': st_3A4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_11B8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3A5);
        /* IL_11BD: ldc.i4 1048575*/
        st_3A6 = (1048575|0);
        /* IL_11C2: conv.i8 */
        st_3A8 = conv_i8(st_3A6);
        /* IL_11C3: ldc.i4.1 */
        st_3A7 = (1|0);
        /* IL_11C4: conv.i8 */
        st_3A9 = conv_i8(st_3A7);
        /* IL_11C5: call Int64 Mul(System.Int64, System.Int64)*/
        st_3AA = (asm1.x6000010)(st_3A8,st_3A9);
        /* IL_11CA: box System.Int64*/
        st_3AB = {
            'boxed': st_3AA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_11CF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3AB);
        /* IL_11D4: ldc.i4 16777215*/
        st_3AC = (16777215|0);
        /* IL_11D9: conv.i8 */
        st_3AE = conv_i8(st_3AC);
        /* IL_11DA: ldc.i4.1 */
        st_3AD = (1|0);
        /* IL_11DB: conv.i8 */
        st_3AF = conv_i8(st_3AD);
        /* IL_11DC: call Int64 Mul(System.Int64, System.Int64)*/
        st_3B0 = (asm1.x6000010)(st_3AE,st_3AF);
        /* IL_11E1: box System.Int64*/
        st_3B1 = {
            'boxed': st_3B0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_11E6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3B1);
        /* IL_11EB: ldc.i4 268435455*/
        st_3B2 = (268435455|0);
        /* IL_11F0: conv.i8 */
        st_3B4 = conv_i8(st_3B2);
        /* IL_11F1: ldc.i4.1 */
        st_3B3 = (1|0);
        /* IL_11F2: conv.i8 */
        st_3B5 = conv_i8(st_3B3);
        /* IL_11F3: call Int64 Mul(System.Int64, System.Int64)*/
        st_3B6 = (asm1.x6000010)(st_3B4,st_3B5);
        /* IL_11F8: box System.Int64*/
        st_3B7 = {
            'boxed': st_3B6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_11FD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3B7);
        /* IL_1202: ldc.i4.m1 */
        st_3B8 = (-1|0);
        /* IL_1203: conv.u8 */
        st_3BA = conv_u8(st_3B8);
        /* IL_1204: ldc.i4.1 */
        st_3B9 = (1|0);
        /* IL_1205: conv.i8 */
        st_3BB = conv_i8(st_3B9);
        /* IL_1206: call Int64 Mul(System.Int64, System.Int64)*/
        st_3BC = (asm1.x6000010)(st_3BA,st_3BB);
        /* IL_120B: box System.Int64*/
        st_3BD = {
            'boxed': st_3BC,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1210: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3BD);
        /* IL_1215: ldc.i8 68719476735*/
        st_3BF = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_121E: ldc.i4.1 */
        st_3BE = (1|0);
        /* IL_121F: conv.i8 */
        st_3C0 = conv_i8(st_3BE);
        /* IL_1220: call Int64 Mul(System.Int64, System.Int64)*/
        st_3C1 = (asm1.x6000010)(st_3BF,st_3C0);
        /* IL_1225: box System.Int64*/
        st_3C2 = {
            'boxed': st_3C1,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_122A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3C2);
        /* IL_122F: ldc.i8 1099511627775*/
        st_3C4 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_1238: ldc.i4.1 */
        st_3C3 = (1|0);
        /* IL_1239: conv.i8 */
        st_3C5 = conv_i8(st_3C3);
        /* IL_123A: call Int64 Mul(System.Int64, System.Int64)*/
        st_3C6 = (asm1.x6000010)(st_3C4,st_3C5);
        /* IL_123F: box System.Int64*/
        st_3C7 = {
            'boxed': st_3C6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1244: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3C7);
        /* IL_1249: ldc.i8 17592186044415*/
        st_3C9 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1252: ldc.i4.1 */
        st_3C8 = (1|0);
        /* IL_1253: conv.i8 */
        st_3CA = conv_i8(st_3C8);
        /* IL_1254: call Int64 Mul(System.Int64, System.Int64)*/
        st_3CB = (asm1.x6000010)(st_3C9,st_3CA);
        /* IL_1259: box System.Int64*/
        st_3CC = {
            'boxed': st_3CB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_125E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3CC);
        /* IL_1263: ldc.i8 281474976710655*/
        st_3CE = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_126C: ldc.i4.1 */
        st_3CD = (1|0);
        /* IL_126D: conv.i8 */
        st_3CF = conv_i8(st_3CD);
        /* IL_126E: call Int64 Mul(System.Int64, System.Int64)*/
        st_3D0 = (asm1.x6000010)(st_3CE,st_3CF);
        /* IL_1273: box System.Int64*/
        st_3D1 = {
            'boxed': st_3D0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1278: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3D1);
        /* IL_127D: ldc.i8 4503599627370495*/
        st_3D3 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1286: ldc.i4.1 */
        st_3D2 = (1|0);
        /* IL_1287: conv.i8 */
        st_3D4 = conv_i8(st_3D2);
        /* IL_1288: call Int64 Mul(System.Int64, System.Int64)*/
        st_3D5 = (asm1.x6000010)(st_3D3,st_3D4);
        /* IL_128D: box System.Int64*/
        st_3D6 = {
            'boxed': st_3D5,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1292: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3D6);
        /* IL_1297: ldc.i8 72057594037927935*/
        st_3D8 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_12A0: ldc.i4.1 */
        st_3D7 = (1|0);
        /* IL_12A1: conv.i8 */
        st_3D9 = conv_i8(st_3D7);
        /* IL_12A2: call Int64 Mul(System.Int64, System.Int64)*/
        st_3DA = (asm1.x6000010)(st_3D8,st_3D9);
        /* IL_12A7: box System.Int64*/
        st_3DB = {
            'boxed': st_3DA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_12AC: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3DB);
        /* IL_12B1: ldstr Mul -1*/
        st_3DC = new_string("Mul -1");
        /* IL_12B6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3DC);
        /* IL_12BB: ldc.i4.s 15*/
        st_3DD = (15|0);
        /* IL_12BD: conv.i8 */
        st_3DF = conv_i8(st_3DD);
        /* IL_12BE: ldc.i4.m1 */
        st_3DE = (-1|0);
        /* IL_12BF: conv.i8 */
        st_3E0 = conv_i8(st_3DE);
        /* IL_12C0: call Int64 Mul(System.Int64, System.Int64)*/
        st_3E1 = (asm1.x6000010)(st_3DF,st_3E0);
        /* IL_12C5: box System.Int64*/
        st_3E2 = {
            'boxed': st_3E1,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_12CA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3E2);
        /* IL_12CF: ldc.i4 255*/
        st_3E3 = (255|0);
        /* IL_12D4: conv.i8 */
        st_3E5 = conv_i8(st_3E3);
        /* IL_12D5: ldc.i4.m1 */
        st_3E4 = (-1|0);
        /* IL_12D6: conv.i8 */
        st_3E6 = conv_i8(st_3E4);
        /* IL_12D7: call Int64 Mul(System.Int64, System.Int64)*/
        st_3E7 = (asm1.x6000010)(st_3E5,st_3E6);
        /* IL_12DC: box System.Int64*/
        st_3E8 = {
            'boxed': st_3E7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_12E1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3E8);
        /* IL_12E6: ldc.i4 4095*/
        st_3E9 = (4095|0);
        /* IL_12EB: conv.i8 */
        st_3EB = conv_i8(st_3E9);
        /* IL_12EC: ldc.i4.m1 */
        st_3EA = (-1|0);
        /* IL_12ED: conv.i8 */
        st_3EC = conv_i8(st_3EA);
        /* IL_12EE: call Int64 Mul(System.Int64, System.Int64)*/
        st_3ED = (asm1.x6000010)(st_3EB,st_3EC);
        /* IL_12F3: box System.Int64*/
        st_3EE = {
            'boxed': st_3ED,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_12F8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3EE);
        /* IL_12FD: ldc.i4 65535*/
        st_3EF = (65535|0);
        /* IL_1302: conv.i8 */
        st_3F1 = conv_i8(st_3EF);
        /* IL_1303: ldc.i4.m1 */
        st_3F0 = (-1|0);
        /* IL_1304: conv.i8 */
        st_3F2 = conv_i8(st_3F0);
        /* IL_1305: call Int64 Mul(System.Int64, System.Int64)*/
        st_3F3 = (asm1.x6000010)(st_3F1,st_3F2);
        /* IL_130A: box System.Int64*/
        st_3F4 = {
            'boxed': st_3F3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_130F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3F4);
        /* IL_1314: ldc.i4 1048575*/
        st_3F5 = (1048575|0);
        /* IL_1319: conv.i8 */
        st_3F7 = conv_i8(st_3F5);
        /* IL_131A: ldc.i4.m1 */
        st_3F6 = (-1|0);
        /* IL_131B: conv.i8 */
        st_3F8 = conv_i8(st_3F6);
        /* IL_131C: call Int64 Mul(System.Int64, System.Int64)*/
        st_3F9 = (asm1.x6000010)(st_3F7,st_3F8);
        /* IL_1321: box System.Int64*/
        st_3FA = {
            'boxed': st_3F9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1326: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3FA);
        /* IL_132B: ldc.i4 16777215*/
        st_3FB = (16777215|0);
        /* IL_1330: conv.i8 */
        st_3FD = conv_i8(st_3FB);
        /* IL_1331: ldc.i4.m1 */
        st_3FC = (-1|0);
        /* IL_1332: conv.i8 */
        st_3FE = conv_i8(st_3FC);
        /* IL_1333: call Int64 Mul(System.Int64, System.Int64)*/
        st_3FF = (asm1.x6000010)(st_3FD,st_3FE);
        /* IL_1338: box System.Int64*/
        st_400 = {
            'boxed': st_3FF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_133D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_400);
        /* IL_1342: ldc.i4 268435455*/
        st_401 = (268435455|0);
        /* IL_1347: conv.i8 */
        st_403 = conv_i8(st_401);
        /* IL_1348: ldc.i4.m1 */
        st_402 = (-1|0);
        /* IL_1349: conv.i8 */
        st_404 = conv_i8(st_402);
        /* IL_134A: call Int64 Mul(System.Int64, System.Int64)*/
        st_405 = (asm1.x6000010)(st_403,st_404);
        /* IL_134F: box System.Int64*/
        st_406 = {
            'boxed': st_405,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1354: call Void Log(System.Object)*/
        (asm1.x6000001)(st_406);
        /* IL_1359: ldc.i4.m1 */
        st_407 = (-1|0);
        /* IL_135A: conv.u8 */
        st_409 = conv_u8(st_407);
        /* IL_135B: ldc.i4.m1 */
        st_408 = (-1|0);
        /* IL_135C: conv.i8 */
        st_40A = conv_i8(st_408);
        /* IL_135D: call Int64 Mul(System.Int64, System.Int64)*/
        st_40B = (asm1.x6000010)(st_409,st_40A);
        /* IL_1362: box System.Int64*/
        st_40C = {
            'boxed': st_40B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1367: call Void Log(System.Object)*/
        (asm1.x6000001)(st_40C);
        /* IL_136C: ldc.i8 68719476735*/
        st_40E = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_1375: ldc.i4.m1 */
        st_40D = (-1|0);
        /* IL_1376: conv.i8 */
        st_40F = conv_i8(st_40D);
        /* IL_1377: call Int64 Mul(System.Int64, System.Int64)*/
        st_410 = (asm1.x6000010)(st_40E,st_40F);
        /* IL_137C: box System.Int64*/
        st_411 = {
            'boxed': st_410,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1381: call Void Log(System.Object)*/
        (asm1.x6000001)(st_411);
        /* IL_1386: ldc.i8 1099511627775*/
        st_413 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_138F: ldc.i4.m1 */
        st_412 = (-1|0);
        /* IL_1390: conv.i8 */
        st_414 = conv_i8(st_412);
        /* IL_1391: call Int64 Mul(System.Int64, System.Int64)*/
        st_415 = (asm1.x6000010)(st_413,st_414);
        /* IL_1396: box System.Int64*/
        st_416 = {
            'boxed': st_415,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_139B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_416);
        /* IL_13A0: ldc.i8 17592186044415*/
        st_418 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_13A9: ldc.i4.m1 */
        st_417 = (-1|0);
        /* IL_13AA: conv.i8 */
        st_419 = conv_i8(st_417);
        /* IL_13AB: call Int64 Mul(System.Int64, System.Int64)*/
        st_41A = (asm1.x6000010)(st_418,st_419);
        /* IL_13B0: box System.Int64*/
        st_41B = {
            'boxed': st_41A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_13B5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_41B);
        /* IL_13BA: ldc.i8 281474976710655*/
        st_41D = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_13C3: ldc.i4.m1 */
        st_41C = (-1|0);
        /* IL_13C4: conv.i8 */
        st_41E = conv_i8(st_41C);
        /* IL_13C5: call Int64 Mul(System.Int64, System.Int64)*/
        st_41F = (asm1.x6000010)(st_41D,st_41E);
        /* IL_13CA: box System.Int64*/
        st_420 = {
            'boxed': st_41F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_13CF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_420);
        /* IL_13D4: ldc.i8 4503599627370495*/
        st_422 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_13DD: ldc.i4.m1 */
        st_421 = (-1|0);
        /* IL_13DE: conv.i8 */
        st_423 = conv_i8(st_421);
        /* IL_13DF: call Int64 Mul(System.Int64, System.Int64)*/
        st_424 = (asm1.x6000010)(st_422,st_423);
        /* IL_13E4: box System.Int64*/
        st_425 = {
            'boxed': st_424,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_13E9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_425);
        /* IL_13EE: ldc.i8 72057594037927935*/
        st_427 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_13F7: ldc.i4.m1 */
        st_426 = (-1|0);
        /* IL_13F8: conv.i8 */
        st_428 = conv_i8(st_426);
        /* IL_13F9: call Int64 Mul(System.Int64, System.Int64)*/
        st_429 = (asm1.x6000010)(st_427,st_428);
        /* IL_13FE: box System.Int64*/
        st_42A = {
            'boxed': st_429,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1403: call Void Log(System.Object)*/
        (asm1.x6000001)(st_42A);
        /* IL_1408: ldstr Mul 2*/
        st_42B = new_string("Mul 2");
        /* IL_140D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_42B);
        /* IL_1412: ldc.i4.s 15*/
        st_42C = (15|0);
        /* IL_1414: conv.i8 */
        st_42E = conv_i8(st_42C);
        /* IL_1415: ldc.i4.2 */
        st_42D = (2|0);
        /* IL_1416: conv.i8 */
        st_42F = conv_i8(st_42D);
        /* IL_1417: call Int64 Mul(System.Int64, System.Int64)*/
        st_430 = (asm1.x6000010)(st_42E,st_42F);
        /* IL_141C: box System.Int64*/
        st_431 = {
            'boxed': st_430,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1421: call Void Log(System.Object)*/
        (asm1.x6000001)(st_431);
        /* IL_1426: ldc.i4 255*/
        st_432 = (255|0);
        /* IL_142B: conv.i8 */
        st_434 = conv_i8(st_432);
        /* IL_142C: ldc.i4.2 */
        st_433 = (2|0);
        /* IL_142D: conv.i8 */
        st_435 = conv_i8(st_433);
        /* IL_142E: call Int64 Mul(System.Int64, System.Int64)*/
        st_436 = (asm1.x6000010)(st_434,st_435);
        /* IL_1433: box System.Int64*/
        st_437 = {
            'boxed': st_436,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1438: call Void Log(System.Object)*/
        (asm1.x6000001)(st_437);
        /* IL_143D: ldc.i4 4095*/
        st_438 = (4095|0);
        /* IL_1442: conv.i8 */
        st_43A = conv_i8(st_438);
        /* IL_1443: ldc.i4.2 */
        st_439 = (2|0);
        /* IL_1444: conv.i8 */
        st_43B = conv_i8(st_439);
        /* IL_1445: call Int64 Mul(System.Int64, System.Int64)*/
        st_43C = (asm1.x6000010)(st_43A,st_43B);
        /* IL_144A: box System.Int64*/
        st_43D = {
            'boxed': st_43C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_144F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_43D);
        /* IL_1454: ldc.i4 65535*/
        st_43E = (65535|0);
        /* IL_1459: conv.i8 */
        st_440 = conv_i8(st_43E);
        /* IL_145A: ldc.i4.2 */
        st_43F = (2|0);
        /* IL_145B: conv.i8 */
        st_441 = conv_i8(st_43F);
        /* IL_145C: call Int64 Mul(System.Int64, System.Int64)*/
        st_442 = (asm1.x6000010)(st_440,st_441);
        /* IL_1461: box System.Int64*/
        st_443 = {
            'boxed': st_442,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1466: call Void Log(System.Object)*/
        (asm1.x6000001)(st_443);
        /* IL_146B: ldc.i4 1048575*/
        st_444 = (1048575|0);
        /* IL_1470: conv.i8 */
        st_446 = conv_i8(st_444);
        /* IL_1471: ldc.i4.2 */
        st_445 = (2|0);
        /* IL_1472: conv.i8 */
        st_447 = conv_i8(st_445);
        /* IL_1473: call Int64 Mul(System.Int64, System.Int64)*/
        st_448 = (asm1.x6000010)(st_446,st_447);
        /* IL_1478: box System.Int64*/
        st_449 = {
            'boxed': st_448,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_147D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_449);
        /* IL_1482: ldc.i4 16777215*/
        st_44A = (16777215|0);
        /* IL_1487: conv.i8 */
        st_44C = conv_i8(st_44A);
        /* IL_1488: ldc.i4.2 */
        st_44B = (2|0);
        /* IL_1489: conv.i8 */
        st_44D = conv_i8(st_44B);
        /* IL_148A: call Int64 Mul(System.Int64, System.Int64)*/
        st_44E = (asm1.x6000010)(st_44C,st_44D);
        /* IL_148F: box System.Int64*/
        st_44F = {
            'boxed': st_44E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1494: call Void Log(System.Object)*/
        (asm1.x6000001)(st_44F);
        /* IL_1499: ldc.i4 268435455*/
        st_450 = (268435455|0);
        /* IL_149E: conv.i8 */
        st_452 = conv_i8(st_450);
        /* IL_149F: ldc.i4.2 */
        st_451 = (2|0);
        /* IL_14A0: conv.i8 */
        st_453 = conv_i8(st_451);
        /* IL_14A1: call Int64 Mul(System.Int64, System.Int64)*/
        st_454 = (asm1.x6000010)(st_452,st_453);
        /* IL_14A6: box System.Int64*/
        st_455 = {
            'boxed': st_454,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_14AB: call Void Log(System.Object)*/
        (asm1.x6000001)(st_455);
        /* IL_14B0: ldc.i4.m1 */
        st_456 = (-1|0);
        /* IL_14B1: conv.u8 */
        st_458 = conv_u8(st_456);
        /* IL_14B2: ldc.i4.2 */
        st_457 = (2|0);
        /* IL_14B3: conv.i8 */
        st_459 = conv_i8(st_457);
        /* IL_14B4: call Int64 Mul(System.Int64, System.Int64)*/
        st_45A = (asm1.x6000010)(st_458,st_459);
        /* IL_14B9: box System.Int64*/
        st_45B = {
            'boxed': st_45A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_14BE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_45B);
        /* IL_14C3: ldc.i8 68719476735*/
        st_45D = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_14CC: ldc.i4.2 */
        st_45C = (2|0);
        /* IL_14CD: conv.i8 */
        st_45E = conv_i8(st_45C);
        /* IL_14CE: call Int64 Mul(System.Int64, System.Int64)*/
        st_45F = (asm1.x6000010)(st_45D,st_45E);
        /* IL_14D3: box System.Int64*/
        st_460 = {
            'boxed': st_45F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_14D8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_460);
        /* IL_14DD: ldc.i8 1099511627775*/
        st_462 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_14E6: ldc.i4.2 */
        st_461 = (2|0);
        /* IL_14E7: conv.i8 */
        st_463 = conv_i8(st_461);
        /* IL_14E8: call Int64 Mul(System.Int64, System.Int64)*/
        st_464 = (asm1.x6000010)(st_462,st_463);
        /* IL_14ED: box System.Int64*/
        st_465 = {
            'boxed': st_464,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_14F2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_465);
        /* IL_14F7: ldc.i8 17592186044415*/
        st_467 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1500: ldc.i4.2 */
        st_466 = (2|0);
        /* IL_1501: conv.i8 */
        st_468 = conv_i8(st_466);
        /* IL_1502: call Int64 Mul(System.Int64, System.Int64)*/
        st_469 = (asm1.x6000010)(st_467,st_468);
        /* IL_1507: box System.Int64*/
        st_46A = {
            'boxed': st_469,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_150C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_46A);
        /* IL_1511: ldc.i8 281474976710655*/
        st_46C = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_151A: ldc.i4.2 */
        st_46B = (2|0);
        /* IL_151B: conv.i8 */
        st_46D = conv_i8(st_46B);
        /* IL_151C: call Int64 Mul(System.Int64, System.Int64)*/
        st_46E = (asm1.x6000010)(st_46C,st_46D);
        /* IL_1521: box System.Int64*/
        st_46F = {
            'boxed': st_46E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1526: call Void Log(System.Object)*/
        (asm1.x6000001)(st_46F);
        /* IL_152B: ldc.i8 4503599627370495*/
        st_471 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1534: ldc.i4.2 */
        st_470 = (2|0);
        /* IL_1535: conv.i8 */
        st_472 = conv_i8(st_470);
        /* IL_1536: call Int64 Mul(System.Int64, System.Int64)*/
        st_473 = (asm1.x6000010)(st_471,st_472);
        /* IL_153B: box System.Int64*/
        st_474 = {
            'boxed': st_473,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1540: call Void Log(System.Object)*/
        (asm1.x6000001)(st_474);
        /* IL_1545: ldc.i8 72057594037927935*/
        st_476 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_154E: ldc.i4.2 */
        st_475 = (2|0);
        /* IL_154F: conv.i8 */
        st_477 = conv_i8(st_475);
        /* IL_1550: call Int64 Mul(System.Int64, System.Int64)*/
        st_478 = (asm1.x6000010)(st_476,st_477);
        /* IL_1555: box System.Int64*/
        st_479 = {
            'boxed': st_478,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_155A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_479);
        /* IL_155F: ldstr Mul -2*/
        st_47A = new_string("Mul -2");
        /* IL_1564: call Void Log(System.Object)*/
        (asm1.x6000001)(st_47A);
        /* IL_1569: ldc.i4.s 15*/
        st_47B = (15|0);
        /* IL_156B: conv.i8 */
        st_47D = conv_i8(st_47B);
        /* IL_156C: ldc.i4.s 254*/
        st_47C = (-2|0);
        /* IL_156E: conv.i8 */
        st_47E = conv_i8(st_47C);
        /* IL_156F: call Int64 Mul(System.Int64, System.Int64)*/
        st_47F = (asm1.x6000010)(st_47D,st_47E);
        /* IL_1574: box System.Int64*/
        st_480 = {
            'boxed': st_47F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1579: call Void Log(System.Object)*/
        (asm1.x6000001)(st_480);
        /* IL_157E: ldc.i4 255*/
        st_481 = (255|0);
        /* IL_1583: conv.i8 */
        st_483 = conv_i8(st_481);
        /* IL_1584: ldc.i4.s 254*/
        st_482 = (-2|0);
        /* IL_1586: conv.i8 */
        st_484 = conv_i8(st_482);
        /* IL_1587: call Int64 Mul(System.Int64, System.Int64)*/
        st_485 = (asm1.x6000010)(st_483,st_484);
        /* IL_158C: box System.Int64*/
        st_486 = {
            'boxed': st_485,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1591: call Void Log(System.Object)*/
        (asm1.x6000001)(st_486);
        /* IL_1596: ldc.i4 4095*/
        st_487 = (4095|0);
        /* IL_159B: conv.i8 */
        st_489 = conv_i8(st_487);
        /* IL_159C: ldc.i4.s 254*/
        st_488 = (-2|0);
        /* IL_159E: conv.i8 */
        st_48A = conv_i8(st_488);
        /* IL_159F: call Int64 Mul(System.Int64, System.Int64)*/
        st_48B = (asm1.x6000010)(st_489,st_48A);
        /* IL_15A4: box System.Int64*/
        st_48C = {
            'boxed': st_48B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_15A9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_48C);
        /* IL_15AE: ldc.i4 65535*/
        st_48D = (65535|0);
        /* IL_15B3: conv.i8 */
        st_48F = conv_i8(st_48D);
        /* IL_15B4: ldc.i4.s 254*/
        st_48E = (-2|0);
        /* IL_15B6: conv.i8 */
        st_490 = conv_i8(st_48E);
        /* IL_15B7: call Int64 Mul(System.Int64, System.Int64)*/
        st_491 = (asm1.x6000010)(st_48F,st_490);
        /* IL_15BC: box System.Int64*/
        st_492 = {
            'boxed': st_491,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_15C1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_492);
        /* IL_15C6: ldc.i4 1048575*/
        st_493 = (1048575|0);
        /* IL_15CB: conv.i8 */
        st_495 = conv_i8(st_493);
        /* IL_15CC: ldc.i4.s 254*/
        st_494 = (-2|0);
        /* IL_15CE: conv.i8 */
        st_496 = conv_i8(st_494);
        /* IL_15CF: call Int64 Mul(System.Int64, System.Int64)*/
        st_497 = (asm1.x6000010)(st_495,st_496);
        /* IL_15D4: box System.Int64*/
        st_498 = {
            'boxed': st_497,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_15D9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_498);
        /* IL_15DE: ldc.i4 16777215*/
        st_499 = (16777215|0);
        /* IL_15E3: conv.i8 */
        st_49B = conv_i8(st_499);
        /* IL_15E4: ldc.i4.s 254*/
        st_49A = (-2|0);
        /* IL_15E6: conv.i8 */
        st_49C = conv_i8(st_49A);
        /* IL_15E7: call Int64 Mul(System.Int64, System.Int64)*/
        st_49D = (asm1.x6000010)(st_49B,st_49C);
        /* IL_15EC: box System.Int64*/
        st_49E = {
            'boxed': st_49D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_15F1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_49E);
        /* IL_15F6: ldc.i4 268435455*/
        st_49F = (268435455|0);
        /* IL_15FB: conv.i8 */
        st_4A1 = conv_i8(st_49F);
        /* IL_15FC: ldc.i4.s 254*/
        st_4A0 = (-2|0);
        /* IL_15FE: conv.i8 */
        st_4A2 = conv_i8(st_4A0);
        /* IL_15FF: call Int64 Mul(System.Int64, System.Int64)*/
        st_4A3 = (asm1.x6000010)(st_4A1,st_4A2);
        /* IL_1604: box System.Int64*/
        st_4A4 = {
            'boxed': st_4A3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1609: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4A4);
        /* IL_160E: ldc.i4.m1 */
        st_4A5 = (-1|0);
        /* IL_160F: conv.u8 */
        st_4A7 = conv_u8(st_4A5);
        /* IL_1610: ldc.i4.s 254*/
        st_4A6 = (-2|0);
        /* IL_1612: conv.i8 */
        st_4A8 = conv_i8(st_4A6);
        /* IL_1613: call Int64 Mul(System.Int64, System.Int64)*/
        st_4A9 = (asm1.x6000010)(st_4A7,st_4A8);
        /* IL_1618: box System.Int64*/
        st_4AA = {
            'boxed': st_4A9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_161D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4AA);
        /* IL_1622: ldc.i8 68719476735*/
        st_4AC = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_162B: ldc.i4.s 254*/
        st_4AB = (-2|0);
        /* IL_162D: conv.i8 */
        st_4AD = conv_i8(st_4AB);
        /* IL_162E: call Int64 Mul(System.Int64, System.Int64)*/
        st_4AE = (asm1.x6000010)(st_4AC,st_4AD);
        /* IL_1633: box System.Int64*/
        st_4AF = {
            'boxed': st_4AE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1638: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4AF);
        /* IL_163D: ldc.i8 1099511627775*/
        st_4B1 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_1646: ldc.i4.s 254*/
        st_4B0 = (-2|0);
        /* IL_1648: conv.i8 */
        st_4B2 = conv_i8(st_4B0);
        /* IL_1649: call Int64 Mul(System.Int64, System.Int64)*/
        st_4B3 = (asm1.x6000010)(st_4B1,st_4B2);
        /* IL_164E: box System.Int64*/
        st_4B4 = {
            'boxed': st_4B3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1653: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4B4);
        /* IL_1658: ldc.i8 17592186044415*/
        st_4B6 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1661: ldc.i4.s 254*/
        st_4B5 = (-2|0);
        /* IL_1663: conv.i8 */
        st_4B7 = conv_i8(st_4B5);
        /* IL_1664: call Int64 Mul(System.Int64, System.Int64)*/
        st_4B8 = (asm1.x6000010)(st_4B6,st_4B7);
        /* IL_1669: box System.Int64*/
        st_4B9 = {
            'boxed': st_4B8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_166E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4B9);
        /* IL_1673: ldc.i8 281474976710655*/
        st_4BB = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_167C: ldc.i4.s 254*/
        st_4BA = (-2|0);
        /* IL_167E: conv.i8 */
        st_4BC = conv_i8(st_4BA);
        /* IL_167F: call Int64 Mul(System.Int64, System.Int64)*/
        st_4BD = (asm1.x6000010)(st_4BB,st_4BC);
        /* IL_1684: box System.Int64*/
        st_4BE = {
            'boxed': st_4BD,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1689: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4BE);
        /* IL_168E: ldc.i8 4503599627370495*/
        st_4C0 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1697: ldc.i4.s 254*/
        st_4BF = (-2|0);
        /* IL_1699: conv.i8 */
        st_4C1 = conv_i8(st_4BF);
        /* IL_169A: call Int64 Mul(System.Int64, System.Int64)*/
        st_4C2 = (asm1.x6000010)(st_4C0,st_4C1);
        /* IL_169F: box System.Int64*/
        st_4C3 = {
            'boxed': st_4C2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_16A4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4C3);
        /* IL_16A9: ldc.i8 72057594037927935*/
        st_4C5 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_16B2: ldc.i4.s 254*/
        st_4C4 = (-2|0);
        /* IL_16B4: conv.i8 */
        st_4C6 = conv_i8(st_4C4);
        /* IL_16B5: call Int64 Mul(System.Int64, System.Int64)*/
        st_4C7 = (asm1.x6000010)(st_4C5,st_4C6);
        /* IL_16BA: box System.Int64*/
        st_4C8 = {
            'boxed': st_4C7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_16BF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4C8);
        /* IL_16C4: ldstr Mul 0x1, 0x010, 0x0101 etc*/
        st_4C9 = new_string("Mul 0x1, 0x010, 0x0101 etc");
        /* IL_16C9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4C9);
        /* IL_16CE: ldc.i4.s 15*/
        st_4CA = (15|0);
        /* IL_16D0: conv.i8 */
        st_4CC = conv_i8(st_4CA);
        /* IL_16D1: ldc.i4.0 */
        st_4CB = (0|0);
        /* IL_16D2: conv.i8 */
        st_4CD = conv_i8(st_4CB);
        /* IL_16D3: call Int64 Mul(System.Int64, System.Int64)*/
        st_4CE = (asm1.x6000010)(st_4CC,st_4CD);
        /* IL_16D8: box System.Int64*/
        st_4CF = {
            'boxed': st_4CE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_16DD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4CF);
        /* IL_16E2: ldc.i4 255*/
        st_4D0 = (255|0);
        /* IL_16E7: conv.i8 */
        st_4D2 = conv_i8(st_4D0);
        /* IL_16E8: ldc.i4.1 */
        st_4D1 = (1|0);
        /* IL_16E9: conv.i8 */
        st_4D3 = conv_i8(st_4D1);
        /* IL_16EA: call Int64 Mul(System.Int64, System.Int64)*/
        st_4D4 = (asm1.x6000010)(st_4D2,st_4D3);
        /* IL_16EF: box System.Int64*/
        st_4D5 = {
            'boxed': st_4D4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_16F4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4D5);
        /* IL_16F9: ldc.i4 4095*/
        st_4D6 = (4095|0);
        /* IL_16FE: conv.i8 */
        st_4D8 = conv_i8(st_4D6);
        /* IL_16FF: ldc.i4.s 16*/
        st_4D7 = (16|0);
        /* IL_1701: conv.i8 */
        st_4D9 = conv_i8(st_4D7);
        /* IL_1702: call Int64 Mul(System.Int64, System.Int64)*/
        st_4DA = (asm1.x6000010)(st_4D8,st_4D9);
        /* IL_1707: box System.Int64*/
        st_4DB = {
            'boxed': st_4DA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_170C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4DB);
        /* IL_1711: ldc.i4 65535*/
        st_4DC = (65535|0);
        /* IL_1716: conv.i8 */
        st_4DE = conv_i8(st_4DC);
        /* IL_1717: ldc.i4 257*/
        st_4DD = (257|0);
        /* IL_171C: conv.i8 */
        st_4DF = conv_i8(st_4DD);
        /* IL_171D: call Int64 Mul(System.Int64, System.Int64)*/
        st_4E0 = (asm1.x6000010)(st_4DE,st_4DF);
        /* IL_1722: box System.Int64*/
        st_4E1 = {
            'boxed': st_4E0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1727: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4E1);
        /* IL_172C: ldc.i4 1048575*/
        st_4E2 = (1048575|0);
        /* IL_1731: conv.i8 */
        st_4E4 = conv_i8(st_4E2);
        /* IL_1732: ldc.i4 4112*/
        st_4E3 = (4112|0);
        /* IL_1737: conv.i8 */
        st_4E5 = conv_i8(st_4E3);
        /* IL_1738: call Int64 Mul(System.Int64, System.Int64)*/
        st_4E6 = (asm1.x6000010)(st_4E4,st_4E5);
        /* IL_173D: box System.Int64*/
        st_4E7 = {
            'boxed': st_4E6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1742: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4E7);
        /* IL_1747: ldc.i4 16777215*/
        st_4E8 = (16777215|0);
        /* IL_174C: conv.i8 */
        st_4EA = conv_i8(st_4E8);
        /* IL_174D: ldc.i4 65793*/
        st_4E9 = (65793|0);
        /* IL_1752: conv.i8 */
        st_4EB = conv_i8(st_4E9);
        /* IL_1753: call Int64 Mul(System.Int64, System.Int64)*/
        st_4EC = (asm1.x6000010)(st_4EA,st_4EB);
        /* IL_1758: box System.Int64*/
        st_4ED = {
            'boxed': st_4EC,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_175D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4ED);
        /* IL_1762: ldc.i4 268435455*/
        st_4EE = (268435455|0);
        /* IL_1767: conv.i8 */
        st_4F0 = conv_i8(st_4EE);
        /* IL_1768: ldc.i4 1052688*/
        st_4EF = (1052688|0);
        /* IL_176D: conv.i8 */
        st_4F1 = conv_i8(st_4EF);
        /* IL_176E: call Int64 Mul(System.Int64, System.Int64)*/
        st_4F2 = (asm1.x6000010)(st_4F0,st_4F1);
        /* IL_1773: box System.Int64*/
        st_4F3 = {
            'boxed': st_4F2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1778: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4F3);
        /* IL_177D: ldc.i4.m1 */
        st_4F4 = (-1|0);
        /* IL_177E: conv.u8 */
        st_4F6 = conv_u8(st_4F4);
        /* IL_177F: ldc.i4 16843009*/
        st_4F5 = (16843009|0);
        /* IL_1784: conv.i8 */
        st_4F7 = conv_i8(st_4F5);
        /* IL_1785: call Int64 Mul(System.Int64, System.Int64)*/
        st_4F8 = (asm1.x6000010)(st_4F6,st_4F7);
        /* IL_178A: box System.Int64*/
        st_4F9 = {
            'boxed': st_4F8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_178F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4F9);
        /* IL_1794: ldc.i8 68719476735*/
        st_4FB = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_179D: ldc.i4 269488144*/
        st_4FA = (269488144|0);
        /* IL_17A2: conv.i8 */
        st_4FC = conv_i8(st_4FA);
        /* IL_17A3: call Int64 Mul(System.Int64, System.Int64)*/
        st_4FD = (asm1.x6000010)(st_4FB,st_4FC);
        /* IL_17A8: box System.Int64*/
        st_4FE = {
            'boxed': st_4FD,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_17AD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_4FE);
        /* IL_17B2: ldc.i8 1099511627775*/
        st_4FF = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_17BB: ldc.i8 4311810305*/
        st_500 = new Uint32Array([ 0x1010101,0x1 ]);
        /* IL_17C4: call Int64 Mul(System.Int64, System.Int64)*/
        st_501 = (asm1.x6000010)(st_4FF,st_500);
        /* IL_17C9: box System.Int64*/
        st_502 = {
            'boxed': st_501,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_17CE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_502);
        /* IL_17D3: ldc.i8 17592186044415*/
        st_503 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_17DC: ldc.i8 68988964880*/
        st_504 = new Uint32Array([ 0x10101010,0x10 ]);
        /* IL_17E5: call Int64 Mul(System.Int64, System.Int64)*/
        st_505 = (asm1.x6000010)(st_503,st_504);
        /* IL_17EA: box System.Int64*/
        st_506 = {
            'boxed': st_505,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_17EF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_506);
        /* IL_17F4: ldc.i8 281474976710655*/
        st_507 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_17FD: ldc.i8 1103823438081*/
        st_508 = new Uint32Array([ 0x1010101,0x101 ]);
        /* IL_1806: call Int64 Mul(System.Int64, System.Int64)*/
        st_509 = (asm1.x6000010)(st_507,st_508);
        /* IL_180B: box System.Int64*/
        st_50A = {
            'boxed': st_509,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1810: call Void Log(System.Object)*/
        (asm1.x6000001)(st_50A);
        /* IL_1815: ldc.i8 4503599627370495*/
        st_50B = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_181E: ldc.i8 17661175009296*/
        st_50C = new Uint32Array([ 0x10101010,0x1010 ]);
        /* IL_1827: call Int64 Mul(System.Int64, System.Int64)*/
        st_50D = (asm1.x6000010)(st_50B,st_50C);
        /* IL_182C: box System.Int64*/
        st_50E = {
            'boxed': st_50D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1831: call Void Log(System.Object)*/
        (asm1.x6000001)(st_50E);
        /* IL_1836: ldc.i8 72057594037927935*/
        st_50F = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_183F: ldc.i8 282578800148737*/
        st_510 = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_1848: call Int64 Mul(System.Int64, System.Int64)*/
        st_511 = (asm1.x6000010)(st_50F,st_510);
        /* IL_184D: box System.Int64*/
        st_512 = {
            'boxed': st_511,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1852: call Void Log(System.Object)*/
        (asm1.x6000001)(st_512);
        /* IL_1857: ldstr Mul -0x1, -0x010, -0x0101 etc*/
        st_513 = new_string("Mul -0x1, -0x010, -0x0101 etc");
        /* IL_185C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_513);
        /* IL_1861: ldc.i4.s 15*/
        st_514 = (15|0);
        /* IL_1863: conv.i8 */
        st_516 = conv_i8(st_514);
        /* IL_1864: ldc.i4.0 */
        st_515 = (0|0);
        /* IL_1865: conv.i8 */
        st_517 = conv_i8(st_515);
        /* IL_1866: call Int64 Mul(System.Int64, System.Int64)*/
        st_518 = (asm1.x6000010)(st_516,st_517);
        /* IL_186B: box System.Int64*/
        st_519 = {
            'boxed': st_518,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1870: call Void Log(System.Object)*/
        (asm1.x6000001)(st_519);
        /* IL_1875: ldc.i4 255*/
        st_51A = (255|0);
        /* IL_187A: conv.i8 */
        st_51C = conv_i8(st_51A);
        /* IL_187B: ldc.i4.m1 */
        st_51B = (-1|0);
        /* IL_187C: conv.i8 */
        st_51D = conv_i8(st_51B);
        /* IL_187D: call Int64 Mul(System.Int64, System.Int64)*/
        st_51E = (asm1.x6000010)(st_51C,st_51D);
        /* IL_1882: box System.Int64*/
        st_51F = {
            'boxed': st_51E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1887: call Void Log(System.Object)*/
        (asm1.x6000001)(st_51F);
        /* IL_188C: ldc.i4 4095*/
        st_520 = (4095|0);
        /* IL_1891: conv.i8 */
        st_522 = conv_i8(st_520);
        /* IL_1892: ldc.i4.s 240*/
        st_521 = (-16|0);
        /* IL_1894: conv.i8 */
        st_523 = conv_i8(st_521);
        /* IL_1895: call Int64 Mul(System.Int64, System.Int64)*/
        st_524 = (asm1.x6000010)(st_522,st_523);
        /* IL_189A: box System.Int64*/
        st_525 = {
            'boxed': st_524,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_189F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_525);
        /* IL_18A4: ldc.i4 65535*/
        st_526 = (65535|0);
        /* IL_18A9: conv.i8 */
        st_528 = conv_i8(st_526);
        /* IL_18AA: ldc.i4 -257*/
        st_527 = (-257|0);
        /* IL_18AF: conv.i8 */
        st_529 = conv_i8(st_527);
        /* IL_18B0: call Int64 Mul(System.Int64, System.Int64)*/
        st_52A = (asm1.x6000010)(st_528,st_529);
        /* IL_18B5: box System.Int64*/
        st_52B = {
            'boxed': st_52A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_18BA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_52B);
        /* IL_18BF: ldc.i4 1048575*/
        st_52C = (1048575|0);
        /* IL_18C4: conv.i8 */
        st_52E = conv_i8(st_52C);
        /* IL_18C5: ldc.i4 -4112*/
        st_52D = (-4112|0);
        /* IL_18CA: conv.i8 */
        st_52F = conv_i8(st_52D);
        /* IL_18CB: call Int64 Mul(System.Int64, System.Int64)*/
        st_530 = (asm1.x6000010)(st_52E,st_52F);
        /* IL_18D0: box System.Int64*/
        st_531 = {
            'boxed': st_530,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_18D5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_531);
        /* IL_18DA: ldc.i4 16777215*/
        st_532 = (16777215|0);
        /* IL_18DF: conv.i8 */
        st_534 = conv_i8(st_532);
        /* IL_18E0: ldc.i4 -65793*/
        st_533 = (-65793|0);
        /* IL_18E5: conv.i8 */
        st_535 = conv_i8(st_533);
        /* IL_18E6: call Int64 Mul(System.Int64, System.Int64)*/
        st_536 = (asm1.x6000010)(st_534,st_535);
        /* IL_18EB: box System.Int64*/
        st_537 = {
            'boxed': st_536,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_18F0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_537);
        /* IL_18F5: ldc.i4 268435455*/
        st_538 = (268435455|0);
        /* IL_18FA: conv.i8 */
        st_53A = conv_i8(st_538);
        /* IL_18FB: ldc.i4 -1052688*/
        st_539 = (-1052688|0);
        /* IL_1900: conv.i8 */
        st_53B = conv_i8(st_539);
        /* IL_1901: call Int64 Mul(System.Int64, System.Int64)*/
        st_53C = (asm1.x6000010)(st_53A,st_53B);
        /* IL_1906: box System.Int64*/
        st_53D = {
            'boxed': st_53C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_190B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_53D);
        /* IL_1910: ldc.i4.m1 */
        st_53E = (-1|0);
        /* IL_1911: conv.u8 */
        st_540 = conv_u8(st_53E);
        /* IL_1912: ldc.i4 -16843009*/
        st_53F = (-16843009|0);
        /* IL_1917: conv.i8 */
        st_541 = conv_i8(st_53F);
        /* IL_1918: call Int64 Mul(System.Int64, System.Int64)*/
        st_542 = (asm1.x6000010)(st_540,st_541);
        /* IL_191D: box System.Int64*/
        st_543 = {
            'boxed': st_542,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1922: call Void Log(System.Object)*/
        (asm1.x6000001)(st_543);
        /* IL_1927: ldc.i8 68719476735*/
        st_545 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_1930: ldc.i4 -269488144*/
        st_544 = (-269488144|0);
        /* IL_1935: conv.i8 */
        st_546 = conv_i8(st_544);
        /* IL_1936: call Int64 Mul(System.Int64, System.Int64)*/
        st_547 = (asm1.x6000010)(st_545,st_546);
        /* IL_193B: box System.Int64*/
        st_548 = {
            'boxed': st_547,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1940: call Void Log(System.Object)*/
        (asm1.x6000001)(st_548);
        /* IL_1945: ldc.i8 1099511627775*/
        st_549 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_194E: ldc.i8 -4311810305*/
        st_54A = new Uint32Array([ 0xFEFEFEFF,0xFFFFFFFE ]);
        /* IL_1957: call Int64 Mul(System.Int64, System.Int64)*/
        st_54B = (asm1.x6000010)(st_549,st_54A);
        /* IL_195C: box System.Int64*/
        st_54C = {
            'boxed': st_54B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1961: call Void Log(System.Object)*/
        (asm1.x6000001)(st_54C);
        /* IL_1966: ldc.i8 17592186044415*/
        st_54D = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_196F: ldc.i8 -68988964880*/
        st_54E = new Uint32Array([ 0xEFEFEFF0,0xFFFFFFEF ]);
        /* IL_1978: call Int64 Mul(System.Int64, System.Int64)*/
        st_54F = (asm1.x6000010)(st_54D,st_54E);
        /* IL_197D: box System.Int64*/
        st_550 = {
            'boxed': st_54F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1982: call Void Log(System.Object)*/
        (asm1.x6000001)(st_550);
        /* IL_1987: ldc.i8 281474976710655*/
        st_551 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_1990: ldc.i8 -1103823438081*/
        st_552 = new Uint32Array([ 0xFEFEFEFF,0xFFFFFEFE ]);
        /* IL_1999: call Int64 Mul(System.Int64, System.Int64)*/
        st_553 = (asm1.x6000010)(st_551,st_552);
        /* IL_199E: box System.Int64*/
        st_554 = {
            'boxed': st_553,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_19A3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_554);
        /* IL_19A8: ldc.i8 4503599627370495*/
        st_555 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_19B1: ldc.i8 -17661175009296*/
        st_556 = new Uint32Array([ 0xEFEFEFF0,0xFFFFEFEF ]);
        /* IL_19BA: call Int64 Mul(System.Int64, System.Int64)*/
        st_557 = (asm1.x6000010)(st_555,st_556);
        /* IL_19BF: box System.Int64*/
        st_558 = {
            'boxed': st_557,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_19C4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_558);
        /* IL_19C9: ldc.i8 72057594037927935*/
        st_559 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_19D2: ldc.i8 -282578800148737*/
        st_55A = new Uint32Array([ 0xFEFEFEFF,0xFFFEFEFE ]);
        /* IL_19DB: call Int64 Mul(System.Int64, System.Int64)*/
        st_55B = (asm1.x6000010)(st_559,st_55A);
        /* IL_19E0: box System.Int64*/
        st_55C = {
            'boxed': st_55B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_19E5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_55C);
        /* IL_19EA: ldstr Div 1*/
        st_55D = new_string("Div 1");
        /* IL_19EF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_55D);
        /* IL_19F4: ldc.i4.s 15*/
        st_55E = (15|0);
        /* IL_19F6: conv.i8 */
        st_560 = conv_i8(st_55E);
        /* IL_19F7: ldc.i4.1 */
        st_55F = (1|0);
        /* IL_19F8: conv.i8 */
        st_561 = conv_i8(st_55F);
        /* IL_19F9: call Int64 Div(System.Int64, System.Int64)*/
        st_562 = (asm1.x6000011)(st_560,st_561);
        /* IL_19FE: box System.Int64*/
        st_563 = {
            'boxed': st_562,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A03: call Void Log(System.Object)*/
        (asm1.x6000001)(st_563);
        /* IL_1A08: ldc.i4 255*/
        st_564 = (255|0);
        /* IL_1A0D: conv.i8 */
        st_566 = conv_i8(st_564);
        /* IL_1A0E: ldc.i4.1 */
        st_565 = (1|0);
        /* IL_1A0F: conv.i8 */
        st_567 = conv_i8(st_565);
        /* IL_1A10: call Int64 Div(System.Int64, System.Int64)*/
        st_568 = (asm1.x6000011)(st_566,st_567);
        /* IL_1A15: box System.Int64*/
        st_569 = {
            'boxed': st_568,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A1A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_569);
        /* IL_1A1F: ldc.i4 4095*/
        st_56A = (4095|0);
        /* IL_1A24: conv.i8 */
        st_56C = conv_i8(st_56A);
        /* IL_1A25: ldc.i4.1 */
        st_56B = (1|0);
        /* IL_1A26: conv.i8 */
        st_56D = conv_i8(st_56B);
        /* IL_1A27: call Int64 Div(System.Int64, System.Int64)*/
        st_56E = (asm1.x6000011)(st_56C,st_56D);
        /* IL_1A2C: box System.Int64*/
        st_56F = {
            'boxed': st_56E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A31: call Void Log(System.Object)*/
        (asm1.x6000001)(st_56F);
        /* IL_1A36: ldc.i4 65535*/
        st_570 = (65535|0);
        /* IL_1A3B: conv.i8 */
        st_572 = conv_i8(st_570);
        /* IL_1A3C: ldc.i4.1 */
        st_571 = (1|0);
        /* IL_1A3D: conv.i8 */
        st_573 = conv_i8(st_571);
        /* IL_1A3E: call Int64 Div(System.Int64, System.Int64)*/
        st_574 = (asm1.x6000011)(st_572,st_573);
        /* IL_1A43: box System.Int64*/
        st_575 = {
            'boxed': st_574,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A48: call Void Log(System.Object)*/
        (asm1.x6000001)(st_575);
        /* IL_1A4D: ldc.i4 1048575*/
        st_576 = (1048575|0);
        /* IL_1A52: conv.i8 */
        st_578 = conv_i8(st_576);
        /* IL_1A53: ldc.i4.1 */
        st_577 = (1|0);
        /* IL_1A54: conv.i8 */
        st_579 = conv_i8(st_577);
        /* IL_1A55: call Int64 Div(System.Int64, System.Int64)*/
        st_57A = (asm1.x6000011)(st_578,st_579);
        /* IL_1A5A: box System.Int64*/
        st_57B = {
            'boxed': st_57A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A5F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_57B);
        /* IL_1A64: ldc.i4 16777215*/
        st_57C = (16777215|0);
        /* IL_1A69: conv.i8 */
        st_57E = conv_i8(st_57C);
        /* IL_1A6A: ldc.i4.1 */
        st_57D = (1|0);
        /* IL_1A6B: conv.i8 */
        st_57F = conv_i8(st_57D);
        /* IL_1A6C: call Int64 Div(System.Int64, System.Int64)*/
        st_580 = (asm1.x6000011)(st_57E,st_57F);
        /* IL_1A71: box System.Int64*/
        st_581 = {
            'boxed': st_580,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A76: call Void Log(System.Object)*/
        (asm1.x6000001)(st_581);
        /* IL_1A7B: ldc.i4 268435455*/
        st_582 = (268435455|0);
        /* IL_1A80: conv.i8 */
        st_584 = conv_i8(st_582);
        /* IL_1A81: ldc.i4.1 */
        st_583 = (1|0);
        /* IL_1A82: conv.i8 */
        st_585 = conv_i8(st_583);
        /* IL_1A83: call Int64 Div(System.Int64, System.Int64)*/
        st_586 = (asm1.x6000011)(st_584,st_585);
        /* IL_1A88: box System.Int64*/
        st_587 = {
            'boxed': st_586,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1A8D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_587);
        /* IL_1A92: ldc.i4.m1 */
        st_588 = (-1|0);
        /* IL_1A93: conv.u8 */
        st_58A = conv_u8(st_588);
        /* IL_1A94: ldc.i4.1 */
        st_589 = (1|0);
        /* IL_1A95: conv.i8 */
        st_58B = conv_i8(st_589);
        /* IL_1A96: call Int64 Div(System.Int64, System.Int64)*/
        st_58C = (asm1.x6000011)(st_58A,st_58B);
        /* IL_1A9B: box System.Int64*/
        st_58D = {
            'boxed': st_58C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1AA0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_58D);
        /* IL_1AA5: ldc.i8 68719476735*/
        st_58F = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_1AAE: ldc.i4.1 */
        st_58E = (1|0);
        /* IL_1AAF: conv.i8 */
        st_590 = conv_i8(st_58E);
        /* IL_1AB0: call Int64 Div(System.Int64, System.Int64)*/
        st_591 = (asm1.x6000011)(st_58F,st_590);
        /* IL_1AB5: box System.Int64*/
        st_592 = {
            'boxed': st_591,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1ABA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_592);
        /* IL_1ABF: ldc.i8 1099511627775*/
        st_594 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_1AC8: ldc.i4.1 */
        st_593 = (1|0);
        /* IL_1AC9: conv.i8 */
        st_595 = conv_i8(st_593);
        /* IL_1ACA: call Int64 Div(System.Int64, System.Int64)*/
        st_596 = (asm1.x6000011)(st_594,st_595);
        /* IL_1ACF: box System.Int64*/
        st_597 = {
            'boxed': st_596,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1AD4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_597);
        /* IL_1AD9: ldc.i8 17592186044415*/
        st_599 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1AE2: ldc.i4.1 */
        st_598 = (1|0);
        /* IL_1AE3: conv.i8 */
        st_59A = conv_i8(st_598);
        /* IL_1AE4: call Int64 Div(System.Int64, System.Int64)*/
        st_59B = (asm1.x6000011)(st_599,st_59A);
        /* IL_1AE9: box System.Int64*/
        st_59C = {
            'boxed': st_59B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1AEE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_59C);
        /* IL_1AF3: ldc.i8 281474976710655*/
        st_59E = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_1AFC: ldc.i4.1 */
        st_59D = (1|0);
        /* IL_1AFD: conv.i8 */
        st_59F = conv_i8(st_59D);
        /* IL_1AFE: call Int64 Div(System.Int64, System.Int64)*/
        st_5A0 = (asm1.x6000011)(st_59E,st_59F);
        /* IL_1B03: box System.Int64*/
        st_5A1 = {
            'boxed': st_5A0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B08: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5A1);
        /* IL_1B0D: ldc.i8 4503599627370495*/
        st_5A3 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1B16: ldc.i4.1 */
        st_5A2 = (1|0);
        /* IL_1B17: conv.i8 */
        st_5A4 = conv_i8(st_5A2);
        /* IL_1B18: call Int64 Div(System.Int64, System.Int64)*/
        st_5A5 = (asm1.x6000011)(st_5A3,st_5A4);
        /* IL_1B1D: box System.Int64*/
        st_5A6 = {
            'boxed': st_5A5,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B22: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5A6);
        /* IL_1B27: ldc.i8 72057594037927935*/
        st_5A8 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_1B30: ldc.i4.1 */
        st_5A7 = (1|0);
        /* IL_1B31: conv.i8 */
        st_5A9 = conv_i8(st_5A7);
        /* IL_1B32: call Int64 Div(System.Int64, System.Int64)*/
        st_5AA = (asm1.x6000011)(st_5A8,st_5A9);
        /* IL_1B37: box System.Int64*/
        st_5AB = {
            'boxed': st_5AA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B3C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5AB);
        /* IL_1B41: ldstr Div -1*/
        st_5AC = new_string("Div -1");
        /* IL_1B46: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5AC);
        /* IL_1B4B: ldc.i4.s 15*/
        st_5AD = (15|0);
        /* IL_1B4D: conv.i8 */
        st_5AF = conv_i8(st_5AD);
        /* IL_1B4E: ldc.i4.m1 */
        st_5AE = (-1|0);
        /* IL_1B4F: conv.i8 */
        st_5B0 = conv_i8(st_5AE);
        /* IL_1B50: call Int64 Div(System.Int64, System.Int64)*/
        st_5B1 = (asm1.x6000011)(st_5AF,st_5B0);
        /* IL_1B55: box System.Int64*/
        st_5B2 = {
            'boxed': st_5B1,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B5A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5B2);
        /* IL_1B5F: ldc.i4 255*/
        st_5B3 = (255|0);
        /* IL_1B64: conv.i8 */
        st_5B5 = conv_i8(st_5B3);
        /* IL_1B65: ldc.i4.m1 */
        st_5B4 = (-1|0);
        /* IL_1B66: conv.i8 */
        st_5B6 = conv_i8(st_5B4);
        /* IL_1B67: call Int64 Div(System.Int64, System.Int64)*/
        st_5B7 = (asm1.x6000011)(st_5B5,st_5B6);
        /* IL_1B6C: box System.Int64*/
        st_5B8 = {
            'boxed': st_5B7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B71: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5B8);
        /* IL_1B76: ldc.i4 4095*/
        st_5B9 = (4095|0);
        /* IL_1B7B: conv.i8 */
        st_5BB = conv_i8(st_5B9);
        /* IL_1B7C: ldc.i4.m1 */
        st_5BA = (-1|0);
        /* IL_1B7D: conv.i8 */
        st_5BC = conv_i8(st_5BA);
        /* IL_1B7E: call Int64 Div(System.Int64, System.Int64)*/
        st_5BD = (asm1.x6000011)(st_5BB,st_5BC);
        /* IL_1B83: box System.Int64*/
        st_5BE = {
            'boxed': st_5BD,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B88: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5BE);
        /* IL_1B8D: ldc.i4 65535*/
        st_5BF = (65535|0);
        /* IL_1B92: conv.i8 */
        st_5C1 = conv_i8(st_5BF);
        /* IL_1B93: ldc.i4.m1 */
        st_5C0 = (-1|0);
        /* IL_1B94: conv.i8 */
        st_5C2 = conv_i8(st_5C0);
        /* IL_1B95: call Int64 Div(System.Int64, System.Int64)*/
        st_5C3 = (asm1.x6000011)(st_5C1,st_5C2);
        /* IL_1B9A: box System.Int64*/
        st_5C4 = {
            'boxed': st_5C3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1B9F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5C4);
        /* IL_1BA4: ldc.i4 1048575*/
        st_5C5 = (1048575|0);
        /* IL_1BA9: conv.i8 */
        st_5C7 = conv_i8(st_5C5);
        /* IL_1BAA: ldc.i4.m1 */
        st_5C6 = (-1|0);
        /* IL_1BAB: conv.i8 */
        st_5C8 = conv_i8(st_5C6);
        /* IL_1BAC: call Int64 Div(System.Int64, System.Int64)*/
        st_5C9 = (asm1.x6000011)(st_5C7,st_5C8);
        /* IL_1BB1: box System.Int64*/
        st_5CA = {
            'boxed': st_5C9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1BB6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5CA);
        /* IL_1BBB: ldc.i4 16777215*/
        st_5CB = (16777215|0);
        /* IL_1BC0: conv.i8 */
        st_5CD = conv_i8(st_5CB);
        /* IL_1BC1: ldc.i4.m1 */
        st_5CC = (-1|0);
        /* IL_1BC2: conv.i8 */
        st_5CE = conv_i8(st_5CC);
        /* IL_1BC3: call Int64 Div(System.Int64, System.Int64)*/
        st_5CF = (asm1.x6000011)(st_5CD,st_5CE);
        /* IL_1BC8: box System.Int64*/
        st_5D0 = {
            'boxed': st_5CF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1BCD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5D0);
        /* IL_1BD2: ldc.i4 268435455*/
        st_5D1 = (268435455|0);
        /* IL_1BD7: conv.i8 */
        st_5D3 = conv_i8(st_5D1);
        /* IL_1BD8: ldc.i4.m1 */
        st_5D2 = (-1|0);
        /* IL_1BD9: conv.i8 */
        st_5D4 = conv_i8(st_5D2);
        /* IL_1BDA: call Int64 Div(System.Int64, System.Int64)*/
        st_5D5 = (asm1.x6000011)(st_5D3,st_5D4);
        /* IL_1BDF: box System.Int64*/
        st_5D6 = {
            'boxed': st_5D5,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1BE4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5D6);
        /* IL_1BE9: ldc.i4.m1 */
        st_5D7 = (-1|0);
        /* IL_1BEA: conv.u8 */
        st_5D9 = conv_u8(st_5D7);
        /* IL_1BEB: ldc.i4.m1 */
        st_5D8 = (-1|0);
        /* IL_1BEC: conv.i8 */
        st_5DA = conv_i8(st_5D8);
        /* IL_1BED: call Int64 Div(System.Int64, System.Int64)*/
        st_5DB = (asm1.x6000011)(st_5D9,st_5DA);
        /* IL_1BF2: box System.Int64*/
        st_5DC = {
            'boxed': st_5DB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1BF7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5DC);
        /* IL_1BFC: ldc.i8 68719476735*/
        st_5DE = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_1C05: ldc.i4.m1 */
        st_5DD = (-1|0);
        /* IL_1C06: conv.i8 */
        st_5DF = conv_i8(st_5DD);
        /* IL_1C07: call Int64 Div(System.Int64, System.Int64)*/
        st_5E0 = (asm1.x6000011)(st_5DE,st_5DF);
        /* IL_1C0C: box System.Int64*/
        st_5E1 = {
            'boxed': st_5E0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1C11: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5E1);
        /* IL_1C16: ldc.i8 1099511627775*/
        st_5E3 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_1C1F: ldc.i4.m1 */
        st_5E2 = (-1|0);
        /* IL_1C20: conv.i8 */
        st_5E4 = conv_i8(st_5E2);
        /* IL_1C21: call Int64 Div(System.Int64, System.Int64)*/
        st_5E5 = (asm1.x6000011)(st_5E3,st_5E4);
        /* IL_1C26: box System.Int64*/
        st_5E6 = {
            'boxed': st_5E5,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1C2B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5E6);
        /* IL_1C30: ldc.i8 17592186044415*/
        st_5E8 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1C39: ldc.i4.m1 */
        st_5E7 = (-1|0);
        /* IL_1C3A: conv.i8 */
        st_5E9 = conv_i8(st_5E7);
        /* IL_1C3B: call Int64 Div(System.Int64, System.Int64)*/
        st_5EA = (asm1.x6000011)(st_5E8,st_5E9);
        /* IL_1C40: box System.Int64*/
        st_5EB = {
            'boxed': st_5EA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1C45: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5EB);
        /* IL_1C4A: ldc.i8 281474976710655*/
        st_5ED = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_1C53: ldc.i4.m1 */
        st_5EC = (-1|0);
        /* IL_1C54: conv.i8 */
        st_5EE = conv_i8(st_5EC);
        /* IL_1C55: call Int64 Div(System.Int64, System.Int64)*/
        st_5EF = (asm1.x6000011)(st_5ED,st_5EE);
        /* IL_1C5A: box System.Int64*/
        st_5F0 = {
            'boxed': st_5EF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1C5F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5F0);
        /* IL_1C64: ldc.i8 4503599627370495*/
        st_5F2 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1C6D: ldc.i4.m1 */
        st_5F1 = (-1|0);
        /* IL_1C6E: conv.i8 */
        st_5F3 = conv_i8(st_5F1);
        /* IL_1C6F: call Int64 Div(System.Int64, System.Int64)*/
        st_5F4 = (asm1.x6000011)(st_5F2,st_5F3);
        /* IL_1C74: box System.Int64*/
        st_5F5 = {
            'boxed': st_5F4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1C79: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5F5);
        /* IL_1C7E: ldc.i8 72057594037927935*/
        st_5F7 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_1C87: ldc.i4.m1 */
        st_5F6 = (-1|0);
        /* IL_1C88: conv.i8 */
        st_5F8 = conv_i8(st_5F6);
        /* IL_1C89: call Int64 Div(System.Int64, System.Int64)*/
        st_5F9 = (asm1.x6000011)(st_5F7,st_5F8);
        /* IL_1C8E: box System.Int64*/
        st_5FA = {
            'boxed': st_5F9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1C93: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5FA);
        /* IL_1C98: ldstr Div 2*/
        st_5FB = new_string("Div 2");
        /* IL_1C9D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_5FB);
        /* IL_1CA2: ldc.i4.s 15*/
        st_5FC = (15|0);
        /* IL_1CA4: conv.i8 */
        st_5FE = conv_i8(st_5FC);
        /* IL_1CA5: ldc.i4.2 */
        st_5FD = (2|0);
        /* IL_1CA6: conv.i8 */
        st_5FF = conv_i8(st_5FD);
        /* IL_1CA7: call Int64 Div(System.Int64, System.Int64)*/
        st_600 = (asm1.x6000011)(st_5FE,st_5FF);
        /* IL_1CAC: box System.Int64*/
        st_601 = {
            'boxed': st_600,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1CB1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_601);
        /* IL_1CB6: ldc.i4 255*/
        st_602 = (255|0);
        /* IL_1CBB: conv.i8 */
        st_604 = conv_i8(st_602);
        /* IL_1CBC: ldc.i4.2 */
        st_603 = (2|0);
        /* IL_1CBD: conv.i8 */
        st_605 = conv_i8(st_603);
        /* IL_1CBE: call Int64 Div(System.Int64, System.Int64)*/
        st_606 = (asm1.x6000011)(st_604,st_605);
        /* IL_1CC3: box System.Int64*/
        st_607 = {
            'boxed': st_606,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1CC8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_607);
        /* IL_1CCD: ldc.i4 4095*/
        st_608 = (4095|0);
        /* IL_1CD2: conv.i8 */
        st_60A = conv_i8(st_608);
        /* IL_1CD3: ldc.i4.2 */
        st_609 = (2|0);
        /* IL_1CD4: conv.i8 */
        st_60B = conv_i8(st_609);
        /* IL_1CD5: call Int64 Div(System.Int64, System.Int64)*/
        st_60C = (asm1.x6000011)(st_60A,st_60B);
        /* IL_1CDA: box System.Int64*/
        st_60D = {
            'boxed': st_60C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1CDF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_60D);
        /* IL_1CE4: ldc.i4 65535*/
        st_60E = (65535|0);
        /* IL_1CE9: conv.i8 */
        st_610 = conv_i8(st_60E);
        /* IL_1CEA: ldc.i4.2 */
        st_60F = (2|0);
        /* IL_1CEB: conv.i8 */
        st_611 = conv_i8(st_60F);
        /* IL_1CEC: call Int64 Div(System.Int64, System.Int64)*/
        st_612 = (asm1.x6000011)(st_610,st_611);
        /* IL_1CF1: box System.Int64*/
        st_613 = {
            'boxed': st_612,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1CF6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_613);
        /* IL_1CFB: ldc.i4 1048575*/
        st_614 = (1048575|0);
        /* IL_1D00: conv.i8 */
        st_616 = conv_i8(st_614);
        /* IL_1D01: ldc.i4.2 */
        st_615 = (2|0);
        /* IL_1D02: conv.i8 */
        st_617 = conv_i8(st_615);
        /* IL_1D03: call Int64 Div(System.Int64, System.Int64)*/
        st_618 = (asm1.x6000011)(st_616,st_617);
        /* IL_1D08: box System.Int64*/
        st_619 = {
            'boxed': st_618,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D0D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_619);
        /* IL_1D12: ldc.i4 16777215*/
        st_61A = (16777215|0);
        /* IL_1D17: conv.i8 */
        st_61C = conv_i8(st_61A);
        /* IL_1D18: ldc.i4.2 */
        st_61B = (2|0);
        /* IL_1D19: conv.i8 */
        st_61D = conv_i8(st_61B);
        /* IL_1D1A: call Int64 Div(System.Int64, System.Int64)*/
        st_61E = (asm1.x6000011)(st_61C,st_61D);
        /* IL_1D1F: box System.Int64*/
        st_61F = {
            'boxed': st_61E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D24: call Void Log(System.Object)*/
        (asm1.x6000001)(st_61F);
        /* IL_1D29: ldc.i4 268435455*/
        st_620 = (268435455|0);
        /* IL_1D2E: conv.i8 */
        st_622 = conv_i8(st_620);
        /* IL_1D2F: ldc.i4.2 */
        st_621 = (2|0);
        /* IL_1D30: conv.i8 */
        st_623 = conv_i8(st_621);
        /* IL_1D31: call Int64 Div(System.Int64, System.Int64)*/
        st_624 = (asm1.x6000011)(st_622,st_623);
        /* IL_1D36: box System.Int64*/
        st_625 = {
            'boxed': st_624,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D3B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_625);
        /* IL_1D40: ldc.i4.m1 */
        st_626 = (-1|0);
        /* IL_1D41: conv.u8 */
        st_628 = conv_u8(st_626);
        /* IL_1D42: ldc.i4.2 */
        st_627 = (2|0);
        /* IL_1D43: conv.i8 */
        st_629 = conv_i8(st_627);
        /* IL_1D44: call Int64 Div(System.Int64, System.Int64)*/
        st_62A = (asm1.x6000011)(st_628,st_629);
        /* IL_1D49: box System.Int64*/
        st_62B = {
            'boxed': st_62A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D4E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_62B);
        /* IL_1D53: ldc.i8 68719476735*/
        st_62D = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_1D5C: ldc.i4.2 */
        st_62C = (2|0);
        /* IL_1D5D: conv.i8 */
        st_62E = conv_i8(st_62C);
        /* IL_1D5E: call Int64 Div(System.Int64, System.Int64)*/
        st_62F = (asm1.x6000011)(st_62D,st_62E);
        /* IL_1D63: box System.Int64*/
        st_630 = {
            'boxed': st_62F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D68: call Void Log(System.Object)*/
        (asm1.x6000001)(st_630);
        /* IL_1D6D: ldc.i8 1099511627775*/
        st_632 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_1D76: ldc.i4.2 */
        st_631 = (2|0);
        /* IL_1D77: conv.i8 */
        st_633 = conv_i8(st_631);
        /* IL_1D78: call Int64 Div(System.Int64, System.Int64)*/
        st_634 = (asm1.x6000011)(st_632,st_633);
        /* IL_1D7D: box System.Int64*/
        st_635 = {
            'boxed': st_634,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D82: call Void Log(System.Object)*/
        (asm1.x6000001)(st_635);
        /* IL_1D87: ldc.i8 17592186044415*/
        st_637 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1D90: ldc.i4.2 */
        st_636 = (2|0);
        /* IL_1D91: conv.i8 */
        st_638 = conv_i8(st_636);
        /* IL_1D92: call Int64 Div(System.Int64, System.Int64)*/
        st_639 = (asm1.x6000011)(st_637,st_638);
        /* IL_1D97: box System.Int64*/
        st_63A = {
            'boxed': st_639,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1D9C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_63A);
        /* IL_1DA1: ldc.i8 281474976710655*/
        st_63C = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_1DAA: ldc.i4.2 */
        st_63B = (2|0);
        /* IL_1DAB: conv.i8 */
        st_63D = conv_i8(st_63B);
        /* IL_1DAC: call Int64 Div(System.Int64, System.Int64)*/
        st_63E = (asm1.x6000011)(st_63C,st_63D);
        /* IL_1DB1: box System.Int64*/
        st_63F = {
            'boxed': st_63E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1DB6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_63F);
        /* IL_1DBB: ldc.i8 4503599627370495*/
        st_641 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1DC4: ldc.i4.2 */
        st_640 = (2|0);
        /* IL_1DC5: conv.i8 */
        st_642 = conv_i8(st_640);
        /* IL_1DC6: call Int64 Div(System.Int64, System.Int64)*/
        st_643 = (asm1.x6000011)(st_641,st_642);
        /* IL_1DCB: box System.Int64*/
        st_644 = {
            'boxed': st_643,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1DD0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_644);
        /* IL_1DD5: ldc.i8 72057594037927935*/
        st_646 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_1DDE: ldc.i4.2 */
        st_645 = (2|0);
        /* IL_1DDF: conv.i8 */
        st_647 = conv_i8(st_645);
        /* IL_1DE0: call Int64 Div(System.Int64, System.Int64)*/
        st_648 = (asm1.x6000011)(st_646,st_647);
        /* IL_1DE5: box System.Int64*/
        st_649 = {
            'boxed': st_648,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1DEA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_649);
        /* IL_1DEF: ldstr Div -2*/
        st_64A = new_string("Div -2");
        /* IL_1DF4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_64A);
        /* IL_1DF9: ldc.i4.s 15*/
        st_64B = (15|0);
        /* IL_1DFB: conv.i8 */
        st_64D = conv_i8(st_64B);
        /* IL_1DFC: ldc.i4.s 254*/
        st_64C = (-2|0);
        /* IL_1DFE: conv.i8 */
        st_64E = conv_i8(st_64C);
        /* IL_1DFF: call Int64 Div(System.Int64, System.Int64)*/
        st_64F = (asm1.x6000011)(st_64D,st_64E);
        /* IL_1E04: box System.Int64*/
        st_650 = {
            'boxed': st_64F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1E09: call Void Log(System.Object)*/
        (asm1.x6000001)(st_650);
        /* IL_1E0E: ldc.i4 255*/
        st_651 = (255|0);
        /* IL_1E13: conv.i8 */
        st_653 = conv_i8(st_651);
        /* IL_1E14: ldc.i4.s 254*/
        st_652 = (-2|0);
        /* IL_1E16: conv.i8 */
        st_654 = conv_i8(st_652);
        /* IL_1E17: call Int64 Div(System.Int64, System.Int64)*/
        st_655 = (asm1.x6000011)(st_653,st_654);
        /* IL_1E1C: box System.Int64*/
        st_656 = {
            'boxed': st_655,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1E21: call Void Log(System.Object)*/
        (asm1.x6000001)(st_656);
        /* IL_1E26: ldc.i4 4095*/
        st_657 = (4095|0);
        /* IL_1E2B: conv.i8 */
        st_659 = conv_i8(st_657);
        /* IL_1E2C: ldc.i4.s 254*/
        st_658 = (-2|0);
        /* IL_1E2E: conv.i8 */
        st_65A = conv_i8(st_658);
        /* IL_1E2F: call Int64 Div(System.Int64, System.Int64)*/
        st_65B = (asm1.x6000011)(st_659,st_65A);
        /* IL_1E34: box System.Int64*/
        st_65C = {
            'boxed': st_65B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1E39: call Void Log(System.Object)*/
        (asm1.x6000001)(st_65C);
        /* IL_1E3E: ldc.i4 65535*/
        st_65D = (65535|0);
        /* IL_1E43: conv.i8 */
        st_65F = conv_i8(st_65D);
        /* IL_1E44: ldc.i4.s 254*/
        st_65E = (-2|0);
        /* IL_1E46: conv.i8 */
        st_660 = conv_i8(st_65E);
        /* IL_1E47: call Int64 Div(System.Int64, System.Int64)*/
        st_661 = (asm1.x6000011)(st_65F,st_660);
        /* IL_1E4C: box System.Int64*/
        st_662 = {
            'boxed': st_661,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1E51: call Void Log(System.Object)*/
        (asm1.x6000001)(st_662);
        /* IL_1E56: ldc.i4 1048575*/
        st_663 = (1048575|0);
        /* IL_1E5B: conv.i8 */
        st_665 = conv_i8(st_663);
        /* IL_1E5C: ldc.i4.s 254*/
        st_664 = (-2|0);
        /* IL_1E5E: conv.i8 */
        st_666 = conv_i8(st_664);
        /* IL_1E5F: call Int64 Div(System.Int64, System.Int64)*/
        st_667 = (asm1.x6000011)(st_665,st_666);
        /* IL_1E64: box System.Int64*/
        st_668 = {
            'boxed': st_667,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1E69: call Void Log(System.Object)*/
        (asm1.x6000001)(st_668);
        /* IL_1E6E: ldc.i4 16777215*/
        st_669 = (16777215|0);
        /* IL_1E73: conv.i8 */
        st_66B = conv_i8(st_669);
        /* IL_1E74: ldc.i4.s 254*/
        st_66A = (-2|0);
        /* IL_1E76: conv.i8 */
        st_66C = conv_i8(st_66A);
        /* IL_1E77: call Int64 Div(System.Int64, System.Int64)*/
        st_66D = (asm1.x6000011)(st_66B,st_66C);
        /* IL_1E7C: box System.Int64*/
        st_66E = {
            'boxed': st_66D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1E81: call Void Log(System.Object)*/
        (asm1.x6000001)(st_66E);
        /* IL_1E86: ldc.i4 268435455*/
        st_66F = (268435455|0);
        /* IL_1E8B: conv.i8 */
        st_671 = conv_i8(st_66F);
        /* IL_1E8C: ldc.i4.s 254*/
        st_670 = (-2|0);
        /* IL_1E8E: conv.i8 */
        st_672 = conv_i8(st_670);
        /* IL_1E8F: call Int64 Div(System.Int64, System.Int64)*/
        st_673 = (asm1.x6000011)(st_671,st_672);
        /* IL_1E94: box System.Int64*/
        st_674 = {
            'boxed': st_673,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1E99: call Void Log(System.Object)*/
        (asm1.x6000001)(st_674);
        /* IL_1E9E: ldc.i4.m1 */
        st_675 = (-1|0);
        /* IL_1E9F: conv.u8 */
        st_677 = conv_u8(st_675);
        /* IL_1EA0: ldc.i4.s 254*/
        st_676 = (-2|0);
        /* IL_1EA2: conv.i8 */
        st_678 = conv_i8(st_676);
        /* IL_1EA3: call Int64 Div(System.Int64, System.Int64)*/
        st_679 = (asm1.x6000011)(st_677,st_678);
        /* IL_1EA8: box System.Int64*/
        st_67A = {
            'boxed': st_679,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1EAD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_67A);
        /* IL_1EB2: ldc.i8 68719476735*/
        st_67C = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_1EBB: ldc.i4.s 254*/
        st_67B = (-2|0);
        /* IL_1EBD: conv.i8 */
        st_67D = conv_i8(st_67B);
        /* IL_1EBE: call Int64 Div(System.Int64, System.Int64)*/
        st_67E = (asm1.x6000011)(st_67C,st_67D);
        /* IL_1EC3: box System.Int64*/
        st_67F = {
            'boxed': st_67E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1EC8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_67F);
        /* IL_1ECD: ldc.i8 1099511627775*/
        st_681 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_1ED6: ldc.i4.s 254*/
        st_680 = (-2|0);
        /* IL_1ED8: conv.i8 */
        st_682 = conv_i8(st_680);
        /* IL_1ED9: call Int64 Div(System.Int64, System.Int64)*/
        st_683 = (asm1.x6000011)(st_681,st_682);
        /* IL_1EDE: box System.Int64*/
        st_684 = {
            'boxed': st_683,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1EE3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_684);
        /* IL_1EE8: ldc.i8 17592186044415*/
        st_686 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_1EF1: ldc.i4.s 254*/
        st_685 = (-2|0);
        /* IL_1EF3: conv.i8 */
        st_687 = conv_i8(st_685);
        /* IL_1EF4: call Int64 Div(System.Int64, System.Int64)*/
        st_688 = (asm1.x6000011)(st_686,st_687);
        /* IL_1EF9: box System.Int64*/
        st_689 = {
            'boxed': st_688,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1EFE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_689);
        /* IL_1F03: ldc.i8 281474976710655*/
        st_68B = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_1F0C: ldc.i4.s 254*/
        st_68A = (-2|0);
        /* IL_1F0E: conv.i8 */
        st_68C = conv_i8(st_68A);
        /* IL_1F0F: call Int64 Div(System.Int64, System.Int64)*/
        st_68D = (asm1.x6000011)(st_68B,st_68C);
        /* IL_1F14: box System.Int64*/
        st_68E = {
            'boxed': st_68D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1F19: call Void Log(System.Object)*/
        (asm1.x6000001)(st_68E);
        /* IL_1F1E: ldc.i8 4503599627370495*/
        st_690 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_1F27: ldc.i4.s 254*/
        st_68F = (-2|0);
        /* IL_1F29: conv.i8 */
        st_691 = conv_i8(st_68F);
        /* IL_1F2A: call Int64 Div(System.Int64, System.Int64)*/
        st_692 = (asm1.x6000011)(st_690,st_691);
        /* IL_1F2F: box System.Int64*/
        st_693 = {
            'boxed': st_692,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1F34: call Void Log(System.Object)*/
        (asm1.x6000001)(st_693);
        /* IL_1F39: ldc.i8 72057594037927935*/
        st_695 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_1F42: ldc.i4.s 254*/
        st_694 = (-2|0);
        /* IL_1F44: conv.i8 */
        st_696 = conv_i8(st_694);
        /* IL_1F45: call Int64 Div(System.Int64, System.Int64)*/
        st_697 = (asm1.x6000011)(st_695,st_696);
        /* IL_1F4A: box System.Int64*/
        st_698 = {
            'boxed': st_697,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1F4F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_698);
        /* IL_1F54: ldstr Div 0x1, 0x010, 0x0101 etc*/
        st_699 = new_string("Div 0x1, 0x010, 0x0101 etc");
        /* IL_1F59: call Void Log(System.Object)*/
        (asm1.x6000001)(st_699);
        /* IL_1F5E: ldc.i4 255*/
        st_69A = (255|0);
        /* IL_1F63: conv.i8 */
        st_69C = conv_i8(st_69A);
        /* IL_1F64: ldc.i4.1 */
        st_69B = (1|0);
        /* IL_1F65: conv.i8 */
        st_69D = conv_i8(st_69B);
        /* IL_1F66: call Int64 Div(System.Int64, System.Int64)*/
        st_69E = (asm1.x6000011)(st_69C,st_69D);
        /* IL_1F6B: box System.Int64*/
        st_69F = {
            'boxed': st_69E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1F70: call Void Log(System.Object)*/
        (asm1.x6000001)(st_69F);
        /* IL_1F75: ldc.i4 4095*/
        st_6A0 = (4095|0);
        /* IL_1F7A: conv.i8 */
        st_6A2 = conv_i8(st_6A0);
        /* IL_1F7B: ldc.i4.s 16*/
        st_6A1 = (16|0);
        /* IL_1F7D: conv.i8 */
        st_6A3 = conv_i8(st_6A1);
        /* IL_1F7E: call Int64 Div(System.Int64, System.Int64)*/
        st_6A4 = (asm1.x6000011)(st_6A2,st_6A3);
        /* IL_1F83: box System.Int64*/
        st_6A5 = {
            'boxed': st_6A4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1F88: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6A5);
        /* IL_1F8D: ldc.i4 65535*/
        st_6A6 = (65535|0);
        /* IL_1F92: conv.i8 */
        st_6A8 = conv_i8(st_6A6);
        /* IL_1F93: ldc.i4 257*/
        st_6A7 = (257|0);
        /* IL_1F98: conv.i8 */
        st_6A9 = conv_i8(st_6A7);
        /* IL_1F99: call Int64 Div(System.Int64, System.Int64)*/
        st_6AA = (asm1.x6000011)(st_6A8,st_6A9);
        /* IL_1F9E: box System.Int64*/
        st_6AB = {
            'boxed': st_6AA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1FA3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6AB);
        /* IL_1FA8: ldc.i4 1048575*/
        st_6AC = (1048575|0);
        /* IL_1FAD: conv.i8 */
        st_6AE = conv_i8(st_6AC);
        /* IL_1FAE: ldc.i4 4112*/
        st_6AD = (4112|0);
        /* IL_1FB3: conv.i8 */
        st_6AF = conv_i8(st_6AD);
        /* IL_1FB4: call Int64 Div(System.Int64, System.Int64)*/
        st_6B0 = (asm1.x6000011)(st_6AE,st_6AF);
        /* IL_1FB9: box System.Int64*/
        st_6B1 = {
            'boxed': st_6B0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1FBE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6B1);
        /* IL_1FC3: ldc.i4 16777215*/
        st_6B2 = (16777215|0);
        /* IL_1FC8: conv.i8 */
        st_6B4 = conv_i8(st_6B2);
        /* IL_1FC9: ldc.i4 65793*/
        st_6B3 = (65793|0);
        /* IL_1FCE: conv.i8 */
        st_6B5 = conv_i8(st_6B3);
        /* IL_1FCF: call Int64 Div(System.Int64, System.Int64)*/
        st_6B6 = (asm1.x6000011)(st_6B4,st_6B5);
        /* IL_1FD4: box System.Int64*/
        st_6B7 = {
            'boxed': st_6B6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1FD9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6B7);
        /* IL_1FDE: ldc.i4 268435455*/
        st_6B8 = (268435455|0);
        /* IL_1FE3: conv.i8 */
        st_6BA = conv_i8(st_6B8);
        /* IL_1FE4: ldc.i4 1052688*/
        st_6B9 = (1052688|0);
        /* IL_1FE9: conv.i8 */
        st_6BB = conv_i8(st_6B9);
        /* IL_1FEA: call Int64 Div(System.Int64, System.Int64)*/
        st_6BC = (asm1.x6000011)(st_6BA,st_6BB);
        /* IL_1FEF: box System.Int64*/
        st_6BD = {
            'boxed': st_6BC,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_1FF4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6BD);
        /* IL_1FF9: ldc.i4.m1 */
        st_6BE = (-1|0);
        /* IL_1FFA: conv.u8 */
        st_6C0 = conv_u8(st_6BE);
        /* IL_1FFB: ldc.i4 16843009*/
        st_6BF = (16843009|0);
        /* IL_2000: conv.i8 */
        st_6C1 = conv_i8(st_6BF);
        /* IL_2001: call Int64 Div(System.Int64, System.Int64)*/
        st_6C2 = (asm1.x6000011)(st_6C0,st_6C1);
        /* IL_2006: box System.Int64*/
        st_6C3 = {
            'boxed': st_6C2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_200B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6C3);
        /* IL_2010: ldc.i8 68719476735*/
        st_6C5 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_2019: ldc.i4 269488144*/
        st_6C4 = (269488144|0);
        /* IL_201E: conv.i8 */
        st_6C6 = conv_i8(st_6C4);
        /* IL_201F: call Int64 Div(System.Int64, System.Int64)*/
        st_6C7 = (asm1.x6000011)(st_6C5,st_6C6);
        /* IL_2024: box System.Int64*/
        st_6C8 = {
            'boxed': st_6C7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2029: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6C8);
        /* IL_202E: ldc.i8 1099511627775*/
        st_6C9 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_2037: ldc.i8 4311810305*/
        st_6CA = new Uint32Array([ 0x1010101,0x1 ]);
        /* IL_2040: call Int64 Div(System.Int64, System.Int64)*/
        st_6CB = (asm1.x6000011)(st_6C9,st_6CA);
        /* IL_2045: box System.Int64*/
        st_6CC = {
            'boxed': st_6CB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_204A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6CC);
        /* IL_204F: ldc.i8 17592186044415*/
        st_6CD = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_2058: ldc.i8 68988964880*/
        st_6CE = new Uint32Array([ 0x10101010,0x10 ]);
        /* IL_2061: call Int64 Div(System.Int64, System.Int64)*/
        st_6CF = (asm1.x6000011)(st_6CD,st_6CE);
        /* IL_2066: box System.Int64*/
        st_6D0 = {
            'boxed': st_6CF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_206B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6D0);
        /* IL_2070: ldc.i8 281474976710655*/
        st_6D1 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_2079: ldc.i8 1103823438081*/
        st_6D2 = new Uint32Array([ 0x1010101,0x101 ]);
        /* IL_2082: call Int64 Div(System.Int64, System.Int64)*/
        st_6D3 = (asm1.x6000011)(st_6D1,st_6D2);
        /* IL_2087: box System.Int64*/
        st_6D4 = {
            'boxed': st_6D3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_208C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6D4);
        /* IL_2091: ldc.i8 4503599627370495*/
        st_6D5 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_209A: ldc.i8 17661175009296*/
        st_6D6 = new Uint32Array([ 0x10101010,0x1010 ]);
        /* IL_20A3: call Int64 Div(System.Int64, System.Int64)*/
        st_6D7 = (asm1.x6000011)(st_6D5,st_6D6);
        /* IL_20A8: box System.Int64*/
        st_6D8 = {
            'boxed': st_6D7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_20AD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6D8);
        /* IL_20B2: ldc.i8 72057594037927935*/
        st_6D9 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_20BB: ldc.i8 282578800148737*/
        st_6DA = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_20C4: call Int64 Div(System.Int64, System.Int64)*/
        st_6DB = (asm1.x6000011)(st_6D9,st_6DA);
        /* IL_20C9: box System.Int64*/
        st_6DC = {
            'boxed': st_6DB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_20CE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6DC);
        /* IL_20D3: ldstr Div -0x1, -0x010, -0x0101 etc*/
        st_6DD = new_string("Div -0x1, -0x010, -0x0101 etc");
        /* IL_20D8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6DD);
        /* IL_20DD: ldc.i4 255*/
        st_6DE = (255|0);
        /* IL_20E2: conv.i8 */
        st_6E0 = conv_i8(st_6DE);
        /* IL_20E3: ldc.i4.m1 */
        st_6DF = (-1|0);
        /* IL_20E4: conv.i8 */
        st_6E1 = conv_i8(st_6DF);
        /* IL_20E5: call Int64 Div(System.Int64, System.Int64)*/
        st_6E2 = (asm1.x6000011)(st_6E0,st_6E1);
        /* IL_20EA: box System.Int64*/
        st_6E3 = {
            'boxed': st_6E2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_20EF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6E3);
        /* IL_20F4: ldc.i4 4095*/
        st_6E4 = (4095|0);
        /* IL_20F9: conv.i8 */
        st_6E6 = conv_i8(st_6E4);
        /* IL_20FA: ldc.i4.s 240*/
        st_6E5 = (-16|0);
        /* IL_20FC: conv.i8 */
        st_6E7 = conv_i8(st_6E5);
        /* IL_20FD: call Int64 Div(System.Int64, System.Int64)*/
        st_6E8 = (asm1.x6000011)(st_6E6,st_6E7);
        /* IL_2102: box System.Int64*/
        st_6E9 = {
            'boxed': st_6E8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2107: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6E9);
        /* IL_210C: ldc.i4 65535*/
        st_6EA = (65535|0);
        /* IL_2111: conv.i8 */
        st_6EC = conv_i8(st_6EA);
        /* IL_2112: ldc.i4 -257*/
        st_6EB = (-257|0);
        /* IL_2117: conv.i8 */
        st_6ED = conv_i8(st_6EB);
        /* IL_2118: call Int64 Div(System.Int64, System.Int64)*/
        st_6EE = (asm1.x6000011)(st_6EC,st_6ED);
        /* IL_211D: box System.Int64*/
        st_6EF = {
            'boxed': st_6EE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2122: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6EF);
        /* IL_2127: ldc.i4 1048575*/
        st_6F0 = (1048575|0);
        /* IL_212C: conv.i8 */
        st_6F2 = conv_i8(st_6F0);
        /* IL_212D: ldc.i4 -4112*/
        st_6F1 = (-4112|0);
        /* IL_2132: conv.i8 */
        st_6F3 = conv_i8(st_6F1);
        /* IL_2133: call Int64 Div(System.Int64, System.Int64)*/
        st_6F4 = (asm1.x6000011)(st_6F2,st_6F3);
        /* IL_2138: box System.Int64*/
        st_6F5 = {
            'boxed': st_6F4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_213D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6F5);
        /* IL_2142: ldc.i4 16777215*/
        st_6F6 = (16777215|0);
        /* IL_2147: conv.i8 */
        st_6F8 = conv_i8(st_6F6);
        /* IL_2148: ldc.i4 -65793*/
        st_6F7 = (-65793|0);
        /* IL_214D: conv.i8 */
        st_6F9 = conv_i8(st_6F7);
        /* IL_214E: call Int64 Div(System.Int64, System.Int64)*/
        st_6FA = (asm1.x6000011)(st_6F8,st_6F9);
        /* IL_2153: box System.Int64*/
        st_6FB = {
            'boxed': st_6FA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2158: call Void Log(System.Object)*/
        (asm1.x6000001)(st_6FB);
        /* IL_215D: ldc.i4 268435455*/
        st_6FC = (268435455|0);
        /* IL_2162: conv.i8 */
        st_6FE = conv_i8(st_6FC);
        /* IL_2163: ldc.i4 -1052688*/
        st_6FD = (-1052688|0);
        /* IL_2168: conv.i8 */
        st_6FF = conv_i8(st_6FD);
        /* IL_2169: call Int64 Div(System.Int64, System.Int64)*/
        st_700 = (asm1.x6000011)(st_6FE,st_6FF);
        /* IL_216E: box System.Int64*/
        st_701 = {
            'boxed': st_700,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2173: call Void Log(System.Object)*/
        (asm1.x6000001)(st_701);
        /* IL_2178: ldc.i4.m1 */
        st_702 = (-1|0);
        /* IL_2179: conv.u8 */
        st_704 = conv_u8(st_702);
        /* IL_217A: ldc.i4 -16843009*/
        st_703 = (-16843009|0);
        /* IL_217F: conv.i8 */
        st_705 = conv_i8(st_703);
        /* IL_2180: call Int64 Div(System.Int64, System.Int64)*/
        st_706 = (asm1.x6000011)(st_704,st_705);
        /* IL_2185: box System.Int64*/
        st_707 = {
            'boxed': st_706,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_218A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_707);
        /* IL_218F: ldc.i8 68719476735*/
        st_709 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_2198: ldc.i4 -269488144*/
        st_708 = (-269488144|0);
        /* IL_219D: conv.i8 */
        st_70A = conv_i8(st_708);
        /* IL_219E: call Int64 Div(System.Int64, System.Int64)*/
        st_70B = (asm1.x6000011)(st_709,st_70A);
        /* IL_21A3: box System.Int64*/
        st_70C = {
            'boxed': st_70B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_21A8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_70C);
        /* IL_21AD: ldc.i8 1099511627775*/
        st_70D = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_21B6: ldc.i8 -4311810305*/
        st_70E = new Uint32Array([ 0xFEFEFEFF,0xFFFFFFFE ]);
        /* IL_21BF: call Int64 Div(System.Int64, System.Int64)*/
        st_70F = (asm1.x6000011)(st_70D,st_70E);
        /* IL_21C4: box System.Int64*/
        st_710 = {
            'boxed': st_70F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_21C9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_710);
        /* IL_21CE: ldc.i8 17592186044415*/
        st_711 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_21D7: ldc.i8 -68988964880*/
        st_712 = new Uint32Array([ 0xEFEFEFF0,0xFFFFFFEF ]);
        /* IL_21E0: call Int64 Div(System.Int64, System.Int64)*/
        st_713 = (asm1.x6000011)(st_711,st_712);
        /* IL_21E5: box System.Int64*/
        st_714 = {
            'boxed': st_713,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_21EA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_714);
        /* IL_21EF: ldc.i8 281474976710655*/
        st_715 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_21F8: ldc.i8 -1103823438081*/
        st_716 = new Uint32Array([ 0xFEFEFEFF,0xFFFFFEFE ]);
        /* IL_2201: call Int64 Div(System.Int64, System.Int64)*/
        st_717 = (asm1.x6000011)(st_715,st_716);
        /* IL_2206: box System.Int64*/
        st_718 = {
            'boxed': st_717,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_220B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_718);
        /* IL_2210: ldc.i8 4503599627370495*/
        st_719 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_2219: ldc.i8 -17661175009296*/
        st_71A = new Uint32Array([ 0xEFEFEFF0,0xFFFFEFEF ]);
        /* IL_2222: call Int64 Div(System.Int64, System.Int64)*/
        st_71B = (asm1.x6000011)(st_719,st_71A);
        /* IL_2227: box System.Int64*/
        st_71C = {
            'boxed': st_71B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_222C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_71C);
        /* IL_2231: ldc.i8 72057594037927935*/
        st_71D = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_223A: ldc.i8 -282578800148737*/
        st_71E = new Uint32Array([ 0xFEFEFEFF,0xFFFEFEFE ]);
        /* IL_2243: call Int64 Div(System.Int64, System.Int64)*/
        st_71F = (asm1.x6000011)(st_71D,st_71E);
        /* IL_2248: box System.Int64*/
        st_720 = {
            'boxed': st_71F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_224D: call Void Log(System.Object)*/
        (asm1.x6000001)(st_720);
        /* IL_2252: ldstr Mod 1*/
        st_721 = new_string("Mod 1");
        /* IL_2257: call Void Log(System.Object)*/
        (asm1.x6000001)(st_721);
        /* IL_225C: ldc.i4.s 15*/
        st_722 = (15|0);
        /* IL_225E: conv.i8 */
        st_724 = conv_i8(st_722);
        /* IL_225F: ldc.i4.1 */
        st_723 = (1|0);
        /* IL_2260: conv.i8 */
        st_725 = conv_i8(st_723);
        /* IL_2261: call Int64 Mod(System.Int64, System.Int64)*/
        st_726 = (asm1.x6000012)(st_724,st_725);
        /* IL_2266: box System.Int64*/
        st_727 = {
            'boxed': st_726,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_226B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_727);
        /* IL_2270: ldc.i4 255*/
        st_728 = (255|0);
        /* IL_2275: conv.i8 */
        st_72A = conv_i8(st_728);
        /* IL_2276: ldc.i4.1 */
        st_729 = (1|0);
        /* IL_2277: conv.i8 */
        st_72B = conv_i8(st_729);
        /* IL_2278: call Int64 Mod(System.Int64, System.Int64)*/
        st_72C = (asm1.x6000012)(st_72A,st_72B);
        /* IL_227D: box System.Int64*/
        st_72D = {
            'boxed': st_72C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2282: call Void Log(System.Object)*/
        (asm1.x6000001)(st_72D);
        /* IL_2287: ldc.i4 4095*/
        st_72E = (4095|0);
        /* IL_228C: conv.i8 */
        st_730 = conv_i8(st_72E);
        /* IL_228D: ldc.i4.1 */
        st_72F = (1|0);
        /* IL_228E: conv.i8 */
        st_731 = conv_i8(st_72F);
        /* IL_228F: call Int64 Mod(System.Int64, System.Int64)*/
        st_732 = (asm1.x6000012)(st_730,st_731);
        /* IL_2294: box System.Int64*/
        st_733 = {
            'boxed': st_732,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2299: call Void Log(System.Object)*/
        (asm1.x6000001)(st_733);
        /* IL_229E: ldc.i4 65535*/
        st_734 = (65535|0);
        /* IL_22A3: conv.i8 */
        st_736 = conv_i8(st_734);
        /* IL_22A4: ldc.i4.1 */
        st_735 = (1|0);
        /* IL_22A5: conv.i8 */
        st_737 = conv_i8(st_735);
        /* IL_22A6: call Int64 Mod(System.Int64, System.Int64)*/
        st_738 = (asm1.x6000012)(st_736,st_737);
        /* IL_22AB: box System.Int64*/
        st_739 = {
            'boxed': st_738,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_22B0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_739);
        /* IL_22B5: ldc.i4 1048575*/
        st_73A = (1048575|0);
        /* IL_22BA: conv.i8 */
        st_73C = conv_i8(st_73A);
        /* IL_22BB: ldc.i4.1 */
        st_73B = (1|0);
        /* IL_22BC: conv.i8 */
        st_73D = conv_i8(st_73B);
        /* IL_22BD: call Int64 Mod(System.Int64, System.Int64)*/
        st_73E = (asm1.x6000012)(st_73C,st_73D);
        /* IL_22C2: box System.Int64*/
        st_73F = {
            'boxed': st_73E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_22C7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_73F);
        /* IL_22CC: ldc.i4 16777215*/
        st_740 = (16777215|0);
        /* IL_22D1: conv.i8 */
        st_742 = conv_i8(st_740);
        /* IL_22D2: ldc.i4.1 */
        st_741 = (1|0);
        /* IL_22D3: conv.i8 */
        st_743 = conv_i8(st_741);
        /* IL_22D4: call Int64 Mod(System.Int64, System.Int64)*/
        st_744 = (asm1.x6000012)(st_742,st_743);
        /* IL_22D9: box System.Int64*/
        st_745 = {
            'boxed': st_744,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_22DE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_745);
        /* IL_22E3: ldc.i4 268435455*/
        st_746 = (268435455|0);
        /* IL_22E8: conv.i8 */
        st_748 = conv_i8(st_746);
        /* IL_22E9: ldc.i4.1 */
        st_747 = (1|0);
        /* IL_22EA: conv.i8 */
        st_749 = conv_i8(st_747);
        /* IL_22EB: call Int64 Mod(System.Int64, System.Int64)*/
        st_74A = (asm1.x6000012)(st_748,st_749);
        /* IL_22F0: box System.Int64*/
        st_74B = {
            'boxed': st_74A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_22F5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_74B);
        /* IL_22FA: ldc.i4.m1 */
        st_74C = (-1|0);
        /* IL_22FB: conv.u8 */
        st_74E = conv_u8(st_74C);
        /* IL_22FC: ldc.i4.1 */
        st_74D = (1|0);
        /* IL_22FD: conv.i8 */
        st_74F = conv_i8(st_74D);
        /* IL_22FE: call Int64 Mod(System.Int64, System.Int64)*/
        st_750 = (asm1.x6000012)(st_74E,st_74F);
        /* IL_2303: box System.Int64*/
        st_751 = {
            'boxed': st_750,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2308: call Void Log(System.Object)*/
        (asm1.x6000001)(st_751);
        /* IL_230D: ldc.i8 68719476735*/
        st_753 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_2316: ldc.i4.1 */
        st_752 = (1|0);
        /* IL_2317: conv.i8 */
        st_754 = conv_i8(st_752);
        /* IL_2318: call Int64 Mod(System.Int64, System.Int64)*/
        st_755 = (asm1.x6000012)(st_753,st_754);
        /* IL_231D: box System.Int64*/
        st_756 = {
            'boxed': st_755,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2322: call Void Log(System.Object)*/
        (asm1.x6000001)(st_756);
        /* IL_2327: ldc.i8 1099511627775*/
        st_758 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_2330: ldc.i4.1 */
        st_757 = (1|0);
        /* IL_2331: conv.i8 */
        st_759 = conv_i8(st_757);
        /* IL_2332: call Int64 Mod(System.Int64, System.Int64)*/
        st_75A = (asm1.x6000012)(st_758,st_759);
        /* IL_2337: box System.Int64*/
        st_75B = {
            'boxed': st_75A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_233C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_75B);
        /* IL_2341: ldc.i8 17592186044415*/
        st_75D = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_234A: ldc.i4.1 */
        st_75C = (1|0);
        /* IL_234B: conv.i8 */
        st_75E = conv_i8(st_75C);
        /* IL_234C: call Int64 Mod(System.Int64, System.Int64)*/
        st_75F = (asm1.x6000012)(st_75D,st_75E);
        /* IL_2351: box System.Int64*/
        st_760 = {
            'boxed': st_75F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2356: call Void Log(System.Object)*/
        (asm1.x6000001)(st_760);
        /* IL_235B: ldc.i8 281474976710655*/
        st_762 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_2364: ldc.i4.1 */
        st_761 = (1|0);
        /* IL_2365: conv.i8 */
        st_763 = conv_i8(st_761);
        /* IL_2366: call Int64 Mod(System.Int64, System.Int64)*/
        st_764 = (asm1.x6000012)(st_762,st_763);
        /* IL_236B: box System.Int64*/
        st_765 = {
            'boxed': st_764,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2370: call Void Log(System.Object)*/
        (asm1.x6000001)(st_765);
        /* IL_2375: ldc.i8 4503599627370495*/
        st_767 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_237E: ldc.i4.1 */
        st_766 = (1|0);
        /* IL_237F: conv.i8 */
        st_768 = conv_i8(st_766);
        /* IL_2380: call Int64 Mod(System.Int64, System.Int64)*/
        st_769 = (asm1.x6000012)(st_767,st_768);
        /* IL_2385: box System.Int64*/
        st_76A = {
            'boxed': st_769,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_238A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_76A);
        /* IL_238F: ldc.i8 72057594037927935*/
        st_76C = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_2398: ldc.i4.1 */
        st_76B = (1|0);
        /* IL_2399: conv.i8 */
        st_76D = conv_i8(st_76B);
        /* IL_239A: call Int64 Mod(System.Int64, System.Int64)*/
        st_76E = (asm1.x6000012)(st_76C,st_76D);
        /* IL_239F: box System.Int64*/
        st_76F = {
            'boxed': st_76E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_23A4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_76F);
        /* IL_23A9: ldstr Mod -1*/
        st_770 = new_string("Mod -1");
        /* IL_23AE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_770);
        /* IL_23B3: ldc.i4.s 15*/
        st_771 = (15|0);
        /* IL_23B5: conv.i8 */
        st_773 = conv_i8(st_771);
        /* IL_23B6: ldc.i4.m1 */
        st_772 = (-1|0);
        /* IL_23B7: conv.i8 */
        st_774 = conv_i8(st_772);
        /* IL_23B8: call Int64 Mod(System.Int64, System.Int64)*/
        st_775 = (asm1.x6000012)(st_773,st_774);
        /* IL_23BD: box System.Int64*/
        st_776 = {
            'boxed': st_775,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_23C2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_776);
        /* IL_23C7: ldc.i4 255*/
        st_777 = (255|0);
        /* IL_23CC: conv.i8 */
        st_779 = conv_i8(st_777);
        /* IL_23CD: ldc.i4.m1 */
        st_778 = (-1|0);
        /* IL_23CE: conv.i8 */
        st_77A = conv_i8(st_778);
        /* IL_23CF: call Int64 Mod(System.Int64, System.Int64)*/
        st_77B = (asm1.x6000012)(st_779,st_77A);
        /* IL_23D4: box System.Int64*/
        st_77C = {
            'boxed': st_77B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_23D9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_77C);
        /* IL_23DE: ldc.i4 4095*/
        st_77D = (4095|0);
        /* IL_23E3: conv.i8 */
        st_77F = conv_i8(st_77D);
        /* IL_23E4: ldc.i4.m1 */
        st_77E = (-1|0);
        /* IL_23E5: conv.i8 */
        st_780 = conv_i8(st_77E);
        /* IL_23E6: call Int64 Mod(System.Int64, System.Int64)*/
        st_781 = (asm1.x6000012)(st_77F,st_780);
        /* IL_23EB: box System.Int64*/
        st_782 = {
            'boxed': st_781,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_23F0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_782);
        /* IL_23F5: ldc.i4 65535*/
        st_783 = (65535|0);
        /* IL_23FA: conv.i8 */
        st_785 = conv_i8(st_783);
        /* IL_23FB: ldc.i4.m1 */
        st_784 = (-1|0);
        /* IL_23FC: conv.i8 */
        st_786 = conv_i8(st_784);
        /* IL_23FD: call Int64 Mod(System.Int64, System.Int64)*/
        st_787 = (asm1.x6000012)(st_785,st_786);
        /* IL_2402: box System.Int64*/
        st_788 = {
            'boxed': st_787,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2407: call Void Log(System.Object)*/
        (asm1.x6000001)(st_788);
        /* IL_240C: ldc.i4 1048575*/
        st_789 = (1048575|0);
        /* IL_2411: conv.i8 */
        st_78B = conv_i8(st_789);
        /* IL_2412: ldc.i4.m1 */
        st_78A = (-1|0);
        /* IL_2413: conv.i8 */
        st_78C = conv_i8(st_78A);
        /* IL_2414: call Int64 Mod(System.Int64, System.Int64)*/
        st_78D = (asm1.x6000012)(st_78B,st_78C);
        /* IL_2419: box System.Int64*/
        st_78E = {
            'boxed': st_78D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_241E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_78E);
        /* IL_2423: ldc.i4 16777215*/
        st_78F = (16777215|0);
        /* IL_2428: conv.i8 */
        st_791 = conv_i8(st_78F);
        /* IL_2429: ldc.i4.m1 */
        st_790 = (-1|0);
        /* IL_242A: conv.i8 */
        st_792 = conv_i8(st_790);
        /* IL_242B: call Int64 Mod(System.Int64, System.Int64)*/
        st_793 = (asm1.x6000012)(st_791,st_792);
        /* IL_2430: box System.Int64*/
        st_794 = {
            'boxed': st_793,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2435: call Void Log(System.Object)*/
        (asm1.x6000001)(st_794);
        /* IL_243A: ldc.i4 268435455*/
        st_795 = (268435455|0);
        /* IL_243F: conv.i8 */
        st_797 = conv_i8(st_795);
        /* IL_2440: ldc.i4.m1 */
        st_796 = (-1|0);
        /* IL_2441: conv.i8 */
        st_798 = conv_i8(st_796);
        /* IL_2442: call Int64 Mod(System.Int64, System.Int64)*/
        st_799 = (asm1.x6000012)(st_797,st_798);
        /* IL_2447: box System.Int64*/
        st_79A = {
            'boxed': st_799,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_244C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_79A);
        /* IL_2451: ldc.i4.m1 */
        st_79B = (-1|0);
        /* IL_2452: conv.u8 */
        st_79D = conv_u8(st_79B);
        /* IL_2453: ldc.i4.m1 */
        st_79C = (-1|0);
        /* IL_2454: conv.i8 */
        st_79E = conv_i8(st_79C);
        /* IL_2455: call Int64 Mod(System.Int64, System.Int64)*/
        st_79F = (asm1.x6000012)(st_79D,st_79E);
        /* IL_245A: box System.Int64*/
        st_7A0 = {
            'boxed': st_79F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_245F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7A0);
        /* IL_2464: ldc.i8 68719476735*/
        st_7A2 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_246D: ldc.i4.m1 */
        st_7A1 = (-1|0);
        /* IL_246E: conv.i8 */
        st_7A3 = conv_i8(st_7A1);
        /* IL_246F: call Int64 Mod(System.Int64, System.Int64)*/
        st_7A4 = (asm1.x6000012)(st_7A2,st_7A3);
        /* IL_2474: box System.Int64*/
        st_7A5 = {
            'boxed': st_7A4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2479: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7A5);
        /* IL_247E: ldc.i8 1099511627775*/
        st_7A7 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_2487: ldc.i4.m1 */
        st_7A6 = (-1|0);
        /* IL_2488: conv.i8 */
        st_7A8 = conv_i8(st_7A6);
        /* IL_2489: call Int64 Mod(System.Int64, System.Int64)*/
        st_7A9 = (asm1.x6000012)(st_7A7,st_7A8);
        /* IL_248E: box System.Int64*/
        st_7AA = {
            'boxed': st_7A9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2493: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7AA);
        /* IL_2498: ldc.i8 17592186044415*/
        st_7AC = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_24A1: ldc.i4.m1 */
        st_7AB = (-1|0);
        /* IL_24A2: conv.i8 */
        st_7AD = conv_i8(st_7AB);
        /* IL_24A3: call Int64 Mod(System.Int64, System.Int64)*/
        st_7AE = (asm1.x6000012)(st_7AC,st_7AD);
        /* IL_24A8: box System.Int64*/
        st_7AF = {
            'boxed': st_7AE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_24AD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7AF);
        /* IL_24B2: ldc.i8 281474976710655*/
        st_7B1 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_24BB: ldc.i4.m1 */
        st_7B0 = (-1|0);
        /* IL_24BC: conv.i8 */
        st_7B2 = conv_i8(st_7B0);
        /* IL_24BD: call Int64 Mod(System.Int64, System.Int64)*/
        st_7B3 = (asm1.x6000012)(st_7B1,st_7B2);
        /* IL_24C2: box System.Int64*/
        st_7B4 = {
            'boxed': st_7B3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_24C7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7B4);
        /* IL_24CC: ldc.i8 4503599627370495*/
        st_7B6 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_24D5: ldc.i4.m1 */
        st_7B5 = (-1|0);
        /* IL_24D6: conv.i8 */
        st_7B7 = conv_i8(st_7B5);
        /* IL_24D7: call Int64 Mod(System.Int64, System.Int64)*/
        st_7B8 = (asm1.x6000012)(st_7B6,st_7B7);
        /* IL_24DC: box System.Int64*/
        st_7B9 = {
            'boxed': st_7B8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_24E1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7B9);
        /* IL_24E6: ldc.i8 72057594037927935*/
        st_7BB = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_24EF: ldc.i4.m1 */
        st_7BA = (-1|0);
        /* IL_24F0: conv.i8 */
        st_7BC = conv_i8(st_7BA);
        /* IL_24F1: call Int64 Mod(System.Int64, System.Int64)*/
        st_7BD = (asm1.x6000012)(st_7BB,st_7BC);
        /* IL_24F6: box System.Int64*/
        st_7BE = {
            'boxed': st_7BD,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_24FB: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7BE);
        /* IL_2500: ldstr Mod 2*/
        st_7BF = new_string("Mod 2");
        /* IL_2505: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7BF);
        /* IL_250A: ldc.i4.s 15*/
        st_7C0 = (15|0);
        /* IL_250C: conv.i8 */
        st_7C2 = conv_i8(st_7C0);
        /* IL_250D: ldc.i4.2 */
        st_7C1 = (2|0);
        /* IL_250E: conv.i8 */
        st_7C3 = conv_i8(st_7C1);
        /* IL_250F: call Int64 Mod(System.Int64, System.Int64)*/
        st_7C4 = (asm1.x6000012)(st_7C2,st_7C3);
        /* IL_2514: box System.Int64*/
        st_7C5 = {
            'boxed': st_7C4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2519: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7C5);
        /* IL_251E: ldc.i4 255*/
        st_7C6 = (255|0);
        /* IL_2523: conv.i8 */
        st_7C8 = conv_i8(st_7C6);
        /* IL_2524: ldc.i4.2 */
        st_7C7 = (2|0);
        /* IL_2525: conv.i8 */
        st_7C9 = conv_i8(st_7C7);
        /* IL_2526: call Int64 Mod(System.Int64, System.Int64)*/
        st_7CA = (asm1.x6000012)(st_7C8,st_7C9);
        /* IL_252B: box System.Int64*/
        st_7CB = {
            'boxed': st_7CA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2530: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7CB);
        /* IL_2535: ldc.i4 4095*/
        st_7CC = (4095|0);
        /* IL_253A: conv.i8 */
        st_7CE = conv_i8(st_7CC);
        /* IL_253B: ldc.i4.2 */
        st_7CD = (2|0);
        /* IL_253C: conv.i8 */
        st_7CF = conv_i8(st_7CD);
        /* IL_253D: call Int64 Mod(System.Int64, System.Int64)*/
        st_7D0 = (asm1.x6000012)(st_7CE,st_7CF);
        /* IL_2542: box System.Int64*/
        st_7D1 = {
            'boxed': st_7D0,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2547: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7D1);
        /* IL_254C: ldc.i4 65535*/
        st_7D2 = (65535|0);
        /* IL_2551: conv.i8 */
        st_7D4 = conv_i8(st_7D2);
        /* IL_2552: ldc.i4.2 */
        st_7D3 = (2|0);
        /* IL_2553: conv.i8 */
        st_7D5 = conv_i8(st_7D3);
        /* IL_2554: call Int64 Mod(System.Int64, System.Int64)*/
        st_7D6 = (asm1.x6000012)(st_7D4,st_7D5);
        /* IL_2559: box System.Int64*/
        st_7D7 = {
            'boxed': st_7D6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_255E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7D7);
        /* IL_2563: ldc.i4 1048575*/
        st_7D8 = (1048575|0);
        /* IL_2568: conv.i8 */
        st_7DA = conv_i8(st_7D8);
        /* IL_2569: ldc.i4.2 */
        st_7D9 = (2|0);
        /* IL_256A: conv.i8 */
        st_7DB = conv_i8(st_7D9);
        /* IL_256B: call Int64 Mod(System.Int64, System.Int64)*/
        st_7DC = (asm1.x6000012)(st_7DA,st_7DB);
        /* IL_2570: box System.Int64*/
        st_7DD = {
            'boxed': st_7DC,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2575: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7DD);
        /* IL_257A: ldc.i4 16777215*/
        st_7DE = (16777215|0);
        /* IL_257F: conv.i8 */
        st_7E0 = conv_i8(st_7DE);
        /* IL_2580: ldc.i4.2 */
        st_7DF = (2|0);
        /* IL_2581: conv.i8 */
        st_7E1 = conv_i8(st_7DF);
        /* IL_2582: call Int64 Mod(System.Int64, System.Int64)*/
        st_7E2 = (asm1.x6000012)(st_7E0,st_7E1);
        /* IL_2587: box System.Int64*/
        st_7E3 = {
            'boxed': st_7E2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_258C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7E3);
        /* IL_2591: ldc.i4 268435455*/
        st_7E4 = (268435455|0);
        /* IL_2596: conv.i8 */
        st_7E6 = conv_i8(st_7E4);
        /* IL_2597: ldc.i4.2 */
        st_7E5 = (2|0);
        /* IL_2598: conv.i8 */
        st_7E7 = conv_i8(st_7E5);
        /* IL_2599: call Int64 Mod(System.Int64, System.Int64)*/
        st_7E8 = (asm1.x6000012)(st_7E6,st_7E7);
        /* IL_259E: box System.Int64*/
        st_7E9 = {
            'boxed': st_7E8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_25A3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7E9);
        /* IL_25A8: ldc.i4.m1 */
        st_7EA = (-1|0);
        /* IL_25A9: conv.u8 */
        st_7EC = conv_u8(st_7EA);
        /* IL_25AA: ldc.i4.2 */
        st_7EB = (2|0);
        /* IL_25AB: conv.i8 */
        st_7ED = conv_i8(st_7EB);
        /* IL_25AC: call Int64 Mod(System.Int64, System.Int64)*/
        st_7EE = (asm1.x6000012)(st_7EC,st_7ED);
        /* IL_25B1: box System.Int64*/
        st_7EF = {
            'boxed': st_7EE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_25B6: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7EF);
        /* IL_25BB: ldc.i8 68719476735*/
        st_7F1 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_25C4: ldc.i4.2 */
        st_7F0 = (2|0);
        /* IL_25C5: conv.i8 */
        st_7F2 = conv_i8(st_7F0);
        /* IL_25C6: call Int64 Mod(System.Int64, System.Int64)*/
        st_7F3 = (asm1.x6000012)(st_7F1,st_7F2);
        /* IL_25CB: box System.Int64*/
        st_7F4 = {
            'boxed': st_7F3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_25D0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7F4);
        /* IL_25D5: ldc.i8 1099511627775*/
        st_7F6 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_25DE: ldc.i4.2 */
        st_7F5 = (2|0);
        /* IL_25DF: conv.i8 */
        st_7F7 = conv_i8(st_7F5);
        /* IL_25E0: call Int64 Mod(System.Int64, System.Int64)*/
        st_7F8 = (asm1.x6000012)(st_7F6,st_7F7);
        /* IL_25E5: box System.Int64*/
        st_7F9 = {
            'boxed': st_7F8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_25EA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7F9);
        /* IL_25EF: ldc.i8 17592186044415*/
        st_7FB = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_25F8: ldc.i4.2 */
        st_7FA = (2|0);
        /* IL_25F9: conv.i8 */
        st_7FC = conv_i8(st_7FA);
        /* IL_25FA: call Int64 Mod(System.Int64, System.Int64)*/
        st_7FD = (asm1.x6000012)(st_7FB,st_7FC);
        /* IL_25FF: box System.Int64*/
        st_7FE = {
            'boxed': st_7FD,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2604: call Void Log(System.Object)*/
        (asm1.x6000001)(st_7FE);
        /* IL_2609: ldc.i8 281474976710655*/
        st_800 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_2612: ldc.i4.2 */
        st_7FF = (2|0);
        /* IL_2613: conv.i8 */
        st_801 = conv_i8(st_7FF);
        /* IL_2614: call Int64 Mod(System.Int64, System.Int64)*/
        st_802 = (asm1.x6000012)(st_800,st_801);
        /* IL_2619: box System.Int64*/
        st_803 = {
            'boxed': st_802,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_261E: call Void Log(System.Object)*/
        (asm1.x6000001)(st_803);
        /* IL_2623: ldc.i8 4503599627370495*/
        st_805 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_262C: ldc.i4.2 */
        st_804 = (2|0);
        /* IL_262D: conv.i8 */
        st_806 = conv_i8(st_804);
        /* IL_262E: call Int64 Mod(System.Int64, System.Int64)*/
        st_807 = (asm1.x6000012)(st_805,st_806);
        /* IL_2633: box System.Int64*/
        st_808 = {
            'boxed': st_807,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2638: call Void Log(System.Object)*/
        (asm1.x6000001)(st_808);
        /* IL_263D: ldc.i8 72057594037927935*/
        st_80A = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_2646: ldc.i4.2 */
        st_809 = (2|0);
        /* IL_2647: conv.i8 */
        st_80B = conv_i8(st_809);
        /* IL_2648: call Int64 Mod(System.Int64, System.Int64)*/
        st_80C = (asm1.x6000012)(st_80A,st_80B);
        /* IL_264D: box System.Int64*/
        st_80D = {
            'boxed': st_80C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2652: call Void Log(System.Object)*/
        (asm1.x6000001)(st_80D);
        /* IL_2657: ldstr Mod -2*/
        st_80E = new_string("Mod -2");
        /* IL_265C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_80E);
        /* IL_2661: ldc.i4.s 15*/
        st_80F = (15|0);
        /* IL_2663: conv.i8 */
        st_811 = conv_i8(st_80F);
        /* IL_2664: ldc.i4.s 254*/
        st_810 = (-2|0);
        /* IL_2666: conv.i8 */
        st_812 = conv_i8(st_810);
        /* IL_2667: call Int64 Mod(System.Int64, System.Int64)*/
        st_813 = (asm1.x6000012)(st_811,st_812);
        /* IL_266C: box System.Int64*/
        st_814 = {
            'boxed': st_813,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2671: call Void Log(System.Object)*/
        (asm1.x6000001)(st_814);
        /* IL_2676: ldc.i4 255*/
        st_815 = (255|0);
        /* IL_267B: conv.i8 */
        st_817 = conv_i8(st_815);
        /* IL_267C: ldc.i4.s 254*/
        st_816 = (-2|0);
        /* IL_267E: conv.i8 */
        st_818 = conv_i8(st_816);
        /* IL_267F: call Int64 Mod(System.Int64, System.Int64)*/
        st_819 = (asm1.x6000012)(st_817,st_818);
        /* IL_2684: box System.Int64*/
        st_81A = {
            'boxed': st_819,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2689: call Void Log(System.Object)*/
        (asm1.x6000001)(st_81A);
        /* IL_268E: ldc.i4 4095*/
        st_81B = (4095|0);
        /* IL_2693: conv.i8 */
        st_81D = conv_i8(st_81B);
        /* IL_2694: ldc.i4.s 254*/
        st_81C = (-2|0);
        /* IL_2696: conv.i8 */
        st_81E = conv_i8(st_81C);
        /* IL_2697: call Int64 Mod(System.Int64, System.Int64)*/
        st_81F = (asm1.x6000012)(st_81D,st_81E);
        /* IL_269C: box System.Int64*/
        st_820 = {
            'boxed': st_81F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_26A1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_820);
        /* IL_26A6: ldc.i4 65535*/
        st_821 = (65535|0);
        /* IL_26AB: conv.i8 */
        st_823 = conv_i8(st_821);
        /* IL_26AC: ldc.i4.s 254*/
        st_822 = (-2|0);
        /* IL_26AE: conv.i8 */
        st_824 = conv_i8(st_822);
        /* IL_26AF: call Int64 Mod(System.Int64, System.Int64)*/
        st_825 = (asm1.x6000012)(st_823,st_824);
        /* IL_26B4: box System.Int64*/
        st_826 = {
            'boxed': st_825,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_26B9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_826);
        /* IL_26BE: ldc.i4 1048575*/
        st_827 = (1048575|0);
        /* IL_26C3: conv.i8 */
        st_829 = conv_i8(st_827);
        /* IL_26C4: ldc.i4.s 254*/
        st_828 = (-2|0);
        /* IL_26C6: conv.i8 */
        st_82A = conv_i8(st_828);
        /* IL_26C7: call Int64 Mod(System.Int64, System.Int64)*/
        st_82B = (asm1.x6000012)(st_829,st_82A);
        /* IL_26CC: box System.Int64*/
        st_82C = {
            'boxed': st_82B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_26D1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_82C);
        /* IL_26D6: ldc.i4 16777215*/
        st_82D = (16777215|0);
        /* IL_26DB: conv.i8 */
        st_82F = conv_i8(st_82D);
        /* IL_26DC: ldc.i4.s 254*/
        st_82E = (-2|0);
        /* IL_26DE: conv.i8 */
        st_830 = conv_i8(st_82E);
        /* IL_26DF: call Int64 Mod(System.Int64, System.Int64)*/
        st_831 = (asm1.x6000012)(st_82F,st_830);
        /* IL_26E4: box System.Int64*/
        st_832 = {
            'boxed': st_831,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_26E9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_832);
        /* IL_26EE: ldc.i4 268435455*/
        st_833 = (268435455|0);
        /* IL_26F3: conv.i8 */
        st_835 = conv_i8(st_833);
        /* IL_26F4: ldc.i4.s 254*/
        st_834 = (-2|0);
        /* IL_26F6: conv.i8 */
        st_836 = conv_i8(st_834);
        /* IL_26F7: call Int64 Mod(System.Int64, System.Int64)*/
        st_837 = (asm1.x6000012)(st_835,st_836);
        /* IL_26FC: box System.Int64*/
        st_838 = {
            'boxed': st_837,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2701: call Void Log(System.Object)*/
        (asm1.x6000001)(st_838);
        /* IL_2706: ldc.i4.m1 */
        st_839 = (-1|0);
        /* IL_2707: conv.u8 */
        st_83B = conv_u8(st_839);
        /* IL_2708: ldc.i4.s 254*/
        st_83A = (-2|0);
        /* IL_270A: conv.i8 */
        st_83C = conv_i8(st_83A);
        /* IL_270B: call Int64 Mod(System.Int64, System.Int64)*/
        st_83D = (asm1.x6000012)(st_83B,st_83C);
        /* IL_2710: box System.Int64*/
        st_83E = {
            'boxed': st_83D,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2715: call Void Log(System.Object)*/
        (asm1.x6000001)(st_83E);
        /* IL_271A: ldc.i8 68719476735*/
        st_840 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_2723: ldc.i4.s 254*/
        st_83F = (-2|0);
        /* IL_2725: conv.i8 */
        st_841 = conv_i8(st_83F);
        /* IL_2726: call Int64 Mod(System.Int64, System.Int64)*/
        st_842 = (asm1.x6000012)(st_840,st_841);
        /* IL_272B: box System.Int64*/
        st_843 = {
            'boxed': st_842,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2730: call Void Log(System.Object)*/
        (asm1.x6000001)(st_843);
        /* IL_2735: ldc.i8 1099511627775*/
        st_845 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_273E: ldc.i4.s 254*/
        st_844 = (-2|0);
        /* IL_2740: conv.i8 */
        st_846 = conv_i8(st_844);
        /* IL_2741: call Int64 Mod(System.Int64, System.Int64)*/
        st_847 = (asm1.x6000012)(st_845,st_846);
        /* IL_2746: box System.Int64*/
        st_848 = {
            'boxed': st_847,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_274B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_848);
        /* IL_2750: ldc.i8 17592186044415*/
        st_84A = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_2759: ldc.i4.s 254*/
        st_849 = (-2|0);
        /* IL_275B: conv.i8 */
        st_84B = conv_i8(st_849);
        /* IL_275C: call Int64 Mod(System.Int64, System.Int64)*/
        st_84C = (asm1.x6000012)(st_84A,st_84B);
        /* IL_2761: box System.Int64*/
        st_84D = {
            'boxed': st_84C,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2766: call Void Log(System.Object)*/
        (asm1.x6000001)(st_84D);
        /* IL_276B: ldc.i8 281474976710655*/
        st_84F = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_2774: ldc.i4.s 254*/
        st_84E = (-2|0);
        /* IL_2776: conv.i8 */
        st_850 = conv_i8(st_84E);
        /* IL_2777: call Int64 Mod(System.Int64, System.Int64)*/
        st_851 = (asm1.x6000012)(st_84F,st_850);
        /* IL_277C: box System.Int64*/
        st_852 = {
            'boxed': st_851,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2781: call Void Log(System.Object)*/
        (asm1.x6000001)(st_852);
        /* IL_2786: ldc.i8 4503599627370495*/
        st_854 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_278F: ldc.i4.s 254*/
        st_853 = (-2|0);
        /* IL_2791: conv.i8 */
        st_855 = conv_i8(st_853);
        /* IL_2792: call Int64 Mod(System.Int64, System.Int64)*/
        st_856 = (asm1.x6000012)(st_854,st_855);
        /* IL_2797: box System.Int64*/
        st_857 = {
            'boxed': st_856,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_279C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_857);
        /* IL_27A1: ldc.i8 72057594037927935*/
        st_859 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_27AA: ldc.i4.s 254*/
        st_858 = (-2|0);
        /* IL_27AC: conv.i8 */
        st_85A = conv_i8(st_858);
        /* IL_27AD: call Int64 Mod(System.Int64, System.Int64)*/
        st_85B = (asm1.x6000012)(st_859,st_85A);
        /* IL_27B2: box System.Int64*/
        st_85C = {
            'boxed': st_85B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_27B7: call Void Log(System.Object)*/
        (asm1.x6000001)(st_85C);
        /* IL_27BC: ldstr Mod 0x1, 0x010, 0x0101 etc*/
        st_85D = new_string("Mod 0x1, 0x010, 0x0101 etc");
        /* IL_27C1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_85D);
        /* IL_27C6: ldc.i4 255*/
        st_85E = (255|0);
        /* IL_27CB: conv.i8 */
        st_860 = conv_i8(st_85E);
        /* IL_27CC: ldc.i4.1 */
        st_85F = (1|0);
        /* IL_27CD: conv.i8 */
        st_861 = conv_i8(st_85F);
        /* IL_27CE: call Int64 Mod(System.Int64, System.Int64)*/
        st_862 = (asm1.x6000012)(st_860,st_861);
        /* IL_27D3: box System.Int64*/
        st_863 = {
            'boxed': st_862,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_27D8: call Void Log(System.Object)*/
        (asm1.x6000001)(st_863);
        /* IL_27DD: ldc.i4 4095*/
        st_864 = (4095|0);
        /* IL_27E2: conv.i8 */
        st_866 = conv_i8(st_864);
        /* IL_27E3: ldc.i4.s 16*/
        st_865 = (16|0);
        /* IL_27E5: conv.i8 */
        st_867 = conv_i8(st_865);
        /* IL_27E6: call Int64 Mod(System.Int64, System.Int64)*/
        st_868 = (asm1.x6000012)(st_866,st_867);
        /* IL_27EB: box System.Int64*/
        st_869 = {
            'boxed': st_868,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_27F0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_869);
        /* IL_27F5: ldc.i4 65535*/
        st_86A = (65535|0);
        /* IL_27FA: conv.i8 */
        st_86C = conv_i8(st_86A);
        /* IL_27FB: ldc.i4 257*/
        st_86B = (257|0);
        /* IL_2800: conv.i8 */
        st_86D = conv_i8(st_86B);
        /* IL_2801: call Int64 Mod(System.Int64, System.Int64)*/
        st_86E = (asm1.x6000012)(st_86C,st_86D);
        /* IL_2806: box System.Int64*/
        st_86F = {
            'boxed': st_86E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_280B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_86F);
        /* IL_2810: ldc.i4 1048575*/
        st_870 = (1048575|0);
        /* IL_2815: conv.i8 */
        st_872 = conv_i8(st_870);
        /* IL_2816: ldc.i4 4112*/
        st_871 = (4112|0);
        /* IL_281B: conv.i8 */
        st_873 = conv_i8(st_871);
        /* IL_281C: call Int64 Mod(System.Int64, System.Int64)*/
        st_874 = (asm1.x6000012)(st_872,st_873);
        /* IL_2821: box System.Int64*/
        st_875 = {
            'boxed': st_874,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2826: call Void Log(System.Object)*/
        (asm1.x6000001)(st_875);
        /* IL_282B: ldc.i4 16777215*/
        st_876 = (16777215|0);
        /* IL_2830: conv.i8 */
        st_878 = conv_i8(st_876);
        /* IL_2831: ldc.i4 65793*/
        st_877 = (65793|0);
        /* IL_2836: conv.i8 */
        st_879 = conv_i8(st_877);
        /* IL_2837: call Int64 Mod(System.Int64, System.Int64)*/
        st_87A = (asm1.x6000012)(st_878,st_879);
        /* IL_283C: box System.Int64*/
        st_87B = {
            'boxed': st_87A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2841: call Void Log(System.Object)*/
        (asm1.x6000001)(st_87B);
        /* IL_2846: ldc.i4 268435455*/
        st_87C = (268435455|0);
        /* IL_284B: conv.i8 */
        st_87E = conv_i8(st_87C);
        /* IL_284C: ldc.i4 1052688*/
        st_87D = (1052688|0);
        /* IL_2851: conv.i8 */
        st_87F = conv_i8(st_87D);
        /* IL_2852: call Int64 Mod(System.Int64, System.Int64)*/
        st_880 = (asm1.x6000012)(st_87E,st_87F);
        /* IL_2857: box System.Int64*/
        st_881 = {
            'boxed': st_880,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_285C: call Void Log(System.Object)*/
        (asm1.x6000001)(st_881);
        /* IL_2861: ldc.i4.m1 */
        st_882 = (-1|0);
        /* IL_2862: conv.u8 */
        st_884 = conv_u8(st_882);
        /* IL_2863: ldc.i4 16843009*/
        st_883 = (16843009|0);
        /* IL_2868: conv.i8 */
        st_885 = conv_i8(st_883);
        /* IL_2869: call Int64 Mod(System.Int64, System.Int64)*/
        st_886 = (asm1.x6000012)(st_884,st_885);
        /* IL_286E: box System.Int64*/
        st_887 = {
            'boxed': st_886,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2873: call Void Log(System.Object)*/
        (asm1.x6000001)(st_887);
        /* IL_2878: ldc.i8 68719476735*/
        st_889 = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_2881: ldc.i4 269488144*/
        st_888 = (269488144|0);
        /* IL_2886: conv.i8 */
        st_88A = conv_i8(st_888);
        /* IL_2887: call Int64 Mod(System.Int64, System.Int64)*/
        st_88B = (asm1.x6000012)(st_889,st_88A);
        /* IL_288C: box System.Int64*/
        st_88C = {
            'boxed': st_88B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2891: call Void Log(System.Object)*/
        (asm1.x6000001)(st_88C);
        /* IL_2896: ldc.i8 1099511627775*/
        st_88D = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_289F: ldc.i8 4311810305*/
        st_88E = new Uint32Array([ 0x1010101,0x1 ]);
        /* IL_28A8: call Int64 Mod(System.Int64, System.Int64)*/
        st_88F = (asm1.x6000012)(st_88D,st_88E);
        /* IL_28AD: box System.Int64*/
        st_890 = {
            'boxed': st_88F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_28B2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_890);
        /* IL_28B7: ldc.i8 17592186044415*/
        st_891 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_28C0: ldc.i8 68988964880*/
        st_892 = new Uint32Array([ 0x10101010,0x10 ]);
        /* IL_28C9: call Int64 Mod(System.Int64, System.Int64)*/
        st_893 = (asm1.x6000012)(st_891,st_892);
        /* IL_28CE: box System.Int64*/
        st_894 = {
            'boxed': st_893,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_28D3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_894);
        /* IL_28D8: ldc.i8 281474976710655*/
        st_895 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_28E1: ldc.i8 1103823438081*/
        st_896 = new Uint32Array([ 0x1010101,0x101 ]);
        /* IL_28EA: call Int64 Mod(System.Int64, System.Int64)*/
        st_897 = (asm1.x6000012)(st_895,st_896);
        /* IL_28EF: box System.Int64*/
        st_898 = {
            'boxed': st_897,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_28F4: call Void Log(System.Object)*/
        (asm1.x6000001)(st_898);
        /* IL_28F9: ldc.i8 4503599627370495*/
        st_899 = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_2902: ldc.i8 17661175009296*/
        st_89A = new Uint32Array([ 0x10101010,0x1010 ]);
        /* IL_290B: call Int64 Mod(System.Int64, System.Int64)*/
        st_89B = (asm1.x6000012)(st_899,st_89A);
        /* IL_2910: box System.Int64*/
        st_89C = {
            'boxed': st_89B,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2915: call Void Log(System.Object)*/
        (asm1.x6000001)(st_89C);
        /* IL_291A: ldc.i8 72057594037927935*/
        st_89D = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_2923: ldc.i8 282578800148737*/
        st_89E = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_292C: call Int64 Mod(System.Int64, System.Int64)*/
        st_89F = (asm1.x6000012)(st_89D,st_89E);
        /* IL_2931: box System.Int64*/
        st_8A0 = {
            'boxed': st_89F,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2936: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8A0);
        /* IL_293B: ldstr Mod -0x1, -0x010, -0x0101 etc*/
        st_8A1 = new_string("Mod -0x1, -0x010, -0x0101 etc");
        /* IL_2940: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8A1);
        /* IL_2945: ldc.i4 255*/
        st_8A2 = (255|0);
        /* IL_294A: conv.i8 */
        st_8A4 = conv_i8(st_8A2);
        /* IL_294B: ldc.i4.m1 */
        st_8A3 = (-1|0);
        /* IL_294C: conv.i8 */
        st_8A5 = conv_i8(st_8A3);
        /* IL_294D: call Int64 Mod(System.Int64, System.Int64)*/
        st_8A6 = (asm1.x6000012)(st_8A4,st_8A5);
        /* IL_2952: box System.Int64*/
        st_8A7 = {
            'boxed': st_8A6,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2957: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8A7);
        /* IL_295C: ldc.i4 4095*/
        st_8A8 = (4095|0);
        /* IL_2961: conv.i8 */
        st_8AA = conv_i8(st_8A8);
        /* IL_2962: ldc.i4.s 240*/
        st_8A9 = (-16|0);
        /* IL_2964: conv.i8 */
        st_8AB = conv_i8(st_8A9);
        /* IL_2965: call Int64 Mod(System.Int64, System.Int64)*/
        st_8AC = (asm1.x6000012)(st_8AA,st_8AB);
        /* IL_296A: box System.Int64*/
        st_8AD = {
            'boxed': st_8AC,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_296F: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8AD);
        /* IL_2974: ldc.i4 65535*/
        st_8AE = (65535|0);
        /* IL_2979: conv.i8 */
        st_8B0 = conv_i8(st_8AE);
        /* IL_297A: ldc.i4 -257*/
        st_8AF = (-257|0);
        /* IL_297F: conv.i8 */
        st_8B1 = conv_i8(st_8AF);
        /* IL_2980: call Int64 Mod(System.Int64, System.Int64)*/
        st_8B2 = (asm1.x6000012)(st_8B0,st_8B1);
        /* IL_2985: box System.Int64*/
        st_8B3 = {
            'boxed': st_8B2,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_298A: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8B3);
        /* IL_298F: ldc.i4 1048575*/
        st_8B4 = (1048575|0);
        /* IL_2994: conv.i8 */
        st_8B6 = conv_i8(st_8B4);
        /* IL_2995: ldc.i4 -4112*/
        st_8B5 = (-4112|0);
        /* IL_299A: conv.i8 */
        st_8B7 = conv_i8(st_8B5);
        /* IL_299B: call Int64 Mod(System.Int64, System.Int64)*/
        st_8B8 = (asm1.x6000012)(st_8B6,st_8B7);
        /* IL_29A0: box System.Int64*/
        st_8B9 = {
            'boxed': st_8B8,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_29A5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8B9);
        /* IL_29AA: ldc.i4 16777215*/
        st_8BA = (16777215|0);
        /* IL_29AF: conv.i8 */
        st_8BC = conv_i8(st_8BA);
        /* IL_29B0: ldc.i4 -65793*/
        st_8BB = (-65793|0);
        /* IL_29B5: conv.i8 */
        st_8BD = conv_i8(st_8BB);
        /* IL_29B6: call Int64 Mod(System.Int64, System.Int64)*/
        st_8BE = (asm1.x6000012)(st_8BC,st_8BD);
        /* IL_29BB: box System.Int64*/
        st_8BF = {
            'boxed': st_8BE,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_29C0: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8BF);
        /* IL_29C5: ldc.i4 268435455*/
        st_8C0 = (268435455|0);
        /* IL_29CA: conv.i8 */
        st_8C2 = conv_i8(st_8C0);
        /* IL_29CB: ldc.i4 -1052688*/
        st_8C1 = (-1052688|0);
        /* IL_29D0: conv.i8 */
        st_8C3 = conv_i8(st_8C1);
        /* IL_29D1: call Int64 Mod(System.Int64, System.Int64)*/
        st_8C4 = (asm1.x6000012)(st_8C2,st_8C3);
        /* IL_29D6: box System.Int64*/
        st_8C5 = {
            'boxed': st_8C4,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_29DB: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8C5);
        /* IL_29E0: ldc.i4.m1 */
        st_8C6 = (-1|0);
        /* IL_29E1: conv.u8 */
        st_8C8 = conv_u8(st_8C6);
        /* IL_29E2: ldc.i4 -16843009*/
        st_8C7 = (-16843009|0);
        /* IL_29E7: conv.i8 */
        st_8C9 = conv_i8(st_8C7);
        /* IL_29E8: call Int64 Mod(System.Int64, System.Int64)*/
        st_8CA = (asm1.x6000012)(st_8C8,st_8C9);
        /* IL_29ED: box System.Int64*/
        st_8CB = {
            'boxed': st_8CA,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_29F2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8CB);
        /* IL_29F7: ldc.i8 68719476735*/
        st_8CD = new Uint32Array([ 0xFFFFFFFF,0xF ]);
        /* IL_2A00: ldc.i4 -269488144*/
        st_8CC = (-269488144|0);
        /* IL_2A05: conv.i8 */
        st_8CE = conv_i8(st_8CC);
        /* IL_2A06: call Int64 Mod(System.Int64, System.Int64)*/
        st_8CF = (asm1.x6000012)(st_8CD,st_8CE);
        /* IL_2A0B: box System.Int64*/
        st_8D0 = {
            'boxed': st_8CF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2A10: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8D0);
        /* IL_2A15: ldc.i8 1099511627775*/
        st_8D1 = new Uint32Array([ 0xFFFFFFFF,0xFF ]);
        /* IL_2A1E: ldc.i8 -4311810305*/
        st_8D2 = new Uint32Array([ 0xFEFEFEFF,0xFFFFFFFE ]);
        /* IL_2A27: call Int64 Mod(System.Int64, System.Int64)*/
        st_8D3 = (asm1.x6000012)(st_8D1,st_8D2);
        /* IL_2A2C: box System.Int64*/
        st_8D4 = {
            'boxed': st_8D3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2A31: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8D4);
        /* IL_2A36: ldc.i8 17592186044415*/
        st_8D5 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_2A3F: ldc.i8 -68988964880*/
        st_8D6 = new Uint32Array([ 0xEFEFEFF0,0xFFFFFFEF ]);
        /* IL_2A48: call Int64 Mod(System.Int64, System.Int64)*/
        st_8D7 = (asm1.x6000012)(st_8D5,st_8D6);
        /* IL_2A4D: box System.Int64*/
        st_8D8 = {
            'boxed': st_8D7,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2A52: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8D8);
        /* IL_2A57: ldc.i8 281474976710655*/
        st_8D9 = new Uint32Array([ 0xFFFFFFFF,0xFFFF ]);
        /* IL_2A60: ldc.i8 -1103823438081*/
        st_8DA = new Uint32Array([ 0xFEFEFEFF,0xFFFFFEFE ]);
        /* IL_2A69: call Int64 Mod(System.Int64, System.Int64)*/
        st_8DB = (asm1.x6000012)(st_8D9,st_8DA);
        /* IL_2A6E: box System.Int64*/
        st_8DC = {
            'boxed': st_8DB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2A73: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8DC);
        /* IL_2A78: ldc.i8 4503599627370495*/
        st_8DD = new Uint32Array([ 0xFFFFFFFF,0xFFFFF ]);
        /* IL_2A81: ldc.i8 -17661175009296*/
        st_8DE = new Uint32Array([ 0xEFEFEFF0,0xFFFFEFEF ]);
        /* IL_2A8A: call Int64 Mod(System.Int64, System.Int64)*/
        st_8DF = (asm1.x6000012)(st_8DD,st_8DE);
        /* IL_2A8F: box System.Int64*/
        st_8E0 = {
            'boxed': st_8DF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2A94: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8E0);
        /* IL_2A99: ldc.i8 72057594037927935*/
        st_8E1 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_2AA2: ldc.i8 -282578800148737*/
        st_8E2 = new Uint32Array([ 0xFEFEFEFF,0xFFFEFEFE ]);
        /* IL_2AAB: call Int64 Mod(System.Int64, System.Int64)*/
        st_8E3 = (asm1.x6000012)(st_8E1,st_8E2);
        /* IL_2AB0: box System.Int64*/
        st_8E4 = {
            'boxed': st_8E3,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2AB5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8E4);
        /* IL_2ABA: ldc.i4.s 15*/
        st_8E5 = (15|0);
        /* IL_2ABC: conv.i8 */
        st_8E7 = conv_i8(st_8E5);
        /* IL_2ABD: ldc.i4.2 */
        st_8E6 = (2|0);
        /* IL_2ABE: conv.i8 */
        st_8E8 = conv_i8(st_8E6);
        /* IL_2ABF: call Int64 Mod(System.Int64, System.Int64)*/
        st_8E9 = (asm1.x6000012)(st_8E7,st_8E8);
        /* IL_2AC4: box System.Int64*/
        st_8EA = {
            'boxed': st_8E9,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2AC9: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8EA);
        /* IL_2ACE: ldc.i4.s 15*/
        st_8EB = (15|0);
        /* IL_2AD0: conv.i8 */
        st_8ED = conv_i8(st_8EB);
        /* IL_2AD1: ldc.i4.s 254*/
        st_8EC = (-2|0);
        /* IL_2AD3: conv.i8 */
        st_8EE = conv_i8(st_8EC);
        /* IL_2AD4: call Int64 Mod(System.Int64, System.Int64)*/
        st_8EF = (asm1.x6000012)(st_8ED,st_8EE);
        /* IL_2AD9: box System.Int64*/
        st_8F0 = {
            'boxed': st_8EF,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2ADE: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8F0);
        /* IL_2AE3: ldc.i4.s 241*/
        st_8F1 = (-15|0);
        /* IL_2AE5: conv.i8 */
        st_8F3 = conv_i8(st_8F1);
        /* IL_2AE6: ldc.i4.s 254*/
        st_8F2 = (-2|0);
        /* IL_2AE8: conv.i8 */
        st_8F4 = conv_i8(st_8F2);
        /* IL_2AE9: call Int64 Mod(System.Int64, System.Int64)*/
        st_8F5 = (asm1.x6000012)(st_8F3,st_8F4);
        /* IL_2AEE: box System.Int64*/
        st_8F6 = {
            'boxed': st_8F5,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2AF3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8F6);
        /* IL_2AF8: ldc.i4.s 241*/
        st_8F7 = (-15|0);
        /* IL_2AFA: conv.i8 */
        st_8F9 = conv_i8(st_8F7);
        /* IL_2AFB: ldc.i4.2 */
        st_8F8 = (2|0);
        /* IL_2AFC: conv.i8 */
        st_8FA = conv_i8(st_8F8);
        /* IL_2AFD: call Int64 Mod(System.Int64, System.Int64)*/
        st_8FB = (asm1.x6000012)(st_8F9,st_8FA);
        /* IL_2B02: box System.Int64*/
        st_8FC = {
            'boxed': st_8FB,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_2B07: call Void Log(System.Object)*/
        (asm1.x6000001)(st_8FC);
        /* IL_2B0C: ldc.i4.0 */
        st_8FD = (0|0);
        /* IL_2B0D: conv.i8 */
        st_8FE = conv_i8(st_8FD);
        /* IL_2B0E: call Void TestRightShift(System.Int64)*/
        (asm1.x6000013)(st_8FE);
        /* IL_2B13: ldc.i4.1 */
        st_8FF = (1|0);
        /* IL_2B14: conv.i8 */
        st_900 = conv_i8(st_8FF);
        /* IL_2B15: call Void TestRightShift(System.Int64)*/
        (asm1.x6000013)(st_900);
        /* IL_2B1A: ldc.i4 255*/
        st_901 = (255|0);
        /* IL_2B1F: conv.i8 */
        st_902 = conv_i8(st_901);
        /* IL_2B20: call Void TestRightShift(System.Int64)*/
        (asm1.x6000013)(st_902);
        /* IL_2B25: ldc.i8 282578800148737*/
        st_903 = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_2B2E: call Void TestRightShift(System.Int64)*/
        (asm1.x6000013)(st_903);
        /* IL_2B33: ldc.i8 4503599627370496*/
        st_904 = new Uint32Array([ 0x0,0x100000 ]);
        /* IL_2B3C: call Void TestRightShift(System.Int64)*/
        (asm1.x6000013)(st_904);
        /* IL_2B41: ldc.i8 72057594037927935*/
        st_905 = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_2B4A: call Void TestRightShift(System.Int64)*/
        (asm1.x6000013)(st_905);
        /* IL_2B4F: ldc.i4.0 */
        st_906 = (0|0);
        /* IL_2B50: conv.i8 */
        st_907 = conv_i8(st_906);
        /* IL_2B51: call Void TestLeftShift(System.Int64)*/
        (asm1.x6000014)(st_907);
        /* IL_2B56: ldc.i4.1 */
        st_908 = (1|0);
        /* IL_2B57: conv.i8 */
        st_909 = conv_i8(st_908);
        /* IL_2B58: call Void TestLeftShift(System.Int64)*/
        (asm1.x6000014)(st_909);
        /* IL_2B5D: ldc.i4 255*/
        st_90A = (255|0);
        /* IL_2B62: conv.i8 */
        st_90B = conv_i8(st_90A);
        /* IL_2B63: call Void TestLeftShift(System.Int64)*/
        (asm1.x6000014)(st_90B);
        /* IL_2B68: ldc.i8 282578800148737*/
        st_90C = new Uint32Array([ 0x1010101,0x10101 ]);
        /* IL_2B71: call Void TestLeftShift(System.Int64)*/
        (asm1.x6000014)(st_90C);
        /* IL_2B76: ldc.i8 4503599627370496*/
        st_90D = new Uint32Array([ 0x0,0x100000 ]);
        /* IL_2B7F: call Void TestLeftShift(System.Int64)*/
        (asm1.x6000014)(st_90D);
        /* IL_2B84: ldc.i8 72057594037927935*/
        st_90E = new Uint32Array([ 0xFFFFFFFF,0xFFFFFF ]);
        /* IL_2B8D: call Void TestLeftShift(System.Int64)*/
        (asm1.x6000014)(st_90E);
        /* IL_2B92: ldc.i4 255*/
        st_90F = (255|0);
        /* IL_2B97: conv.i8 */
        st_910 = conv_i8(st_90F);
        /* IL_2B98: call Double Double(System.Int64)*/
        st_911 = (asm1.x600000d)(st_910);
        /* IL_2B9D: box System.Double*/
        st_912 = {
            'boxed': st_911,
            'type': t1,
            'vtable': t1.prototype.vtable
        };
        /* IL_2BA2: call Void Log(System.Object)*/
        (asm1.x6000001)(st_912);
        /* IL_2BA7: ldc.i8 17592186044415*/
        st_913 = new Uint32Array([ 0xFFFFFFFF,0xFFF ]);
        /* IL_2BB0: call Double Double(System.Int64)*/
        st_914 = (asm1.x600000d)(st_913);
        /* IL_2BB5: box System.Double*/
        st_915 = {
            'boxed': st_914,
            'type': t1,
            'vtable': t1.prototype.vtable
        };
        /* IL_2BBA: call Void Log(System.Object)*/
        (asm1.x6000001)(st_915);
        /* IL_2BBF: ret */
        return ;
    };
    asm.x600000d = function Double(arg0)
    {
        var st_00;
        var st_01;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: conv.r8 */
        st_01 = to_number(st_00);
        /* IL_02: ret */
        return st_01;
    };;
    asm.x600000e = function Add(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: add */
        st_02 = (asm0.XInt64_Addition)(st_00,st_01);
        /* IL_03: ret */
        return st_02;
    };;
    asm.x600000f = function Sub(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: sub */
        st_02 = (asm0.XInt64_Subtraction)(st_00,st_01);
        /* IL_03: ret */
        return st_02;
    };;
    asm.x6000010 = function Mul(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: mul */
        st_02 = (asm0.XInt64_Multiplication)(st_00,st_01);
        /* IL_03: ret */
        return st_02;
    };;
    asm.x6000011 = function Div(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: div */
        st_02 = (asm0.Int64_Division)(st_00,st_01);
        /* IL_03: ret */
        return st_02;
    };;
    asm.x6000012 = function Mod(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
        /* IL_01: ldarg.1 */
        st_01 = arg1;
        /* IL_02: rem */
        st_02 = (asm0.Int64_Modulus)(st_00,st_01);
        /* IL_03: ret */
        return st_02;
    };;
    asm.x6000013_init = function ()
    {
        (((asm0)["System.Int64"])().init)();
        asm.x6000013 = asm.x6000013_;
    };;
    asm.x6000013 = function (arg0)
    {
        (asm.x6000013_init.apply)(this,arguments);
        return (asm.x6000013.apply)(this,arguments);
    };;
    asm.x6000013_ = function TestRightShift(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var st_16;
        var st_17;
        var st_18;
        var st_19;
        var st_1A;
        var st_1B;
        var st_1C;
        var st_1D;
        var st_1E;
        var st_1F;
        var st_20;
        var st_21;
        var st_22;
        var st_23;
        var st_24;
        var st_25;
        var st_26;
        var st_27;
        var st_28;
        var st_29;
        var st_2A;
        var st_2B;
        var st_2C;
        var st_2D;
        var st_2E;
        var st_2F;
        var st_30;
        var st_31;
        var st_32;
        var st_33;
        var st_34;
        var st_35;
        var st_36;
        var st_37;
        var st_38;
        var st_39;
        var st_3A;
        var st_3B;
        var st_3C;
        var st_3D;
        var st_3E;
        var st_3F;
        t0 = ((asm0)["System.Int64"])();
        /* IL_00: ldstr RightShift */
        st_01 = new_string("RightShift ");
        /* IL_05: ldarg.0 */
        st_00 = arg0;
        /* IL_06: box System.Int64*/
        st_02 = {
            'boxed': st_00,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_0B: call String Concat(System.Object, System.Object)*/
        st_03 = (asm0.x60000af)(st_01,st_02);
        /* IL_10: call Void Log(System.Object)*/
        (asm1.x6000001)(st_03);
        /* IL_15: ldarg.0 */
        st_04 = arg0;
        /* IL_16: ldc.i4.0 */
        st_05 = (0|0);
        /* IL_17: call Int64 RightShift(System.Int64, System.Int32)*/
        st_06 = (asm1.x6000015)(st_04,st_05);
        /* IL_1C: box System.Int64*/
        st_07 = {
            'boxed': st_06,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_21: call Void Log(System.Object)*/
        (asm1.x6000001)(st_07);
        /* IL_26: ldarg.0 */
        st_08 = arg0;
        /* IL_27: ldc.i4.1 */
        st_09 = (1|0);
        /* IL_28: call Int64 RightShift(System.Int64, System.Int32)*/
        st_0A = (asm1.x6000015)(st_08,st_09);
        /* IL_2D: box System.Int64*/
        st_0B = {
            'boxed': st_0A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_32: call Void Log(System.Object)*/
        (asm1.x6000001)(st_0B);
        /* IL_37: ldarg.0 */
        st_0C = arg0;
        /* IL_38: ldc.i4.2 */
        st_0D = (2|0);
        /* IL_39: call Int64 RightShift(System.Int64, System.Int32)*/
        st_0E = (asm1.x6000015)(st_0C,st_0D);
        /* IL_3E: box System.Int64*/
        st_0F = {
            'boxed': st_0E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_43: call Void Log(System.Object)*/
        (asm1.x6000001)(st_0F);
        /* IL_48: ldarg.0 */
        st_10 = arg0;
        /* IL_49: ldc.i4.7 */
        st_11 = (7|0);
        /* IL_4A: call Int64 RightShift(System.Int64, System.Int32)*/
        st_12 = (asm1.x6000015)(st_10,st_11);
        /* IL_4F: box System.Int64*/
        st_13 = {
            'boxed': st_12,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_54: call Void Log(System.Object)*/
        (asm1.x6000001)(st_13);
        /* IL_59: ldarg.0 */
        st_14 = arg0;
        /* IL_5A: ldc.i4.8 */
        st_15 = (8|0);
        /* IL_5B: call Int64 RightShift(System.Int64, System.Int32)*/
        st_16 = (asm1.x6000015)(st_14,st_15);
        /* IL_60: box System.Int64*/
        st_17 = {
            'boxed': st_16,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_65: call Void Log(System.Object)*/
        (asm1.x6000001)(st_17);
        /* IL_6A: ldarg.0 */
        st_18 = arg0;
        /* IL_6B: ldc.i4.s 9*/
        st_19 = (9|0);
        /* IL_6D: call Int64 RightShift(System.Int64, System.Int32)*/
        st_1A = (asm1.x6000015)(st_18,st_19);
        /* IL_72: box System.Int64*/
        st_1B = {
            'boxed': st_1A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_77: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1B);
        /* IL_7C: ldarg.0 */
        st_1C = arg0;
        /* IL_7D: ldc.i4.s 15*/
        st_1D = (15|0);
        /* IL_7F: call Int64 RightShift(System.Int64, System.Int32)*/
        st_1E = (asm1.x6000015)(st_1C,st_1D);
        /* IL_84: box System.Int64*/
        st_1F = {
            'boxed': st_1E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_89: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1F);
        /* IL_8E: ldarg.0 */
        st_20 = arg0;
        /* IL_8F: ldc.i4.s 16*/
        st_21 = (16|0);
        /* IL_91: call Int64 RightShift(System.Int64, System.Int32)*/
        st_22 = (asm1.x6000015)(st_20,st_21);
        /* IL_96: box System.Int64*/
        st_23 = {
            'boxed': st_22,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_9B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_23);
        /* IL_A0: ldarg.0 */
        st_24 = arg0;
        /* IL_A1: ldc.i4.s 17*/
        st_25 = (17|0);
        /* IL_A3: call Int64 RightShift(System.Int64, System.Int32)*/
        st_26 = (asm1.x6000015)(st_24,st_25);
        /* IL_A8: box System.Int64*/
        st_27 = {
            'boxed': st_26,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_AD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_27);
        /* IL_B2: ldarg.0 */
        st_28 = arg0;
        /* IL_B3: ldc.i4.s 23*/
        st_29 = (23|0);
        /* IL_B5: call Int64 RightShift(System.Int64, System.Int32)*/
        st_2A = (asm1.x6000015)(st_28,st_29);
        /* IL_BA: box System.Int64*/
        st_2B = {
            'boxed': st_2A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_BF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2B);
        /* IL_C4: ldarg.0 */
        st_2C = arg0;
        /* IL_C5: ldc.i4.s 24*/
        st_2D = (24|0);
        /* IL_C7: call Int64 RightShift(System.Int64, System.Int32)*/
        st_2E = (asm1.x6000015)(st_2C,st_2D);
        /* IL_CC: box System.Int64*/
        st_2F = {
            'boxed': st_2E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2F);
        /* IL_D6: ldarg.0 */
        st_30 = arg0;
        /* IL_D7: ldc.i4.s 25*/
        st_31 = (25|0);
        /* IL_D9: call Int64 RightShift(System.Int64, System.Int32)*/
        st_32 = (asm1.x6000015)(st_30,st_31);
        /* IL_DE: box System.Int64*/
        st_33 = {
            'boxed': st_32,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_33);
        /* IL_E8: ldarg.0 */
        st_34 = arg0;
        /* IL_E9: ldc.i4.s 31*/
        st_35 = (31|0);
        /* IL_EB: call Int64 RightShift(System.Int64, System.Int32)*/
        st_36 = (asm1.x6000015)(st_34,st_35);
        /* IL_F0: box System.Int64*/
        st_37 = {
            'boxed': st_36,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_F5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_37);
        /* IL_FA: ldarg.0 */
        st_38 = arg0;
        /* IL_FB: ldc.i4.s 32*/
        st_39 = (32|0);
        /* IL_FD: call Int64 RightShift(System.Int64, System.Int32)*/
        st_3A = (asm1.x6000015)(st_38,st_39);
        /* IL_102: box System.Int64*/
        st_3B = {
            'boxed': st_3A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_107: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3B);
        /* IL_10C: ldarg.0 */
        st_3C = arg0;
        /* IL_10D: ldc.i4.s 33*/
        st_3D = (33|0);
        /* IL_10F: call Int64 RightShift(System.Int64, System.Int32)*/
        st_3E = (asm1.x6000015)(st_3C,st_3D);
        /* IL_114: box System.Int64*/
        st_3F = {
            'boxed': st_3E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_119: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3F);
        /* IL_11E: ret */
        return ;
    };
    asm.x6000014_init = function ()
    {
        (((asm0)["System.Int64"])().init)();
        asm.x6000014 = asm.x6000014_;
    };;
    asm.x6000014 = function (arg0)
    {
        (asm.x6000014_init.apply)(this,arguments);
        return (asm.x6000014.apply)(this,arguments);
    };;
    asm.x6000014_ = function TestLeftShift(arg0)
    {
        var t0;
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        var st_05;
        var st_06;
        var st_07;
        var st_08;
        var st_09;
        var st_0A;
        var st_0B;
        var st_0C;
        var st_0D;
        var st_0E;
        var st_0F;
        var st_10;
        var st_11;
        var st_12;
        var st_13;
        var st_14;
        var st_15;
        var st_16;
        var st_17;
        var st_18;
        var st_19;
        var st_1A;
        var st_1B;
        var st_1C;
        var st_1D;
        var st_1E;
        var st_1F;
        var st_20;
        var st_21;
        var st_22;
        var st_23;
        var st_24;
        var st_25;
        var st_26;
        var st_27;
        var st_28;
        var st_29;
        var st_2A;
        var st_2B;
        var st_2C;
        var st_2D;
        var st_2E;
        var st_2F;
        var st_30;
        var st_31;
        var st_32;
        var st_33;
        var st_34;
        var st_35;
        var st_36;
        var st_37;
        var st_38;
        var st_39;
        var st_3A;
        var st_3B;
        var st_3C;
        var st_3D;
        var st_3E;
        var st_3F;
        t0 = ((asm0)["System.Int64"])();
        /* IL_00: ldstr LeftShift */
        st_01 = new_string("LeftShift ");
        /* IL_05: ldarg.0 */
        st_00 = arg0;
        /* IL_06: box System.Int64*/
        st_02 = {
            'boxed': st_00,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_0B: call String Concat(System.Object, System.Object)*/
        st_03 = (asm0.x60000af)(st_01,st_02);
        /* IL_10: call Void Log(System.Object)*/
        (asm1.x6000001)(st_03);
        /* IL_15: ldarg.0 */
        st_04 = arg0;
        /* IL_16: ldc.i4.0 */
        st_05 = (0|0);
        /* IL_17: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_06 = (asm1.x6000016)(st_04,st_05);
        /* IL_1C: box System.Int64*/
        st_07 = {
            'boxed': st_06,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_21: call Void Log(System.Object)*/
        (asm1.x6000001)(st_07);
        /* IL_26: ldarg.0 */
        st_08 = arg0;
        /* IL_27: ldc.i4.1 */
        st_09 = (1|0);
        /* IL_28: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_0A = (asm1.x6000016)(st_08,st_09);
        /* IL_2D: box System.Int64*/
        st_0B = {
            'boxed': st_0A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_32: call Void Log(System.Object)*/
        (asm1.x6000001)(st_0B);
        /* IL_37: ldarg.0 */
        st_0C = arg0;
        /* IL_38: ldc.i4.2 */
        st_0D = (2|0);
        /* IL_39: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_0E = (asm1.x6000016)(st_0C,st_0D);
        /* IL_3E: box System.Int64*/
        st_0F = {
            'boxed': st_0E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_43: call Void Log(System.Object)*/
        (asm1.x6000001)(st_0F);
        /* IL_48: ldarg.0 */
        st_10 = arg0;
        /* IL_49: ldc.i4.7 */
        st_11 = (7|0);
        /* IL_4A: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_12 = (asm1.x6000016)(st_10,st_11);
        /* IL_4F: box System.Int64*/
        st_13 = {
            'boxed': st_12,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_54: call Void Log(System.Object)*/
        (asm1.x6000001)(st_13);
        /* IL_59: ldarg.0 */
        st_14 = arg0;
        /* IL_5A: ldc.i4.8 */
        st_15 = (8|0);
        /* IL_5B: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_16 = (asm1.x6000016)(st_14,st_15);
        /* IL_60: box System.Int64*/
        st_17 = {
            'boxed': st_16,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_65: call Void Log(System.Object)*/
        (asm1.x6000001)(st_17);
        /* IL_6A: ldarg.0 */
        st_18 = arg0;
        /* IL_6B: ldc.i4.s 9*/
        st_19 = (9|0);
        /* IL_6D: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_1A = (asm1.x6000016)(st_18,st_19);
        /* IL_72: box System.Int64*/
        st_1B = {
            'boxed': st_1A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_77: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1B);
        /* IL_7C: ldarg.0 */
        st_1C = arg0;
        /* IL_7D: ldc.i4.s 15*/
        st_1D = (15|0);
        /* IL_7F: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_1E = (asm1.x6000016)(st_1C,st_1D);
        /* IL_84: box System.Int64*/
        st_1F = {
            'boxed': st_1E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_89: call Void Log(System.Object)*/
        (asm1.x6000001)(st_1F);
        /* IL_8E: ldarg.0 */
        st_20 = arg0;
        /* IL_8F: ldc.i4.s 16*/
        st_21 = (16|0);
        /* IL_91: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_22 = (asm1.x6000016)(st_20,st_21);
        /* IL_96: box System.Int64*/
        st_23 = {
            'boxed': st_22,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_9B: call Void Log(System.Object)*/
        (asm1.x6000001)(st_23);
        /* IL_A0: ldarg.0 */
        st_24 = arg0;
        /* IL_A1: ldc.i4.s 17*/
        st_25 = (17|0);
        /* IL_A3: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_26 = (asm1.x6000016)(st_24,st_25);
        /* IL_A8: box System.Int64*/
        st_27 = {
            'boxed': st_26,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_AD: call Void Log(System.Object)*/
        (asm1.x6000001)(st_27);
        /* IL_B2: ldarg.0 */
        st_28 = arg0;
        /* IL_B3: ldc.i4.s 23*/
        st_29 = (23|0);
        /* IL_B5: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_2A = (asm1.x6000016)(st_28,st_29);
        /* IL_BA: box System.Int64*/
        st_2B = {
            'boxed': st_2A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_BF: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2B);
        /* IL_C4: ldarg.0 */
        st_2C = arg0;
        /* IL_C5: ldc.i4.s 24*/
        st_2D = (24|0);
        /* IL_C7: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_2E = (asm1.x6000016)(st_2C,st_2D);
        /* IL_CC: box System.Int64*/
        st_2F = {
            'boxed': st_2E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_D1: call Void Log(System.Object)*/
        (asm1.x6000001)(st_2F);
        /* IL_D6: ldarg.0 */
        st_30 = arg0;
        /* IL_D7: ldc.i4.s 25*/
        st_31 = (25|0);
        /* IL_D9: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_32 = (asm1.x6000016)(st_30,st_31);
        /* IL_DE: box System.Int64*/
        st_33 = {
            'boxed': st_32,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_E3: call Void Log(System.Object)*/
        (asm1.x6000001)(st_33);
        /* IL_E8: ldarg.0 */
        st_34 = arg0;
        /* IL_E9: ldc.i4.s 31*/
        st_35 = (31|0);
        /* IL_EB: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_36 = (asm1.x6000016)(st_34,st_35);
        /* IL_F0: box System.Int64*/
        st_37 = {
            'boxed': st_36,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_F5: call Void Log(System.Object)*/
        (asm1.x6000001)(st_37);
        /* IL_FA: ldarg.0 */
        st_38 = arg0;
        /* IL_FB: ldc.i4.s 32*/
        st_39 = (32|0);
        /* IL_FD: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_3A = (asm1.x6000016)(st_38,st_39);
        /* IL_102: box System.Int64*/
        st_3B = {
            'boxed': st_3A,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_107: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3B);
        /* IL_10C: ldarg.0 */
        st_3C = arg0;
        /* IL_10D: ldc.i4.s 33*/
        st_3D = (33|0);
        /* IL_10F: call Int64 LeftShift(System.Int64, System.Int32)*/
        st_3E = (asm1.x6000016)(st_3C,st_3D);
        /* IL_114: box System.Int64*/
        st_3F = {
            'boxed': st_3E,
            'type': t0,
            'vtable': t0.prototype.vtable
        };
        /* IL_119: call Void Log(System.Object)*/
        (asm1.x6000001)(st_3F);
        /* IL_11E: ret */
        return ;
    };
    asm.x6000015 = function RightShift(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        /* IL_00: ldarg.0 */
        st_02 = arg0;
        /* IL_01: ldarg.1 */
        st_00 = arg1;
        /* IL_02: ldc.i4.s 63*/
        st_01 = (63|0);
        /* IL_04: and */
        st_03 = (st_00 & st_01);
        /* IL_05: shr */
        st_04 = (asm0.Int64_RightShift)(st_02,st_03);
        /* IL_06: ret */
        return st_04;
    };;
    asm.x6000016 = function LeftShift(arg0,arg1)
    {
        var st_00;
        var st_01;
        var st_02;
        var st_03;
        var st_04;
        /* IL_00: ldarg.0 */
        st_02 = arg0;
        /* IL_01: ldarg.1 */
        st_00 = arg1;
        /* IL_02: ldc.i4.s 63*/
        st_01 = (63|0);
        /* IL_04: and */
        st_03 = (st_00 & st_01);
        /* IL_05: shl */
        st_04 = (asm0.XInt64_LeftShift)(st_02,st_03);
        /* IL_06: ret */
        return st_04;
    };;
    asm.x6000017 = function _ctor(arg0)
    {
        var st_00;
        /* IL_00: ldarg.0 */
        st_00 = arg0;
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
                TestLog.FullName = "TestLog";
                TestLog.Interfaces = [  ];
                TestLog.IsInst = function (t) { return t instanceof TestLog ? t : null; };
                TestLog.IsValueType = false;
                TestLog.IsPrimitive = false;
                TestLog.IsNullable = false;
                TestLog.ArrayType = Array;
                TestLog.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
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
                TestHelper.FullName = "TestHelper";
                TestHelper.Interfaces = [  ];
                TestHelper.IsInst = function (t) { return t instanceof TestHelper ? t : null; };
                TestHelper.IsValueType = false;
                TestHelper.IsPrimitive = false;
                TestHelper.IsNullable = false;
                TestHelper.ArrayType = Array;
                TestHelper.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            TestHelper.prototype = new (((asm0)["System.Object"])())();
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
                Program.FullName = "Program";
                Program.Interfaces = [  ];
                Program.IsInst = function (t) { return t instanceof Program ? t : null; };
                Program.IsValueType = false;
                Program.IsPrimitive = false;
                Program.IsNullable = false;
                Program.ArrayType = Array;
                Program.prototype.vtable = {
                    'asm0.x6000005': function ()
                    {
                        return asm0.x6000005;
                    },
                    'asm0.x6000006': function ()
                    {
                        return asm0.x6000006;
                    },
                    'asm0.x6000009': function ()
                    {
                        return asm0.x6000009;
                    }
                };
            };
            Program.prototype = new (((asm0)["System.Object"])())();
            return c;
        };
    })();
    asm.entryPoint = asm.x600000c;
})(asm1 || (asm1 = {}));
