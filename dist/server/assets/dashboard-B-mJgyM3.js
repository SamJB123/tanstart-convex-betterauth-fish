import { O as createSignal, P as onSettled, b as Show, c as ssrAttribute, f as ssrHydrationKey, g as For, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { t as useRouteContext } from "./useRouteContext-2irNSrd3.js";
import { a as useNavigate, i as useQuery, r as useMutation } from "./convex-solid-C7zNHFqU.js";
import { t as api } from "./api-BCXZyEB6.js";
import { t as authClient } from "./auth-client-Dst_UacV.js";
//#region src/library/use-session.ts
function useSession() {
	const atom = authClient.useSession;
	const [session, setSession] = createSignal(atom.get());
	onSettled(() => {
		return atom.subscribe((value) => setSession(() => value));
	});
	return session;
}
//#endregion
//#region src/components/applications-card.tsx
var _tmpl$$1 = [
	"<p",
	" class=\"text-sm text-red-600 mb-4\">",
	"</p>"
], _tmpl$2$1 = [
	"<ul",
	" class=\"divide-y divide-gray-100\">",
	"</ul>"
], _tmpl$3$1 = [
	"<div",
	" class=\"bg-white rounded-2xl shadow-xl p-6 md:p-8\"><div class=\"flex items-center justify-between mb-6\"><h2 class=\"text-xl font-semibold text-gray-900\">Licence applications</h2><button",
	" class=\"px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50\">",
	"</button></div><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$4$1 = ["<p", " class=\"text-sm text-gray-500 py-6 text-center\">No applications yet. Lodge one to replace the paper form.</p>"], _tmpl$5$1 = [
	"<li",
	" class=\"py-3 flex items-center justify-between\"><div><p class=\"text-sm font-medium text-gray-900\">TIB application</p><p class=\"text-xs text-gray-500\">",
	"</p></div><span class=\"px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize\">",
	"</span></li>"
];
function ApplicationsCard() {
	var _v$4, _v$5, _v$7, _v$8;
	const { data } = useQuery(api.licensing.applications.listMine, {});
	useMutation(api.licensing.applications.submit);
	const [busy, setBusy] = createSignal(false);
	const [error, setError] = createSignal("");
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrAttribute("disabled", escape(busy(), true)), _v$3 = () => busy() ? "Lodging…" : "Lodge TIB application";
	return ssr(_tmpl$3$1, _v$, _v$2, _v$3, escape(Show({
		get when() {
			return error();
		},
		get children() {
			return _v$4 = ssrHydrationKey(), _v$5 = () => escape(error()), ssr(_tmpl$$1, _v$4, _v$5);
		}
	})), escape(Show({
		get when() {
			return data() && data().length > 0;
		},
		get fallback() {
			return ssr(_tmpl$4$1, ssrHydrationKey());
		},
		get children() {
			return _v$7 = ssrHydrationKey(), _v$8 = escape(For({
				get each() {
					return data();
				},
				children: (app) => {
					var _v$1, _v$10, _v$11;
					return _v$1 = ssrHydrationKey(), _v$10 = () => escape(new Date(app._creationTime).toLocaleString()), _v$11 = () => escape(app.status), ssr(_tmpl$5$1, _v$1, _v$10, _v$11);
				}
			})), ssr(_tmpl$2$1, _v$7, _v$8);
		}
	})));
}
//#endregion
//#region src/routes/_authed/dashboard.tsx?tsr-split=component
var _tmpl$ = [
	"<div",
	" class=\"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4\">",
	"</div>"
], _tmpl$2 = [
	"<main",
	" class=\"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100\"><header class=\"bg-white shadow-sm border-b border-gray-200\"><div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4\"><div class=\"flex items-center justify-between\"><div><h1 class=\"text-2xl font-bold text-gray-900\">Dashboard</h1><!--$-->",
	"<!--/--></div><button class=\"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow\">Sign Out</button></div></div></header><div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8\"><div class=\"bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6\"><div class=\"flex items-center justify-between mb-6\"><h2 class=\"text-xl font-semibold text-gray-900\">Numbers</h2><button class=\"px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5\">Add Random Number To Convex</button></div><!--$-->",
	"<!--/--></div><!--$-->",
	"<!--/--></div></main>"
], _tmpl$3 = [
	"<p",
	" class=\"text-sm text-gray-600 mt-1\">Welcome back, <!--$-->",
	"<!--/-->!</p>"
], _tmpl$4 = ["<div", " class=\"text-center py-12\"><svg class=\"mx-auto h-12 w-12 text-gray-400\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\"></path></svg><h3 class=\"mt-2 text-sm font-medium text-gray-900\">No numbers yet</h3><p class=\"mt-1 text-sm text-gray-500\">Get started by adding your first number.</p></div>"], _tmpl$5 = [
	"<div",
	" class=\"bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center border border-blue-100 hover:border-blue-300 transition-all duration-200 hover:shadow-md\"><div class=\"text-2xl font-bold text-blue-600\">",
	"</div></div>"
];
function RouteComponent() {
	var _v$3, _v$4;
	useNavigate();
	const context = useRouteContext({ from: "/_authed" });
	const session = useSession();
	const user = () => session().data?.user ?? context().user;
	const { data } = useQuery(api.myFunctions.listNumbers, { count: 10 });
	return ssr(_tmpl$2, ssrHydrationKey(), escape(Show({
		get when() {
			return user();
		},
		children: (u) => {
			var _v$7, _v$8;
			return _v$7 = ssrHydrationKey(), _v$8 = () => escape(u().name || u().email), ssr(_tmpl$3, _v$7, _v$8);
		}
	})), escape(Show({
		get when() {
			return data()?.numbers && data().numbers.length > 0;
		},
		get fallback() {
			return ssr(_tmpl$4, ssrHydrationKey());
		},
		get children() {
			return _v$3 = ssrHydrationKey(), _v$4 = escape(For({
				get each() {
					return data()?.numbers;
				},
				children: (number) => {
					var _v$0, _v$1;
					return _v$0 = ssrHydrationKey(), _v$1 = escape(number), ssr(_tmpl$5, _v$0, _v$1);
				}
			})), ssr(_tmpl$, _v$3, _v$4);
		}
	})), escape(ApplicationsCard({})));
}
//#endregion
export { RouteComponent as component };
