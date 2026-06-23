import { b as Show, f as ssrHydrationKey, g as For, i as memo, m as ssrStyleProperty, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { t as useRouteContext } from "./useRouteContext-2irNSrd3.js";
import { t as useNavigate } from "./useNavigate-aK7gQTP2.js";
import { t as api } from "./api-Da-6fpXv.js";
import { i as useQuery } from "./convex-solid-D4B1E5hU.js";
import { i as LICENCE_TYPES, l as useDrafts, u as useSession } from "./copy-Bdf1xtqi.js";
import { t as authClient } from "./auth-client-badX6t3o.js";
import { c as Divider, g as Icon, i as ListRow, l as Eyebrow, n as Card, p as Button, r as EmptyState, s as Chip } from "./surface-iaHzS8iU.js";
import { n as AppShell, t as AppBar } from "./shell-D6eh7HIb.js";
//#region src/routes/_authed/dashboard.tsx?tsr-split=component
var _tmpl$ = [
	"<p",
	" class=\"text-[0.9375rem] text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$2 = [
	"<section",
	"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></section>"
], _tmpl$3 = [
	"<main",
	" class=\"flex flex-1 flex-col gap-7 px-4 pb-24 pt-4\"><section class=\"tide-rise relative overflow-clip rounded-[var(--r-xl)] px-5 py-6 text-[var(--c-on-sea)]\" style=\"",
	"\"><div aria-hidden=\"true\" class=\"pointer-events-none absolute -right-6 -top-6 opacity-20\">",
	"</div><p class=\"font-data text-[0.6875rem] font-semibold uppercase tracking-[0.16em] opacity-80\">",
	"</p><h1 class=\"mt-1 font-display text-[1.625rem] font-medium leading-tight\">",
	"</h1><p class=\"mt-2 max-w-[20rem] text-[0.9375rem] leading-relaxed opacity-90\">",
	"</p><!--$-->",
	"<!--/--></section><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><section><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></section><!--$-->",
	"<!--/--></main>"
], _tmpl$4 = ["<span", " class=\"font-display\">Home</span>"];
var STATUS = {
	draft: {
		label: "Draft",
		tone: "neutral"
	},
	submitted: {
		label: "Lodged",
		tone: "sea"
	},
	under_review: {
		label: "Under review",
		tone: "sun"
	},
	info_requested: {
		label: "Info needed",
		tone: "coral"
	},
	granted: {
		label: "Granted",
		tone: "reef"
	},
	refused: {
		label: "Refused",
		tone: "ember"
	}
};
var licenceName = (code) => LICENCE_TYPES.find((l) => l.code === code)?.name ?? "Licence application";
function DashboardRoute() {
	var _v$7, _v$8, _v$0, _v$1, _v$10, _v$, _v$2, _v$3, _v$4, _v$5, _v$6, _v$9, _v$11, _v$12, _v$13, _v$14;
	const navigate = useNavigate();
	const context = useRouteContext({ from: "/_authed" });
	const session = useSession();
	const user = () => session().data?.user ?? context().user;
	const firstName = () => (user()?.name ?? "").trim().split(/\s+/)[0] || "there";
	const drafts = useDrafts();
	const inProgress = () => (drafts() ?? []).filter((d) => d.status !== "lodged");
	const apps = useQuery(api.licensing.applications.listMine, {});
	const pending = useQuery(api.governance.consent.myPendingConsents, {});
	const greeting = () => {
		const h = (/* @__PURE__ */ new Date()).getHours();
		return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
	};
	const handleSignOut = async () => {
		await authClient.signOut();
		navigate({ to: "/" });
	};
	return AppShell({ get children() {
		return [AppBar({
			get title() {
				return ssr(_tmpl$4, ssrHydrationKey());
			},
			subtitle: "AFMA Torres Strait",
			get trailing() {
				return Button({
					variant: "ghost",
					size: "sm",
					onClick: handleSignOut,
					children: "Sign out"
				});
			}
		}), (_v$ = ssrHydrationKey(), _v$2 = escape(Icon({
			name: "waves",
			size: 120
		})), _v$3 = () => escape(greeting()), _v$4 = () => escape(firstName()), _v$5 = escape(Show({
			get when() {
				return inProgress().length > 0;
			},
			fallback: "Ready to apply for a fishing licence? It only takes a few minutes.",
			children: "You have an application on the way. Pick up where you left off."
		})), _v$6 = escape(Button({
			"class": "mt-4 w-full sm:w-auto",
			variant: "secondary",
			size: "lg",
			iconRight: "arrow-right",
			onClick: () => navigate({ to: "/apply" }),
			get children() {
				return Show({
					get when() {
						return inProgress().length > 0;
					},
					fallback: "Start an application",
					children: "Continue your application"
				});
			}
		})), _v$9 = escape(Show({
			get when() {
				return (pending.data() ?? []).length > 0;
			},
			get children() {
				return Card({
					"class": "tide-rise",
					accent: "var(--c-sun)",
					title: "Someone needs you to say yes",
					get action() {
						return Button({
							variant: "secondary",
							size: "sm",
							iconRight: "arrow-right",
							onClick: () => navigate({ to: "/confirm" }),
							children: "Review"
						});
					},
					get children() {
						return _v$7 = ssrHydrationKey(), _v$8 = (() => {
							var _c$ = memo(() => (pending.data() ?? []).length === 1);
							return () => _c$() ? "One consent request is waiting for you. Only you can say yes." : `${escape((pending.data() ?? []).length)} consent requests are waiting for you. Only you can say yes.`;
						})(), ssr(_tmpl$, _v$7, _v$8);
					}
				});
			}
		})), _v$11 = escape(Show({
			get when() {
				return inProgress().length > 0;
			},
			get children() {
				return _v$0 = ssrHydrationKey(), _v$1 = escape(Eyebrow({ children: "On the way" })), _v$10 = escape(Card({
					flush: true,
					"class": "mt-2",
					get children() {
						return For({
							get each() {
								return inProgress();
							},
							children: (d, i) => [Show({
								get when() {
									return i() > 0;
								},
								get children() {
									return Divider({});
								}
							}), ListRow({
								leadingIcon: "document",
								get label() {
									return d.fisher.name ? `${d.fisher.name} · ${licenceName(d.licenceTypeCode)}` : licenceName(d.licenceTypeCode);
								},
								get sublabel() {
									return d.mode === "delegate" ? "You are helping with this one" : "Your application";
								},
								get value() {
									return Chip({
										tone: "sea",
										children: "Draft"
									});
								},
								onClick: () => navigate({ to: "/apply" })
							})]
						});
					}
				})), ssr(_tmpl$2, _v$0, _v$1, _v$10);
			}
		})), _v$12 = escape(Eyebrow({ children: "Your applications" })), _v$13 = escape(Show({
			get when() {
				return (apps.data() ?? []).length > 0;
			},
			get fallback() {
				return Card({
					"class": "mt-2",
					get children() {
						return EmptyState({
							icon: "fish",
							title: "No applications yet",
							description: "When you lodge a licence application, it'll appear here so you can track it."
						});
					}
				});
			},
			get children() {
				return Card({
					flush: true,
					"class": "mt-2",
					get children() {
						return For({
							get each() {
								return apps.data();
							},
							children: (app, i) => {
								const s = () => STATUS[app.status] ?? {
									label: app.status,
									tone: "neutral"
								};
								return [Show({
									get when() {
										return i() > 0;
									},
									get children() {
										return Divider({});
									}
								}), ListRow({
									leadingIcon: "shield",
									get label() {
										return licenceName(app.licenceTypeCode);
									},
									get sublabel() {
										return `Lodged ${new Date(app._creationTime).toLocaleDateString()}`;
									},
									get value() {
										return Chip({
											get tone() {
												return s().tone;
											},
											solid: true,
											get children() {
												return s().label;
											}
										});
									}
								})];
							}
						});
					}
				});
			}
		})), _v$14 = escape(ListRow({
			"class": "rounded-[var(--r-lg)] bg-[var(--c-surface)] px-4 shadow-[inset_0_0_0_1px_var(--c-line)]",
			leadingIcon: "search",
			label: "What's held about you",
			sublabel: "Your information & who has looked at it",
			onClick: () => navigate({ to: "/my-data" })
		})), ssr(_tmpl$3, _v$, ssrStyleProperty("background:", "radial-gradient(120% 90% at 90% -20%, color-mix(in oklab, var(--c-reef) 55%, transparent), transparent 60%), linear-gradient(150deg, var(--c-sea) 0%, var(--c-sea-deep) 100%)") + ssrStyleProperty(";box-shadow:", "0 16px 36px -18px color-mix(in oklab, var(--c-sea) 80%, transparent)"), _v$2, _v$3, _v$4, _v$5, _v$6, _v$9, _v$11, _v$12, _v$13, _v$14))];
	} });
}
//#endregion
export { DashboardRoute as component };
