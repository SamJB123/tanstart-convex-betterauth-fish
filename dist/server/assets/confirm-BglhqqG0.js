import { O as createSignal, b as Show, f as ssrHydrationKey, g as For, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { t as api } from "./api-Da-6fpXv.js";
import { i as useQuery, r as useMutation } from "./convex-solid-D4B1E5hU.js";
import { n as Card, p as Button, r as EmptyState, t as Callout } from "./surface-iaHzS8iU.js";
import { n as AppShell, t as AppBar } from "./shell-D6eh7HIb.js";
import { n as DATA_USE_TEXT, r as DELEGATE_AUTHORITY_TEXT } from "./consent-text-BKThfo-S.js";
//#region src/routes/_authed/confirm.tsx?tsr-split=component
var _tmpl$ = ["<strong", ">yourself</strong>"], _tmpl$2 = [
	"<div",
	" class=\"flex flex-col gap-3\">",
	"</div>"
], _tmpl$3 = [
	"<main",
	" class=\"flex-1 px-4 pb-24 pt-3\">",
	"</main>"
], _tmpl$4 = ["<span", " class=\"font-display\">Your consent</span>"], _tmpl$5 = [
	"<p",
	" class=\"text-[0.9375rem] leading-relaxed text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$6 = [
	"<div",
	" class=\"mt-4 flex items-center gap-2\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$7 = ["<div", " class=\"mt-3 flex flex-wrap gap-x-4 gap-y-1\"><button type=\"button\" class=\"font-data text-[0.75rem] text-[var(--c-sea)]\">🔊 Listen in language</button><button type=\"button\" class=\"font-data text-[0.75rem] text-[var(--c-sea)]\">Talk to someone</button></div>"];
function ConfirmRoute() {
	var _v$2, _v$3, _v$4, _v$, _v$5;
	const pending = useQuery(api.governance.consent.myPendingConsents, {});
	const confirm = useMutation(api.governance.consent.confirmConsent);
	const decline = useMutation(api.governance.consent.declineConsent);
	const [busy, setBusy] = createSignal(null);
	const text = (t) => t === "delegate_authority" ? DELEGATE_AUTHORITY_TEXT : DATA_USE_TEXT;
	const title = (t) => t === "delegate_authority" ? "Letting someone help you" : "Using your information";
	const onConfirm = async (id) => {
		setBusy(id);
		try {
			await confirm.mutate({
				grantId: id,
				via: "self_account"
			});
		} finally {
			setBusy(null);
		}
	};
	const onDecline = async (id) => {
		setBusy(id);
		try {
			await decline.mutate({ grantId: id });
		} finally {
			setBusy(null);
		}
	};
	const items = () => pending.data() ?? [];
	return AppShell({ get children() {
		return [AppBar({
			get title() {
				return ssr(_tmpl$4, ssrHydrationKey());
			},
			subtitle: "Only you can say yes"
		}), (_v$ = ssrHydrationKey(), _v$5 = escape(Show({
			get when() {
				return items().length > 0;
			},
			get fallback() {
				return EmptyState({
					icon: "check-circle",
					title: "Nothing to confirm",
					description: "You're all up to date. When someone asks for your consent, it'll show here."
				});
			},
			get children() {
				return [Callout({
					tone: "info",
					"class": "mb-4",
					title: "Someone started an application for you",
					get children() {
						return [
							"Please read each one and say yes ",
							(_v$2 = ssrHydrationKey(), ssr(_tmpl$, _v$2)),
							". No one can agree on your behalf. You can change your mind any time."
						];
					}
				}), (_v$3 = ssrHydrationKey(), _v$4 = escape(For({
					get each() {
						return items();
					},
					children: (g) => {
						var _v$7, _v$8, _v$9, _v$0, _v$1, _v$10;
						return Card({
							get eyebrow() {
								return g.delegateName ? `${g.delegateName} asked` : "Asked";
							},
							get title() {
								return title(g.consentType);
							},
							get children() {
								return [
									(_v$7 = ssrHydrationKey(), _v$8 = () => escape(text(g.consentType)), ssr(_tmpl$5, _v$7, _v$8)),
									(_v$9 = ssrHydrationKey(), _v$0 = escape(Button({
										block: true,
										iconLeft: "check",
										get loading() {
											return busy() === g._id;
										},
										onClick: () => onConfirm(g._id),
										children: "Yes, I agree"
									})), _v$1 = escape(Button({
										variant: "ghost",
										get disabled() {
											return busy() === g._id;
										},
										onClick: () => onDecline(g._id),
										children: "Not now"
									})), ssr(_tmpl$6, _v$9, _v$0, _v$1)),
									(_v$10 = ssrHydrationKey(), ssr(_tmpl$7, _v$10))
								];
							}
						});
					}
				})), ssr(_tmpl$2, _v$3, _v$4))];
			}
		})), ssr(_tmpl$3, _v$, _v$5))];
	} });
}
//#endregion
export { ConfirmRoute as component };
