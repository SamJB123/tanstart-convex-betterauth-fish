import { _ as replaceEqualDeep, n as invariant, t as nearestMatchContext } from "./matchContext-C5GwsjJN.js";
import { L as useContext, T as createMemo } from "./server-Bjhk73rZ.js";
import { t as useRouter } from "./useRouter-DHapt4-n.js";
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/useMatch.jsx
function useMatch(opts) {
	const router = useRouter();
	const nearestMatch = opts.from ? void 0 : useContext(nearestMatchContext);
	const match = () => {
		if (opts.from) {
			const ids = router.stores.matchesId.state;
			for (const id of ids) {
				const matchStore = router.stores.activeMatchStoresById.get(id);
				if (matchStore?.routeId === opts.from) return matchStore.state;
			}
			return;
		}
		return nearestMatch?.match();
	};
	return createMemo((prev) => {
		const selectedMatch = match();
		if (selectedMatch === void 0) {
			const hasPendingMatch = opts.from ? Boolean(router.stores.pendingRouteIds.state[opts.from]) : nearestMatch?.hasPending() ?? false;
			const isTransitioning = router.stores.isTransitioning.state;
			if (!hasPendingMatch && !isTransitioning && (opts.shouldThrow ?? true)) invariant();
			return;
		}
		const res = opts.select ? opts.select(selectedMatch) : selectedMatch;
		if (prev === void 0) return res;
		return replaceEqualDeep(prev, res);
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/useRouteContext.js
function useRouteContext(opts) {
	return useMatch({
		...opts,
		select: (match) => opts.select ? opts.select(match.context) : match.context
	});
}
//#endregion
export { useMatch as n, useRouteContext as t };
