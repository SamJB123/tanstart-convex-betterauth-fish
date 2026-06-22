import { d as isDangerousProtocol, f as isModuleNotFoundError, l as escapeHtml, n as invariant, s as deepEqual, u as functionalUpdate } from "./matchContext-C5GwsjJN.js";
import { a as createNonReactiveReadonlyStore, d as removeTrailingSlash, f as trimPathLeft, i as createNonReactiveMutableStore, l as exactPathTest, p as trimPathRight, s as rootRouteId, t as RouterCore, u as joinPaths } from "./router-DJ4MDNFY.js";
import { i as redirect } from "./redirect-BwM679Xn.js";
import { n as resolveManifestAssetLink, t as getAssetCrossOrigin } from "./manifest-DMhCq4qv.js";
import { F as runWithOwner, I as untrack, M as merge, O as createSignal, R as omit, S as children, T as createMemo, _ as Loading, a as mergeProps, c as ssrAttribute, f as ssrHydrationKey, g as For, n as HydrationScript, r as escape, s as ssr, t as Dynamic, u as ssrElement, w as createEffect, y as NoHydration } from "./server-Bjhk73rZ.js";
import { t as useRouter } from "./useRouter-DHapt4-n.js";
import { n as useMatch, t as useRouteContext } from "./useRouteContext-2irNSrd3.js";
import { a as useNavigate, t as ConvexProvider } from "./convex-solid-C7zNHFqU.js";
import { i as handler } from "./auth-server-1e2GXFNm.js";
import { n as fetchAuth, r as fetchUser, t as convexClient } from "./convex-client-CwZu5M_z.js";
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/link.js
var preloadWarning = "Error preloading route! ☝️";
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/route.js
var BaseRoute = class {
	get to() {
		return this._to;
	}
	get id() {
		return this._id;
	}
	get path() {
		return this._path;
	}
	get fullPath() {
		return this._fullPath;
	}
	constructor(options) {
		this.init = (opts) => {
			this.originalIndex = opts.originalIndex;
			const options = this.options;
			const isRoot = !options?.path && !options?.id;
			this.parentRoute = this.options.getParentRoute?.();
			if (isRoot) this._path = rootRouteId;
			else if (!this.parentRoute) invariant();
			let path = isRoot ? rootRouteId : options?.path;
			if (path && path !== "/") path = trimPathLeft(path);
			const customId = options?.id || path;
			let id = isRoot ? rootRouteId : joinPaths([this.parentRoute.id === "__root__" ? "" : this.parentRoute.id, customId]);
			if (path === "__root__") path = "/";
			if (id !== "__root__") id = joinPaths(["/", id]);
			const fullPath = id === "__root__" ? "/" : joinPaths([this.parentRoute.fullPath, path]);
			this._path = path;
			this._id = id;
			this._fullPath = fullPath;
			this._to = trimPathRight(fullPath);
		};
		this.addChildren = (children) => {
			return this._addFileChildren(children);
		};
		this._addFileChildren = (children) => {
			if (Array.isArray(children)) this.children = children;
			if (typeof children === "object" && children !== null) this.children = Object.values(children);
			return this;
		};
		this._addFileTypes = () => {
			return this;
		};
		this.updateLoader = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.update = (options) => {
			Object.assign(this.options, options);
			return this;
		};
		this.lazy = (lazyFn) => {
			this.lazyFn = lazyFn;
			return this;
		};
		this.redirect = (opts) => redirect({
			from: this.fullPath,
			...opts
		});
		this.options = options || {};
		this.isRoot = !options?.getParentRoute;
		if (options?.id && options?.path) throw new Error(`Route cannot have both an 'id' and a 'path' option.`);
	}
};
var BaseRootRoute = class extends BaseRoute {
	constructor(options) {
		super(options);
	}
};
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/ClientOnly.jsx
/**
* Return a boolean indicating if the JS has been hydrated already.
* When doing Server-Side Rendering, the result will always be false.
* When doing Client-Side Rendering, the result will always be false on the
* first render and true from then on. Even if a new component renders it will
* always start with true.
*
* @example
* ```tsx
* // Disable a button that needs JS to work.
* const hydrated = useHydrated()
* return (
*   <button type="button" disabled={!hydrated()} onClick={doSomethingCustom}>
*     Click me
*   </button>
* )
* ```
* @returns True if the JS has been hydrated already, false otherwise.
*/
function useHydrated() {
	const [hydrated, setHydrated] = createSignal(false);
	createEffect(() => true, () => {
		setHydrated(true);
	});
	return hydrated;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/utils.js
/**
* React hook to wrap `IntersectionObserver`.
*
* This hook will create an `IntersectionObserver` and observe the ref passed to it.
*
* When the intersection changes, the callback will be called with the `IntersectionObserverEntry`.
*
* @param ref - The ref to observe
* @param intersectionObserverOptions - The options to pass to the IntersectionObserver
* @param options - The options to pass to the hook
* @param callback - The callback to call when the intersection changes
* @returns The IntersectionObserver instance
* @example
* ```tsx
* const MyComponent = () => {
* const ref = React.useRef<HTMLDivElement>(null)
* useIntersectionObserver(
*  ref,
*  (entry) => { doSomething(entry) },
*  { rootMargin: '10px' },
*  { disabled: false }
* )
* return <div ref={ref} />
* ```
*/
function useIntersectionObserver(ref, callback, intersectionObserverOptions = {}, options = {}) {
	const isIntersectionObserverAvailable = typeof IntersectionObserver === "function";
	let observerRef = null;
	createEffect(ref, (r) => {
		if (!r || !isIntersectionObserverAvailable || options.disabled) return;
		observerRef = new IntersectionObserver(([entry]) => {
			callback(entry);
		}, intersectionObserverOptions);
		observerRef.observe(r);
		return () => {
			observerRef?.disconnect();
		};
	});
	return () => observerRef;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/link.jsx
var _tmpl$$2 = [
	"<svg",
	">",
	"</svg>"
];
function mergeRefs(...refs) {
	return (el) => {
		for (const ref of refs) if (typeof ref === "function") ref(el);
	};
}
function splitProps(props, keys) {
	return [props, omit(props, ...keys)];
}
var timeoutMap = /* @__PURE__ */ new WeakMap();
function useLinkProps(options) {
	const router = useRouter();
	const [isTransitioning, setIsTransitioning] = createSignal(false);
	useHydrated();
	let hasRenderFetched = false;
	const [local, rest] = splitProps(merge({
		activeProps: STATIC_ACTIVE_PROPS_GET,
		inactiveProps: STATIC_INACTIVE_PROPS_GET
	}, options), [
		"activeProps",
		"inactiveProps",
		"activeOptions",
		"to",
		"preload",
		"preloadDelay",
		"hashScrollIntoView",
		"replace",
		"startTransition",
		"resetScroll",
		"viewTransition",
		"target",
		"disabled",
		"style",
		"class",
		"onClick",
		"onBlur",
		"onFocus",
		"onMouseEnter",
		"onMouseLeave",
		"onMouseOver",
		"onMouseOut",
		"onTouchStart",
		"ignoreBlocker"
	]);
	const [_, propsSafeToSpread] = splitProps(rest, [
		"params",
		"search",
		"hash",
		"state",
		"mask",
		"reloadDocument",
		"unsafeRelative"
	]);
	const currentLocation = createMemo(() => router.stores.location.state, {
		lazy: true,
		equals: (prev, next) => prev?.href === next?.href
	});
	const _options = () => options;
	const next = createMemo(() => {
		const options = {
			_fromLocation: currentLocation(),
			..._options()
		};
		return untrack(() => router.buildLocation(options));
	}, { lazy: true });
	const hrefOption = createMemo(() => {
		if (_options().disabled) return void 0;
		const location = next().maskedLocation ?? next();
		const publicHref = location.publicHref;
		if (location.external) return {
			href: publicHref,
			external: true
		};
		return {
			href: router.history.createHref(publicHref) || "/",
			external: false
		};
	}, { lazy: true });
	const externalLink = createMemo(() => {
		const _href = hrefOption();
		if (_href?.external) {
			if (isDangerousProtocol(_href.href, router.protocolAllowlist)) return;
			return _href.href;
		}
		const to = _options().to;
		if (isSafeInternal(to)) return void 0;
		if (typeof to !== "string" || to.indexOf(":") === -1) return void 0;
		try {
			new URL(to);
			if (isDangerousProtocol(to, router.protocolAllowlist)) return;
			return to;
		} catch {}
	}, { lazy: true });
	const preload = createMemo(() => {
		if (_options().reloadDocument || externalLink()) return false;
		return local.preload ?? router.options.defaultPreload;
	}, { lazy: true });
	const preloadDelay = () => local.preloadDelay ?? router.options.defaultPreloadDelay ?? 0;
	const isActive = createMemo(() => {
		if (externalLink()) return false;
		const activeOptions = local.activeOptions;
		const current = currentLocation();
		const nextLocation = next();
		if (activeOptions?.exact) {
			if (!exactPathTest(current.pathname, nextLocation.pathname, router.basepath)) return false;
		} else {
			const currentPath = removeTrailingSlash(current.pathname, router.basepath);
			const nextPath = removeTrailingSlash(nextLocation.pathname, router.basepath);
			if (!(currentPath.startsWith(nextPath) && (currentPath.length === nextPath.length || currentPath[nextPath.length] === "/"))) return false;
		}
		if (activeOptions?.includeSearch ?? true) {
			if (!deepEqual(current.search, nextLocation.search, {
				partial: !activeOptions?.exact,
				ignoreUndefined: !activeOptions?.explicitUndefined
			})) return false;
		}
		if (activeOptions?.includeHash) return current.hash === nextLocation.hash;
		return true;
	}, { lazy: true });
	const doPreload = () => router.preloadRoute({
		..._options(),
		_builtLocation: next()
	}).catch((err) => {
		console.warn(err);
		console.warn(preloadWarning);
	});
	const preloadViewportIoCallback = (entry) => {
		if (entry?.isIntersecting) doPreload();
	};
	const [ref, setRefSignal] = createSignal(null);
	const setRef = (el) => {
		runWithOwner(null, () => {
			setRefSignal(el);
		});
	};
	useIntersectionObserver(ref, preloadViewportIoCallback, { rootMargin: "100px" }, { disabled: !!local.disabled || !(untrack(preload) === "viewport") });
	createEffect(preload, (preloadValue) => {
		if (hasRenderFetched) return;
		if (!local.disabled && preloadValue === "render") {
			untrack(() => doPreload());
			hasRenderFetched = true;
		}
	});
	if (untrack(externalLink)) return merge(propsSafeToSpread, { href: untrack(externalLink) }, splitProps(local, [
		"target",
		"disabled",
		"style",
		"class",
		"onClick",
		"onBlur",
		"onFocus",
		"onMouseEnter",
		"onMouseLeave",
		"onMouseOut",
		"onMouseOver",
		"onTouchStart"
	])[0]);
	const handleClick = (e) => {
		const elementTarget = e.currentTarget.getAttribute("target");
		const effectiveTarget = local.target !== void 0 ? local.target : elementTarget;
		if (!local.disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e.button === 0) {
			e.preventDefault();
			runWithOwner(null, () => {
				setIsTransitioning(true);
			});
			const unsub = router.subscribe("onResolved", () => {
				unsub();
				runWithOwner(null, () => {
					setIsTransitioning(false);
				});
			});
			router.navigate({
				..._options(),
				replace: local.replace,
				resetScroll: local.resetScroll,
				hashScrollIntoView: local.hashScrollIntoView,
				startTransition: local.startTransition,
				viewTransition: local.viewTransition,
				ignoreBlocker: local.ignoreBlocker
			});
		}
	};
	const enqueueIntentPreload = (e) => {
		if (local.disabled || preload() !== "intent") return;
		if (!preloadDelay()) {
			doPreload();
			return;
		}
		const eventTarget = e.currentTarget || e.target;
		if (!eventTarget || timeoutMap.has(eventTarget)) return;
		timeoutMap.set(eventTarget, setTimeout(() => {
			timeoutMap.delete(eventTarget);
			doPreload();
		}, preloadDelay()));
	};
	const handleTouchStart = (_) => {
		if (local.disabled || preload() !== "intent") return;
		doPreload();
	};
	const handleLeave = (e) => {
		if (local.disabled) return;
		const eventTarget = e.currentTarget || e.target;
		if (eventTarget) {
			const id = timeoutMap.get(eventTarget);
			clearTimeout(id);
			timeoutMap.delete(eventTarget);
		}
	};
	const simpleStyling = createMemo(() => local.activeProps === STATIC_ACTIVE_PROPS_GET && local.inactiveProps === STATIC_INACTIVE_PROPS_GET && local.class === void 0 && local.style === void 0, { lazy: true });
	const onClick = createComposedHandler(() => local.onClick, handleClick);
	const onBlur = createComposedHandler(() => local.onBlur, handleLeave);
	const onFocus = createComposedHandler(() => local.onFocus, enqueueIntentPreload);
	const onMouseEnter = createComposedHandler(() => local.onMouseEnter, enqueueIntentPreload);
	const onMouseOver = createComposedHandler(() => local.onMouseOver, enqueueIntentPreload);
	const onMouseLeave = createComposedHandler(() => local.onMouseLeave, handleLeave);
	const onMouseOut = createComposedHandler(() => local.onMouseOut, handleLeave);
	const onTouchStart = createComposedHandler(() => local.onTouchStart, handleTouchStart);
	return merge(propsSafeToSpread, createMemo(() => {
		const active = isActive();
		const base = {
			href: hrefOption()?.href,
			ref: mergeRefs(setRef, _options().ref),
			onClick,
			onBlur,
			onFocus,
			onMouseEnter,
			onMouseOver,
			onMouseLeave,
			onMouseOut,
			onTouchStart,
			disabled: !!local.disabled,
			target: local.target,
			...local.disabled && STATIC_DISABLED_PROPS,
			...isTransitioning() && STATIC_TRANSITIONING_ATTRIBUTES
		};
		if (simpleStyling()) return {
			...base,
			...active && STATIC_DEFAULT_ACTIVE_ATTRIBUTES
		};
		const activeProps = active ? functionalUpdate(local.activeProps, {}) ?? EMPTY_OBJECT : EMPTY_OBJECT;
		const inactiveProps = active ? EMPTY_OBJECT : functionalUpdate(local.inactiveProps, {});
		const style = {
			...local.style,
			...activeProps.style,
			...inactiveProps.style
		};
		const className = [
			local.class,
			activeProps.class,
			inactiveProps.class
		].filter(Boolean).join(" ");
		return {
			...activeProps,
			...inactiveProps,
			...base,
			...Object.keys(style).length ? { style } : void 0,
			...className ? { class: className } : void 0,
			...active && STATIC_ACTIVE_ATTRIBUTES
		};
	}, { lazy: true }));
}
var STATIC_ACTIVE_PROPS = { class: "active" };
var STATIC_ACTIVE_PROPS_GET = () => STATIC_ACTIVE_PROPS;
var EMPTY_OBJECT = {};
var STATIC_INACTIVE_PROPS_GET = () => EMPTY_OBJECT;
var STATIC_DEFAULT_ACTIVE_ATTRIBUTES = {
	class: "active",
	"data-status": "active",
	"aria-current": "page"
};
var STATIC_DISABLED_PROPS = {
	role: "link",
	"aria-disabled": "true"
};
var STATIC_ACTIVE_ATTRIBUTES = {
	"data-status": "active",
	"aria-current": "page"
};
var STATIC_TRANSITIONING_ATTRIBUTES = { "data-transitioning": "transitioning" };
/** Call a JSX.EventHandlerUnion with the event. */
function callHandler(event, handler) {
	if (typeof handler === "function") handler(event);
	else handler[0](handler[1], event);
	return event.defaultPrevented;
}
function createComposedHandler(getHandler, fallback) {
	return (event) => {
		const handler = getHandler();
		if (!handler || !callHandler(event, handler)) fallback(event);
	};
}
var Link = (props) => {
	const [local, rest] = splitProps(props, ["_asChild", "children"]);
	const [_, linkProps] = splitProps(useLinkProps(rest), ["type"]);
	const resolvedChildren = children(() => local.children);
	const children$1 = () => {
		const ch = resolvedChildren();
		if (typeof ch === "function") return ch({
			get isActive() {
				return linkProps["data-status"] === "active";
			},
			get isTransitioning() {
				return linkProps["data-transitioning"] === "transitioning";
			}
		});
		return ch;
	};
	if (local._asChild === "svg") {
		const [_, svgLinkProps] = splitProps(linkProps, ["class"]);
		return ssr(_tmpl$$2, ssrHydrationKey(), ssrElement("a", svgLinkProps, () => () => escape(children$1()), false));
	}
	if (!local._asChild) return ssrElement("a", linkProps, () => () => escape(children$1()), true);
	return Dynamic(mergeProps({ get component() {
		return local._asChild;
	} }, linkProps, { get children() {
		return children$1();
	} }));
};
function isCtrlEvent(e) {
	return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function isSafeInternal(to) {
	if (typeof to !== "string") return false;
	const zero = to.charCodeAt(0);
	if (zero === 47) return to.charCodeAt(1) !== 47;
	return zero === 46;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/useLoaderData.jsx
function useLoaderData(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		select: (s) => {
			return opts.select ? opts.select(s.loaderData) : s.loaderData;
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/useLoaderDeps.jsx
function useLoaderDeps(opts) {
	return useMatch({
		...opts,
		select: (s) => {
			return opts.select ? opts.select(s.loaderDeps) : s.loaderDeps;
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/useParams.jsx
function useParams(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		shouldThrow: opts.shouldThrow,
		select: (match) => {
			const params = opts.strict === false ? match.params : match._strictParams;
			return opts.select ? opts.select(params) : params;
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/useSearch.jsx
function useSearch(opts) {
	return useMatch({
		from: opts.from,
		strict: opts.strict,
		shouldThrow: opts.shouldThrow,
		select: (match) => {
			const search = match.search;
			return opts.select ? opts.select(search) : search;
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/route.jsx
var Route$7 = class extends BaseRoute {
	/**
	* @deprecated Use the `createRoute` function instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = (props) => {
			const _self$ = this;
			return Link(mergeProps({ get from() {
				return _self$.fullPath;
			} }, props));
		};
	}
};
function createRoute(options) {
	return new Route$7(options);
}
var RootRoute = class extends BaseRootRoute {
	/**
	* @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
	*/
	constructor(options) {
		super(options);
		this.useMatch = (opts) => {
			return useMatch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useRouteContext = (opts) => {
			return useRouteContext({
				...opts,
				from: this.id
			});
		};
		this.useSearch = (opts) => {
			return useSearch({
				select: opts?.select,
				from: this.id
			});
		};
		this.useParams = (opts) => {
			return useParams({
				select: opts?.select,
				from: this.id
			});
		};
		this.useLoaderDeps = (opts) => {
			return useLoaderDeps({
				...opts,
				from: this.id
			});
		};
		this.useLoaderData = (opts) => {
			return useLoaderData({
				...opts,
				from: this.id
			});
		};
		this.useNavigate = () => {
			return useNavigate({ from: this.fullPath });
		};
		this.Link = (props) => {
			const _self$2 = this;
			return Link(mergeProps({ get from() {
				return _self$2.fullPath;
			} }, props));
		};
	}
};
function createRootRoute(options) {
	return new RootRoute(options);
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/fileRoute.js
function createFileRoute(path) {
	if (typeof path === "object") return new FileRoute(path, { silent: true }).createRoute(path);
	return new FileRoute(path, { silent: true }).createRoute;
}
/**
@deprecated It's no longer recommended to use the `FileRoute` class directly.
Instead, use `createFileRoute('/path/to/file')(options)` to create a file route.
*/
var FileRoute = class {
	constructor(path, _opts) {
		this.path = path;
		this.createRoute = (options) => {
			const route = createRoute(options);
			route.isRoot = false;
			return route;
		};
		this.silent = _opts?.silent;
	}
};
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/lazyRouteComponent.jsx
function lazyRouteComponent(importer, exportName) {
	let loadPromise;
	let comp;
	let error;
	const load = () => {
		if (!loadPromise) loadPromise = importer().then((res) => {
			loadPromise = void 0;
			comp = res[exportName ?? "default"];
			return comp;
		}).catch((err) => {
			error = err;
		});
		return loadPromise;
	};
	const lazyComp = function Lazy(props) {
		if (error) {
			if (isModuleNotFoundError(error)) {
				if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
					const storageKey = `tanstack_router_reload:${error.message}`;
					if (!sessionStorage.getItem(storageKey)) {
						sessionStorage.setItem(storageKey, "1");
						window.location.reload();
						return { default: () => null };
					}
				}
			}
			throw error;
		}
		if (!comp) {
			const compResource = createMemo(load);
			return Dynamic(mergeProps({ get component() {
				return compResource();
			} }, props));
		}
		return Dynamic(mergeProps({ component: comp }, props));
	};
	lazyComp.preload = load;
	return lazyComp;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/routerStores.js
function initRouterStores(stores, createReadonlyStore) {
	stores.childMatchIdByRouteId = createReadonlyStore(() => {
		const ids = stores.matchesId.state;
		const obj = {};
		for (let i = 0; i < ids.length - 1; i++) {
			const parentStore = stores.activeMatchStoresById.get(ids[i]);
			if (parentStore?.routeId) obj[parentStore.routeId] = ids[i + 1];
		}
		return obj;
	});
	stores.pendingRouteIds = createReadonlyStore(() => {
		const ids = stores.pendingMatchesId.state;
		const obj = {};
		for (const id of ids) {
			const store = stores.pendingMatchStoresById.get(id);
			if (store?.routeId) obj[store.routeId] = true;
		}
		return obj;
	});
}
if (typeof globalThis !== "undefined" && "FinalizationRegistry" in globalThis) new FinalizationRegistry((cb) => cb());
var getStoreFactory = (opts) => {
	return {
		createMutableStore: createNonReactiveMutableStore,
		createReadonlyStore: createNonReactiveReadonlyStore,
		batch: (fn) => fn(),
		init: (stores) => initRouterStores(stores, createNonReactiveReadonlyStore)
	};
};
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/router.js
var createRouter = (options) => {
	return new Router(options);
};
var Router = class extends RouterCore {
	constructor(options) {
		super(options, getStoreFactory);
	}
};
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/Asset.jsx
function Asset({ tag, attrs, children }) {
	switch (tag) {
		case "title": return Title({
			attrs,
			children
		});
		case "meta": return HeadElement({
			tag: "meta",
			attrs
		});
		case "link": return HeadElement({
			tag: "link",
			attrs
		});
		case "style": return HeadElement({
			tag: "style",
			attrs,
			children
		});
		case "script": return Script({
			attrs,
			children
		});
		default: return null;
	}
}
function HeadElement(props) {
	useRouter();
	{
		const { tag, attrs, children } = props;
		if (tag === "style" && typeof children === "string") return ssrElement("style", mergeProps(attrs, { innerHTML: children }), void 0, true);
		if (tag === "style") return ssrElement("style", attrs, void 0, true);
		if (tag === "meta") return ssrElement("meta", attrs, void 0, true);
		return ssrElement("link", attrs, void 0, true);
	}
	createEffect(() => ({
		tag: props.tag,
		attrs: props.attrs,
		children: props.children
	}), ({ tag, attrs, children }) => {
		const el = document.createElement(tag);
		if (attrs) {
			for (const [key, value] of Object.entries(attrs)) if (value !== void 0 && value !== false && value !== null) el.setAttribute(key, typeof value === "boolean" ? "" : String(value));
		}
		if (tag === "style" && typeof children === "string") el.textContent = children;
		document.head.appendChild(el);
		return () => {
			if (el.parentNode) el.parentNode.removeChild(el);
		};
	});
	return null;
}
function Title(props) {
	useRouter();
	const attrs = props.attrs;
	const children = props.children;
	return ssrElement("title", attrs, () => escape(children), true);
}
function Script(props) {
	useRouter();
	const attrs = props.attrs;
	const children = props.children;
	typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type;
	if (attrs?.src) return ssrElement("script", attrs, void 0, true);
	if (typeof children === "string") return ssrElement("script", mergeProps(attrs, { innerHTML: children }), void 0, true);
	return null;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/headContentUtils.jsx
/**
* Build the list of head/link/meta/script tags to render for active matches.
* Used internally by `HeadContent`.
*/
var useTags = (assetCrossOrigin) => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	const getTagKey = (tag) => JSON.stringify(tag);
	const activeMatches = createMemo(() => router.stores.activeMatchesSnapshot.state);
	const routeMeta = createMemo(() => activeMatches().map((match) => match.meta).filter(Boolean));
	const meta = createMemo(() => {
		const resultMeta = [];
		const metaByAttribute = {};
		let title;
		const routeMetasArray = routeMeta();
		for (let i = routeMetasArray.length - 1; i >= 0; i--) {
			const metas = routeMetasArray[i];
			for (let j = metas.length - 1; j >= 0; j--) {
				const m = metas[j];
				if (!m) continue;
				if (m.title) {
					if (!title) title = {
						tag: "title",
						children: m.title
					};
				} else if ("script:ld+json" in m) try {
					const json = JSON.stringify(m["script:ld+json"]);
					resultMeta.push({
						tag: "script",
						attrs: { type: "application/ld+json" },
						children: escapeHtml(json)
					});
				} catch {}
				else {
					const attribute = m.name ?? m.property;
					if (attribute) if (metaByAttribute[attribute]) continue;
					else metaByAttribute[attribute] = true;
					resultMeta.push({
						tag: "meta",
						attrs: {
							...m,
							nonce
						}
					});
				}
			}
		}
		if (title) resultMeta.push(title);
		if (router.options.ssr?.nonce) resultMeta.push({
			tag: "meta",
			attrs: {
				property: "csp-nonce",
				content: router.options.ssr.nonce
			}
		});
		resultMeta.reverse();
		return resultMeta;
	});
	const links = createMemo(() => {
		const matches = activeMatches();
		const constructed = matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
			tag: "link",
			attrs: {
				...link,
				nonce
			}
		}));
		const manifest = router.ssr?.manifest;
		const assets = matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map((asset) => ({
			tag: "link",
			attrs: {
				...asset.attrs,
				crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "stylesheet") ?? asset.attrs?.crossOrigin,
				nonce
			}
		}));
		return [...constructed, ...assets];
	});
	const preloadLinks = createMemo(() => {
		const matches = activeMatches();
		const preloadLinks = [];
		matches.map((match) => router.looseRoutesById[match.routeId]).forEach((route) => router.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
			const preloadLink = resolveManifestAssetLink(preload);
			preloadLinks.push({
				tag: "link",
				attrs: {
					rel: "modulepreload",
					href: preloadLink.href,
					crossOrigin: getAssetCrossOrigin(assetCrossOrigin, "modulepreload") ?? preloadLink.crossOrigin,
					nonce
				}
			});
		}));
		return preloadLinks;
	});
	const styles = createMemo(() => activeMatches().map((match) => match.styles).flat(1).filter(Boolean).map(({ children, ...style }) => ({
		tag: "style",
		attrs: {
			...style,
			nonce
		},
		children
	})));
	const headScripts = createMemo(() => activeMatches().map((match) => match.headScripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			nonce
		},
		children
	})));
	return createMemo((prev) => {
		const next = uniqBy([
			...meta(),
			...preloadLinks(),
			...links(),
			...styles(),
			...headScripts()
		], getTagKey);
		if (prev && prev.length === next.length && prev.every((tag, index) => getTagKey(tag) === getTagKey(next[index]))) return prev;
		return next;
	});
};
function uniqBy(arr, fn) {
	const seen = /* @__PURE__ */ new Set();
	return arr.filter((item) => {
		const key = fn(item);
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/HeadContent.jsx
/**
* @description The `HeadContent` component is used to render meta tags, links, and scripts for the current route.
* Place this component inside the `<head>` of your document so the rendered tags end up in the right place.
*/
function HeadContent(props) {
	const tags = useTags(props.assetCrossOrigin);
	return [HydrationScript({}), For({
		get each() {
			return tags();
		},
		children: (tag) => {
			const t = tag;
			return Asset({
				get tag() {
					return t.tag;
				},
				get attrs() {
					return t.attrs;
				},
				get children() {
					return t.children;
				}
			});
		}
	})];
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/Scripts.jsx
var Scripts = () => {
	const router = useRouter();
	const nonce = router.options.ssr?.nonce;
	const activeMatches = createMemo(() => router.stores.activeMatchesSnapshot.state);
	const assetScripts = createMemo(() => {
		const assetScripts = [];
		const manifest = router.ssr?.manifest;
		if (!manifest) return [];
		activeMatches().map((match) => router.looseRoutesById[match.routeId]).forEach((route) => manifest.routes[route.id]?.assets?.filter((d) => d.tag === "script").forEach((asset) => {
			assetScripts.push({
				tag: "script",
				attrs: {
					...asset.attrs,
					nonce
				},
				children: asset.children
			});
		}));
		return assetScripts;
	});
	const scripts = createMemo(() => activeMatches().map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
		tag: "script",
		attrs: {
			...script,
			nonce
		},
		children
	})));
	const serverBufferedScript = router.serverSsr ? router.serverSsr.takeBufferedScripts() : void 0;
	const allScripts = createMemo(() => {
		const result = [...scripts(), ...assetScripts()];
		if (serverBufferedScript) result.unshift(serverBufferedScript);
		return result;
	});
	return NoHydration({ get children() {
		return For({
			get each() {
				return allScripts();
			},
			children: (asset) => {
				return Asset(asset);
			}
		});
	} });
};
//#endregion
//#region src/styles/app.css?url
var app_default = "/assets/app-B3fc_Pjl.css";
//#endregion
//#region src/providers/convex.tsx
function AppConvexProvider(props) {
	return ConvexProvider({
		client: convexClient,
		get children() {
			return props.children;
		}
	});
}
//#endregion
//#region src/routes/__root.tsx
var _tmpl$$1 = [
	"<html",
	"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\"><meta name=\"theme-color\" content=\"#0a6c74\"><link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&amp;family=Inter:wght@400..700&amp;display=swap\"><link rel=\"stylesheet\"",
	"><!--$-->",
	"<!--/--></head><body><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></body></html>"
];
var Route$6 = createRootRoute({
	beforeLoad: async () => {
		const { token } = await fetchAuth();
		return { token };
	},
	shellComponent: RootDocument
});
function RootDocument(props) {
	var _v$ = ssrHydrationKey(), _v$2 = escape(HeadContent({})), _v$3 = escape(Loading({ get children() {
		return AppConvexProvider({ get children() {
			return props.children;
		} });
	} })), _v$4 = escape(Scripts({}));
	return ssr(_tmpl$$1, _v$, ssrAttribute("href", escape(app_default, true)), _v$2, _v$3, _v$4);
}
//#endregion
//#region src/routes/ui.tsx
var $$splitComponentImporter$4 = () => import("./ui-BopoCe21.js");
var Route$5 = createFileRoute("/ui")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$3 = () => import("./about-fPK0fQoO.js");
var Route$4 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/_authed.tsx
var $$splitComponentImporter$2 = () => import("./_authed-CRwia7wk.js");
var Route$3 = createFileRoute("/_authed")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	beforeLoad: async (ctx) => {
		const user = await fetchUser();
		if (!ctx.context.token) throw redirect({ to: "/" });
		return { user };
	}
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$1 = () => import("./routes-DFrV47OU.js");
var Route$2 = createFileRoute("/")({
	beforeLoad: (ctx) => {
		if (ctx.context.token) throw redirect({ to: "/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/_authed/dashboard.tsx
var $$splitComponentImporter = () => import("./dashboard-B-mJgyM3.js");
var Route$1 = createFileRoute("/_authed/dashboard")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routes/api/auth/$.ts
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => handler(request),
	POST: ({ request }) => handler(request)
} } });
//#endregion
//#region src/routeTree.gen.ts
var UiRoute = Route$5.update({
	id: "/ui",
	path: "/ui",
	getParentRoute: () => Route$6
});
var AboutRoute = Route$4.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$6
});
var AuthedRoute = Route$3.update({
	id: "/_authed",
	getParentRoute: () => Route$6
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AuthedDashboardRoute = Route$1.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthedRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$6
});
var AuthedRouteChildren = { AuthedDashboardRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthedRoute: AuthedRoute._addFileChildren(AuthedRouteChildren),
	AboutRoute,
	UiRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var _tmpl$ = [
	"<p",
	">",
	"</p>"
], _tmpl$2 = ["<p", ">not found</p>"];
function getRouter() {
	return createRouter({
		routeTree,
		defaultPreload: "intent",
		defaultErrorComponent: (err) => {
			var _v$, _v$2;
			return _v$ = ssrHydrationKey(), _v$2 = () => escape(err.error.stack), ssr(_tmpl$, _v$, _v$2);
		},
		defaultNotFoundComponent: () => {
			var _v$3;
			return _v$3 = ssrHydrationKey(), ssr(_tmpl$2, _v$3);
		},
		scrollRestoration: true
	});
}
//#endregion
export { getRouter };
