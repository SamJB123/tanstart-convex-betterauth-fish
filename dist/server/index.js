import { n as invariant, o as decodePath, t as nearestMatchContext } from "./assets/matchContext-C5GwsjJN.js";
import { c as isNotFound, m as createLRUCache, n as getLocationChangeInfo, o as executeRewriteInput, p as trimPathRight, r as createMemoryHistory, s as rootRouteId } from "./assets/router-DJ4MDNFY.js";
import { n as isResolvedRedirect, t as isRedirect } from "./assets/redirect-BwM679Xn.js";
import { n as resolveManifestAssetLink } from "./assets/manifest-DMhCq4qv.js";
import { A as flush, B as Pu, E as createRenderEffect, F as runWithOwner, G as re, H as ai, K as su, P as onSettled, T as createMemo, U as dn, V as Sn, W as iu, a as mergeProps, b as Show, o as renderToStream, z as p } from "./assets/server-Bjhk73rZ.js";
import { a as ErrorComponent, i as CatchBoundary, r as SafeFragment, t as Match } from "./assets/Match-ZCdcoG0e.js";
import { n as routerContext, t as useRouter } from "./assets/useRouter-DHapt4-n.js";
import { n as getResponse, r as requestHandler } from "./assets/request-response-BxCcpG16.js";
import { t as getServerFnById } from "./assets/__tanstack-start-server-fn-resolver-B2cM8EuV.js";
import { a as runWithStartContext, c as FrameType, d as TSS_SERVER_FUNCTION, f as X_TSS_RAW_RESPONSE, i as getStartOptions, l as TSS_CONTENT_TYPE_FRAMED_VERSIONED, n as flattenMiddlewares, o as createNullProtoObject, p as X_TSS_SERIALIZED, r as mergeHeaders, s as safeObjectMerge, u as TSS_FORMDATA_CONTEXT } from "./assets/createServerFn-CqXZf4BL.js";
import { ReadableStream as ReadableStream$1 } from "node:stream/web";
import "node:stream";
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/constants.js
var GLOBAL_TSR = "$_TSR";
var TSR_SCRIPT_BARRIER_ID = "$tsr-stream-barrier";
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/serializer/transformer.js
/**
* Create a strongly-typed serialization adapter for SSR hydration.
* Use to register custom types with the router serializer.
*/
function createSerializationAdapter(opts) {
	return opts;
}
/** Create a Seroval plugin for server-side serialization only. */
function makeSsrSerovalPlugin(serializationAdapter, options) {
	return ai({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: { stream(value, ctx) {
			return ctx.parse(serializationAdapter.toSerializable(value));
		} },
		serialize(node, ctx) {
			options.didRun = true;
			return GLOBAL_TSR + ".t.get(\"" + serializationAdapter.key + "\")(" + ctx.serialize(node) + ")";
		},
		deserialize: void 0
	});
}
/** Create a Seroval plugin for client/server symmetric (de)serialization. */
function makeSerovalPlugin(serializationAdapter) {
	return ai({
		tag: "$TSR/t/" + serializationAdapter.key,
		test: serializationAdapter.test,
		parse: {
			sync(value, ctx) {
				return ctx.parse(serializationAdapter.toSerializable(value));
			},
			async async(value, ctx) {
				return await ctx.parse(serializationAdapter.toSerializable(value));
			},
			stream(value, ctx) {
				return ctx.parse(serializationAdapter.toSerializable(value));
			}
		},
		serialize: void 0,
		deserialize(node, ctx) {
			return serializationAdapter.fromSerializable(ctx.deserialize(node));
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/serializer/RawStream.js
/**
* Marker class for ReadableStream<Uint8Array> that should be serialized
* with base64 encoding (SSR) or binary framing (server functions).
*
* Wrap your binary streams with this to get efficient serialization:
* ```ts
* // For binary data (files, images, etc.)
* return { data: new RawStream(file.stream()) }
*
* // For text-heavy data (RSC payloads, etc.)
* return { data: new RawStream(rscStream, { hint: 'text' }) }
* ```
*/
var RawStream = class {
	constructor(stream, options) {
		this.stream = stream;
		this.hint = options?.hint ?? "binary";
	}
};
var BufferCtor = globalThis.Buffer;
var hasNodeBuffer = !!BufferCtor && typeof BufferCtor.from === "function";
function uint8ArrayToBase64(bytes) {
	if (bytes.length === 0) return "";
	if (hasNodeBuffer) return BufferCtor.from(bytes).toString("base64");
	const CHUNK_SIZE = 32768;
	const chunks = [];
	for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
		const chunk = bytes.subarray(i, i + CHUNK_SIZE);
		chunks.push(String.fromCharCode.apply(null, chunk));
	}
	return btoa(chunks.join(""));
}
function base64ToUint8Array(base64) {
	if (base64.length === 0) return new Uint8Array(0);
	if (hasNodeBuffer) {
		const buf = BufferCtor.from(base64, "base64");
		return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
	}
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
var RAW_STREAM_FACTORY_BINARY = Object.create(null);
var RAW_STREAM_FACTORY_TEXT = Object.create(null);
var RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY = (stream) => new ReadableStream({ start(controller) {
	stream.on({
		next(base64) {
			try {
				controller.enqueue(base64ToUint8Array(base64));
			} catch {}
		},
		throw(error) {
			controller.error(error);
		},
		return() {
			try {
				controller.close();
			} catch {}
		}
	});
} });
var textEncoderForFactory = new TextEncoder();
var RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT = (stream) => {
	return new ReadableStream({ start(controller) {
		stream.on({
			next(value) {
				try {
					if (typeof value === "string") controller.enqueue(textEncoderForFactory.encode(value));
					else controller.enqueue(base64ToUint8Array(value.$b64));
				} catch {}
			},
			throw(error) {
				controller.error(error);
			},
			return() {
				try {
					controller.close();
				} catch {}
			}
		});
	} });
};
var FACTORY_BINARY = `(s=>new ReadableStream({start(c){s.on({next(b){try{const d=atob(b),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}catch(_){}},throw(e){c.error(e)},return(){try{c.close()}catch(_){}}})}}))`;
var FACTORY_TEXT = `(s=>{const e=new TextEncoder();return new ReadableStream({start(c){s.on({next(v){try{if(typeof v==='string'){c.enqueue(e.encode(v))}else{const d=atob(v.$b64),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}}catch(_){}},throw(x){c.error(x)},return(){try{c.close()}catch(_){}}})}})})`;
function toBinaryStream(readable) {
	const stream = re();
	const reader = readable.getReader();
	(async () => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					stream.return(void 0);
					break;
				}
				stream.next(uint8ArrayToBase64(value));
			}
		} catch (error) {
			stream.throw(error);
		} finally {
			reader.releaseLock();
		}
	})();
	return stream;
}
function toTextStream(readable) {
	const stream = re();
	const reader = readable.getReader();
	const decoder = new TextDecoder("utf-8", { fatal: true });
	(async () => {
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					try {
						const remaining = decoder.decode();
						if (remaining.length > 0) stream.next(remaining);
					} catch {}
					stream.return(void 0);
					break;
				}
				try {
					const text = decoder.decode(value, { stream: true });
					if (text.length > 0) stream.next(text);
				} catch {
					stream.next({ $b64: uint8ArrayToBase64(value) });
				}
			}
		} catch (error) {
			stream.throw(error);
		} finally {
			reader.releaseLock();
		}
	})();
	return stream;
}
/**
* SSR Plugin - uses base64 or UTF-8+base64 encoding for chunks, delegates to seroval's stream mechanism.
* Used during SSR when serializing to JavaScript code for HTML injection.
*
* Supports two modes based on RawStream hint:
* - 'binary': Always base64 encode (default)
* - 'text': Try UTF-8 first, fallback to base64 for invalid UTF-8
*/
var RawStreamSSRPlugin = ai({
	tag: "tss/RawStream",
	extends: [ai({
		tag: "tss/RawStreamFactory",
		test(value) {
			return value === RAW_STREAM_FACTORY_BINARY;
		},
		parse: {
			sync() {},
			async() {
				return Promise.resolve(void 0);
			},
			stream() {}
		},
		serialize() {
			return FACTORY_BINARY;
		},
		deserialize() {
			return RAW_STREAM_FACTORY_BINARY;
		}
	}), ai({
		tag: "tss/RawStreamFactoryText",
		test(value) {
			return value === RAW_STREAM_FACTORY_TEXT;
		},
		parse: {
			sync() {},
			async() {
				return Promise.resolve(void 0);
			},
			stream() {}
		},
		serialize() {
			return FACTORY_TEXT;
		},
		deserialize() {
			return RAW_STREAM_FACTORY_TEXT;
		}
	})],
	test(value) {
		return value instanceof RawStream;
	},
	parse: {
		sync(value, ctx) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			return {
				hint: value.hint,
				factory: ctx.parse(factory),
				stream: ctx.parse(re())
			};
		},
		async async(value, ctx) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
			return {
				hint: value.hint,
				factory: await ctx.parse(factory),
				stream: await ctx.parse(encodedStream)
			};
		},
		stream(value, ctx) {
			const factory = value.hint === "text" ? RAW_STREAM_FACTORY_TEXT : RAW_STREAM_FACTORY_BINARY;
			const encodedStream = value.hint === "text" ? toTextStream(value.stream) : toBinaryStream(value.stream);
			return {
				hint: value.hint,
				factory: ctx.parse(factory),
				stream: ctx.parse(encodedStream)
			};
		}
	},
	serialize(node, ctx) {
		return "(" + ctx.serialize(node.factory) + ")(" + ctx.serialize(node.stream) + ")";
	},
	deserialize(node, ctx) {
		const stream = ctx.deserialize(node.stream);
		return node.hint === "text" ? RAW_STREAM_FACTORY_CONSTRUCTOR_TEXT(stream) : RAW_STREAM_FACTORY_CONSTRUCTOR_BINARY(stream);
	}
});
/**
* Creates an RPC plugin instance that registers raw streams with a multiplexer.
* Used for server function responses where we want binary framing.
* Note: RPC always uses binary framing regardless of hint.
*
* @param onRawStream Callback invoked when a RawStream is encountered during serialization
*/
function createRawStreamRPCPlugin(onRawStream) {
	let nextStreamId = 1;
	return ai({
		tag: "tss/RawStream",
		test(value) {
			return value instanceof RawStream;
		},
		parse: {
			async(value) {
				const streamId = nextStreamId++;
				onRawStream(streamId, value.stream);
				return Promise.resolve({ streamId });
			},
			stream(value) {
				const streamId = nextStreamId++;
				onRawStream(streamId, value.stream);
				return { streamId };
			}
		},
		serialize() {
			throw new Error("RawStreamRPCPlugin.serialize should not be called. RPC uses JSON serialization, not JS code generation.");
		},
		deserialize() {
			throw new Error("RawStreamRPCPlugin.deserialize should not be called. Use createRawStreamDeserializePlugin on client.");
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/serializer/seroval-plugins.js
var defaultSerovalPlugins = [
	/* @__PURE__ */ ai({
		tag: "$TSR/Error",
		test(value) {
			return value instanceof Error;
		},
		parse: {
			sync(value, ctx) {
				return { message: ctx.parse(value.message) };
			},
			async async(value, ctx) {
				return { message: await ctx.parse(value.message) };
			},
			stream(value, ctx) {
				return { message: ctx.parse(value.message) };
			}
		},
		serialize(node, ctx) {
			return "new Error(" + ctx.serialize(node.message) + ")";
		},
		deserialize(node, ctx) {
			return new Error(ctx.deserialize(node.message));
		}
	}),
	RawStreamSSRPlugin,
	p
];
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/Transitioner.jsx
/**
* Inline version of handleHashScroll that accepts a pre-captured location
* to avoid reading router.stores.location.state inside an effect callback
* (which would trigger a Solid v2 reactive warning).
*/
function handleHashScrollWithLocation(_router, location) {
	if (typeof document !== "undefined" && document.querySelector) {
		const hashScrollIntoViewOptions = location.state.__hashScrollIntoViewOptions ?? true;
		if (hashScrollIntoViewOptions && location.hash !== "") {
			const el = document.getElementById(location.hash);
			if (el) el.scrollIntoView(hashScrollIntoViewOptions);
		}
	}
}
function Transitioner() {
	const router = useRouter();
	let mountLoadForRouter = {
		router,
		mounted: false
	};
	const isLoading = createMemo(() => router.stores.isLoading.state);
	const [isSolidTransitioning] = [() => false];
	const hasPendingMatches = createMemo(() => router.stores.hasPendingMatches.state);
	const isAnyPending = createMemo(() => isLoading() || isSolidTransitioning() || hasPendingMatches());
	const isPagePending = createMemo(() => isLoading() || hasPendingMatches());
	router.startTransition = (fn) => {
		runWithOwner(null, fn);
		try {
			flush();
		} catch {}
	};
	onSettled(() => {
		const unsub = router.history.subscribe(() => {
			queueMicrotask(() => router.load());
		});
		router.updateLatestLocation();
		const nextLocation = router.buildLocation({
			to: router.latestLocation.pathname,
			search: true,
			params: true,
			hash: true,
			state: true,
			_includeValidateSearch: true
		});
		if (trimPathRight(router.latestLocation.publicHref) !== trimPathRight(nextLocation.publicHref)) router.commitLocation({
			...nextLocation,
			replace: true
		});
		return () => {
			unsub();
		};
	});
	onSettled(() => {
		if (typeof window !== "undefined" && router.ssr || mountLoadForRouter.router === router && mountLoadForRouter.mounted) return;
		mountLoadForRouter = {
			router,
			mounted: true
		};
		queueMicrotask(() => {
			const tryLoad = async () => {
				try {
					await router.load();
				} catch (err) {
					console.error(err);
				}
			};
			tryLoad();
		});
	});
	createRenderEffect(() => [
		isLoading(),
		isPagePending(),
		isAnyPending(),
		router.stores.location.state,
		router.stores.resolvedLocation.state
	], ([currentIsLoading, currentIsPagePending, currentIsAnyPending, loc, resolvedLoc], prev) => {
		if (!loc) return;
		const previousIsLoading = prev?.[0];
		const previousIsPagePending = prev?.[1];
		const previousIsAnyPending = prev?.[2];
		if (previousIsLoading && !currentIsLoading) router.emit({
			type: "onLoad",
			...getLocationChangeInfo(loc, resolvedLoc)
		});
		if (previousIsPagePending && !currentIsPagePending) router.emit({
			type: "onBeforeRouteMount",
			...getLocationChangeInfo(loc, resolvedLoc)
		});
		if (previousIsAnyPending && !currentIsAnyPending) {
			const changeInfo = getLocationChangeInfo(loc, resolvedLoc);
			router.emit({
				type: "onResolved",
				...changeInfo
			});
			runWithOwner(null, () => {
				router.batch(() => {
					router.stores.status.setState(() => "idle");
					router.stores.resolvedLocation.setState(() => loc);
				});
			});
			if (changeInfo.hrefChanged) handleHashScrollWithLocation(router, loc);
		}
	});
	return null;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/Matches.jsx
var NearestMatchContext = nearestMatchContext;
function Matches() {
	const router = useRouter();
	const ResolvedSuspense = (router.options.disableGlobalCatchBoundary, SafeFragment);
	const rootRoute = () => router.routesById[rootRouteId];
	const PendingComponent = rootRoute().options.pendingComponent ?? router.options.defaultPendingComponent;
	return (router.options.InnerWrap || SafeFragment)({ get children() {
		return ResolvedSuspense({
			get fallback() {
				return PendingComponent ? PendingComponent({}) : null;
			},
			get children() {
				return [Transitioner({}), MatchesInner({})];
			}
		});
	} });
}
function MatchesInner() {
	const router = useRouter();
	const matchId = () => router.stores.firstMatchId.state;
	const routeId = () => matchId() ? rootRouteId : void 0;
	const match = () => routeId() ? router.stores.getMatchStoreByRouteId(rootRouteId).state : void 0;
	const hasPendingMatch = () => routeId() ? Boolean(router.stores.pendingRouteIds.state[rootRouteId]) : false;
	const resetKey = () => router.stores.loadedAt.state;
	const nearestMatch = {
		matchId,
		routeId,
		match,
		hasPending: hasPendingMatch
	};
	const matchContent = () => Show({
		get when() {
			return matchId();
		},
		get children() {
			return Match({ get matchId() {
				return matchId();
			} });
		}
	});
	if (router.options.disableGlobalCatchBoundary) return NearestMatchContext({
		value: nearestMatch,
		get children() {
			return matchContent();
		}
	});
	return NearestMatchContext({
		value: nearestMatch,
		get children() {
			return CatchBoundary({
				getResetKey: () => resetKey(),
				errorComponent: ErrorComponent,
				get onCatch() {},
				get children() {
					return matchContent();
				}
			});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/RouterProvider.jsx
var RouterContext = routerContext;
function RouterContextProvider({ router, children, ...rest }) {
	if (Object.keys(rest).length > 0) runWithOwner(null, () => {
		router.update({
			...router.options,
			...rest,
			context: {
				...router.options.context,
				...rest.context
			}
		});
	});
	return (router.options.Wrap || SafeFragment)({ get children() {
		return RouterContext({
			value: router,
			get children() {
				return children();
			}
		});
	} });
}
function RouterProvider({ router, ...rest }) {
	return RouterContextProvider(mergeProps({ router }, rest, { children: () => Matches({}) }));
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-start-server@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-start-server/dist/esm/StartServer.js
function StartServer(props) {
	return RouterProvider({ get router() {
		return props.router;
	} });
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/constants.js
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/router-manifest.js
/**
* @description Returns the router manifest data that should be sent to the client.
* This includes only the assets and preloads for the current route and any
* special assets that are needed for the client. It does not include relationships
* between routes or any other data that is not needed for the client.
*
* The client entry URL is returned separately so that it can be transformed
* (e.g. for CDN rewriting) before being embedded into the `<script>` tag.
*
* @param matchedRoutes - In dev mode, the matched routes are used to build
* the dev styles URL for route-scoped CSS collection.
*/
async function getStartManifest(matchedRoutes) {
	const { tsrStartManifest } = await import("./assets/_tanstack-start-manifest_v-DdQ-LGoR.js");
	const startManifest = tsrStartManifest();
	const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes["__root__"] || {};
	rootRoute.assets = rootRoute.assets || [];
	let injectedHeadScripts;
	return {
		manifest: { routes: Object.fromEntries(Object.entries(startManifest.routes).flatMap(([k, v]) => {
			const result = {};
			let hasData = false;
			if (v.preloads && v.preloads.length > 0) {
				result["preloads"] = v.preloads;
				hasData = true;
			}
			if (v.assets && v.assets.length > 0) {
				result["assets"] = v.assets;
				hasData = true;
			}
			if (!hasData) return [];
			return [[k, result]];
		})) },
		clientEntry: startManifest.clientEntry,
		injectedHeadScripts
	};
}
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/ssr-match-id.js
function dehydrateSsrMatchId(id) {
	return id.replaceAll("/", "\0");
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-client-core@1.167.9/node_modules/@tanstack/start-client-core/dist/esm/getDefaultSerovalPlugins.js
function getDefaultSerovalPlugins() {
	return [...(getStartOptions()?.serializationAdapters)?.map(makeSerovalPlugin) ?? [], ...defaultSerovalPlugins];
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/frame-protocol.js
/**
* Binary frame protocol for multiplexing JSON and raw streams over HTTP.
*
* Frame format: [type:1][streamId:4][length:4][payload:length]
* - type: 1 byte - frame type (JSON, CHUNK, END, ERROR)
* - streamId: 4 bytes big-endian uint32 - stream identifier
* - length: 4 bytes big-endian uint32 - payload length
* - payload: variable length bytes
*/
/** Cached TextEncoder for frame encoding */
var textEncoder$2 = new TextEncoder();
/** Shared empty payload for END frames - avoids allocation per call */
var EMPTY_PAYLOAD = new Uint8Array(0);
/**
* Encodes a single frame with header and payload.
*/
function encodeFrame(type, streamId, payload) {
	const frame = new Uint8Array(9 + payload.length);
	frame[0] = type;
	frame[1] = streamId >>> 24 & 255;
	frame[2] = streamId >>> 16 & 255;
	frame[3] = streamId >>> 8 & 255;
	frame[4] = streamId & 255;
	frame[5] = payload.length >>> 24 & 255;
	frame[6] = payload.length >>> 16 & 255;
	frame[7] = payload.length >>> 8 & 255;
	frame[8] = payload.length & 255;
	frame.set(payload, 9);
	return frame;
}
/**
* Encodes a JSON frame (type 0, streamId 0).
*/
function encodeJSONFrame(json) {
	return encodeFrame(FrameType.JSON, 0, textEncoder$2.encode(json));
}
/**
* Encodes a raw stream chunk frame.
*/
function encodeChunkFrame(streamId, chunk) {
	return encodeFrame(FrameType.CHUNK, streamId, chunk);
}
/**
* Encodes a raw stream end frame.
*/
function encodeEndFrame(streamId) {
	return encodeFrame(FrameType.END, streamId, EMPTY_PAYLOAD);
}
/**
* Encodes a raw stream error frame.
*/
function encodeErrorFrame(streamId, error) {
	const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
	return encodeFrame(FrameType.ERROR, streamId, textEncoder$2.encode(message));
}
/**
* Creates a multiplexed ReadableStream from JSON stream and raw streams.
*
* The JSON stream emits NDJSON lines (from seroval's toCrossJSONStream).
* Raw streams are pumped concurrently, interleaved with JSON frames.
*
* @param jsonStream Stream of JSON strings (each string is one NDJSON line)
* @param rawStreams Map of stream IDs to raw binary streams
*/
function createMultiplexedStream(jsonStream, rawStreams) {
	let activePumps = 1 + rawStreams.size;
	let controllerRef = null;
	let cancelled = false;
	const cancelReaders = [];
	const safeEnqueue = (chunk) => {
		if (cancelled || !controllerRef) return;
		try {
			controllerRef.enqueue(chunk);
		} catch {}
	};
	const safeError = (err) => {
		if (cancelled || !controllerRef) return;
		try {
			controllerRef.error(err);
		} catch {}
	};
	const safeClose = () => {
		if (cancelled || !controllerRef) return;
		try {
			controllerRef.close();
		} catch {}
	};
	const checkComplete = () => {
		activePumps--;
		if (activePumps === 0) safeClose();
	};
	return new ReadableStream({
		start(controller) {
			controllerRef = controller;
			cancelReaders.length = 0;
			const pumpJSON = async () => {
				const reader = jsonStream.getReader();
				cancelReaders.push(() => {
					reader.cancel().catch(() => {});
				});
				try {
					while (true) {
						const { done, value } = await reader.read();
						if (cancelled) break;
						if (done) break;
						safeEnqueue(encodeJSONFrame(value));
					}
				} catch (error) {
					safeError(error);
				} finally {
					reader.releaseLock();
					checkComplete();
				}
			};
			const pumpRawStream = async (streamId, stream) => {
				const reader = stream.getReader();
				cancelReaders.push(() => {
					reader.cancel().catch(() => {});
				});
				try {
					while (true) {
						const { done, value } = await reader.read();
						if (cancelled) break;
						if (done) {
							safeEnqueue(encodeEndFrame(streamId));
							break;
						}
						safeEnqueue(encodeChunkFrame(streamId, value));
					}
				} catch (error) {
					safeEnqueue(encodeErrorFrame(streamId, error));
				} finally {
					reader.releaseLock();
					checkComplete();
				}
			};
			pumpJSON();
			for (const [streamId, stream] of rawStreams) pumpRawStream(streamId, stream);
		},
		cancel() {
			cancelled = true;
			controllerRef = null;
			for (const cancelReader of cancelReaders) cancelReader();
			cancelReaders.length = 0;
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/server-functions-handler.js
var serovalPlugins = void 0;
var textEncoder$1 = new TextEncoder();
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var handleServerAction = async ({ request, context, serverFnId }) => {
	const methodUpper = request.method.toUpperCase();
	const url = new URL(request.url);
	const action = await getServerFnById(serverFnId, { fromClient: true });
	if (action.method && methodUpper !== action.method) return new Response(`expected ${action.method} method. Got ${methodUpper}`, {
		status: 405,
		headers: { Allow: action.method }
	});
	const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
	if (!serovalPlugins) serovalPlugins = getDefaultSerovalPlugins();
	const contentType = request.headers.get("Content-Type");
	function parsePayload(payload) {
		return Pu(payload, { plugins: serovalPlugins });
	}
	return await (async () => {
		try {
			let res = await (async () => {
				if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
					if (methodUpper === "GET") invariant();
					const formData = await request.formData();
					const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
					formData.delete(TSS_FORMDATA_CONTEXT);
					const params = {
						context,
						data: formData,
						method: methodUpper
					};
					if (typeof serializedContext === "string") try {
						const deserializedContext = Pu(JSON.parse(serializedContext), { plugins: serovalPlugins });
						if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(context, deserializedContext);
					} catch (e) {}
					return await action(params);
				}
				if (methodUpper === "GET") {
					const payloadParam = url.searchParams.get("payload");
					if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
					const payload = payloadParam ? parsePayload(JSON.parse(payloadParam)) : {};
					payload.context = safeObjectMerge(context, payload.context);
					payload.method = methodUpper;
					return await action(payload);
				}
				let jsonPayload;
				if (contentType?.includes("application/json")) jsonPayload = await request.json();
				const payload = jsonPayload ? parsePayload(jsonPayload) : {};
				payload.context = safeObjectMerge(payload.context, context);
				payload.method = methodUpper;
				return await action(payload);
			})();
			const unwrapped = res.result || res.error;
			if (isNotFound(res)) res = isNotFoundResponse(res);
			if (!isServerFn) return unwrapped;
			if (unwrapped instanceof Response) {
				if (isRedirect(unwrapped)) return unwrapped;
				unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
				return unwrapped;
			}
			return serializeResult(res);
			function serializeResult(res) {
				let nonStreamingBody = void 0;
				const alsResponse = getResponse();
				if (res !== void 0) {
					const rawStreams = /* @__PURE__ */ new Map();
					const plugins = [createRawStreamRPCPlugin((id, stream) => {
						rawStreams.set(id, stream);
					}), ...serovalPlugins || []];
					let done = false;
					const callbacks = {
						onParse: (value) => {
							nonStreamingBody = value;
						},
						onDone: () => {
							done = true;
						},
						onError: (error) => {
							throw error;
						}
					};
					iu(res, {
						refs: /* @__PURE__ */ new Map(),
						plugins,
						onParse(value) {
							callbacks.onParse(value);
						},
						onDone() {
							callbacks.onDone();
						},
						onError: (error) => {
							callbacks.onError(error);
						}
					});
					if (done && rawStreams.size === 0) return new Response(nonStreamingBody ? JSON.stringify(nonStreamingBody) : void 0, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": "application/json",
							[X_TSS_SERIALIZED]: "true"
						}
					});
					if (rawStreams.size > 0) {
						const multiplexedStream = createMultiplexedStream(new ReadableStream({ start(controller) {
							callbacks.onParse = (value) => {
								controller.enqueue(JSON.stringify(value) + "\n");
							};
							callbacks.onDone = () => {
								try {
									controller.close();
								} catch {}
							};
							callbacks.onError = (error) => controller.error(error);
							if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
						} }), rawStreams);
						return new Response(multiplexedStream, {
							status: alsResponse.status,
							statusText: alsResponse.statusText,
							headers: {
								"Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
								[X_TSS_SERIALIZED]: "true"
							}
						});
					}
					const stream = new ReadableStream({ start(controller) {
						callbacks.onParse = (value) => controller.enqueue(textEncoder$1.encode(JSON.stringify(value) + "\n"));
						callbacks.onDone = () => {
							try {
								controller.close();
							} catch (error) {
								controller.error(error);
							}
						};
						callbacks.onError = (error) => controller.error(error);
						if (nonStreamingBody !== void 0) callbacks.onParse(nonStreamingBody);
					} });
					return new Response(stream, {
						status: alsResponse.status,
						statusText: alsResponse.statusText,
						headers: {
							"Content-Type": "application/x-ndjson",
							[X_TSS_SERIALIZED]: "true"
						}
					});
				}
				return new Response(void 0, {
					status: alsResponse.status,
					statusText: alsResponse.statusText
				});
			}
		} catch (error) {
			if (error instanceof Response) return error;
			if (isNotFound(error)) return isNotFoundResponse(error);
			console.info();
			console.info("Server Fn Error!");
			console.info();
			console.error(error);
			console.info();
			const serializedError = JSON.stringify(await Promise.resolve(su(error, {
				refs: /* @__PURE__ */ new Map(),
				plugins: serovalPlugins
			})));
			const response = getResponse();
			return new Response(serializedError, {
				status: response.status ?? 500,
				statusText: response.statusText,
				headers: {
					"Content-Type": "application/json",
					[X_TSS_SERIALIZED]: "true"
				}
			});
		}
	})();
};
function isNotFoundResponse(error) {
	const { headers, ...rest } = error;
	return new Response(JSON.stringify(rest), {
		status: 404,
		headers: {
			"Content-Type": "application/json",
			...headers || {}
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/transformAssetUrls.js
function normalizeTransformAssetResult(result) {
	if (typeof result === "string") return { href: result };
	return result;
}
function resolveTransformAssetsCrossOrigin(config, kind) {
	if (!config) return void 0;
	if (typeof config === "string") return config;
	return config[kind];
}
function isObjectShorthand(transform) {
	return "prefix" in transform;
}
function resolveTransformAssetsConfig(transform) {
	if (typeof transform === "string") {
		const prefix = transform;
		return {
			type: "transform",
			transformFn: ({ url }) => ({ href: `${prefix}${url}` }),
			cache: true
		};
	}
	if (typeof transform === "function") return {
		type: "transform",
		transformFn: transform,
		cache: true
	};
	if (isObjectShorthand(transform)) {
		const { prefix, crossOrigin } = transform;
		return {
			type: "transform",
			transformFn: ({ url, kind }) => {
				const href = `${prefix}${url}`;
				if (kind === "clientEntry") return { href };
				const co = resolveTransformAssetsCrossOrigin(crossOrigin, kind);
				return co ? {
					href,
					crossOrigin: co
				} : { href };
			},
			cache: true
		};
	}
	if ("createTransform" in transform && transform.createTransform) return {
		type: "createTransform",
		createTransform: transform.createTransform,
		cache: transform.cache !== false
	};
	return {
		type: "transform",
		transformFn: typeof transform.transform === "string" ? (({ url }) => ({ href: `${transform.transform}${url}` })) : transform.transform,
		cache: transform.cache !== false
	};
}
function adaptTransformAssetUrlsToTransformAssets(transformFn) {
	return async ({ url, kind }) => ({ href: await transformFn({
		url,
		type: kind
	}) });
}
function adaptTransformAssetUrlsConfigToTransformAssets(transform) {
	if (typeof transform === "string") return transform;
	if (typeof transform === "function") return adaptTransformAssetUrlsToTransformAssets(transform);
	if ("createTransform" in transform && transform.createTransform) return {
		createTransform: async (ctx) => adaptTransformAssetUrlsToTransformAssets(await transform.createTransform(ctx)),
		cache: transform.cache,
		warmup: transform.warmup
	};
	return {
		transform: typeof transform.transform === "string" ? transform.transform : adaptTransformAssetUrlsToTransformAssets(transform.transform),
		cache: transform.cache,
		warmup: transform.warmup
	};
}
/**
* Builds the client entry `<script>` tag from a (possibly transformed) client
* entry URL and optional injected head scripts.
*/
function buildClientEntryScriptTag(clientEntry, injectedHeadScripts) {
	let script = `import(${JSON.stringify(clientEntry)})`;
	if (injectedHeadScripts) script = `${injectedHeadScripts};${script}`;
	return {
		tag: "script",
		attrs: {
			type: "module",
			async: true
		},
		children: script
	};
}
function assignManifestAssetLink(link, next) {
	if (typeof link === "string") return next.crossOrigin ? next : next.href;
	return next.crossOrigin ? next : { href: next.href };
}
async function transformManifestAssets(source, transformFn, _opts) {
	const manifest = structuredClone(source.manifest);
	for (const route of Object.values(manifest.routes)) {
		if (route.preloads) route.preloads = await Promise.all(route.preloads.map(async (link) => {
			const result = normalizeTransformAssetResult(await transformFn({
				url: resolveManifestAssetLink(link).href,
				kind: "modulepreload"
			}));
			return assignManifestAssetLink(link, {
				href: result.href,
				crossOrigin: result.crossOrigin
			});
		}));
		if (route.assets) {
			for (const asset of route.assets) if (asset.tag === "link" && asset.attrs?.href) {
				const rel = asset.attrs.rel;
				if (!(typeof rel === "string" ? rel.split(/\s+/) : []).includes("stylesheet")) continue;
				const result = normalizeTransformAssetResult(await transformFn({
					url: asset.attrs.href,
					kind: "stylesheet"
				}));
				asset.attrs.href = result.href;
				if (result.crossOrigin) asset.attrs.crossOrigin = result.crossOrigin;
				else delete asset.attrs.crossOrigin;
			}
		}
	}
	const transformedClientEntry = normalizeTransformAssetResult(await transformFn({
		url: source.clientEntry,
		kind: "clientEntry"
	}));
	const rootRoute = manifest.routes[rootRouteId];
	if (rootRoute) {
		rootRoute.assets = rootRoute.assets || [];
		rootRoute.assets.push(buildClientEntryScriptTag(transformedClientEntry.href, source.injectedHeadScripts));
	}
	return manifest;
}
/**
* Builds a final Manifest from a StartManifestWithClientEntry without any
* URL transforms. Used when no transformAssetUrls option is provided.
*
* Returns a new manifest object so the cached base manifest is never mutated.
*/
function buildManifestWithClientEntry(source) {
	const scriptTag = buildClientEntryScriptTag(source.clientEntry, source.injectedHeadScripts);
	const baseRootRoute = source.manifest.routes[rootRouteId];
	return { routes: {
		...source.manifest.routes,
		...baseRootRoute ? { [rootRouteId]: {
			...baseRootRoute,
			assets: [...baseRootRoute.assets || [], scriptTag]
		} } : {}
	} };
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/serializer/ServerFunctionSerializationAdapter.js
var ServerFunctionSerializationAdapter = createSerializationAdapter({
	key: "$TSS/serverfn",
	test: (v) => {
		if (typeof v !== "function") return false;
		if (!(TSS_SERVER_FUNCTION in v)) return false;
		return !!v[TSS_SERVER_FUNCTION];
	},
	toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
	fromSerializable: ({ functionId }) => {
		const fn = async (opts, signal) => {
			return (await (await getServerFnById(functionId, { fromClient: true }))(opts ?? {}, signal)).result;
		};
		return fn;
	}
});
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/tsrScript.js
var tsrScript_default = "self.$_TSR={h(){this.hydrated=!0,this.c()},e(){this.streamEnded=!0,this.c()},c(){this.hydrated&&this.streamEnded&&(delete self.$_TSR,delete self.$R.tsr)},p(e){this.initialized?e():this.buffer.push(e)},buffer:[]}";
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/ssr-server.js
var SCOPE_ID = "tsr";
var TSR_PREFIX = GLOBAL_TSR + ".router=";
var P_PREFIX = GLOBAL_TSR + ".p(()=>";
var P_SUFFIX = ")";
function dehydrateMatch(match) {
	const dehydratedMatch = {
		i: dehydrateSsrMatchId(match.id),
		u: match.updatedAt,
		s: match.status
	};
	for (const [key, shorthand] of [
		["__beforeLoadContext", "b"],
		["loaderData", "l"],
		["error", "e"],
		["ssr", "ssr"]
	]) if (match[key] !== void 0) dehydratedMatch[shorthand] = match[key];
	if (match.globalNotFound) dehydratedMatch.g = true;
	return dehydratedMatch;
}
var INITIAL_SCRIPTS = [dn(SCOPE_ID), tsrScript_default];
var ScriptBuffer = class {
	constructor(router) {
		this._scriptBarrierLifted = false;
		this._cleanedUp = false;
		this._pendingMicrotask = false;
		this.router = router;
		this._queue = INITIAL_SCRIPTS.slice();
	}
	enqueue(script) {
		if (this._cleanedUp) return;
		this._queue.push(script);
		if (this._scriptBarrierLifted && !this._pendingMicrotask) {
			this._pendingMicrotask = true;
			queueMicrotask(() => {
				this._pendingMicrotask = false;
				this.injectBufferedScripts();
			});
		}
	}
	liftBarrier() {
		if (this._scriptBarrierLifted || this._cleanedUp) return;
		this._scriptBarrierLifted = true;
		if (this._queue.length > 0 && !this._pendingMicrotask) {
			this._pendingMicrotask = true;
			queueMicrotask(() => {
				this._pendingMicrotask = false;
				this.injectBufferedScripts();
			});
		}
	}
	/**
	* Flushes any pending scripts synchronously.
	* Call this before emitting onSerializationFinished to ensure all scripts are injected.
	*
	* IMPORTANT: Only injects if the barrier has been lifted. Before the barrier is lifted,
	* scripts should remain in the queue so takeBufferedScripts() can retrieve them
	*/
	flush() {
		if (!this._scriptBarrierLifted) return;
		if (this._cleanedUp) return;
		this._pendingMicrotask = false;
		const scriptsToInject = this.takeAll();
		if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
	}
	takeAll() {
		const bufferedScripts = this._queue;
		this._queue = [];
		if (bufferedScripts.length === 0) return;
		if (bufferedScripts.length === 1) return bufferedScripts[0] + ";document.currentScript.remove()";
		return bufferedScripts.join(";") + ";document.currentScript.remove()";
	}
	injectBufferedScripts() {
		if (this._cleanedUp) return;
		if (this._queue.length === 0) return;
		const scriptsToInject = this.takeAll();
		if (scriptsToInject && this.router?.serverSsr) this.router.serverSsr.injectScript(scriptsToInject);
	}
	cleanup() {
		this._cleanedUp = true;
		this._queue = [];
		this.router = void 0;
	}
};
var isProd = true;
var MANIFEST_CACHE_SIZE = 100;
var manifestCaches = /* @__PURE__ */ new WeakMap();
function getManifestCache(manifest) {
	const cache = manifestCaches.get(manifest);
	if (cache) return cache;
	const newCache = createLRUCache(MANIFEST_CACHE_SIZE);
	manifestCaches.set(manifest, newCache);
	return newCache;
}
function attachRouterServerSsrUtils({ router, manifest }) {
	router.ssr = { manifest };
	let _dehydrated = false;
	let _serializationFinished = false;
	const renderFinishedListeners = [];
	const serializationFinishedListeners = [];
	const scriptBuffer = new ScriptBuffer(router);
	let injectedHtmlBuffer = "";
	router.serverSsr = {
		injectHtml: (html) => {
			if (!html) return;
			injectedHtmlBuffer += html;
			router.emit({ type: "onInjectedHtml" });
		},
		injectScript: (script) => {
			if (!script) return;
			const html = `<script${router.options.ssr?.nonce ? ` nonce='${router.options.ssr.nonce}'` : ""}>${script}<\/script>`;
			router.serverSsr.injectHtml(html);
		},
		dehydrate: async () => {
			if (_dehydrated) invariant();
			let matchesToDehydrate = router.stores.activeMatchesSnapshot.state;
			if (router.isShell()) matchesToDehydrate = matchesToDehydrate.slice(0, 1);
			const matches = matchesToDehydrate.map(dehydrateMatch);
			let manifestToDehydrate = void 0;
			if (manifest) {
				const currentRouteIdsList = matchesToDehydrate.map((m) => m.routeId);
				const manifestCacheKey = currentRouteIdsList.join("\0");
				let filteredRoutes;
				if (isProd) filteredRoutes = getManifestCache(manifest).get(manifestCacheKey);
				if (!filteredRoutes) {
					const currentRouteIds = new Set(currentRouteIdsList);
					const nextFilteredRoutes = {};
					for (const routeId in manifest.routes) {
						const routeManifest = manifest.routes[routeId];
						if (currentRouteIds.has(routeId)) nextFilteredRoutes[routeId] = routeManifest;
						else if (routeManifest.assets && routeManifest.assets.length > 0) nextFilteredRoutes[routeId] = { assets: routeManifest.assets };
					}
					if (isProd) getManifestCache(manifest).set(manifestCacheKey, nextFilteredRoutes);
					filteredRoutes = nextFilteredRoutes;
				}
				manifestToDehydrate = { routes: filteredRoutes };
			}
			const dehydratedRouter = {
				manifest: manifestToDehydrate,
				matches
			};
			const lastMatchId = matchesToDehydrate[matchesToDehydrate.length - 1]?.id;
			if (lastMatchId) dehydratedRouter.lastMatchId = dehydrateSsrMatchId(lastMatchId);
			const dehydratedData = await router.options.dehydrate?.();
			if (dehydratedData) dehydratedRouter.dehydratedData = dehydratedData;
			_dehydrated = true;
			const trackPlugins = { didRun: false };
			const serializationAdapters = router.options.serializationAdapters;
			const plugins = serializationAdapters ? serializationAdapters.map((t) => makeSsrSerovalPlugin(t, trackPlugins)).concat(defaultSerovalPlugins) : defaultSerovalPlugins;
			const signalSerializationComplete = () => {
				_serializationFinished = true;
				try {
					serializationFinishedListeners.forEach((l) => l());
					router.emit({ type: "onSerializationFinished" });
				} catch (err) {
					console.error("Serialization listener error:", err);
				} finally {
					serializationFinishedListeners.length = 0;
					renderFinishedListeners.length = 0;
				}
			};
			Sn(dehydratedRouter, {
				refs: /* @__PURE__ */ new Map(),
				plugins,
				onSerialize: (data, initial) => {
					let serialized = initial ? TSR_PREFIX + data : data;
					if (trackPlugins.didRun) serialized = P_PREFIX + serialized + P_SUFFIX;
					scriptBuffer.enqueue(serialized);
				},
				scopeId: SCOPE_ID,
				onDone: () => {
					scriptBuffer.enqueue(GLOBAL_TSR + ".e()");
					scriptBuffer.flush();
					signalSerializationComplete();
				},
				onError: (err) => {
					console.error("Serialization error:", err);
					signalSerializationComplete();
				}
			});
		},
		isDehydrated() {
			return _dehydrated;
		},
		isSerializationFinished() {
			return _serializationFinished;
		},
		onRenderFinished: (listener) => renderFinishedListeners.push(listener),
		onSerializationFinished: (listener) => serializationFinishedListeners.push(listener),
		setRenderFinished: () => {
			try {
				renderFinishedListeners.forEach((l) => l());
			} catch (err) {
				console.error("Error in render finished listener:", err);
			} finally {
				renderFinishedListeners.length = 0;
			}
			scriptBuffer.liftBarrier();
		},
		takeBufferedScripts() {
			const scripts = scriptBuffer.takeAll();
			return {
				tag: "script",
				attrs: {
					nonce: router.options.ssr?.nonce,
					className: "$tsr",
					id: TSR_SCRIPT_BARRIER_ID
				},
				children: scripts
			};
		},
		liftScriptBarrier() {
			scriptBuffer.liftBarrier();
		},
		takeBufferedHtml() {
			if (!injectedHtmlBuffer) return;
			const buffered = injectedHtmlBuffer;
			injectedHtmlBuffer = "";
			return buffered;
		},
		cleanup() {
			if (!router.serverSsr) return;
			renderFinishedListeners.length = 0;
			serializationFinishedListeners.length = 0;
			injectedHtmlBuffer = "";
			scriptBuffer.cleanup();
			router.serverSsr = void 0;
		}
	};
}
/**
* Get the origin for the request.
*
* SECURITY: We intentionally do NOT trust the Origin header for determining
* the router's origin. The Origin header can be spoofed by attackers, which
* could lead to SSRF-like vulnerabilities where redirects are constructed
* using a malicious origin (CVE-2024-34351).
*
* Instead, we derive the origin from request.url, which is typically set by
* the server infrastructure (not client-controlled headers).
*
* For applications behind proxies that need to trust forwarded headers,
* use the router's `origin` option to explicitly configure a trusted origin.
*/
function getOrigin(request) {
	try {
		return new URL(request.url).origin;
	} catch {}
	return "http://localhost";
}
function getNormalizedURL(url, base) {
	if (typeof url === "string") url = url.replace("\\", "%5C");
	const rawUrl = new URL(url, base);
	const { path: decodedPathname, handledProtocolRelativeURL } = decodePath(rawUrl.pathname);
	const searchParams = new URLSearchParams(rawUrl.search);
	const normalizedHref = decodedPathname + (searchParams.size > 0 ? "?" : "") + searchParams.toString() + rawUrl.hash;
	return {
		url: new URL(normalizedHref, rawUrl.origin),
		handledProtocolRelativeURL
	};
}
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/handlerCallback.js
function defineHandlerCallback(handler) {
	return handler;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+router-core@1.168.9/node_modules/@tanstack/router-core/dist/esm/ssr/transformStreamWithRouter.js
function transformReadableStreamWithRouter(router, routerStream) {
	return transformStreamWithRouter(router, routerStream);
}
var BODY_END_TAG = "</body>";
var HTML_END_TAG = "</html>";
var MIN_CLOSING_TAG_LENGTH = 4;
var DEFAULT_SERIALIZATION_TIMEOUT_MS = 6e4;
var DEFAULT_LIFETIME_TIMEOUT_MS = 6e4;
var textEncoder = new TextEncoder();
/**
* Finds the position just after the last valid HTML closing tag in the string.
*
* Valid closing tags match the pattern: </[a-zA-Z][\w:.-]*>
* Examples: </div>, </my-component>, </slot:name.nested>
*
* @returns Position after the last closing tag, or -1 if none found
*/
function findLastClosingTagEnd(str) {
	const len = str.length;
	if (len < MIN_CLOSING_TAG_LENGTH) return -1;
	let i = len - 1;
	while (i >= MIN_CLOSING_TAG_LENGTH - 1) {
		if (str.charCodeAt(i) === 62) {
			let j = i - 1;
			while (j >= 1) {
				const code = str.charCodeAt(j);
				if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 95 || code === 58 || code === 46 || code === 45) j--;
				else break;
			}
			const tagNameStart = j + 1;
			if (tagNameStart < i) {
				const startCode = str.charCodeAt(tagNameStart);
				if (startCode >= 97 && startCode <= 122 || startCode >= 65 && startCode <= 90) {
					if (j >= 1 && str.charCodeAt(j) === 47 && str.charCodeAt(j - 1) === 60) return i + 1;
				}
			}
		}
		i--;
	}
	return -1;
}
function transformStreamWithRouter(router, appStream, opts) {
	const serializationAlreadyFinished = router.serverSsr?.isSerializationFinished() ?? false;
	const initialBufferedHtml = router.serverSsr?.takeBufferedHtml();
	if (serializationAlreadyFinished && !initialBufferedHtml) {
		let cleanedUp = false;
		let controller;
		let isStreamClosed = false;
		let lifetimeTimeoutHandle;
		const cleanup = () => {
			if (cleanedUp) return;
			cleanedUp = true;
			if (lifetimeTimeoutHandle !== void 0) {
				clearTimeout(lifetimeTimeoutHandle);
				lifetimeTimeoutHandle = void 0;
			}
			router.serverSsr?.cleanup();
		};
		const safeClose = () => {
			if (isStreamClosed) return;
			isStreamClosed = true;
			try {
				controller?.close();
			} catch {}
		};
		const safeError = (error) => {
			if (isStreamClosed) return;
			isStreamClosed = true;
			try {
				controller?.error(error);
			} catch {}
		};
		const lifetimeMs = opts?.lifetimeMs ?? DEFAULT_LIFETIME_TIMEOUT_MS;
		lifetimeTimeoutHandle = setTimeout(() => {
			if (!cleanedUp && !isStreamClosed) {
				console.warn(`SSR stream transform exceeded maximum lifetime (${lifetimeMs}ms), forcing cleanup`);
				safeError(/* @__PURE__ */ new Error("Stream lifetime exceeded"));
				cleanup();
			}
		}, lifetimeMs);
		const stream = new ReadableStream$1({
			start(c) {
				controller = c;
			},
			cancel() {
				isStreamClosed = true;
				cleanup();
			}
		});
		(async () => {
			const reader = appStream.getReader();
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (cleanedUp || isStreamClosed) return;
					controller?.enqueue(value);
				}
				if (cleanedUp || isStreamClosed) return;
				router.serverSsr?.setRenderFinished();
				safeClose();
				cleanup();
			} catch (error) {
				if (cleanedUp) return;
				console.error("Error reading appStream:", error);
				router.serverSsr?.setRenderFinished();
				safeError(error);
				cleanup();
			} finally {
				reader.releaseLock();
			}
		})().catch((error) => {
			if (cleanedUp) return;
			console.error("Error in stream transform:", error);
			safeError(error);
			cleanup();
		});
		return stream;
	}
	let stopListeningToInjectedHtml;
	let stopListeningToSerializationFinished;
	let serializationTimeoutHandle;
	let lifetimeTimeoutHandle;
	let cleanedUp = false;
	let controller;
	let isStreamClosed = false;
	const textDecoder = new TextDecoder();
	let pendingRouterHtml = initialBufferedHtml ?? "";
	let leftover = "";
	let pendingClosingTags = "";
	const MAX_LEFTOVER_CHARS = 2048;
	let isAppRendering = true;
	let streamBarrierLifted = false;
	let serializationFinished = serializationAlreadyFinished;
	function safeEnqueue(chunk) {
		if (isStreamClosed) return;
		if (typeof chunk === "string") controller.enqueue(textEncoder.encode(chunk));
		else controller.enqueue(chunk);
	}
	function safeClose() {
		if (isStreamClosed) return;
		isStreamClosed = true;
		try {
			controller.close();
		} catch {}
	}
	function safeError(error) {
		if (isStreamClosed) return;
		isStreamClosed = true;
		try {
			controller.error(error);
		} catch {}
	}
	/**
	* Cleanup with guards; must be idempotent.
	*/
	function cleanup() {
		if (cleanedUp) return;
		cleanedUp = true;
		try {
			stopListeningToInjectedHtml?.();
			stopListeningToSerializationFinished?.();
		} catch {}
		stopListeningToInjectedHtml = void 0;
		stopListeningToSerializationFinished = void 0;
		if (serializationTimeoutHandle !== void 0) {
			clearTimeout(serializationTimeoutHandle);
			serializationTimeoutHandle = void 0;
		}
		if (lifetimeTimeoutHandle !== void 0) {
			clearTimeout(lifetimeTimeoutHandle);
			lifetimeTimeoutHandle = void 0;
		}
		pendingRouterHtml = "";
		leftover = "";
		pendingClosingTags = "";
		router.serverSsr?.cleanup();
	}
	const stream = new ReadableStream$1({
		start(c) {
			controller = c;
		},
		cancel() {
			isStreamClosed = true;
			cleanup();
		}
	});
	function flushPendingRouterHtml() {
		if (!pendingRouterHtml) return;
		safeEnqueue(pendingRouterHtml);
		pendingRouterHtml = "";
	}
	function appendRouterHtml(html) {
		if (!html) return;
		pendingRouterHtml += html;
	}
	/**
	* Finish only when app done and serialization complete.
	*/
	function tryFinish() {
		if (isAppRendering || !serializationFinished) return;
		if (cleanedUp || isStreamClosed) return;
		if (serializationTimeoutHandle !== void 0) {
			clearTimeout(serializationTimeoutHandle);
			serializationTimeoutHandle = void 0;
		}
		const decoderRemainder = textDecoder.decode();
		if (leftover) safeEnqueue(leftover);
		if (decoderRemainder) safeEnqueue(decoderRemainder);
		flushPendingRouterHtml();
		if (pendingClosingTags) safeEnqueue(pendingClosingTags);
		safeClose();
		cleanup();
	}
	const lifetimeMs = opts?.lifetimeMs ?? DEFAULT_LIFETIME_TIMEOUT_MS;
	lifetimeTimeoutHandle = setTimeout(() => {
		if (!cleanedUp && !isStreamClosed) {
			console.warn(`SSR stream transform exceeded maximum lifetime (${lifetimeMs}ms), forcing cleanup`);
			safeError(/* @__PURE__ */ new Error("Stream lifetime exceeded"));
			cleanup();
		}
	}, lifetimeMs);
	if (!serializationAlreadyFinished) {
		stopListeningToInjectedHtml = router.subscribe("onInjectedHtml", () => {
			if (cleanedUp || isStreamClosed) return;
			const html = router.serverSsr?.takeBufferedHtml();
			if (!html) return;
			if (isAppRendering || leftover || pendingClosingTags) appendRouterHtml(html);
			else safeEnqueue(html);
		});
		stopListeningToSerializationFinished = router.subscribe("onSerializationFinished", () => {
			serializationFinished = true;
			tryFinish();
		});
	}
	(async () => {
		const reader = appStream.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (cleanedUp || isStreamClosed) return;
				const text = value instanceof Uint8Array ? textDecoder.decode(value, { stream: true }) : String(value);
				const chunkString = leftover ? leftover + text : text;
				if (!streamBarrierLifted) {
					if (chunkString.includes("$tsr-stream-barrier")) {
						streamBarrierLifted = true;
						router.serverSsr?.liftScriptBarrier();
					}
				}
				if (pendingClosingTags) {
					pendingClosingTags += chunkString;
					leftover = "";
					continue;
				}
				const bodyEndIndex = chunkString.indexOf(BODY_END_TAG);
				const htmlEndIndex = chunkString.indexOf(HTML_END_TAG);
				if (bodyEndIndex !== -1 && htmlEndIndex !== -1 && bodyEndIndex < htmlEndIndex) {
					pendingClosingTags = chunkString.slice(bodyEndIndex);
					safeEnqueue(chunkString.slice(0, bodyEndIndex));
					flushPendingRouterHtml();
					leftover = "";
					continue;
				}
				const lastClosingTagEnd = findLastClosingTagEnd(chunkString);
				if (lastClosingTagEnd > 0) {
					safeEnqueue(chunkString.slice(0, lastClosingTagEnd));
					flushPendingRouterHtml();
					leftover = chunkString.slice(lastClosingTagEnd);
					if (leftover.length > MAX_LEFTOVER_CHARS) {
						safeEnqueue(leftover.slice(0, leftover.length - MAX_LEFTOVER_CHARS));
						leftover = leftover.slice(-2048);
					}
				} else {
					const combined = chunkString;
					if (combined.length > MAX_LEFTOVER_CHARS) {
						const flushUpto = combined.length - MAX_LEFTOVER_CHARS;
						safeEnqueue(combined.slice(0, flushUpto));
						leftover = combined.slice(flushUpto);
					} else leftover = combined;
				}
			}
			if (cleanedUp || isStreamClosed) return;
			isAppRendering = false;
			router.serverSsr?.setRenderFinished();
			if (serializationFinished) tryFinish();
			else {
				const timeoutMs = opts?.timeoutMs ?? DEFAULT_SERIALIZATION_TIMEOUT_MS;
				serializationTimeoutHandle = setTimeout(() => {
					if (!cleanedUp && !isStreamClosed) {
						console.error("Serialization timeout after app render finished");
						safeError(/* @__PURE__ */ new Error("Serialization timeout after app render finished"));
						cleanup();
					}
				}, timeoutMs);
			}
		} catch (error) {
			if (cleanedUp) return;
			console.error("Error reading appStream:", error);
			isAppRendering = false;
			router.serverSsr?.setRenderFinished();
			safeError(error);
			cleanup();
		} finally {
			reader.releaseLock();
		}
	})().catch((error) => {
		if (cleanedUp) return;
		console.error("Error in stream transform:", error);
		safeError(error);
		cleanup();
	});
	return stream;
}
//#endregion
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/createStartHandler.js
function getStartResponseHeaders(opts) {
	return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ...opts.router.stores.activeMatchesSnapshot.state.map((match) => {
		return match.headers;
	}));
}
var entriesPromise;
var baseManifestPromise;
/**
* Cached final manifest (with client entry script tag). In production,
* this is computed once and reused for every request when caching is enabled.
*/
var cachedFinalManifestPromise;
async function loadEntries() {
	const routerEntry = await import("./assets/router-Bu7bvB_b.js");
	return {
		startEntry: await import("./assets/start-leZogNQg.js"),
		routerEntry
	};
}
function getEntries() {
	if (!entriesPromise) entriesPromise = loadEntries();
	return entriesPromise;
}
/**
* Returns the raw manifest data (without client entry script tag baked in).
* In dev mode, always returns fresh data. In prod, cached.
*/
function getBaseManifest(matchedRoutes) {
	if (!baseManifestPromise) baseManifestPromise = getStartManifest();
	return baseManifestPromise;
}
/**
* Resolves a final Manifest for a given request.
*
* - No transform: builds client entry script tag and returns (cached in prod).
* - Cached transform: transforms all URLs + builds script tag, caches result.
* - Per-request transform: deep-clones base manifest, transforms per-request.
*/
async function resolveManifest(matchedRoutes, transformFn, cache) {
	const base = await getBaseManifest(matchedRoutes);
	const computeFinalManifest = async () => {
		return transformFn ? await transformManifestAssets(base, transformFn, { clone: !cache }) : buildManifestWithClientEntry(base);
	};
	if (!transformFn || cache) {
		if (!cachedFinalManifestPromise) cachedFinalManifestPromise = computeFinalManifest();
		return cachedFinalManifestPromise;
	}
	return computeFinalManifest();
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var IS_DEV = false;
var ERR_NO_RESPONSE = IS_DEV ? `It looks like you forgot to return a response from your server route handler. If you want to defer to the app router, make sure to have a component set in this route.` : "Internal Server Error";
var ERR_NO_DEFER = IS_DEV ? `You cannot defer to the app router if there is no component defined on this route.` : "Internal Server Error";
function throwRouteHandlerError() {
	throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
	throw new Error(ERR_NO_DEFER);
}
/**
* Check if a value is a special response (Response or Redirect)
*/
function isSpecialResponse(value) {
	return value instanceof Response || isRedirect(value);
}
/**
* Normalize middleware result to context shape
*/
function handleCtxResult(result) {
	if (isSpecialResponse(result)) return { response: result };
	return result;
}
/**
* Execute a middleware chain
*/
function executeMiddleware(middlewares, ctx) {
	let index = -1;
	const next = async (nextCtx) => {
		if (nextCtx) {
			if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
			for (const key of Object.keys(nextCtx)) if (key !== "context") ctx[key] = nextCtx[key];
		}
		index++;
		const middleware = middlewares[index];
		if (!middleware) return ctx;
		let result;
		try {
			result = await middleware({
				...ctx,
				next
			});
		} catch (err) {
			if (isSpecialResponse(err)) {
				ctx.response = err;
				return ctx;
			}
			throw err;
		}
		const normalized = handleCtxResult(result);
		if (normalized) {
			if (normalized.response !== void 0) ctx.response = normalized.response;
			if (normalized.context) ctx.context = safeObjectMerge(ctx.context, normalized.context);
		}
		return ctx;
	};
	return next();
}
/**
* Wrap a route handler as middleware
*/
function handlerToMiddleware(handler, mayDefer = false) {
	if (mayDefer) return handler;
	return async (ctx) => {
		const response = await handler({
			...ctx,
			next: throwIfMayNotDefer
		});
		if (!response) throwRouteHandlerError();
		return response;
	};
}
/**
* Creates the TanStack Start request handler.
*
* @example Backwards-compatible usage (handler callback only):
* ```ts
* export default createStartHandler(defaultStreamHandler)
* ```
*
* @example With CDN URL rewriting:
* ```ts
* export default createStartHandler({
*   handler: defaultStreamHandler,
*   transformAssets: 'https://cdn.example.com',
* })
* ```
*
* @example With per-request URL rewriting:
* ```ts
* export default createStartHandler({
*   handler: defaultStreamHandler,
*   transformAssets: {
*     transform: ({ url }) => {
*       const cdnBase = getRequest().headers.get('x-cdn-base') || ''
*       return { href: `${cdnBase}${url}` }
*     },
*     cache: false,
*   },
* })
* ```
*/
function createStartHandler(cbOrOptions) {
	const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
	const transformAssetsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssets;
	const transformAssetUrlsOption = typeof cbOrOptions === "function" ? void 0 : cbOrOptions.transformAssetUrls;
	const transformOption = transformAssetsOption !== void 0 ? resolveTransformAssetsConfig(transformAssetsOption) : transformAssetUrlsOption !== void 0 ? resolveTransformAssetsConfig(adaptTransformAssetUrlsConfigToTransformAssets(transformAssetUrlsOption)) : void 0;
	const warmupTransformManifest = !!transformAssetsOption && typeof transformAssetsOption === "object" && "warmup" in transformAssetsOption && transformAssetsOption.warmup === true || !!transformAssetUrlsOption && typeof transformAssetUrlsOption === "object" && transformAssetUrlsOption.warmup === true;
	const resolvedTransformConfig = transformOption;
	const cache = resolvedTransformConfig ? resolvedTransformConfig.cache : true;
	const shouldCacheCreateTransform = cache && true;
	let cachedCreateTransformPromise;
	const getTransformFn = async (opts) => {
		if (!resolvedTransformConfig) return void 0;
		if (resolvedTransformConfig.type === "createTransform") {
			if (shouldCacheCreateTransform) {
				if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(resolvedTransformConfig.createTransform(opts)).catch((error) => {
					cachedCreateTransformPromise = void 0;
					throw error;
				});
				return cachedCreateTransformPromise;
			}
			return resolvedTransformConfig.createTransform(opts);
		}
		return resolvedTransformConfig.transformFn;
	};
	if (warmupTransformManifest && cache && !cachedFinalManifestPromise) {
		const warmupPromise = (async () => {
			const base = await getBaseManifest(void 0);
			const transformFn = await getTransformFn({ warmup: true });
			return transformFn ? await transformManifestAssets(base, transformFn, { clone: false }) : buildManifestWithClientEntry(base);
		})();
		cachedFinalManifestPromise = warmupPromise;
		warmupPromise.catch(() => {
			if (cachedFinalManifestPromise === warmupPromise) cachedFinalManifestPromise = void 0;
			cachedCreateTransformPromise = void 0;
		});
	}
	const startRequestResolver = async (request, requestOpts) => {
		let router = null;
		let cbWillCleanup = false;
		try {
			const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
			const href = url.pathname + url.search + url.hash;
			const origin = getOrigin(request);
			if (handledProtocolRelativeURL) return Response.redirect(url, 308);
			const entries = await getEntries();
			const startOptions = await entries.startEntry.startInstance?.getOptions() || {};
			const serializationAdapters = [...startOptions.serializationAdapters || [], ServerFunctionSerializationAdapter];
			const requestStartOptions = {
				...startOptions,
				serializationAdapters
			};
			const flattenedRequestMiddlewares = startOptions.requestMiddleware ? flattenMiddlewares(startOptions.requestMiddleware) : [];
			const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
			const getRouter = async () => {
				if (router) return router;
				router = await entries.routerEntry.getRouter();
				let isShell = IS_SHELL_ENV;
				if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
				const history = createMemoryHistory({ initialEntries: [href] });
				router.update({
					history,
					isShell,
					isPrerendering: IS_PRERENDERING,
					origin: router.options.origin ?? origin,
					defaultSsr: requestStartOptions.defaultSsr,
					serializationAdapters: [...requestStartOptions.serializationAdapters, ...router.options.serializationAdapters || []],
					basepath: ROUTER_BASEPATH
				});
				return router;
			};
			if (SERVER_FN_BASE && url.pathname.startsWith(SERVER_FN_BASE)) {
				const serverFnId = url.pathname.slice(SERVER_FN_BASE.length).split("/")[0];
				if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
				const serverFnHandler = async ({ context }) => {
					return runWithStartContext({
						getRouter,
						startOptions: requestStartOptions,
						contextAfterGlobalMiddlewares: context,
						request,
						executedRequestMiddlewares
					}, () => handleServerAction({
						request,
						context: requestOpts?.context,
						serverFnId
					}));
				};
				return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), serverFnHandler], {
					request,
					pathname: url.pathname,
					context: createNullProtoObject(requestOpts?.context)
				})).response, request, getRouter);
			}
			const executeRouter = async (serverContext, matchedRoutes) => {
				const acceptParts = (request.headers.get("Accept") || "*/*").split(",");
				if (!["*/*", "text/html"].some((mimeType) => acceptParts.some((part) => part.trim().startsWith(mimeType)))) return Response.json({ error: "Only HTML requests are supported here" }, { status: 500 });
				const manifest = await resolveManifest(matchedRoutes, await getTransformFn({
					warmup: false,
					request
				}), cache);
				const routerInstance = await getRouter();
				attachRouterServerSsrUtils({
					router: routerInstance,
					manifest
				});
				routerInstance.update({ additionalContext: { serverContext } });
				await routerInstance.load();
				if (routerInstance.state.redirect) return routerInstance.state.redirect;
				await routerInstance.serverSsr.dehydrate();
				const responseHeaders = getStartResponseHeaders({ router: routerInstance });
				cbWillCleanup = true;
				return cb({
					request,
					router: routerInstance,
					responseHeaders
				});
			};
			const requestHandlerMiddleware = async ({ context }) => {
				return runWithStartContext({
					getRouter,
					startOptions: requestStartOptions,
					contextAfterGlobalMiddlewares: context,
					request,
					executedRequestMiddlewares
				}, async () => {
					try {
						return await handleServerRoutes({
							getRouter,
							request,
							url,
							executeRouter,
							context,
							executedRequestMiddlewares
						});
					} catch (err) {
						if (err instanceof Response) return err;
						throw err;
					}
				});
			};
			return handleRedirectResponse((await executeMiddleware([...flattenedRequestMiddlewares.map((d) => d.options.server), requestHandlerMiddleware], {
				request,
				pathname: url.pathname,
				context: createNullProtoObject(requestOpts?.context)
			})).response, request, getRouter);
		} finally {
			if (router && !cbWillCleanup) router.serverSsr?.cleanup();
			router = null;
		}
	};
	return requestHandler(startRequestResolver);
}
async function handleRedirectResponse(response, request, getRouter) {
	if (!isRedirect(response)) return response;
	if (isResolvedRedirect(response)) {
		if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
			...response.options,
			isSerializedRedirect: true
		}, { headers: response.headers });
		return response;
	}
	const opts = response.options;
	if (opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
	if ([
		"params",
		"search",
		"hash"
	].some((d) => typeof opts[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d) => typeof opts[d] === "function").map((d) => `"${d}"`).join(", ")}`);
	const redirect = (await getRouter()).resolveRedirect(response);
	if (request.headers.get("x-tsr-serverFn") === "true") return Response.json({
		...response.options,
		isSerializedRedirect: true
	}, { headers: response.headers });
	return redirect;
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
	const router = await getRouter();
	const pathname = executeRewriteInput(router.rewrite, url).pathname;
	const { matchedRoutes, foundRoute, routeParams } = router.getMatchedRoutes(pathname);
	const isExactMatch = foundRoute && routeParams["**"] === void 0;
	const routeMiddlewares = [];
	for (const route of matchedRoutes) {
		const serverMiddleware = route.options.server?.middleware;
		if (serverMiddleware) {
			const flattened = flattenMiddlewares(serverMiddleware);
			for (const m of flattened) if (!executedRequestMiddlewares.has(m)) routeMiddlewares.push(m.options.server);
		}
	}
	const server = foundRoute?.options.server;
	if (server?.handlers && isExactMatch) {
		const handlers = typeof server.handlers === "function" ? server.handlers({ createHandlers: (d) => d }) : server.handlers;
		const handler = handlers[request.method.toUpperCase()] ?? handlers["ANY"];
		if (handler) {
			const mayDefer = !!foundRoute.options.component;
			if (typeof handler === "function") routeMiddlewares.push(handlerToMiddleware(handler, mayDefer));
			else {
				if (handler.middleware?.length) {
					const handlerMiddlewares = flattenMiddlewares(handler.middleware);
					for (const m of handlerMiddlewares) routeMiddlewares.push(m.options.server);
				}
				if (handler.handler) routeMiddlewares.push(handlerToMiddleware(handler.handler, mayDefer));
			}
		}
	}
	routeMiddlewares.push((ctx) => executeRouter(ctx.context, matchedRoutes));
	return (await executeMiddleware(routeMiddlewares, {
		request,
		context,
		params: routeParams,
		pathname
	})).response;
}
//#endregion
//#region node_modules/.pnpm/isbot@5.1.40/node_modules/isbot/index.mjs
var fullPattern = " daum[ /]| deusu/|(?:^|[^g])news(?!sapphire)|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!(?:lib))http|(?<!cam)scan|24x7|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\b\\w+\\.ai|\\bcursor/|\\bmanus-user/|\\bort/|\\bperl\\b|\\bplaywright\\b|\\bsecurityheaders\\b|\\bselenium\\b|\\btime/|\\||^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[\\w\\-]+/[\\w]+$|^[^ ]{50,}$|^\\d+\\b|^\\W|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^\\w+/\\d\\.\\d\\s\\([\\w@]+\\)$|^active|^ad muncher|^amaya|^apache/|^avsdevicesdk/|^azure|^biglotron|^bot|^bw/|^clamav[ /]|^claude-code/|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^email|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^igetter/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d\\s[\\w\\.-]+$|^mozilla/\\d\\.\\d\\s\\((?:compatible;)?(?:\\s?[\\w\\d-.]+\\/\\d+\\.\\d+)?\\)$|^navermailapp|^netsurf|^offline|^openai/|^owler|^php|^postman|^python|^rank|^read|^reed|^rest|^rss|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^track|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|advisor|agent\\b|analyzer|archive|ask jeeves/teoma|audit|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|convertify|crawl|cypress/|dareboost|datanyze|dejaclick|detect|dmbrowser|download|exaleadcloudview|feed|fetcher|firephp|functionize|grab|headless|httrack|hubspot marketing grader|ibisbrowser|infrawatch|insight|inspect|iplabel|java(?!;)|library|linkcheck|mail\\.ru/|manager|measure|monitor\\b|neustar wpm|node\\b|nutch|offbyone|onetrust|optimize|pageburst|pagespeed|parser|phantomjs|pingdom|powermarks|preview|proxy|ptst[ /]\\d|retriever|rexx;|rigor|rss\\b|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|tools|torrent|transcoder|url|validator|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|xtate/";
var naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;
var pattern;
function getPattern() {
	if (pattern instanceof RegExp) return pattern;
	try {
		pattern = new RegExp(fullPattern, "i");
	} catch (error) {
		pattern = naivePattern;
	}
	return pattern;
}
var isNonEmptyString = (value) => typeof value === "string" && value !== "";
function isbot(userAgent) {
	return isNonEmptyString(userAgent) && getPattern().test(userAgent);
}
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-router@2.0.0-beta.18_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14__solid-js@2.0.0-beta.14/node_modules/@tanstack/solid-router/dist/source/ssr/renderRouterToStream.jsx
var renderRouterToStream = async ({ request, router, responseHeaders, children }) => {
	const { writable, readable } = new TransformStream();
	const serovalPlugins = (router.options?.serializationAdapters || router.options.ssr?.serializationAdapters)?.map((adapter) => {
		return makeSsrSerovalPlugin(adapter, { didRun: false });
	});
	const stream = renderToStream(() => children, {
		nonce: router.options.ssr?.nonce,
		plugins: serovalPlugins
	});
	if (isbot(request.headers.get("User-Agent"))) await stream;
	stream.pipeTo(writable);
	const responseStream = transformReadableStreamWithRouter(router, readable);
	return new Response(responseStream, {
		status: router.stores.statusCode.state,
		headers: responseHeaders
	});
};
//#endregion
//#region node_modules/.pnpm/@tanstack+solid-start@2.0.0-beta.19_@solidjs+web@2.0.0-beta.14_solid-js@2.0.0-beta.14___8bcdf1e98a1031c3bd9b0e80ee7be92f/node_modules/@tanstack/solid-start/dist/default-entry/esm/server.js
var fetch = createStartHandler(defineHandlerCallback(async ({ request, router, responseHeaders }) => await renderRouterToStream({
	request,
	router,
	responseHeaders,
	children: () => StartServer({ router })
})));
function createServerEntry(entry) {
	return { async fetch(...args) {
		return await entry.fetch(...args);
	} };
}
var server_default = createServerEntry({ fetch });
//#endregion
//#region \0virtual:cloudflare/worker-entry
var worker_entry_default = { fetch(request) {
	return server_default.fetch(request, { context: {} });
} };
//#endregion
export { worker_entry_default as default };
