import { b as Show, f as ssrHydrationKey, l as ssrClassName, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { _ as cn, m as IconButton } from "./surface-iaHzS8iU.js";
//#region src/ui/shell.tsx
var _tmpl$ = [
	"<div",
	" class=\"tide-dvh flex flex-col bg-[var(--c-bg)]\"><div class=\"",
	"\">",
	"</div></div>"
], _tmpl$2 = [
	"<div",
	" class=\"flex-none\">",
	"</div>"
], _tmpl$3 = [
	"<span",
	" class=\"truncate font-display text-[1.0625rem] font-medium leading-tight text-[var(--c-ink)]\">",
	"</span>"
], _tmpl$4 = [
	"<span",
	" class=\"truncate text-[0.75rem] text-[var(--c-muted)]\">",
	"</span>"
], _tmpl$5 = [
	"<div",
	" class=\"px-4 pb-2.5\">",
	"</div>"
], _tmpl$6 = [
	"<header",
	" class=\"",
	"\"><div class=\"flex min-h-[56px] items-center gap-2 px-2.5\"><!--$-->",
	"<!--/--><div class=\"flex min-w-0 flex-1 flex-col px-1\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div><!--$-->",
	"<!--/--></div><!--$-->",
	"<!--/--></header>"
], _tmpl$7 = [
	"<div",
	" class=\"",
	"\"><div class=\"flex flex-col gap-2 px-4 pt-3\">",
	"</div></div>"
];
function AppShell(props) {
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrClassName(cn("mx-auto flex w-full flex-1 flex-col", props.width === "wide" ? "max-w-3xl" : "max-w-[560px]", props.class)), _v$3 = () => escape(props.children);
	return ssr(_tmpl$, _v$, _v$2, _v$3);
}
function AppBar(props) {
	var _v$6, _v$7, _v$9, _v$0, _v$10, _v$11, _v$13, _v$14, _v$16, _v$17;
	var _v$4 = ssrHydrationKey(), _v$5 = () => ssrClassName(cn("tide-appbar tide-safe-x", props.class));
	return ssr(_tmpl$6, _v$4, _v$5, escape(Show({
		get when() {
			return props.leading ?? props.onBack;
		},
		get children() {
			return _v$6 = ssrHydrationKey(), _v$7 = escape(Show({
				get when() {
					return props.leading;
				},
				get fallback() {
					return IconButton({
						icon: "arrow-left",
						label: "Go back",
						variant: "ghost",
						onClick: () => props.onBack?.()
					});
				},
				get children() {
					return props.leading;
				}
			})), ssr(_tmpl$2, _v$6, _v$7);
		}
	})), escape(Show({
		get when() {
			return props.title;
		},
		get children() {
			return _v$9 = ssrHydrationKey(), _v$0 = () => escape(props.title), ssr(_tmpl$3, _v$9, _v$0);
		}
	})), escape(Show({
		get when() {
			return props.subtitle;
		},
		get children() {
			return _v$10 = ssrHydrationKey(), _v$11 = () => escape(props.subtitle), ssr(_tmpl$4, _v$10, _v$11);
		}
	})), escape(Show({
		get when() {
			return props.trailing;
		},
		get children() {
			return _v$13 = ssrHydrationKey(), _v$14 = () => escape(props.trailing), ssr(_tmpl$2, _v$13, _v$14);
		}
	})), escape(Show({
		get when() {
			return props.below;
		},
		get children() {
			return _v$16 = ssrHydrationKey(), _v$17 = () => escape(props.below), ssr(_tmpl$5, _v$16, _v$17);
		}
	})));
}
function BottomBar(props) {
	var _v$19 = ssrHydrationKey(), _v$20 = () => ssrClassName(cn("tide-bottombar tide-safe-x", props.class)), _v$21 = () => escape(props.children);
	return ssr(_tmpl$7, _v$19, _v$20, _v$21);
}
//#endregion
export { AppShell as n, BottomBar as r, AppBar as t };
