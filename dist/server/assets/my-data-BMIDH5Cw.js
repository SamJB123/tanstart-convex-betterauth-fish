import { b as Show, f as ssrHydrationKey, g as For, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { t as api } from "./api-Da-6fpXv.js";
import { i as useQuery } from "./convex-solid-D4B1E5hU.js";
import { c as Divider, i as ListRow, l as Eyebrow, n as Card, s as Chip } from "./surface-iaHzS8iU.js";
import { n as AppShell, t as AppBar } from "./shell-D6eh7HIb.js";
//#region src/routes/_authed/my-data.tsx?tsr-split=component
var _tmpl$ = [
	"<main",
	" class=\"flex flex-1 flex-col gap-6 px-4 pb-24 pt-4\"><section><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></section><section><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></section></main>"
], _tmpl$2 = ["<span", " class=\"font-display\">What's held about you</span>"], _tmpl$3 = ["<p", " class=\"mt-2 text-[0.875rem] text-[var(--c-muted)]\">No consents recorded yet.</p>"], _tmpl$4 = ["<p", " class=\"mt-2 text-[0.875rem] text-[var(--c-muted)]\">No activity recorded yet.</p>"], _tmpl$5 = [
	"<span",
	" class=\"font-data text-[0.6875rem] text-[var(--c-faint)]\">",
	"</span>"
];
var ACTION_LABEL = {
	lodge: "Your application was lodged",
	consent_request: "Someone asked for your consent",
	consent_confirm: "You confirmed your consent",
	consent_revoke: "You withdrew your consent",
	consent_decline: "You declined consent",
	edit: "Your details were updated",
	view: "Your information was viewed",
	export: "Your information was exported",
	disclose: "Your information was shared"
};
function MyDataRoute() {
	var _v$, _v$2, _v$3, _v$4, _v$5;
	const data = useQuery(api.governance.consent.transparencyView, {});
	const consents = () => data.data()?.consents ?? [];
	const log = () => data.data()?.accessLog ?? [];
	const fmt = (n) => new Date(n).toLocaleString();
	return AppShell({ get children() {
		return [AppBar({
			get title() {
				return ssr(_tmpl$2, ssrHydrationKey());
			},
			subtitle: "Your information & who has looked at it"
		}), (_v$ = ssrHydrationKey(), _v$2 = escape(Eyebrow({ children: "Your consents" })), _v$3 = escape(Show({
			get when() {
				return consents().length;
			},
			get fallback() {
				return ssr(_tmpl$3, ssrHydrationKey());
			},
			get children() {
				return Card({
					flush: true,
					"class": "mt-2",
					get children() {
						return For({
							get each() {
								return consents();
							},
							children: (c, i) => [Show({
								get when() {
									return i() > 0;
								},
								get children() {
									return Divider({});
								}
							}), ListRow({
								leadingIcon: "shield",
								get label() {
									return c.consentType === "data_use" ? "Using your information" : "Letting someone help you";
								},
								get sublabel() {
									return `Asked ${fmt(c.requestedAt)}`;
								},
								get value() {
									return Chip({
										get tone() {
											return c.status === "confirmed" ? "reef" : c.status === "revoked" || c.status === "declined" ? "ember" : "sun";
										},
										solid: true,
										get children() {
											return c.status;
										}
									});
								}
							})]
						});
					}
				});
			}
		})), _v$4 = escape(Eyebrow({ children: "Who has looked at your information" })), _v$5 = escape(Show({
			get when() {
				return log().length;
			},
			get fallback() {
				return ssr(_tmpl$4, ssrHydrationKey());
			},
			get children() {
				return Card({
					flush: true,
					"class": "mt-2",
					get children() {
						return For({
							get each() {
								return log();
							},
							children: (e, i) => [Show({
								get when() {
									return i() > 0;
								},
								get children() {
									return Divider({});
								}
							}), ListRow({
								leadingIcon: "clock",
								get label() {
									return e.action && ACTION_LABEL[e.action] || e.action || "Activity";
								},
								get sublabel() {
									return e.reason;
								},
								get value() {
									var _v$9 = ssrHydrationKey(), _v$0 = () => escape(fmt(e.at));
									return ssr(_tmpl$5, _v$9, _v$0);
								}
							})]
						});
					}
				});
			}
		})), ssr(_tmpl$, _v$, _v$2, _v$3, _v$4, _v$5))];
	} });
}
//#endregion
export { MyDataRoute as component };
