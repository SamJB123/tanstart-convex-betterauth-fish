import { t as getRequest } from "./request-response-BxCcpG16.js";
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/values/base64.js
var lookup = [];
var revLookup = [];
var Arr = Uint8Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
	lookup[i] = code[i];
	revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
	var len = b64.length;
	if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var validLen = b64.indexOf("=");
	if (validLen === -1) validLen = len;
	var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
	return [validLen, placeHoldersLen];
}
function _byteLength(_b64, validLen, placeHoldersLen) {
	return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
	var tmp;
	var lens = getLens(b64);
	var validLen = lens[0];
	var placeHoldersLen = lens[1];
	var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
	var curByte = 0;
	var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
	var i;
	for (i = 0; i < len; i += 4) {
		tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
		arr[curByte++] = tmp >> 16 & 255;
		arr[curByte++] = tmp >> 8 & 255;
		arr[curByte++] = tmp & 255;
	}
	if (placeHoldersLen === 2) {
		tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
		arr[curByte++] = tmp & 255;
	}
	if (placeHoldersLen === 1) {
		tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
		arr[curByte++] = tmp >> 8 & 255;
		arr[curByte++] = tmp & 255;
	}
	return arr;
}
function tripletToBase64(num) {
	return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
	var tmp;
	var output = [];
	for (var i = start; i < end; i += 3) {
		tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
		output.push(tripletToBase64(tmp));
	}
	return output.join("");
}
function fromByteArray(uint8) {
	var tmp;
	var len = uint8.length;
	var extraBytes = len % 3;
	var parts = [];
	var maxChunkLength = 16383;
	for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
	if (extraBytes === 1) {
		tmp = uint8[len - 1];
		parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
	} else if (extraBytes === 2) {
		tmp = (uint8[len - 2] << 8) + uint8[len - 1];
		parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
	}
	return parts.join("");
}
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/common/index.js
function parseArgs(args) {
	if (args === void 0) return {};
	if (!isSimpleObject(args)) throw new Error(`The arguments to a Convex function must be an object. Received: ${args}`);
	return args;
}
function validateDeploymentUrl(deploymentUrl) {
	if (typeof deploymentUrl === "undefined") throw new Error(`Client created with undefined deployment address. If you used an environment variable, check that it's set.`);
	if (typeof deploymentUrl !== "string") throw new Error(`Invalid deployment address: found ${deploymentUrl}".`);
	if (!(deploymentUrl.startsWith("http:") || deploymentUrl.startsWith("https:"))) throw new Error(`Invalid deployment address: Must start with "https://" or "http://". Found "${deploymentUrl}".`);
	try {
		new URL(deploymentUrl);
	} catch {
		throw new Error(`Invalid deployment address: "${deploymentUrl}" is not a valid URL. If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`);
	}
	if (deploymentUrl.endsWith(".convex.site")) throw new Error(`Invalid deployment address: "${deploymentUrl}" ends with .convex.site, which is used for HTTP Actions. Convex deployment URLs typically end with .convex.cloud? If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`);
}
function isSimpleObject(value) {
	const isObject = typeof value === "object";
	const prototype = Object.getPrototypeOf(value);
	const isSimple = prototype === null || prototype === Object.prototype || prototype?.constructor?.name === "Object";
	return isObject && isSimple;
}
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/values/value.js
var LITTLE_ENDIAN = true;
var MIN_INT64 = BigInt("-9223372036854775808");
var MAX_INT64 = BigInt("9223372036854775807");
var ZERO = BigInt("0");
var EIGHT = BigInt("8");
var TWOFIFTYSIX = BigInt("256");
function isSpecial(n) {
	return Number.isNaN(n) || !Number.isFinite(n) || Object.is(n, -0);
}
function slowBigIntToBase64(value) {
	if (value < ZERO) value -= MIN_INT64 + MIN_INT64;
	let hex = value.toString(16);
	if (hex.length % 2 === 1) hex = "0" + hex;
	const bytes = new Uint8Array(/* @__PURE__ */ new ArrayBuffer(8));
	let i = 0;
	for (const hexByte of hex.match(/.{2}/g).reverse()) {
		bytes.set([parseInt(hexByte, 16)], i++);
		value >>= EIGHT;
	}
	return fromByteArray(bytes);
}
function slowBase64ToBigInt(encoded) {
	const integerBytes = toByteArray(encoded);
	if (integerBytes.byteLength !== 8) throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
	let value = ZERO;
	let power = ZERO;
	for (const byte of integerBytes) {
		value += BigInt(byte) * TWOFIFTYSIX ** power;
		power++;
	}
	if (value > MAX_INT64) value += MIN_INT64 + MIN_INT64;
	return value;
}
function modernBigIntToBase64(value) {
	if (value < MIN_INT64 || MAX_INT64 < value) throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
	const buffer = /* @__PURE__ */ new ArrayBuffer(8);
	new DataView(buffer).setBigInt64(0, value, true);
	return fromByteArray(new Uint8Array(buffer));
}
function modernBase64ToBigInt(encoded) {
	const integerBytes = toByteArray(encoded);
	if (integerBytes.byteLength !== 8) throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
	return new DataView(integerBytes.buffer).getBigInt64(0, true);
}
var bigIntToBase64 = DataView.prototype.setBigInt64 ? modernBigIntToBase64 : slowBigIntToBase64;
var base64ToBigInt = DataView.prototype.getBigInt64 ? modernBase64ToBigInt : slowBase64ToBigInt;
var MAX_IDENTIFIER_LEN = 1024;
function validateObjectField(k) {
	if (k.length > MAX_IDENTIFIER_LEN) throw new Error(`Field name ${k} exceeds maximum field name length ${MAX_IDENTIFIER_LEN}.`);
	if (k.startsWith("$")) throw new Error(`Field name ${k} starts with a '$', which is reserved.`);
	for (let i = 0; i < k.length; i += 1) {
		const charCode = k.charCodeAt(i);
		if (charCode < 32 || charCode >= 127) throw new Error(`Field name ${k} has invalid character '${k[i]}': Field names can only contain non-control ASCII characters`);
	}
}
function jsonToConvex(value) {
	if (value === null) return value;
	if (typeof value === "boolean") return value;
	if (typeof value === "number") return value;
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map((value2) => jsonToConvex(value2));
	if (typeof value !== "object") throw new Error(`Unexpected type of ${value}`);
	const entries = Object.entries(value);
	if (entries.length === 1) {
		const key = entries[0][0];
		if (key === "$bytes") {
			if (typeof value.$bytes !== "string") throw new Error(`Malformed $bytes field on ${value}`);
			return toByteArray(value.$bytes).buffer;
		}
		if (key === "$integer") {
			if (typeof value.$integer !== "string") throw new Error(`Malformed $integer field on ${value}`);
			return base64ToBigInt(value.$integer);
		}
		if (key === "$float") {
			if (typeof value.$float !== "string") throw new Error(`Malformed $float field on ${value}`);
			const floatBytes = toByteArray(value.$float);
			if (floatBytes.byteLength !== 8) throw new Error(`Received ${floatBytes.byteLength} bytes, expected 8 for $float`);
			const float = new DataView(floatBytes.buffer).getFloat64(0, LITTLE_ENDIAN);
			if (!isSpecial(float)) throw new Error(`Float ${float} should be encoded as a number`);
			return float;
		}
		if (key === "$set") throw new Error(`Received a Set which is no longer supported as a Convex type.`);
		if (key === "$map") throw new Error(`Received a Map which is no longer supported as a Convex type.`);
	}
	const out = {};
	for (const [k, v] of Object.entries(value)) {
		validateObjectField(k);
		out[k] = jsonToConvex(v);
	}
	return out;
}
var MAX_VALUE_FOR_ERROR_LEN = 16384;
function stringifyValueForError(value) {
	const str = JSON.stringify(value, (_key, value2) => {
		if (value2 === void 0) return "undefined";
		if (typeof value2 === "bigint") return `${value2.toString()}n`;
		return value2;
	});
	if (str.length > MAX_VALUE_FOR_ERROR_LEN) {
		const rest = "[...truncated]";
		let truncateAt = MAX_VALUE_FOR_ERROR_LEN - 14;
		const codePoint = str.codePointAt(truncateAt - 1);
		if (codePoint !== void 0 && codePoint > 65535) truncateAt -= 1;
		return str.substring(0, truncateAt) + rest;
	}
	return str;
}
function convexToJsonInternal(value, originalValue, context, includeTopLevelUndefined) {
	if (value === void 0) {
		const contextText = context && ` (present at path ${context} in original object ${stringifyValueForError(originalValue)})`;
		throw new Error(`undefined is not a valid Convex value${contextText}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`);
	}
	if (value === null) return value;
	if (typeof value === "bigint") {
		if (value < MIN_INT64 || MAX_INT64 < value) throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
		return { $integer: bigIntToBase64(value) };
	}
	if (typeof value === "number") if (isSpecial(value)) {
		const buffer = /* @__PURE__ */ new ArrayBuffer(8);
		new DataView(buffer).setFloat64(0, value, LITTLE_ENDIAN);
		return { $float: fromByteArray(new Uint8Array(buffer)) };
	} else return value;
	if (typeof value === "boolean") return value;
	if (typeof value === "string") return value;
	if (value instanceof ArrayBuffer) return { $bytes: fromByteArray(new Uint8Array(value)) };
	if (Array.isArray(value)) return value.map((value2, i) => convexToJsonInternal(value2, originalValue, context + `[${i}]`, false));
	if (value instanceof Set) throw new Error(errorMessageForUnsupportedType(context, "Set", [...value], originalValue));
	if (value instanceof Map) throw new Error(errorMessageForUnsupportedType(context, "Map", [...value], originalValue));
	if (!isSimpleObject(value)) {
		const theType = value?.constructor?.name;
		const typeName = theType ? `${theType} ` : "";
		throw new Error(errorMessageForUnsupportedType(context, typeName, value, originalValue));
	}
	const out = {};
	const entries = Object.entries(value);
	entries.sort(([k1, _v1], [k2, _v2]) => k1 === k2 ? 0 : k1 < k2 ? -1 : 1);
	for (const [k, v] of entries) if (v !== void 0) {
		validateObjectField(k);
		out[k] = convexToJsonInternal(v, originalValue, context + `.${k}`, false);
	} else if (includeTopLevelUndefined) {
		validateObjectField(k);
		out[k] = convexOrUndefinedToJsonInternal(v, originalValue, context + `.${k}`);
	}
	return out;
}
function errorMessageForUnsupportedType(context, typeName, value, originalValue) {
	if (context) return `${typeName}${stringifyValueForError(value)} is not a supported Convex type (present at path ${context} in original object ${stringifyValueForError(originalValue)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`;
	else return `${typeName}${stringifyValueForError(value)} is not a supported Convex type.`;
}
function convexOrUndefinedToJsonInternal(value, originalValue, context) {
	if (value === void 0) return { $undefined: null };
	else {
		if (originalValue === void 0) throw new Error(`Programming error. Current value is ${stringifyValueForError(value)} but original value is undefined`);
		return convexToJsonInternal(value, originalValue, context, false);
	}
}
function convexToJson(value) {
	return convexToJsonInternal(value, value, "", false);
}
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/values/errors.js
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
var IDENTIFYING_FIELD = Symbol.for("ConvexError");
var ConvexError = class extends (_b = Error, _a = IDENTIFYING_FIELD, _b) {
	constructor(data) {
		super(typeof data === "string" ? data : stringifyValueForError(data));
		__publicField$2(this, "name", "ConvexError");
		__publicField$2(this, "data");
		__publicField$2(this, _a, true);
		this.data = data;
	}
};
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/index.js
var version = "1.39.1";
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/server/functionName.js
var functionName = Symbol.for("functionName");
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/server/components/paths.js
var toReferencePath = Symbol.for("toReferencePath");
function extractReferencePath(reference) {
	return reference[toReferencePath] ?? null;
}
function isFunctionHandle(s) {
	return s.startsWith("function://");
}
function getFunctionAddress(functionReference) {
	let functionAddress;
	if (typeof functionReference === "string") if (isFunctionHandle(functionReference)) functionAddress = { functionHandle: functionReference };
	else functionAddress = { name: functionReference };
	else if (functionReference[functionName]) functionAddress = { name: functionReference[functionName] };
	else {
		const referencePath = extractReferencePath(functionReference);
		if (!referencePath) throw new Error(`${functionReference} is not a functionReference`);
		functionAddress = { reference: referencePath };
	}
	return functionAddress;
}
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/server/api.js
function getFunctionName(functionReference) {
	const address = getFunctionAddress(functionReference);
	if (address.name === void 0) {
		if (address.functionHandle !== void 0) throw new Error(`Expected function reference like "api.file.func" or "internal.file.func", but received function handle ${address.functionHandle}`);
		else if (address.reference !== void 0) throw new Error(`Expected function reference in the current component like "api.file.func" or "internal.file.func", but received reference ${address.reference}`);
		throw new Error(`Expected function reference like "api.file.func" or "internal.file.func", but received ${JSON.stringify(address)}`);
	}
	if (typeof functionReference === "string") return functionReference;
	const name = functionReference[functionName];
	if (!name) throw new Error(`${functionReference} is not a functionReference`);
	return name;
}
function createApi(pathParts = []) {
	return new Proxy({}, { get(_, prop) {
		if (typeof prop === "string") return createApi([...pathParts, prop]);
		else if (prop === functionName) {
			if (pathParts.length < 2) {
				const found = ["api", ...pathParts].join(".");
				throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${found}\``);
			}
			const path = pathParts.slice(0, -1).join("/");
			const exportName = pathParts[pathParts.length - 1];
			if (exportName === "default") return path;
			else return path + ":" + exportName;
		} else if (prop === Symbol.toStringTag) return "FunctionReference";
		else return;
	} });
}
var anyApi = createApi();
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/browser/logging.js
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
var INFO_COLOR = "color:rgb(0, 145, 255)";
function prefix_for_source(source) {
	switch (source) {
		case "query": return "Q";
		case "mutation": return "M";
		case "action": return "A";
		case "any": return "?";
	}
}
var DefaultLogger = class {
	constructor(options) {
		__publicField$1(this, "_onLogLineFuncs");
		__publicField$1(this, "_verbose");
		this._onLogLineFuncs = {};
		this._verbose = options.verbose;
	}
	addLogLineListener(func) {
		let id = Math.random().toString(36).substring(2, 15);
		for (let i = 0; i < 10; i++) {
			if (this._onLogLineFuncs[id] === void 0) break;
			id = Math.random().toString(36).substring(2, 15);
		}
		this._onLogLineFuncs[id] = func;
		return () => {
			delete this._onLogLineFuncs[id];
		};
	}
	logVerbose(...args) {
		if (this._verbose) for (const func of Object.values(this._onLogLineFuncs)) func("debug", `${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
	}
	log(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("info", ...args);
	}
	warn(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("warn", ...args);
	}
	error(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("error", ...args);
	}
};
function instantiateDefaultLogger(options) {
	const logger = new DefaultLogger(options);
	logger.addLogLineListener((level, ...args) => {
		switch (level) {
			case "debug":
				console.debug(...args);
				break;
			case "info":
				console.log(...args);
				break;
			case "warn":
				console.warn(...args);
				break;
			case "error":
				console.error(...args);
				break;
			default: console.log(...args);
		}
	});
	return logger;
}
function instantiateNoopLogger(options) {
	return new DefaultLogger(options);
}
function logForFunction(logger, type, source, udfPath, message) {
	const prefix = prefix_for_source(source);
	if (typeof message === "object") message = `ConvexError ${JSON.stringify(message.errorData, null, 2)}`;
	if (type === "info") {
		const match = message.match(/^\[.*?\] /);
		if (match === null) {
			logger.error(`[CONVEX ${prefix}(${udfPath})] Could not parse console.log`);
			return;
		}
		const level = message.slice(1, match[0].length - 2);
		const args = message.slice(match[0].length);
		logger.log(`%c[CONVEX ${prefix}(${udfPath})] [${level}]`, INFO_COLOR, args);
	} else logger.error(`[CONVEX ${prefix}(${udfPath})] ${message}`);
}
function logFatalError(logger, message) {
	const errorMessage = `[CONVEX FATAL ERROR] ${message}`;
	logger.error(errorMessage);
	return new Error(errorMessage);
}
function createHybridErrorStacktrace(source, udfPath, result) {
	return `[CONVEX ${prefix_for_source(source)}(${udfPath})] ${result.errorMessage}
  Called by client`;
}
function forwardData(result, error) {
	error.data = result.errorData;
	return error;
}
//#endregion
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/browser/http_client.js
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
var specifiedFetch = void 0;
var ConvexHttpClient = class {
	/**
	* Create a new {@link ConvexHttpClient}.
	*
	* @param address - The url of your Convex deployment, often provided
	* by an environment variable. E.g. `https://small-mouse-123.convex.cloud`.
	* @param options - An object of options.
	* - `skipConvexDeploymentUrlCheck` - Skip validating that the Convex deployment URL looks like
	* `https://happy-animal-123.convex.cloud` or localhost. This can be useful if running a self-hosted
	* Convex backend that uses a different URL.
	* - `logger` - A logger or a boolean. If not provided, logs to the console.
	* You can construct your own logger to customize logging to log elsewhere
	* or not log at all, or use `false` as a shorthand for a no-op logger.
	* A logger is an object with 4 methods: log(), warn(), error(), and logVerbose().
	* These methods can receive multiple arguments of any types, like console.log().
	* - `auth` - A JWT containing identity claims accessible in Convex functions.
	* This identity may expire so it may be necessary to call `setAuth()` later,
	* but for short-lived clients it's convenient to specify this value here.
	* - `fetch` - A custom fetch implementation to use for all HTTP requests made by this client.
	*/
	constructor(address, options) {
		__publicField(this, "address");
		__publicField(this, "auth");
		__publicField(this, "adminAuth");
		__publicField(this, "encodedTsPromise");
		__publicField(this, "debug");
		__publicField(this, "fetchOptions");
		__publicField(this, "fetch");
		__publicField(this, "logger");
		__publicField(this, "mutationQueue", []);
		__publicField(this, "isProcessingQueue", false);
		if (typeof options === "boolean") throw new Error("skipConvexDeploymentUrlCheck as the second argument is no longer supported. Please pass an options object, `{ skipConvexDeploymentUrlCheck: true }`.");
		if ((options ?? {}).skipConvexDeploymentUrlCheck !== true) validateDeploymentUrl(address);
		this.logger = options?.logger === false ? instantiateNoopLogger({ verbose: false }) : options?.logger !== true && options?.logger ? options.logger : instantiateDefaultLogger({ verbose: false });
		this.address = address;
		this.debug = true;
		this.auth = void 0;
		this.adminAuth = void 0;
		this.fetch = options?.fetch;
		if (options?.auth) this.setAuth(options.auth);
	}
	/**
	* Obtain the {@link ConvexHttpClient}'s URL to its backend.
	* @deprecated Use url, which returns the url without /api at the end.
	*
	* @returns The URL to the Convex backend, including the client's API version.
	*/
	backendUrl() {
		return `${this.address}/api`;
	}
	/**
	* Return the address for this client, useful for creating a new client.
	*
	* Not guaranteed to match the address with which this client was constructed:
	* it may be canonicalized.
	*/
	get url() {
		return this.address;
	}
	/**
	* Set the authentication token to be used for subsequent queries and mutations.
	*
	* Should be called whenever the token changes (i.e. due to expiration and refresh).
	*
	* @param value - JWT-encoded OpenID Connect identity token.
	*/
	setAuth(value) {
		this.clearAuth();
		this.auth = value;
	}
	/**
	* Set admin auth token to allow calling internal queries, mutations, and actions
	* and acting as an identity.
	*
	* @internal
	*/
	setAdminAuth(token, actingAsIdentity) {
		this.clearAuth();
		if (actingAsIdentity !== void 0) {
			const bytes = new TextEncoder().encode(JSON.stringify(actingAsIdentity));
			const actingAsIdentityEncoded = btoa(String.fromCodePoint(...bytes));
			this.adminAuth = `${token}:${actingAsIdentityEncoded}`;
		} else this.adminAuth = token;
	}
	/**
	* Clear the current authentication token if set.
	*/
	clearAuth() {
		this.auth = void 0;
		this.adminAuth = void 0;
	}
	/**
	* Sets whether the result log lines should be printed on the console or not.
	*
	* @internal
	*/
	setDebug(debug) {
		this.debug = debug;
	}
	/**
	* Used to customize the fetch behavior in some runtimes.
	*
	* @internal
	*/
	setFetchOptions(fetchOptions) {
		this.fetchOptions = fetchOptions;
	}
	/**
	* This API is experimental: it may change or disappear.
	*
	* Execute a Convex query function at the same timestamp as every other
	* consistent query execution run by this HTTP client.
	*
	* This doesn't make sense for long-lived ConvexHttpClients as Convex
	* backends can read a limited amount into the past: beyond 30 seconds
	* in the past may not be available.
	*
	* Create a new client to use a consistent time.
	*
	* @param name - The name of the query.
	* @param args - The arguments object for the query. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the query's result.
	*
	* @deprecated This API is experimental: it may change or disappear.
	*/
	async consistentQuery(query, ...args) {
		const queryArgs = parseArgs(args[0]);
		const timestampPromise = this.getTimestamp();
		return await this.queryInner(query, queryArgs, { timestampPromise });
	}
	async getTimestamp() {
		if (this.encodedTsPromise) return this.encodedTsPromise;
		return this.encodedTsPromise = this.getTimestampInner();
	}
	async getTimestampInner() {
		const localFetch = this.fetch || specifiedFetch || fetch;
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		const response = await localFetch(`${this.address}/api/query_ts`, {
			...this.fetchOptions,
			method: "POST",
			headers
		});
		if (!response.ok) throw new Error(await response.text());
		const { ts } = await response.json();
		return ts;
	}
	/**
	* Execute a Convex query function.
	*
	* @param name - The name of the query.
	* @param args - The arguments object for the query. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the query's result.
	*/
	async query(query, ...args) {
		const queryArgs = parseArgs(args[0]);
		return await this.queryInner(query, queryArgs, {});
	}
	async queryInner(query, queryArgs, options) {
		const name = getFunctionName(query);
		const args = [convexToJson(queryArgs)];
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const localFetch = this.fetch || specifiedFetch || fetch;
		const timestamp = options.timestampPromise ? await options.timestampPromise : void 0;
		const body = JSON.stringify({
			path: name,
			format: "convex_encoded_json",
			args,
			...timestamp ? { ts: timestamp } : {}
		});
		const response = await localFetch(timestamp ? `${this.address}/api/query_at_ts` : `${this.address}/api/query`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "query", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
	async mutationInner(mutation, mutationArgs) {
		const name = getFunctionName(mutation);
		const body = JSON.stringify({
			path: name,
			format: "convex_encoded_json",
			args: [convexToJson(mutationArgs)]
		});
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const response = await (this.fetch || specifiedFetch || fetch)(`${this.address}/api/mutation`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "mutation", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
	async processMutationQueue() {
		if (this.isProcessingQueue) return;
		this.isProcessingQueue = true;
		while (this.mutationQueue.length > 0) {
			const { mutation, args, resolve, reject } = this.mutationQueue.shift();
			try {
				resolve(await this.mutationInner(mutation, args));
			} catch (error) {
				reject(error);
			}
		}
		this.isProcessingQueue = false;
	}
	enqueueMutation(mutation, args) {
		return new Promise((resolve, reject) => {
			this.mutationQueue.push({
				mutation,
				args,
				resolve,
				reject
			});
			this.processMutationQueue();
		});
	}
	/**
	* Execute a Convex mutation function. Mutations are queued by default.
	*
	* @param name - The name of the mutation.
	* @param args - The arguments object for the mutation. If this is omitted,
	* the arguments will be `{}`.
	* @param options - An optional object containing
	* @returns A promise of the mutation's result.
	*/
	async mutation(mutation, ...args) {
		const [fnArgs, options] = args;
		const mutationArgs = parseArgs(fnArgs);
		if (!options?.skipQueue) return await this.enqueueMutation(mutation, mutationArgs);
		else return await this.mutationInner(mutation, mutationArgs);
	}
	/**
	* Execute a Convex action function. Actions are not queued.
	*
	* @param name - The name of the action.
	* @param args - The arguments object for the action. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the action's result.
	*/
	async action(action, ...args) {
		const actionArgs = parseArgs(args[0]);
		const name = getFunctionName(action);
		const body = JSON.stringify({
			path: name,
			format: "convex_encoded_json",
			args: [convexToJson(actionArgs)]
		});
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const response = await (this.fetch || specifiedFetch || fetch)(`${this.address}/api/action`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "action", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
	/**
	* Execute a Convex function of an unknown type. These function calls are not queued.
	*
	* @param name - The name of the function.
	* @param args - The arguments object for the function. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the function's result.
	*
	* @internal
	*/
	async function(anyFunction, componentPath, ...args) {
		const functionArgs = parseArgs(args[0]);
		const name = typeof anyFunction === "string" ? anyFunction : getFunctionName(anyFunction);
		const body = JSON.stringify({
			componentPath,
			path: name,
			format: "convex_encoded_json",
			args: convexToJson(functionArgs)
		});
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const response = await (this.fetch || specifiedFetch || fetch)(`${this.address}/api/function`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "any", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
};
function forwardErrorData(errorData, error) {
	error.data = jsonToConvex(errorData);
	return error;
}
//#endregion
//#region node_modules/.pnpm/@better-fetch+fetch@1.1.21/node_modules/@better-fetch/fetch/dist/index.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
	for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	if (__getOwnPropSymbols) {
		for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
	}
	return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var BetterFetchError = class extends Error {
	constructor(status, statusText, error) {
		super(statusText || status.toString(), { cause: error });
		this.status = status;
		this.statusText = statusText;
		this.error = error;
		Error.captureStackTrace(this, this.constructor);
	}
};
var initializePlugins = async (url, options) => {
	var _a, _b, _c, _d, _e, _f;
	let opts = options || {};
	const hooks = {
		onRequest: [options == null ? void 0 : options.onRequest],
		onResponse: [options == null ? void 0 : options.onResponse],
		onSuccess: [options == null ? void 0 : options.onSuccess],
		onError: [options == null ? void 0 : options.onError],
		onRetry: [options == null ? void 0 : options.onRetry]
	};
	if (!options || !(options == null ? void 0 : options.plugins)) return {
		url,
		options: opts,
		hooks
	};
	for (const plugin of (options == null ? void 0 : options.plugins) || []) {
		if (plugin.init) {
			const pluginRes = await ((_a = plugin.init) == null ? void 0 : _a.call(plugin, url.toString(), options));
			opts = pluginRes.options || opts;
			url = pluginRes.url;
		}
		hooks.onRequest.push((_b = plugin.hooks) == null ? void 0 : _b.onRequest);
		hooks.onResponse.push((_c = plugin.hooks) == null ? void 0 : _c.onResponse);
		hooks.onSuccess.push((_d = plugin.hooks) == null ? void 0 : _d.onSuccess);
		hooks.onError.push((_e = plugin.hooks) == null ? void 0 : _e.onError);
		hooks.onRetry.push((_f = plugin.hooks) == null ? void 0 : _f.onRetry);
	}
	return {
		url,
		options: opts,
		hooks
	};
};
var LinearRetryStrategy = class {
	constructor(options) {
		this.options = options;
	}
	shouldAttemptRetry(attempt, response) {
		if (this.options.shouldRetry) return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
		return Promise.resolve(attempt < this.options.attempts);
	}
	getDelay() {
		return this.options.delay;
	}
};
var ExponentialRetryStrategy = class {
	constructor(options) {
		this.options = options;
	}
	shouldAttemptRetry(attempt, response) {
		if (this.options.shouldRetry) return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
		return Promise.resolve(attempt < this.options.attempts);
	}
	getDelay(attempt) {
		return Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** attempt);
	}
};
function createRetryStrategy(options) {
	if (typeof options === "number") return new LinearRetryStrategy({
		type: "linear",
		attempts: options,
		delay: 1e3
	});
	switch (options.type) {
		case "linear": return new LinearRetryStrategy(options);
		case "exponential": return new ExponentialRetryStrategy(options);
		default: throw new Error("Invalid retry strategy");
	}
}
var getAuthHeader = async (options) => {
	const headers = {};
	const getValue = async (value) => typeof value === "function" ? await value() : value;
	if (options == null ? void 0 : options.auth) {
		if (options.auth.type === "Bearer") {
			const token = await getValue(options.auth.token);
			if (!token) return headers;
			headers["authorization"] = `Bearer ${token}`;
		} else if (options.auth.type === "Basic") {
			const [username, password] = await Promise.all([getValue(options.auth.username), getValue(options.auth.password)]);
			if (!username || !password) return headers;
			headers["authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
		} else if (options.auth.type === "Custom") {
			const [prefix, value] = await Promise.all([getValue(options.auth.prefix), getValue(options.auth.value)]);
			if (!value) return headers;
			headers["authorization"] = `${prefix != null ? prefix : ""} ${value}`;
		}
	}
	return headers;
};
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(request) {
	const _contentType = request.headers.get("content-type");
	const textTypes = /* @__PURE__ */ new Set([
		"image/svg",
		"application/xml",
		"application/xhtml",
		"application/html"
	]);
	if (!_contentType) return "json";
	const contentType = _contentType.split(";").shift() || "";
	if (JSON_RE.test(contentType)) return "json";
	if (textTypes.has(contentType) || contentType.startsWith("text/")) return "text";
	return "blob";
}
function isJSONParsable(value) {
	try {
		JSON.parse(value);
		return true;
	} catch (error) {
		return false;
	}
}
function isJSONSerializable(value) {
	if (value === void 0) return false;
	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
	if (t !== "object") return false;
	if (Array.isArray(value)) return true;
	if (value.buffer) return false;
	return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function jsonParse(text) {
	try {
		return JSON.parse(text);
	} catch (error) {
		return text;
	}
}
function isFunction(value) {
	return typeof value === "function";
}
function getFetch(options) {
	if (options == null ? void 0 : options.customFetchImpl) return options.customFetchImpl;
	if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) return globalThis.fetch;
	if (typeof window !== "undefined" && isFunction(window.fetch)) return window.fetch;
	throw new Error("No fetch implementation found");
}
async function getHeaders(opts) {
	const headers = new Headers(opts == null ? void 0 : opts.headers);
	const authHeader = await getAuthHeader(opts);
	for (const [key, value] of Object.entries(authHeader || {})) headers.set(key, value);
	if (!headers.has("content-type")) {
		const t = detectContentType(opts == null ? void 0 : opts.body);
		if (t) headers.set("content-type", t);
	}
	return headers;
}
function detectContentType(body) {
	if (isJSONSerializable(body)) return "application/json";
	return null;
}
function getBody(options) {
	if (!(options == null ? void 0 : options.body)) return null;
	const headers = new Headers(options == null ? void 0 : options.headers);
	if (isJSONSerializable(options.body) && !headers.has("content-type")) {
		for (const [key, value] of Object.entries(options == null ? void 0 : options.body)) if (value instanceof Date) options.body[key] = value.toISOString();
		return JSON.stringify(options.body);
	}
	if (headers.has("content-type") && headers.get("content-type") === "application/x-www-form-urlencoded") {
		if (isJSONSerializable(options.body)) return new URLSearchParams(options.body).toString();
		return options.body;
	}
	return options.body;
}
function getMethod(url, options) {
	var _a;
	if (options == null ? void 0 : options.method) return options.method.toUpperCase();
	if (url.startsWith("@")) {
		const pMethod = (_a = url.split("@")[1]) == null ? void 0 : _a.split("/")[0];
		if (!methods.includes(pMethod)) return (options == null ? void 0 : options.body) ? "POST" : "GET";
		return pMethod.toUpperCase();
	}
	return (options == null ? void 0 : options.body) ? "POST" : "GET";
}
function getTimeout(options, controller) {
	let abortTimeout;
	if (!(options == null ? void 0 : options.signal) && (options == null ? void 0 : options.timeout)) abortTimeout = setTimeout(() => controller == null ? void 0 : controller.abort(), options == null ? void 0 : options.timeout);
	return {
		abortTimeout,
		clearTimeout: () => {
			if (abortTimeout) clearTimeout(abortTimeout);
		}
	};
}
var ValidationError = class _ValidationError extends Error {
	constructor(issues, message) {
		super(message || JSON.stringify(issues, null, 2));
		this.issues = issues;
		Object.setPrototypeOf(this, _ValidationError.prototype);
	}
};
async function parseStandardSchema(schema, input) {
	const result = await schema["~standard"].validate(input);
	if (result.issues) throw new ValidationError(result.issues);
	return result.value;
}
var methods = [
	"get",
	"post",
	"put",
	"patch",
	"delete"
];
var applySchemaPlugin = (config) => ({
	id: "apply-schema",
	name: "Apply Schema",
	version: "1.0.0",
	async init(url, options) {
		var _a, _b, _c, _d;
		const schema = ((_b = (_a = config.plugins) == null ? void 0 : _a.find((plugin) => {
			var _a2;
			return ((_a2 = plugin.schema) == null ? void 0 : _a2.config) ? url.startsWith(plugin.schema.config.baseURL || "") || url.startsWith(plugin.schema.config.prefix || "") : false;
		})) == null ? void 0 : _b.schema) || config.schema;
		if (schema) {
			let urlKey = url;
			if ((_c = schema.config) == null ? void 0 : _c.prefix) {
				if (urlKey.startsWith(schema.config.prefix)) {
					urlKey = urlKey.replace(schema.config.prefix, "");
					if (schema.config.baseURL) url = url.replace(schema.config.prefix, schema.config.baseURL);
				}
			}
			if ((_d = schema.config) == null ? void 0 : _d.baseURL) {
				if (urlKey.startsWith(schema.config.baseURL)) urlKey = urlKey.replace(schema.config.baseURL, "");
			}
			const keySchema = schema.schema[urlKey];
			if (keySchema) {
				let opts = __spreadProps(__spreadValues({}, options), {
					method: keySchema.method,
					output: keySchema.output
				});
				if (!(options == null ? void 0 : options.disableValidation)) opts = __spreadProps(__spreadValues({}, opts), {
					body: keySchema.input ? await parseStandardSchema(keySchema.input, options == null ? void 0 : options.body) : options == null ? void 0 : options.body,
					params: keySchema.params ? await parseStandardSchema(keySchema.params, options == null ? void 0 : options.params) : options == null ? void 0 : options.params,
					query: keySchema.query ? await parseStandardSchema(keySchema.query, options == null ? void 0 : options.query) : options == null ? void 0 : options.query
				});
				return {
					url,
					options: opts
				};
			}
		}
		return {
			url,
			options
		};
	}
});
var createFetch = (config) => {
	async function $fetch(url, options) {
		const opts = __spreadProps(__spreadValues(__spreadValues({}, config), options), { plugins: [
			...(config == null ? void 0 : config.plugins) || [],
			applySchemaPlugin(config || {}),
			...(options == null ? void 0 : options.plugins) || []
		] });
		if (config == null ? void 0 : config.catchAllError) try {
			return await betterFetch(url, opts);
		} catch (error) {
			return {
				data: null,
				error: {
					status: 500,
					statusText: "Fetch Error",
					message: "Fetch related error. Captured by catchAllError option. See error property for more details.",
					error
				}
			};
		}
		return await betterFetch(url, opts);
	}
	return $fetch;
};
function getURL2(url, option) {
	const { baseURL, params, query } = option || {
		query: {},
		params: {},
		baseURL: ""
	};
	let basePath = url.startsWith("http") ? url.split("/").slice(0, 3).join("/") : baseURL || "";
	if (url.startsWith("@")) {
		const m = url.toString().split("@")[1].split("/")[0];
		if (methods.includes(m)) url = url.replace(`@${m}/`, "/");
	}
	if (!basePath.endsWith("/")) basePath += "/";
	let [path, urlQuery] = url.replace(basePath, "").split("?");
	const queryParams = new URLSearchParams(urlQuery);
	for (const [key, value] of Object.entries(query || {})) {
		if (value == null) continue;
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else if (Array.isArray(value)) {
			for (const val of value) queryParams.append(key, val);
			continue;
		} else serializedValue = JSON.stringify(value);
		queryParams.set(key, serializedValue);
	}
	if (params) if (Array.isArray(params)) {
		const paramPaths = path.split("/").filter((p) => p.startsWith(":"));
		for (const [index, key] of paramPaths.entries()) {
			const value = params[index];
			path = path.replace(key, value);
		}
	} else for (const [key, value] of Object.entries(params)) path = path.replace(`:${key}`, String(value));
	path = path.split("/").map(encodeURIComponent).join("/");
	if (path.startsWith("/")) path = path.slice(1);
	let queryParamString = queryParams.toString();
	queryParamString = queryParamString.length > 0 ? `?${queryParamString}`.replace(/\+/g, "%20") : "";
	if (!basePath.startsWith("http")) return `${basePath}${path}${queryParamString}`;
	return new URL(`${path}${queryParamString}`, basePath);
}
var betterFetch = async (url, options) => {
	var _a, _b, _c, _d, _e, _f, _g, _h;
	const { hooks, url: __url, options: opts } = await initializePlugins(url, options);
	const fetch = getFetch(opts);
	const controller = new AbortController();
	const signal = (_a = opts.signal) != null ? _a : controller.signal;
	const _url = getURL2(__url, opts);
	const body = getBody(opts);
	const headers = await getHeaders(opts);
	const method = getMethod(__url, opts);
	let context = __spreadProps(__spreadValues({}, opts), {
		url: _url,
		headers,
		body,
		method,
		signal
	});
	for (const onRequest of hooks.onRequest) if (onRequest) {
		const res = await onRequest(context);
		if (typeof res === "object" && res !== null) context = res;
	}
	if ("pipeTo" in context && typeof context.pipeTo === "function" || typeof ((_b = options == null ? void 0 : options.body) == null ? void 0 : _b.pipe) === "function") {
		if (!("duplex" in context)) context.duplex = "half";
	}
	const { clearTimeout: clearTimeout2 } = getTimeout(opts, controller);
	let response = await fetch(context.url, context);
	clearTimeout2();
	const responseContext = {
		response,
		request: context
	};
	for (const onResponse of hooks.onResponse) if (onResponse) {
		const r = await onResponse(__spreadProps(__spreadValues({}, responseContext), { response: ((_c = options == null ? void 0 : options.hookOptions) == null ? void 0 : _c.cloneResponse) ? response.clone() : response }));
		if (r instanceof Response) response = r;
		else if (typeof r === "object" && r !== null) response = r.response;
	}
	if (response.ok) {
		if (!(context.method !== "HEAD")) return {
			data: "",
			error: null
		};
		const responseType = detectResponseType(response);
		const successContext = {
			data: null,
			response,
			request: context
		};
		if (responseType === "json" || responseType === "text") {
			const text = await response.text();
			successContext.data = await ((_d = context.jsonParser) != null ? _d : jsonParse)(text);
		} else successContext.data = await response[responseType]();
		if (context == null ? void 0 : context.output) {
			if (context.output && !context.disableValidation) successContext.data = await parseStandardSchema(context.output, successContext.data);
		}
		for (const onSuccess of hooks.onSuccess) if (onSuccess) await onSuccess(__spreadProps(__spreadValues({}, successContext), { response: ((_e = options == null ? void 0 : options.hookOptions) == null ? void 0 : _e.cloneResponse) ? response.clone() : response }));
		if (options == null ? void 0 : options.throw) return successContext.data;
		return {
			data: successContext.data,
			error: null
		};
	}
	const parser = (_f = options == null ? void 0 : options.jsonParser) != null ? _f : jsonParse;
	const responseText = await response.text();
	const isJSONResponse = isJSONParsable(responseText);
	const errorObject = isJSONResponse ? await parser(responseText) : null;
	const errorContext = {
		response,
		responseText,
		request: context,
		error: __spreadProps(__spreadValues({}, errorObject), {
			status: response.status,
			statusText: response.statusText
		})
	};
	for (const onError of hooks.onError) if (onError) await onError(__spreadProps(__spreadValues({}, errorContext), { response: ((_g = options == null ? void 0 : options.hookOptions) == null ? void 0 : _g.cloneResponse) ? response.clone() : response }));
	if (options == null ? void 0 : options.retry) {
		const retryStrategy = createRetryStrategy(options.retry);
		const _retryAttempt = (_h = options.retryAttempt) != null ? _h : 0;
		if (await retryStrategy.shouldAttemptRetry(_retryAttempt, response)) {
			for (const onRetry of hooks.onRetry) if (onRetry) await onRetry(responseContext);
			const delay = retryStrategy.getDelay(_retryAttempt);
			await new Promise((resolve) => setTimeout(resolve, delay));
			return await betterFetch(url, __spreadProps(__spreadValues({}, options), { retryAttempt: _retryAttempt + 1 }));
		}
	}
	if (options == null ? void 0 : options.throw) throw new BetterFetchError(response.status, response.statusText, isJSONResponse ? errorObject : responseText);
	return {
		data: null,
		error: __spreadProps(__spreadValues({}, errorObject), {
			status: response.status,
			statusText: response.statusText
		})
	};
};
//#endregion
//#region node_modules/.pnpm/@better-auth+core@1.6.12_@better-auth+utils@0.4.1_@better-fetch+fetch@1.1.21_@cloudflar_78f70793b52adc95b0ee86441b520eea/node_modules/@better-auth/core/dist/env/env-impl.mjs
var _envShim = Object.create(null);
var _getEnv = (useShim) => globalThis.process?.env || globalThis.Deno?.env.toObject() || globalThis.__env__ || (useShim ? _envShim : globalThis);
var env = new Proxy(_envShim, {
	get(_, prop) {
		return _getEnv()[prop] ?? _envShim[prop];
	},
	has(_, prop) {
		return prop in _getEnv() || prop in _envShim;
	},
	set(_, prop, value) {
		const env = _getEnv(true);
		env[prop] = value;
		return true;
	},
	deleteProperty(_, prop) {
		if (!prop) return false;
		const env = _getEnv(true);
		delete env[prop];
		return true;
	},
	ownKeys() {
		const env = _getEnv(true);
		return Object.keys(env);
	}
});
typeof process !== "undefined" && process.env;
/**
* Get environment variable with fallback
*/
function getEnvVar(key, fallback) {
	if (typeof process !== "undefined" && process.env) return process.env[key] ?? fallback;
	if (typeof Deno !== "undefined") return Deno.env.get(key) ?? fallback;
	if (typeof Bun !== "undefined") return Bun.env[key] ?? fallback;
	return fallback;
}
Object.freeze({
	get BETTER_AUTH_SECRET() {
		return getEnvVar("BETTER_AUTH_SECRET");
	},
	get AUTH_SECRET() {
		return getEnvVar("AUTH_SECRET");
	},
	get BETTER_AUTH_TELEMETRY() {
		return getEnvVar("BETTER_AUTH_TELEMETRY");
	},
	get BETTER_AUTH_TELEMETRY_ID() {
		return getEnvVar("BETTER_AUTH_TELEMETRY_ID");
	},
	get NODE_ENV() {
		return getEnvVar("NODE_ENV", "development");
	},
	get PACKAGE_VERSION() {
		return getEnvVar("PACKAGE_VERSION", "0.0.0");
	},
	get BETTER_AUTH_TELEMETRY_ENDPOINT() {
		return getEnvVar("BETTER_AUTH_TELEMETRY_ENDPOINT", "");
	}
});
//#endregion
//#region node_modules/.pnpm/better-call@1.3.5_zod@3.25.76/node_modules/better-call/dist/error.mjs
function isErrorStackTraceLimitWritable() {
	const desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
	if (desc === void 0) return Object.isExtensible(Error);
	return Object.prototype.hasOwnProperty.call(desc, "writable") ? desc.writable : desc.set !== void 0;
}
/**
* Hide internal stack frames from the error stack trace.
*/
function hideInternalStackFrames(stack) {
	const lines = stack.split("\n    at ");
	if (lines.length <= 1) return stack;
	lines.splice(1, 1);
	return lines.join("\n    at ");
}
/**
* Creates a custom error class that hides stack frames.
*/
function makeErrorForHideStackFrame(Base, clazz) {
	class HideStackFramesError extends Base {
		#hiddenStack;
		constructor(...args) {
			if (isErrorStackTraceLimitWritable()) {
				const limit = Error.stackTraceLimit;
				Error.stackTraceLimit = 0;
				super(...args);
				Error.stackTraceLimit = limit;
			} else super(...args);
			const stack = (/* @__PURE__ */ new Error()).stack;
			if (stack) this.#hiddenStack = hideInternalStackFrames(stack.replace(/^Error/, this.name));
		}
		get errorStack() {
			return this.#hiddenStack;
		}
	}
	Object.defineProperty(HideStackFramesError.prototype, "constructor", {
		get() {
			return clazz;
		},
		enumerable: false,
		configurable: true
	});
	return HideStackFramesError;
}
var statusCodes = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	MULTIPLE_CHOICES: 300,
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	SEE_OTHER: 303,
	NOT_MODIFIED: 304,
	TEMPORARY_REDIRECT: 307,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	"I'M_A_TEAPOT": 418,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_ENTITY: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NOT_EXTENDED: 510,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var InternalAPIError = class extends Error {
	constructor(status = "INTERNAL_SERVER_ERROR", body = void 0, headers = {}, statusCode = typeof status === "number" ? status : statusCodes[status]) {
		super(body?.message, body?.cause ? { cause: body.cause } : void 0);
		this.status = status;
		this.body = body;
		this.headers = headers;
		this.statusCode = statusCode;
		this.name = "APIError";
		this.status = status;
		this.headers = headers;
		this.statusCode = statusCode;
		this.body = body;
	}
};
makeErrorForHideStackFrame(InternalAPIError, Error);
//#endregion
//#region node_modules/.pnpm/@better-auth+core@1.6.12_@better-auth+utils@0.4.1_@better-fetch+fetch@1.1.21_@cloudflar_78f70793b52adc95b0ee86441b520eea/node_modules/@better-auth/core/dist/error/index.mjs
var BetterAuthError = class extends Error {
	constructor(message, options) {
		super(message, options);
		this.name = "BetterAuthError";
		this.message = message;
		this.stack = "";
	}
};
//#endregion
//#region node_modules/.pnpm/better-auth@1.6.12_@cloudflare+workers-types@4.20260621.1_@tanstack+solid-start@2.0.0-b_67caca208ef0c03813231fce5760c860/node_modules/better-auth/dist/utils/url.mjs
var SLASH_CHAR_CODE = "/".charCodeAt(0);
function trimTrailingSlashes(value) {
	let end = value.length;
	while (end > 0 && value.charCodeAt(end - 1) === SLASH_CHAR_CODE) end--;
	return end === value.length ? value : value.slice(0, end);
}
function checkHasPath(url) {
	try {
		return (trimTrailingSlashes(new URL(url).pathname) || "/") !== "/";
	} catch {
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
	}
}
function assertHasProtocol(url) {
	try {
		const parsedUrl = new URL(url);
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new BetterAuthError(`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
	} catch (error) {
		if (error instanceof BetterAuthError) throw error;
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`, { cause: error });
	}
}
function withPath(url, path = "/api/auth") {
	assertHasProtocol(url);
	if (checkHasPath(url)) return url;
	const trimmedUrl = trimTrailingSlashes(url);
	if (!path || path === "/") return trimmedUrl;
	path = path.startsWith("/") ? path : `/${path}`;
	return `${trimmedUrl}${path}`;
}
function validateProxyHeader(header, type) {
	if (!header || header.trim() === "") return false;
	if (type === "proto") return header === "http" || header === "https";
	if (type === "host") {
		if ([
			/\.\./,
			/\0/,
			/[\s]/,
			/^[.]/,
			/[<>'"]/,
			/javascript:/i,
			/file:/i,
			/data:/i
		].some((pattern) => pattern.test(header))) return false;
		return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(header) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(header) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(header) || /^localhost(:[0-9]{1,5})?$/i.test(header);
	}
	return false;
}
function getBaseURL(url, path, request, loadEnv, trustedProxyHeaders) {
	if (url) return withPath(url, path);
	if (loadEnv !== false) {
		const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
		if (fromEnv) return withPath(fromEnv, path);
	}
	const fromRequest = request?.headers.get("x-forwarded-host");
	const fromRequestProto = request?.headers.get("x-forwarded-proto");
	if (fromRequest && fromRequestProto && trustedProxyHeaders) {
		if (validateProxyHeader(fromRequestProto, "proto") && validateProxyHeader(fromRequest, "host")) try {
			return withPath(`${fromRequestProto}://${fromRequest}`, path);
		} catch (_error) {}
	}
	if (request) {
		const url = getOrigin(request.url);
		if (!url) throw new BetterAuthError("Could not get origin from request. Please provide a valid base URL.");
		return withPath(url, path);
	}
	if (typeof window !== "undefined" && window.location) return withPath(window.location.origin, path);
}
function getOrigin(url) {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.origin === "null" ? null : parsedUrl.origin;
	} catch {
		return null;
	}
}
new TextEncoder();
var decoder = new TextDecoder();
//#endregion
//#region node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/base64.js
function decodeBase64(encoded) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(encoded);
	const binary = atob(encoded);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/util/base64url.js
function decode(input) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), { alphabet: "base64url" });
	let encoded = input;
	if (encoded instanceof Uint8Array) encoded = decoder.decode(encoded);
	encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
	try {
		return decodeBase64(encoded);
	} catch {
		throw new TypeError("The input to be decoded is not correctly encoded.");
	}
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/util/errors.js
var JOSEError = class extends Error {
	static code = "ERR_JOSE_GENERIC";
	code = "ERR_JOSE_GENERIC";
	constructor(message, options) {
		super(message, options);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
};
var JWTInvalid = class extends JOSEError {
	static code = "ERR_JWT_INVALID";
	code = "ERR_JWT_INVALID";
};
//#endregion
//#region node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/lib/type_checks.js
var isObjectLike = (value) => typeof value === "object" && value !== null;
function isObject(input) {
	if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") return false;
	if (Object.getPrototypeOf(input) === null) return true;
	let proto = input;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(input) === proto;
}
//#endregion
//#region node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/util/decode_jwt.js
function decodeJwt(jwt) {
	if (typeof jwt !== "string") throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
	const { 1: payload, length } = jwt.split(".");
	if (length === 5) throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
	if (length !== 3) throw new JWTInvalid("Invalid JWT");
	if (!payload) throw new JWTInvalid("JWTs must contain a payload");
	let decoded;
	try {
		decoded = decode(payload);
	} catch {
		throw new JWTInvalid("Failed to base64url decode the payload");
	}
	let result;
	try {
		result = JSON.parse(decoder.decode(decoded));
	} catch {
		throw new JWTInvalid("Failed to parse the decoded payload as JSON");
	}
	if (!isObject(result)) throw new JWTInvalid("Invalid JWT Claims Set");
	return result;
}
//#endregion
//#region node_modules/.pnpm/better-auth@1.6.12_@cloudflare+workers-types@4.20260621.1_@tanstack+solid-start@2.0.0-b_67caca208ef0c03813231fce5760c860/node_modules/better-auth/dist/cookies/cookie-utils.mjs
function tryDecode(str) {
	if (str.indexOf("%") === -1) return str;
	try {
		return decodeURIComponent(str);
	} catch {
		return str;
	}
}
/**
* Cookie-name token char set per RFC 7230 §3.2.6.
*
* @see https://datatracker.ietf.org/doc/html/rfc7230#section-3.2.6
*/
var cookieNameRegex = /^[\w!#$%&'*.^`|~+-]+$/;
/**
* Cookie-value char set per RFC 6265 §4.1.1, plus space and comma.
*
* @see https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1
* @see https://github.com/golang/go/issues/7243
*/
var cookieValueRegex = /^[ !#-:<-[\]-~]*$/;
/**
* Strip surrounding double-quotes per RFC 6265 §4.1.1 quoted-string form.
*
* @see https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1
*/
function unquoteCookieValue(value) {
	if (value.length < 2 || !value.startsWith("\"") || !value.endsWith("\"")) return value;
	return value.slice(1, -1);
}
/**
* Trim leading/trailing OWS (space / horizontal tab) per RFC 7230 §3.2.3.
* Narrower than `String.prototype.trim()`, which strips CR/LF and other
* whitespace and would let CTLs escape `cookieValueRegex`.
*
* @see https://datatracker.ietf.org/doc/html/rfc7230#section-3.2.3
*/
function trimOWS(s) {
	let start = 0;
	let end = s.length;
	while (start < end) {
		const c = s.charCodeAt(start);
		if (c !== 32 && c !== 9) break;
		start++;
	}
	while (end > start) {
		const c = s.charCodeAt(end - 1);
		if (c !== 32 && c !== 9) break;
		end--;
	}
	return start === 0 && end === s.length ? s : s.slice(start, end);
}
/**
* Tolerates `;` separators without the SP that RFC 6265 §4.2.1 mandates,
* since proxies and runtimes commonly strip it. Silently drops entries
* whose name violates RFC 7230 token or whose value violates RFC 6265
* cookie-octet (plus space and comma). Strips optional surrounding
* double-quotes per RFC 6265 §4.1.1.
*/
function parseCookies(cookie) {
	const cookieMap = /* @__PURE__ */ new Map();
	if (cookie.length < 2) return cookieMap;
	for (const chunk of cookie.split(";")) {
		const eq = chunk.indexOf("=");
		if (eq === -1) continue;
		const key = trimOWS(chunk.slice(0, eq));
		const val = unquoteCookieValue(trimOWS(chunk.slice(eq + 1)));
		if (cookieNameRegex.test(key) && cookieValueRegex.test(val)) cookieMap.set(key, tryDecode(val));
	}
	return cookieMap;
}
new TextEncoder().encode;
//#endregion
//#region node_modules/.pnpm/better-auth@1.6.12_@cloudflare+workers-types@4.20260621.1_@tanstack+solid-start@2.0.0-b_67caca208ef0c03813231fce5760c860/node_modules/better-auth/dist/cookies/index.mjs
var getSessionCookie = (request, config) => {
	const cookies = (request instanceof Headers || !("headers" in request) ? request : request.headers).get("cookie");
	if (!cookies) return null;
	const { cookieName = "session_token", cookiePrefix = "better-auth" } = config || {};
	const parsedCookie = parseCookies(cookies);
	const getCookie = (name) => parsedCookie.get(name) || parsedCookie.get(`__Secure-${name}`);
	const sessionToken = getCookie(`${cookiePrefix}.${cookieName}`) || getCookie(`${cookiePrefix}-${cookieName}`);
	if (sessionToken) return sessionToken;
	return null;
};
//#endregion
//#region node_modules/.pnpm/@convex-dev+better-auth@0.12.2_@standard-schema+spec@1.1.0_better-auth@1.6.12_@cloudfla_99d16bd8e7d455ae171a080dfe2338bf/node_modules/@convex-dev/better-auth/dist/version.js
var VERSION = "0.12.2";
//#endregion
//#region node_modules/.pnpm/@convex-dev+better-auth@0.12.2_@standard-schema+spec@1.1.0_better-auth@1.6.12_@cloudfla_99d16bd8e7d455ae171a080dfe2338bf/node_modules/@convex-dev/better-auth/dist/plugins/convex/index.js
var JWT_COOKIE_NAME = "convex_jwt";
//#endregion
//#region node_modules/.pnpm/@convex-dev+better-auth@0.12.2_@standard-schema+spec@1.1.0_better-auth@1.6.12_@cloudfla_99d16bd8e7d455ae171a080dfe2338bf/node_modules/@convex-dev/better-auth/dist/utils/index.js
var getToken$1 = async (siteUrl, headers, opts) => {
	headers.set("host", new URL(siteUrl).host);
	const fetchToken = async () => {
		const { data } = await betterFetch(`${opts?.basePath ? (opts.basePath.startsWith("/") ? opts.basePath : `/${opts.basePath}`).replace(/\/+$/, "") : "/api/auth"}/convex/token`, {
			baseURL: siteUrl,
			headers
		});
		return {
			isFresh: true,
			token: data?.token
		};
	};
	if (!opts?.jwtCache?.enabled || opts.forceRefresh) return await fetchToken();
	const token = getSessionCookie(new Headers(headers), {
		cookieName: JWT_COOKIE_NAME,
		cookiePrefix: opts?.cookiePrefix
	});
	if (!token) return await fetchToken();
	try {
		const exp = decodeJwt(token)?.exp;
		const now = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
		if (!(exp ? now > exp + (opts?.jwtCache?.expirationToleranceSeconds ?? 60) : true)) return {
			isFresh: false,
			token
		};
	} catch (error) {
		console.error("Error decoding JWT", error);
	}
	return await fetchToken();
};
//#endregion
//#region src/library/auth-server.ts
var convexUrl = process.env.VITE_CONVEX_URL;
var convexSiteUrl = process.env.VITE_CONVEX_SITE_URL;
var basePath = "/api/auth";
async function fetchToken() {
	const headers = new Headers(getRequest().headers);
	headers.delete("content-length");
	headers.delete("transfer-encoding");
	headers.set("accept-encoding", "identity");
	return getToken$1(convexSiteUrl, headers, { basePath });
}
async function getToken() {
	const { token } = await fetchToken();
	return token;
}
function authedClient(token) {
	const client = new ConvexHttpClient(convexUrl);
	if (token !== void 0) client.setAuth(token);
	return client;
}
async function fetchAuthQuery(query, ...args) {
	const { token } = await fetchToken();
	return authedClient(token).query(query, ...args);
}
async function fetchAuthMutation(mutation, ...args) {
	const { token } = await fetchToken();
	return authedClient(token).mutation(mutation, ...args);
}
function handler(request) {
	const requestUrl = new URL(request.url);
	const nextUrl = `${convexSiteUrl}${requestUrl.pathname}${requestUrl.search}`;
	const headers = new Headers(request.headers);
	headers.delete("transfer-encoding");
	headers.delete("content-length");
	headers.delete("connection");
	headers.set("accept-encoding", "application/json");
	headers.set("host", new URL(convexSiteUrl).host);
	headers.set("x-forwarded-host", requestUrl.host);
	headers.set("x-forwarded-proto", requestUrl.protocol.replace(/:$/, ""));
	headers.set("x-better-auth-forwarded-host", requestUrl.host);
	headers.set("x-better-auth-forwarded-proto", requestUrl.protocol.replace(/:$/, ""));
	return fetch(nextUrl, {
		method: request.method,
		headers,
		redirect: "manual",
		body: request.body,
		duplex: "half"
	});
}
//#endregion
export { fromByteArray as C, validateDeploymentUrl as S, version as _, VERSION as a, jsonToConvex as b, createHybridErrorStacktrace as c, instantiateNoopLogger as d, logFatalError as f, toReferencePath as g, getFunctionName as h, handler as i, forwardData as l, anyApi as m, fetchAuthQuery as n, getBaseURL as o, logForFunction as p, getToken as r, createFetch as s, fetchAuthMutation as t, instantiateDefaultLogger as u, ConvexError as v, toByteArray as w, parseArgs as x, convexToJson as y };
