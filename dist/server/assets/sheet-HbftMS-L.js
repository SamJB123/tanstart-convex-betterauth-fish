import { b as Show, c as ssrAttribute, d as ssrGroup, f as ssrHydrationKey, k as createUniqueId, l as ssrClassName, r as escape, s as ssr, w as createEffect } from "./server-Bjhk73rZ.js";
import { _ as cn, m as IconButton } from "./surface-iaHzS8iU.js";
//#region src/ui/vt.ts
function prefersReducedMotion() {
	return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
/**
* Run `update` inside a document-level view transition. `types` are exposed to
* CSS as `:active-view-transition-type(...)` so one transition can branch its
* animation (e.g. a wizard sliding `forward` vs `back`).
*/
function withViewTransition(update, types) {
	if (typeof document === "undefined" || prefersReducedMotion() || !("startViewTransition" in document)) {
		update();
		return;
	}
	const start = document.startViewTransition;
	if (types && types.length) try {
		start.call(document, {
			update,
			types
		});
		return;
	} catch {}
	start.call(document, update);
}
//#endregion
//#region src/ui/sheet.tsx
var _tmpl$ = ["<div", " class=\"tide-grabber\" aria-hidden=\"true\"></div>"], _tmpl$2 = [
	"<header",
	" class=\"flex items-center justify-between gap-3 px-5 pb-2 pt-3\"><h2",
	" class=\"font-display text-lg font-medium text-[var(--c-ink)]\">",
	"</h2><!--$-->",
	"<!--/--></header>"
], _tmpl$3 = [
	"<div",
	" class=\"tide-safe-bottom flex flex-col gap-2 border-t border-[var(--c-line)] px-5 pb-4 pt-3\">",
	"</div>"
], _tmpl$4 = [
	"<dialog",
	" class=\"",
	"\"",
	"><div class=\"flex max-h-[92dvh] flex-col\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><div class=\"tide-scroll flex-1 px-5 pb-2 pt-1\">",
	"</div><!--$-->",
	"<!--/--></div></dialog>"
];
function Sheet(props) {
	var _v$4, _v$6, _v$7, _v$8, _v$1, _v$10;
	const titleId = createUniqueId();
	createEffect(() => props.open, (open) => {});
	const dismissible = () => props.dismissible !== false;
	var _v$ = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("tide-sheet", props.variant === "center" && "tide-sheet-center", props.class)), ssrAttribute("aria-labelledby", props.title ? escape(titleId, true) : escape(void 0, true))], 2), _v$5 = escape(Show({
		get when() {
			return props.variant !== "center";
		},
		get children() {
			return _v$4 = ssrHydrationKey(), ssr(_tmpl$, _v$4);
		}
	})), _v$9 = escape(Show({
		get when() {
			return props.title;
		},
		get children() {
			return _v$6 = ssrHydrationKey(), _v$7 = () => escape(props.title), _v$8 = escape(Show({
				get when() {
					return dismissible();
				},
				get children() {
					return IconButton({
						icon: "x",
						label: "Close",
						size: "sm",
						variant: "subtle",
						onClick: () => props.onClose()
					});
				}
			})), ssr(_tmpl$2, _v$6, ssrAttribute("id", escape(titleId, true)), _v$7, _v$8);
		}
	})), _v$0 = () => escape(props.children);
	return ssr(_tmpl$4, _v$, _g$, _g$, _v$5, _v$9, _v$0, escape(Show({
		get when() {
			return props.footer;
		},
		get children() {
			return _v$1 = ssrHydrationKey(), _v$10 = () => escape(props.footer), ssr(_tmpl$3, _v$1, _v$10);
		}
	})));
}
//#endregion
export { withViewTransition as n, Sheet as t };
