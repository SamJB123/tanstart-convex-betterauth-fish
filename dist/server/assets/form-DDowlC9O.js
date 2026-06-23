import { C as createContext, L as useContext, O as createSignal, P as onSettled, R as omit, a as mergeProps, b as Show, c as ssrAttribute, d as ssrGroup, f as ssrHydrationKey, g as For, k as createUniqueId, l as ssrClassName, m as ssrStyleProperty, r as escape, s as ssr, u as ssrElement, w as createEffect } from "./server-Bjhk73rZ.js";
import { _ as cn, g as Icon } from "./surface-iaHzS8iU.js";
//#region src/ui/form.tsx
var _tmpl$ = ["<span", " class=\"font-data text-[0.6875rem] font-normal uppercase tracking-wide text-[var(--c-faint)]\">Optional</span>"], _tmpl$2 = [
	"<label",
	"",
	" class=\"flex items-center gap-2 text-[0.9375rem] font-medium text-[var(--c-ink)]\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></label>"
], _tmpl$3 = [
	"<p",
	"",
	" role=\"alert\" class=\"flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--c-ember)]\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></p>"
], _tmpl$4 = [
	"<div",
	" class=\"",
	"\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$5 = [
	"<p",
	"",
	" class=\"text-[0.8125rem] leading-snug text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$6 = [
	"<span",
	" class=\"pointer-events-none absolute left-3.5 text-[var(--c-faint)]\">",
	"</span>"
], _tmpl$7 = [
	"<div",
	" class=\"relative flex items-center\"><!--$-->",
	"<!--/-->",
	"</div>"
], _tmpl$8 = [
	"<legend",
	" class=\"mb-1 p-0 text-[0.9375rem] font-medium text-[var(--c-ink)]\">",
	"</legend>"
], _tmpl$9 = [
	"<p",
	" class=\"-mt-1 mb-0.5 text-[0.8125rem] text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$0 = [
	"<fieldset",
	" class=\"",
	"\"",
	"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></fieldset>"
], _tmpl$1 = [
	"<span",
	" class=\"flex-none text-[var(--c-sea)]\">",
	"</span>"
], _tmpl$10 = [
	"<span",
	" class=\"text-[0.8125rem] leading-snug text-[var(--c-muted)]\">",
	"</span>"
], _tmpl$11 = [
	"<label",
	" class=\"",
	"\"><input",
	"",
	"",
	"",
	"><span class=\"",
	"\">",
	"</span><!--$-->",
	"<!--/--><span class=\"flex min-w-0 flex-1 flex-col gap-0.5\"><span class=\"text-[0.9375rem] font-medium text-[var(--c-ink)]\">",
	"</span><!--$-->",
	"<!--/--></span></label>"
], _tmpl$12 = [
	"<span",
	" class=\"text-[0.9375rem] font-medium text-[var(--c-ink)]\">",
	"</span>"
], _tmpl$13 = [
	"<span",
	" class=\"text-[0.8125rem] text-[var(--c-muted)]\">",
	"</span>"
], _tmpl$14 = [
	"<span",
	" class=\"flex flex-col gap-0.5\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></span>"
], _tmpl$15 = [
	"<label",
	" class=\"",
	"\"><span class=\"relative inline-flex flex-none\"><input type=\"checkbox\"",
	" class=\"peer absolute h-px w-px opacity-0\"><span class=\"",
	"\"></span><span class=\"pointer-events-none absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform\" style=\"",
	"\"></span></span><!--$-->",
	"<!--/--></label>"
], _tmpl$16 = [
	"<div",
	" class=\"",
	"\" role=\"tablist\"",
	"><span class=\"tide-seg-indicator\" style=\"",
	"\" aria-hidden=\"true\"></span><!--$-->",
	"<!--/--></div>"
], _tmpl$17 = [
	"<button",
	" type=\"button\" role=\"tab\"",
	" class=\"tide-seg-btn\">",
	"</button>"
], _tmpl$18 = [
	"<button",
	" type=\"button\"",
	" class=\"",
	"\"><span class=\"",
	"\">",
	"</span><!--$-->",
	"<!--/--></button>"
];
function FieldFrame(props) {
	var _v$6, _v$3, _v$4, _v$5, _v$7, _v$0, _v$1, _v$10, _v$11;
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrClassName(cn("flex flex-col gap-1.5", props.class)), _v$8 = escape(Show({
		get when() {
			return props.label;
		},
		get children() {
			return _v$3 = ssrHydrationKey(), _v$4 = () => ssrAttribute("for", escape(props.id, true)), _v$5 = () => escape(props.label), _v$7 = escape(Show({
				get when() {
					return props.optional;
				},
				get children() {
					return _v$6 = ssrHydrationKey(), ssr(_tmpl$, _v$6);
				}
			})), ssr(_tmpl$2, _v$3, _v$4, _v$5, _v$7);
		}
	})), _v$9 = () => escape(props.children);
	return ssr(_tmpl$4, _v$, _v$2, _v$8, _v$9, escape(Show({
		get when() {
			return props.error;
		},
		get fallback() {
			var _v$13, _v$14, _v$15;
			return Show({
				get when() {
					return props.hint;
				},
				get children() {
					return _v$13 = ssrHydrationKey(), _v$14 = () => ssrAttribute("id", escape(props.hintId, true)), _v$15 = () => escape(props.hint), ssr(_tmpl$5, _v$13, _v$14, _v$15);
				}
			});
		},
		get children() {
			return _v$0 = ssrHydrationKey(), _v$1 = () => ssrAttribute("id", escape(props.errorId, true)), _v$10 = escape(Icon({
				name: "alert",
				size: 15
			})), _v$11 = () => escape(props.error), ssr(_tmpl$3, _v$0, _v$1, _v$10, _v$11);
		}
	})));
}
function TextField(props) {
	var _v$17, _v$18, _v$16, _v$19, _v$20;
	const id = createUniqueId();
	const hintId = `${id}-hint`;
	const errorId = `${id}-err`;
	const rest = omit(props, "label", "hint", "error", "optional", "value", "onInput", "leadingIcon", "class");
	return FieldFrame({
		id,
		get label() {
			return props.label;
		},
		get hint() {
			return props.hint;
		},
		get error() {
			return props.error;
		},
		get optional() {
			return props.optional;
		},
		hintId,
		errorId,
		get children() {
			return _v$16 = ssrHydrationKey(), _v$19 = escape(Show({
				get when() {
					return props.leadingIcon;
				},
				get children() {
					return _v$17 = ssrHydrationKey(), _v$18 = escape(Icon({
						get name() {
							return props.leadingIcon;
						},
						size: 20
					})), ssr(_tmpl$6, _v$17, _v$18);
				}
			})), _v$20 = ssrElement("input", mergeProps({
				id,
				get value() {
					return props.value ?? "";
				},
				get ["aria-invalid"]() {
					return props.error ? "true" : void 0;
				},
				get ["aria-describedby"]() {
					return props.error ? errorId : props.hint ? hintId : void 0;
				},
				get ["class"]() {
					return cn("min-h-[var(--tap)] w-full rounded-[var(--r-md)] bg-[var(--c-surface-2)] px-4 text-base text-[var(--c-ink)]", "shadow-[inset_0_0_0_1.5px_var(--c-line)] outline-none transition-shadow", "placeholder:text-[var(--c-faint)] focus:shadow-[inset_0_0_0_2px_var(--c-sea)]", props.error && "shadow-[inset_0_0_0_1.5px_var(--c-ember)]", props.leadingIcon && "pl-11", props.class);
				}
			}, rest), void 0, false), ssr(_tmpl$7, _v$16, _v$19, _v$20);
		}
	});
}
function TextArea(props) {
	const id = createUniqueId();
	const hintId = `${id}-hint`;
	const errorId = `${id}-err`;
	const rest = omit(props, "label", "hint", "error", "optional", "value", "onInput", "class");
	return FieldFrame({
		id,
		get label() {
			return props.label;
		},
		get hint() {
			return props.hint;
		},
		get error() {
			return props.error;
		},
		get optional() {
			return props.optional;
		},
		hintId,
		errorId,
		get children() {
			return ssrElement("textarea", mergeProps({
				id,
				get rows() {
					return props.rows ?? 3;
				},
				get ["aria-invalid"]() {
					return props.error ? "true" : void 0;
				},
				get ["aria-describedby"]() {
					return props.error ? errorId : props.hint ? hintId : void 0;
				},
				get ["class"]() {
					return cn("tide-input min-h-[88px] w-full resize-y rounded-[var(--r-md)] bg-[var(--c-surface-2)] px-4 py-3 text-base leading-relaxed text-[var(--c-ink)]", "shadow-[inset_0_0_0_1.5px_var(--c-line)] outline-none transition-shadow", "placeholder:text-[var(--c-faint)] focus:shadow-[inset_0_0_0_2px_var(--c-sea)]", props.error && "shadow-[inset_0_0_0_1.5px_var(--c-ember)]", props.class);
				}
			}, rest), () => () => escape(props.value ?? ""), true);
		}
	});
}
function Select(props) {
	const id = createUniqueId();
	const hintId = `${id}-hint`;
	const errorId = `${id}-err`;
	const rest = omit(props, "label", "hint", "error", "optional", "value", "onChange", "children", "class");
	return FieldFrame({
		id,
		get label() {
			return props.label;
		},
		get hint() {
			return props.hint;
		},
		get error() {
			return props.error;
		},
		get optional() {
			return props.optional;
		},
		hintId,
		errorId,
		get children() {
			return ssrElement("select", mergeProps({
				id,
				get value() {
					return props.value;
				},
				get ["aria-invalid"]() {
					return props.error ? "true" : void 0;
				},
				get ["aria-describedby"]() {
					return props.error ? errorId : props.hint ? hintId : void 0;
				},
				get ["class"]() {
					return cn("tide-select w-full text-base", props.class);
				}
			}, rest), () => () => escape(props.children), true);
		}
	});
}
var ChoiceContext = createContext();
function ChoiceGroup(props) {
	var _v$24, _v$25, _v$27, _v$28, _v$31, _v$32, _v$33, _v$21, _g$, _v$26, _v$29, _v$30, _v$34;
	const name = createUniqueId();
	const errorId = `${name}-err`;
	return ChoiceContext({
		value: {
			name,
			multiple: !!props.multiple,
			selected: () => props.multiple ? props.values ?? [] : props.value ? [props.value] : [],
			toggle: (value) => {
				if (props.multiple) {
					const cur = props.values ?? [];
					props.onValuesChange?.(cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]);
				} else props.onChange?.(value);
			}
		},
		get children() {
			return _v$21 = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("flex flex-col gap-2.5 border-0 p-0", props.class)), ssrAttribute("aria-describedby", props.error ? escape(errorId, true) : escape(void 0, true))], 2), _v$26 = escape(Show({
				get when() {
					return props.label;
				},
				get children() {
					return _v$24 = ssrHydrationKey(), _v$25 = () => escape(props.label), ssr(_tmpl$8, _v$24, _v$25);
				}
			})), _v$29 = escape(Show({
				get when() {
					return props.hint;
				},
				get children() {
					return _v$27 = ssrHydrationKey(), _v$28 = () => escape(props.hint), ssr(_tmpl$9, _v$27, _v$28);
				}
			})), _v$30 = () => escape(props.children), _v$34 = escape(Show({
				get when() {
					return props.error;
				},
				get children() {
					return _v$31 = ssrHydrationKey(), _v$32 = escape(Icon({
						name: "alert",
						size: 15
					})), _v$33 = () => escape(props.error), ssr(_tmpl$3, _v$31, ssrAttribute("id", escape(errorId, true)), _v$32, _v$33);
				}
			})), ssr(_tmpl$0, _v$21, _g$, _g$, _v$26, _v$29, _v$30, _v$34);
		}
	});
}
function ChoiceCard(props) {
	var _v$43, _v$44, _v$47, _v$48;
	const ctx = useContext(ChoiceContext);
	if (!ctx) throw new Error("ChoiceCard must be used inside a ChoiceGroup");
	const checked = () => ctx.selected().includes(props.value);
	var _v$35 = ssrHydrationKey(), _g$2 = ssrGroup(() => [
		ssrClassName(cn("tide-choice", props.class)),
		ssrAttribute("type", ctx.multiple ? "checkbox" : "radio"),
		ssrAttribute("name", escape(ctx.name, true))
	], 3), _v$41 = () => ssrClassName(cn("tide-choice-mark", ctx.multiple && "is-checkbox")), _v$42 = escape(Icon({
		name: "check",
		size: 15
	})), _v$45 = escape(Show({
		get when() {
			return props.icon;
		},
		get children() {
			return _v$43 = ssrHydrationKey(), _v$44 = escape(Icon({
				get name() {
					return props.icon;
				},
				size: 22
			})), ssr(_tmpl$1, _v$43, _v$44);
		}
	})), _v$46 = () => escape(props.label), _v$49 = escape(Show({
		get when() {
			return props.description;
		},
		get children() {
			return _v$47 = ssrHydrationKey(), _v$48 = () => escape(props.description), ssr(_tmpl$10, _v$47, _v$48);
		}
	})), _v$39 = () => ssrAttribute("value", escape(props.value, true)), _v$40 = () => ssrAttribute("checked", escape(checked(), true));
	return ssr(_tmpl$11, _v$35, _g$2, _g$2, _g$2, _v$39, _v$40, _v$41, _v$42, _v$45, _v$46, _v$49);
}
function Toggle(props) {
	var _v$56, _v$57, _v$59, _v$60, _v$55, _v$58, _v$61;
	var _v$50 = ssrHydrationKey(), _v$51 = () => ssrClassName(cn("flex cursor-pointer items-center gap-3", props.class)), _g$3 = ssrGroup(() => [ssrClassName(cn("h-7 w-12 rounded-full bg-[var(--c-line-strong)] transition-colors", "peer-checked:bg-[var(--c-sea)] peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--c-focus)]", props.checked && "bg-[var(--c-sea)]")), ssrStyleProperty("transform:", props.checked ? "translateX(20px)" : "none")], 2), _v$62 = escape(Show({
		get when() {
			return props.label || props.description;
		},
		get children() {
			return _v$55 = ssrHydrationKey(), _v$58 = escape(Show({
				get when() {
					return props.label;
				},
				get children() {
					return _v$56 = ssrHydrationKey(), _v$57 = () => escape(props.label), ssr(_tmpl$12, _v$56, _v$57);
				}
			})), _v$61 = escape(Show({
				get when() {
					return props.description;
				},
				get children() {
					return _v$59 = ssrHydrationKey(), _v$60 = () => escape(props.description), ssr(_tmpl$13, _v$59, _v$60);
				}
			})), ssr(_tmpl$14, _v$55, _v$58, _v$61);
		}
	})), _v$52 = () => ssrAttribute("checked", escape(props.checked, true));
	return ssr(_tmpl$15, _v$50, _v$51, _v$52, _g$3, _g$3, _v$62);
}
function SegmentedControl(props) {
	const btns = /* @__PURE__ */ new Map();
	const [ind, setInd] = createSignal({
		x: 0,
		w: 0,
		ready: false
	});
	const measure = () => {
		const b = btns.get(props.value);
		if (b) setInd({
			x: b.offsetLeft,
			w: b.offsetWidth,
			ready: true
		});
	};
	createEffect(() => props.value, () => measure());
	onSettled(() => {
		measure();
		const ro = new ResizeObserver(() => measure());
		return () => ro.disconnect();
	});
	var _v$63 = ssrHydrationKey(), _g$4 = ssrGroup(() => [
		ssrClassName(cn("tide-segmented", props.class)),
		ssrAttribute("aria-label", escape(props.ariaLabel, true)),
		ssrStyleProperty("transform:", `translateX(${escape(ind().x, true)}px)`) + ssrStyleProperty(";width:", `${escape(ind().w, true)}px`) + ssrStyleProperty(";opacity:", ind().ready ? "1" : "0")
	], 3);
	return ssr(_tmpl$16, _v$63, _g$4, _g$4, _g$4, escape(For({
		get each() {
			return props.options;
		},
		children: (opt) => {
			var _v$68, _v$69, _v$70;
			return _v$68 = ssrHydrationKey(), _v$69 = () => ssrAttribute("aria-selected", props.value === opt.id ? "true" : "false"), _v$70 = () => escape(opt.label), ssr(_tmpl$17, _v$68, _v$69, _v$70);
		}
	})));
}
function VoiceButton(props) {
	var _v$71 = ssrHydrationKey(), _g$5 = ssrGroup(() => [
		ssrAttribute("aria-pressed", props.listening ? "true" : "false"),
		ssrClassName(cn("tide-press inline-flex items-center gap-2.5 rounded-[var(--r-pill)] px-5 py-3 font-medium", props.listening ? "bg-[var(--c-coral)] text-[var(--c-on-coral)]" : "bg-[var(--c-sea-soft)] text-[var(--c-sea)]", props.class)),
		ssrClassName(cn("relative inline-grid place-items-center", props.listening && "animate-pulse"))
	], 3), _v$75 = escape(Icon({
		name: "mic",
		size: 20
	})), _v$76 = () => escape(props.label ?? (props.listening ? "Listening…" : "Speak"));
	return ssr(_tmpl$18, _v$71, _g$5, _g$5, _g$5, _v$75, _v$76);
}
//#endregion
export { TextArea as a, VoiceButton as c, Select as i, ChoiceGroup as n, TextField as o, SegmentedControl as r, Toggle as s, ChoiceCard as t };
