import { O as createSignal, c as ssrAttribute, d as ssrGroup, f as ssrHydrationKey, i as memo, l as ssrClassName, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { a as useNavigate } from "./convex-solid-C7zNHFqU.js";
//#region src/components/login-signup-form.tsx
var _tmpl$$1 = [
	"<main",
	" class=\"min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4\"><div class=\"w-full max-w-md\"><div class=\"bg-white rounded-2xl shadow-xl p-8 md:p-10\"><div class=\"text-center mb-8\"><h1 class=\"text-3xl font-bold text-gray-900 mb-2\">",
	"</h1><p class=\"text-gray-600 text-sm\">",
	"</p></div><form class=\"space-y-5\"><!--$-->",
	"<!--/--><div><label for=\"email\" class=\"block text-sm font-medium text-gray-700 mb-2\">Email Address</label><input id=\"email\" type=\"email\"",
	" required class=\"w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400\" placeholder=\"you@example.com\"></div><div><label for=\"password\" class=\"block text-sm font-medium text-gray-700 mb-2\">Password</label><input id=\"password\" type=\"password\"",
	" required class=\"w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400\" placeholder=\"••••••••\"></div><!--$-->",
	"<!--/--><button type=\"submit\"",
	" class=\"",
	"\">",
	"</button></form><div class=\"mt-6 text-center\"><button class=\"text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium\">",
	"</button></div></div></div></main>"
], _tmpl$2 = [
	"<div",
	"><label for=\"name\" class=\"block text-sm font-medium text-gray-700 mb-2\">Full Name</label><input id=\"name\" type=\"text\"",
	"",
	" class=\"w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400\" placeholder=\"John Doe\"></div>"
], _tmpl$3 = [
	"<div",
	" class=\"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2\"><svg class=\"w-5 h-5 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z\" clip-rule=\"evenodd\"></path></svg><span>",
	"</span></div>"
], _tmpl$4 = ["<span", " class=\"flex items-center justify-center gap-2\"><svg class=\"animate-spin h-5 w-5\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"><circle class=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"4\"></circle><path class=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path></svg>Processing...</span>"], _tmpl$5 = ["<span", " class=\"text-blue-600 hover:underline\">Sign up</span>"], _tmpl$6 = ["<span", " class=\"text-blue-600 hover:underline\">Sign in</span>"];
function LoginSignupForm() {
	useNavigate();
	const [isLogin, setIsLogin] = createSignal(true);
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [error, setError] = createSignal("");
	const [loading, setLoading] = createSignal(false);
	var _v$ = ssrHydrationKey(), _v$2 = () => isLogin() ? "Welcome Back" : "Create Account", _v$3 = () => isLogin() ? "Sign in to continue to your account" : "Get started with your free account", _v$4 = (() => {
		var _c$ = memo(() => !!!isLogin());
		return () => {
			var _v$10, _v$12, _v$11;
			return _c$() && (_v$10 = ssrHydrationKey(), _v$12 = () => ssrAttribute("required", !isLogin()), _v$11 = () => ssrAttribute("value", escape(name(), true)), ssr(_tmpl$2, _v$10, _v$11, _v$12));
		};
	})(), _v$7 = (() => {
		var _c$2 = memo(() => !!error());
		return () => {
			var _v$13, _v$14;
			return _c$2() && (_v$13 = ssrHydrationKey(), _v$14 = () => escape(error()), ssr(_tmpl$3, _v$13, _v$14));
		};
	})(), _g$ = ssrGroup(() => [ssrAttribute("disabled", escape(loading(), true)), ssrClassName(`w-full px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${loading() ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"}`)], 2), _v$0 = (() => {
		var _c$3 = memo(() => !!loading());
		return () => {
			var _v$15;
			return _c$3() ? (_v$15 = ssrHydrationKey(), ssr(_tmpl$4, _v$15)) : isLogin() ? "Sign In" : "Create Account";
		};
	})(), _v$1 = (() => {
		var _c$4 = memo(() => !!isLogin());
		return () => {
			var _v$16, _v$17;
			return _c$4() ? escape([
				"Don't have an account?",
				" ",
				(_v$16 = ssrHydrationKey(), ssr(_tmpl$5, _v$16))
			]) : escape([
				"Already have an account?",
				" ",
				(_v$17 = ssrHydrationKey(), ssr(_tmpl$6, _v$17))
			]);
		};
	})(), _v$5 = () => ssrAttribute("value", escape(email(), true)), _v$6 = () => ssrAttribute("value", escape(password(), true));
	return ssr(_tmpl$$1, _v$, _v$2, _v$3, _v$4, _v$5, _v$6, _v$7, _g$, _g$, _v$0, _v$1);
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var _tmpl$ = [
	"<main",
	">",
	"</main>"
];
function RouteComponent() {
	return ssr(_tmpl$, ssrHydrationKey(), escape(LoginSignupForm({})));
}
//#endregion
export { RouteComponent as component };
