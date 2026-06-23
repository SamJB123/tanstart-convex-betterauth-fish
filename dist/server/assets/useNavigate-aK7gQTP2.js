import { t as useRouter } from "./useRouter-DHapt4-n.js";
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/useNavigate.jsx
function useNavigate(_defaultOpts) {
	const router = useRouter();
	return (options) => {
		return router.navigate({
			...options,
			from: options.from ?? _defaultOpts?.from
		});
	};
}
//#endregion
export { useNavigate as t };
