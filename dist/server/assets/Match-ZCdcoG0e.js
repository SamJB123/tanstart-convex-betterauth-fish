import { n as invariant, t as nearestMatchContext } from "./matchContext-C5GwsjJN.js";
import { c as isNotFound, n as getLocationChangeInfo, s as rootRouteId } from "./router-DJ4MDNFY.js";
import { t as isRedirect } from "./redirect-BwM679Xn.js";
import { I as untrack, L as useContext, O as createSignal, T as createMemo, _ as Loading, a as mergeProps, b as Show, c as ssrAttribute, f as ssrHydrationKey, h as Errored, i as memo, m as ssrStyleProperty, r as escape, s as ssr, t as Dynamic, v as Match$1, w as createEffect, x as Switch } from "./server-Bjhk73rZ.js";
import { t as useRouter } from "./useRouter-DHapt4-n.js";
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/CatchBoundary.jsx
var _tmpl$$2 = [
	"<div",
	" style=\"",
	"\"><div style=\"",
	"\">∂<strong style=\"",
	"\">Something went wrong!</strong><button style=\"",
	"\">",
	"</button></div><div style=\"",
	"\"></div><!--$-->",
	"<!--/--></div>"
], _tmpl$2 = [
	"<div",
	"><pre style=\"",
	"\">",
	"</pre></div>"
], _tmpl$3 = [
	"<code",
	">",
	"</code>"
];
function CatchBoundary(props) {
	return Errored({
		fallback: (error, reset) => {
			const resolvedError = untrack(() => error());
			props.onCatch?.(resolvedError);
			createEffect(props.getResetKey, () => {
				reset();
			});
			return Dynamic({
				get component() {
					return props.errorComponent ?? ErrorComponent;
				},
				error: resolvedError,
				reset
			});
		},
		get children() {
			return props.children;
		}
	});
}
function ErrorComponent({ error }) {
	const [show, setShow] = createSignal(false);
	var _v$ = ssrHydrationKey(), _v$2 = () => show() ? "Hide Error" : "Show Error", _v$3 = (() => {
		var _c$ = memo(() => !!show());
		return () => {
			var _v$4, _v$5;
			return _c$() ? (_v$4 = ssrHydrationKey(), _v$5 = (() => {
				var _c$2 = memo(() => !!error.message);
				return () => {
					var _v$6, _v$7;
					return _c$2() ? (_v$6 = ssrHydrationKey(), _v$7 = () => escape(error.message), ssr(_tmpl$3, _v$6, _v$7)) : escape(null);
				};
			})(), ssr(_tmpl$2, _v$4, ssrStyleProperty("font-size:", ".7em") + ssrStyleProperty(";border:", "1px solid red") + ssrStyleProperty(";border-radius:", ".25rem") + ssrStyleProperty(";padding:", ".3rem") + ssrStyleProperty(";color:", "red") + ssrStyleProperty(";overflow:", "auto"), _v$5)) : escape(null);
		};
	})();
	return ssr(_tmpl$$2, _v$, ssrStyleProperty("padding:", ".5rem") + ssrStyleProperty(";max-width:", "100%"), ssrStyleProperty("display:", "flex") + ssrStyleProperty(";align-items:", "center") + ssrStyleProperty(";gap:", ".5rem"), ssrStyleProperty("font-size:", "1rem"), ssrStyleProperty("appearance:", "none") + ssrStyleProperty(";font-size:", ".6em") + ssrStyleProperty(";border:", "1px solid currentColor") + ssrStyleProperty(";padding:", ".1rem .2rem") + ssrStyleProperty(";font-weight:", "bold") + ssrStyleProperty(";border-radius:", ".25rem"), _v$2, ssrStyleProperty("height:", ".25rem"), _v$3);
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/SafeFragment.jsx
function SafeFragment(props) {
	return memo(() => escape(props.children));
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/not-found.jsx
var _tmpl$$1 = ["<p", ">Not Found</p>"];
function getNotFound(error) {
	if (isNotFound(error)) return error;
	if (isNotFound(error?.cause)) return error.cause;
}
function CatchNotFound(props) {
	const router = useRouter();
	const pathname = createMemo(() => router.stores.location.state.pathname);
	const status = createMemo(() => router.stores.status.state);
	return CatchBoundary({
		getResetKey: () => `not-found-${pathname()}-${status()}`,
		onCatch: (error) => {
			const notFoundError = getNotFound(error);
			if (notFoundError) props.onCatch?.(notFoundError);
			else throw error;
		},
		errorComponent: ({ error }) => {
			const notFoundError = getNotFound(error);
			if (notFoundError) return props.fallback?.(notFoundError);
			else throw error;
		},
		get children() {
			return props.children;
		}
	});
}
function DefaultGlobalNotFound() {
	return ssr(_tmpl$$1, ssrHydrationKey());
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/renderRouteNotFound.jsx
/**
* Renders a not found component for a route when no matching route is found.
*
* @param router - The router instance containing the route configuration
* @param route - The route that triggered the not found state
* @param data - Additional data to pass to the not found component
* @returns The rendered not found component or a default fallback component
*/
function renderRouteNotFound(router, route, data) {
	if (!route.options.notFoundComponent) {
		if (router.options.defaultNotFoundComponent) return router.options.defaultNotFoundComponent(data);
		return DefaultGlobalNotFound({});
	}
	return route.options.notFoundComponent(data);
}
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/scroll-restoration-script/client.js
function getScrollRestorationScriptForRouter(_router) {
	return null;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/ScriptOnce.jsx
var _tmpl$ = [
	"<script",
	"",
	" class=\"$tsr\">",
	"<\/script>"
];
function ScriptOnce({ children }) {
	const router = useRouter();
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrAttribute("nonce", escape(router.options.ssr?.nonce, true));
	return ssr(_tmpl$, _v$, _v$2, children + ";document.currentScript.remove()");
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/scroll-restoration.jsx
function ScrollRestoration() {
	const script = getScrollRestorationScriptForRouter(useRouter());
	if (!script) return null;
	return ScriptOnce({ children: script });
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/Match.jsx
var NearestMatchContext = nearestMatchContext;
var Match = (props) => {
	const router = useRouter();
	const match = createMemo(() => {
		const id = props.matchId;
		if (!id) return void 0;
		return router.stores.activeMatchStoresById.get(id)?.state;
	});
	const rawMatchState = createMemo(() => {
		const currentMatch = match();
		if (!currentMatch) return null;
		const routeId = currentMatch.routeId;
		const parentRouteId = router.routesById[routeId]?.parentRoute?.id;
		return {
			matchId: currentMatch.id,
			routeId,
			ssr: currentMatch.ssr,
			_displayPending: currentMatch._displayPending,
			parentRouteId
		};
	});
	const nearestMatch = {
		matchId: () => rawMatchState()?.matchId,
		routeId: () => rawMatchState()?.routeId,
		match,
		hasPending: createMemo(() => {
			const currentRouteId = rawMatchState()?.routeId;
			return currentRouteId ? Boolean(router.stores.pendingRouteIds.state[currentRouteId]) : false;
		})
	};
	return Show({
		get when() {
			return rawMatchState();
		},
		children: (currentMatchState) => {
			const route = createMemo(() => router.routesById[currentMatchState().routeId]);
			const resolvePendingComponent = createMemo(() => route().options.pendingComponent ?? router.options.defaultPendingComponent);
			const routeErrorComponent = createMemo(() => route().options.errorComponent ?? router.options.defaultErrorComponent);
			const routeOnCatch = createMemo(() => route().options.onCatch ?? router.options.defaultOnCatch);
			const routeNotFoundComponent = createMemo(() => route().isRoot ? route().options.notFoundComponent ?? router.options.notFoundRoute?.options.component : route().options.notFoundComponent);
			const resolvedNoSsr = createMemo(() => currentMatchState().ssr === false || currentMatchState().ssr === "data-only");
			const ResolvedSuspenseBoundary = createMemo(() => resolvedNoSsr() ? SafeFragment : Loading);
			const ResolvedCatchBoundary = createMemo(() => routeErrorComponent() ? CatchBoundary : SafeFragment);
			const ResolvedNotFoundBoundary = createMemo(() => routeNotFoundComponent() ? CatchNotFound : SafeFragment);
			const ShellComponent = createMemo(() => route().isRoot ? route().options.shellComponent ?? SafeFragment : SafeFragment);
			return Dynamic({
				get component() {
					return ShellComponent();
				},
				get children() {
					return [NearestMatchContext({
						value: nearestMatch,
						get children() {
							return Dynamic({
								get component() {
									return ResolvedSuspenseBoundary();
								},
								get fallback() {
									return resolvedNoSsr() ? void 0 : Dynamic({ get component() {
										return resolvePendingComponent();
									} });
								},
								get children() {
									return Dynamic({
										get component() {
											return ResolvedCatchBoundary();
										},
										getResetKey: () => router.stores.loadedAt.state,
										get errorComponent() {
											return routeErrorComponent() || ErrorComponent;
										},
										onCatch: (error) => {
											const notFoundError = getNotFound(error);
											if (notFoundError) {
												notFoundError.routeId ?? (notFoundError.routeId = currentMatchState().routeId);
												throw notFoundError;
											}
											routeOnCatch()?.(error);
										},
										get children() {
											return Dynamic({
												get component() {
													return ResolvedNotFoundBoundary();
												},
												fallback: (error) => {
													const notFoundError = getNotFound(error) ?? error;
													notFoundError.routeId ?? (notFoundError.routeId = currentMatchState().routeId);
													if (!routeNotFoundComponent() || notFoundError.routeId && notFoundError.routeId !== currentMatchState().routeId || !notFoundError.routeId && !route().isRoot) throw notFoundError;
													return Dynamic(mergeProps({ get component() {
														return routeNotFoundComponent();
													} }, notFoundError));
												},
												get children() {
													return Switch({ get children() {
														return [Match$1({
															get when() {
																return resolvedNoSsr();
															},
															get children() {
																return Show({
																	get when() {
																		return false;
																	},
																	get fallback() {
																		return Dynamic({ get component() {
																			return resolvePendingComponent();
																		} });
																	},
																	get children() {
																		return MatchInner({});
																	}
																});
															}
														}), Match$1({
															get when() {
																return !resolvedNoSsr();
															},
															get children() {
																return MatchInner({});
															}
														})];
													} });
												}
											});
										}
									});
								}
							});
						}
					}), memo(() => escape(memo(() => currentMatchState().parentRouteId === "__root__")() ? [OnRendered({}), memo(() => escape(memo(() => !!(router.options.scrollRestoration && true))() ? ScrollRestoration({}) : null))] : null))];
				}
			});
		}
	});
};
var lastOnRenderedKey = /* @__PURE__ */ new WeakMap();
function OnRendered() {
	const router = useRouter();
	const location = createMemo(() => router.stores.resolvedLocation.state?.state.__TSR_key);
	const locationState = createMemo(() => router.stores.location.state);
	const resolvedLocationState = createMemo(() => router.stores.resolvedLocation.state);
	createEffect(() => [
		location(),
		locationState(),
		resolvedLocationState()
	], ([location, currentLocationState, currentResolvedLocationState]) => {
		if (!location) return;
		if (lastOnRenderedKey.get(router) === location) return;
		lastOnRenderedKey.set(router, location);
		router.emit({
			type: "onRendered",
			...getLocationChangeInfo(currentLocationState, currentResolvedLocationState)
		});
	});
	return null;
}
var MatchInner = () => {
	const router = useRouter();
	const match = useContext(nearestMatchContext).match;
	const rawMatchState = createMemo(() => {
		const currentMatch = match();
		if (!currentMatch) return null;
		const routeId = currentMatch.routeId;
		const remountDeps = (router.routesById[routeId].options.remountDeps ?? router.options.defaultRemountDeps)?.({
			routeId,
			loaderDeps: currentMatch.loaderDeps,
			params: currentMatch._strictParams,
			search: currentMatch._strictSearch
		});
		return {
			key: remountDeps ? JSON.stringify(remountDeps) : void 0,
			routeId,
			match: {
				id: currentMatch.id,
				status: currentMatch.status,
				error: currentMatch.error,
				_forcePending: currentMatch._forcePending ?? false,
				_displayPending: currentMatch._displayPending ?? false
			}
		};
	});
	return Show({
		get when() {
			return rawMatchState();
		},
		children: (currentMatchState) => {
			const route = createMemo(() => router.routesById[currentMatchState().routeId]);
			const currentMatch = createMemo(() => currentMatchState().match);
			const componentKey = createMemo(() => currentMatchState().key ?? currentMatchState().match.id);
			const Comp = createMemo(() => route().options.component ?? router.options.defaultComponent);
			const OutComponent = createMemo(() => {
				return Comp() || Outlet;
			});
			const RenderOut = () => Dynamic({ get component() {
				return OutComponent();
			} });
			const keyedOut = () => Show({
				get when() {
					return componentKey();
				},
				keyed: true,
				children: (_key) => RenderOut({})
			});
			return Switch({ get children() {
				return [
					Match$1({
						get when() {
							return currentMatch()._displayPending;
						},
						children: (_) => {
							const displayPendingResult = createMemo(() => router.getMatch(currentMatch().id)?._nonReactive.displayPendingPromise);
							return memo(() => escape(displayPendingResult()));
						}
					}),
					Match$1({
						get when() {
							return currentMatch()._forcePending;
						},
						children: (_) => {
							const minPendingResult = createMemo(() => router.getMatch(currentMatch().id)?._nonReactive.minPendingPromise);
							return memo(() => escape(minPendingResult()));
						}
					}),
					Match$1({
						get when() {
							return currentMatch().status === "pending";
						},
						children: (_) => {
							const pendingMinMs = untrack(() => route().options.pendingMinMs ?? router.options.defaultPendingMinMs);
							if (pendingMinMs) {
								const routerMatch = untrack(() => router.getMatch(currentMatch().id));
								if (routerMatch && !routerMatch._nonReactive.minPendingPromise) {}
							}
							const loaderResult = createMemo(async () => {
								await new Promise((r) => setTimeout(r, 0));
								return router.getMatch(currentMatch().id)?._nonReactive.loadPromise;
							});
							const FallbackComponent = untrack(() => route().options.pendingComponent ?? router.options.defaultPendingComponent);
							return [FallbackComponent && pendingMinMs > 0 ? Dynamic({ component: FallbackComponent }) : null, memo(() => escape(loaderResult()))];
						}
					}),
					Match$1({
						get when() {
							return currentMatch().status === "notFound";
						},
						children: (_) => {
							const matchError = untrack(() => currentMatch().error);
							if (!isNotFound(matchError)) invariant();
							return Show({
								get when() {
									return currentMatchState().routeId;
								},
								keyed: true,
								children: (_routeId) => untrack(() => renderRouteNotFound(router, route(), matchError))
							});
						}
					}),
					Match$1({
						get when() {
							return currentMatch().status === "redirected";
						},
						children: (_) => {
							if (!isRedirect(untrack(() => currentMatch().error))) invariant();
							return null;
						}
					}),
					Match$1({
						get when() {
							return currentMatch().status === "error";
						},
						children: (_) => {
							const matchError = untrack(() => currentMatch().error);
							return ((route().options.errorComponent ?? router.options.defaultErrorComponent) || ErrorComponent)({
								error: matchError,
								info: { componentStack: "" }
							});
						}
					}),
					Match$1({
						get when() {
							return currentMatch().status === "success";
						},
						get children() {
							return keyedOut();
						}
					})
				];
			} });
		}
	});
};
var Outlet = () => {
	const router = useRouter();
	const nearestParentMatch = useContext(nearestMatchContext);
	const parentMatch = nearestParentMatch.match;
	const routeId = nearestParentMatch.routeId;
	const route = createMemo(() => routeId() ? router.routesById[routeId()] : void 0);
	const parentGlobalNotFound = createMemo(() => parentMatch()?.globalNotFound ?? false);
	const childMatchId = createMemo(() => {
		const currentRouteId = routeId();
		return currentRouteId ? router.stores.childMatchIdByRouteId.state[currentRouteId] : void 0;
	});
	const childRouteId = createMemo(() => {
		const id = childMatchId();
		if (!id) return void 0;
		return router.stores.activeMatchStoresById.get(id)?.state.routeId;
	});
	const childRoute = createMemo(() => {
		const id = childRouteId();
		return id ? router.routesById[id] : void 0;
	});
	const childPendingComponent = createMemo(() => childRoute()?.options.pendingComponent ?? router.options.defaultPendingComponent);
	const childMatchStatus = createMemo(() => {
		const id = childMatchId();
		if (!id) return void 0;
		return router.stores.activeMatchStoresById.get(id)?.state.status;
	});
	const shouldShowNotFound = () => childMatchStatus() !== "redirected" && parentGlobalNotFound();
	return Show({
		get when() {
			return !shouldShowNotFound() && childMatchId();
		},
		get fallback() {
			return Show({
				get when() {
					return shouldShowNotFound() && route();
				},
				children: (resolvedRoute) => untrack(() => renderRouteNotFound(router, resolvedRoute(), void 0))
			});
		},
		children: (childMatchIdAccessor) => {
			const currentMatchId = createMemo(() => childMatchIdAccessor());
			return Show({
				get when() {
					return routeId() === rootRouteId;
				},
				get fallback() {
					return Match({ get matchId() {
						return currentMatchId();
					} });
				},
				get children() {
					return Show({
						get when() {
							return childRouteId();
						},
						keyed: true,
						children: (_routeId) => Loading({
							get fallback() {
								return childPendingComponent() ? Dynamic({ get component() {
									return childPendingComponent();
								} }) : null;
							},
							get children() {
								return Match({ get matchId() {
									return currentMatchId();
								} });
							}
						})
					});
				}
			});
		}
	});
};
//#endregion
export { ErrorComponent as a, CatchBoundary as i, Outlet as n, SafeFragment as r, Match as t };
