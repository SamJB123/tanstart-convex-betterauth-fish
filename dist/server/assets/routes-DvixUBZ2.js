import { O as createSignal, b as Show, f as ssrHydrationKey, m as ssrStyleProperty, r as escape, s as ssr } from "./server-Bjhk73rZ.js";
import { t as useNavigate } from "./useNavigate-aK7gQTP2.js";
import { g as Icon, p as Button, t as Callout } from "./surface-iaHzS8iU.js";
import { o as TextField, r as SegmentedControl } from "./form-DDowlC9O.js";
//#region src/components/login-signup-form.tsx
var _tmpl$ = [
	"<main",
	" class=\"tide-safe-x tide-scroll relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-clip px-5 py-12\" style=\"",
	"\"><div aria-hidden=\"true\" class=\"pointer-events-none absolute inset-x-0 bottom-0 h-[34dvh]\" style=\"",
	"\"></div><div class=\"tide-rise relative z-10 flex w-full max-w-[400px] flex-col items-center\"><span class=\"grid h-16 w-16 place-items-center rounded-[var(--r-xl)] text-[var(--c-on-sea)]\" style=\"",
	"\">",
	"</span><p class=\"mt-5 font-data text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--c-sea)]\">Australian Fisheries Management Authority</p><h1 class=\"mt-1.5 text-center font-display text-[1.875rem] font-medium leading-tight text-[var(--c-ink)]\">Torres Strait Fisheries</h1><p class=\"mt-2 max-w-[18rem] text-center text-[0.9375rem] leading-relaxed text-[var(--c-muted)]\">Apply for and look after your fishing licence — built with community.</p><div class=\"mt-7 w-full rounded-[var(--r-xl)] bg-[var(--c-surface)] p-6 sm:p-7\" style=\"",
	"\"><!--$-->",
	"<!--/--><form class=\"mt-5 flex flex-col gap-4\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></form></div><p class=\"mt-6 flex max-w-[20rem] items-start gap-2 text-[0.75rem] leading-relaxed text-[var(--c-faint)]\"><!--$-->",
	"<!--/--><span class=\"text-left\">Your information is held under Indigenous data-governance principles. You choose what's shared, and you can see who has looked at it.</span></p></div></main>"
];
function LoginSignupForm() {
	useNavigate();
	const [mode, setMode] = createSignal("signin");
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [error, setError] = createSignal("");
	const [loading, setLoading] = createSignal(false);
	const isSignin = () => mode() === "signin";
	var _v$ = ssrHydrationKey(), _v$2 = escape(Icon({
		name: "waves",
		size: 32
	})), _v$3 = escape(SegmentedControl({
		ariaLabel: "Sign in or create an account",
		options: [{
			id: "signin",
			label: "Sign in"
		}, {
			id: "signup",
			label: "Create account"
		}],
		get value() {
			return mode();
		},
		onChange: (m) => {
			setMode(m);
			setError("");
		}
	})), _v$4 = escape(Show({
		get when() {
			return !isSignin();
		},
		get children() {
			return TextField({
				label: "Full name",
				name: "name",
				get value() {
					return name();
				},
				onInput: setName,
				get required() {
					return !isSignin();
				},
				autocomplete: "name",
				placeholder: "Your name"
			});
		}
	})), _v$5 = escape(TextField({
		label: "Email",
		name: "email",
		type: "email",
		inputmode: "email",
		get value() {
			return email();
		},
		onInput: setEmail,
		required: true,
		autocomplete: "email",
		placeholder: "you@example.com"
	})), _v$6 = escape(TextField({
		label: "Password",
		name: "password",
		type: "password",
		get value() {
			return password();
		},
		onInput: setPassword,
		required: true,
		get autocomplete() {
			return isSignin() ? "current-password" : "new-password";
		},
		placeholder: "••••••••"
	})), _v$7 = escape(Show({
		get when() {
			return error();
		},
		get children() {
			return Callout({
				tone: "warning",
				title: "Couldn't continue",
				get children() {
					return error();
				}
			});
		}
	})), _v$8 = escape(Button({
		type: "submit",
		block: true,
		size: "lg",
		get loading() {
			return loading();
		},
		get iconRight() {
			return isSignin() ? "arrow-right" : "check";
		},
		"class": "mt-1",
		get children() {
			return isSignin() ? "Sign in" : "Create account";
		}
	})), _v$9 = escape(Icon({
		name: "shield",
		size: 14,
		"class": "mt-0.5 flex-none"
	}));
	return ssr(_tmpl$, _v$, ssrStyleProperty("background:", "radial-gradient(120% 62% at 50% -8%, color-mix(in oklab, var(--c-sun) 18%, transparent), transparent 55%), linear-gradient(180deg, var(--c-surface) 0%, color-mix(in oklab, var(--c-sea) 11%, var(--c-bg)) 100%)"), ssrStyleProperty("background:", "radial-gradient(140% 100% at 50% 120%, color-mix(in oklab, var(--c-sea) 20%, transparent), transparent 70%)") + ssrStyleProperty(";mask-image:", "linear-gradient(180deg, transparent, #000 60%)") + ssrStyleProperty(";opacity:", "0.55"), ssrStyleProperty("background:", "linear-gradient(155deg, color-mix(in oklab, var(--c-sea) 78%, var(--c-reef)), var(--c-sea))") + ssrStyleProperty(";box-shadow:", "0 14px 32px -12px color-mix(in oklab, var(--c-sea) 72%, transparent)"), _v$2, ssrStyleProperty("box-shadow:", "var(--shadow-3)"), _v$3, _v$4, _v$5, _v$6, _v$7, _v$8, _v$9);
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var SplitComponent = LoginSignupForm;
//#endregion
export { SplitComponent as component };
