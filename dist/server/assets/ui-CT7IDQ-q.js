import { O as createSignal, b as Show, c as ssrAttribute, d as ssrGroup, f as ssrHydrationKey, g as For, i as memo, l as ssrClassName, m as ssrStyleProperty, p as ssrStyle, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { _ as cn, a as Avatar, c as Divider, d as Stat, f as StatusDot, g as Icon, i as ListRow, l as Eyebrow, m as IconButton, n as Card, o as AvatarStack, p as Button, s as Chip, t as Callout, u as ProgressBar } from "./surface-iaHzS8iU.js";
import { t as Sheet } from "./sheet-HbftMS-L.js";
import { a as TextArea, c as VoiceButton, i as Select, n as ChoiceGroup, o as TextField, r as SegmentedControl, s as Toggle, t as ChoiceCard } from "./form-DDowlC9O.js";
import { n as AppShell, r as BottomBar, t as AppBar } from "./shell-D6eh7HIb.js";
//#region src/ui/disclosure.tsx
var _tmpl$$7 = [
	"<span",
	" class=\"flex-none text-[var(--c-sea)]\">",
	"</span>"
], _tmpl$2$7 = [
	"<details",
	" class=\"",
	"\"",
	"><summary><span class=\"flex min-w-0 items-center gap-2.5\"><!--$-->",
	"<!--/--><span class=\"min-w-0 text-[0.9375rem] text-[var(--c-ink)]\">",
	"</span></span><span class=\"tide-accordion-chev\">",
	"</span></summary><div class=\"tide-accordion-body text-[0.9375rem]\">",
	"</div></details>"
];
function Accordion(props) {
	var _v$4, _v$5;
	var _v$ = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("tide-accordion", props.class)), ssrAttribute("open", escape(props.defaultOpen, true))], 2), _v$6 = escape(Show({
		get when() {
			return props.icon;
		},
		get children() {
			return _v$4 = ssrHydrationKey(), _v$5 = escape(Icon({
				get name() {
					return props.icon;
				},
				size: 20
			})), ssr(_tmpl$$7, _v$4, _v$5);
		}
	})), _v$7 = () => escape(props.summary), _v$8 = escape(Icon({
		name: "chevron-down",
		size: 20
	})), _v$9 = () => escape(props.children);
	return ssr(_tmpl$2$7, _v$, _g$, _g$, _v$6, _v$7, _v$8, _v$9);
}
//#endregion
//#region src/ui/chart.tsx
var _tmpl$$6 = [
	"<path",
	"",
	"",
	" opacity=\"0.12\"></path>"
], _tmpl$2$6 = [
	"<svg",
	" class=\"",
	"\"",
	"",
	" viewBox=\"",
	"\" aria-hidden=\"true\"><!--$-->",
	"<!--/--><path",
	" fill=\"none\"",
	" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>"
], _tmpl$3$6 = [
	"<div",
	" class=\"",
	"\" style=\"",
	"\"",
	"",
	"",
	"",
	"",
	"><div class=\"tide-ring-hole\">",
	"</div></div>"
], _tmpl$4$5 = [
	"<div",
	" class=\"",
	"\" style=\"",
	"\" aria-hidden=\"true\">",
	"</div>"
], _tmpl$5$5 = ["<span", " class=\"tide-eq-bar\"></span>"];
function Sparkline(props) {
	var _v$6, _g$;
	const w = () => props.w ?? 96;
	const h = () => props.h ?? 32;
	const geom = () => {
		const data = props.data;
		if (data.length < 2) return {
			line: "",
			area: ""
		};
		const min = Math.min(...data);
		const span = Math.max(...data) - min || 1;
		const dx = w() / (data.length - 1);
		const line = data.map((v, i) => {
			return [i * dx, h() - 3 - (v - min) / span * (h() - 6)];
		}).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
		return {
			line,
			area: `${line} L${w()} ${h()} L0 ${h()} Z`
		};
	};
	var _v$ = ssrHydrationKey(), _g$3 = ssrGroup(() => [
		ssrClassName(cn("overflow-visible", props.class)),
		ssrAttribute("width", escape(w(), true)),
		ssrAttribute("height", escape(h(), true)),
		`0 0 ${escape(w(), true)} ${escape(h(), true)}`
	], 4), _v$9 = escape(Show({
		get when() {
			return props.fill;
		},
		get children() {
			return _v$6 = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrAttribute("d", escape(geom().area, true)), ssrAttribute("fill", escape(props.color ?? "var(--c-sea)", true))], 2), ssr(_tmpl$$6, _v$6, _g$, _g$);
		}
	})), _g$2 = ssrGroup(() => [ssrAttribute("d", escape(geom().line, true)), ssrAttribute("stroke", escape(props.color ?? "var(--c-sea)", true))], 2);
	return ssr(_tmpl$2$6, _v$, _g$3, _g$3, _g$3, _g$3, _v$9, _g$2, _g$2);
}
function ProgressRing(props) {
	const size = () => props.size ?? 96;
	const thickness = () => props.thickness ?? 8;
	const pct = () => {
		const max = props.max ?? 100;
		if (max <= 0) return 0;
		return Math.max(0, Math.min(100, (props.value ?? 0) / max * 100));
	};
	var _v$10 = ssrHydrationKey(), _g$4 = ssrGroup(() => [
		ssrClassName(cn("tide-ring", props.spin && "tide-ring-spin", props.class)),
		ssrStyleProperty("width:", `${escape(size(), true)}px`) + ssrStyleProperty(";height:", `${escape(size(), true)}px`) + ssrStyleProperty(";--ring-p:", `${escape(pct(), true)}%`) + ssrStyleProperty(";--ring-thickness:", `${escape(thickness(), true)}px`) + ssrStyleProperty(";--ring-color:", escape(props.tone ?? "var(--c-sea)", true)),
		ssrAttribute("role", props.value !== void 0 ? "progressbar" : escape(void 0, true)),
		ssrAttribute("aria-valuenow", props.value !== void 0 ? escape(Math.round(pct()), true) : escape(void 0, true)),
		ssrAttribute("aria-valuemin", props.value !== void 0 ? 0 : escape(void 0, true)),
		ssrAttribute("aria-valuemax", props.value !== void 0 ? 100 : escape(void 0, true)),
		ssrAttribute("aria-label", escape(props.label, true))
	], 7), _v$18 = () => escape(props.children);
	return ssr(_tmpl$3$6, _v$10, _g$4, _g$4, _g$4, _g$4, _g$4, _g$4, _g$4, _v$18);
}
function EqualizerBars(props) {
	var _v$19 = ssrHydrationKey(), _g$5 = ssrGroup(() => [ssrClassName(cn("tide-eq", props.active && "is-active", props.class)), ssrStyleProperty("height:", `${escape(props.height ?? 40, true)}px`) + ssrStyleProperty(";--eq-color:", escape(props.color ?? "var(--c-sea)", true))], 2);
	return ssr(_tmpl$4$5, _v$19, _g$5, _g$5, escape(For({
		get each() {
			return Array.from({ length: props.count ?? 28 });
		},
		children: () => {
			var _v$23;
			return _v$23 = ssrHydrationKey(), ssr(_tmpl$5$5, _v$23);
		}
	})));
}
Array.from({ length: 40 }, (_, i) => .25 + .4 * Math.abs(Math.sin(i * .5) * Math.cos(i * .17)));
//#endregion
//#region src/ui/carousel.tsx
var _tmpl$$5 = [
	"<ul",
	" class=\"",
	"\">",
	"</ul>"
], _tmpl$2$5 = [
	"<span",
	" class=\"tide-slide-live\" aria-hidden=\"true\">",
	"</span>"
], _tmpl$3$5 = [
	"<li",
	" class=\"",
	"\" style=\"",
	"\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></li>"
];
function Carousel(props) {
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrClassName(cn("tide-carousel", props.markers === false && "tide-carousel-nomarkers", props.class)), _v$3 = () => escape(props.children);
	return ssr(_tmpl$$5, _v$, _v$2, _v$3);
}
function CarouselSlide(props) {
	var _v$7, _v$8;
	var _v$4 = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("tide-slide", props.class)), ssrStyleProperty("--from:", escape(props.from ?? "var(--c-sea)", true)) + ssrStyleProperty(";--to:", escape(props.to ?? "var(--c-sea-deep)", true))], 2), _v$9 = escape(Show({
		get when() {
			return props.liveBadge;
		},
		get children() {
			return _v$7 = ssrHydrationKey(), _v$8 = () => escape(props.liveBadge), ssr(_tmpl$2$5, _v$7, _v$8);
		}
	})), _v$0 = () => escape(props.children);
	return ssr(_tmpl$3$5, _v$4, _g$, _g$, _v$9, _v$0);
}
//#endregion
//#region src/ui/timeline.tsx
var _tmpl$$4 = [
	"<ol",
	" class=\"",
	"\">",
	"</ol>"
], _tmpl$2$4 = [
	"<span",
	" class=\"w-0.5 flex-1 rounded-full\" style=\"",
	"\"></span>"
], _tmpl$3$4 = [
	"<span",
	" class=\"text-[0.8125rem] leading-snug text-[var(--c-muted)]\">",
	"</span>"
], _tmpl$4$4 = [
	"<span",
	" class=\"font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-faint)]\">",
	"</span>"
], _tmpl$5$4 = [
	"<li",
	" class=\"tide-reveal relative flex gap-3.5 pb-1\"><div class=\"flex flex-none flex-col items-center\"><span class=\"",
	"\" style=\"",
	"\">",
	"</span><!--$-->",
	"<!--/--></div><div class=\"",
	"\"><span class=\"font-display text-[0.9375rem] font-medium leading-tight text-[var(--c-ink)]\">",
	"</span><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div></li>"
], _tmpl$6$4 = ["<span", " class=\"h-2 w-2 rounded-full bg-current\"></span>"];
function StatusTimeline(props) {
	const state = (i) => i < props.current ? "done" : i === props.current ? "current" : "upcoming";
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrClassName(cn("flex flex-col", props.class));
	return ssr(_tmpl$$4, _v$, _v$2, escape(For({
		get each() {
			return props.steps;
		},
		children: (step, i) => {
			var _v$8, _v$9, _v$11, _v$12, _v$14, _v$15;
			const s = () => state(i());
			const last = () => i() === props.steps.length - 1;
			const reached = () => i() <= props.current;
			const tone = () => props.rejected && s() === "current" ? "var(--c-ember)" : reached() ? "var(--c-sea)" : "var(--c-line-strong)";
			var _v$4 = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("grid h-8 w-8 place-items-center rounded-full text-[var(--c-on-sea)] transition-colors", s() === "current" && !props.rejected && "animate-pulse")), ssrStyle({
				background: s() === "upcoming" ? "var(--c-bg-2)" : tone(),
				color: s() === "upcoming" ? "var(--c-faint)" : "var(--c-on-sea)",
				"box-shadow": s() === "current" ? `0 0 0 4px color-mix(in oklab, ${tone()} 20%, transparent)` : void 0,
				...s() === "current" ? { "view-transition-name": "timeline-active" } : {}
			})], 2), _v$7 = escape(Show({
				get when() {
					return s() === "done";
				},
				get fallback() {
					return Show({
						get when() {
							return props.rejected && s() === "current";
						},
						get fallback() {
							return ssr(_tmpl$6$4, ssrHydrationKey());
						},
						get children() {
							return Icon({
								name: "x",
								size: 16
							});
						}
					});
				},
				get children() {
					return Icon({
						name: "check",
						size: 16
					});
				}
			})), _v$0 = escape(Show({
				get when() {
					return !last();
				},
				get children() {
					return _v$8 = ssrHydrationKey(), _v$9 = () => ssrStyleProperty("background:", i() < props.current ? "var(--c-sea)" : "var(--c-line)"), ssr(_tmpl$2$4, _v$8, _v$9);
				}
			})), _v$1 = () => ssrClassName(cn("flex min-w-0 flex-1 flex-col gap-0.5 pb-5", s() === "upcoming" && "opacity-55")), _v$10 = () => escape(step.label);
			return ssr(_tmpl$5$4, _v$4, _g$, _g$, _v$7, _v$0, _v$1, _v$10, escape(Show({
				get when() {
					return step.description;
				},
				get children() {
					return _v$11 = ssrHydrationKey(), _v$12 = () => escape(step.description), ssr(_tmpl$3$4, _v$11, _v$12);
				}
			})), escape(Show({
				get when() {
					return step.meta;
				},
				get children() {
					return _v$14 = ssrHydrationKey(), _v$15 = () => escape(step.meta), ssr(_tmpl$4$4, _v$14, _v$15);
				}
			})));
		}
	})));
}
//#endregion
//#region src/ui/datefield.tsx
var _tmpl$$3 = [
	"<span",
	" class=\"text-[0.9375rem] font-medium text-[var(--c-ink)]\">",
	"</span>"
], _tmpl$2$3 = [
	"<p",
	" class=\"text-[0.8125rem] text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$3$3 = [
	"<div",
	" class=\"mb-3 flex items-center justify-between\"><button type=\"button\" aria-label=\"Previous month\" class=\"tide-press grid h-10 w-10 place-items-center rounded-full text-[var(--c-muted)] hover:bg-[var(--c-surface-2)]\">",
	"</button><span class=\"font-display text-lg font-medium text-[var(--c-ink)]\"><!--$-->",
	"<!--/--> <!--$-->",
	"<!--/--></span><button type=\"button\" aria-label=\"Next month\" class=\"tide-press grid h-10 w-10 place-items-center rounded-full text-[var(--c-muted)] hover:bg-[var(--c-surface-2)]\">",
	"</button></div>"
], _tmpl$4$3 = [
	"<div",
	" class=\"grid grid-cols-7 gap-1 pb-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$5$3 = [
	"<div",
	" class=\"",
	"\"><!--$-->",
	"<!--/--><button type=\"button\" class=\"tide-press flex min-h-[var(--tap)] items-center gap-2.5 rounded-[var(--r-md)] bg-[var(--c-surface-2)] px-4 text-base shadow-[inset_0_0_0_1.5px_var(--c-line)]\"><span class=\"text-[var(--c-faint)]\">",
	"</span><span class=\"",
	"\">",
	"</span></button><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$6$3 = [
	"<span",
	" class=\"grid h-8 place-items-center font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-faint)]\">",
	"</span>"
], _tmpl$7$3 = ["<span", "></span>"], _tmpl$8$3 = [
	"<button",
	" type=\"button\"",
	" class=\"",
	"\">",
	"</button>"
], _tmpl$9$2 = [
	"<div",
	" class=\"",
	"\" role=\"list\">",
	"</div>"
], _tmpl$0$1 = [
	"<div",
	" role=\"listitem\" class=\"",
	"\" style=\"",
	"\" title=\"",
	"\"><span class=\"font-data text-[0.6875rem] uppercase tracking-wide text-[var(--c-muted)]\">",
	"</span><span style=\"",
	"\" class=\"text-lg leading-none\">",
	"</span><span class=\"font-data text-[0.625rem] uppercase tracking-wide\" style=\"",
	"\">",
	"</span></div>"
];
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var WD = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
var firstWeekday = (y, m) => new Date(y, m, 1).getDay();
var weekdayOf = (y, m, d) => new Date(y, m, d).getDay();
var sameDay = (a, b) => a.y === b.y && a.m === b.m && a.d === b.d;
function formatYMD(v) {
	return `${WD[weekdayOf(v.y, v.m, v.d)]} ${v.d} ${MONTHS[v.m].slice(0, 3)} ${v.y}`;
}
function DateField(props) {
	var _v$3, _v$4, _v$9, _v$0, _v$10, _v$11, _v$12, _v$13, _v$14, _v$15, _v$16, _v$17;
	const [open, setOpen] = createSignal(false);
	const seed = () => props.value ?? props.today ?? {
		y: 2026,
		m: 5,
		d: 1
	};
	const [view, setView] = createSignal({
		y: seed().y,
		m: seed().m
	});
	const cells = () => {
		const { y, m } = view();
		const blanks = firstWeekday(y, m);
		const days = daysInMonth(y, m);
		return Array.from({ length: 42 }, (_, i) => {
			const d = i - blanks + 1;
			return d >= 1 && d <= days ? d : null;
		});
	};
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrClassName(cn("flex flex-col gap-1.5", props.class)), _v$5 = escape(Show({
		get when() {
			return props.label;
		},
		get children() {
			return _v$3 = ssrHydrationKey(), _v$4 = () => escape(props.label), ssr(_tmpl$$3, _v$3, _v$4);
		}
	})), _v$6 = escape(Icon({
		name: "clock",
		size: 20
	})), _v$7 = () => ssrClassName(props.value ? "text-[var(--c-ink)]" : "text-[var(--c-faint)]");
	return ssr(_tmpl$5$3, _v$, _v$2, _v$5, _v$6, _v$7, (() => {
		var _c$ = memo(() => !!props.value);
		return () => _c$() ? escape(formatYMD(props.value)) : escape(props.placeholder ?? "Choose a date");
	})(), escape(Show({
		get when() {
			return props.hint;
		},
		get children() {
			return _v$9 = ssrHydrationKey(), _v$0 = () => escape(props.hint), ssr(_tmpl$2$3, _v$9, _v$0);
		}
	})), escape(Sheet({
		get open() {
			return open();
		},
		onClose: () => setOpen(false),
		title: "Choose a date",
		get children() {
			return [(_v$10 = ssrHydrationKey(), _v$11 = escape(Icon({
				name: "chevron-right",
				size: 22,
				"class": "rotate-180"
			})), _v$12 = () => escape(MONTHS[view().m]), _v$13 = () => escape(view().y), _v$14 = escape(Icon({
				name: "chevron-right",
				size: 22
			})), ssr(_tmpl$3$3, _v$10, _v$11, _v$12, _v$13, _v$14)), (_v$15 = ssrHydrationKey(), _v$16 = escape(For({
				each: WD,
				children: (w) => {
					var _v$19, _v$20;
					return _v$19 = ssrHydrationKey(), _v$20 = () => escape(w[0]), ssr(_tmpl$6$3, _v$19, _v$20);
				}
			})), _v$17 = escape(For({
				get each() {
					return cells();
				},
				keyed: false,
				children: (cell) => Show({
					get when() {
						return cell();
					},
					get fallback() {
						return ssr(_tmpl$7$3, ssrHydrationKey());
					},
					children: (d) => {
						const cur = () => ({
							y: view().y,
							m: view().m,
							d: d()
						});
						const isSel = () => !!props.value && sameDay(props.value, cur());
						const isToday = () => !!props.today && sameDay(props.today, cur());
						var _v$22 = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrAttribute("aria-pressed", isSel() ? "true" : "false"), ssrClassName(cn("tide-press grid h-11 place-items-center rounded-[var(--r-sm)] font-data text-[0.9375rem] tabular-nums", isSel() ? "bg-[var(--c-sea)] font-semibold text-[var(--c-on-sea)]" : "text-[var(--c-ink)] hover:bg-[var(--c-sea-soft)]", isToday() && !isSel() && "shadow-[inset_0_0_0_1.5px_var(--c-line-strong)]"))], 2), _v$25 = () => escape(d());
						return ssr(_tmpl$8$3, _v$22, _g$, _g$, _v$25);
					}
				})
			})), ssr(_tmpl$4$3, _v$15, _v$16, _v$17))];
		}
	})));
}
var SEASON_META = {
	open: {
		color: "var(--c-reef)",
		glyph: "●",
		text: "Open"
	},
	restricted: {
		color: "var(--c-sun)",
		glyph: "◐",
		text: "Restricted"
	},
	closed: {
		color: "var(--c-ember)",
		glyph: "○",
		text: "Closed"
	}
};
function SeasonStrip(props) {
	var _v$26 = ssrHydrationKey(), _v$27 = () => ssrClassName(cn("tide-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1", props.class));
	return ssr(_tmpl$9$2, _v$26, _v$27, escape(For({
		get each() {
			return props.days;
		},
		children: (day) => {
			const meta = () => SEASON_META[day.status];
			var _v$29 = ssrHydrationKey(), _g$2 = ssrGroup(() => [
				ssrClassName(cn("flex flex-none snap-center flex-col items-center gap-1 rounded-[var(--r-md)] px-3 py-2.5", day.today && "shadow-[inset_0_0_0_2px_var(--c-sea)]")),
				ssrStyleProperty("background:", `color-mix(in oklab, ${escape(meta().color, true)} 12%, var(--c-surface))`) + ssrStyleProperty(";min-width:", "64px"),
				`${escape(day.label, true)} · ${escape(meta().text, true)}`
			], 3), _v$33 = () => escape(day.label), _v$34 = () => ssrStyleProperty("color:", escape(meta().color, true)), _v$35 = () => escape(meta().glyph), _v$36 = () => ssrStyleProperty("color:", escape(meta().color, true)), _v$37 = () => escape(meta().text);
			return ssr(_tmpl$0$1, _v$29, _g$2, _g$2, _g$2, _v$33, _v$34, _v$35, _v$36, _v$37);
		}
	})));
}
//#endregion
//#region src/ui/matrix.tsx
var _tmpl$$2 = [
	"<div",
	" class=\"",
	"\"><div class=\"tide-matrix-grid\" style=\"",
	"\"><div class=\"tide-matrix-corner\"><span class=\"font-data text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--c-faint)]\">",
	"</span></div><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div></div>"
], _tmpl$2$2 = [
	"<span",
	" class=\"font-data text-[0.625rem] text-[var(--c-faint)]\">",
	"</span>"
], _tmpl$3$2 = [
	"<div",
	" class=\"",
	"\"><span class=\"font-data text-[0.6875rem] font-semibold uppercase tracking-wide text-[var(--c-muted)]\">",
	"</span><!--$-->",
	"<!--/--></div>"
], _tmpl$4$2 = [
	"<button",
	" type=\"button\" class=\"tide-matrix-rowhead tide-press text-left\" style=\"",
	"\">",
	"</button>"
], _tmpl$5$2 = [
	"<div",
	" class=\"tide-matrix-rowhead\" style=\"",
	"\">",
	"</div>"
], _tmpl$6$2 = [
	"<div",
	" class=\"tide-matrix-cell\"",
	" style=\"",
	"\">",
	"</div>"
], _tmpl$7$2 = [
	"<span",
	" class=\"truncate font-data text-[0.6875rem] text-[var(--c-faint)]\">",
	"</span>"
], _tmpl$8$2 = [
	"<span",
	" class=\"flex items-center gap-2.5\"><span class=\"h-7 w-1 flex-none rounded-full\" style=\"",
	"\"></span><span class=\"flex min-w-0 flex-col\"><span class=\"truncate text-[0.875rem] font-medium text-[var(--c-ink)]\">",
	"</span><!--$-->",
	"<!--/--></span></span>"
];
function QuotaMatrix(props) {
	var _v$ = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("tide-matrix-frame tide-scroll", props.class)), ssrStyleProperty("--cols:", escape(String(props.columns.length), true))], 2), _v$4 = () => escape(props.cornerLabel);
	return ssr(_tmpl$$2, _v$, _g$, _g$, _v$4, escape(For({
		get each() {
			return props.columns;
		},
		children: (col) => {
			var _v$0, _v$1, _v$7, _v$8, _v$9, _v$10;
			return _v$7 = ssrHydrationKey(), _v$8 = () => ssrClassName(cn("tide-matrix-colhead", col.highlight && "is-highlight")), _v$9 = () => escape(col.label), _v$10 = escape(Show({
				get when() {
					return col.sublabel;
				},
				get children() {
					return _v$0 = ssrHydrationKey(), _v$1 = () => escape(col.sublabel), ssr(_tmpl$2$2, _v$0, _v$1);
				}
			})), ssr(_tmpl$3$2, _v$7, _v$8, _v$9, _v$10);
		}
	})), escape(For({
		get each() {
			return props.rows;
		},
		children: (row) => {
			var _v$11, _v$12, _v$13;
			return [Show({
				get when() {
					return props.onRowSelect;
				},
				get fallback() {
					var _v$14 = ssrHydrationKey(), _v$15 = () => ssrStyleProperty("--rc:", escape(row.color ?? "var(--c-sea)", true));
					return ssr(_tmpl$5$2, _v$14, _v$15, escape(RowHeadInner({ row })));
				},
				get children() {
					return _v$11 = ssrHydrationKey(), _v$12 = () => ssrStyleProperty("--rc:", escape(row.color ?? "var(--c-sea)", true)), _v$13 = escape(RowHeadInner({
						row,
						interactive: true
					})), ssr(_tmpl$4$2, _v$11, _v$12, _v$13);
				}
			}), For({
				get each() {
					return props.columns;
				},
				children: (col) => {
					const c = props.cell(row.key, col.key);
					var _v$17 = ssrHydrationKey(), _g$2 = ssrGroup(() => [ssrAttribute("title", escape(c.title, true)), ssrStyleProperty("background:", c.color ? `color-mix(in oklab, ${escape(c.color, true)} ${escape(Math.round((c.intensity ?? .5) * 100), true)}%, var(--c-surface))` : "var(--c-surface)")], 2), _v$20 = () => escape(c.value);
					return ssr(_tmpl$6$2, _v$17, _g$2, _g$2, _v$20);
				}
			})];
		}
	})));
}
function RowHeadInner(props) {
	var _v$23, _v$24;
	var _v$21 = ssrHydrationKey(), _v$22 = () => escape(props.row.label), _v$25 = escape(Show({
		get when() {
			return props.row.sublabel;
		},
		get children() {
			return _v$23 = ssrHydrationKey(), _v$24 = () => escape(props.row.sublabel), ssr(_tmpl$7$2, _v$23, _v$24);
		}
	}));
	return ssr(_tmpl$8$2, _v$21, ssrStyleProperty("background:", "var(--rc)"), _v$22, _v$25);
}
//#endregion
//#region src/ui/layout.tsx
var _tmpl$$1 = [
	"<div",
	" class=\"",
	"\" style=\"",
	"\">",
	"</div>"
], _tmpl$2$1 = ["<span", " class=\"tide-note-ribbon\" aria-hidden=\"true\"></span>"], _tmpl$3$1 = [
	"<span",
	" class=\"tide-note-kind\" style=\"",
	"\">",
	"</span>"
], _tmpl$4$1 = [
	"<p",
	" class=\"mt-2 text-[0.875rem] leading-relaxed text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$5$1 = [
	"<div",
	" class=\"mt-3 flex flex-wrap gap-1.5\">",
	"</div>"
], _tmpl$6$1 = [
	"<div",
	" class=\"mt-3\">",
	"</div>"
], _tmpl$7$1 = [
	"<button",
	" type=\"button\" class=\"tide-press mt-3 inline-flex items-center gap-1 font-data text-[0.75rem] font-semibold\" style=\"",
	"\">Open →</button>"
], _tmpl$8$1 = [
	"<article",
	" class=\"",
	"\"",
	" style=\"",
	"\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><h3 class=\"tide-note-title font-display font-medium text-[var(--c-ink)]\">",
	"</h3><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></article>"
], _tmpl$9$1 = [
	"<span",
	" class=\"font-data text-[0.6875rem] text-[var(--c-faint)]\">#<!--$-->",
	"<!--/--></span>"
];
function Masonry(props) {
	var _v$ = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("tide-masonry", props.class)), ssrStyleProperty("--masonry-min:", `${escape(props.min ?? 232, true)}px`)], 2), _v$4 = () => escape(props.children);
	return ssr(_tmpl$$1, _v$, _g$, _g$, _v$4);
}
function PinNote(props) {
	var _v$9, _v$1, _v$10, _v$11, _v$14, _v$15, _v$17, _v$18, _v$20, _v$21, _v$23, _v$24;
	const accent = () => props.kind?.color ?? "var(--c-sea)";
	var _v$5 = ssrHydrationKey(), _g$2 = ssrGroup(() => [
		ssrClassName(cn("tide-note", props.pinned && "tide-note-pinned", props.class)),
		ssrAttribute("data-pri", escape(props.priority ?? "normal", true)),
		ssrStyleProperty("--kc:", escape(accent(), true))
	], 3), _v$0 = escape(Show({
		get when() {
			return props.pinned;
		},
		get children() {
			return _v$9 = ssrHydrationKey(), ssr(_tmpl$2$1, _v$9);
		}
	})), _v$12 = escape(Show({
		get when() {
			return props.kind;
		},
		get children() {
			return _v$1 = ssrHydrationKey(), _v$10 = () => ssrStyleProperty("color:", escape(accent(), true)) + ssrStyleProperty(";background:", `color-mix(in oklab, ${escape(accent(), true)} 14%, transparent)`), _v$11 = () => escape(props.kind?.label), ssr(_tmpl$3$1, _v$1, _v$10, _v$11);
		}
	})), _v$13 = () => escape(props.title);
	return ssr(_tmpl$8$1, _v$5, _g$2, _g$2, _g$2, _v$0, _v$12, _v$13, escape(Show({
		get when() {
			return props.children;
		},
		get children() {
			return _v$14 = ssrHydrationKey(), _v$15 = () => escape(props.children), ssr(_tmpl$4$1, _v$14, _v$15);
		}
	})), escape(Show({
		get when() {
			return props.tags && props.tags.length;
		},
		get children() {
			return _v$17 = ssrHydrationKey(), _v$18 = escape(For({
				get each() {
					return props.tags;
				},
				children: (t) => {
					var _v$26, _v$27;
					return _v$26 = ssrHydrationKey(), _v$27 = escape(t), ssr(_tmpl$9$1, _v$26, _v$27);
				}
			})), ssr(_tmpl$5$1, _v$17, _v$18);
		}
	})), escape(Show({
		get when() {
			return props.footer;
		},
		get children() {
			return _v$20 = ssrHydrationKey(), _v$21 = () => escape(props.footer), ssr(_tmpl$6$1, _v$20, _v$21);
		}
	})), escape(Show({
		get when() {
			return props.onOpen;
		},
		get children() {
			return _v$23 = ssrHydrationKey(), _v$24 = () => ssrStyleProperty("color:", escape(accent(), true)), ssr(_tmpl$7$1, _v$23, _v$24);
		}
	})));
}
//#endregion
//#region src/routes/ui.tsx?tsr-split=component
var _tmpl$ = [
	"<section",
	" class=\"tide-reveal flex flex-col gap-3.5 px-4 py-5\"><div class=\"flex flex-col gap-1\"><!--$-->",
	"<!--/--><h2 class=\"font-display text-xl font-medium text-[var(--c-ink)]\">",
	"</h2></div><!--$-->",
	"<!--/--></section>"
], _tmpl$2 = [
	"<div",
	" class=\"flex flex-wrap gap-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$3 = [
	"<div",
	" class=\"flex flex-wrap items-center gap-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$4 = [
	"<div",
	" class=\"flex flex-wrap items-center gap-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$5 = [
	"<div",
	" class=\"flex items-center gap-4\"><span class=\"flex items-center gap-2 text-[0.875rem] text-[var(--c-muted)]\"><!--$-->",
	"<!--/--> Synced</span><!--$-->",
	"<!--/--></div>"
], _tmpl$6 = ["<option", " value=\"saibai\">Saibai</option>"], _tmpl$7 = ["<option", " value=\"boigu\">Boigu</option>"], _tmpl$8 = ["<option", " value=\"badu\">Badu (Mulgrave)</option>"], _tmpl$9 = ["<option", " value=\"mer\">Mer (Murray)</option>"], _tmpl$0 = [
	"<div",
	" class=\"flex items-center justify-between gap-3\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$1 = ["<em", ">Akiba v Commonwealth</em>"], _tmpl$10 = [
	"<div",
	" class=\"flex flex-wrap gap-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$11 = ["<span", " class=\"font-data text-xl font-semibold tabular-nums text-[var(--c-ink)]\">62%</span>"], _tmpl$12 = ["<span", " class=\"font-data text-[0.625rem] uppercase tracking-wide text-[var(--c-faint)]\">ready</span>"], _tmpl$13 = [
	"<div",
	" class=\"flex items-center gap-4\"><!--$-->",
	"<!--/--><div class=\"flex flex-1 flex-col gap-3\"><div class=\"flex items-end justify-between gap-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div><!--$-->",
	"<!--/--></div></div>"
], _tmpl$14 = ["<div", " class=\"flex h-full flex-col justify-end p-5 text-[var(--c-on-sea)]\"><span class=\"font-data text-[0.6875rem] uppercase tracking-[0.18em] opacity-80\">What you’ll need</span><span class=\"mt-1 font-display text-xl\">Your name & community</span></div>"], _tmpl$15 = ["<div", " class=\"flex h-full flex-col justify-end p-5 text-[var(--c-on-coral)]\"><span class=\"font-data text-[0.6875rem] uppercase tracking-[0.18em] opacity-80\">Eligibility</span><span class=\"mt-1 font-display text-xl\">Councillor & mayor sign-off</span></div>"], _tmpl$16 = ["<div", " class=\"flex h-full flex-col justify-end p-5 text-white\"><span class=\"font-data text-[0.6875rem] uppercase tracking-[0.18em] opacity-80\">That’s it</span><span class=\"mt-1 font-display text-xl\">Lodge — even offline</span></div>"], _tmpl$17 = [
	"<div",
	" class=\"flex items-center gap-4\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$18 = ["<p", " class=\"mt-3 text-[0.8125rem] text-[var(--c-muted)]\">The bars stagger themselves with <code class=\"font-data text-[var(--c-ink)]\">sibling-index()</code> — the listening state for Yumplatok voice capture.</p>"], _tmpl$19 = ["<p", " class=\"text-[0.8125rem] text-[var(--c-muted)]\">Zone status by day — swipe through the week.</p>"], _tmpl$20 = ["<p", " class=\"text-[0.8125rem] text-[var(--c-muted)]\">The species column stays pinned while the quarters scroll — tap a species for detail.</p>"], _tmpl$21 = [
	"<main",
	" class=\"flex flex-1 flex-col divide-y divide-[var(--c-line)] pb-28\"><div class=\"px-4 pb-2 pt-5\"><!--$-->",
	"<!--/--><h1 class=\"mt-2 font-display text-3xl font-medium leading-tight text-[var(--c-ink)]\">A warm, sunlight-readable kit for <span class=\"text-[var(--c-sea)]\">saltwater country</span>.</h1><p class=\"mt-3 text-[0.9375rem] leading-relaxed text-[var(--c-muted)]\">Light, high-contrast, touch-first — every control is thumb-sized, and the flashier pieces lean on the 2026 platform while degrading cleanly on older phones.</p></div><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><div class=\"bg-[var(--c-bg-2)] px-4 py-4\"><!--$-->",
	"<!--/--><p class=\"mt-1 text-[0.875rem] text-[var(--c-muted)]\">Each tab’s signature technique, reimagined for the Torres Strait.</p></div><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></main>"
], _tmpl$22 = [
	"<div",
	" class=\"flex flex-col gap-3 py-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$23 = ["<p", " class=\"py-2 text-[0.9375rem] text-[var(--c-muted)]\">This can’t be undone. Your draft will be removed from this phone and from AFMA.</p>"], _tmpl$24 = [
	"<div",
	" class=\"tide-in flex items-center gap-3 px-4 py-3\"><!--$-->",
	"<!--/--><p class=\"flex-1 text-[0.875rem] text-[var(--c-muted)]\"><span class=\"font-medium text-[var(--c-ink)]\">",
	"</span> <!--$-->",
	"<!--/--> <span class=\"text-[var(--c-ink)]\">",
	"</span></p></div>"
], _tmpl$25 = [
	"<div",
	" class=\"flex flex-col gap-3 py-2\"><div class=\"flex items-center gap-3\"><!--$-->",
	"<!--/--><div><p class=\"font-display text-lg font-medium text-[var(--c-ink)]\">",
	"</p><p class=\"font-data text-[0.75rem] text-[var(--c-faint)]\">",
	"</p></div></div><!--$-->",
	"<!--/--></div>"
];
function Section(props) {
	var _v$ = ssrHydrationKey(), _v$2 = escape(Show({
		get when() {
			return props.eyebrow;
		},
		get children() {
			return Eyebrow({ get children() {
				return props.eyebrow;
			} });
		}
	})), _v$3 = () => escape(props.title), _v$4 = () => escape(props.children);
	return ssr(_tmpl$, _v$, _v$2, _v$3, _v$4);
}
var TODAY = {
	y: 2026,
	m: 5,
	d: 22
};
var SEASON_DAYS = [
	{
		label: "Sat 20",
		status: "open"
	},
	{
		label: "Sun 21",
		status: "open"
	},
	{
		label: "Mon 22",
		status: "restricted",
		today: true
	},
	{
		label: "Tue 23",
		status: "restricted"
	},
	{
		label: "Wed 24",
		status: "closed"
	},
	{
		label: "Thu 25",
		status: "closed"
	},
	{
		label: "Fri 26",
		status: "open"
	},
	{
		label: "Sat 27",
		status: "open"
	}
];
var MATRIX_ROWS = [
	{
		key: "trl",
		label: "Tropical Rock Lobster",
		sublabel: "CAAB 28 · TIB pool",
		color: "var(--c-coral)"
	},
	{
		key: "mackerel",
		label: "Spanish Mackerel",
		sublabel: "CAAB 37445",
		color: "var(--c-sea)"
	},
	{
		key: "prawn",
		label: "Torres Strait Prawn",
		sublabel: "days of effort",
		color: "var(--c-reef)"
	},
	{
		key: "beche",
		label: "Bêche-de-mer",
		sublabel: "sea cucumber",
		color: "var(--c-sun)"
	}
];
var MATRIX_COLS = [
	{
		key: "q1",
		label: "Q1"
	},
	{
		key: "q2",
		label: "Q2",
		highlight: true
	},
	{
		key: "q3",
		label: "Q3"
	},
	{
		key: "q4",
		label: "Q4"
	}
];
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0) % 100;
}
var PULSE = [
	{
		who: "Elder Gabai",
		verb: "attested",
		what: "Saibai community",
		color: "var(--c-coral)"
	},
	{
		who: "AFMA · Officer Roy",
		verb: "reviewing",
		what: "TIB application #2231",
		color: "var(--c-sea)"
	},
	{
		who: "Mooki",
		verb: "logged catch",
		what: "14kg TRL · Warul Kawa",
		color: "var(--c-reef)"
	},
	{
		who: "PZJA",
		verb: "opened",
		what: "Prawn season — Zone 3",
		color: "var(--c-sun)"
	}
];
var TIMELINE = [
	{
		key: "draft",
		label: "Started on your phone",
		description: "Saved here, works offline.",
		meta: "Mon 22 Jun · 9:14am"
	},
	{
		key: "submitted",
		label: "Sent to AFMA",
		description: "Lodged when you got signal.",
		meta: "Mon 22 Jun · 2:01pm"
	},
	{
		key: "review",
		label: "AFMA is checking it",
		description: "An officer is reviewing your details.",
		meta: "In progress"
	},
	{
		key: "decision",
		label: "Decision",
		description: "You’ll be told here and by SMS."
	}
];
function UiShowcase() {
	var _v$7, _v$8, _v$9, _v$0, _v$1, _v$10, _v$11, _v$12, _v$13, _v$14, _v$15, _v$17, _v$18, _v$19, _v$20, _v$21, _v$22, _v$23, _v$24, _v$25, _v$26, _v$28, _v$29, _v$30, _v$31, _v$32, _v$33, _v$34, _v$37, _v$39, _v$40, _v$41, _v$45, _v$46, _v$44, _v$47, _v$48, _v$49, _v$50, _v$52, _v$53, _v$54, _v$55, _v$56, _v$57, _v$58, _v$60, _v$63, _v$5, _v$6, _v$16, _v$27, _v$35, _v$36, _v$38, _v$42, _v$43, _v$51, _v$59, _v$61, _v$62, _v$64, _v$65, _v$66, _v$67, _v$68, _v$69, _v$70, _v$71;
	const [seg, setSeg] = createSignal("guide");
	const [licence, setLicence] = createSignal("s19_2");
	const [fisheries, setFisheries] = createSignal(["trl"]);
	const [remember, setRemember] = createSignal(true);
	const [date, setDate] = createSignal();
	const [listening, setListening] = createSignal(false);
	const [sheetOpen, setSheetOpen] = createSignal(false);
	const [confirmOpen, setConfirmOpen] = createSignal(false);
	const [rowSheet, setRowSheet] = createSignal(null);
	const [step, setStep] = createSignal(2);
	const advance = () => setStep((s) => (s + 1) % (TIMELINE.length + 1));
	return AppShell({ get children() {
		return [
			AppBar({
				title: "Tide",
				subtitle: "AFMA Torres Strait design system",
				get trailing() {
					return IconButton({
						icon: "search",
						label: "Search components",
						variant: "ghost"
					});
				}
			}),
			(_v$5 = ssrHydrationKey(), _v$6 = escape(Eyebrow({ children: "Built for the boat, not the desk" })), _v$16 = escape(Section({
				eyebrow: "Foundations",
				title: "Buttons & actions",
				get children() {
					return [(_v$7 = ssrHydrationKey(), _v$8 = escape(Button({ children: "Lodge" })), _v$9 = escape(Button({
						variant: "secondary",
						children: "Save draft"
					})), _v$0 = escape(Button({
						variant: "ghost",
						iconLeft: "help",
						children: "Help"
					})), _v$1 = escape(Button({
						variant: "subtle",
						children: "Later"
					})), _v$10 = escape(Button({
						variant: "danger",
						iconLeft: "x",
						children: "Withdraw"
					})), ssr(_tmpl$2, _v$7, _v$8, _v$9, _v$0, _v$1, _v$10)), (_v$11 = ssrHydrationKey(), _v$12 = escape(Button({
						size: "sm",
						children: "Small"
					})), _v$13 = escape(Button({
						size: "lg",
						iconRight: "arrow-right",
						children: "Large continue"
					})), _v$14 = escape(Button({
						loading: true,
						children: "Sending"
					})), _v$15 = escape(IconButton({
						icon: "mic",
						label: "Voice",
						variant: "secondary"
					})), ssr(_tmpl$3, _v$11, _v$12, _v$13, _v$14, _v$15))];
				}
			})), _v$27 = escape(Section({
				eyebrow: "Foundations",
				title: "Status & identity",
				get children() {
					return [
						(_v$17 = ssrHydrationKey(), _v$18 = escape(Chip({
							tone: "reef",
							solid: true,
							children: "Granted"
						})), _v$19 = escape(Chip({
							tone: "sun",
							solid: true,
							children: "Under review"
						})), _v$20 = escape(Chip({
							tone: "ember",
							solid: true,
							children: "Refused"
						})), _v$21 = escape(Chip({
							tone: "sea",
							children: "TIB sector"
						})), _v$22 = escape(Chip({
							tone: "coral",
							children: "Native title"
						})), _v$23 = escape(Chip({ children: "Draft" })), ssr(_tmpl$4, _v$17, _v$18, _v$19, _v$20, _v$21, _v$22, _v$23)),
						(_v$24 = ssrHydrationKey(), _v$25 = escape(StatusDot({
							color: "var(--c-reef)",
							live: true
						})), _v$26 = escape(AvatarStack({
							people: [
								{
									name: "Mooki Stephen",
									color: "var(--c-coral)"
								},
								{
									name: "Roy Mosby",
									color: "var(--c-sea)"
								},
								{
									name: "Aka Lui",
									color: "var(--c-reef)"
								},
								{
									name: "Gabai Tom",
									color: "var(--c-sun)"
								},
								{
									name: "Ena Nai",
									color: "var(--c-coral)"
								}
							],
							max: 4
						})), ssr(_tmpl$5, _v$24, _v$25, _v$26)),
						Card({
							flush: true,
							get children() {
								return [
									ListRow({
										leadingIcon: "user",
										label: "Mooki Stephen",
										sublabel: "Saibai Island · Traditional Inhabitant",
										get value() {
											return Chip({
												tone: "reef",
												children: "Eligible"
											});
										}
									}),
									Divider({}),
									ListRow({
										leadingIcon: "document",
										label: "TIB application",
										sublabel: "s.19(2) boat commercial",
										onClick: () => setSheetOpen(true)
									})
								];
							}
						})
					];
				}
			})), _v$35 = escape(Section({
				eyebrow: "Forms · the heart of the application flow",
				title: "Inputs people can actually use",
				get children() {
					return [
						TextField({
							label: "Full name",
							placeholder: "Your name",
							leadingIcon: "user",
							value: "",
							onInput: () => {}
						}),
						DateField({
							label: "When did you start fishing this season?",
							get value() {
								return date();
							},
							onChange: setDate,
							today: TODAY,
							hint: "Tap to pick a date — opens a thumb-friendly sheet."
						}),
						Select({
							label: "Island community",
							value: "saibai",
							onChange: () => {},
							hint: "Your home community (PBC / native-title group).",
							get children() {
								return [
									(_v$28 = ssrHydrationKey(), ssr(_tmpl$6, _v$28)),
									(_v$29 = ssrHydrationKey(), ssr(_tmpl$7, _v$29)),
									(_v$30 = ssrHydrationKey(), ssr(_tmpl$8, _v$30)),
									(_v$31 = ssrHydrationKey(), ssr(_tmpl$9, _v$31))
								];
							}
						}),
						TextArea({
							label: "Anything else AFMA should know?",
							optional: true,
							placeholder: "You can also use the voice button below",
							value: "",
							onInput: () => {}
						}),
						(_v$32 = ssrHydrationKey(), _v$33 = escape(VoiceButton({
							get listening() {
								return listening();
							},
							onPress: () => setListening((v) => !v)
						})), _v$34 = escape(Toggle({
							get checked() {
								return remember();
							},
							onChange: setRemember,
							label: "Remember me on this phone"
						})), ssr(_tmpl$0, _v$32, _v$33, _v$34))
					];
				}
			})), _v$36 = escape(Section({
				eyebrow: "Forms · big-tap-target choices",
				title: "Pick a licence",
				get children() {
					return [ChoiceGroup({
						label: "Licence type",
						get value() {
							return licence();
						},
						onChange: setLicence,
						hint: "The statutory s.19 family — plain-language names, with detail a tap away.",
						get children() {
							return [
								ChoiceCard({
									value: "s19_1",
									icon: "anchor",
									label: "Master fisherman",
									description: "s.19(1) — you run the fishing."
								}),
								ChoiceCard({
									value: "s19_2",
									icon: "fish",
									label: "Boat (commercial)",
									description: "s.19(2) — a boat used for commercial fishing."
								}),
								ChoiceCard({
									value: "s19_4a",
									icon: "document",
									label: "Non-boat commercial",
									description: "s.19(4a) — commercial take without a boat."
								})
							];
						}
					}), ChoiceGroup({
						multiple: true,
						label: "Which fisheries?",
						get values() {
							return fisheries();
						},
						onValuesChange: setFisheries,
						hint: "Choose all that apply.",
						get children() {
							return [
								ChoiceCard({
									value: "trl",
									label: "Tropical Rock Lobster",
									description: "TIB competitive pool"
								}),
								ChoiceCard({
									value: "mackerel",
									label: "Spanish Mackerel"
								}),
								ChoiceCard({
									value: "prawn",
									label: "Torres Strait Prawn",
									description: "days of effort"
								})
							];
						}
					})];
				}
			})), _v$38 = escape(Section({
				eyebrow: "Forms · guidance",
				title: "Help that meets you where you are",
				get children() {
					return [
						Callout({
							tone: "info",
							title: "Who can hold a TIB licence?",
							children: "Community fishing (TIB) is commercial fishing by Traditional Inhabitants. Eligibility is attested by your councillor and mayor — we’ll guide you through it."
						}),
						Callout({
							tone: "warning",
							title: "Dugong & turtle",
							children: "Traditional take is permitted under native title — it isn’t a quota and doesn’t need this licence. You can still record it for your community."
						}),
						Accordion({
							summary: "What does ‘held in trust’ mean?",
							icon: "help",
							get children() {
								return [
									"Some licences are held in trust by the TSRA / Gur A Baradharaw Kod on behalf of a group. The right to fish is communal (per ",
									(_v$37 = ssrHydrationKey(), ssr(_tmpl$1, _v$37)),
									"); the commercial licence is exercised by a person."
								];
							}
						})
					];
				}
			})), _v$42 = escape(Section({
				eyebrow: "Forms · switch view",
				title: "Segmented control & sheets",
				get children() {
					return [SegmentedControl({
						options: [{
							id: "guide",
							label: "Guide me"
						}, {
							id: "apply",
							label: "I know what I need"
						}],
						get value() {
							return seg();
						},
						onChange: (v) => setSeg(v),
						ariaLabel: "Application mode"
					}), (_v$39 = ssrHydrationKey(), _v$40 = escape(Button({
						variant: "secondary",
						iconLeft: "info",
						onClick: () => setSheetOpen(true),
						children: "Open bottom sheet"
					})), _v$41 = escape(Button({
						variant: "secondary",
						onClick: () => setConfirmOpen(true),
						children: "Confirm dialog"
					})), ssr(_tmpl$10, _v$39, _v$40, _v$41))];
				}
			})), _v$43 = escape(Eyebrow({ children: "Adapted from the playground dashboard" })), _v$51 = escape(Section({
				eyebrow: "Overview → On the water",
				title: "Live presence & figures",
				get children() {
					return [(_v$44 = ssrHydrationKey(), _v$47 = escape(ProgressRing({
						value: 62,
						size: 92,
						tone: "var(--c-sea)",
						label: "Application 62% complete",
						get children() {
							return [(_v$45 = ssrHydrationKey(), ssr(_tmpl$11, _v$45)), (_v$46 = ssrHydrationKey(), ssr(_tmpl$12, _v$46))];
						}
					})), _v$48 = escape(Stat({
						value: 4280,
						label: "TRL quota kg left",
						animate: true
					})), _v$49 = escape(Sparkline({
						data: [
							180,
							220,
							200,
							260,
							240,
							320,
							300,
							360,
							410,
							428
						],
						color: "var(--c-coral)",
						fill: true
					})), _v$50 = escape(ProgressBar({
						value: 62,
						label: "Season used"
					})), ssr(_tmpl$13, _v$44, _v$47, _v$48, _v$49, _v$50)), Card({
						flush: true,
						get children() {
							return For({
								each: PULSE,
								children: (p, i) => {
									var _v$72, _v$73, _v$74, _v$75, _v$76;
									return [Show({
										get when() {
											return i() > 0;
										},
										get children() {
											return Divider({});
										}
									}), (_v$72 = ssrHydrationKey(), _v$73 = escape(StatusDot({
										get color() {
											return p.color;
										},
										get live() {
											return i() < 2;
										}
									})), _v$74 = () => escape(p.who), _v$75 = () => escape(p.verb), _v$76 = () => escape(p.what), ssr(_tmpl$24, _v$72, _v$73, _v$74, _v$75, _v$76))];
								}
							});
						}
					})];
				}
			})), _v$59 = escape(Section({
				eyebrow: "Lab → toolkit",
				title: "Swipe to learn, speak to log",
				get children() {
					return [Carousel({ get children() {
						return [
							CarouselSlide({
								from: "#0a6c74",
								to: "#074f56",
								get liveBadge() {
									return "● Step 1";
								},
								get children() {
									return _v$52 = ssrHydrationKey(), ssr(_tmpl$14, _v$52);
								}
							}),
							CarouselSlide({
								from: "#d6573a",
								to: "#a93c25",
								get children() {
									return _v$53 = ssrHydrationKey(), ssr(_tmpl$15, _v$53);
								}
							}),
							CarouselSlide({
								from: "#2f8f5b",
								to: "#1d6e42",
								get children() {
									return _v$54 = ssrHydrationKey(), ssr(_tmpl$16, _v$54);
								}
							})
						];
					} }), Card({ get children() {
						return [(_v$55 = ssrHydrationKey(), _v$56 = escape(EqualizerBars({
							get active() {
								return listening();
							},
							count: 24,
							height: 44,
							"class": "flex-1",
							color: "var(--c-coral)"
						})), _v$57 = escape(VoiceButton({
							get listening() {
								return listening();
							},
							onPress: () => setListening((v) => !v)
						})), ssr(_tmpl$17, _v$55, _v$56, _v$57)), (_v$58 = ssrHydrationKey(), ssr(_tmpl$18, _v$58))];
					} })];
				}
			})), _v$61 = escape(Section({
				eyebrow: "Schedule → seasons",
				title: "Can I fish here, now?",
				get children() {
					return [SeasonStrip({ days: SEASON_DAYS }), (_v$60 = ssrHydrationKey(), ssr(_tmpl$19, _v$60))];
				}
			})), _v$62 = escape(Section({
				eyebrow: "Board → track it",
				title: "Your application",
				get children() {
					return Card({ get children() {
						return [StatusTimeline({
							steps: TIMELINE,
							get current() {
								return Math.min(step(), TIMELINE.length - 1);
							}
						}), Button({
							block: true,
							variant: "secondary",
							iconRight: "arrow-right",
							onClick: advance,
							"class": "mt-2",
							children: "Advance status (demo)"
						})];
					} });
				}
			})), _v$64 = escape(Section({
				eyebrow: "Roster → entitlements",
				title: "Quota at a glance",
				get children() {
					return [QuotaMatrix({
						rows: MATRIX_ROWS,
						columns: MATRIX_COLS,
						cornerLabel: "Species",
						onRowSelect: (k) => setRowSheet(k),
						cell: (r, c) => {
							const v = hash(`${r}-${c}`);
							const row = MATRIX_ROWS.find((x) => x.key === r);
							return {
								value: String(v),
								color: row?.color,
								intensity: .15 + v / 100 * .6,
								title: `${r} ${c}: ${v}`
							};
						}
					}), (_v$63 = ssrHydrationKey(), ssr(_tmpl$20, _v$63))];
				}
			})), _v$65 = escape(Section({
				eyebrow: "Wall → guidance",
				title: "Saved drafts & notices",
				get children() {
					return Masonry({
						min: 150,
						get children() {
							return [
								PinNote({
									pinned: true,
									priority: "high",
									kind: {
										label: "Decision",
										color: "var(--c-coral)"
									},
									title: "Your TIB draft",
									tags: ["draft", "offline"],
									children: "Saved on this phone. It’ll send itself when you get signal."
								}),
								PinNote({
									kind: {
										label: "Notice",
										color: "var(--c-sea)"
									},
									title: "Prawn season opens Fri",
									tags: ["zone 3"],
									children: "Days-of-effort fishery. Log each night at sea."
								}),
								PinNote({
									kind: {
										label: "Help",
										color: "var(--c-reef)"
									},
									title: "What is a CDR?",
									children: "A Catch Disposal Record — the verified landed weight your quota is counted from."
								}),
								PinNote({
									priority: "low",
									kind: {
										label: "Idea",
										color: "var(--c-sun)"
									},
									title: "Add your boat later",
									children: "You can nominate a vessel after the licence is granted."
								})
							];
						}
					});
				}
			})), ssr(_tmpl$21, _v$5, _v$6, _v$16, _v$27, _v$35, _v$36, _v$38, _v$42, _v$43, _v$51, _v$59, _v$61, _v$62, _v$64, _v$65)),
			BottomBar({ get children() {
				return Button({
					block: true,
					size: "lg",
					iconRight: "arrow-right",
					children: "Start an application"
				});
			} }),
			Sheet({
				get open() {
					return sheetOpen();
				},
				onClose: () => setSheetOpen(false),
				title: "Lodge this application?",
				get footer() {
					return [Button({
						block: true,
						size: "lg",
						iconRight: "send",
						onClick: () => setSheetOpen(false),
						children: "Lodge now"
					}), Button({
						block: true,
						variant: "ghost",
						onClick: () => setSheetOpen(false),
						children: "Keep editing"
					})];
				},
				get children() {
					return _v$66 = ssrHydrationKey(), _v$67 = escape(Callout({
						tone: "info",
						children: "Once lodged, AFMA will review your application. You can still track it here."
					})), _v$68 = escape(ListRow({
						leadingIcon: "user",
						label: "Applicant",
						value: "Mooki Stephen"
					})), _v$69 = escape(ListRow({
						leadingIcon: "document",
						label: "Licence",
						value: "TIB · s.19(2)"
					})), _v$70 = escape(ListRow({
						leadingIcon: "location",
						label: "Community",
						value: "Saibai"
					})), ssr(_tmpl$22, _v$66, _v$67, _v$68, _v$69, _v$70);
				}
			}),
			Sheet({
				get open() {
					return confirmOpen();
				},
				onClose: () => setConfirmOpen(false),
				variant: "center",
				title: "Withdraw application?",
				get footer() {
					return [Button({
						block: true,
						variant: "danger",
						onClick: () => setConfirmOpen(false),
						children: "Withdraw"
					}), Button({
						block: true,
						variant: "ghost",
						onClick: () => setConfirmOpen(false),
						children: "Cancel"
					})];
				},
				get children() {
					return _v$71 = ssrHydrationKey(), ssr(_tmpl$23, _v$71);
				}
			}),
			Sheet({
				get open() {
					return rowSheet() !== null;
				},
				onClose: () => setRowSheet(null),
				title: "Entitlement",
				get children() {
					return Show({
						get when() {
							return MATRIX_ROWS.find((r) => r.key === rowSheet());
						},
						children: (row) => {
							var _v$77, _v$78, _v$79, _v$80, _v$81;
							return _v$77 = ssrHydrationKey(), _v$78 = escape(Avatar({
								get name() {
									return row().label;
								},
								get color() {
									return row().color;
								}
							})), _v$79 = () => escape(row().label), _v$80 = () => escape(row().sublabel), _v$81 = escape(Callout({
								tone: "neutral",
								children: "On a phone there’s no hover, so the Roster’s hover-card becomes a tap-through sheet."
							})), ssr(_tmpl$25, _v$77, _v$78, _v$79, _v$80, _v$81);
						}
					});
				}
			})
		];
	} });
}
//#endregion
export { UiShowcase as component };
