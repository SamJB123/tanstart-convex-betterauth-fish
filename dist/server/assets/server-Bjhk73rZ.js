//#region node_modules/.pnpm/seroval@1.5.4/node_modules/seroval/dist/esm/production/index.mjs
var M = ((i) => (i[i.AggregateError = 1] = "AggregateError", i[i.ArrowFunction = 2] = "ArrowFunction", i[i.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", i[i.ObjectAssign = 8] = "ObjectAssign", i[i.BigIntTypedArray = 16] = "BigIntTypedArray", i[i.RegExp = 32] = "RegExp", i))(M || {});
var v$1 = Symbol.asyncIterator, pr = Symbol.hasInstance, R = Symbol.isConcatSpreadable, C = Symbol.iterator, dr = Symbol.match, gr = Symbol.matchAll, yr = Symbol.replace, Nr = Symbol.search, br = Symbol.species, vr = Symbol.split, Cr = Symbol.toPrimitive, P$1 = Symbol.toStringTag, Ar = Symbol.unscopables;
var tt = {
	0: "Symbol.asyncIterator",
	1: "Symbol.hasInstance",
	2: "Symbol.isConcatSpreadable",
	3: "Symbol.iterator",
	4: "Symbol.match",
	5: "Symbol.matchAll",
	6: "Symbol.replace",
	7: "Symbol.search",
	8: "Symbol.species",
	9: "Symbol.split",
	10: "Symbol.toPrimitive",
	11: "Symbol.toStringTag",
	12: "Symbol.unscopables"
}, ve = {
	[v$1]: 0,
	[pr]: 1,
	[R]: 2,
	[C]: 3,
	[dr]: 4,
	[gr]: 5,
	[yr]: 6,
	[Nr]: 7,
	[br]: 8,
	[vr]: 9,
	[Cr]: 10,
	[P$1]: 11,
	[Ar]: 12
}, nt = {
	0: v$1,
	1: pr,
	2: R,
	3: C,
	4: dr,
	5: gr,
	6: yr,
	7: Nr,
	8: br,
	9: vr,
	10: Cr,
	11: P$1,
	12: Ar
}, ot = {
	2: "!0",
	3: "!1",
	1: "void 0",
	0: "null",
	4: "-0",
	5: "1/0",
	6: "-1/0",
	7: "0/0"
}, o$1 = void 0, at = {
	2: !0,
	3: !1,
	1: o$1,
	0: null,
	4: -0,
	5: Number.POSITIVE_INFINITY,
	6: Number.NEGATIVE_INFINITY,
	7: NaN
};
var Ce = {
	0: "Error",
	1: "EvalError",
	2: "RangeError",
	3: "ReferenceError",
	4: "SyntaxError",
	5: "TypeError",
	6: "URIError"
}, st = {
	0: Error,
	1: EvalError,
	2: RangeError,
	3: ReferenceError,
	4: SyntaxError,
	5: TypeError,
	6: URIError
};
function c$1(e, r, t, n, a, s, i, u, l, g, S, d) {
	return {
		t: e,
		i: r,
		s: t,
		c: n,
		m: a,
		p: s,
		e: i,
		a: u,
		f: l,
		b: g,
		o: S,
		l: d
	};
}
function B$1(e) {
	return c$1(2, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
var H = B$1(2), J = B$1(3), Ae = B$1(1), Ee = B$1(0), it = B$1(4), ut = B$1(5), lt = B$1(6), ct = B$1(7);
function mn(e) {
	switch (e) {
		case "\"": return "\\\"";
		case "\\": return "\\\\";
		case `
`: return "\\n";
		case "\r": return "\\r";
		case "\b": return "\\b";
		case "	": return "\\t";
		case "\f": return "\\f";
		case "<": return "\\x3C";
		case "\u2028": return "\\u2028";
		case "\u2029": return "\\u2029";
		default: return o$1;
	}
}
function y$1(e) {
	let r = "", t = 0, n;
	for (let a = 0, s = e.length; a < s; a++) n = mn(e[a]), n && (r += e.slice(t, a) + n, t = a + 1);
	return t === 0 ? r = e : r += e.slice(t), r;
}
function pn(e) {
	switch (e) {
		case "\\\\": return "\\";
		case "\\\"": return "\"";
		case "\\n": return `
`;
		case "\\r": return "\r";
		case "\\b": return "\b";
		case "\\t": return "	";
		case "\\f": return "\f";
		case "\\x3C": return "<";
		case "\\u2028": return "\u2028";
		case "\\u2029": return "\u2029";
		default: return e;
	}
}
function D$1(e) {
	return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, pn);
}
var L$1 = "__SEROVAL_REFS__", le = "$R", Ie = `self.${le}`;
function dn(e) {
	return e == null ? `${Ie}=${Ie}||[]` : `(${Ie}=${Ie}||{})["${y$1(e)}"]=[]`;
}
var Er = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map();
function Ir(e) {
	return Er.has(e);
}
function yn(e) {
	return U.has(e);
}
function ft(e) {
	if (Ir(e)) return Er.get(e);
	throw new Re(e);
}
function St(e) {
	if (yn(e)) return U.get(e);
	throw new Pe(e);
}
typeof globalThis != "undefined" ? Object.defineProperty(globalThis, L$1, {
	value: U,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof window != "undefined" ? Object.defineProperty(window, L$1, {
	value: U,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof self != "undefined" ? Object.defineProperty(self, L$1, {
	value: U,
	configurable: !0,
	writable: !1,
	enumerable: !1
}) : typeof global != "undefined" && Object.defineProperty(global, L$1, {
	value: U,
	configurable: !0,
	writable: !1,
	enumerable: !1
});
function xe(e) {
	return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function Nn(e) {
	let r = Ce[xe(e)];
	return e.name !== r ? { name: e.name } : e.constructor.name !== r ? { name: e.constructor.name } : {};
}
function Z(e, r) {
	let t = Nn(e), n = Object.getOwnPropertyNames(e);
	for (let a = 0, s = n.length, i; a < s; a++) i = n[a], i !== "name" && i !== "message" && (i === "stack" ? r & 4 && (t = t || {}, t[i] = e[i]) : (t = t || {}, t[i] = e[i]));
	return t;
}
function Te(e) {
	return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function Oe(e) {
	switch (e) {
		case Number.POSITIVE_INFINITY: return ut;
		case Number.NEGATIVE_INFINITY: return lt;
	}
	return e !== e ? ct : Object.is(e, -0) ? it : c$1(0, o$1, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function $$1(e) {
	return c$1(1, o$1, y$1(e), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function we(e) {
	return c$1(3, o$1, "" + e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function pt(e) {
	return c$1(4, e, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function he(e, r) {
	let t = r.valueOf();
	return c$1(5, e, t !== t ? "" : r.toISOString(), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function ze(e, r) {
	return c$1(6, e, o$1, y$1(r.source), r.flags, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function dt(e, r) {
	return c$1(17, e, ve[r], o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function gt(e, r) {
	return c$1(18, e, y$1(ft(r)), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function ce(e, r, t) {
	return c$1(25, e, t, y$1(r), o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function _e(e, r, t) {
	return c$1(9, e, o$1, o$1, o$1, o$1, o$1, t, o$1, o$1, Te(r), o$1);
}
function ke(e, r) {
	return c$1(21, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function De(e, r, t) {
	return c$1(15, e, o$1, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.length);
}
function Fe(e, r, t) {
	return c$1(16, e, o$1, r.constructor.name, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.byteLength);
}
function Be(e, r, t) {
	return c$1(20, e, o$1, o$1, o$1, o$1, o$1, o$1, t, r.byteOffset, o$1, r.byteLength);
}
function Ve(e, r, t) {
	return c$1(13, e, xe(r), o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Me(e, r, t) {
	return c$1(14, e, xe(r), o$1, y$1(r.message), t, o$1, o$1, o$1, o$1, o$1, o$1);
}
function Le(e, r) {
	return c$1(7, e, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1, o$1);
}
function Ue(e, r) {
	return c$1(28, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1, o$1);
}
function je(e, r) {
	return c$1(30, o$1, o$1, o$1, o$1, o$1, o$1, [e, r], o$1, o$1, o$1, o$1);
}
function Ye(e, r, t) {
	return c$1(31, e, o$1, o$1, o$1, o$1, o$1, t, r, o$1, o$1, o$1);
}
function qe(e, r) {
	return c$1(32, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function We(e, r) {
	return c$1(33, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function Ge(e, r) {
	return c$1(34, e, o$1, o$1, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1);
}
function Ke(e, r, t, n) {
	return c$1(35, e, t, o$1, o$1, o$1, o$1, r, o$1, o$1, o$1, n);
}
var { toString: bs } = Object.prototype;
var bn = {
	parsing: 1,
	serialization: 2,
	deserialization: 3
};
function vn(e) {
	return `Seroval Error (step: ${bn[e]})`;
}
var Cn = (e, r) => vn(e), fe$1 = class extends Error {
	constructor(t, n) {
		super(Cn(t, n));
		this.cause = n;
	}
}, z = class extends fe$1 {
	constructor(r) {
		super("parsing", r);
	}
}, He = class extends fe$1 {
	constructor(r) {
		super("deserialization", r);
	}
};
function _(e) {
	return `Seroval Error (specific: ${e})`;
}
var x$1 = class extends Error {
	constructor(t) {
		super(_(1));
		this.value = t;
	}
}, h$1 = class extends Error {
	constructor(r) {
		super(_(2));
	}
}, X = class extends Error {
	constructor(r) {
		super(_(3));
	}
}, V = class extends Error {
	constructor(r) {
		super(_(4));
	}
}, Re = class extends Error {
	constructor(t) {
		super(_(5));
		this.value = t;
	}
}, Pe = class extends Error {
	constructor(r) {
		super(_(6));
	}
}, Je = class extends Error {
	constructor(r) {
		super(_(7));
	}
}, O$1 = class extends Error {
	constructor(r) {
		super(_(8));
	}
}, Q = class extends Error {
	constructor(r) {
		super(_(9));
	}
};
var j = class {
	constructor(r, t) {
		this.value = r;
		this.replacement = t;
	}
};
var ee = () => {
	let e = {
		p: 0,
		s: 0,
		f: 0
	};
	return e.p = new Promise((r, t) => {
		e.s = r, e.f = t;
	}), e;
}, An = (e, r) => {
	e.s(r), e.p.s = 1, e.p.v = r;
}, En = (e, r) => {
	e.f(r), e.p.s = 2, e.p.v = r;
}, Nt = ee.toString(), bt = An.toString(), vt = En.toString(), Pr = () => {
	let e = [], r = [], t = !0, n = !1, a = 0, s = (l, g, S) => {
		for (S = 0; S < a; S++) r[S] && r[S][g](l);
	}, i = (l, g, S, d) => {
		for (g = 0, S = e.length; g < S; g++) d = e[g], !t && g === S - 1 ? l[n ? "return" : "throw"](d) : l.next(d);
	}, u = (l, g) => (t && (g = a++, r[g] = l), i(l), () => {
		t && (r[g] = r[a], r[a--] = void 0);
	});
	return {
		__SEROVAL_STREAM__: !0,
		on: (l) => u(l),
		next: (l) => {
			t && (e.push(l), s(l, "next"));
		},
		throw: (l) => {
			t && (e.push(l), s(l, "throw"), t = !1, n = !1, r.length = 0);
		},
		return: (l) => {
			t && (e.push(l), s(l, "return"), t = !1, n = !0, r.length = 0);
		}
	};
}, Ct = Pr.toString(), xr = (e) => (r) => () => {
	let t = 0, n = {
		[e]: () => n,
		next: () => {
			if (t > r.d) return {
				done: !0,
				value: void 0
			};
			let a = t++, s = r.v[a];
			if (a === r.t) throw s;
			return {
				done: a === r.d,
				value: s
			};
		}
	};
	return n;
}, At = xr.toString(), Tr = (e, r) => (t) => () => {
	let n = 0, a = -1, s = !1, i = [], u = [], l = (S = 0, d = u.length) => {
		for (; S < d; S++) u[S].s({
			done: !0,
			value: void 0
		});
	};
	t.on({
		next: (S) => {
			let d = u.shift();
			d && d.s({
				done: !1,
				value: S
			}), i.push(S);
		},
		throw: (S) => {
			let d = u.shift();
			d && d.f(S), l(), a = i.length, s = !0, i.push(S);
		},
		return: (S) => {
			let d = u.shift();
			d && d.s({
				done: !0,
				value: S
			}), l(), a = i.length, i.push(S);
		}
	});
	let g = {
		[e]: () => g,
		next: () => {
			if (a === -1) {
				let G = n++;
				if (G >= i.length) {
					let rt = r();
					return u.push(rt), rt.p;
				}
				return {
					done: !1,
					value: i[G]
				};
			}
			if (n > a) return {
				done: !0,
				value: void 0
			};
			let S = n++, d = i[S];
			if (S !== a) return {
				done: !1,
				value: d
			};
			if (s) throw d;
			return {
				done: !0,
				value: d
			};
		}
	};
	return g;
}, Et = Tr.toString(), Or = (e) => {
	let r = atob(e), t = r.length, n = new Uint8Array(t);
	for (let a = 0; a < t; a++) n[a] = r.charCodeAt(a);
	return n.buffer;
}, It = Or.toString();
function Ze(e) {
	return "__SEROVAL_SEQUENCE__" in e;
}
function wr(e, r, t) {
	return {
		__SEROVAL_SEQUENCE__: !0,
		v: e,
		t: r,
		d: t
	};
}
function $e(e) {
	let r = [], t = -1, n = -1, a = e[C]();
	for (;;) try {
		let s = a.next();
		if (r.push(s.value), s.done) {
			n = r.length - 1;
			break;
		}
	} catch (s) {
		t = r.length, r.push(s);
	}
	return wr(r, t, n);
}
var In = xr(C);
function Rt(e) {
	return In(e);
}
var Pt = {}, xt = {};
var Tt = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
	5: {}
}, Ot = {
	0: "[]",
	1: Nt,
	2: bt,
	3: vt,
	4: Ct,
	5: It
};
function Xe(e) {
	return "__SEROVAL_STREAM__" in e;
}
function re() {
	return Pr();
}
function Qe(e) {
	let r = re(), t = e[v$1]();
	async function n() {
		try {
			let a = await t.next();
			a.done ? r.return(a.value) : (r.next(a.value), await n());
		} catch (a) {
			r.throw(a);
		}
	}
	return n().catch(() => {}), r;
}
var Rn = Tr(v$1, ee);
function wt(e) {
	return Rn(e);
}
async function hr(e) {
	try {
		return [1, await e];
	} catch (r) {
		return [0, r];
	}
}
function me(e, r) {
	return {
		plugins: r.plugins,
		mode: e,
		marked: /* @__PURE__ */ new Set(),
		features: 63 ^ (r.disabledFeatures || 0),
		refs: r.refs || /* @__PURE__ */ new Map(),
		depthLimit: r.depthLimit || 1e3
	};
}
function pe$1(e, r) {
	e.marked.add(r);
}
function zr(e, r) {
	let t = e.refs.size;
	return e.refs.set(r, t), t;
}
function er(e, r) {
	let t = e.refs.get(r);
	return t != null ? (pe$1(e, t), {
		type: 1,
		value: pt(t)
	}) : {
		type: 0,
		value: zr(e, r)
	};
}
function Y$1(e, r) {
	let t = er(e, r);
	return t.type === 1 ? t : Ir(r) ? {
		type: 2,
		value: gt(t.value, r)
	} : t;
}
function I(e, r) {
	let t = Y$1(e, r);
	if (t.type !== 0) return t.value;
	if (r in ve) return dt(t.value, r);
	throw new x$1(r);
}
function k(e, r) {
	let t = er(e, Tt[r]);
	return t.type === 1 ? t.value : c$1(26, t.value, r, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1, o$1);
}
function rr(e) {
	let r = er(e, Pt);
	return r.type === 1 ? r.value : c$1(27, r.value, o$1, o$1, o$1, o$1, o$1, o$1, I(e, C), o$1, o$1, o$1);
}
function tr(e) {
	let r = er(e, xt);
	return r.type === 1 ? r.value : c$1(29, r.value, o$1, o$1, o$1, o$1, o$1, [k(e, 1), I(e, v$1)], o$1, o$1, o$1, o$1);
}
function nr(e, r, t, n) {
	return c$1(t ? 11 : 10, e, o$1, o$1, o$1, n, o$1, o$1, o$1, o$1, Te(r), o$1);
}
function or(e, r, t, n) {
	return c$1(8, r, o$1, o$1, o$1, o$1, {
		k: t,
		v: n
	}, o$1, k(e, 0), o$1, o$1, o$1);
}
function zt(e, r, t) {
	return c$1(22, r, t, o$1, o$1, o$1, o$1, o$1, k(e, 1), o$1, o$1, o$1);
}
function ar(e, r, t) {
	let n = new Uint8Array(t), a = "";
	for (let s = 0, i = n.length; s < i; s++) a += String.fromCharCode(n[s]);
	return c$1(19, r, y$1(btoa(a)), o$1, o$1, o$1, o$1, o$1, k(e, 5), o$1, o$1, o$1);
}
function te$1(e, r) {
	return {
		base: me(e, r),
		child: void 0
	};
}
var kr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return N$1(this._p, this.depth, r);
	}
};
async function xn(e, r, t) {
	let n = [];
	for (let a = 0, s = t.length; a < s; a++) a in t ? n[a] = await N$1(e, r, t[a]) : n[a] = 0;
	return n;
}
async function Tn(e, r, t, n) {
	return _e(t, n, await xn(e, r, n));
}
async function Dr(e, r, t) {
	let n = Object.entries(t), a = [], s = [];
	for (let i = 0, u = n.length; i < u; i++) a.push(y$1(n[i][0])), s.push(await N$1(e, r, n[i][1]));
	return C in t && (a.push(I(e.base, C)), s.push(Ue(rr(e.base), await N$1(e, r, $e(t))))), v$1 in t && (a.push(I(e.base, v$1)), s.push(je(tr(e.base), await N$1(e, r, Qe(t))))), P$1 in t && (a.push(I(e.base, P$1)), s.push($$1(t[P$1]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? H : J)), {
		k: a,
		v: s
	};
}
async function _r(e, r, t, n, a) {
	return nr(t, n, a, await Dr(e, r, n));
}
async function On(e, r, t, n) {
	return ke(t, await N$1(e, r, n.valueOf()));
}
async function wn(e, r, t, n) {
	return De(t, n, await N$1(e, r, n.buffer));
}
async function hn(e, r, t, n) {
	return Fe(t, n, await N$1(e, r, n.buffer));
}
async function zn(e, r, t, n) {
	return Be(t, n, await N$1(e, r, n.buffer));
}
async function _t(e, r, t, n) {
	let a = Z(n, e.base.features);
	return Ve(t, n, a ? await Dr(e, r, a) : o$1);
}
async function _n(e, r, t, n) {
	let a = Z(n, e.base.features);
	return Me(t, n, a ? await Dr(e, r, a) : o$1);
}
async function kn(e, r, t, n) {
	let a = [], s = [];
	for (let [i, u] of n.entries()) a.push(await N$1(e, r, i)), s.push(await N$1(e, r, u));
	return or(e.base, t, a, s);
}
async function Dn(e, r, t, n) {
	let a = [];
	for (let s of n.keys()) a.push(await N$1(e, r, s));
	return Le(t, a);
}
async function kt(e, r, t, n) {
	let a = e.base.plugins;
	if (a) for (let s = 0, i = a.length; s < i; s++) {
		let u = a[s];
		if (u.parse.async && u.test(n)) return ce(t, u.tag, await u.parse.async(n, new kr(e, r), { id: t }));
	}
	return o$1;
}
async function Fn(e, r, t, n) {
	let [a, s] = await hr(n);
	return c$1(12, t, a, o$1, o$1, o$1, o$1, o$1, await N$1(e, r, s), o$1, o$1, o$1);
}
function Bn(e, r, t, n, a) {
	let s = [], i = t.on({
		next: (u) => {
			pe$1(this.base, r), N$1(this, e, u).then((l) => {
				s.push(qe(r, l));
			}, (l) => {
				a(l), i();
			});
		},
		throw: (u) => {
			pe$1(this.base, r), N$1(this, e, u).then((l) => {
				s.push(We(r, l)), n(s), i();
			}, (l) => {
				a(l), i();
			});
		},
		return: (u) => {
			pe$1(this.base, r), N$1(this, e, u).then((l) => {
				s.push(Ge(r, l)), n(s), i();
			}, (l) => {
				a(l), i();
			});
		}
	});
}
async function Vn(e, r, t, n) {
	return Ye(t, k(e.base, 4), await new Promise(Bn.bind(e, r, t, n)));
}
async function Mn(e, r, t, n) {
	let a = [];
	for (let s = 0, i = n.v.length; s < i; s++) a[s] = await N$1(e, r, n.v[s]);
	return Ke(t, a, n.t, n.d);
}
async function Ln(e, r, t, n) {
	if (Array.isArray(n)) return Tn(e, r, t, n);
	if (Xe(n)) return Vn(e, r, t, n);
	if (Ze(n)) return Mn(e, r, t, n);
	let a = n.constructor;
	if (a === j) return N$1(e, r, n.replacement);
	let s = await kt(e, r, t, n);
	if (s) return s;
	switch (a) {
		case Object: return _r(e, r, t, n, !1);
		case o$1: return _r(e, r, t, n, !0);
		case Date: return he(t, n);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return _t(e, r, t, n);
		case Number:
		case Boolean:
		case String:
		case BigInt: return On(e, r, t, n);
		case ArrayBuffer: return ar(e.base, t, n);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return wn(e, r, t, n);
		case DataView: return zn(e, r, t, n);
		case Map: return kn(e, r, t, n);
		case Set: return Dn(e, r, t, n);
		default: break;
	}
	if (a === Promise || n instanceof Promise) return Fn(e, r, t, n);
	let i = e.base.features;
	if (i & 32 && a === RegExp) return ze(t, n);
	if (i & 16) switch (a) {
		case BigInt64Array:
		case BigUint64Array: return hn(e, r, t, n);
		default: break;
	}
	if (i & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n instanceof AggregateError)) return _n(e, r, t, n);
	if (n instanceof Error) return _t(e, r, t, n);
	if (C in n || v$1 in n) return _r(e, r, t, n, !!a);
	throw new x$1(n);
}
async function Un(e, r, t) {
	let n = Y$1(e.base, t);
	if (n.type !== 0) return n.value;
	let a = await kt(e, r, n.value, t);
	if (a) return a;
	throw new x$1(t);
}
async function N$1(e, r, t) {
	switch (typeof t) {
		case "boolean": return t ? H : J;
		case "undefined": return Ae;
		case "string": return $$1(t);
		case "number": return Oe(t);
		case "bigint": return we(t);
		case "object":
			if (t) {
				let n = Y$1(e.base, t);
				return n.type === 0 ? await Ln(e, r + 1, n.value, t) : n.value;
			}
			return Ee;
		case "symbol": return I(e.base, t);
		case "function": return Un(e, r, t);
		default: throw new x$1(t);
	}
}
async function ne$1(e, r) {
	try {
		return await N$1(e, 0, r);
	} catch (t) {
		throw t instanceof z ? t : new z(t);
	}
}
var oe = ((t) => (t[t.Vanilla = 1] = "Vanilla", t[t.Cross = 2] = "Cross", t))(oe || {});
function ai(e) {
	return e;
}
function Dt(e, r) {
	for (let t = 0, n = r.length; t < n; t++) {
		let a = r[t];
		e.has(a) || (e.add(a), a.extends && Dt(e, a.extends));
	}
}
function A(e) {
	if (e) {
		let r = /* @__PURE__ */ new Set();
		return Dt(r, e), [...r];
	}
}
function Ft(e) {
	switch (e) {
		case "Int8Array": return Int8Array;
		case "Int16Array": return Int16Array;
		case "Int32Array": return Int32Array;
		case "Uint8Array": return Uint8Array;
		case "Uint16Array": return Uint16Array;
		case "Uint32Array": return Uint32Array;
		case "Uint8ClampedArray": return Uint8ClampedArray;
		case "Float32Array": return Float32Array;
		case "Float64Array": return Float64Array;
		case "BigInt64Array": return BigInt64Array;
		case "BigUint64Array": return BigUint64Array;
		default: throw new Je(e);
	}
}
var jn = 1e6, Yn = 1e4, qn = 2e4;
function Vt(e, r) {
	switch (r) {
		case 3: return Object.freeze(e);
		case 1: return Object.preventExtensions(e);
		case 2: return Object.seal(e);
		default: return e;
	}
}
var Wn = 1e3;
function Mt(e, r) {
	var n;
	let t = r.refs || /* @__PURE__ */ new Map();
	return "types" in t || Object.assign(t, { types: /* @__PURE__ */ new Map() }), {
		mode: e,
		plugins: r.plugins,
		refs: t,
		features: (n = r.features) != null ? n : 63 ^ (r.disabledFeatures || 0),
		depthLimit: r.depthLimit || Wn
	};
}
function Lt(e) {
	return {
		mode: 1,
		base: Mt(1, e),
		child: o$1,
		state: { marked: new Set(e.markedRefs) }
	};
}
var Fr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	deserialize(r) {
		return p$1(this._p, this.depth, r);
	}
};
function jt(e, r) {
	if (r < 0 || !Number.isFinite(r) || !Number.isInteger(r)) throw new O$1({
		t: 4,
		i: r
	});
	if (e.refs.has(r)) throw new Error("Conflicted ref id: " + r);
}
function Gn(e, r, t) {
	return jt(e.base, r), e.state.marked.has(r) && e.base.refs.set(r, t), t;
}
function Kn(e, r, t) {
	return jt(e.base, r), e.base.refs.set(r, t), t;
}
function b(e, r, t) {
	return e.mode === 1 ? Gn(e, r, t) : Kn(e, r, t);
}
function Br(e, r, t) {
	if (Object.hasOwn(r, t)) return r[t];
	throw new O$1(e);
}
function Hn(e, r) {
	return b(e, r.i, St(D$1(r.s)));
}
function Jn(e, r, t) {
	let n = t.a, a = n.length, s = b(e, t.i, new Array(a));
	for (let i = 0, u; i < a; i++) u = n[i], u && (s[i] = p$1(e, r, u));
	return Vt(s, t.o), s;
}
function Zn(e) {
	switch (e) {
		case "constructor":
		case "__proto__":
		case "prototype":
		case "__defineGetter__":
		case "__defineSetter__":
		case "__lookupGetter__":
		case "__lookupSetter__": return !1;
		default: return !0;
	}
}
function $n(e) {
	switch (e) {
		case v$1:
		case R:
		case P$1:
		case C: return !0;
		default: return !1;
	}
}
function Bt(e, r, t) {
	Zn(r) ? e[r] = t : Object.defineProperty(e, r, {
		value: t,
		configurable: !0,
		enumerable: !0,
		writable: !0
	});
}
function Xn(e, r, t, n, a) {
	if (typeof n == "string") Bt(t, D$1(n), p$1(e, r, a));
	else {
		let s = p$1(e, r, n);
		switch (typeof s) {
			case "string":
				Bt(t, s, p$1(e, r, a));
				break;
			case "symbol":
				$n(s) && (t[s] = p$1(e, r, a));
				break;
			default: throw new O$1(n);
		}
	}
}
function Yt(e, r, t) {
	e.base.refs.types.set(r, t);
}
function de(e, r, t, n) {
	if (e.base.refs.types.get(t) !== n) throw new O$1(r);
}
function qt(e, r, t, n) {
	let a = t.k;
	if (a.length > 0) for (let i = 0, u = t.v, l = a.length; i < l; i++) Xn(e, r, n, a[i], u[i]);
	return n;
}
function Qn(e, r, t) {
	let n = b(e, t.i, t.t === 10 ? {} : Object.create(null));
	return qt(e, r, t.p, n), Vt(n, t.o), n;
}
function eo(e, r) {
	return b(e, r.i, new Date(r.s));
}
function ro(e, r) {
	if (e.base.features & 32) {
		let t = D$1(r.c);
		if (t.length > qn) throw new O$1(r);
		return b(e, r.i, new RegExp(t, r.m));
	}
	throw new h$1(r);
}
function to(e, r, t) {
	let n = b(e, t.i, /* @__PURE__ */ new Set());
	for (let a = 0, s = t.a, i = s.length; a < i; a++) n.add(p$1(e, r, s[a]));
	return n;
}
function no(e, r, t) {
	let n = b(e, t.i, /* @__PURE__ */ new Map());
	for (let a = 0, s = t.e.k, i = t.e.v, u = s.length; a < u; a++) n.set(p$1(e, r, s[a]), p$1(e, r, i[a]));
	return n;
}
function oo(e, r) {
	if (r.s.length > jn) throw new O$1(r);
	return b(e, r.i, Or(D$1(r.s)));
}
function ao(e, r, t) {
	var u;
	let n = Ft(t.c), a = p$1(e, r, t.f), s = (u = t.b) != null ? u : 0;
	if (s < 0 || s > a.byteLength) throw new O$1(t);
	return b(e, t.i, new n(a, s, t.l));
}
function so(e, r, t) {
	var i;
	let n = p$1(e, r, t.f), a = (i = t.b) != null ? i : 0;
	if (a < 0 || a > n.byteLength) throw new O$1(t);
	return b(e, t.i, new DataView(n, a, t.l));
}
function Wt(e, r, t, n) {
	if (t.p) {
		let a = qt(e, r, t.p, {});
		Object.defineProperties(n, Object.getOwnPropertyDescriptors(a));
	}
	return n;
}
function io(e, r, t) {
	return Wt(e, r, t, b(e, t.i, new AggregateError([], D$1(t.m))));
}
function uo(e, r, t) {
	let n = Br(t, st, t.s);
	return Wt(e, r, t, b(e, t.i, new n(D$1(t.m))));
}
function lo(e, r, t) {
	let n = ee(), a = b(e, t.i, n.p), s = p$1(e, r, t.f);
	return t.s ? n.s(s) : n.f(s), a;
}
function co(e, r, t) {
	return b(e, t.i, Object(p$1(e, r, t.f)));
}
function fo(e, r, t) {
	let n = e.base.plugins;
	if (n) {
		let a = D$1(t.c);
		for (let s = 0, i = n.length; s < i; s++) {
			let u = n[s];
			if (u.tag === a) return b(e, t.i, u.deserialize(t.s, new Fr(e, r), { id: t.i }));
		}
	}
	throw new X(t.c);
}
function So(e, r) {
	let t = b(e, r.i, b(e, r.s, ee()).p);
	return Yt(e, r.s, 22), t;
}
function mo(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n) return de(e, t, t.i, 22), n.s(p$1(e, r, t.a[1])), o$1;
	throw new V("Promise");
}
function po(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n) return de(e, t, t.i, 22), n.f(p$1(e, r, t.a[1])), o$1;
	throw new V("Promise");
}
function go(e, r, t) {
	p$1(e, r, t.a[0]);
	return Rt(p$1(e, r, t.a[1]));
}
function yo(e, r, t) {
	p$1(e, r, t.a[0]);
	return wt(p$1(e, r, t.a[1]));
}
function No(e, r, t) {
	let n = b(e, t.i, re());
	Yt(e, t.i, 31);
	let a = t.a, s = a.length;
	if (s) for (let i = 0; i < s; i++) p$1(e, r, a[i]);
	return n;
}
function bo(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n) return de(e, t, t.i, 31), n.next(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function vo(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n) return de(e, t, t.i, 31), n.throw(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function Co(e, r, t) {
	let n = e.base.refs.get(t.i);
	if (n) return de(e, t, t.i, 31), n.return(p$1(e, r, t.f)), o$1;
	throw new V("Stream");
}
function Ao(e, r, t) {
	return p$1(e, r, t.f), o$1;
}
function Eo(e, r, t) {
	return p$1(e, r, t.a[1]), o$1;
}
function Io(e, r, t) {
	let n = b(e, t.i, wr([], t.s, t.l));
	for (let a = 0, s = t.a.length; a < s; a++) n.v[a] = p$1(e, r, t.a[a]);
	return n;
}
function p$1(e, r, t) {
	if (r > e.base.depthLimit) throw new Q(e.base.depthLimit);
	switch (r += 1, t.t) {
		case 2: return Br(t, at, t.s);
		case 0: return Number(t.s);
		case 1: return D$1(String(t.s));
		case 3:
			if (String(t.s).length > Yn) throw new O$1(t);
			return BigInt(t.s);
		case 4: return e.base.refs.get(t.i);
		case 18: return Hn(e, t);
		case 9: return Jn(e, r, t);
		case 10:
		case 11: return Qn(e, r, t);
		case 5: return eo(e, t);
		case 6: return ro(e, t);
		case 7: return to(e, r, t);
		case 8: return no(e, r, t);
		case 19: return oo(e, t);
		case 16:
		case 15: return ao(e, r, t);
		case 20: return so(e, r, t);
		case 14: return io(e, r, t);
		case 13: return uo(e, r, t);
		case 12: return lo(e, r, t);
		case 17: return Br(t, nt, t.s);
		case 21: return co(e, r, t);
		case 25: return fo(e, r, t);
		case 22: return So(e, t);
		case 23: return mo(e, r, t);
		case 24: return po(e, r, t);
		case 28: return go(e, r, t);
		case 30: return yo(e, r, t);
		case 31: return No(e, r, t);
		case 32: return bo(e, r, t);
		case 33: return vo(e, r, t);
		case 34: return Co(e, r, t);
		case 27: return Ao(e, r, t);
		case 29: return Eo(e, r, t);
		case 35: return Io(e, r, t);
		default: throw new h$1(t);
	}
}
function sr(e, r) {
	try {
		return p$1(e, 0, r);
	} catch (t) {
		throw new He(t);
	}
}
var Ro = () => T, Po = Ro.toString(), Gt = /=>/.test(Po);
function ir(e, r) {
	return Gt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + e.join(",") + "){return " + r + "}";
}
function Kt(e, r) {
	return Gt ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + r + "}" : "function(" + e.join(",") + "){" + r + "}";
}
var Zt = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_", Ht = Zt.length, $t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_", Jt = $t.length;
function Vr(e) {
	let r = e % Ht, t = Zt[r];
	for (e = (e - r) / Ht; e > 0;) r = e % Jt, t += $t[r], e = (e - r) / Jt;
	return t;
}
var xo = /^[$A-Z_][0-9A-Z_$]*$/i;
function Mr(e) {
	let r = e[0];
	return (r === "$" || r === "_" || r >= "A" && r <= "Z" || r >= "a" && r <= "z") && xo.test(e);
}
function ye(e) {
	switch (e.t) {
		case 0: return e.s + "=" + e.v;
		case 2: return e.s + ".set(" + e.k + "," + e.v + ")";
		case 1: return e.s + ".add(" + e.v + ")";
		case 3: return e.s + ".delete(" + e.k + ")";
	}
}
function To(e) {
	let r = [], t = e[0];
	for (let n = 1, a = e.length, s, i = t; n < a; n++) s = e[n], s.t === 0 && s.v === i.v ? t = {
		t: 0,
		s: s.s,
		k: o$1,
		v: ye(t)
	} : s.t === 2 && s.s === i.s ? t = {
		t: 2,
		s: ye(t),
		k: s.k,
		v: s.v
	} : s.t === 1 && s.s === i.s ? t = {
		t: 1,
		s: ye(t),
		k: o$1,
		v: s.v
	} : s.t === 3 && s.s === i.s ? t = {
		t: 3,
		s: ye(t),
		k: s.k,
		v: o$1
	} : (r.push(t), t = s), i = s;
	return r.push(t), r;
}
function on(e) {
	if (e.length) {
		let r = "", t = To(e);
		for (let n = 0, a = t.length; n < a; n++) r += ye(t[n]) + ",";
		return r;
	}
	return o$1;
}
var Oo = "Object.create(null)", wo = "new Set", ho = "new Map", zo = "Promise.resolve", _o = "Promise.reject", ko = {
	3: "Object.freeze",
	2: "Object.seal",
	1: "Object.preventExtensions",
	0: o$1
};
function an(e, r) {
	return {
		mode: e,
		plugins: r.plugins,
		features: r.features,
		marked: new Set(r.markedRefs),
		stack: [],
		flags: [],
		assignments: []
	};
}
function lr(e) {
	return {
		mode: 2,
		base: an(2, e),
		state: e,
		child: o$1
	};
}
var Lr = class {
	constructor(r) {
		this._p = r;
	}
	serialize(r) {
		return f$1(this._p, r);
	}
};
function Fo(e, r) {
	let t = e.valid.get(r);
	t ?? (t = e.valid.size, e.valid.set(r, t));
	let n = e.vars[t];
	return n ?? (n = Vr(t), e.vars[t] = n), n;
}
function Bo(e) {
	return le + "[" + e + "]";
}
function m$1(e, r) {
	return e.mode === 1 ? Fo(e.state, r) : Bo(r);
}
function w$1(e, r) {
	e.marked.add(r);
}
function Ur(e, r) {
	return e.marked.has(r);
}
function Yr(e, r, t) {
	r !== 0 && (w$1(e.base, t), e.base.flags.push({
		type: r,
		value: m$1(e, t)
	}));
}
function Vo(e) {
	let r = "";
	for (let t = 0, n = e.flags, a = n.length; t < a; t++) {
		let s = n[t];
		r += ko[s.type] + "(" + s.value + "),";
	}
	return r;
}
function sn(e) {
	let r = on(e.assignments), t = Vo(e);
	return r ? t ? r + t : r : t;
}
function qr(e, r, t) {
	e.assignments.push({
		t: 0,
		s: r,
		k: o$1,
		v: t
	});
}
function Mo(e, r, t) {
	e.base.assignments.push({
		t: 1,
		s: m$1(e, r),
		k: o$1,
		v: t
	});
}
function ge(e, r, t, n) {
	e.base.assignments.push({
		t: 2,
		s: m$1(e, r),
		k: t,
		v: n
	});
}
function Xt(e, r, t) {
	e.base.assignments.push({
		t: 3,
		s: m$1(e, r),
		k: t,
		v: o$1
	});
}
function Ne(e, r, t, n) {
	qr(e.base, m$1(e, r) + "[" + t + "]", n);
}
function jr(e, r, t, n) {
	qr(e.base, m$1(e, r) + "." + t, n);
}
function Lo(e, r, t, n) {
	qr(e.base, m$1(e, r) + ".v[" + t + "]", n);
}
function F(e, r) {
	return r.t === 4 && e.stack.includes(r.i);
}
function ae(e, r, t) {
	return e.mode === 1 && !Ur(e.base, r) ? t : m$1(e, r) + "=" + t;
}
function Uo(e) {
	return L$1 + ".get(\"" + e.s + "\")";
}
function Qt(e, r, t, n) {
	return t ? F(e.base, t) ? (w$1(e.base, r), Ne(e, r, n, m$1(e, t.i)), "") : f$1(e, t) : "";
}
function jo(e, r) {
	let t = r.i, n = r.a, a = n.length;
	if (a > 0) {
		e.base.stack.push(t);
		let s = Qt(e, t, n[0], 0), i = s === "";
		for (let u = 1, l; u < a; u++) l = Qt(e, t, n[u], u), s += "," + l, i = l === "";
		return e.base.stack.pop(), Yr(e, r.o, r.i), "[" + s + (i ? ",]" : "]");
	}
	return "[]";
}
function en(e, r, t, n) {
	if (typeof t == "string") {
		let a = Number(t), s = a >= 0 && a.toString() === t || Mr(t);
		if (F(e.base, n)) {
			let i = m$1(e, n.i);
			return w$1(e.base, r.i), s && a !== a ? jr(e, r.i, t, i) : Ne(e, r.i, s ? t : "\"" + t + "\"", i), "";
		}
		return (s ? t : "\"" + t + "\"") + ":" + f$1(e, n);
	}
	return "[" + f$1(e, t) + "]:" + f$1(e, n);
}
function un(e, r, t) {
	let n = t.k, a = n.length;
	if (a > 0) {
		let s = t.v;
		e.base.stack.push(r.i);
		let i = en(e, r, n[0], s[0]);
		for (let u = 1, l = i; u < a; u++) l = en(e, r, n[u], s[u]), i += (l && i && ",") + l;
		return e.base.stack.pop(), "{" + i + "}";
	}
	return "{}";
}
function Yo(e, r) {
	return Yr(e, r.o, r.i), un(e, r, r.p);
}
function qo(e, r, t, n) {
	let a = un(e, r, t);
	return a !== "{}" ? "Object.assign(" + n + "," + a + ")" : n;
}
function Wo(e, r, t, n, a) {
	let s = e.base, i = f$1(e, a), u = Number(n), l = u >= 0 && u.toString() === n || Mr(n);
	if (F(s, a)) l && u !== u ? jr(e, r.i, n, i) : Ne(e, r.i, l ? n : "\"" + n + "\"", i);
	else {
		let g = s.assignments;
		s.assignments = t, l && u !== u ? jr(e, r.i, n, i) : Ne(e, r.i, l ? n : "\"" + n + "\"", i), s.assignments = g;
	}
}
function Go(e, r, t, n, a) {
	if (typeof n == "string") Wo(e, r, t, n, a);
	else {
		let s = e.base, i = s.stack;
		s.stack = [];
		let u = f$1(e, a);
		s.stack = i;
		let l = s.assignments;
		s.assignments = t, Ne(e, r.i, f$1(e, n), u), s.assignments = l;
	}
}
function Ko(e, r, t) {
	let n = t.k, a = n.length;
	if (a > 0) {
		let s = [], i = t.v;
		e.base.stack.push(r.i);
		for (let u = 0; u < a; u++) Go(e, r, s, n[u], i[u]);
		return e.base.stack.pop(), on(s);
	}
	return o$1;
}
function Wr(e, r, t) {
	if (r.p) {
		let n = e.base;
		if (n.features & 8) t = qo(e, r, r.p, t);
		else {
			w$1(n, r.i);
			let a = Ko(e, r, r.p);
			if (a) return "(" + ae(e, r.i, t) + "," + a + m$1(e, r.i) + ")";
		}
	}
	return t;
}
function Ho(e, r) {
	return Yr(e, r.o, r.i), Wr(e, r, Oo);
}
function Jo(e) {
	return "new Date(\"" + e.s + "\")";
}
function Zo(e, r) {
	if (e.base.features & 32) return "/" + r.c + "/" + r.m;
	throw new h$1(r);
}
function rn(e, r, t) {
	let n = e.base;
	return F(n, t) ? (w$1(n, r), Mo(e, r, m$1(e, t.i)), "") : f$1(e, t);
}
function $o(e, r) {
	let t = wo, n = r.a, a = n.length, s = r.i;
	if (a > 0) {
		e.base.stack.push(s);
		let i = rn(e, s, n[0]);
		for (let u = 1, l = i; u < a; u++) l = rn(e, s, n[u]), i += (l && i && ",") + l;
		e.base.stack.pop(), i && (t += "([" + i + "])");
	}
	return t;
}
function tn(e, r, t, n, a) {
	let s = e.base;
	if (F(s, t)) {
		let i = m$1(e, t.i);
		if (w$1(s, r), F(s, n)) return ge(e, r, i, m$1(e, n.i)), "";
		if (n.t !== 4 && n.i != null && Ur(s, n.i)) {
			let l = "(" + f$1(e, n) + ",[" + a + "," + a + "])";
			return ge(e, r, i, m$1(e, n.i)), Xt(e, r, a), l;
		}
		let u = s.stack;
		return s.stack = [], ge(e, r, i, f$1(e, n)), s.stack = u, "";
	}
	if (F(s, n)) {
		let i = m$1(e, n.i);
		if (w$1(s, r), t.t !== 4 && t.i != null && Ur(s, t.i)) {
			let l = "(" + f$1(e, t) + ",[" + a + "," + a + "])";
			return ge(e, r, m$1(e, t.i), i), Xt(e, r, a), l;
		}
		let u = s.stack;
		return s.stack = [], ge(e, r, f$1(e, t), i), s.stack = u, "";
	}
	return "[" + f$1(e, t) + "," + f$1(e, n) + "]";
}
function Xo(e, r) {
	let t = ho, n = r.e.k, a = n.length, s = r.i, i = r.f, u = m$1(e, i.i), l = e.base;
	if (a > 0) {
		let g = r.e.v;
		l.stack.push(s);
		let S = tn(e, s, n[0], g[0], u);
		for (let d = 1, G = S; d < a; d++) G = tn(e, s, n[d], g[d], u), S += (G && S && ",") + G;
		l.stack.pop(), S && (t += "([" + S + "])");
	}
	return i.t === 26 && (w$1(l, i.i), t = "(" + f$1(e, i) + "," + t + ")"), t;
}
function Qo(e, r) {
	return q$1(e, r.f) + "(\"" + r.s + "\")";
}
function ea(e, r) {
	return "new " + r.c + "(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function ra(e, r) {
	return "new DataView(" + f$1(e, r.f) + "," + r.b + "," + r.l + ")";
}
function ta(e, r) {
	let t = r.i;
	e.base.stack.push(t);
	let n = Wr(e, r, "new AggregateError([],\"" + r.m + "\")");
	return e.base.stack.pop(), n;
}
function na(e, r) {
	return Wr(e, r, "new " + Ce[r.s] + "(\"" + r.m + "\")");
}
function oa(e, r) {
	let t, n = r.f, a = r.i, s = r.s ? zo : _o, i = e.base;
	if (F(i, n)) {
		let u = m$1(e, n.i);
		t = s + (r.s ? "().then(" + ir([], u) + ")" : "().catch(" + Kt([], "throw " + u) + ")");
	} else {
		i.stack.push(a);
		let u = f$1(e, n);
		i.stack.pop(), t = s + "(" + u + ")";
	}
	return t;
}
function aa(e, r) {
	return "Object(" + f$1(e, r.f) + ")";
}
function q$1(e, r) {
	let t = f$1(e, r);
	return r.t === 4 ? t : "(" + t + ")";
}
function sa(e, r) {
	if (e.mode === 1) throw new h$1(r);
	return "(" + ae(e, r.s, q$1(e, r.f) + "()") + ").p";
}
function ia(e, r) {
	if (e.mode === 1) throw new h$1(r);
	return q$1(e, r.a[0]) + "(" + m$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function ua(e, r) {
	if (e.mode === 1) throw new h$1(r);
	return q$1(e, r.a[0]) + "(" + m$1(e, r.i) + "," + f$1(e, r.a[1]) + ")";
}
function la(e, r) {
	let t = e.base.plugins;
	if (t) for (let n = 0, a = t.length; n < a; n++) {
		let s = t[n];
		if (s.tag === r.c) return e.child ??= new Lr(e), s.serialize(r.s, e.child, { id: r.i });
	}
	throw new X(r.c);
}
function ca(e, r) {
	let t = "", n = !1;
	return r.f.t !== 4 && (w$1(e.base, r.f.i), t = "(" + f$1(e, r.f) + ",", n = !0), t += ae(e, r.i, "(" + At + ")(" + m$1(e, r.f.i) + ")"), n && (t += ")"), t;
}
function fa(e, r) {
	return q$1(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function Sa(e, r) {
	let t = r.a[0], n = r.a[1], a = e.base, s = "";
	t.t !== 4 && (w$1(a, t.i), s += "(" + f$1(e, t)), n.t !== 4 && (w$1(a, n.i), s += (s ? "," : "(") + f$1(e, n)), s && (s += ",");
	let i = ae(e, r.i, "(" + Et + ")(" + m$1(e, n.i) + "," + m$1(e, t.i) + ")");
	return s ? s + i + ")" : i;
}
function ma(e, r) {
	return q$1(e, r.a[0]) + "(" + f$1(e, r.a[1]) + ")";
}
function pa(e, r) {
	let t = ae(e, r.i, q$1(e, r.f) + "()"), n = r.a.length;
	if (n) {
		let a = f$1(e, r.a[0]);
		for (let s = 1; s < n; s++) a += "," + f$1(e, r.a[s]);
		return "(" + t + "," + a + "," + m$1(e, r.i) + ")";
	}
	return t;
}
function da(e, r) {
	return m$1(e, r.i) + ".next(" + f$1(e, r.f) + ")";
}
function ga(e, r) {
	return m$1(e, r.i) + ".throw(" + f$1(e, r.f) + ")";
}
function ya(e, r) {
	return m$1(e, r.i) + ".return(" + f$1(e, r.f) + ")";
}
function nn(e, r, t, n) {
	let a = e.base;
	return F(a, n) ? (w$1(a, r), Lo(e, r, t, m$1(e, n.i)), "") : f$1(e, n);
}
function Na(e, r) {
	let t = r.a, n = t.length, a = r.i;
	if (n > 0) {
		e.base.stack.push(a);
		let s = nn(e, a, 0, t[0]);
		for (let i = 1, u = s; i < n; i++) u = nn(e, a, i, t[i]), s += (u && s && ",") + u;
		if (e.base.stack.pop(), s) return "{__SEROVAL_SEQUENCE__:!0,v:[" + s + "],t:" + r.s + ",d:" + r.l + "}";
	}
	return "{__SEROVAL_SEQUENCE__:!0,v:[],t:-1,d:0}";
}
function ba(e, r) {
	switch (r.t) {
		case 17: return tt[r.s];
		case 18: return Uo(r);
		case 9: return jo(e, r);
		case 10: return Yo(e, r);
		case 11: return Ho(e, r);
		case 5: return Jo(r);
		case 6: return Zo(e, r);
		case 7: return $o(e, r);
		case 8: return Xo(e, r);
		case 19: return Qo(e, r);
		case 16:
		case 15: return ea(e, r);
		case 20: return ra(e, r);
		case 14: return ta(e, r);
		case 13: return na(e, r);
		case 12: return oa(e, r);
		case 21: return aa(e, r);
		case 22: return sa(e, r);
		case 25: return la(e, r);
		case 26: return Ot[r.s];
		case 35: return Na(e, r);
		default: throw new h$1(r);
	}
}
function f$1(e, r) {
	switch (r.t) {
		case 2: return ot[r.s];
		case 0: return "" + r.s;
		case 1: return "\"" + r.s + "\"";
		case 3: return r.s + "n";
		case 4: return m$1(e, r.i);
		case 23: return ia(e, r);
		case 24: return ua(e, r);
		case 27: return ca(e, r);
		case 28: return fa(e, r);
		case 29: return Sa(e, r);
		case 30: return ma(e, r);
		case 31: return pa(e, r);
		case 32: return da(e, r);
		case 33: return ga(e, r);
		case 34: return ya(e, r);
		default: return ae(e, r.i, ba(e, r));
	}
}
function fr(e, r) {
	let t = f$1(e, r), n = r.i;
	if (n == null) return t;
	let a = sn(e.base), s = m$1(e, n), i = e.state.scopeId, u = i == null ? "" : le, l = a ? "(" + t + "," + a + s + ")" : t;
	if (u === "") return r.t === 10 && !a ? "(" + l + ")" : l;
	let g = i == null ? "()" : "(" + le + "[\"" + y$1(i) + "\"])";
	return "(" + ir([u], l) + ")" + g;
}
var Kr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return E$1(this._p, this.depth, r);
	}
}, Hr = class {
	constructor(r, t) {
		this._p = r;
		this.depth = t;
	}
	parse(r) {
		return E$1(this._p, this.depth, r);
	}
	parseWithError(r) {
		return W(this._p, this.depth, r);
	}
	isAlive() {
		return this._p.state.alive;
	}
	pushPendingState() {
		Qr(this._p);
	}
	popPendingState() {
		be(this._p);
	}
	onParse(r) {
		se(this._p, r);
	}
	onError(r) {
		$r(this._p, r);
	}
};
function va(e) {
	return {
		alive: !0,
		pending: 0,
		initial: !0,
		buffer: [],
		onParse: e.onParse,
		onError: e.onError,
		onDone: e.onDone
	};
}
function Jr(e) {
	return {
		type: 2,
		base: me(2, e),
		state: va(e)
	};
}
function Ca(e, r, t) {
	let n = [];
	for (let a = 0, s = t.length; a < s; a++) a in t ? n[a] = E$1(e, r, t[a]) : n[a] = 0;
	return n;
}
function Aa(e, r, t, n) {
	return _e(t, n, Ca(e, r, n));
}
function Zr(e, r, t) {
	let n = Object.entries(t), a = [], s = [];
	for (let i = 0, u = n.length; i < u; i++) a.push(y$1(n[i][0])), s.push(E$1(e, r, n[i][1]));
	return C in t && (a.push(I(e.base, C)), s.push(Ue(rr(e.base), E$1(e, r, $e(t))))), v$1 in t && (a.push(I(e.base, v$1)), s.push(je(tr(e.base), E$1(e, r, e.type === 1 ? re() : Qe(t))))), P$1 in t && (a.push(I(e.base, P$1)), s.push($$1(t[P$1]))), R in t && (a.push(I(e.base, R)), s.push(t[R] ? H : J)), {
		k: a,
		v: s
	};
}
function Gr(e, r, t, n, a) {
	return nr(t, n, a, Zr(e, r, n));
}
function Ea(e, r, t, n) {
	return ke(t, E$1(e, r, n.valueOf()));
}
function Ia(e, r, t, n) {
	return De(t, n, E$1(e, r, n.buffer));
}
function Ra(e, r, t, n) {
	return Fe(t, n, E$1(e, r, n.buffer));
}
function Pa(e, r, t, n) {
	return Be(t, n, E$1(e, r, n.buffer));
}
function ln(e, r, t, n) {
	let a = Z(n, e.base.features);
	return Ve(t, n, a ? Zr(e, r, a) : o$1);
}
function xa(e, r, t, n) {
	let a = Z(n, e.base.features);
	return Me(t, n, a ? Zr(e, r, a) : o$1);
}
function Ta(e, r, t, n) {
	let a = [], s = [];
	for (let [i, u] of n.entries()) a.push(E$1(e, r, i)), s.push(E$1(e, r, u));
	return or(e.base, t, a, s);
}
function Oa(e, r, t, n) {
	let a = [];
	for (let s of n.keys()) a.push(E$1(e, r, s));
	return Le(t, a);
}
function wa(e, r, t, n) {
	let a = Ye(t, k(e.base, 4), []);
	return e.type === 1 || (Qr(e), n.on({
		next: (s) => {
			if (e.state.alive) {
				let i = W(e, r, s);
				i && se(e, qe(t, i));
			}
		},
		throw: (s) => {
			if (e.state.alive) {
				let i = W(e, r, s);
				i && se(e, We(t, i));
			}
			be(e);
		},
		return: (s) => {
			if (e.state.alive) {
				let i = W(e, r, s);
				i && se(e, Ge(t, i));
			}
			be(e);
		}
	})), a;
}
function ha(e, r, t) {
	if (this.state.alive) {
		let n = W(this, r, t);
		n && se(this, c$1(23, e, o$1, o$1, o$1, o$1, o$1, [k(this.base, 2), n], o$1, o$1, o$1, o$1)), be(this);
	}
}
function za(e, r, t) {
	if (this.state.alive) {
		let n = W(this, r, t);
		n && se(this, c$1(24, e, o$1, o$1, o$1, o$1, o$1, [k(this.base, 3), n], o$1, o$1, o$1, o$1));
	}
	be(this);
}
function _a(e, r, t, n) {
	let a = zr(e.base, {});
	return e.type === 2 && (Qr(e), n.then(ha.bind(e, a, r), za.bind(e, a, r))), zt(e.base, t, a);
}
function ka(e, r, t, n, a) {
	for (let s = 0, i = a.length; s < i; s++) {
		let u = a[s];
		if (u.parse.sync && u.test(n)) return ce(t, u.tag, u.parse.sync(n, new Kr(e, r), { id: t }));
	}
	return o$1;
}
function Da(e, r, t, n, a) {
	for (let s = 0, i = a.length; s < i; s++) {
		let u = a[s];
		if (u.parse.stream && u.test(n)) return ce(t, u.tag, u.parse.stream(n, new Hr(e, r), { id: t }));
	}
	return o$1;
}
function cn(e, r, t, n) {
	let a = e.base.plugins;
	return a ? e.type === 1 ? ka(e, r, t, n, a) : Da(e, r, t, n, a) : o$1;
}
function Fa(e, r, t, n) {
	let a = [];
	for (let s = 0, i = n.v.length; s < i; s++) a[s] = E$1(e, r, n.v[s]);
	return Ke(t, a, n.t, n.d);
}
function Ba(e, r, t, n, a) {
	switch (a) {
		case Object: return Gr(e, r, t, n, !1);
		case o$1: return Gr(e, r, t, n, !0);
		case Date: return he(t, n);
		case Error:
		case EvalError:
		case RangeError:
		case ReferenceError:
		case SyntaxError:
		case TypeError:
		case URIError: return ln(e, r, t, n);
		case Number:
		case Boolean:
		case String:
		case BigInt: return Ea(e, r, t, n);
		case ArrayBuffer: return ar(e.base, t, n);
		case Int8Array:
		case Int16Array:
		case Int32Array:
		case Uint8Array:
		case Uint16Array:
		case Uint32Array:
		case Uint8ClampedArray:
		case Float32Array:
		case Float64Array: return Ia(e, r, t, n);
		case DataView: return Pa(e, r, t, n);
		case Map: return Ta(e, r, t, n);
		case Set: return Oa(e, r, t, n);
		default: break;
	}
	if (a === Promise || n instanceof Promise) return _a(e, r, t, n);
	let s = e.base.features;
	if (s & 32 && a === RegExp) return ze(t, n);
	if (s & 16) switch (a) {
		case BigInt64Array:
		case BigUint64Array: return Ra(e, r, t, n);
		default: break;
	}
	if (s & 1 && typeof AggregateError != "undefined" && (a === AggregateError || n instanceof AggregateError)) return xa(e, r, t, n);
	if (n instanceof Error) return ln(e, r, t, n);
	if (C in n || v$1 in n) return Gr(e, r, t, n, !!a);
	throw new x$1(n);
}
function Va(e, r, t, n) {
	if (Array.isArray(n)) return Aa(e, r, t, n);
	if (Xe(n)) return wa(e, r, t, n);
	if (Ze(n)) return Fa(e, r, t, n);
	let a = n.constructor;
	if (a === j) return E$1(e, r, n.replacement);
	return cn(e, r, t, n) || Ba(e, r, t, n, a);
}
function Ma(e, r, t) {
	let n = Y$1(e.base, t);
	if (n.type !== 0) return n.value;
	let a = cn(e, r, n.value, t);
	if (a) return a;
	throw new x$1(t);
}
function E$1(e, r, t) {
	if (r >= e.base.depthLimit) throw new Q(e.base.depthLimit);
	switch (typeof t) {
		case "boolean": return t ? H : J;
		case "undefined": return Ae;
		case "string": return $$1(t);
		case "number": return Oe(t);
		case "bigint": return we(t);
		case "object":
			if (t) {
				let n = Y$1(e.base, t);
				return n.type === 0 ? Va(e, r + 1, n.value, t) : n.value;
			}
			return Ee;
		case "symbol": return I(e.base, t);
		case "function": return Ma(e, r, t);
		default: throw new x$1(t);
	}
}
function se(e, r) {
	e.state.initial ? e.state.buffer.push(r) : Xr(e, r, !1);
}
function $r(e, r) {
	if (e.state.onError) e.state.onError(r);
	else throw r instanceof z ? r : new z(r);
}
function fn(e) {
	e.state.onDone && e.state.onDone();
}
function Xr(e, r, t) {
	try {
		e.state.onParse(r, t);
	} catch (n) {
		$r(e, n);
	}
}
function Qr(e) {
	e.state.pending++;
}
function be(e) {
	--e.state.pending <= 0 && fn(e);
}
function W(e, r, t) {
	try {
		return E$1(e, r, t);
	} catch (n) {
		return $r(e, n), o$1;
	}
}
function et(e, r) {
	let t = W(e, 0, r);
	t && (Xr(e, t, !0), e.state.initial = !1, La(e, e.state), e.state.pending <= 0 && Sr(e));
}
function La(e, r) {
	for (let t = 0, n = r.buffer.length; t < n; t++) Xr(e, r.buffer[t], !1);
}
function Sr(e) {
	e.state.alive && (fn(e), e.state.alive = !1);
}
async function su(e, r = {}) {
	return await ne$1(te$1(2, {
		plugins: A(r.plugins),
		disabledFeatures: r.disabledFeatures,
		refs: r.refs
	}), e);
}
function Sn(e, r) {
	let t = A(r.plugins), n = Jr({
		plugins: t,
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		onParse(a, s) {
			let i = lr({
				plugins: t,
				features: n.base.features,
				scopeId: r.scopeId,
				markedRefs: n.base.marked
			}), u;
			try {
				u = fr(i, a);
			} catch (l) {
				r.onError && r.onError(l);
				return;
			}
			r.onSerialize(u, s);
		},
		onError: r.onError,
		onDone: r.onDone
	});
	return et(n, e), Sr.bind(null, n);
}
function iu(e, r) {
	let n = Jr({
		plugins: A(r.plugins),
		refs: r.refs,
		disabledFeatures: r.disabledFeatures,
		depthLimit: r.depthLimit,
		onParse: r.onParse,
		onError: r.onError,
		onDone: r.onDone
	});
	return et(n, e), Sr.bind(null, n);
}
var mr = class {
	constructor(r) {
		this.options = r;
		this.alive = !0;
		this.flushed = !1;
		this.done = !1;
		this.pending = 0;
		this.cleanups = [];
		this.refs = /* @__PURE__ */ new Map();
		this.keys = /* @__PURE__ */ new Set();
		this.ids = 0;
		this.plugins = A(r.plugins);
	}
	write(r, t) {
		this.alive && !this.flushed && (this.pending++, this.keys.add(r), this.cleanups.push(Sn(t, {
			plugins: this.plugins,
			scopeId: this.options.scopeId,
			refs: this.refs,
			disabledFeatures: this.options.disabledFeatures,
			onError: this.options.onError,
			onSerialize: (n, a) => {
				this.alive && this.options.onData(a ? this.options.globalIdentifier + "[\"" + y$1(r) + "\"]=" + n : n);
			},
			onDone: () => {
				this.alive && (this.pending--, this.pending <= 0 && this.flushed && !this.done && this.options.onDone && (this.options.onDone(), this.done = !0));
			}
		})));
	}
	getNextID() {
		for (; this.keys.has("" + this.ids);) this.ids++;
		return "" + this.ids;
	}
	push(r) {
		let t = this.getNextID();
		return this.write(t, r), t;
	}
	flush() {
		this.alive && (this.flushed = !0, this.pending <= 0 && !this.done && this.options.onDone && (this.options.onDone(), this.done = !0));
	}
	close() {
		if (this.alive) {
			for (let r = 0, t = this.cleanups.length; r < t; r++) this.cleanups[r]();
			!this.done && this.options.onDone && (this.options.onDone(), this.done = !0), this.alive = !1;
		}
	}
};
function Pu(e, r = {}) {
	var i;
	let t = A(r.plugins), n = r.disabledFeatures || 0, a = (i = e.f) != null ? i : 63;
	return sr(Lt({
		plugins: t,
		markedRefs: e.m,
		features: a & ~n,
		disabledFeatures: n
	}), e.t);
}
//#endregion
//#region node_modules/.pnpm/seroval-plugins@1.5.4_seroval@1.5.4/node_modules/seroval-plugins/dist/esm/production/web.mjs
var u = (e) => {
	let r = new AbortController(), a = r.abort.bind(r);
	return e.then(a, a), r;
};
function E(e) {
	e(this.reason);
}
function D(e) {
	this.addEventListener("abort", E.bind(this, e), { once: !0 });
}
function c(e) {
	return new Promise(D.bind(e));
}
var i = {}, O = ai({
	tag: "seroval-plugins/web/AbortSignal",
	extends: [ai({
		tag: "seroval-plugins/web/AbortControllerFactoryPlugin",
		test(e) {
			return e === i;
		},
		parse: {
			sync() {
				return i;
			},
			async async() {
				return await Promise.resolve(i);
			},
			stream() {
				return i;
			}
		},
		serialize() {
			return u.toString();
		},
		deserialize() {
			return u;
		}
	})],
	test(e) {
		return typeof AbortSignal == "undefined" ? !1 : e instanceof AbortSignal;
	},
	parse: {
		sync(e, r) {
			return e.aborted ? { reason: r.parse(e.reason) } : {};
		},
		async async(e, r) {
			if (e.aborted) return { reason: await r.parse(e.reason) };
			let a = await c(e);
			return { reason: await r.parse(a) };
		},
		stream(e, r) {
			if (e.aborted) return { reason: r.parse(e.reason) };
			let a = c(e);
			return {
				factory: r.parse(i),
				controller: r.parse(a)
			};
		}
	},
	serialize(e, r) {
		return e.reason ? "AbortSignal.abort(" + r.serialize(e.reason) + ")" : e.controller && e.factory ? "(" + r.serialize(e.factory) + ")(" + r.serialize(e.controller) + ").signal" : "(new AbortController).signal";
	},
	deserialize(e, r) {
		return e.reason ? AbortSignal.abort(r.deserialize(e.reason)) : e.controller ? u(r.deserialize(e.controller)).signal : new AbortController().signal;
	}
});
function d(e) {
	return {
		detail: e.detail,
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
var L = ai({
	tag: "seroval-plugins/web/CustomEvent",
	test(e) {
		return typeof CustomEvent == "undefined" ? !1 : e instanceof CustomEvent;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(d(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(d(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(d(e))
			};
		}
	},
	serialize(e, r) {
		return "new CustomEvent(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new CustomEvent(r.deserialize(e.type), r.deserialize(e.options));
	}
});
var q = ai({
	tag: "seroval-plugins/web/DOMException",
	test(e) {
		return typeof DOMException == "undefined" ? !1 : e instanceof DOMException;
	},
	parse: {
		sync(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		},
		async async(e, r) {
			return {
				name: await r.parse(e.name),
				message: await r.parse(e.message)
			};
		},
		stream(e, r) {
			return {
				name: r.parse(e.name),
				message: r.parse(e.message)
			};
		}
	},
	serialize(e, r) {
		return "new DOMException(" + r.serialize(e.message) + "," + r.serialize(e.name) + ")";
	},
	deserialize(e, r) {
		return new DOMException(r.deserialize(e.message), r.deserialize(e.name));
	}
});
function f(e) {
	return {
		bubbles: e.bubbles,
		cancelable: e.cancelable,
		composed: e.composed
	};
}
var Y = ai({
	tag: "seroval-plugins/web/Event",
	test(e) {
		return typeof Event == "undefined" ? !1 : e instanceof Event;
	},
	parse: {
		sync(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		},
		async async(e, r) {
			return {
				type: await r.parse(e.type),
				options: await r.parse(f(e))
			};
		},
		stream(e, r) {
			return {
				type: r.parse(e.type),
				options: r.parse(f(e))
			};
		}
	},
	serialize(e, r) {
		return "new Event(" + r.serialize(e.type) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Event(r.deserialize(e.type), r.deserialize(e.options));
	}
});
var m = ai({
	tag: "seroval-plugins/web/File",
	test(e) {
		return typeof File == "undefined" ? !1 : e instanceof File;
	},
	parse: { async async(e, r) {
		return {
			name: await r.parse(e.name),
			options: await r.parse({
				type: e.type,
				lastModified: e.lastModified
			}),
			buffer: await r.parse(await e.arrayBuffer())
		};
	} },
	serialize(e, r) {
		return "new File([" + r.serialize(e.buffer) + "]," + r.serialize(e.name) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new File([r.deserialize(e.buffer)], r.deserialize(e.name), r.deserialize(e.options));
	}
});
function y(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var o = {}, v = (e, r = new FormData(), a = 0, t = e.length, s) => {
	for (; a < t; a++) s = e[a], r.append(s[0], s[1]);
	return r;
}, K = ai({
	tag: "seroval-plugins/web/FormData",
	extends: [m, ai({
		tag: "seroval-plugins/web/FormDataFactory",
		test(e) {
			return e === o;
		},
		parse: {
			sync() {
				return o;
			},
			async async() {
				return await Promise.resolve(o);
			},
			stream() {
				return o;
			}
		},
		serialize() {
			return v.toString();
		},
		deserialize() {
			return o;
		}
	})],
	test(e) {
		return typeof FormData == "undefined" ? !1 : e instanceof FormData;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(o),
				entries: r.parse(y(e))
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(o),
				entries: await r.parse(y(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(o),
				entries: r.parse(y(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.entries) + ")";
	},
	deserialize(e, r) {
		return v(r.deserialize(e.entries));
	}
});
function g(e) {
	let r = [];
	return e.forEach((a, t) => {
		r.push([t, a]);
	}), r;
}
var l = ai({
	tag: "seroval-plugins/web/Headers",
	test(e) {
		return typeof Headers == "undefined" ? !1 : e instanceof Headers;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(g(e)) };
		},
		async async(e, r) {
			return { value: await r.parse(g(e)) };
		},
		stream(e, r) {
			return { value: r.parse(g(e)) };
		}
	},
	serialize(e, r) {
		return "new Headers(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new Headers(r.deserialize(e.value));
	}
});
var n = {}, P = (e) => new ReadableStream({ start: (r) => {
	e.on({
		next: (a) => {
			try {
				r.enqueue(a);
			} catch (t) {}
		},
		throw: (a) => {
			r.error(a);
		},
		return: () => {
			try {
				r.close();
			} catch (a) {}
		}
	});
} }), x = ai({
	tag: "seroval-plugins/web/ReadableStreamFactory",
	test(e) {
		return e === n;
	},
	parse: {
		sync() {
			return n;
		},
		async async() {
			return await Promise.resolve(n);
		},
		stream() {
			return n;
		}
	},
	serialize() {
		return P.toString();
	},
	deserialize() {
		return n;
	}
});
function w(e) {
	let r = re(), a = e.getReader();
	async function t() {
		try {
			let s = await a.read();
			s.done ? r.return(s.value) : (r.next(s.value), await t());
		} catch (s) {
			r.throw(s);
		}
	}
	return t().catch(() => {}), r;
}
var p = ai({
	tag: "seroval/plugins/web/ReadableStream",
	extends: [x],
	test(e) {
		return typeof ReadableStream == "undefined" ? !1 : e instanceof ReadableStream;
	},
	parse: {
		sync(e, r) {
			return {
				factory: r.parse(n),
				stream: r.parse(re())
			};
		},
		async async(e, r) {
			return {
				factory: await r.parse(n),
				stream: await r.parse(w(e))
			};
		},
		stream(e, r) {
			return {
				factory: r.parse(n),
				stream: r.parse(w(e))
			};
		}
	},
	serialize(e, r) {
		return "(" + r.serialize(e.factory) + ")(" + r.serialize(e.stream) + ")";
	},
	deserialize(e, r) {
		return P(r.deserialize(e.stream));
	}
});
function N(e, r) {
	return {
		body: r,
		cache: e.cache,
		credentials: e.credentials,
		headers: e.headers,
		integrity: e.integrity,
		keepalive: e.keepalive,
		method: e.method,
		mode: e.mode,
		redirect: e.redirect,
		referrer: e.referrer,
		referrerPolicy: e.referrerPolicy
	};
}
var te = ai({
	tag: "seroval-plugins/web/Request",
	extends: [p, l],
	test(e) {
		return typeof Request == "undefined" ? !1 : e instanceof Request;
	},
	parse: {
		async async(e, r) {
			return {
				url: await r.parse(e.url),
				options: await r.parse(N(e, e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null))
			};
		},
		stream(e, r) {
			return {
				url: r.parse(e.url),
				options: r.parse(N(e, e.body && !e.bodyUsed ? e.clone().body : null))
			};
		}
	},
	serialize(e, r) {
		return "new Request(" + r.serialize(e.url) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Request(r.deserialize(e.url), r.deserialize(e.options));
	}
});
function h(e) {
	return {
		headers: e.headers,
		status: e.status,
		statusText: e.statusText
	};
}
var ne = ai({
	tag: "seroval-plugins/web/Response",
	extends: [p, l],
	test(e) {
		return typeof Response == "undefined" ? !1 : e instanceof Response;
	},
	parse: {
		async async(e, r) {
			return {
				body: await r.parse(e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null),
				options: await r.parse(h(e))
			};
		},
		stream(e, r) {
			return {
				body: r.parse(e.body && !e.bodyUsed ? e.clone().body : null),
				options: r.parse(h(e))
			};
		}
	},
	serialize(e, r) {
		return "new Response(" + r.serialize(e.body) + "," + r.serialize(e.options) + ")";
	},
	deserialize(e, r) {
		return new Response(r.deserialize(e.body), r.deserialize(e.options));
	}
});
var pe = ai({
	tag: "seroval-plugins/web/URL",
	test(e) {
		return typeof URL == "undefined" ? !1 : e instanceof URL;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(e.href) };
		},
		async async(e, r) {
			return { value: await r.parse(e.href) };
		},
		stream(e, r) {
			return { value: r.parse(e.href) };
		}
	},
	serialize(e, r) {
		return "new URL(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new URL(r.deserialize(e.value));
	}
});
var fe = ai({
	tag: "seroval-plugins/web/URLSearchParams",
	test(e) {
		return typeof URLSearchParams == "undefined" ? !1 : e instanceof URLSearchParams;
	},
	parse: {
		sync(e, r) {
			return { value: r.parse(e.toString()) };
		},
		async async(e, r) {
			return { value: await r.parse(e.toString()) };
		},
		stream(e, r) {
			return { value: r.parse(e.toString()) };
		}
	},
	serialize(e, r) {
		return "new URLSearchParams(" + r.serialize(e.value) + ")";
	},
	deserialize(e, r) {
		return new URLSearchParams(r.deserialize(e.value));
	}
});
//#endregion
//#region node_modules/.pnpm/@solidjs+signals@2.0.0-beta.14/node_modules/@solidjs/signals/dist/prod.js
var NotReadyError = class extends Error {
	source;
	constructor(e) {
		super();
		this.source = e;
	}
};
var StatusError = class extends Error {
	source;
	constructor(e, t) {
		super(t instanceof Error ? t.message : String(t), { cause: t });
		this.source = e;
	}
};
var NoOwnerError = class extends Error {
	constructor() {
		super("");
	}
};
var ContextNotFoundError = class extends Error {
	constructor() {
		super("");
	}
};
var REACTIVE_NONE = 0;
var REACTIVE_CHECK = 1;
var REACTIVE_DIRTY = 2;
var REACTIVE_RECOMPUTING_DEPS = 4;
var REACTIVE_IN_HEAP = 8;
var REACTIVE_IN_HEAP_HEIGHT = 16;
var REACTIVE_ZOMBIE = 32;
var REACTIVE_DISPOSED = 64;
var REACTIVE_OPTIMISTIC_DIRTY = 128;
var REACTIVE_SNAPSHOT_STALE = 256;
var REACTIVE_LAZY = 512;
var CONFIG_OWNED_WRITE = 1;
var CONFIG_NO_SNAPSHOT = 2;
var CONFIG_TRANSPARENT = 4;
var CONFIG_IN_SNAPSHOT_SCOPE = 8;
var CONFIG_AUTO_DISPOSE = 32;
var CONFIG_SYNC = 64;
var STATUS_PENDING = 1;
var STATUS_ERROR = 2;
var STATUS_UNINITIALIZED = 4;
var EFFECT_RENDER = 1;
var EFFECT_USER = 2;
var EFFECT_TRACKED = 3;
var NOT_PENDING = {};
var NO_SNAPSHOT = {};
var SUPPORTS_PROXY = typeof Proxy === "function";
var defaultContext = {};
var $REFRESH = Symbol("refresh");
function actualInsertIntoHeap(e, t) {
	const n = (e.i?.t ? e.i.u?.o : e.i?.o) ?? -1;
	if (n >= e.o) e.o = n + 1;
	const i = e.o;
	const r = t.l[i];
	if (r === void 0) t.l[i] = e;
	else {
		const t = r.S;
		t.T = e;
		e.S = t;
		r.S = e;
	}
	if (i > t._) t._ = i;
}
function insertIntoHeap(e, t) {
	let n = e.O;
	if (n & 1036) return;
	if (n & REACTIVE_CHECK) e.O = n & -4 | 10;
	else e.O = n | REACTIVE_IN_HEAP;
	if (!(n & REACTIVE_IN_HEAP_HEIGHT)) actualInsertIntoHeap(e, t);
}
function insertIntoHeapHeight(e, t) {
	let n = e.O;
	if (n & 1052) return;
	e.O = n | REACTIVE_IN_HEAP_HEIGHT;
	actualInsertIntoHeap(e, t);
}
function deleteFromHeap(e, t) {
	const n = e.O;
	if (!(n & 24)) return;
	e.O = n & -25;
	const i = e.o;
	if (e.S === e) t.l[i] = void 0;
	else {
		const n = e.T;
		const r = t.l[i];
		const o = n ?? r;
		if (e === r) t.l[i] = n;
		else e.S.T = n;
		o.S = e.S;
	}
	e.S = e;
	e.T = void 0;
}
function markHeap(e) {
	if (e.R) return;
	e.R = true;
	for (let t = 0; t <= e._; t++) for (let n = e.l[t]; n !== void 0; n = n.T) if (n.O & REACTIVE_IN_HEAP) markNode(n);
}
function markNode(e, t = REACTIVE_DIRTY) {
	const n = e.O;
	if ((n & 3) >= t) return;
	e.O = n & -4 | t;
	for (let t = e.I; t !== null; t = t.p) markNode(t.h, REACTIVE_CHECK);
	if (e.N !== null) for (let t = e.N; t !== null; t = t.A) for (let e = t.I; e !== null; e = e.p) markNode(e.h, REACTIVE_CHECK);
}
function runHeap(e, t) {
	e.R = false;
	for (e.C = 0; e.C <= e._; e.C++) {
		let n = e.l[e.C];
		while (n !== void 0) {
			if (n.O & REACTIVE_IN_HEAP) t(n);
			else adjustHeight(n, e);
			n = e.l[e.C];
		}
	}
	e._ = 0;
}
function adjustHeight(e, t) {
	deleteFromHeap(e, t);
	let n = e.o;
	for (let t = e.P; t; t = t.D) {
		const e = t.m;
		const i = e.V || e;
		if (i.L && i.o >= n) n = i.o + 1;
	}
	if (e.o !== n) {
		e.o = n;
		for (let n = e.I; n !== null; n = n.p) insertIntoHeapHeight(n.h, t);
	}
}
var signalLanes = /* @__PURE__ */ new WeakMap();
var activeLanes = /* @__PURE__ */ new Set();
function getOrCreateLane(e) {
	let t = signalLanes.get(e);
	if (t) return findLane(t);
	const n = e.U;
	const i = n?.G ? findLane(n.G) : null;
	t = {
		k: e,
		F: /* @__PURE__ */ new Set(),
		W: [[], []],
		H: null,
		M: activeTransition,
		j: i
	};
	signalLanes.set(e, t);
	activeLanes.add(t);
	e.$ = false;
	return t;
}
function findLane(e) {
	while (e.H) e = e.H;
	return e;
}
function mergeLanes(e, t) {
	e = findLane(e);
	t = findLane(t);
	if (e === t) return e;
	t.H = e;
	for (const n of t.F) e.F.add(n);
	e.W[0].push(...t.W[0]);
	e.W[1].push(...t.W[1]);
	return e;
}
function resolveLane(e) {
	const t = e.G;
	if (!t) return void 0;
	const n = findLane(t);
	if (activeLanes.has(n)) return n;
	e.G = void 0;
}
function resolveTransition(e) {
	return resolveLane(e)?.M ?? e.M;
}
function hasActiveOverride(e) {
	return !!(e.K !== void 0 && e.K !== NOT_PENDING);
}
function assignOrMergeLane(e, t) {
	const n = findLane(t);
	const i = e.G;
	if (i) {
		if (i.H) {
			e.G = t;
			return;
		}
		const r = findLane(i);
		if (activeLanes.has(r)) {
			if (r !== n && !hasActiveOverride(e)) if (n.j && findLane(n.j) === r) e.G = t;
			else if (r.j && findLane(r.j) === n);
			else mergeLanes(n, r);
			return;
		}
	}
	e.G = t;
}
var transitions = /* @__PURE__ */ new Set();
var dirtyQueue = {
	l: new Array(2e3).fill(void 0),
	R: false,
	C: 0,
	_: 0
};
var zombieQueue = {
	l: new Array(2e3).fill(void 0),
	R: false,
	C: 0,
	_: 0
};
var clock = 0;
var activeTransition = null;
var scheduled = false;
var syncDepth = 0;
var projectionWriteActive = false;
var stashedOptimisticReads = null;
var transientStoreNodes = /* @__PURE__ */ new Set();
function canUseSimpleSyncFlush(e) {
	return transitions.size === 0 && activeLanes.size === 0 && e.Y.length === 0 && e.Z.length === 0 && e.q.size === 0 && transientStoreNodes.size === 0;
}
function sweepTransientStoreNodes() {
	if (transientStoreNodes.size === 0) return;
	for (const e of transientStoreNodes) {
		if (e.I !== null) {
			transientStoreNodes.delete(e);
			continue;
		}
		if (e.B !== NOT_PENDING) continue;
		if (e.K !== void 0 && e.K !== NOT_PENDING) continue;
		transientStoreNodes.delete(e);
		e.X?.();
	}
}
function shouldReadStashedOptimisticValue(e) {
	return !!stashedOptimisticReads?.has(e);
}
function runLaneEffects(e) {
	for (const t of activeLanes) {
		if (t.H || t.F.size > 0) continue;
		const n = t.W[e - 1];
		if (n.length) {
			t.W[e - 1] = [];
			runQueue(n, e);
		}
	}
}
function queueStashedOptimisticEffects(e) {
	for (let t = e.I; t !== null; t = t.p) {
		const e = t.h;
		if (!e.J) continue;
		if (e.J === EFFECT_TRACKED) {
			if (!e.ee) {
				e.ee = true;
				e.te.enqueue(EFFECT_USER, e.ne);
			}
			continue;
		}
		const n = e.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue;
		if (n.C > e.o) n.C = e.o;
		insertIntoHeap(e, n);
	}
}
function mergeTransitionState(e, t) {
	t.ie = e;
	e.re.push(...t.re);
	for (const n of activeLanes) if (n.M === t) n.M = e;
	e.Z.push(...t.Z);
	for (const n of t.q) e.q.add(n);
	for (const [n, i] of t.oe) {
		let t = e.oe.get(n);
		if (!t) e.oe.set(n, t = /* @__PURE__ */ new Set());
		for (const e of i) t.add(e);
	}
	for (const n of t.se) e.se.add(n);
}
function resolveOptimisticNodes(e) {
	for (let t = 0; t < e.length; t++) {
		const n = e[t];
		n.G = void 0;
		if (n.B !== NOT_PENDING) {
			n.ue = n.B;
			n.B = NOT_PENDING;
		}
		const i = n.K;
		n.K = NOT_PENDING;
		if (i !== NOT_PENDING && n.ue !== i) insertSubs(n, true);
		n.M = null;
	}
	e.length = 0;
}
function cleanupCompletedLanes(e) {
	for (const t of activeLanes) {
		if (!(e ? t.M === e : !t.M)) continue;
		if (!t.H) {
			if (t.W[0].length) runQueue(t.W[0], EFFECT_RENDER);
			if (t.W[1].length) runQueue(t.W[1], EFFECT_USER);
		}
		if (t.k.G === t) t.k.G = void 0;
		t.F.clear();
		t.W[0].length = 0;
		t.W[1].length = 0;
		activeLanes.delete(t);
		signalLanes.delete(t.k);
	}
}
function schedule() {
	if (scheduled) return;
	scheduled = true;
	if (!syncDepth && !globalQueue.ce && !projectionWriteActive) queueMicrotask(flush$1);
}
var Queue = class {
	i = null;
	le = [[], []];
	Y = [];
	created = clock;
	addChild(e) {
		this.Y.push(e);
		e.i = this;
	}
	removeChild(e) {
		const t = this.Y.indexOf(e);
		if (t >= 0) {
			this.Y.splice(t, 1);
			e.i = null;
		}
	}
	notify(e, t, n, i) {
		if (this.i) return this.i.notify(e, t, n, i);
		return false;
	}
	run(e) {
		if (this.le[e - 1].length) {
			const t = this.le[e - 1];
			this.le[e - 1] = [];
			runQueue(t, e);
		}
		for (let t = 0; t < this.Y.length; t++) this.Y[t].run?.(e);
	}
	enqueue(e, t) {
		if (e) if (currentOptimisticLane) findLane(currentOptimisticLane).W[e - 1].push(t);
		else this.le[e - 1].push(t);
		schedule();
	}
	stashQueues(e) {
		e.le[0].push(...this.le[0]);
		e.le[1].push(...this.le[1]);
		this.le = [[], []];
		for (let t = 0; t < this.Y.length; t++) {
			let n = this.Y[t];
			let i = e.Y[t];
			if (!i) {
				i = {
					le: [[], []],
					Y: []
				};
				e.Y[t] = i;
			}
			n.stashQueues(i);
		}
	}
	restoreQueues(e) {
		this.le[0].push(...e.le[0]);
		this.le[1].push(...e.le[1]);
		for (let t = 0; t < e.Y.length; t++) {
			const n = e.Y[t];
			let i = this.Y[t];
			if (i) i.restoreQueues(n);
		}
	}
};
var GlobalQueue = class GlobalQueue extends Queue {
	ce = false;
	ae = null;
	fe = [];
	Z = [];
	q = /* @__PURE__ */ new Set();
	static Ee;
	static Se;
	static Te;
	static de = null;
	flush() {
		if (this.ce) return;
		this.ce = true;
		try {
			runHeap(dirtyQueue, GlobalQueue.Ee);
			if (activeTransition) {
				if (!transitionComplete(activeTransition)) {
					const e = activeTransition;
					runHeap(zombieQueue, GlobalQueue.Ee);
					this.ae = null;
					this.fe = [];
					this.Z = [];
					this.q = /* @__PURE__ */ new Set();
					runLaneEffects(EFFECT_RENDER);
					runLaneEffects(EFFECT_USER);
					this.stashQueues(e._e);
					clock++;
					scheduled = dirtyQueue._ >= dirtyQueue.C;
					reassignPendingTransition(e.fe);
					activeTransition = null;
					if (!e.re.length && !e.oe.size && e.Z.length) {
						stashedOptimisticReads = /* @__PURE__ */ new Set();
						for (let t = 0; t < e.Z.length; t++) {
							const n = e.Z[t];
							if (n.L || n.Oe & CONFIG_OWNED_WRITE) continue;
							stashedOptimisticReads.add(n);
							queueStashedOptimisticEffects(n);
						}
					}
					try {
						finalizePureQueue(null, true);
					} finally {
						stashedOptimisticReads = null;
					}
					return;
				}
				this.fe !== activeTransition.fe && this.fe.push(...activeTransition.fe);
				this.restoreQueues(activeTransition._e);
				transitions.delete(activeTransition);
				const t = activeTransition;
				activeTransition = null;
				reassignPendingTransition(this.fe);
				finalizePureQueue(t);
			} else if (canUseSimpleSyncFlush(this)) {
				commitPendingNodes();
				if (dirtyQueue._ >= dirtyQueue.C) {
					runHeap(dirtyQueue, GlobalQueue.Ee);
					commitPendingNodes();
				}
			} else {
				if (transitions.size) runHeap(zombieQueue, GlobalQueue.Ee);
				finalizePureQueue();
			}
			clock++;
			scheduled = dirtyQueue._ >= dirtyQueue.C;
			activeLanes.size && runLaneEffects(EFFECT_RENDER);
			this.run(EFFECT_RENDER);
			activeLanes.size && runLaneEffects(EFFECT_USER);
			this.run(EFFECT_USER);
		} finally {
			this.ce = false;
		}
	}
	notify(e, t, n, i) {
		if (t & STATUS_PENDING) {
			if (n & STATUS_PENDING) {
				const t = i !== void 0 ? i : e.Re;
				if (activeTransition && t) {
					const n = t.source;
					let i = activeTransition.oe.get(n);
					if (!i) activeTransition.oe.set(n, i = /* @__PURE__ */ new Set());
					const r = i.size;
					i.add(e);
					if (i.size !== r) schedule();
				}
			}
			return true;
		}
		return false;
	}
	initTransition(e) {
		if (e) e = currentTransition(e);
		if (e && e === activeTransition) return;
		if (!e && activeTransition && activeTransition.Ie === clock) return;
		if (!activeTransition) activeTransition = e ?? {
			Ie: clock,
			fe: [],
			oe: /* @__PURE__ */ new Map(),
			Z: [],
			q: /* @__PURE__ */ new Set(),
			re: [],
			_e: {
				le: [[], []],
				Y: []
			},
			ie: false,
			se: /* @__PURE__ */ new Set()
		};
		else if (e) {
			const t = activeTransition;
			mergeTransitionState(e, t);
			transitions.delete(t);
			activeTransition = e;
		}
		transitions.add(activeTransition);
		activeTransition.Ie = clock;
		if (this.ae !== null) {
			this.ae.M = activeTransition;
			activeTransition.fe.push(this.ae);
			this.ae = null;
		}
		if (this.fe !== activeTransition.fe) {
			for (let e = 0; e < this.fe.length; e++) {
				const t = this.fe[e];
				t.M = activeTransition;
				activeTransition.fe.push(t);
			}
			this.fe = activeTransition.fe;
		}
		if (this.Z !== activeTransition.Z) {
			for (let e = 0; e < this.Z.length; e++) {
				const t = this.Z[e];
				t.M = activeTransition;
				activeTransition.Z.push(t);
			}
			this.Z = activeTransition.Z;
		}
		for (const e of activeLanes) if (!e.M) e.M = activeTransition;
		if (this.q !== activeTransition.q) {
			for (const e of this.q) activeTransition.q.add(e);
			this.q = activeTransition.q;
		}
	}
};
function queuePendingNode(e) {
	if (activeTransition) {
		globalQueue.fe.push(e);
		return;
	}
	if (globalQueue.ae === null && globalQueue.fe.length === 0) {
		globalQueue.ae = e;
		return;
	}
	if (globalQueue.ae !== null) {
		globalQueue.fe.push(globalQueue.ae);
		globalQueue.ae = null;
	}
	globalQueue.fe.push(e);
}
function insertSubs(e, t = false) {
	const n = e.G || currentOptimisticLane;
	const i = e.pe !== void 0;
	for (let r = e.I; r !== null; r = r.p) {
		if (i && r.h.Oe & CONFIG_IN_SNAPSHOT_SCOPE) {
			r.h.O |= REACTIVE_SNAPSHOT_STALE;
			continue;
		}
		if (t && n) {
			r.h.O |= REACTIVE_OPTIMISTIC_DIRTY;
			assignOrMergeLane(r.h, n);
		} else if (t) {
			r.h.O |= REACTIVE_OPTIMISTIC_DIRTY;
			r.h.G = void 0;
		}
		const e = r.h;
		if (e.J === EFFECT_TRACKED) {
			if (!e.ee) {
				e.ee = true;
				e.te.enqueue(EFFECT_USER, e.ne);
			}
			continue;
		}
		const o = r.h.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue;
		if (o.C > r.h.o) o.C = r.h.o;
		insertIntoHeap(r.h, o);
	}
}
function commitPendingNode(e) {
	const t = e;
	if (!t.L) {
		if (e.B !== NOT_PENDING) {
			e.ue = e.B;
			e.B = NOT_PENDING;
		}
		return;
	}
	if (e.B !== NOT_PENDING) {
		e.ue = e.B;
		e.B = NOT_PENDING;
		if (e.J && e.J !== EFFECT_TRACKED) e.ee = true;
	}
	t.O &= -1025;
	if (!(t.he & STATUS_PENDING)) t.he &= -5;
	if (t.Ne !== null || t.Ae !== null) GlobalQueue.Se(t, false, true);
}
function commitPendingNodes() {
	if (globalQueue.ae !== null) {
		commitPendingNode(globalQueue.ae);
		globalQueue.ae = null;
	}
	const e = globalQueue.fe;
	for (let t = 0; t < e.length; t++) commitPendingNode(e[t]);
	e.length = 0;
}
function finalizePureQueue(e = null, t = false) {
	const n = !t;
	if (n) commitPendingNodes();
	if (!t && globalQueue.Y.length) checkBoundaryChildren(globalQueue);
	const i = dirtyQueue._ >= dirtyQueue.C;
	if (i) runHeap(dirtyQueue, GlobalQueue.Ee);
	if (n) {
		if (i) commitPendingNodes();
		resolveOptimisticNodes(e ? e.Z : globalQueue.Z);
		if (e && e.se.size) {
			for (const t of e.se) {
				if (t.O & REACTIVE_DISPOSED) continue;
				if (t.J === EFFECT_TRACKED) {
					if (!t.ee) {
						t.ee = true;
						t.te.enqueue(EFFECT_USER, t.ne);
					}
					continue;
				}
				const e = t.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue;
				if (e.C > t.o) e.C = t.o;
				insertIntoHeap(t, e);
			}
			e.se.clear();
		}
		const t = e ? e.q : globalQueue.q;
		if (GlobalQueue.de && t.size) {
			for (const e of t) GlobalQueue.de(e);
			t.clear();
			schedule();
		}
		sweepTransientStoreNodes();
		cleanupCompletedLanes(e);
	}
}
function checkBoundaryChildren(e) {
	for (const t of e.Y) {
		t.checkSources?.();
		checkBoundaryChildren(t);
	}
}
function reassignPendingTransition(e) {
	for (let t = 0; t < e.length; t++) e[t].M = activeTransition;
}
var globalQueue = new GlobalQueue();
function flush$1(e) {
	if (e) {
		syncDepth++;
		try {
			return e();
		} finally {
			flush$1();
			syncDepth--;
		}
	}
	if (globalQueue.ce) return;
	while (scheduled || activeTransition) globalQueue.flush();
}
function runQueue(e, t) {
	for (let n = 0; n < e.length; n++) e[n](t);
}
function reporterBlocksSource(e, t) {
	if (e.O & 96) return false;
	if (e.Ce === t || e.Pe?.has(t)) return true;
	for (let n = e.P; n; n = n.D) {
		let e = n.m;
		while (e) {
			if (e === t || e.V === t) return true;
			e = e.U;
		}
	}
	return !!(e.he & STATUS_PENDING && e.Re instanceof NotReadyError && e.Re.source === t);
}
function transitionComplete(e) {
	if (e.ie) return true;
	if (e.re.length) return false;
	let t = true;
	for (const [n, i] of e.oe) {
		let r = false;
		for (const e of i) {
			if (reporterBlocksSource(e, n)) {
				r = true;
				break;
			}
			i.delete(e);
		}
		if (!r) e.oe.delete(n);
		else if (n.he & STATUS_PENDING && n.Re?.source === n) {
			t = false;
			break;
		}
	}
	if (t) for (let n = 0; n < e.Z.length; n++) {
		const i = e.Z[n];
		if (hasActiveOverride(i) && "he" in i && i.he & STATUS_PENDING && i.Re instanceof NotReadyError && i.Re.source !== i) {
			t = false;
			break;
		}
	}
	t && (e.ie = true);
	return t;
}
function currentTransition(e) {
	while (e.ie && typeof e.ie === "object") e = e.ie;
	return e;
}
function runInTransition(e, t) {
	const n = activeTransition;
	try {
		activeTransition = currentTransition(e);
		return t();
	} finally {
		activeTransition = n;
	}
}
function markDisposal(e) {
	let t = e.ge;
	while (t) {
		t.O |= REACTIVE_ZOMBIE;
		if (t.O & REACTIVE_IN_HEAP) {
			deleteFromHeap(t, dirtyQueue);
			insertIntoHeap(t, zombieQueue);
		}
		markDisposal(t);
		t = t.De;
	}
}
function disposeChildren(e, t = false, n) {
	const i = e.O;
	if (i & REACTIVE_DISPOSED) return;
	if (t) e.O = i | REACTIVE_DISPOSED;
	if (t && e.L) e.ve = null;
	let r = n ? e.Ne : e.ge;
	while (r) {
		const e = r.De;
		if (r.P) {
			const e = r;
			deleteFromHeap(e, e.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue);
			let t = e.P;
			do
				t = unlinkSubs(t);
			while (t !== null);
			e.P = null;
			e.ye = null;
		}
		disposeChildren(r, true);
		r = e;
	}
	if (n) e.Ne = null;
	else {
		e.ge = null;
		e.me = 0;
	}
	if (t && !n && !(i & REACTIVE_ZOMBIE) && e.i !== null && !(e.i.O & REACTIVE_DISPOSED)) {
		const t = e.we;
		const n = e.De;
		if (t !== null) t.De = n;
		else e.i.ge = n;
		if (n !== null) n.we = t;
		e.we = null;
	}
	runDisposal(e, n);
}
function runDisposal(e, t) {
	let n = t ? e.Ae : e.be;
	if (!n) return;
	if (Array.isArray(n)) for (let e = 0; e < n.length; e++) {
		const t = n[e];
		t.call(t);
	}
	else n.call(n);
	t ? e.Ae = null : e.be = null;
}
function childId(e, t) {
	let n = e;
	while (n.Oe & CONFIG_TRANSPARENT && n.i) n = n.i;
	if (n.id != null) return formatId(n.id, t ? n.me++ : n.me);
	throw new Error("Cannot get child id from owner without an id");
}
function getNextChildId$1(e) {
	return childId(e, true);
}
function formatId(e, t) {
	const n = t.toString(36), i = n.length - 1;
	return e + (i ? String.fromCharCode(64 + i) : "") + n;
}
function cleanup(e) {
	if (!context) return e;
	if (!context.be) context.be = e;
	else if (Array.isArray(context.be)) context.be.push(e);
	else context.be = [context.be, e];
	return e;
}
function unlinkSubs(e) {
	const t = e.m;
	const n = e.D;
	const i = e.p;
	const r = e.Le;
	if (i !== null) i.Le = r;
	else t.Ue = r;
	if (r !== null) r.p = i;
	else {
		t.I = i;
		if (i === null) {
			t.X?.();
			const e = t;
			e.L && e.Oe & CONFIG_AUTO_DISPOSE && !(e.O & REACTIVE_ZOMBIE) && unobserved(e);
		}
	}
	return n;
}
function trimStaleDeps(e) {
	const t = e.ye;
	let n = t !== null ? t.D : e.P;
	if (n !== null) {
		do
			n = unlinkSubs(n);
		while (n !== null);
		if (t !== null) t.D = null;
		else e.P = null;
	}
}
function unobserved(e) {
	deleteFromHeap(e, e.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue);
	let t = e.P;
	while (t !== null) t = unlinkSubs(t);
	e.P = null;
	e.ye = null;
	disposeChildren(e, true);
}
function link(e, t) {
	const n = t.ye;
	if (n !== null && n.m === e) return;
	let i = null;
	const r = t.O & REACTIVE_RECOMPUTING_DEPS;
	if (r) {
		i = n !== null ? n.D : t.P;
		if (i !== null && i.m === e) {
			t.ye = i;
			return;
		}
	}
	const o = e.Ue;
	if (o !== null && o.h === t && (!r || isValidLink(o, t))) return;
	const s = t.ye = e.Ue = {
		m: e,
		h: t,
		D: i,
		Le: o,
		p: null
	};
	if (n !== null) n.D = s;
	else t.P = s;
	if (o !== null) o.p = s;
	else e.I = s;
}
function isValidLink(e, t) {
	const n = t.ye;
	if (n !== null) {
		let i = t.P;
		do {
			if (i === e) return true;
			if (i === n) break;
			i = i.D;
		} while (i !== null);
	}
	return false;
}
function addPendingSource(e, t) {
	if (e.Ce === t || e.Pe?.has(t)) return false;
	if (!e.Ce) {
		e.Ce = t;
		return true;
	}
	if (!e.Pe) e.Pe = new Set([e.Ce, t]);
	else e.Pe.add(t);
	e.Ce = void 0;
	return true;
}
function removePendingSource(e, t) {
	if (e.Ce) {
		if (e.Ce !== t) return false;
		e.Ce = void 0;
		return true;
	}
	if (!e.Pe?.delete(t)) return false;
	if (e.Pe.size === 1) {
		e.Ce = e.Pe.values().next().value;
		e.Pe = void 0;
	} else if (e.Pe.size === 0) e.Pe = void 0;
	return true;
}
function clearPendingSources(e) {
	e.Ce = void 0;
	e.Pe?.clear();
	e.Pe = void 0;
}
function setPendingError(e, t, n) {
	if (!t) {
		e.Re = null;
		return;
	}
	if (n instanceof NotReadyError && n.source === t) {
		e.Re = n;
		return;
	}
	const i = e.Re;
	if (!(i instanceof NotReadyError) || i.source !== t) e.Re = new NotReadyError(t);
}
function forEachDependent(e, t) {
	for (let n = e.I; n !== null; n = n.p) t(n.h);
	for (let n = e.N; n !== null; n = n.A) for (let e = n.I; e !== null; e = e.p) t(e.h);
}
function settlePendingSource(e) {
	let t = false;
	const n = /* @__PURE__ */ new Set();
	const settle = (i) => {
		if (n.has(i) || !removePendingSource(i, e)) return;
		n.add(i);
		i.Ie = clock;
		const r = i.Ce ?? i.Pe?.values().next().value;
		if (r) {
			setPendingError(i, r);
			updatePendingSignal(i);
		} else {
			i.he &= -2;
			setPendingError(i);
			updatePendingSignal(i);
			if (i.Ge) {
				if (i.J === EFFECT_TRACKED) {
					const e = i;
					if (!e.ee) {
						e.ee = true;
						e.te.enqueue(EFFECT_USER, e.ne);
					}
				} else {
					const e = i.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue;
					if (e.C > i.o) e.C = i.o;
					insertIntoHeap(i, e);
				}
				t = true;
			}
			i.Ge = false;
		}
		forEachDependent(i, settle);
	};
	forEachDependent(e, settle);
	if (t) schedule();
}
function handleAsync(e, t, n) {
	let i = false;
	let r = false;
	if (typeof t === "object" && t !== null) untrack$1(() => {
		i = t[Symbol.asyncIterator];
		r = !i && typeof t.then === "function";
	});
	if (!r && !i) {
		e.ve = null;
		return t;
	}
	e.ve = t;
	let o;
	const handleError = (n) => {
		if (e.ve !== t) return;
		globalQueue.initTransition(resolveTransition(e));
		notifyStatus(e, n instanceof NotReadyError ? STATUS_PENDING : STATUS_ERROR, n);
		e.Ie = clock;
	};
	const asyncWrite = (i, r) => {
		if (e.ve !== t) return;
		if (e.O & 130) return;
		globalQueue.initTransition(resolveTransition(e));
		const o = !!(e.he & STATUS_UNINITIALIZED);
		trimStaleDeps(e);
		clearStatus(e);
		const s = resolveLane(e);
		if (s) s.F.delete(e);
		if (n) n(i);
		else if (e.K !== void 0) {
			if (e.K !== void 0 && e.K !== NOT_PENDING) e.B = i;
			else {
				e.ue = i;
				insertSubs(e);
			}
			e.Ie = clock;
		} else if (s) {
			const t = e.J;
			const n = e.ue;
			const r = e.ke;
			if (!t && o || !r || !r(i, n)) {
				e.ue = i;
				e.Ie = clock;
				if (e.Fe) setSignal(e.Fe, i);
				insertSubs(e, true);
			}
		} else setSignal(e, () => i);
		settlePendingSource(e);
		schedule();
		flush$1();
		r?.();
	};
	if (r) {
		let n = false, i = true;
		t.then((e) => {
			if (i) {
				o = e;
				n = true;
			} else asyncWrite(e);
		}, (e) => {
			if (!i) handleError(e);
		});
		i = false;
		if (!n) {
			globalQueue.initTransition(resolveTransition(e));
			throw new NotReadyError(context);
		}
	}
	if (i) {
		const n = t[Symbol.asyncIterator]();
		let i = false;
		let r = false;
		cleanup(() => {
			if (r) return;
			r = true;
			try {
				const e = n.return?.();
				if (e && typeof e.then === "function") e.then(void 0, () => {});
			} catch {}
		});
		const iterate = () => {
			let s, u = false, c = true;
			n.next().then((n) => {
				if (c) {
					s = n;
					u = true;
					if (n.done) r = true;
				} else if (e.ve !== t) return;
				else if (!n.done) asyncWrite(n.value, iterate);
				else {
					r = true;
					schedule();
					flush$1();
				}
			}, (n) => {
				if (!c && e.ve === t) {
					r = true;
					handleError(n);
				}
			});
			c = false;
			if (u && !s.done) {
				o = s.value;
				i = true;
				return iterate();
			}
			return u && s.done;
		};
		const s = iterate();
		if (!i && !s) {
			globalQueue.initTransition(resolveTransition(e));
			throw new NotReadyError(context);
		}
	}
	return o;
}
function clearStatus(e, t = false) {
	if (e.Ce || e.Pe) clearPendingSources(e);
	if (e.Ge) e.Ge = false;
	e.he = t ? 0 : e.he & STATUS_UNINITIALIZED;
	if (e.Re) setPendingError(e);
	if (e.We) updatePendingSignal(e);
	if (e.xe) e.xe();
}
function notifyStatus(e, t, n, i, r) {
	if (t === STATUS_ERROR && !(n instanceof StatusError) && !(n instanceof NotReadyError)) n = new StatusError(e, n);
	const o = t === STATUS_PENDING && n instanceof NotReadyError ? n.source : void 0;
	const s = o === e;
	const u = t === STATUS_PENDING && e.K !== void 0 && !s;
	const c = u && hasActiveOverride(e);
	if (!i) {
		if (t === STATUS_PENDING && o) {
			addPendingSource(e, o);
			e.he = STATUS_PENDING | e.he & STATUS_UNINITIALIZED;
			setPendingError(e, o, n);
		} else {
			clearPendingSources(e);
			e.he = t | (t !== STATUS_ERROR ? e.he & STATUS_UNINITIALIZED : 0);
			e.Re = n;
		}
		updatePendingSignal(e);
	}
	if (r && !i) assignOrMergeLane(e, r);
	const l = i || c;
	const a = i || u ? void 0 : r;
	if (e.xe) {
		if (i && t === STATUS_PENDING) return;
		if (l) e.xe(t, n);
		else e.xe();
		return;
	}
	forEachDependent(e, (e) => {
		e.Ie = clock;
		if (t === STATUS_PENDING && o && e.Ce !== o && !e.Pe?.has(o) || t !== STATUS_PENDING && (e.Re !== n || e.Ce || e.Pe)) {
			if (!l && !e.M) queuePendingNode(e);
			notifyStatus(e, t, n, l, a);
		}
	});
}
var externalSourceConfig = null;
GlobalQueue.Ee = recompute;
GlobalQueue.Se = disposeChildren;
var tracking = false;
var stale = false;
var pendingCheckActive = false;
var latestReadActive = false;
var context = null;
var currentOptimisticLane = null;
var pendingCheckSources = null;
var snapshotCaptureActive = false;
var snapshotSources = null;
function ownerInSnapshotScope(e) {
	while (e) {
		if (e.He) return true;
		e = e.i;
	}
	return false;
}
function recompute(e, t = false) {
	const n = e.J;
	if (!t) {
		if (e.M && (!n || activeTransition) && activeTransition !== e.M) globalQueue.initTransition(e.M);
		deleteFromHeap(e, e.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue);
		e.ve = null;
		if (e.M || n === EFFECT_TRACKED) disposeChildren(e);
		else if (e.ge !== null || e.be !== null) {
			markDisposal(e);
			e.Ae = e.be;
			e.Ne = e.ge;
			e.be = null;
			e.ge = null;
			e.me = 0;
		}
	}
	let i = !!(e.O & REACTIVE_OPTIMISTIC_DIRTY);
	const r = e.K !== void 0 && e.K !== NOT_PENDING;
	const o = !!(e.he & STATUS_PENDING);
	const s = !!(e.he & STATUS_UNINITIALIZED);
	const u = context;
	context = e;
	e.ye = null;
	e.O = REACTIVE_RECOMPUTING_DEPS;
	e.Ie = clock;
	let c = e.B === NOT_PENDING ? e.ue : e.B;
	let l = e.o;
	let a = tracking;
	let f = currentOptimisticLane;
	tracking = true;
	if (i) {
		const t = resolveLane(e);
		if (t) currentOptimisticLane = t;
	} else if (activeTransition && !t && activeTransition.Z.length) for (let t = e.P; t; t = t.D) {
		const n = t.m;
		if (n.O & REACTIVE_OPTIMISTIC_DIRTY) {
			const t = resolveLane(n);
			if (t) {
				i = true;
				currentOptimisticLane = t;
				e.O |= REACTIVE_OPTIMISTIC_DIRTY;
				assignOrMergeLane(e, t);
				break;
			}
		}
	}
	const E = n && n !== EFFECT_USER;
	const S = stale;
	if (E) stale = true;
	try {
		if (e.Oe & CONFIG_SYNC) {
			c = e.L(c);
			e.ve = null;
		} else {
			const t = e.ve;
			const n = e.L(c);
			const i = typeof n === "object" && n !== null;
			const r = e.ve !== t;
			c = r || !i ? n : handleAsync(e, n);
			if (!r && !i) e.ve = null;
		}
		clearStatus(e, t);
		if (e.G) {
			const t = resolveLane(e);
			if (t) {
				t.F.delete(e);
				updatePendingSignal(t.k);
			}
		}
	} catch (t) {
		if (t instanceof NotReadyError && currentOptimisticLane) {
			const t = findLane(currentOptimisticLane);
			if (t.k !== e) {
				t.F.add(e);
				e.G = t;
				updatePendingSignal(t.k);
			}
		}
		if (t instanceof NotReadyError) e.Ge = true;
		notifyStatus(e, t instanceof NotReadyError ? STATUS_PENDING : STATUS_ERROR, t, void 0, t instanceof NotReadyError ? e.G : void 0);
	} finally {
		tracking = a;
		if (E) stale = S;
		e.O = REACTIVE_NONE | (t ? e.O & REACTIVE_SNAPSHOT_STALE : 0);
		context = u;
	}
	if (!e.Re) {
		trimStaleDeps(e);
		const u = r ? e.K : e.B === NOT_PENDING ? e.ue : e.B;
		const a = !n && s || !e.ke || !e.ke(u, c);
		if (n && a) {
			e.ee = !e.Re;
			if (!t) e.te.enqueue(n, GlobalQueue.Te.bind(null, e));
		}
		if (a) {
			const s = r ? e.K : void 0;
			if (t || n && activeTransition !== e.M || i) {
				e.ue = c;
				if (r && i) {
					e.K = c;
					e.B = c;
				}
			} else e.B = c;
			if (r && !i && o && !e.$) e.K = c;
			if (!r || i || e.K !== s) insertSubs(e, i || r);
		} else if (r) e.B = c;
		else if (e.o != l) for (let t = e.I; t !== null; t = t.p) insertIntoHeapHeight(t.h, t.h.O & REACTIVE_ZOMBIE ? zombieQueue : dirtyQueue);
	}
	currentOptimisticLane = f;
	(e.B !== NOT_PENDING || e.Ne !== null || e.Ae !== null || e.he & 5) && (!t || e.he & STATUS_PENDING) && !e.M && !(activeTransition && r) && queuePendingNode(e);
	e.M && n && activeTransition !== e.M && runInTransition(e.M, () => recompute(e));
}
function updateIfNecessary(e) {
	if (e.O & REACTIVE_CHECK) for (let t = e.P; t; t = t.D) {
		const n = t.m;
		const i = n.V || n;
		if (i.L) updateIfNecessary(i);
		if (e.O & REACTIVE_DIRTY) break;
	}
	if (e.O & 130 || e.Re && e.Ie < clock && !e.ve) recompute(e);
	e.O = e.O & 280;
}
function computed(e, t) {
	const n = t?.transparent ?? false;
	const i = {
		id: t?.id ?? (n ? context?.id : context?.id != null ? getNextChildId$1(context) : void 0),
		Oe: (n ? CONFIG_TRANSPARENT : 0) | (t?.ownedWrite ? CONFIG_OWNED_WRITE : 0) | (!context || t?.lazy ? CONFIG_AUTO_DISPOSE : 0) | (t?.sync ? CONFIG_SYNC : 0) | (snapshotCaptureActive && ownerInSnapshotScope(context) ? CONFIG_IN_SNAPSHOT_SCOPE : 0),
		ke: t?.equals != null ? t.equals : isEqual,
		X: t?.unobserved,
		be: null,
		te: context?.te ?? globalQueue,
		Ve: context?.Ve ?? defaultContext,
		me: 0,
		L: e,
		ue: void 0,
		o: 0,
		N: null,
		T: void 0,
		S: null,
		P: null,
		ye: null,
		I: null,
		Ue: null,
		i: context,
		De: null,
		we: null,
		ge: null,
		O: t?.lazy ? REACTIVE_LAZY : REACTIVE_NONE,
		he: STATUS_UNINITIALIZED,
		Ie: clock,
		B: NOT_PENDING,
		Ae: null,
		Ne: null,
		ve: null,
		M: null
	};
	setupComputedNode(i, t);
	return i;
}
function setupComputedNode(e, t) {
	e.S = e;
	const n = context?.t ? context.u : context;
	if (context) {
		const t = context.ge;
		if (t === null) context.ge = e;
		else {
			e.De = t;
			t.we = e;
			context.ge = e;
		}
	}
	if (n) e.o = n.o + 1;
	if (externalSourceConfig) {
		const t = signal(void 0, {
			equals: false,
			ownedWrite: true
		});
		const n = externalSourceConfig.factory(e.L, () => {
			setSignal(t, void 0);
		});
		cleanup(() => n.dispose());
		e.L = (e) => {
			read(t);
			return n.track(e);
		};
	}
	!t?.lazy && recompute(e, true);
	if (snapshotCaptureActive && !t?.lazy) {
		if (!(e.he & STATUS_PENDING)) {
			e.pe = e.ue === void 0 ? NO_SNAPSHOT : e.ue;
			snapshotSources.add(e);
		}
	}
}
function signal(e, t, n = null) {
	const i = {
		ke: t?.equals != null ? t.equals : isEqual,
		Oe: (t?.ownedWrite ? CONFIG_OWNED_WRITE : 0) | (t?.Ye ? CONFIG_NO_SNAPSHOT : 0),
		X: t?.unobserved,
		ue: e,
		I: null,
		Ue: null,
		Ie: clock,
		V: n,
		A: n?.N || null,
		B: NOT_PENDING
	};
	n && (n.N = i);
	if (snapshotCaptureActive && !(i.Oe & CONFIG_NO_SNAPSHOT) && !((n?.he ?? 0) & STATUS_PENDING)) {
		i.pe = e === void 0 ? NO_SNAPSHOT : e;
		snapshotSources.add(i);
	}
	return i;
}
function optimisticComputed(e, t) {
	const n = computed(e, t);
	n.K = NOT_PENDING;
	return n;
}
function isEqual(e, t) {
	return e === t;
}
function untrack$1(e, t) {
	if (!externalSourceConfig && !tracking && true) return e();
	const n = tracking;
	tracking = false;
	try {
		if (externalSourceConfig) return externalSourceConfig.untrack(e);
		return e();
	} finally {
		tracking = n;
	}
}
function read(e) {
	if (latestReadActive) {
		const t = getLatestValueComputed(e);
		const n = latestReadActive;
		latestReadActive = false;
		const i = e.K !== void 0 && e.K !== NOT_PENDING ? e.K : e.ue;
		let r;
		try {
			r = read(t);
		} catch (e) {
			if (!context && e instanceof NotReadyError) return i;
			throw e;
		} finally {
			latestReadActive = n;
		}
		if (t.he & STATUS_PENDING) return i;
		if (stale && currentOptimisticLane && t.G) {
			const e = findLane(t.G);
			if (e !== findLane(currentOptimisticLane) && e.F.size > 0) return i;
		}
		return r;
	}
	if (pendingCheckActive) {
		const t = e.V;
		const n = pendingCheckActive;
		pendingCheckActive = false;
		let i = context;
		if (i?.t) i = i.u;
		const r = t || e;
		if (typeof e.L === "function") {
			const t = e;
			if (t.O & REACTIVE_LAZY) {
				t.O &= -513;
				recompute(t, true);
			} else if (t.O & REACTIVE_DISPOSED) recompute(t, true);
			else updateIfNecessary(t);
		}
		if (i && r.he & STATUS_PENDING && r.he & STATUS_UNINITIALIZED) {
			if (tracking && e !== i) link(e, i);
			pendingCheckActive = n;
			throw r.Re;
		}
		if (t && e.K !== void 0) {
			if (e.K !== NOT_PENDING && (t.ve || !!(t.he & STATUS_PENDING)));
			collectPendingSources(e);
			collectPendingSources(t);
			if (i && tracking) link(e, i);
		} else {
			collectPendingSources(e);
			if (t) collectPendingSources(t);
		}
		pendingCheckActive = n;
	}
	let t = context;
	if (t?.t) t = t.u;
	const n = e;
	if (typeof n.L === "function") {
		const t = e;
		if (t.O & REACTIVE_LAZY) {
			t.O &= -513;
			recompute(t, true);
		} else if (t.O & REACTIVE_DISPOSED) recompute(t, true);
	}
	const i = e.V || e;
	if (!n.L && i === e && e.K === void 0 && e.pe === void 0 && activeTransition === null && currentOptimisticLane === null && !snapshotCaptureActive && true) {
		if (t && tracking) link(e, t);
		return !t || e.B === NOT_PENDING ? e.ue : e.B;
	}
	if (t && tracking) {
		link(e, t);
		if (i.L) {
			const n = e.O & REACTIVE_ZOMBIE;
			if (i.o >= (n ? zombieQueue.C : dirtyQueue.C)) {
				markNode(t);
				markHeap(n ? zombieQueue : dirtyQueue);
				updateIfNecessary(i);
			}
			const r = i.o;
			if (r >= t.o && e.i !== t) t.o = r + 1;
		}
	}
	if (i.he & STATUS_PENDING) {
		if (t && !(stale && i.M && activeTransition !== i.M)) if (currentOptimisticLane) {
			const n = i.G;
			const r = findLane(currentOptimisticLane);
			if (n && findLane(n) === r && !hasActiveOverride(i)) {
				if (!tracking && e !== t) link(e, t);
				throw i.Re;
			}
		} else {
			if (!tracking && e !== t) link(e, t);
			throw i.Re;
		}
		else if (t && i !== e && i.he & STATUS_UNINITIALIZED) {
			if (!tracking && e !== t) link(e, t);
			throw i.Re;
		} else if (!t && i.he & STATUS_UNINITIALIZED) throw i.Re;
	}
	if (e.L && e.he & STATUS_ERROR) if (e.Ie < clock) {
		recompute(e);
		return read(e);
	} else throw e.Re;
	if (snapshotCaptureActive && t && t.Oe & CONFIG_IN_SNAPSHOT_SCOPE) {
		const n = e.pe;
		if (n !== void 0) {
			const i = n === NO_SNAPSHOT ? void 0 : n;
			if ((e.B !== NOT_PENDING ? e.B : e.ue) !== i) t.O |= REACTIVE_SNAPSHOT_STALE;
			return i;
		}
	}
	if (e.K !== void 0 && e.K !== NOT_PENDING) {
		if (t && stale && shouldReadStashedOptimisticValue(e)) return e.ue;
		return e.K;
	}
	if (activeTransition !== null && currentOptimisticLane !== null && !latestReadActive && e.B !== NOT_PENDING && i === e && !e.L && t) {
		activeTransition.se.add(t);
		return e.ue;
	}
	const r = !t || currentOptimisticLane !== null && (e.K !== void 0 || e.G || i === e && stale || !!(i.he & STATUS_PENDING)) || e.B === NOT_PENDING || stale && e.M && activeTransition !== e.M ? e.ue : e.B;
	if (!t && i === e && typeof n.L === "function" && e.Oe & CONFIG_AUTO_DISPOSE && !(i.he & STATUS_PENDING) && !e.I) unobserved(e);
	return r;
}
function setSignal(e, t) {
	if (e.M && activeTransition !== e.M) globalQueue.initTransition(e.M);
	const n = e.K !== void 0 && !projectionWriteActive;
	const i = e.K !== void 0 && e.K !== NOT_PENDING;
	const r = n ? i ? e.K : e.ue : e.B === NOT_PENDING ? e.ue : e.B;
	if (typeof t === "function") t = t(r);
	if (!(!e.ke || !e.ke(r, t) || !!(e.he & STATUS_UNINITIALIZED))) {
		if (n && i && e.L) {
			insertSubs(e, true);
			schedule();
		}
		return t;
	}
	if (n) {
		const n = e.K === NOT_PENDING;
		if (!n) globalQueue.initTransition(resolveTransition(e));
		if (n) {
			e.B = e.ue;
			globalQueue.Z.push(e);
		}
		e.$ = true;
		e.G = getOrCreateLane(e);
		e.K = t;
	} else {
		if (e.B === NOT_PENDING) queuePendingNode(e);
		e.B = t;
	}
	if (e.We) updatePendingSignal(e);
	if (e.Fe) setSignal(e.Fe, t);
	e.Ie = clock;
	insertSubs(e, n);
	schedule();
	return t;
}
function runWithOwner$1(e, t) {
	const n = context;
	const i = tracking;
	context = e;
	tracking = false;
	try {
		return t();
	} finally {
		context = n;
		tracking = i;
	}
}
function collectPendingSources(e) {
	pendingCheckSources?.add(e);
	const t = e.V || e;
	if (t !== e) pendingCheckSources?.add(t);
}
function computePendingState(e) {
	const t = e;
	const n = e.V;
	if (e.U) {
		const n = e.U;
		if (n.he & STATUS_PENDING && !(n.he & STATUS_UNINITIALIZED)) return true;
		return e.B !== NOT_PENDING && !(t.he & STATUS_UNINITIALIZED);
	}
	if (n && e.B !== NOT_PENDING) return !n.ve && !(n.he & STATUS_PENDING);
	if (e.K !== void 0 && e.K !== NOT_PENDING) {
		if (t.he & STATUS_PENDING && !(t.he & STATUS_UNINITIALIZED)) return true;
		if (e.U) {
			const t = e.G ? findLane(e.G) : null;
			return !!(t && t.F.size > 0);
		}
		return true;
	}
	if (e.K !== void 0 && e.K === NOT_PENDING && !e.U) return false;
	if (e.B !== NOT_PENDING && !(t.he & STATUS_UNINITIALIZED)) return true;
	return !!(t.he & STATUS_PENDING && !(t.he & STATUS_UNINITIALIZED));
}
function updatePendingSignal(e) {
	if (e.We) {
		const t = computePendingState(e);
		const n = e.We;
		setSignal(n, t);
		if (!t && n.G) {
			const t = resolveLane(e);
			if (t && t.F.size > 0) {
				const e = findLane(n.G);
				if (e !== t) mergeLanes(t, e);
			}
			signalLanes.delete(n);
			n.G = void 0;
		}
	}
}
function getLatestValueComputed(e) {
	if (!e.Fe) {
		const t = latestReadActive;
		latestReadActive = false;
		const n = pendingCheckActive;
		pendingCheckActive = false;
		const i = context;
		context = null;
		e.Fe = optimisticComputed(() => read(e));
		e.Fe.U = e;
		context = i;
		pendingCheckActive = n;
		latestReadActive = t;
	}
	return e.Fe;
}
function createContext$1(e, t) {
	return {
		id: Symbol(t),
		defaultValue: e
	};
}
function runEffect(e) {
	if (!e.ee || e.O & REACTIVE_DISPOSED) return;
	e.$e?.();
	e.$e = void 0;
	try {
		e.$e = e.Qe(e.ue, e.Me);
		if (e.$e && !e.Ke) {
			e.Ke = true;
			runWithOwner$1(e.i, () => cleanup(() => e.$e?.()));
		}
	} catch (t) {
		e.Re = new StatusError(e, t);
		e.he |= STATUS_ERROR;
		if (!e.te.notify(e, STATUS_ERROR, STATUS_ERROR)) throw t;
	} finally {
		e.Me = e.ue;
		e.ee = false;
	}
}
GlobalQueue.Te = runEffect;
function accessor(e) {
	const t = read.bind(null, e);
	t[$REFRESH] = e;
	return t;
}
function createMemo$1(e, t) {
	return accessor(computed(e, t));
}
var $PROXY = Symbol(0);
function isWrappable(e) {
	if (e == null || typeof e !== "object" || Object.isFrozen(e)) return false;
	return typeof Node === "undefined" || !(e instanceof Node);
}
var DELETE = Symbol(0);
function isPrototypePollutionKey(e) {
	return e === "__proto__" || e === "constructor" || e === "prototype";
}
function updatePath(e, t, n = 0) {
	let i, r = e;
	if (n < t.length - 1) {
		i = t[n];
		const o = typeof i;
		const s = Array.isArray(e);
		if (o === "string" && isPrototypePollutionKey(i)) return;
		if (Array.isArray(i)) {
			for (let r = 0; r < i.length; r++) {
				t[n] = i[r];
				updatePath(e, t, n);
			}
			t[n] = i;
			return;
		} else if (s && o === "function") {
			for (let r = 0; r < e.length; r++) if (i(e[r], r)) {
				t[n] = r;
				updatePath(e, t, n);
			}
			t[n] = i;
			return;
		} else if (s && o === "object") {
			const { from: r = 0, to: o = e.length - 1, by: s = 1 } = i;
			for (let i = r; i <= o; i += s) {
				t[n] = i;
				updatePath(e, t, n);
			}
			t[n] = i;
			return;
		} else if (n < t.length - 2) {
			updatePath(e[i], t, n + 1);
			return;
		}
		r = e[i];
	}
	let o = t[t.length - 1];
	if (typeof o === "function") {
		o = o(r);
		if (o === r) return;
	}
	if (i === void 0 && o == void 0) return;
	if (o === DELETE) delete e[i];
	else if (i === void 0 || isWrappable(r) && isWrappable(o) && !Array.isArray(o)) {
		const t = i !== void 0 ? e[i] : e;
		const n = Object.keys(o);
		for (let e = 0; e < n.length; e++) {
			const i = n[e];
			if (isPrototypePollutionKey(i)) continue;
			const r = Object.getOwnPropertyDescriptor(o, i);
			if (r.get || r.set) Object.defineProperty(t, i, r);
			else t[i] = r.value;
		}
	} else e[i] = o;
}
Object.assign(function storePath(...e) {
	return (t) => {
		updatePath(t, e);
	};
}, { DELETE });
function trueFn() {
	return true;
}
var propTraps = {
	get(e, t, n) {
		if (t === $PROXY) return n;
		return e.get(t);
	},
	has(e, t) {
		if (t === $PROXY) return true;
		return e.has(t);
	},
	set: trueFn,
	deleteProperty: trueFn,
	getOwnPropertyDescriptor(e, t) {
		return {
			configurable: true,
			enumerable: true,
			get() {
				return e.get(t);
			},
			set: trueFn,
			deleteProperty: trueFn
		};
	},
	ownKeys(e) {
		return e.keys();
	}
};
function resolveSource(e) {
	return !(e = typeof e === "function" ? e() : e) ? {} : e;
}
var $SOURCES = Symbol(0);
function merge$1(...e) {
	if (e.length === 1 && typeof e[0] !== "function") return e[0];
	let t = false;
	const n = [];
	for (let i = 0; i < e.length; i++) {
		const r = e[i];
		t = t || !!r && $PROXY in r;
		const o = !!r && r[$SOURCES];
		if (o) for (let e = 0; e < o.length; e++) n.push(o[e]);
		else n.push(typeof r === "function" ? (t = true, createMemo$1(r)) : r);
	}
	if (SUPPORTS_PROXY && t) return new Proxy({
		get(e) {
			if (e === $SOURCES) return n;
			for (let t = n.length - 1; t >= 0; t--) {
				const i = resolveSource(n[t]);
				if (e in i) return i[e];
			}
		},
		has(e) {
			for (let t = n.length - 1; t >= 0; t--) if (e in resolveSource(n[t])) return true;
			return false;
		},
		keys() {
			const e = /* @__PURE__ */ new Set();
			for (let t = 0; t < n.length; t++) {
				const i = Object.keys(resolveSource(n[t]));
				for (let t = 0; t < i.length; t++) e.add(i[t]);
			}
			return [...e];
		}
	}, propTraps);
	const i = Object.create(null);
	let r = false;
	let o = n.length - 1;
	for (let e = o; e >= 0; e--) {
		const t = n[e];
		if (!t) {
			e === o && o--;
			continue;
		}
		const s = Object.getOwnPropertyNames(t);
		for (let n = s.length - 1; n >= 0; n--) {
			const u = s[n];
			if (u === "__proto__" || u === "constructor") continue;
			if (!i[u]) {
				r = r || e !== o;
				const n = Object.getOwnPropertyDescriptor(t, u);
				i[u] = n.get ? {
					enumerable: true,
					configurable: true,
					get: n.get.bind(t)
				} : n;
			}
		}
	}
	if (!r) return n[o];
	const s = {};
	const u = Object.keys(i);
	for (let e = u.length - 1; e >= 0; e--) {
		const t = u[e], n = i[t];
		if (n.get) Object.defineProperty(s, t, n);
		else s[t] = n.value;
	}
	s[$SOURCES] = n;
	return s;
}
function omit(e, ...t) {
	if (SUPPORTS_PROXY && $PROXY in e) return new Proxy({
		get(n) {
			return t.includes(n) ? void 0 : e[n];
		},
		has(n) {
			return !t.includes(n) && n in e;
		},
		keys() {
			return Object.keys(e).filter((e) => !t.includes(e));
		}
	}, propTraps);
	const n = {};
	const i = Object.getOwnPropertyNames(e);
	const r = t.length > 4 && i.length > t.length ? new Set(t) : void 0;
	for (const o of i) if (r ? !r.has(o) : !t.includes(o)) {
		const t = Object.getOwnPropertyDescriptor(e, o);
		!t.get && !t.set && t.enumerable && t.writable && t.configurable ? n[o] = t.value : Object.defineProperty(n, o, t);
	}
	return n;
}
createContext$1(null);
function flatten(e, t) {
	if (typeof e === "function" && !e.length) {
		if (t?.doNotUnwrap) return e;
		do
			e = e();
		while (typeof e === "function" && !e.length);
	}
	if (t?.skipNonRendered && (e == null || e === true || e === false || e === "")) return;
	if (Array.isArray(e)) {
		let n = [];
		if (flattenArray(e, n, t)) return () => {
			let e = [];
			flattenArray(n, e, {
				...t,
				doNotUnwrap: false
			});
			return e;
		};
		return n;
	}
	return e;
}
function flattenArray(e, t = [], n) {
	let i = null;
	let r = false;
	for (let o = 0; o < e.length; o++) try {
		let i = e[o];
		if (typeof i === "function" && !i.length) {
			if (n?.doNotUnwrap) {
				t.push(i);
				r = true;
				continue;
			}
			do
				i = i();
			while (typeof i === "function" && !i.length);
		}
		if (Array.isArray(i)) r = flattenArray(i, t, n);
		else if (n?.skipNonRendered && (i == null || i === true || i === false || i === "")) {} else t.push(i);
	} catch (e) {
		if (!(e instanceof NotReadyError)) throw e;
		i = e;
	}
	if (i) throw i;
	return r;
}
//#endregion
//#region node_modules/.pnpm/solid-js@2.0.0-beta.14/node_modules/solid-js/dist/server.js
var NoHydrateContext = {
	id: Symbol("NoHydrateContext"),
	defaultValue: false
};
var sharedConfig = { getNextContextId() {
	const o = getOwner();
	if (!o) throw new Error(`getNextContextId cannot be used under non-hydrating context`);
	if (getContext(NoHydrateContext)) return void 0;
	return getNextChildId(o);
} };
var defaultSSRContext = {};
var currentOwner = null;
var OWNER_POOL_MAX = 4096;
var ownerPool = [];
function formatChildId(prefix, id) {
	const num = id.toString(36);
	const len = num.length - 1;
	return prefix + (len ? String.fromCharCode(64 + len) : "") + num;
}
function nextChildIdFor(owner, consume) {
	let counter = owner;
	while (counter._transparent && counter._parent) counter = counter._parent;
	if (counter.id != null) return formatChildId(counter.id, counter._childCount++);
	throw new Error("Cannot get child id from owner without an id");
}
function consumeClientComputedSlot(owner) {
	if (owner?.id != null) nextChildIdFor(owner);
}
function getNextChildId(owner) {
	return nextChildIdFor(owner);
}
function createOwner(options) {
	const parent = currentOwner;
	const transparent = options?.transparent ?? false;
	const id = options?.id ?? (transparent ? parent?.id : parent?.id != null ? nextChildIdFor(parent) : void 0);
	const ctx = parent?._context ?? defaultSSRContext;
	let owner;
	if (ownerPool.length) {
		owner = ownerPool.pop();
		owner.id = id;
		owner._transparent = transparent;
		owner._disposal = null;
		owner._parent = parent;
		owner._context = ctx;
		owner._childCount = 0;
		owner._firstChild = null;
		owner._nextSibling = null;
		owner._disposed = false;
	} else owner = {
		id,
		_transparent: transparent,
		_disposal: null,
		_parent: parent,
		_context: ctx,
		_childCount: 0,
		_firstChild: null,
		_nextSibling: null,
		_disposed: false
	};
	if (parent) {
		const lastChild = parent._firstChild;
		if (lastChild) owner._nextSibling = lastChild;
		parent._firstChild = owner;
	}
	return owner;
}
function runWithOwner(owner, fn) {
	const prev = currentOwner;
	currentOwner = owner;
	try {
		return fn();
	} finally {
		currentOwner = prev;
	}
}
function getOwner() {
	return currentOwner;
}
function onCleanup(fn) {
	const o = currentOwner;
	if (!o) return fn;
	if (!o._disposal) o._disposal = fn;
	else if (Array.isArray(o._disposal)) o._disposal.push(fn);
	else o._disposal = [o._disposal, fn];
	return fn;
}
function getContext(context, owner = currentOwner) {
	if (!owner) throw new NoOwnerError();
	const stored = owner._context[context.id];
	const value = stored !== void 0 ? stored : context.defaultValue;
	if (value === void 0) throw new ContextNotFoundError();
	return value;
}
function setContext(context, value, owner = currentOwner) {
	if (!owner) throw new NoOwnerError();
	const o = owner;
	o._context = {
		...o._context,
		[context.id]: value === void 0 ? context.defaultValue : value
	};
}
function disposeOwner(owner, self = true) {
	const node = owner;
	if (node._disposed) return;
	if (!node._firstChild && !node._disposal) {
		if (self) {
			node._disposed = true;
			if (ownerPool.length < OWNER_POOL_MAX) {
				node.id = void 0;
				node._parent = null;
				node._nextSibling = null;
				ownerPool.push(node);
			}
		}
		return;
	}
	if (self) node._disposed = true;
	let child = node._firstChild;
	while (child) {
		const next = child._nextSibling;
		disposeOwner(child, true);
		child = next;
	}
	node._firstChild = null;
	node._childCount = 0;
	const d = node._disposal;
	if (d) {
		if (Array.isArray(d)) for (let i = 0, len = d.length; i < len; i++) d[i]();
		else d();
		node._disposal = null;
	}
	if (self && ownerPool.length < OWNER_POOL_MAX) {
		node.id = void 0;
		node._parent = null;
		node._nextSibling = null;
		ownerPool.push(node);
	}
}
function createRoot(init, options) {
	const owner = createOwner(options);
	return runWithOwner(owner, () => init(() => disposeOwner(owner)));
}
var Observer = null;
function runWithObserver(comp, fn) {
	const prev = Observer;
	Observer = comp;
	try {
		return fn();
	} finally {
		Observer = prev;
	}
}
function createDeferredPromise() {
	let settled = false;
	let resolvePromise;
	let rejectPromise;
	const promise = new Promise((resolve, reject) => {
		resolvePromise = resolve;
		rejectPromise = reject;
	});
	return {
		promise,
		resolve(value) {
			if (settled) return;
			settled = true;
			promise.s = 1;
			promise.v = value;
			resolvePromise(value);
		},
		reject(error) {
			if (settled) return;
			settled = true;
			promise.s = 2;
			promise.v = error;
			rejectPromise(error);
		}
	};
}
function subscribePendingRetry(error, retry) {
	if (!(error instanceof NotReadyError)) return false;
	error.source?.then(() => retry(), () => retry());
	return true;
}
function settleServerAsync(initial, rerun, deferred, onSuccess, onError, isDisposed) {
	let first = true;
	const attempt = () => {
		if (isDisposed()) return;
		let current;
		try {
			current = first ? initial : rerun();
			first = false;
		} catch (error) {
			if (subscribePendingRetry(error, attempt)) return;
			onError(error);
			deferred.reject(error);
			return;
		}
		Promise.resolve(current).then((value) => {
			if (isDisposed()) return;
			deferred.resolve(onSuccess(value));
		}, (error) => {
			if (isDisposed()) return;
			if (subscribePendingRetry(error, attempt)) return;
			onError(error);
			deferred.reject(error);
		});
	};
	attempt();
}
function createSignal(first, second) {
	if (typeof first === "function") return [createMemo((prev) => first(prev), second?.deferStream || second?.ssrSource ? {
		deferStream: second?.deferStream,
		ssrSource: second?.ssrSource
	} : void 0), () => void 0];
	return [() => first, (v) => {
		return first = typeof v === "function" ? v(first) : v;
	}];
}
function createMemo(compute, options) {
	if (options?.sync) return createSyncMemo(compute, options);
	const ctx = sharedConfig.context;
	const owner = createOwner();
	const comp = {
		owner,
		value: void 0,
		compute,
		error: void 0,
		computed: false,
		disposed: false
	};
	runWithOwner(owner, () => onCleanup(() => {
		comp.disposed = true;
	}));
	function update() {
		if (comp.disposed) return;
		const run = () => runWithOwner(owner, () => runWithObserver(comp, () => comp.compute(comp.value)));
		try {
			comp.error = void 0;
			const result = run();
			comp.computed = true;
			processResult(comp, result, owner, ctx, options?.deferStream, options?.ssrSource, run);
		} catch (err) {
			if (err instanceof NotReadyError) subscribePendingRetry(err, update);
			comp.error = err;
			comp.computed = true;
		}
	}
	if (options?.ssrSource === "client") comp.computed = true;
	else if (!options?.lazy) update();
	const read = () => {
		if (!comp.computed) update();
		if (comp.error) throw comp.error;
		return comp.value;
	};
	read[$REFRESH] = comp;
	return read;
}
function createSyncMemo(compute, options) {
	const owner = createOwner();
	let value;
	let error;
	let cached = false;
	function pull() {
		const prev = currentOwner;
		currentOwner = owner;
		try {
			value = compute(value);
			error = void 0;
			cached = true;
			return value;
		} catch (err) {
			if (err instanceof NotReadyError) throw err;
			error = err;
			cached = true;
			throw err;
		} finally {
			currentOwner = prev;
		}
	}
	if (!options?.lazy) try {
		pull();
	} catch {}
	return () => {
		if (cached) {
			if (error !== void 0) throw error;
			return value;
		}
		return pull();
	};
}
function processResult(comp, result, owner, ctx, deferStream, ssrSource, rerun) {
	if (comp.disposed) return;
	const id = owner.id;
	const noHydrate = getContext(NoHydrateContext, owner);
	if (result instanceof Promise) {
		if (result.s === 1) {
			comp.value = result.v;
			comp.error = void 0;
			return;
		}
		if (result.s === 2) {
			comp.error = result.v;
			return;
		}
		const deferred = createDeferredPromise();
		if (ctx?.async && ctx.serialize && id && !noHydrate) ctx.serialize(id, deferred.promise, deferStream);
		settleServerAsync(result, () => rerun ? rerun() : result, deferred, (value) => {
			result.s = 1;
			result.v = value;
			comp.value = value;
			comp.error = void 0;
			return value;
		}, (error) => {
			result.s = 2;
			result.v = error;
			comp.error = error;
		}, () => comp.disposed);
		comp.error = new NotReadyError(deferred.promise);
		return;
	}
	if (typeof result?.[Symbol.asyncIterator] === "function") {
		if (ssrSource === "hybrid") {
			let currentResult = result;
			let iter;
			const deferred = createDeferredPromise();
			const runFirst = () => {
				const source = currentResult ?? (rerun ? rerun() : result);
				currentResult = void 0;
				const nextIterator = source?.[Symbol.asyncIterator];
				if (typeof nextIterator !== "function") throw new Error("Expected async iterator while retrying server createMemo");
				iter = nextIterator.call(source);
				return iter.next().then((value) => {
					if (!value.done) closeAsyncIterator(iter);
					return value.value;
				});
			};
			settleServerAsync(runFirst(), runFirst, deferred, (value) => {
				comp.value = value;
				comp.error = void 0;
				return value;
			}, (error) => {
				comp.error = error;
			}, () => comp.disposed);
			if (ctx?.async && ctx.serialize && id && !noHydrate) ctx.serialize(id, deferred.promise, deferStream);
			comp.error = new NotReadyError(deferred.promise);
		} else {
			let currentResult = result;
			let iter;
			let firstResult;
			const deferred = createDeferredPromise();
			const runFirst = () => {
				const source = currentResult ?? (rerun ? rerun() : result);
				currentResult = void 0;
				const nextIterator = source?.[Symbol.asyncIterator];
				if (typeof nextIterator !== "function") throw new Error("Expected async iterator while retrying server createMemo");
				iter = nextIterator.call(source);
				return iter.next().then((value) => {
					firstResult = value;
					return Promise.resolve();
				});
			};
			settleServerAsync(runFirst(), runFirst, deferred, () => {
				const resolved = firstResult;
				if (resolved && !resolved.done) comp.value = resolved.value;
				comp.error = void 0;
			}, (error) => {
				comp.error = error;
			}, () => comp.disposed);
			if (ctx?.async && ctx.serialize && id && !noHydrate) {
				let tappedFirst = true;
				const tapped = { [Symbol.asyncIterator]: () => ({
					next() {
						if (tappedFirst) {
							tappedFirst = false;
							return deferred.promise.then(() => firstResult?.done ? {
								done: true,
								value: void 0
							} : firstResult);
						}
						return iter.next().then((r) => r);
					},
					return(value) {
						return iter.return?.(value);
					}
				}) };
				ctx.serialize(id, tapped, deferStream);
			}
			comp.error = new NotReadyError(deferred.promise);
		}
		return;
	}
	comp.value = result;
}
function closeAsyncIterator(iter, value) {
	const returned = iter.return?.(value);
	if (returned && typeof returned.then === "function") returned.then(void 0, () => {});
}
function serverEffect(compute, effectFn, options) {
	const ssrSource = options?.ssrSource;
	if (ssrSource === "client") {
		createOwner();
		return;
	}
	const ctx = sharedConfig.context;
	const owner = createOwner();
	const comp = {
		owner,
		value: void 0,
		compute,
		error: void 0,
		computed: true,
		disposed: false
	};
	if (ssrSource) runWithOwner(owner, () => onCleanup(() => {
		comp.disposed = true;
	}));
	try {
		const result = runWithOwner(owner, () => runWithObserver(comp, () => compute(void 0)));
		if (ssrSource) processResult(comp, result, owner, ctx, options?.deferStream, ssrSource);
		effectFn?.(ssrSource ? comp.value ?? result : result, void 0);
	} catch (err) {}
}
function createEffect(compute, effect, options) {
	serverEffect(compute, void 0, options);
}
function createRenderEffect(compute, effectFn, options) {
	serverEffect(compute, effectFn, options);
}
function proxySource(read) {
	return new Proxy({}, {
		get(_, property, receiver) {
			if (property === $PROXY) return receiver;
			return (read() || {})[property];
		},
		has(_, property) {
			if (property === $PROXY) return true;
			return property in (read() || {});
		},
		ownKeys() {
			return Object.keys(read() || {});
		},
		getOwnPropertyDescriptor(_, property) {
			return {
				configurable: true,
				enumerable: true,
				get() {
					return (read() || {})[property];
				}
			};
		}
	});
}
function merge(...sources) {
	for (let i = 0; i < sources.length; i++) if (typeof sources[i] === "function") sources[i] = proxySource(createMemo(sources[i]));
	return merge$1(...sources);
}
function mapArray(list, mapFn, options = {}) {
	const indexes = mapFn.length > 1;
	const parent = currentOwner;
	const read = createMemo(() => {
		const items = list();
		const s = [];
		if (items && items.length) {
			const parent = currentOwner;
			const origId = parent.id;
			const origChildCount = parent._childCount;
			try {
				for (let i = 0, len = items.length; i < len; i++) {
					if (origId !== void 0) parent.id = formatChildId(origId, origChildCount + i);
					parent._childCount = 0;
					s.push(options.keyed === false ? indexes ? mapFn(() => items[i], i) : mapFn(() => items[i]) : typeof options.keyed === "function" ? indexes ? mapFn(() => items[i], () => i) : mapFn(() => items[i]) : indexes ? mapFn(items[i], () => i) : mapFn(items[i]));
				}
			} finally {
				parent.id = origId;
				parent._childCount = origChildCount + items.length;
			}
		} else if (options.fallback) {
			const fo = createOwner();
			s.push(runWithOwner(fo, () => options.fallback()));
		}
		return s;
	}, { sync: true });
	consumeClientComputedSlot(parent);
	return read;
}
var ErrorContext = {
	id: Symbol("ErrorContext"),
	defaultValue: null
};
function runWithBoundaryErrorContext(owner, render, onError, context, boundaryId) {
	const prevCtx = sharedConfig.context;
	const prevBoundary = context?._currentBoundaryId;
	if (context) {
		sharedConfig.context = context;
		if (boundaryId !== void 0) context._currentBoundaryId = boundaryId;
	}
	try {
		return runWithOwner(owner, () => {
			const parentHandler = getContext(ErrorContext);
			setContext(ErrorContext, (err) => onError(err, parentHandler));
			return render();
		});
	} finally {
		if (context) {
			if (boundaryId !== void 0) context._currentBoundaryId = prevBoundary;
			sharedConfig.context = prevCtx;
		}
	}
}
function createErrorBoundary(fn, fallback) {
	const ctx = sharedConfig.context;
	const parent = getOwner();
	const owner = createOwner();
	const resolve = () => {
		const resolved = ctx.resolve(runWithOwner(createOwner(), fn));
		if (resolved?.p?.length) throw new NotReadyError(Promise.all(resolved.p));
		return resolved;
	};
	const renderFallback = (err) => ctx ? runWithOwner(parent, () => {
		return runWithOwner(createOwner(), () => fallback(() => err, () => {}));
	}) : fallback(() => err, () => {});
	const serializeError = (err) => {
		if (ctx && owner.id && !runWithOwner(owner, () => getContext(NoHydrateContext))) ctx.serialize(owner.id, err);
	};
	const handleError = (err) => {
		serializeError(err);
		return renderFallback(err);
	};
	return () => {
		let result;
		let handled = false;
		if (ctx) disposeOwner(owner, false);
		try {
			result = ctx ? runWithBoundaryErrorContext(owner, resolve, (err) => {
				if (err instanceof NotReadyError) throw err;
				handled = true;
				result = handleError(err);
				throw err;
			}) : runWithOwner(owner, fn);
		} catch (err) {
			if (err instanceof NotReadyError) throw err;
			result = handled ? result : handleError(err);
		}
		return result;
	};
}
function createLoadingBoundary$1(fn, fallback, options) {
	try {
		const result = fn();
		return () => result;
	} catch (err) {
		if (err instanceof NotReadyError) return () => fallback();
		throw err;
	}
}
function untrack(fn) {
	return fn();
}
function flush() {}
function onSettled(callback) {
	const o = getOwner();
	if (o?.id != null) getNextChildId(o);
}
function createContext(defaultValue, options) {
	const id = Symbol(options && options.name || "");
	function provider(props) {
		return createRoot(() => {
			setContext(provider, props.value);
			return children(() => props.children);
		});
	}
	provider.id = id;
	provider.defaultValue = defaultValue;
	return provider;
}
function useContext(context) {
	return getContext(context);
}
function children(fn) {
	const c = createMemo(fn, { lazy: true });
	const memo = createMemo(() => flatten(c()), {
		lazy: true,
		sync: true
	});
	memo.toArray = () => {
		const v = memo();
		return Array.isArray(v) ? v : v != null ? [v] : [];
	};
	return memo;
}
function createComponent(Comp, props) {
	return Comp(props || {});
}
function createUniqueId() {
	const o = getOwner();
	if (!o) throw new Error(`createUniqueId cannot be used outside of a reactive context`);
	return getNextChildId(o);
}
var RevealGroupContext = {
	id: Symbol("RevealGroupContext"),
	defaultValue: null
};
function ssrHandleError(err) {
	if (err instanceof NotReadyError) return err.source;
	const handler = getContext(ErrorContext);
	if (handler) {
		handler(err);
		return;
	}
	throw err;
}
function createLoadingBoundary(fn, fallback, options) {
	const currentCtx = sharedConfig.context;
	if (!currentCtx) return createLoadingBoundary$1(fn, fallback);
	const ctx = currentCtx;
	const parent = getOwner();
	const parentHandler = parent && runWithOwner(parent, () => getContext(ErrorContext));
	const revealGroup = parent && runWithOwner(parent, () => getContext(RevealGroupContext));
	const o = createOwner();
	const id = o.id;
	o.id = id + "00";
	let done;
	let handledRenderError;
	let retryPromise;
	let serializeBuffer = [];
	const bufferedCtx = Object.create(ctx);
	bufferedCtx.serialize = (id, value, deferStream) => {
		serializeBuffer.push([
			id,
			value,
			deferStream
		]);
	};
	bufferedCtx._currentBoundaryId = id;
	function flushSerializeBuffer() {
		for (const args of serializeBuffer) ctx.serialize(args[0], args[1], args[2]);
		serializeBuffer = [];
	}
	function commitBoundaryState() {
		flushSerializeBuffer();
		const modules = ctx.getBoundaryModules?.(id);
		if (modules) ctx.serialize(id + "_assets", modules);
	}
	function runLoadingPhase(render) {
		handledRenderError = void 0;
		return runWithBoundaryErrorContext(o, render, (err, parentHandler) => {
			handledRenderError = err;
			if (done?.(void 0, err)) throw err;
			if (parentHandler) {
				parentHandler(err);
				return;
			}
			throw err;
		}, bufferedCtx, id);
	}
	function finalizeError(err) {
		if (handledRenderError === err) {
			handledRenderError = void 0;
			return;
		}
		if (done?.(void 0, err)) return;
		if (!parentHandler) throw err;
		try {
			runWithOwner(parent, () => parentHandler(err));
		} catch (caught) {
			if (caught !== err) throw caught;
		}
	}
	function runDiscovery() {
		disposeOwner(o, false);
		serializeBuffer = [];
		retryPromise = void 0;
		return runLoadingPhase(() => {
			try {
				return ctx.resolve(fn());
			} catch (err) {
				if (err instanceof NotReadyError) {
					retryPromise = err.source;
					return;
				}
				throw err;
			}
		});
	}
	let ret = runDiscovery();
	if (!retryPromise && !ret?.p?.length) {
		commitBoundaryState();
		return () => ret;
	}
	const collapseFallback = (revealGroup ? revealGroup.register(id) : null)?.collapseFallback ?? false;
	if (collapseFallback && !ctx.async) {
		commitBoundaryState();
		ctx.serialize(id, "$$f");
		return () => void 0;
	}
	const fallbackResult = runWithOwner(createOwner({ id }), () => {
		if (!ctx.async) return fallback();
		const tpl = collapseFallback ? [`<template id="pl-${id}">`, `</template><!--pl-${id}-->`] : [`<template id="pl-${id}"></template>`, `<!--pl-${id}-->`];
		return ctx.ssr(tpl, ctx.escape(fallback()));
	});
	if (ctx.async) {
		const regOpts = revealGroup ? { revealGroup: revealGroup.id } : void 0;
		done = ctx.registerFragment(id, regOpts);
		(async () => {
			try {
				while (retryPromise) {
					await retryPromise.catch(() => {});
					ret = runDiscovery();
				}
				commitBoundaryState();
				while (ret && ret.p && ret.p.length) {
					const pending = ret;
					await Promise.all(pending.p).catch(() => {});
					ret = runLoadingPhase(() => ctx.ssr(pending.t, ...pending.h));
				}
				flushSerializeBuffer();
				done(ret && Array.isArray(ret.t) ? ret.t[0] : ret && ret.t);
				if (revealGroup) revealGroup.onResolved(id);
			} catch (err) {
				finalizeError(err);
			}
		})();
		return () => fallbackResult;
	}
	commitBoundaryState();
	ctx.serialize(id, "$$f");
	return () => fallbackResult;
}
function NoHydration(props) {
	return runWithOwner(createOwner(), () => {
		setContext(NoHydrateContext, true);
		return props.children;
	});
}
function For(props) {
	const options = "fallback" in props ? {
		keyed: props.keyed,
		fallback: () => props.fallback
	} : { keyed: props.keyed };
	return mapArray(() => props.each, props.children, options);
}
function Show(props) {
	const o = getOwner();
	if (o?.id != null) {
		getNextChildId(o);
		if (!props.keyed) getNextChildId(o);
	}
	return createMemo(() => {
		const when = props.when;
		if (when) {
			const child = props.children;
			if (typeof child === "function" && child.length > 0) return props.keyed ? child(when) : child(() => when);
			return child;
		}
		return props.fallback;
	}, { sync: true });
}
function Switch(props) {
	const chs = children(() => props.children);
	const o = getOwner();
	if (o?.id != null) getNextChildId(o);
	return createMemo(() => {
		let conds = chs();
		if (!Array.isArray(conds)) conds = [conds];
		for (let i = 0; i < conds.length; i++) {
			const w = conds[i].when;
			if (w) {
				const c = conds[i].children;
				return typeof c === "function" && c.length > 0 ? conds[i].keyed ? c(w) : c(() => w) : c;
			}
		}
		return props.fallback;
	}, { sync: true });
}
function Match(props) {
	return props;
}
function Errored(props) {
	return createErrorBoundary(() => props.children, (err, reset) => {
		const f = props.fallback;
		return typeof f === "function" && f.length ? f(err, reset) : f;
	});
}
function Loading(props) {
	return createLoadingBoundary(() => props.children, () => props.fallback);
}
//#endregion
//#region node_modules/.pnpm/@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14/node_modules/@solidjs/web/dist/server.js
var ChildProperties = /* @__PURE__ */ new Set([
	"innerHTML",
	"textContent",
	"innerText",
	"children"
]);
var syncOptions = { sync: true };
var memo = (fn) => createMemo(() => fn(), syncOptions);
var ES2017FLAG = M.AggregateError | M.BigIntTypedArray;
var GLOBAL_IDENTIFIER = "_$HY.r";
function createSerializer({ onData, onDone, scopeId, onError, plugins: customPlugins }) {
	const defaultPlugins = [
		O,
		L,
		q,
		Y,
		K,
		l,
		p,
		te,
		ne,
		fe,
		pe
	];
	return new mr({
		scopeId,
		plugins: customPlugins ? [...customPlugins, ...defaultPlugins] : defaultPlugins,
		globalIdentifier: GLOBAL_IDENTIFIER,
		disabledFeatures: ES2017FLAG,
		onData,
		onDone,
		onError
	});
}
function getLocalHeaderScript(id) {
	return dn(id) + ";";
}
function resolveAssets(moduleUrl, manifest) {
	if (!manifest) return null;
	const base = manifest._base || "/";
	if (!manifest[moduleUrl]) return null;
	const css = [];
	const js = [];
	const visited = /* @__PURE__ */ new Set();
	const walk = (key) => {
		if (visited.has(key)) return;
		visited.add(key);
		const e = manifest[key];
		if (!e) return;
		js.push(base + e.file);
		if (e.css) for (let i = 0; i < e.css.length; i++) css.push(base + e.css[i]);
		if (e.imports) for (let i = 0; i < e.imports.length; i++) walk(e.imports[i]);
	};
	walk(moduleUrl);
	return {
		js,
		css
	};
}
function registerEntryAssets(manifest) {
	if (!manifest) return;
	const ctx = sharedConfig.context;
	if (!ctx?.registerAsset) return;
	for (const key in manifest) if (manifest[key].isEntry) {
		const assets = resolveAssets(key, manifest);
		if (assets) for (let i = 0; i < assets.css.length; i++) ctx.registerAsset("style", assets.css[i]);
		return;
	}
}
function createAssetTracking() {
	const boundaryModules = /* @__PURE__ */ new Map();
	const boundaryStyles = /* @__PURE__ */ new Map();
	const emittedAssets = /* @__PURE__ */ new Set();
	let currentBoundaryId = null;
	return {
		boundaryModules,
		boundaryStyles,
		emittedAssets,
		get currentBoundaryId() {
			return currentBoundaryId;
		},
		set currentBoundaryId(v) {
			currentBoundaryId = v;
		},
		registerModule(moduleUrl, entryUrl) {
			const id = currentBoundaryId || "";
			let map = boundaryModules.get(id);
			if (!map) {
				map = {};
				boundaryModules.set(id, map);
			}
			map[moduleUrl] = entryUrl;
		},
		getBoundaryModules(id) {
			return boundaryModules.get(id) || null;
		},
		getBoundaryStyles(id) {
			return boundaryStyles.get(id) || null;
		}
	};
}
function applyAssetTracking(context, tracking, manifest) {
	Object.defineProperty(context, "_currentBoundaryId", {
		get() {
			return tracking.currentBoundaryId;
		},
		set(v) {
			tracking.currentBoundaryId = v;
		},
		configurable: true,
		enumerable: true
	});
	context.registerModule = tracking.registerModule;
	context.getBoundaryModules = tracking.getBoundaryModules;
	if (manifest) context.resolveAssets = (moduleUrl) => resolveAssets(moduleUrl, manifest);
}
var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
var REPLACE_SCRIPT = `function $df(e,n,o,t){if(!(n=document.getElementById(e))||!(o=document.getElementById("pl-"+e)))return 0;for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)t=o.nextSibling,o.remove(),o=t;_$HY.done?o.remove():o.replaceWith(n.content),n.remove(),_$HY.fe(e);return 1}function $dfl(e,o,n){if(!(o=document.getElementById("pl-"+e)))return 0;if(o._$fl)return 1;for(n=o.nextSibling;n;){if(8===n.nodeType&&n.nodeValue==="pl-"+e){o.parentNode&&o.parentNode.insertBefore(o.content.cloneNode(!0),n),o._$fl=1;return 1}n=n.nextSibling}return 0}function $dflj(e,i){for(i=0;i<e.length;i++)$dfl(e[i])}function $dfs(e,c,d){(_$HY.sc=_$HY.sc||{})[e]=c,d&&((_$HY.sd=_$HY.sd||{})[e]=1)}function $dfg(e,g,i,k){if(!(g=_$HY.sg&&_$HY.sg[e]))return;for(i=0;i<g.length;i++)if(_$HY.sc&&_$HY.sc[g[i]]>0)return;for(i=0;i<g.length;i++)k=g[i],delete _$HY.sg[k],$df(k)}function $dfc(e){if(--_$HY.sc[e]<=0){delete _$HY.sc[e],_$HY.sg&&_$HY.sg[e]?$dfg(e):!(_$HY.sd&&_$HY.sd[e])&&$df(e);_$HY.sd&&delete _$HY.sd[e]}}function $dfj(e,i,n){for(i=0;i<e.length;i++)if(_$HY.sc&&_$HY.sc[e[i]]>0){for(n=0;n<e.length;n++)(_$HY.sg=_$HY.sg||{})[e[n]]=e;return}for(i=0;i<e.length;i++)$df(e[i])}`;
function renderToStream(code, options = {}) {
	let { nonce, onCompleteShell, onCompleteAll, renderId = "", noScripts, manifest } = options;
	let dispose;
	const blockingPromises = /* @__PURE__ */ new Set();
	let headerEmitted = false;
	const pushTask = (task) => {
		if (noScripts) return;
		if (!headerEmitted) {
			headerEmitted = true;
			tasks += getLocalHeaderScript(renderId);
		}
		tasks += task + ";";
		if (!timer && firstFlushed) timer = setTimeout(writeTasks);
	};
	const onDone = () => {
		writeTasks();
		doShell();
		onCompleteAll && onCompleteAll({ write(v) {
			!completed && buffer.write(v);
		} });
		writable && writable.end();
		completed = true;
		if (firstFlushed) dispose();
	};
	const serializer = createSerializer({
		scopeId: options.renderId,
		plugins: options.plugins,
		onData: pushTask,
		onDone,
		onError: options.onError
	});
	let rootAssetsSerialized = false;
	const serializeRootAssets = () => {
		if (rootAssetsSerialized) return;
		rootAssetsSerialized = true;
		serializeFragmentAssets("", tracking.boundaryModules, context);
	};
	const flushEnd = () => {
		if (!registry.size) {
			serializeRootAssets();
			queue(() => queue(() => serializer.flush()));
		}
	};
	const registry = /* @__PURE__ */ new Map();
	const writeTasks = () => {
		if (tasks.length && !completed && firstFlushed) {
			buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}<\/script>`);
			tasks = "";
		}
		timer && clearTimeout(timer);
		timer = null;
	};
	let context;
	let writable;
	let tmp = "";
	let tasks = "";
	let firstFlushed = false;
	let completed = false;
	let shellCompleted = false;
	let scriptFlushed = false;
	let headStyles;
	const revealGroups = /* @__PURE__ */ new Map();
	let timer = null;
	const emitTask = (task) => {
		pushTask(`${task}${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
		scriptFlushed = true;
	};
	function resolveRevealKeys(groupOrKeys, release, consume) {
		if (Array.isArray(groupOrKeys)) return groupOrKeys.slice();
		let group = revealGroups.get(groupOrKeys);
		if (!group) {
			if (!release) return;
			group = {
				order: [],
				keys: /* @__PURE__ */ new Set(),
				released: true
			};
			revealGroups.set(groupOrKeys, group);
		} else if (release) group.released = true;
		if (!group.order.length) return;
		const keys = group.order.slice();
		if (consume) revealGroups.delete(groupOrKeys);
		return keys;
	}
	let rootHoles = null;
	let nextHoleId = 0;
	let buffer = { write(payload) {
		tmp += payload;
	} };
	const tracking = createAssetTracking();
	sharedConfig.context = context = {
		async: true,
		assets: [],
		nonce,
		registerAsset(type, url) {
			if (tracking.currentBoundaryId && type === "style") {
				let styles = tracking.boundaryStyles.get(tracking.currentBoundaryId);
				if (!styles) {
					styles = /* @__PURE__ */ new Set();
					tracking.boundaryStyles.set(tracking.currentBoundaryId, styles);
				}
				styles.add(url);
			}
			if (!tracking.emittedAssets.has(url)) {
				tracking.emittedAssets.add(url);
				if (firstFlushed && type === "module") buffer.write(`<link rel="modulepreload" href="${url}">`);
			}
		},
		block(p) {
			if (!firstFlushed) blockingPromises.add(p);
		},
		replace(id, payloadFn) {
			if (firstFlushed) return;
			const placeholder = `<!--!$${id}-->`;
			const first = html.indexOf(placeholder);
			if (first === -1) return;
			const last = html.indexOf(`<!--!$/${id}-->`, first + placeholder.length);
			html = html.slice(0, first) + resolveSSRSync(escape(payloadFn())) + html.slice(last + placeholder.length + 1);
		},
		serialize(id, p, deferStream) {
			if (sharedConfig.context.noHydrate) return;
			if (!firstFlushed && deferStream && typeof p === "object" && "then" in p) {
				blockingPromises.add(p);
				p.then((d) => serializer.write(id, d)).catch((e) => serializer.write(id, e));
			} else serializer.write(id, p);
		},
		escape,
		resolve: resolveSSRNode,
		ssr,
		registerFragment(key, options) {
			const revealGroup = options && options.revealGroup;
			if (revealGroup) {
				let group = revealGroups.get(revealGroup);
				if (!group) {
					group = {
						order: [],
						keys: /* @__PURE__ */ new Set(),
						released: false
					};
					revealGroups.set(revealGroup, group);
				}
				if (!group.keys.has(key)) {
					group.keys.add(key);
					group.order.push(key);
				}
				if (group.released) throw new Error("registerFragment() for reveal group '" + revealGroup + "' was called after revealFragments(). Ensure template payload is emitted before grouped reveal.");
			}
			if (!registry.has(key)) {
				let resolve, reject;
				const p = new Promise((r, rej) => (resolve = r, reject = rej));
				registry.set(key, { resolve: (err) => queue(() => queue(() => {
					err ? reject(err) : resolve(true);
					queue(flushEnd);
				})) });
				serializer.write(key + "_fr", p);
			}
			return (value, error) => {
				if (registry.has(key)) {
					const item = registry.get(key);
					registry.delete(key);
					if (item.children) for (const k in item.children) value = replacePlaceholder(value, k, item.children[k]);
					const parentKey = waitForFragments(registry, key);
					if (parentKey) {
						const parent = registry.get(parentKey);
						parent.children ||= {};
						parent.children[key] = value !== void 0 ? value : "";
						serializeFragmentAssets(key, tracking.boundaryModules, context);
						propagateBoundaryStyles(key, parentKey, tracking);
						item.resolve();
						return;
					}
					if (!completed) if (!firstFlushed) {
						queue(() => html = replacePlaceholder(html, key, value !== void 0 ? value : ""));
						serializeFragmentAssets(key, tracking.boundaryModules, context);
						item.resolve(error);
					} else {
						serializeFragmentAssets(key, tracking.boundaryModules, context);
						const styles = collectStreamStyles(key, tracking, headStyles);
						const deferActivation = !!revealGroup;
						if (styles.length) {
							emitTask(`$dfs("${key}",${styles.length},${deferActivation ? 1 : 0})`);
							writeTasks();
							for (const url of styles) buffer.write(`<link rel="stylesheet" href="${url}" onload="$dfc('${key}')" onerror="$dfc('${key}')">`);
							buffer.write(`<template id="${key}">${value !== void 0 ? value : " "}</template>`);
						} else {
							buffer.write(`<template id="${key}">${value !== void 0 ? value : " "}</template>`);
							if (!deferActivation) emitTask(`$df("${key}")`);
						}
						item.resolve(error);
					}
				}
				return firstFlushed;
			};
		},
		revealFragments(groupOrKeys) {
			const keys = resolveRevealKeys(groupOrKeys, true, true);
			if (!keys) return;
			emitTask(`$dfj(${JSON.stringify(keys)})`);
		},
		revealFallbacks(groupOrKeys) {
			const keys = resolveRevealKeys(groupOrKeys, false, false);
			if (!keys) return;
			emitTask(`$dflj(${JSON.stringify(keys)})`);
		}
	};
	applyAssetTracking(context, tracking, manifest);
	registerEntryAssets(manifest);
	let html = createRoot((d) => {
		dispose = d;
		const res = resolveSSRNode(escape(code()));
		if (!res.h.length) return res.t[0];
		rootHoles = [];
		let out = res.t[0];
		for (let i = 0; i < res.h.length; i++) {
			const id = nextHoleId++;
			rootHoles.push({
				id,
				fn: res.h[i]
			});
			out += `<!--rh${id}-->` + res.t[i + 1];
		}
		for (const p of res.p) blockingPromises.add(p);
		return out;
	}, { id: renderId });
	function doShell() {
		if (shellCompleted) return;
		if (rootHoles) {
			const pending = [];
			for (const { id, fn } of rootHoles) {
				const marker = `<!--rh${id}-->`;
				const res = resolveSSRNode(fn);
				if (!res.h.length) html = html.replace(marker, res.t[0]);
				else {
					let out = res.t[0];
					for (let j = 0; j < res.h.length; j++) {
						const newId = nextHoleId++;
						pending.push({
							id: newId,
							fn: res.h[j]
						});
						out += `<!--rh${newId}-->` + res.t[j + 1];
					}
					html = html.replace(marker, out);
					for (const p of res.p) blockingPromises.add(p);
				}
			}
			if (pending.length) {
				rootHoles = pending;
				return;
			}
			rootHoles = null;
		}
		sharedConfig.context = context;
		html = injectAssets(context.assets, html);
		headStyles = /* @__PURE__ */ new Set();
		for (const url of tracking.emittedAssets) if (url.endsWith(".css")) headStyles.add(url);
		html = injectPreloadLinks(tracking.emittedAssets, html);
		serializeRootAssets();
		if (tasks.length) html = injectScripts(html, tasks, nonce);
		buffer.write(html);
		tasks = "";
		onCompleteShell && onCompleteShell({ write(v) {
			!completed && buffer.write(v);
		} });
		shellCompleted = true;
	}
	return {
		then(fn) {
			function complete() {
				dispose();
				fn(tmp);
			}
			if (onCompleteAll) {
				let ogComplete = onCompleteAll;
				onCompleteAll = (options) => {
					ogComplete(options);
					complete();
				};
			} else onCompleteAll = complete;
			queue(flushEnd);
		},
		pipe(w) {
			function flush() {
				allSettled(blockingPromises).then(() => {
					setTimeout(() => {
						doShell();
						if (!shellCompleted) return flush();
						buffer = writable = w;
						buffer.write(tmp);
						firstFlushed = true;
						if (completed) {
							dispose();
							writable.end();
						} else flushEnd();
					});
				});
			}
			flush();
		},
		pipeTo(w) {
			let resolve;
			const p = new Promise((r) => resolve = r);
			function flush() {
				allSettled(blockingPromises).then(() => {
					setTimeout(() => {
						doShell();
						if (!shellCompleted) return flush();
						const encoder = new TextEncoder();
						const writer = w.getWriter();
						writable = { end() {
							writer.releaseLock();
							w.close().catch(() => {});
							resolve();
						} };
						buffer = { write(payload) {
							writer.write(encoder.encode(payload)).catch(() => {});
						} };
						buffer.write(tmp);
						firstFlushed = true;
						if (completed) {
							dispose();
							writable.end();
						} else flushEnd();
					});
				});
			}
			flush();
			return p;
		}
	};
}
function HydrationScript(props) {
	const { nonce } = sharedConfig.context;
	return ssr(generateHydrationScript({
		nonce,
		...props
	}));
}
function ssrGroup(fn, n) {
	fn.$g = n;
	return fn;
}
function buildAsyncWrap(err, node) {
	const p = ssrHandleError(err);
	if (!p) return null;
	const owner = getOwner();
	return {
		fn: owner ? () => runWithOwner(owner, node) : node,
		p
	};
}
function ssrFirstGroupHit(hole) {
	try {
		return hole();
	} catch (err) {
		return buildAsyncWrap(err, hole);
	}
}
function tryResolveFunctionHole(hole) {
	let value;
	try {
		value = hole();
	} catch (err) {
		return buildAsyncWrap(err, hole) || "";
	}
	const t = typeof value;
	if (t === "string") return value;
	if (t === "number") return "" + value;
	if (value == null || t === "boolean") return "";
	return tryResolveString(value);
}
function mergeTemplateInto(result, node) {
	result.t[result.t.length - 1] += node.t[0];
	if (node.t.length > 1) {
		result.t.push(...node.t.slice(1));
		result.h.push(...node.h);
		result.p.push(...node.p);
	}
}
function appendResolvedNode(result, node) {
	if (node.fn !== void 0) {
		result.h.push(node.fn);
		result.p.push(node.p);
		result.t.push("");
	} else if (node.merge !== void 0) mergeTemplateInto(result, node.merge);
	else resolveSSRNode(node.bail, result);
}
var _lastGroupFn = null;
var _lastGroupArr = null;
var _lastGroupErr = null;
function ssrGroupSlot(fn, idx) {
	return () => {
		if (idx > 0 && _lastGroupFn === fn) {
			if (_lastGroupArr !== null) return _lastGroupArr[idx];
			throw _lastGroupErr;
		}
		_lastGroupFn = fn;
		_lastGroupArr = null;
		_lastGroupErr = null;
		try {
			_lastGroupArr = fn();
			return _lastGroupArr[idx];
		} catch (err) {
			_lastGroupErr = err;
			throw err;
		}
	};
}
function ssr(t) {
	const len = arguments.length;
	if (len === 1) return { t };
	let s = t[0];
	let result = null;
	let lastGroup = null;
	let lastGroupVal = null;
	let lastGroupIdx = 0;
	for (let i = 1; i < len; i++) {
		const hole = arguments[i];
		const ht = typeof hole;
		if (ht === "string") if (result === null) s += hole;
		else result.t[result.t.length - 1] += hole;
		else if (ht === "number") if (result === null) s += hole;
		else result.t[result.t.length - 1] += hole;
		else if (hole == null || ht === "boolean");
		else if (ht === "function" && hole.$g) {
			let value;
			let hasValue = false;
			if (lastGroup !== hole) {
				const r = ssrFirstGroupHit(hole);
				if (r !== null) {
					lastGroup = hole;
					lastGroupVal = r;
					lastGroupIdx = 0;
					if (!Array.isArray(r) && result === null) {
						result = {
							t: [s],
							h: [],
							p: []
						};
						s = "";
					}
				}
			}
			if (lastGroup === hole) if (Array.isArray(lastGroupVal)) {
				value = lastGroupVal[lastGroupIdx++];
				hasValue = true;
			} else {
				result.h.push(ssrGroupSlot(lastGroupVal.fn, lastGroupIdx++));
				result.p.push(lastGroupVal.p);
				result.t.push("");
			}
			if (hasValue) {
				const vt = typeof value;
				if (vt === "string" || vt === "number") if (result === null) s += value;
				else result.t[result.t.length - 1] += value;
				else if (value == null || vt === "boolean");
				else if (result !== null) resolveSSRNode(value, result);
				else {
					const rs = tryResolveString(value);
					if (typeof rs === "string") s += rs;
					else {
						result = {
							t: [s],
							h: [],
							p: []
						};
						s = "";
						if (rs.merge !== void 0) mergeTemplateInto(result, rs.merge);
						else resolveSSRNode(rs.bail, result);
					}
				}
			}
		} else if (result !== null) resolveSSRNode(hole, result);
		else if (ht === "function") {
			const r = tryResolveFunctionHole(hole);
			if (typeof r === "string") s += r;
			else {
				result = {
					t: [s],
					h: [],
					p: []
				};
				s = "";
				appendResolvedNode(result, r);
			}
		} else {
			const r = tryResolveString(hole);
			if (typeof r === "string") s += r;
			else {
				result = {
					t: [s],
					h: [],
					p: []
				};
				s = "";
				appendResolvedNode(result, r);
			}
		}
		const next = t[i];
		if (result === null) s += next;
		else result.t[result.t.length - 1] += next;
	}
	if (result === null) return { t: s };
	return result;
}
function ssrClassName(value) {
	if (!value) return "";
	if (typeof value === "string") return escape(value, true);
	value = classListToObject(value);
	let classKeys = Object.keys(value), result = "";
	for (let i = 0, len = classKeys.length; i < len; i++) {
		const key = classKeys[i], classValue = !!value[key];
		if (!key || key === "undefined" || !classValue) continue;
		i && (result += " ");
		result += escape(key, true);
	}
	return result;
}
function ssrStyle(value) {
	if (!value) return "";
	if (typeof value === "string") return escape(value, true);
	let result = "";
	const k = Object.keys(value);
	for (let i = 0; i < k.length; i++) {
		const s = escape(k[i], true);
		const v = value[k[i]];
		if (v != void 0) {
			if (i) result += ";";
			const r = escape(v, true);
			if (r != void 0 && r !== "undefined") result += `${s}:${r}`;
		}
	}
	return result;
}
function ssrStyleProperty(name, value) {
	return value != null ? name + value : "";
}
function ssrElement(tag, props, children, needsId) {
	if (props == null) props = {};
	else if (typeof props === "function") props = props();
	const skipChildren = VOID_ELEMENTS.test(tag);
	const keys = Object.keys(props);
	let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
	for (let i = 0; i < keys.length; i++) {
		const prop = keys[i];
		if (ChildProperties.has(prop)) {
			if (children === void 0 && !skipChildren) children = tag === "script" || tag === "style" || prop === "innerHTML" ? props[prop] : escape(props[prop]);
			continue;
		}
		const value = props[prop];
		if (prop === "style") result += `style="${ssrStyle(value)}"`;
		else if (prop === "class") result += `class="${ssrClassName(value)}"`;
		else if (value == void 0 || prop === "ref" || prop.slice(0, 2) === "on" || prop.slice(0, 5) === "prop:") continue;
		else if (typeof value === "boolean") {
			if (!value) continue;
			result += escape(prop);
		} else result += value === "" ? escape(prop) : `${escape(prop)}="${escape(value, true)}"`;
		if (i !== keys.length - 1) result += " ";
	}
	if (skipChildren) return { t: result + "/>" };
	if (typeof children === "function") children = children();
	return ssr([result + ">", `</${tag}>`], resolveSSRNode(children, void 0, true));
}
function ssrAttribute(key, value) {
	return value == null || value === false ? "" : value === true ? ` ${key}` : ` ${key}="${value}"`;
}
function ssrHydrationKey() {
	const hk = getHydrationKey();
	return hk ? ` _hk=${hk}` : "";
}
function escape(s, attr) {
	const t = typeof s;
	if (t !== "string") {
		if (!attr && Array.isArray(s)) {
			const joined = tryJoinPlainSSRArray(s);
			if (joined !== void 0) return joined;
			s = s.slice();
			for (let i = 0; i < s.length; i++) s[i] = escape(s[i]);
			return s;
		}
		if (attr && t === "boolean") return s;
		return s;
	}
	const delimCode = attr ? 34 : 60;
	const len = s.length;
	for (let i = 0; i < len; i++) {
		const c = s.charCodeAt(i);
		if (c === 38 || c === delimCode) return escapeSlow(s, attr, i);
	}
	return s;
}
function escapeSlow(s, attr, start) {
	const delim = attr ? "\"" : "<";
	const delimCode = attr ? 34 : 60;
	const escDelim = attr ? "&quot;" : "&lt;";
	const c0 = s.charCodeAt(start);
	let iDelim = c0 === delimCode ? start : s.indexOf(delim, start);
	let iAmp = c0 === 38 ? start : s.indexOf("&", start);
	let left = 0, out = "";
	while (iDelim >= 0 && iAmp >= 0) if (iDelim < iAmp) {
		if (left < iDelim) out += s.substring(left, iDelim);
		out += escDelim;
		left = iDelim + 1;
		iDelim = s.indexOf(delim, left);
	} else {
		if (left < iAmp) out += s.substring(left, iAmp);
		out += "&amp;";
		left = iAmp + 1;
		iAmp = s.indexOf("&", left);
	}
	if (iDelim >= 0) do {
		if (left < iDelim) out += s.substring(left, iDelim);
		out += escDelim;
		left = iDelim + 1;
		iDelim = s.indexOf(delim, left);
	} while (iDelim >= 0);
	else while (iAmp >= 0) {
		if (left < iAmp) out += s.substring(left, iAmp);
		out += "&amp;";
		left = iAmp + 1;
		iAmp = s.indexOf("&", left);
	}
	return left < s.length ? out + s.substring(left) : out;
}
function tryJoinPlainSSRArray(nodes) {
	if (nodes.length === 0) return void 0;
	let out = "";
	for (let i = 0, len = nodes.length; i < len; i++) {
		const node = nodes[i];
		if (node == null || typeof node !== "object" || node.h || typeof node.t !== "string") return;
		out += node.t;
	}
	return out;
}
function mergeProps(...sources) {
	const target = {};
	for (let i = 0; i < sources.length; i++) {
		let source = sources[i];
		if (typeof source === "function") source = source();
		if (source) {
			const descriptors = Object.getOwnPropertyDescriptors(source);
			for (const key in descriptors) {
				if (key in target) continue;
				Object.defineProperty(target, key, {
					enumerable: true,
					get() {
						for (let i = sources.length - 1; i >= 0; i--) {
							const v = (sources[i] || {})[key];
							if (v !== void 0) return v;
						}
					}
				});
			}
		}
	}
	return target;
}
function getHydrationKey() {
	return sharedConfig.context && sharedConfig.getNextContextId();
}
function generateHydrationScript({ eventNames = ["click", "input"], nonce } = {}) {
	return `<script${nonce ? ` nonce="${nonce}"` : ""}>window._$HY||(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("_hk")?e:t(e.host&&e.host.nodeType?e.host:e.parentNode));["${eventNames.join("\",\"")}"].forEach((o=>document.addEventListener(o,(o=>{if(!e.events)return;let s=t(o.composedPath&&o.composedPath()[0]||o.target);s&&!e.completed.has(s)&&e.events.push([s,o])}))))})(_$HY={events:[],completed:new WeakSet,r:{},fe(){}});<\/script><!--xs-->`;
}
function queue(fn) {
	return Promise.resolve().then(fn);
}
function allSettled(promises) {
	let size = promises.size;
	return Promise.allSettled(promises).then(() => {
		if (promises.size !== size) return allSettled(promises);
	});
}
function injectAssets(assets, html) {
	if (!assets || !assets.length) return html;
	let out = "";
	for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
	const index = html.indexOf("</head>");
	if (index === -1) return html;
	return html.slice(0, index) + out + html.slice(index);
}
function injectPreloadLinks(emittedAssets, html, nonce) {
	if (!emittedAssets.size) return html;
	let links = "";
	for (const url of emittedAssets) if (url.endsWith(".css")) links += `<link rel="stylesheet" href="${url}">`;
	else links += `<link rel="modulepreload" href="${url}">`;
	const index = html.indexOf("</head>");
	if (index === -1) return html;
	return html.slice(0, index) + links + html.slice(index);
}
function serializeFragmentAssets(key, boundaryModules, context) {
	const map = boundaryModules.get(key);
	if (!map || !Object.keys(map).length) return;
	context.serialize(key + "_assets", map);
}
function propagateBoundaryStyles(childKey, parentKey, tracking) {
	const childStyles = tracking.getBoundaryStyles(childKey);
	if (!childStyles) return;
	let parentStyles = tracking.boundaryStyles.get(parentKey);
	if (!parentStyles) {
		parentStyles = /* @__PURE__ */ new Set();
		tracking.boundaryStyles.set(parentKey, parentStyles);
	}
	for (const url of childStyles) parentStyles.add(url);
}
function collectStreamStyles(key, tracking, headStyles) {
	const styles = tracking.getBoundaryStyles(key);
	if (!styles) return [];
	const result = [];
	for (const url of styles) if (!headStyles || !headStyles.has(url)) result.push(url);
	return result;
}
function injectScripts(html, scripts, nonce) {
	const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}<\/script>`;
	const index = html.indexOf("<!--xs-->");
	if (index > -1) return html.slice(0, index) + tag + html.slice(index);
	return html + tag;
}
function waitForFragments(registry, key) {
	for (const k of [...registry.keys()].reverse()) if (key.startsWith(k)) return k;
	return false;
}
function replacePlaceholder(html, key, value) {
	const marker = `<template id="pl-${key}">`;
	const close = `<!--pl-${key}-->`;
	const first = html.indexOf(marker);
	if (first === -1) return html;
	const last = html.indexOf(close, first + marker.length);
	return html.slice(0, first) + value + html.slice(last + close.length);
}
function classListToObject(classList) {
	if (Array.isArray(classList)) {
		const result = {};
		flattenClassList(classList, result);
		return result;
	}
	return classList;
}
function flattenClassList(list, result) {
	for (let i = 0, len = list.length; i < len; i++) {
		const item = list[i];
		if (Array.isArray(item)) flattenClassList(item, result);
		else if (typeof item === "object" && item != null) Object.assign(result, item);
		else if (item || item === 0) result[item] = true;
	}
}
function tryResolveString(node) {
	const t = typeof node;
	if (t === "string") return node;
	if (t === "number") return "" + node;
	if (node == null || t === "boolean") return "";
	if (t === "object") {
		if (Array.isArray(node)) {
			const joined = tryJoinPlainSSRArray(node);
			if (joined !== void 0) return joined;
			let s = "";
			let prevNonObj = false;
			for (let i = 0, len = node.length; i < len; i++) {
				const item = node[i];
				const itemNonObj = item !== null && typeof item !== "object";
				if (prevNonObj && itemNonObj) s += "<!--!$-->";
				prevNonObj = itemNonObj;
				const r = tryResolveString(item);
				if (typeof r !== "string") return { bail: node };
				s += r;
			}
			return s;
		}
		if (node.h && node.h.length > 0) return { merge: node };
		return Array.isArray(node.t) ? node.t[0] : node.t;
	}
	if (t === "function") {
		let v;
		try {
			v = node();
		} catch (err) {
			return buildAsyncWrap(err, node) || "";
		}
		return tryResolveString(v);
	}
	return "";
}
function resolveSSRNode(node, result = {
	t: [""],
	h: [],
	p: []
}, top) {
	const t = typeof node;
	if (t === "string" || t === "number") result.t[result.t.length - 1] += node;
	else if (node == null || t === "boolean");
	else if (Array.isArray(node)) {
		let prevNonObj = false;
		for (let i = 0, len = node.length; i < len; i++) {
			const item = node[i];
			const itemNonObj = item !== null && typeof item !== "object";
			if (!top && prevNonObj && itemNonObj) result.t[result.t.length - 1] += `<!--!$-->`;
			prevNonObj = itemNonObj;
			resolveSSRNode(item, result);
		}
	} else if (t === "object") if (node.h) {
		result.t[result.t.length - 1] += node.t[0];
		if (node.t.length > 1) {
			result.t.push(...node.t.slice(1));
			result.h.push(...node.h);
			result.p.push(...node.p);
		}
	} else result.t[result.t.length - 1] += node.t;
	else if (t === "function") try {
		resolveSSRNode(node(), result);
	} catch (err) {
		const wrap = buildAsyncWrap(err, node);
		if (wrap) {
			result.h.push(wrap.fn);
			result.p.push(wrap.p);
			result.t.push("");
		}
	}
	return result;
}
function resolveSSRSync(node) {
	const res = resolveSSRNode(node);
	if (!res.h.length) return res.t[0];
	throw new Error("This value cannot be rendered synchronously. Are you missing a boundary?");
}
function dynamic(source) {
	const o = getOwner();
	if (o?.id != null) getNextChildId(o);
	return (props) => {
		return runWithOwner(createOwner(), () => {
			const comp = source(), t = typeof comp;
			if (comp) {
				if (t === "function") return comp(props);
				else if (t === "string") return ssrElement(comp, props, void 0, true);
			}
		});
	};
}
function Dynamic(props) {
	return createComponent(dynamic(() => props.component), omit(props, "component"));
}
//#endregion
export { flush as A, Pu as B, createContext as C, createRoot as D, createRenderEffect as E, runWithOwner as F, re as G, ai as H, untrack as I, su as K, useContext as L, merge as M, onCleanup as N, createSignal as O, onSettled as P, omit as R, children as S, createMemo as T, dn as U, Sn as V, iu as W, Loading as _, mergeProps as a, Show as b, ssrAttribute as c, ssrGroup as d, ssrHydrationKey as f, For as g, Errored as h, memo as i, getOwner as j, createUniqueId as k, ssrClassName as l, ssrStyleProperty as m, HydrationScript as n, renderToStream as o, ssrStyle as p, escape as r, ssr as s, Dynamic as t, ssrElement as u, Match as v, createEffect as w, Switch as x, NoHydration as y, p as z };
