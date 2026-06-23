import { O as createSignal, R as omit, a as mergeProps, b as Show, c as ssrAttribute, d as ssrGroup, f as ssrHydrationKey, g as For, i as memo, l as ssrClassName, m as ssrStyleProperty, p as ssrStyle, r as escape, s as ssr, u as ssrElement, w as createEffect } from "./server-Bjhk73rZ.js";
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/.pnpm/tailwind-merge@2.6.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		const classParts = className.split(CLASS_PART_SEPARATOR);
		if (classParts[0] === "" && classParts.length !== 1) classParts.shift();
		return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		const conflicts = conflictingClassGroups[classGroupId] || [];
		if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
		return conflicts;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, classPartObject) => {
	if (classParts.length === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[0];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
	if (classGroupFromNextClassPart) return classGroupFromNextClassPart;
	if (classPartObject.validators.length === 0) return;
	const classRest = classParts.join(CLASS_PART_SEPARATOR);
	return classPartObject.validators.find(({ validator }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
	if (arbitraryPropertyRegex.test(className)) {
		const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
		const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
		if (property) return "arbitrary.." + property;
	}
};
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, prefix } = config;
	const classMap = {
		nextPart: /* @__PURE__ */ new Map(),
		validators: []
	};
	getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix).forEach(([classGroupId, classGroup]) => {
		processClassesRecursively(classGroup, classMap, classGroupId, theme);
	});
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	classGroup.forEach((classDefinition) => {
		if (typeof classDefinition === "string") {
			const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
			classPartObjectToEdit.classGroupId = classGroupId;
			return;
		}
		if (typeof classDefinition === "function") {
			if (isThemeGetter(classDefinition)) {
				processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
				return;
			}
			classPartObject.validators.push({
				validator: classDefinition,
				classGroupId
			});
			return;
		}
		Object.entries(classDefinition).forEach(([key, classGroup]) => {
			processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
		});
	});
};
var getPart = (classPartObject, path) => {
	let currentClassPartObject = classPartObject;
	path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
		if (!currentClassPartObject.nextPart.has(pathPart)) currentClassPartObject.nextPart.set(pathPart, {
			nextPart: /* @__PURE__ */ new Map(),
			validators: []
		});
		currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
	});
	return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
	if (!prefix) return classGroupEntries;
	return classGroupEntries.map(([classGroupId, classGroup]) => {
		return [classGroupId, classGroup.map((classDefinition) => {
			if (typeof classDefinition === "string") return prefix + classDefinition;
			if (typeof classDefinition === "object") return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
			return classDefinition;
		})];
	});
};
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = /* @__PURE__ */ new Map();
	let previousCache = /* @__PURE__ */ new Map();
	const update = (key, value) => {
		cache.set(key, value);
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = /* @__PURE__ */ new Map();
		}
	};
	return {
		get(key) {
			let value = cache.get(key);
			if (value !== void 0) return value;
			if ((value = previousCache.get(key)) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (cache.has(key)) cache.set(key, value);
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var createParseClassName = (config) => {
	const { separator, experimentalParseClassName } = config;
	const isSeparatorSingleCharacter = separator.length === 1;
	const firstSeparatorCharacter = separator[0];
	const separatorLength = separator.length;
	const parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		for (let index = 0; index < className.length; index++) {
			let currentCharacter = className[index];
			if (bracketDepth === 0) {
				if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + separatorLength;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
		const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
		return {
			modifiers,
			hasImportantModifier,
			baseClassName: hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier,
			maybePostfixModifierPosition: postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0
		};
	};
	if (experimentalParseClassName) return (className) => experimentalParseClassName({
		className,
		parseClassName
	});
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var sortModifiers = (modifiers) => {
	if (modifiers.length <= 1) return modifiers;
	const sortedModifiers = [];
	let unsortedModifiers = [];
	modifiers.forEach((modifier) => {
		if (modifier[0] === "[") {
			sortedModifiers.push(...unsortedModifiers.sort(), modifier);
			unsortedModifiers = [];
		} else unsortedModifiers.push(modifier);
	});
	sortedModifiers.push(...unsortedModifiers.sort());
	return sortedModifiers;
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.includes(classId)) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
function twJoin() {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < arguments.length) if (argument = arguments[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
}
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall = initTailwindMerge;
	function initTailwindMerge(classList) {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	}
	function tailwindMerge(classList) {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	}
	return function callTailwindMerge() {
		return functionToCall(twJoin.apply(null, arguments));
	};
}
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || [];
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set([
	"px",
	"full",
	"screen"
]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var sizeLabels = /* @__PURE__ */ new Set([
	"length",
	"size",
	"percentage"
]);
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
var isAny = () => true;
var getIsArbitraryValue = (value, label, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return typeof label === "string" ? result[1] === label : label.has(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var getDefaultConfig = () => {
	const colors = fromTheme("colors");
	const spacing = fromTheme("spacing");
	const blur = fromTheme("blur");
	const brightness = fromTheme("brightness");
	const borderColor = fromTheme("borderColor");
	const borderRadius = fromTheme("borderRadius");
	const borderSpacing = fromTheme("borderSpacing");
	const borderWidth = fromTheme("borderWidth");
	const contrast = fromTheme("contrast");
	const grayscale = fromTheme("grayscale");
	const hueRotate = fromTheme("hueRotate");
	const invert = fromTheme("invert");
	const gap = fromTheme("gap");
	const gradientColorStops = fromTheme("gradientColorStops");
	const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
	const inset = fromTheme("inset");
	const margin = fromTheme("margin");
	const opacity = fromTheme("opacity");
	const padding = fromTheme("padding");
	const saturate = fromTheme("saturate");
	const scale = fromTheme("scale");
	const sepia = fromTheme("sepia");
	const skew = fromTheme("skew");
	const space = fromTheme("space");
	const translate = fromTheme("translate");
	const getOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const getOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const getSpacingWithAutoAndArbitrary = () => [
		"auto",
		isArbitraryValue,
		spacing
	];
	const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
	const getLengthWithEmptyAndArbitrary = () => [
		"",
		isLength,
		isArbitraryLength
	];
	const getNumberWithAutoAndArbitrary = () => [
		"auto",
		isNumber,
		isArbitraryValue
	];
	const getPositions = () => [
		"bottom",
		"center",
		"left",
		"left-bottom",
		"left-top",
		"right",
		"right-bottom",
		"right-top",
		"top"
	];
	const getLineStyles = () => [
		"solid",
		"dashed",
		"dotted",
		"double",
		"none"
	];
	const getBlendModes = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const getAlign = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch"
	];
	const getZeroAndEmpty = () => [
		"",
		"0",
		isArbitraryValue
	];
	const getBreaks = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
	return {
		cacheSize: 500,
		separator: ":",
		theme: {
			colors: [isAny],
			spacing: [isLength, isArbitraryLength],
			blur: [
				"none",
				"",
				isTshirtSize,
				isArbitraryValue
			],
			brightness: getNumberAndArbitrary(),
			borderColor: [colors],
			borderRadius: [
				"none",
				"",
				"full",
				isTshirtSize,
				isArbitraryValue
			],
			borderSpacing: getSpacingWithArbitrary(),
			borderWidth: getLengthWithEmptyAndArbitrary(),
			contrast: getNumberAndArbitrary(),
			grayscale: getZeroAndEmpty(),
			hueRotate: getNumberAndArbitrary(),
			invert: getZeroAndEmpty(),
			gap: getSpacingWithArbitrary(),
			gradientColorStops: [colors],
			gradientColorStopPositions: [isPercent, isArbitraryLength],
			inset: getSpacingWithAutoAndArbitrary(),
			margin: getSpacingWithAutoAndArbitrary(),
			opacity: getNumberAndArbitrary(),
			padding: getSpacingWithArbitrary(),
			saturate: getNumberAndArbitrary(),
			scale: getNumberAndArbitrary(),
			sepia: getZeroAndEmpty(),
			skew: getNumberAndArbitrary(),
			space: getSpacingWithArbitrary(),
			translate: getSpacingWithArbitrary()
		},
		classGroups: {
			/**
			* Aspect Ratio
			* @see https://tailwindcss.com/docs/aspect-ratio
			*/
			aspect: [{ aspect: [
				"auto",
				"square",
				"video",
				isArbitraryValue
			] }],
			/**
			* Container
			* @see https://tailwindcss.com/docs/container
			*/
			container: ["container"],
			/**
			* Columns
			* @see https://tailwindcss.com/docs/columns
			*/
			columns: [{ columns: [isTshirtSize] }],
			/**
			* Break After
			* @see https://tailwindcss.com/docs/break-after
			*/
			"break-after": [{ "break-after": getBreaks() }],
			/**
			* Break Before
			* @see https://tailwindcss.com/docs/break-before
			*/
			"break-before": [{ "break-before": getBreaks() }],
			/**
			* Break Inside
			* @see https://tailwindcss.com/docs/break-inside
			*/
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			/**
			* Box Decoration Break
			* @see https://tailwindcss.com/docs/box-decoration-break
			*/
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			/**
			* Box Sizing
			* @see https://tailwindcss.com/docs/box-sizing
			*/
			box: [{ box: ["border", "content"] }],
			/**
			* Display
			* @see https://tailwindcss.com/docs/display
			*/
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			/**
			* Floats
			* @see https://tailwindcss.com/docs/float
			*/
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			/**
			* Clear
			* @see https://tailwindcss.com/docs/clear
			*/
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			/**
			* Isolation
			* @see https://tailwindcss.com/docs/isolation
			*/
			isolation: ["isolate", "isolation-auto"],
			/**
			* Object Fit
			* @see https://tailwindcss.com/docs/object-fit
			*/
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			/**
			* Object Position
			* @see https://tailwindcss.com/docs/object-position
			*/
			"object-position": [{ object: [...getPositions(), isArbitraryValue] }],
			/**
			* Overflow
			* @see https://tailwindcss.com/docs/overflow
			*/
			overflow: [{ overflow: getOverflow() }],
			/**
			* Overflow X
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-x": [{ "overflow-x": getOverflow() }],
			/**
			* Overflow Y
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-y": [{ "overflow-y": getOverflow() }],
			/**
			* Overscroll Behavior
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			overscroll: [{ overscroll: getOverscroll() }],
			/**
			* Overscroll Behavior X
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-x": [{ "overscroll-x": getOverscroll() }],
			/**
			* Overscroll Behavior Y
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-y": [{ "overscroll-y": getOverscroll() }],
			/**
			* Position
			* @see https://tailwindcss.com/docs/position
			*/
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			/**
			* Top / Right / Bottom / Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: [inset] }],
			/**
			* Right / Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": [inset] }],
			/**
			* Top / Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": [inset] }],
			/**
			* Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			start: [{ start: [inset] }],
			/**
			* End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			end: [{ end: [inset] }],
			/**
			* Top
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			top: [{ top: [inset] }],
			/**
			* Right
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			right: [{ right: [inset] }],
			/**
			* Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			bottom: [{ bottom: [inset] }],
			/**
			* Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			left: [{ left: [inset] }],
			/**
			* Visibility
			* @see https://tailwindcss.com/docs/visibility
			*/
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			/**
			* Z-Index
			* @see https://tailwindcss.com/docs/z-index
			*/
			z: [{ z: [
				"auto",
				isInteger,
				isArbitraryValue
			] }],
			/**
			* Flex Basis
			* @see https://tailwindcss.com/docs/flex-basis
			*/
			basis: [{ basis: getSpacingWithAutoAndArbitrary() }],
			/**
			* Flex Direction
			* @see https://tailwindcss.com/docs/flex-direction
			*/
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			/**
			* Flex Wrap
			* @see https://tailwindcss.com/docs/flex-wrap
			*/
			"flex-wrap": [{ flex: [
				"wrap",
				"wrap-reverse",
				"nowrap"
			] }],
			/**
			* Flex
			* @see https://tailwindcss.com/docs/flex
			*/
			flex: [{ flex: [
				"1",
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			/**
			* Flex Grow
			* @see https://tailwindcss.com/docs/flex-grow
			*/
			grow: [{ grow: getZeroAndEmpty() }],
			/**
			* Flex Shrink
			* @see https://tailwindcss.com/docs/flex-shrink
			*/
			shrink: [{ shrink: getZeroAndEmpty() }],
			/**
			* Order
			* @see https://tailwindcss.com/docs/order
			*/
			order: [{ order: [
				"first",
				"last",
				"none",
				isInteger,
				isArbitraryValue
			] }],
			/**
			* Grid Template Columns
			* @see https://tailwindcss.com/docs/grid-template-columns
			*/
			"grid-cols": [{ "grid-cols": [isAny] }],
			/**
			* Grid Column Start / End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start-end": [{ col: [
				"auto",
				{ span: [
					"full",
					isInteger,
					isArbitraryValue
				] },
				isArbitraryValue
			] }],
			/**
			* Grid Column Start
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start": [{ "col-start": getNumberWithAutoAndArbitrary() }],
			/**
			* Grid Column End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-end": [{ "col-end": getNumberWithAutoAndArbitrary() }],
			/**
			* Grid Template Rows
			* @see https://tailwindcss.com/docs/grid-template-rows
			*/
			"grid-rows": [{ "grid-rows": [isAny] }],
			/**
			* Grid Row Start / End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start-end": [{ row: [
				"auto",
				{ span: [isInteger, isArbitraryValue] },
				isArbitraryValue
			] }],
			/**
			* Grid Row Start
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start": [{ "row-start": getNumberWithAutoAndArbitrary() }],
			/**
			* Grid Row End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-end": [{ "row-end": getNumberWithAutoAndArbitrary() }],
			/**
			* Grid Auto Flow
			* @see https://tailwindcss.com/docs/grid-auto-flow
			*/
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			/**
			* Grid Auto Columns
			* @see https://tailwindcss.com/docs/grid-auto-columns
			*/
			"auto-cols": [{ "auto-cols": [
				"auto",
				"min",
				"max",
				"fr",
				isArbitraryValue
			] }],
			/**
			* Grid Auto Rows
			* @see https://tailwindcss.com/docs/grid-auto-rows
			*/
			"auto-rows": [{ "auto-rows": [
				"auto",
				"min",
				"max",
				"fr",
				isArbitraryValue
			] }],
			/**
			* Gap
			* @see https://tailwindcss.com/docs/gap
			*/
			gap: [{ gap: [gap] }],
			/**
			* Gap X
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-x": [{ "gap-x": [gap] }],
			/**
			* Gap Y
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-y": [{ "gap-y": [gap] }],
			/**
			* Justify Content
			* @see https://tailwindcss.com/docs/justify-content
			*/
			"justify-content": [{ justify: ["normal", ...getAlign()] }],
			/**
			* Justify Items
			* @see https://tailwindcss.com/docs/justify-items
			*/
			"justify-items": [{ "justify-items": [
				"start",
				"end",
				"center",
				"stretch"
			] }],
			/**
			* Justify Self
			* @see https://tailwindcss.com/docs/justify-self
			*/
			"justify-self": [{ "justify-self": [
				"auto",
				"start",
				"end",
				"center",
				"stretch"
			] }],
			/**
			* Align Content
			* @see https://tailwindcss.com/docs/align-content
			*/
			"align-content": [{ content: [
				"normal",
				...getAlign(),
				"baseline"
			] }],
			/**
			* Align Items
			* @see https://tailwindcss.com/docs/align-items
			*/
			"align-items": [{ items: [
				"start",
				"end",
				"center",
				"baseline",
				"stretch"
			] }],
			/**
			* Align Self
			* @see https://tailwindcss.com/docs/align-self
			*/
			"align-self": [{ self: [
				"auto",
				"start",
				"end",
				"center",
				"stretch",
				"baseline"
			] }],
			/**
			* Place Content
			* @see https://tailwindcss.com/docs/place-content
			*/
			"place-content": [{ "place-content": [...getAlign(), "baseline"] }],
			/**
			* Place Items
			* @see https://tailwindcss.com/docs/place-items
			*/
			"place-items": [{ "place-items": [
				"start",
				"end",
				"center",
				"baseline",
				"stretch"
			] }],
			/**
			* Place Self
			* @see https://tailwindcss.com/docs/place-self
			*/
			"place-self": [{ "place-self": [
				"auto",
				"start",
				"end",
				"center",
				"stretch"
			] }],
			/**
			* Padding
			* @see https://tailwindcss.com/docs/padding
			*/
			p: [{ p: [padding] }],
			/**
			* Padding X
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: [padding] }],
			/**
			* Padding Y
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: [padding] }],
			/**
			* Padding Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: [padding] }],
			/**
			* Padding End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: [padding] }],
			/**
			* Padding Top
			* @see https://tailwindcss.com/docs/padding
			*/
			pt: [{ pt: [padding] }],
			/**
			* Padding Right
			* @see https://tailwindcss.com/docs/padding
			*/
			pr: [{ pr: [padding] }],
			/**
			* Padding Bottom
			* @see https://tailwindcss.com/docs/padding
			*/
			pb: [{ pb: [padding] }],
			/**
			* Padding Left
			* @see https://tailwindcss.com/docs/padding
			*/
			pl: [{ pl: [padding] }],
			/**
			* Margin
			* @see https://tailwindcss.com/docs/margin
			*/
			m: [{ m: [margin] }],
			/**
			* Margin X
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: [margin] }],
			/**
			* Margin Y
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: [margin] }],
			/**
			* Margin Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: [margin] }],
			/**
			* Margin End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: [margin] }],
			/**
			* Margin Top
			* @see https://tailwindcss.com/docs/margin
			*/
			mt: [{ mt: [margin] }],
			/**
			* Margin Right
			* @see https://tailwindcss.com/docs/margin
			*/
			mr: [{ mr: [margin] }],
			/**
			* Margin Bottom
			* @see https://tailwindcss.com/docs/margin
			*/
			mb: [{ mb: [margin] }],
			/**
			* Margin Left
			* @see https://tailwindcss.com/docs/margin
			*/
			ml: [{ ml: [margin] }],
			/**
			* Space Between X
			* @see https://tailwindcss.com/docs/space
			*/
			"space-x": [{ "space-x": [space] }],
			/**
			* Space Between X Reverse
			* @see https://tailwindcss.com/docs/space
			*/
			"space-x-reverse": ["space-x-reverse"],
			/**
			* Space Between Y
			* @see https://tailwindcss.com/docs/space
			*/
			"space-y": [{ "space-y": [space] }],
			/**
			* Space Between Y Reverse
			* @see https://tailwindcss.com/docs/space
			*/
			"space-y-reverse": ["space-y-reverse"],
			/**
			* Width
			* @see https://tailwindcss.com/docs/width
			*/
			w: [{ w: [
				"auto",
				"min",
				"max",
				"fit",
				"svw",
				"lvw",
				"dvw",
				isArbitraryValue,
				spacing
			] }],
			/**
			* Min-Width
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-w": [{ "min-w": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit"
			] }],
			/**
			* Max-Width
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-w": [{ "max-w": [
				isArbitraryValue,
				spacing,
				"none",
				"full",
				"min",
				"max",
				"fit",
				"prose",
				{ screen: [isTshirtSize] },
				isTshirtSize
			] }],
			/**
			* Height
			* @see https://tailwindcss.com/docs/height
			*/
			h: [{ h: [
				isArbitraryValue,
				spacing,
				"auto",
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			/**
			* Min-Height
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-h": [{ "min-h": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			/**
			* Max-Height
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-h": [{ "max-h": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			/**
			* Size
			* @see https://tailwindcss.com/docs/size
			*/
			size: [{ size: [
				isArbitraryValue,
				spacing,
				"auto",
				"min",
				"max",
				"fit"
			] }],
			/**
			* Font Size
			* @see https://tailwindcss.com/docs/font-size
			*/
			"font-size": [{ text: [
				"base",
				isTshirtSize,
				isArbitraryLength
			] }],
			/**
			* Font Smoothing
			* @see https://tailwindcss.com/docs/font-smoothing
			*/
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			/**
			* Font Style
			* @see https://tailwindcss.com/docs/font-style
			*/
			"font-style": ["italic", "not-italic"],
			/**
			* Font Weight
			* @see https://tailwindcss.com/docs/font-weight
			*/
			"font-weight": [{ font: [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black",
				isArbitraryNumber
			] }],
			/**
			* Font Family
			* @see https://tailwindcss.com/docs/font-family
			*/
			"font-family": [{ font: [isAny] }],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-normal": ["normal-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-ordinal": ["ordinal"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-slashed-zero": ["slashed-zero"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			/**
			* Letter Spacing
			* @see https://tailwindcss.com/docs/letter-spacing
			*/
			tracking: [{ tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest",
				isArbitraryValue
			] }],
			/**
			* Line Clamp
			* @see https://tailwindcss.com/docs/line-clamp
			*/
			"line-clamp": [{ "line-clamp": [
				"none",
				isNumber,
				isArbitraryNumber
			] }],
			/**
			* Line Height
			* @see https://tailwindcss.com/docs/line-height
			*/
			leading: [{ leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose",
				isLength,
				isArbitraryValue
			] }],
			/**
			* List Style Image
			* @see https://tailwindcss.com/docs/list-style-image
			*/
			"list-image": [{ "list-image": ["none", isArbitraryValue] }],
			/**
			* List Style Type
			* @see https://tailwindcss.com/docs/list-style-type
			*/
			"list-style-type": [{ list: [
				"none",
				"disc",
				"decimal",
				isArbitraryValue
			] }],
			/**
			* List Style Position
			* @see https://tailwindcss.com/docs/list-style-position
			*/
			"list-style-position": [{ list: ["inside", "outside"] }],
			/**
			* Placeholder Color
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://tailwindcss.com/docs/placeholder-color
			*/
			"placeholder-color": [{ placeholder: [colors] }],
			/**
			* Placeholder Opacity
			* @see https://tailwindcss.com/docs/placeholder-opacity
			*/
			"placeholder-opacity": [{ "placeholder-opacity": [opacity] }],
			/**
			* Text Alignment
			* @see https://tailwindcss.com/docs/text-align
			*/
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			/**
			* Text Color
			* @see https://tailwindcss.com/docs/text-color
			*/
			"text-color": [{ text: [colors] }],
			/**
			* Text Opacity
			* @see https://tailwindcss.com/docs/text-opacity
			*/
			"text-opacity": [{ "text-opacity": [opacity] }],
			/**
			* Text Decoration
			* @see https://tailwindcss.com/docs/text-decoration
			*/
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			/**
			* Text Decoration Style
			* @see https://tailwindcss.com/docs/text-decoration-style
			*/
			"text-decoration-style": [{ decoration: [...getLineStyles(), "wavy"] }],
			/**
			* Text Decoration Thickness
			* @see https://tailwindcss.com/docs/text-decoration-thickness
			*/
			"text-decoration-thickness": [{ decoration: [
				"auto",
				"from-font",
				isLength,
				isArbitraryLength
			] }],
			/**
			* Text Underline Offset
			* @see https://tailwindcss.com/docs/text-underline-offset
			*/
			"underline-offset": [{ "underline-offset": [
				"auto",
				isLength,
				isArbitraryValue
			] }],
			/**
			* Text Decoration Color
			* @see https://tailwindcss.com/docs/text-decoration-color
			*/
			"text-decoration-color": [{ decoration: [colors] }],
			/**
			* Text Transform
			* @see https://tailwindcss.com/docs/text-transform
			*/
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			/**
			* Text Overflow
			* @see https://tailwindcss.com/docs/text-overflow
			*/
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			/**
			* Text Wrap
			* @see https://tailwindcss.com/docs/text-wrap
			*/
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			/**
			* Text Indent
			* @see https://tailwindcss.com/docs/text-indent
			*/
			indent: [{ indent: getSpacingWithArbitrary() }],
			/**
			* Vertical Alignment
			* @see https://tailwindcss.com/docs/vertical-align
			*/
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryValue
			] }],
			/**
			* Whitespace
			* @see https://tailwindcss.com/docs/whitespace
			*/
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			/**
			* Word Break
			* @see https://tailwindcss.com/docs/word-break
			*/
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			/**
			* Hyphens
			* @see https://tailwindcss.com/docs/hyphens
			*/
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			/**
			* Content
			* @see https://tailwindcss.com/docs/content
			*/
			content: [{ content: ["none", isArbitraryValue] }],
			/**
			* Background Attachment
			* @see https://tailwindcss.com/docs/background-attachment
			*/
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			/**
			* Background Clip
			* @see https://tailwindcss.com/docs/background-clip
			*/
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			/**
			* Background Opacity
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://tailwindcss.com/docs/background-opacity
			*/
			"bg-opacity": [{ "bg-opacity": [opacity] }],
			/**
			* Background Origin
			* @see https://tailwindcss.com/docs/background-origin
			*/
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			/**
			* Background Position
			* @see https://tailwindcss.com/docs/background-position
			*/
			"bg-position": [{ bg: [...getPositions(), isArbitraryPosition] }],
			/**
			* Background Repeat
			* @see https://tailwindcss.com/docs/background-repeat
			*/
			"bg-repeat": [{ bg: ["no-repeat", { repeat: [
				"",
				"x",
				"y",
				"round",
				"space"
			] }] }],
			/**
			* Background Size
			* @see https://tailwindcss.com/docs/background-size
			*/
			"bg-size": [{ bg: [
				"auto",
				"cover",
				"contain",
				isArbitrarySize
			] }],
			/**
			* Background Image
			* @see https://tailwindcss.com/docs/background-image
			*/
			"bg-image": [{ bg: [
				"none",
				{ "gradient-to": [
					"t",
					"tr",
					"r",
					"br",
					"b",
					"bl",
					"l",
					"tl"
				] },
				isArbitraryImage
			] }],
			/**
			* Background Color
			* @see https://tailwindcss.com/docs/background-color
			*/
			"bg-color": [{ bg: [colors] }],
			/**
			* Gradient Color Stops From Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from-pos": [{ from: [gradientColorStopPositions] }],
			/**
			* Gradient Color Stops Via Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via-pos": [{ via: [gradientColorStopPositions] }],
			/**
			* Gradient Color Stops To Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to-pos": [{ to: [gradientColorStopPositions] }],
			/**
			* Gradient Color Stops From
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from": [{ from: [gradientColorStops] }],
			/**
			* Gradient Color Stops Via
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via": [{ via: [gradientColorStops] }],
			/**
			* Gradient Color Stops To
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to": [{ to: [gradientColorStops] }],
			/**
			* Border Radius
			* @see https://tailwindcss.com/docs/border-radius
			*/
			rounded: [{ rounded: [borderRadius] }],
			/**
			* Border Radius Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-s": [{ "rounded-s": [borderRadius] }],
			/**
			* Border Radius End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-e": [{ "rounded-e": [borderRadius] }],
			/**
			* Border Radius Top
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-t": [{ "rounded-t": [borderRadius] }],
			/**
			* Border Radius Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-r": [{ "rounded-r": [borderRadius] }],
			/**
			* Border Radius Bottom
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-b": [{ "rounded-b": [borderRadius] }],
			/**
			* Border Radius Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-l": [{ "rounded-l": [borderRadius] }],
			/**
			* Border Radius Start Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ss": [{ "rounded-ss": [borderRadius] }],
			/**
			* Border Radius Start End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-se": [{ "rounded-se": [borderRadius] }],
			/**
			* Border Radius End End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ee": [{ "rounded-ee": [borderRadius] }],
			/**
			* Border Radius End Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-es": [{ "rounded-es": [borderRadius] }],
			/**
			* Border Radius Top Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tl": [{ "rounded-tl": [borderRadius] }],
			/**
			* Border Radius Top Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tr": [{ "rounded-tr": [borderRadius] }],
			/**
			* Border Radius Bottom Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-br": [{ "rounded-br": [borderRadius] }],
			/**
			* Border Radius Bottom Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-bl": [{ "rounded-bl": [borderRadius] }],
			/**
			* Border Width
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w": [{ border: [borderWidth] }],
			/**
			* Border Width X
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": [borderWidth] }],
			/**
			* Border Width Y
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": [borderWidth] }],
			/**
			* Border Width Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": [borderWidth] }],
			/**
			* Border Width End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": [borderWidth] }],
			/**
			* Border Width Top
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-t": [{ "border-t": [borderWidth] }],
			/**
			* Border Width Right
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-r": [{ "border-r": [borderWidth] }],
			/**
			* Border Width Bottom
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-b": [{ "border-b": [borderWidth] }],
			/**
			* Border Width Left
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-l": [{ "border-l": [borderWidth] }],
			/**
			* Border Opacity
			* @see https://tailwindcss.com/docs/border-opacity
			*/
			"border-opacity": [{ "border-opacity": [opacity] }],
			/**
			* Border Style
			* @see https://tailwindcss.com/docs/border-style
			*/
			"border-style": [{ border: [...getLineStyles(), "hidden"] }],
			/**
			* Divide Width X
			* @see https://tailwindcss.com/docs/divide-width
			*/
			"divide-x": [{ "divide-x": [borderWidth] }],
			/**
			* Divide Width X Reverse
			* @see https://tailwindcss.com/docs/divide-width
			*/
			"divide-x-reverse": ["divide-x-reverse"],
			/**
			* Divide Width Y
			* @see https://tailwindcss.com/docs/divide-width
			*/
			"divide-y": [{ "divide-y": [borderWidth] }],
			/**
			* Divide Width Y Reverse
			* @see https://tailwindcss.com/docs/divide-width
			*/
			"divide-y-reverse": ["divide-y-reverse"],
			/**
			* Divide Opacity
			* @see https://tailwindcss.com/docs/divide-opacity
			*/
			"divide-opacity": [{ "divide-opacity": [opacity] }],
			/**
			* Divide Style
			* @see https://tailwindcss.com/docs/divide-style
			*/
			"divide-style": [{ divide: getLineStyles() }],
			/**
			* Border Color
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color": [{ border: [borderColor] }],
			/**
			* Border Color X
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": [borderColor] }],
			/**
			* Border Color Y
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": [borderColor] }],
			/**
			* Border Color S
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": [borderColor] }],
			/**
			* Border Color E
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": [borderColor] }],
			/**
			* Border Color Top
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-t": [{ "border-t": [borderColor] }],
			/**
			* Border Color Right
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-r": [{ "border-r": [borderColor] }],
			/**
			* Border Color Bottom
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-b": [{ "border-b": [borderColor] }],
			/**
			* Border Color Left
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-l": [{ "border-l": [borderColor] }],
			/**
			* Divide Color
			* @see https://tailwindcss.com/docs/divide-color
			*/
			"divide-color": [{ divide: [borderColor] }],
			/**
			* Outline Style
			* @see https://tailwindcss.com/docs/outline-style
			*/
			"outline-style": [{ outline: ["", ...getLineStyles()] }],
			/**
			* Outline Offset
			* @see https://tailwindcss.com/docs/outline-offset
			*/
			"outline-offset": [{ "outline-offset": [isLength, isArbitraryValue] }],
			/**
			* Outline Width
			* @see https://tailwindcss.com/docs/outline-width
			*/
			"outline-w": [{ outline: [isLength, isArbitraryLength] }],
			/**
			* Outline Color
			* @see https://tailwindcss.com/docs/outline-color
			*/
			"outline-color": [{ outline: [colors] }],
			/**
			* Ring Width
			* @see https://tailwindcss.com/docs/ring-width
			*/
			"ring-w": [{ ring: getLengthWithEmptyAndArbitrary() }],
			/**
			* Ring Width Inset
			* @see https://tailwindcss.com/docs/ring-width
			*/
			"ring-w-inset": ["ring-inset"],
			/**
			* Ring Color
			* @see https://tailwindcss.com/docs/ring-color
			*/
			"ring-color": [{ ring: [colors] }],
			/**
			* Ring Opacity
			* @see https://tailwindcss.com/docs/ring-opacity
			*/
			"ring-opacity": [{ "ring-opacity": [opacity] }],
			/**
			* Ring Offset Width
			* @see https://tailwindcss.com/docs/ring-offset-width
			*/
			"ring-offset-w": [{ "ring-offset": [isLength, isArbitraryLength] }],
			/**
			* Ring Offset Color
			* @see https://tailwindcss.com/docs/ring-offset-color
			*/
			"ring-offset-color": [{ "ring-offset": [colors] }],
			/**
			* Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow
			*/
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				isTshirtSize,
				isArbitraryShadow
			] }],
			/**
			* Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow-color
			*/
			"shadow-color": [{ shadow: [isAny] }],
			/**
			* Opacity
			* @see https://tailwindcss.com/docs/opacity
			*/
			opacity: [{ opacity: [opacity] }],
			/**
			* Mix Blend Mode
			* @see https://tailwindcss.com/docs/mix-blend-mode
			*/
			"mix-blend": [{ "mix-blend": [
				...getBlendModes(),
				"plus-lighter",
				"plus-darker"
			] }],
			/**
			* Background Blend Mode
			* @see https://tailwindcss.com/docs/background-blend-mode
			*/
			"bg-blend": [{ "bg-blend": getBlendModes() }],
			/**
			* Filter
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://tailwindcss.com/docs/filter
			*/
			filter: [{ filter: ["", "none"] }],
			/**
			* Blur
			* @see https://tailwindcss.com/docs/blur
			*/
			blur: [{ blur: [blur] }],
			/**
			* Brightness
			* @see https://tailwindcss.com/docs/brightness
			*/
			brightness: [{ brightness: [brightness] }],
			/**
			* Contrast
			* @see https://tailwindcss.com/docs/contrast
			*/
			contrast: [{ contrast: [contrast] }],
			/**
			* Drop Shadow
			* @see https://tailwindcss.com/docs/drop-shadow
			*/
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				isTshirtSize,
				isArbitraryValue
			] }],
			/**
			* Grayscale
			* @see https://tailwindcss.com/docs/grayscale
			*/
			grayscale: [{ grayscale: [grayscale] }],
			/**
			* Hue Rotate
			* @see https://tailwindcss.com/docs/hue-rotate
			*/
			"hue-rotate": [{ "hue-rotate": [hueRotate] }],
			/**
			* Invert
			* @see https://tailwindcss.com/docs/invert
			*/
			invert: [{ invert: [invert] }],
			/**
			* Saturate
			* @see https://tailwindcss.com/docs/saturate
			*/
			saturate: [{ saturate: [saturate] }],
			/**
			* Sepia
			* @see https://tailwindcss.com/docs/sepia
			*/
			sepia: [{ sepia: [sepia] }],
			/**
			* Backdrop Filter
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://tailwindcss.com/docs/backdrop-filter
			*/
			"backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
			/**
			* Backdrop Blur
			* @see https://tailwindcss.com/docs/backdrop-blur
			*/
			"backdrop-blur": [{ "backdrop-blur": [blur] }],
			/**
			* Backdrop Brightness
			* @see https://tailwindcss.com/docs/backdrop-brightness
			*/
			"backdrop-brightness": [{ "backdrop-brightness": [brightness] }],
			/**
			* Backdrop Contrast
			* @see https://tailwindcss.com/docs/backdrop-contrast
			*/
			"backdrop-contrast": [{ "backdrop-contrast": [contrast] }],
			/**
			* Backdrop Grayscale
			* @see https://tailwindcss.com/docs/backdrop-grayscale
			*/
			"backdrop-grayscale": [{ "backdrop-grayscale": [grayscale] }],
			/**
			* Backdrop Hue Rotate
			* @see https://tailwindcss.com/docs/backdrop-hue-rotate
			*/
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [hueRotate] }],
			/**
			* Backdrop Invert
			* @see https://tailwindcss.com/docs/backdrop-invert
			*/
			"backdrop-invert": [{ "backdrop-invert": [invert] }],
			/**
			* Backdrop Opacity
			* @see https://tailwindcss.com/docs/backdrop-opacity
			*/
			"backdrop-opacity": [{ "backdrop-opacity": [opacity] }],
			/**
			* Backdrop Saturate
			* @see https://tailwindcss.com/docs/backdrop-saturate
			*/
			"backdrop-saturate": [{ "backdrop-saturate": [saturate] }],
			/**
			* Backdrop Sepia
			* @see https://tailwindcss.com/docs/backdrop-sepia
			*/
			"backdrop-sepia": [{ "backdrop-sepia": [sepia] }],
			/**
			* Border Collapse
			* @see https://tailwindcss.com/docs/border-collapse
			*/
			"border-collapse": [{ border: ["collapse", "separate"] }],
			/**
			* Border Spacing
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing": [{ "border-spacing": [borderSpacing] }],
			/**
			* Border Spacing X
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-x": [{ "border-spacing-x": [borderSpacing] }],
			/**
			* Border Spacing Y
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-y": [{ "border-spacing-y": [borderSpacing] }],
			/**
			* Table Layout
			* @see https://tailwindcss.com/docs/table-layout
			*/
			"table-layout": [{ table: ["auto", "fixed"] }],
			/**
			* Caption Side
			* @see https://tailwindcss.com/docs/caption-side
			*/
			caption: [{ caption: ["top", "bottom"] }],
			/**
			* Tranisition Property
			* @see https://tailwindcss.com/docs/transition-property
			*/
			transition: [{ transition: [
				"none",
				"all",
				"",
				"colors",
				"opacity",
				"shadow",
				"transform",
				isArbitraryValue
			] }],
			/**
			* Transition Duration
			* @see https://tailwindcss.com/docs/transition-duration
			*/
			duration: [{ duration: getNumberAndArbitrary() }],
			/**
			* Transition Timing Function
			* @see https://tailwindcss.com/docs/transition-timing-function
			*/
			ease: [{ ease: [
				"linear",
				"in",
				"out",
				"in-out",
				isArbitraryValue
			] }],
			/**
			* Transition Delay
			* @see https://tailwindcss.com/docs/transition-delay
			*/
			delay: [{ delay: getNumberAndArbitrary() }],
			/**
			* Animation
			* @see https://tailwindcss.com/docs/animation
			*/
			animate: [{ animate: [
				"none",
				"spin",
				"ping",
				"pulse",
				"bounce",
				isArbitraryValue
			] }],
			/**
			* Transform
			* @see https://tailwindcss.com/docs/transform
			*/
			transform: [{ transform: [
				"",
				"gpu",
				"none"
			] }],
			/**
			* Scale
			* @see https://tailwindcss.com/docs/scale
			*/
			scale: [{ scale: [scale] }],
			/**
			* Scale X
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-x": [{ "scale-x": [scale] }],
			/**
			* Scale Y
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-y": [{ "scale-y": [scale] }],
			/**
			* Rotate
			* @see https://tailwindcss.com/docs/rotate
			*/
			rotate: [{ rotate: [isInteger, isArbitraryValue] }],
			/**
			* Translate X
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-x": [{ "translate-x": [translate] }],
			/**
			* Translate Y
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-y": [{ "translate-y": [translate] }],
			/**
			* Skew X
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-x": [{ "skew-x": [skew] }],
			/**
			* Skew Y
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-y": [{ "skew-y": [skew] }],
			/**
			* Transform Origin
			* @see https://tailwindcss.com/docs/transform-origin
			*/
			"transform-origin": [{ origin: [
				"center",
				"top",
				"top-right",
				"right",
				"bottom-right",
				"bottom",
				"bottom-left",
				"left",
				"top-left",
				isArbitraryValue
			] }],
			/**
			* Accent Color
			* @see https://tailwindcss.com/docs/accent-color
			*/
			accent: [{ accent: ["auto", colors] }],
			/**
			* Appearance
			* @see https://tailwindcss.com/docs/appearance
			*/
			appearance: [{ appearance: ["none", "auto"] }],
			/**
			* Cursor
			* @see https://tailwindcss.com/docs/cursor
			*/
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryValue
			] }],
			/**
			* Caret Color
			* @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
			*/
			"caret-color": [{ caret: [colors] }],
			/**
			* Pointer Events
			* @see https://tailwindcss.com/docs/pointer-events
			*/
			"pointer-events": [{ "pointer-events": ["none", "auto"] }],
			/**
			* Resize
			* @see https://tailwindcss.com/docs/resize
			*/
			resize: [{ resize: [
				"none",
				"y",
				"x",
				""
			] }],
			/**
			* Scroll Behavior
			* @see https://tailwindcss.com/docs/scroll-behavior
			*/
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			/**
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin X
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin Y
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin Top
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mt": [{ "scroll-mt": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin Right
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mr": [{ "scroll-mr": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin Bottom
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mb": [{ "scroll-mb": getSpacingWithArbitrary() }],
			/**
			* Scroll Margin Left
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ml": [{ "scroll-ml": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-p": [{ "scroll-p": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding X
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding Y
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding Top
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pt": [{ "scroll-pt": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding Right
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pr": [{ "scroll-pr": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding Bottom
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pb": [{ "scroll-pb": getSpacingWithArbitrary() }],
			/**
			* Scroll Padding Left
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pl": [{ "scroll-pl": getSpacingWithArbitrary() }],
			/**
			* Scroll Snap Align
			* @see https://tailwindcss.com/docs/scroll-snap-align
			*/
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			/**
			* Scroll Snap Stop
			* @see https://tailwindcss.com/docs/scroll-snap-stop
			*/
			"snap-stop": [{ snap: ["normal", "always"] }],
			/**
			* Scroll Snap Type
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			/**
			* Scroll Snap Type Strictness
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			/**
			* Touch Action
			* @see https://tailwindcss.com/docs/touch-action
			*/
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			/**
			* Touch Action X
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			/**
			* Touch Action Y
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			/**
			* Touch Action Pinch Zoom
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-pz": ["touch-pinch-zoom"],
			/**
			* User Select
			* @see https://tailwindcss.com/docs/user-select
			*/
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			/**
			* Will Change
			* @see https://tailwindcss.com/docs/will-change
			*/
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryValue
			] }],
			/**
			* Fill
			* @see https://tailwindcss.com/docs/fill
			*/
			fill: [{ fill: [colors, "none"] }],
			/**
			* Stroke Width
			* @see https://tailwindcss.com/docs/stroke-width
			*/
			"stroke-w": [{ stroke: [
				isLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			/**
			* Stroke
			* @see https://tailwindcss.com/docs/stroke
			*/
			stroke: [{ stroke: [colors, "none"] }],
			/**
			* Screen Readers
			* @see https://tailwindcss.com/docs/screen-readers
			*/
			sr: ["sr-only", "not-sr-only"],
			/**
			* Forced Color Adjust
			* @see https://tailwindcss.com/docs/forced-color-adjust
			*/
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-s",
				"border-w-e",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-s",
				"border-color-e",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] }
	};
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
//#endregion
//#region src/ui/cn.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/ui/icon.tsx
var _tmpl$$3 = ["<path", " d=\"M19 12H5m7-7-7 7 7 7\"></path>"], _tmpl$2$2 = ["<path", " d=\"M5 12h14m-7-7 7 7-7 7\"></path>"], _tmpl$3$2 = ["<path", " d=\"m6 9 6 6 6-6\"></path>"], _tmpl$4$2 = ["<path", " d=\"m9 6 6 6-6 6\"></path>"], _tmpl$5$2 = ["<path", " d=\"M20 6 9 17l-5-5\"></path>"], _tmpl$6$2 = ["<path", " d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path>"], _tmpl$7$2 = ["<path", " d=\"m22 4-10 10.01-3-3\"></path>"], _tmpl$8$2 = ["<path", " d=\"M18 6 6 18M6 6l12 12\"></path>"], _tmpl$9$2 = ["<circle", " cx=\"12\" cy=\"12\" r=\"10\"></circle>"], _tmpl$0$2 = ["<path", " d=\"M12 16v-4M12 8h.01\"></path>"], _tmpl$1$2 = ["<path", " d=\"M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z\"></path>"], _tmpl$10$2 = ["<path", " d=\"M12 9v4M12 17h.01\"></path>"], _tmpl$11$1 = ["<path", " d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01\"></path>"], _tmpl$12$1 = ["<path", " d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"></path>"], _tmpl$13$1 = ["<path", " d=\"M19 10v2a7 7 0 0 1-14 0v-2M12 19v3\"></path>"], _tmpl$14$1 = ["<path", " d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z\"></path>"], _tmpl$15$1 = ["<circle", " cx=\"12\" cy=\"13\" r=\"3\"></circle>"], _tmpl$16 = ["<path", " d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"></path>"], _tmpl$17 = ["<circle", " cx=\"12\" cy=\"10\" r=\"3\"></circle>"], _tmpl$18 = ["<path", " d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z\"></path>"], _tmpl$19 = ["<path", " d=\"M14 2v6h6M16 13H8M16 17H8M10 9H8\"></path>"], _tmpl$20 = ["<path", " d=\"M2 12c3-5 8-7 13-7 3 0 6 1.5 7 3-1 1.5-4 3-7 3-5 0-10-2-13-7\" transform=\"translate(0 2)\"></path>"], _tmpl$21 = ["<path", " d=\"M16 12h.01\"></path>"], _tmpl$22 = ["<path", " d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"></path>"], _tmpl$23 = ["<circle", " cx=\"12\" cy=\"7\" r=\"4\"></circle>"], _tmpl$24 = ["<path", " d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path>"], _tmpl$25 = ["<circle", " cx=\"9\" cy=\"7\" r=\"4\"></circle>"], _tmpl$26 = ["<path", " d=\"M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75\"></path>"], _tmpl$27 = ["<circle", " cx=\"12\" cy=\"5\" r=\"3\"></circle>"], _tmpl$28 = ["<path", " d=\"M12 22V8M5 12H2a10 10 0 0 0 20 0h-3\"></path>"], _tmpl$29 = ["<path", " d=\"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1\"></path>"], _tmpl$30 = ["<path", " d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z\"></path>"], _tmpl$31 = ["<path", " d=\"m9 12 2 2 4-4\"></path>"], _tmpl$32 = ["<path", " d=\"M12 6v6l4 2\"></path>"], _tmpl$33 = ["<path", " d=\"M18.8 10A6 6 0 0 0 8 8M2 2l20 20\"></path>"], _tmpl$34 = ["<path", " d=\"M5.8 6.8A6 6 0 0 0 7 18h11a4 4 0 0 0 1.6-.3\"></path>"], _tmpl$35 = ["<path", " d=\"M12 5v14M5 12h14\"></path>"], _tmpl$36 = ["<circle", " cx=\"11\" cy=\"11\" r=\"8\"></circle>"], _tmpl$37 = ["<path", " d=\"m21 21-4.3-4.3\"></path>"], _tmpl$38 = ["<path", " d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"></path>"], _tmpl$39 = ["<path", " d=\"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z\"></path>"], _tmpl$40 = ["<path", " d=\"M22 2 11 13M22 2l-7 20-4-9-9-4Z\"></path>"], _tmpl$41 = [
	"<svg",
	" class=\"",
	"\"",
	"",
	" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"",
	"",
	"",
	">",
	"</svg>"
];
var PATHS = {
	"arrow-left": () => {
		var _v$;
		return _v$ = ssrHydrationKey(), ssr(_tmpl$$3, _v$);
	},
	"arrow-right": () => {
		var _v$2;
		return _v$2 = ssrHydrationKey(), ssr(_tmpl$2$2, _v$2);
	},
	"chevron-down": () => {
		var _v$3;
		return _v$3 = ssrHydrationKey(), ssr(_tmpl$3$2, _v$3);
	},
	"chevron-right": () => {
		var _v$4;
		return _v$4 = ssrHydrationKey(), ssr(_tmpl$4$2, _v$4);
	},
	check: () => {
		var _v$5;
		return _v$5 = ssrHydrationKey(), ssr(_tmpl$5$2, _v$5);
	},
	"check-circle": () => {
		var _v$6, _v$7;
		return [(_v$6 = ssrHydrationKey(), ssr(_tmpl$6$2, _v$6)), (_v$7 = ssrHydrationKey(), ssr(_tmpl$7$2, _v$7))];
	},
	x: () => {
		var _v$8;
		return _v$8 = ssrHydrationKey(), ssr(_tmpl$8$2, _v$8);
	},
	info: () => {
		var _v$9, _v$0;
		return [(_v$9 = ssrHydrationKey(), ssr(_tmpl$9$2, _v$9)), (_v$0 = ssrHydrationKey(), ssr(_tmpl$0$2, _v$0))];
	},
	alert: () => {
		var _v$1, _v$10;
		return [(_v$1 = ssrHydrationKey(), ssr(_tmpl$1$2, _v$1)), (_v$10 = ssrHydrationKey(), ssr(_tmpl$10$2, _v$10))];
	},
	help: () => {
		var _v$11, _v$12;
		return [(_v$11 = ssrHydrationKey(), ssr(_tmpl$9$2, _v$11)), (_v$12 = ssrHydrationKey(), ssr(_tmpl$11$1, _v$12))];
	},
	mic: () => {
		var _v$13, _v$14;
		return [(_v$13 = ssrHydrationKey(), ssr(_tmpl$12$1, _v$13)), (_v$14 = ssrHydrationKey(), ssr(_tmpl$13$1, _v$14))];
	},
	camera: () => {
		var _v$15, _v$16;
		return [(_v$15 = ssrHydrationKey(), ssr(_tmpl$14$1, _v$15)), (_v$16 = ssrHydrationKey(), ssr(_tmpl$15$1, _v$16))];
	},
	location: () => {
		var _v$17, _v$18;
		return [(_v$17 = ssrHydrationKey(), ssr(_tmpl$16, _v$17)), (_v$18 = ssrHydrationKey(), ssr(_tmpl$17, _v$18))];
	},
	document: () => {
		var _v$19, _v$20;
		return [(_v$19 = ssrHydrationKey(), ssr(_tmpl$18, _v$19)), (_v$20 = ssrHydrationKey(), ssr(_tmpl$19, _v$20))];
	},
	fish: () => {
		var _v$21, _v$22;
		return [(_v$21 = ssrHydrationKey(), ssr(_tmpl$20, _v$21)), (_v$22 = ssrHydrationKey(), ssr(_tmpl$21, _v$22))];
	},
	user: () => {
		var _v$23, _v$24;
		return [(_v$23 = ssrHydrationKey(), ssr(_tmpl$22, _v$23)), (_v$24 = ssrHydrationKey(), ssr(_tmpl$23, _v$24))];
	},
	users: () => {
		var _v$25, _v$26, _v$27;
		return [
			(_v$25 = ssrHydrationKey(), ssr(_tmpl$24, _v$25)),
			(_v$26 = ssrHydrationKey(), ssr(_tmpl$25, _v$26)),
			(_v$27 = ssrHydrationKey(), ssr(_tmpl$26, _v$27))
		];
	},
	anchor: () => {
		var _v$28, _v$29;
		return [(_v$28 = ssrHydrationKey(), ssr(_tmpl$27, _v$28)), (_v$29 = ssrHydrationKey(), ssr(_tmpl$28, _v$29))];
	},
	waves: () => {
		var _v$30;
		return _v$30 = ssrHydrationKey(), ssr(_tmpl$29, _v$30);
	},
	shield: () => {
		var _v$31, _v$32;
		return [(_v$31 = ssrHydrationKey(), ssr(_tmpl$30, _v$31)), (_v$32 = ssrHydrationKey(), ssr(_tmpl$31, _v$32))];
	},
	clock: () => {
		var _v$33, _v$34;
		return [(_v$33 = ssrHydrationKey(), ssr(_tmpl$9$2, _v$33)), (_v$34 = ssrHydrationKey(), ssr(_tmpl$32, _v$34))];
	},
	"cloud-off": () => {
		var _v$35, _v$36;
		return [(_v$35 = ssrHydrationKey(), ssr(_tmpl$33, _v$35)), (_v$36 = ssrHydrationKey(), ssr(_tmpl$34, _v$36))];
	},
	plus: () => {
		var _v$37;
		return _v$37 = ssrHydrationKey(), ssr(_tmpl$35, _v$37);
	},
	search: () => {
		var _v$38, _v$39;
		return [(_v$38 = ssrHydrationKey(), ssr(_tmpl$36, _v$38)), (_v$39 = ssrHydrationKey(), ssr(_tmpl$37, _v$39))];
	},
	edit: () => {
		var _v$40, _v$41;
		return [(_v$40 = ssrHydrationKey(), ssr(_tmpl$38, _v$40)), (_v$41 = ssrHydrationKey(), ssr(_tmpl$39, _v$41))];
	},
	send: () => {
		var _v$42;
		return _v$42 = ssrHydrationKey(), ssr(_tmpl$40, _v$42);
	}
};
function Icon(props) {
	var _v$43 = ssrHydrationKey(), _g$ = ssrGroup(() => [
		ssrClassName(cn("tide-icon", props.class)),
		ssrAttribute("width", escape(props.size ?? 24, true)),
		ssrAttribute("height", escape(props.size ?? 24, true)),
		ssrAttribute("aria-hidden", props.label ? escape(void 0, true) : "true"),
		ssrAttribute("role", props.label ? "img" : escape(void 0, true)),
		ssrAttribute("aria-label", escape(props.label, true))
	], 6), _v$50 = () => escape(PATHS[props.name]());
	return ssr(_tmpl$41, _v$43, _g$, _g$, _g$, _g$, _g$, _g$, _v$50);
}
//#endregion
//#region src/ui/button.tsx
var _tmpl$$2 = [
	"<svg",
	" class=\"",
	"\"",
	"",
	" viewBox=\"0 0 24 24\" fill=\"none\"",
	"",
	"",
	"><circle cx=\"12\" cy=\"12\" r=\"9\" stroke=\"currentColor\" stroke-width=\"2.5\" opacity=\"0.25\"></circle><path d=\"M21 12a9 9 0 0 0-9-9\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"></path></svg>"
];
var VARIANTS = {
	primary: "bg-[var(--c-sea)] text-[var(--c-on-sea)] shadow-[var(--shadow-1)] hover:bg-[var(--c-sea-deep)]",
	secondary: "bg-[var(--c-surface)] text-[var(--c-ink)] shadow-[inset_0_0_0_1.5px_var(--c-line-strong)] hover:bg-[var(--c-surface-2)]",
	ghost: "bg-transparent text-[var(--c-sea)] hover:bg-[var(--c-sea-soft)]",
	subtle: "bg-[var(--c-bg-2)] text-[var(--c-ink)] hover:bg-[var(--c-surface-2)]",
	danger: "bg-[var(--c-ember)] text-white hover:brightness-110"
};
var SIZES = {
	sm: "min-h-[40px] px-3.5 text-[0.8125rem] gap-1.5 rounded-[var(--r-sm)]",
	md: "min-h-[var(--tap)] px-4 text-[0.9375rem] gap-2 rounded-[var(--r-md)]",
	lg: "min-h-[54px] px-5 text-base gap-2.5 rounded-[var(--r-md)]"
};
function Button(props) {
	const rest = omit(props, "variant", "size", "block", "loading", "iconLeft", "iconRight", "class", "children", "type", "disabled");
	return ssrElement("button", mergeProps({
		get type() {
			return props.type ?? "button";
		},
		get disabled() {
			return props.disabled || props.loading;
		},
		get ["aria-busy"]() {
			return props.loading ? "true" : void 0;
		},
		get ["class"]() {
			return cn("tide-press inline-flex select-none items-center justify-center font-medium leading-none", "disabled:pointer-events-none disabled:opacity-55", VARIANTS[props.variant ?? "primary"], SIZES[props.size ?? "md"], props.block && "w-full", props.class);
		}
	}, rest), () => [
		"<!--$-->",
		(() => {
			var _c$ = memo(() => !!props.loading);
			return () => _c$() ? escape(Spinner({ get size() {
				return props.size === "lg" ? 22 : 18;
			} })) : memo(() => !!props.iconLeft)() ? escape(Icon({
				get name() {
					return props.iconLeft;
				},
				get size() {
					return props.size === "sm" ? 17 : 19;
				}
			})) : escape(null);
		})(),
		"<!--/-->",
		"<!--$-->",
		() => escape(props.children),
		"<!--/-->",
		"<!--$-->",
		(() => {
			var _c$2 = memo(() => !!(!props.loading && props.iconRight));
			return () => _c$2() ? escape(Icon({
				get name() {
					return props.iconRight;
				},
				get size() {
					return props.size === "sm" ? 17 : 19;
				}
			})) : escape(null);
		})(),
		"<!--/-->"
	], true);
}
function IconButton(props) {
	const rest = omit(props, "icon", "label", "variant", "size", "class", "type");
	const dim = props.size === "sm" ? "h-10 w-10" : props.size === "lg" ? "h-14 w-14" : "h-12 w-12";
	return ssrElement("button", mergeProps({
		get type() {
			return props.type ?? "button";
		},
		get ["aria-label"]() {
			return props.label;
		},
		get title() {
			return props.label;
		},
		get ["class"]() {
			return cn("tide-press inline-grid place-items-center rounded-[var(--r-md)]", "disabled:pointer-events-none disabled:opacity-55", VARIANTS[props.variant ?? "ghost"], dim, props.class);
		}
	}, rest), () => escape(Icon({
		get name() {
			return props.icon;
		},
		get size() {
			return props.size === "lg" ? 24 : 21;
		}
	})), true);
}
function Spinner(props) {
	const s = props.size ?? 20;
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrClassName(cn("tide-spinner animate-spin", props.class)), _g$ = ssrGroup(() => [
		ssrAttribute("role", props.label ? "status" : escape(void 0, true)),
		ssrAttribute("aria-label", escape(props.label, true)),
		ssrAttribute("aria-hidden", props.label ? escape(void 0, true) : "true")
	], 3);
	return ssr(_tmpl$$2, _v$, _v$2, ssrAttribute("width", escape(s, true)), ssrAttribute("height", escape(s, true)), _g$, _g$, _g$);
}
//#endregion
//#region src/ui/primitives.tsx
var _tmpl$$1 = [
	"<span",
	" class=\"",
	"\">",
	"</span>"
], _tmpl$2$1 = [
	"<span",
	" class=\"",
	"\" style=\"",
	"\">",
	"</span>"
], _tmpl$3$1 = [
	"<span",
	" class=\"",
	"\" style=\"",
	"\" aria-hidden=\"true\"></span>"
], _tmpl$4$1 = [
	"<span",
	" class=\"",
	"\" style=\"",
	"\" aria-hidden=\"true\">",
	"</span>"
], _tmpl$5$1 = [
	"<span",
	" class=\"grid place-items-center rounded-full font-data font-semibold text-[var(--c-muted)]\" style=\"",
	"\">+<!--$-->",
	"<!--/--></span>"
], _tmpl$6$1 = [
	"<div",
	" class=\"",
	"\" style=\"",
	"\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
], _tmpl$7$1 = [
	"<span",
	" style=\"",
	"\">",
	"</span>"
], _tmpl$8$1 = [
	"<hr",
	" class=\"",
	"\">"
], _tmpl$9$1 = [
	"<div",
	" class=\"",
	"\" role=\"progressbar\"",
	" aria-valuemin=\"0\"",
	"",
	"><div class=\"tide-progress-fill\" style=\"",
	"\"></div></div>"
], _tmpl$1$1 = [
	"<div",
	" class=\"",
	"\"><div class=\"font-data text-3xl font-semibold leading-none tabular-nums text-[var(--c-ink)]\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div><!--$-->",
	"<!--/--></div>"
], _tmpl$10$1 = [
	"<span",
	" class=\"ml-1 text-base font-medium text-[var(--c-faint)]\">",
	"</span>"
];
function Eyebrow(props) {
	var _v$ = ssrHydrationKey(), _v$2 = () => ssrClassName(cn("font-data text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--c-faint)]", props.class)), _v$3 = () => escape(props.children);
	return ssr(_tmpl$$1, _v$, _v$2, _v$3);
}
var TONE_VAR = {
	neutral: "var(--c-bg-2)",
	sea: "var(--c-sea)",
	coral: "var(--c-coral)",
	reef: "var(--c-reef)",
	sun: "var(--c-sun)",
	ember: "var(--c-ember)"
};
function Chip(props) {
	const tone = () => props.tone ?? "neutral";
	const style = () => props.solid ? { "--chip-bg": TONE_VAR[tone()] } : {
		"--chip-bg": tone() === "neutral" ? "var(--c-bg-2)" : `color-mix(in oklab, ${TONE_VAR[tone()]} 15%, transparent)`,
		color: tone() === "neutral" ? "var(--c-muted)" : TONE_VAR[tone()]
	};
	var _v$4 = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("tide-chip", props.solid && "tide-chip-solid", props.class)), ssrStyle(style())], 2), _v$7 = () => escape(props.children);
	return ssr(_tmpl$2$1, _v$4, _g$, _g$, _v$7);
}
function StatusDot(props) {
	const s = props.size ?? 8;
	var _v$8 = ssrHydrationKey(), _g$2 = ssrGroup(() => [ssrClassName(cn("inline-block flex-none rounded-full", props.live && "animate-pulse", props.class)), ssrStyleProperty("width:", `${escape(s, true)}px`) + ssrStyleProperty(";height:", `${escape(s, true)}px`) + ssrStyleProperty(";background:", escape(props.color ?? "var(--c-faint)", true)) + ssrStyleProperty(";box-shadow:", props.live ? `0 0 0 3px color-mix(in oklab, ${escape(props.color ?? "var(--c-live)", true)} 22%, transparent)` : escape(void 0, true))], 2);
	return ssr(_tmpl$3$1, _v$8, _g$2, _g$2);
}
function Avatar(props) {
	const s = () => props.size ?? 40;
	const initials = () => props.name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
	const color = () => props.color ?? "var(--c-sea)";
	var _v$1 = ssrHydrationKey(), _g$3 = ssrGroup(() => [ssrClassName(cn("grid flex-none place-items-center rounded-full font-data font-semibold uppercase", props.class)), ssrStyleProperty("width:", `${escape(s(), true)}px`) + ssrStyleProperty(";height:", `${escape(s(), true)}px`) + ssrStyleProperty(";font-size:", `${escape(Math.round(s() * .34), true)}px`) + ssrStyleProperty(";color:", escape(color(), true)) + ssrStyleProperty(";background:", `color-mix(in oklab, ${escape(color(), true)} 18%, var(--c-surface))`) + ssrStyleProperty(";box-shadow:", `inset 0 0 0 1.5px color-mix(in oklab, ${escape(color(), true)} 42%, transparent)${props.ring ? `, 0 0 0 2px ${escape(props.ring, true)}` : ""}`)], 2), _v$12 = () => escape(initials());
	return ssr(_tmpl$4$1, _v$1, _g$3, _g$3, _v$12);
}
function AvatarStack(props) {
	var _v$17, _v$18, _v$19;
	const max = () => props.max ?? 5;
	const shown = () => props.people.slice(0, max());
	const overflow = () => Math.max(0, props.people.length - max());
	const s = () => props.size ?? 34;
	var _v$13 = ssrHydrationKey(), _g$4 = ssrGroup(() => [ssrClassName(cn("flex items-center", props.class)), ssrStyleProperty("padding-left:", `${escape(s(), true) * .28}px`)], 2);
	return ssr(_tmpl$6$1, _v$13, _g$4, _g$4, escape(For({
		get each() {
			return shown();
		},
		children: (p) => {
			var _v$21, _v$22, _v$23;
			return _v$21 = ssrHydrationKey(), _v$22 = () => ssrStyleProperty("margin-left:", `${-s() * .28}px`), _v$23 = escape(Avatar({
				get name() {
					return p.name;
				},
				get color() {
					return p.color;
				},
				get size() {
					return s();
				},
				get ring() {
					return props.ring ?? "var(--c-surface)";
				}
			})), ssr(_tmpl$7$1, _v$21, _v$22, _v$23);
		}
	})), escape(Show({
		get when() {
			return overflow() > 0;
		},
		get children() {
			return _v$17 = ssrHydrationKey(), _v$18 = () => ssrStyleProperty("margin-left:", `${-s() * .28}px`) + ssrStyleProperty(";width:", `${escape(s(), true)}px`) + ssrStyleProperty(";height:", `${escape(s(), true)}px`) + ssrStyleProperty(";font-size:", `${escape(Math.round(s() * .3), true)}px`) + ssrStyleProperty(";background:", "var(--c-bg-2)") + ssrStyleProperty(";box-shadow:", `0 0 0 2px ${escape(props.ring ?? "var(--c-surface)", true)}`), _v$19 = () => escape(overflow()), ssr(_tmpl$5$1, _v$17, _v$18, _v$19);
		}
	})));
}
function Divider(props) {
	var _v$24 = ssrHydrationKey(), _v$25 = () => ssrClassName(cn("border-0 border-t border-[var(--c-line)]", props.class));
	return ssr(_tmpl$8$1, _v$24, _v$25);
}
function ProgressBar(props) {
	const pct = () => {
		const max = props.max ?? 100;
		if (max <= 0) return 0;
		return Math.max(0, Math.min(100, props.value / max * 100));
	};
	var _v$28 = ssrHydrationKey(), _g$5 = ssrGroup(() => [
		ssrClassName(cn("tide-progress", props.class)),
		ssrAttribute("aria-valuenow", escape(Math.round(props.value), true)),
		ssrAttribute("aria-valuemax", escape(props.max ?? 100, true)),
		ssrAttribute("aria-label", escape(props.label, true)),
		ssrStyleProperty("--tide-w:", `${escape(pct(), true)}%`) + ssrStyleProperty(";background:", escape(props.tone, true))
	], 5);
	return ssr(_tmpl$9$1, _v$28, _g$5, _g$5, _g$5, _g$5, _g$5);
}
function Counter(props) {
	const [shown, setShown] = createSignal(props.value);
	createEffect(() => props.value, (target, prev) => {
		if (prev === void 0 || prev === target) {
			setShown(target);
			return;
		}
		const from = prev;
		const delta = target - from;
		const start = performance.now();
		const dur = 550;
		let raf = 0;
		const tick = (now) => {
			const t = Math.min(1, (now - start) / dur);
			const eased = 1 - (1 - t) ** 3;
			setShown(Math.round(from + delta * eased));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
	var _v$37 = ssrHydrationKey(), _v$38 = () => ssrClassName(cn("font-data tabular-nums", props.class)), _v$39 = () => escape(shown().toLocaleString());
	return ssr(_tmpl$$1, _v$37, _v$38, _v$39);
}
function Stat(props) {
	var _v$40 = ssrHydrationKey(), _v$41 = () => ssrClassName(cn("flex flex-col gap-1", props.class));
	return ssr(_tmpl$1$1, _v$40, _v$41, (() => {
		var _c$ = memo(() => !!props.animate);
		return () => _c$() ? escape(Counter({ get value() {
			return props.value;
		} })) : escape(props.value.toLocaleString());
	})(), (() => {
		var _c$2 = memo(() => !!props.unit);
		return () => {
			var _v$45, _v$46;
			return _c$2() ? (_v$45 = ssrHydrationKey(), _v$46 = () => escape(props.unit), ssr(_tmpl$10$1, _v$45, _v$46)) : escape(null);
		};
	})(), escape(Eyebrow({ get children() {
		return props.label;
	} })));
}
//#endregion
//#region src/ui/surface.tsx
var _tmpl$ = [
	"<h3",
	" class=\"font-display text-lg font-medium leading-tight text-[var(--c-ink)]\">",
	"</h3>"
], _tmpl$2 = [
	"<div",
	" class=\"flex-none\">",
	"</div>"
], _tmpl$3 = [
	"<header",
	" class=\"",
	"\"><div class=\"flex flex-col gap-1\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div><!--$-->",
	"<!--/--></header>"
], _tmpl$4 = [
	"<section",
	" class=\"",
	"\" style=\"",
	"\"><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></section>"
], _tmpl$5 = [
	"<span",
	" class=\"font-semibold text-[var(--c-ink)]\">",
	"</span>"
], _tmpl$6 = [
	"<div",
	" class=\"",
	"\" style=\"",
	"\"",
	"><span class=\"flex-none pt-0.5\" style=\"",
	"\">",
	"</span><div class=\"flex flex-col gap-1 text-[0.9375rem] leading-relaxed\"><!--$-->",
	"<!--/--><div class=\"text-[var(--c-muted)]\">",
	"</div></div></div>"
], _tmpl$7 = [
	"<span",
	" class=\"flex-none text-[var(--c-sea)]\">",
	"</span>"
], _tmpl$8 = [
	"<span",
	" class=\"truncate text-[0.8125rem] text-[var(--c-muted)]\">",
	"</span>"
], _tmpl$9 = [
	"<span",
	" class=\"flex min-w-0 flex-1 flex-col gap-0.5 text-left\"><span class=\"truncate text-[0.9375rem] font-medium text-[var(--c-ink)]\">",
	"</span><!--$-->",
	"<!--/--></span>"
], _tmpl$0 = [
	"<span",
	" class=\"flex-none text-right text-[0.875rem] text-[var(--c-muted)]\">",
	"</span>"
], _tmpl$1 = [
	"<span",
	" class=\"flex-none text-[var(--c-faint)]\">",
	"</span>"
], _tmpl$10 = [
	"<button",
	" type=\"button\" class=\"",
	"\">",
	"</button>"
], _tmpl$11 = [
	"<div",
	" class=\"",
	"\">",
	"</div>"
], _tmpl$12 = [
	"<span",
	" class=\"grid h-14 w-14 place-items-center rounded-full bg-[var(--c-sea-soft)] text-[var(--c-sea)]\">",
	"</span>"
], _tmpl$13 = [
	"<p",
	" class=\"max-w-xs text-[0.9375rem] text-[var(--c-muted)]\">",
	"</p>"
], _tmpl$14 = [
	"<div",
	" class=\"mt-1\">",
	"</div>"
], _tmpl$15 = [
	"<div",
	" class=\"",
	"\"><!--$-->",
	"<!--/--><h3 class=\"font-display text-lg font-medium text-[var(--c-ink)]\">",
	"</h3><!--$-->",
	"<!--/--><!--$-->",
	"<!--/--></div>"
];
function Card(props) {
	var _v$7, _v$8, _v$0, _v$1, _v$4, _v$5, _v$6, _v$9, _v$10;
	const hasHeader = () => props.title !== void 0 || props.eyebrow !== void 0 || props.action !== void 0;
	var _v$ = ssrHydrationKey(), _g$ = ssrGroup(() => [ssrClassName(cn("rounded-[var(--r-lg)] bg-[var(--c-surface)] shadow-[var(--shadow-1)]", "shadow-[inset_0_0_0_1px_var(--c-line)]", !props.flush && "p-4 sm:p-5", props.class)), ssrStyle(props.accent ? { "border-left": `3px solid ${props.accent}` } : void 0)], 2), _v$11 = escape(Show({
		get when() {
			return hasHeader();
		},
		get children() {
			return _v$4 = ssrHydrationKey(), _v$5 = () => ssrClassName(cn("flex items-start justify-between gap-3", !props.flush ? "mb-4" : "p-4 pb-3")), _v$6 = escape(Show({
				get when() {
					return props.eyebrow;
				},
				get children() {
					return Eyebrow({ get children() {
						return props.eyebrow;
					} });
				}
			})), _v$9 = escape(Show({
				get when() {
					return props.title;
				},
				get children() {
					return _v$7 = ssrHydrationKey(), _v$8 = () => escape(props.title), ssr(_tmpl$, _v$7, _v$8);
				}
			})), _v$10 = escape(Show({
				get when() {
					return props.action;
				},
				get children() {
					return _v$0 = ssrHydrationKey(), _v$1 = () => escape(props.action), ssr(_tmpl$2, _v$0, _v$1);
				}
			})), ssr(_tmpl$3, _v$4, _v$5, _v$6, _v$9, _v$10);
		}
	})), _v$12 = () => escape(props.children);
	return ssr(_tmpl$4, _v$, _g$, _g$, _v$11, _v$12);
}
var CALLOUT = {
	info: {
		color: "var(--c-sea)",
		icon: "info"
	},
	success: {
		color: "var(--c-reef)",
		icon: "check-circle"
	},
	warning: {
		color: "var(--c-sun)",
		icon: "alert"
	},
	danger: {
		color: "var(--c-ember)",
		icon: "alert"
	},
	neutral: {
		color: "var(--c-muted)",
		icon: "info"
	}
};
function Callout(props) {
	var _v$19, _v$20;
	const meta = () => CALLOUT[props.tone ?? "info"];
	var _v$13 = ssrHydrationKey(), _g$2 = ssrGroup(() => [
		ssrClassName(cn("flex gap-3 rounded-[var(--r-md)] p-3.5", props.class)),
		ssrStyleProperty("background:", `color-mix(in oklab, ${escape(meta().color, true)} 9%, var(--c-surface))`) + ssrStyleProperty(";box-shadow:", `inset 0 0 0 1px color-mix(in oklab, ${escape(meta().color, true)} 28%, transparent)`),
		ssrAttribute("role", props.tone === "danger" || props.tone === "warning" ? "alert" : escape(void 0, true)),
		ssrStyleProperty("color:", escape(meta().color, true))
	], 4), _v$18 = escape(Icon({
		get name() {
			return props.icon ?? meta().icon;
		},
		size: 20
	})), _v$21 = escape(Show({
		get when() {
			return props.title;
		},
		get children() {
			return _v$19 = ssrHydrationKey(), _v$20 = () => escape(props.title), ssr(_tmpl$5, _v$19, _v$20);
		}
	})), _v$22 = () => escape(props.children);
	return ssr(_tmpl$6, _v$13, _g$2, _g$2, _g$2, _g$2, _v$18, _v$21, _v$22);
}
function ListRow(props) {
	var _v$23, _v$24, _v$27, _v$28, _v$25, _v$26, _v$29, _v$30, _v$31, _v$32, _v$33, _v$34, _v$35, _v$36;
	const interactive = () => typeof props.onClick === "function";
	const showChevron = () => props.chevron ?? interactive();
	const inner = [
		Show({
			get when() {
				return props.leading || props.leadingIcon;
			},
			get children() {
				return _v$23 = ssrHydrationKey(), _v$24 = () => escape(props.leading ?? Icon({
					get name() {
						return props.leadingIcon;
					},
					size: 22
				})), ssr(_tmpl$7, _v$23, _v$24);
			}
		}),
		(_v$25 = ssrHydrationKey(), _v$26 = () => escape(props.label), _v$29 = escape(Show({
			get when() {
				return props.sublabel;
			},
			get children() {
				return _v$27 = ssrHydrationKey(), _v$28 = () => escape(props.sublabel), ssr(_tmpl$8, _v$27, _v$28);
			}
		})), ssr(_tmpl$9, _v$25, _v$26, _v$29)),
		Show({
			get when() {
				return props.value;
			},
			get children() {
				return _v$30 = ssrHydrationKey(), _v$31 = () => escape(props.value), ssr(_tmpl$0, _v$30, _v$31);
			}
		}),
		Show({
			get when() {
				return showChevron();
			},
			get children() {
				return _v$32 = ssrHydrationKey(), _v$33 = escape(Icon({
					name: "chevron-right",
					size: 20
				})), ssr(_tmpl$1, _v$32, _v$33);
			}
		})
	];
	const klass = cn("flex w-full items-center gap-3 px-4 py-3 text-left", interactive() && "tide-press hover:bg-[var(--c-surface-2)]", props.class);
	return Show({
		get when() {
			return interactive();
		},
		get fallback() {
			var _v$37 = ssrHydrationKey(), _v$38 = escape(inner);
			return ssr(_tmpl$11, _v$37, ssrClassName(klass), _v$38);
		},
		get children() {
			return _v$34 = ssrHydrationKey(), _v$35 = () => ssrClassName(cn(klass, "min-h-[var(--tap)]")), _v$36 = escape(inner), ssr(_tmpl$10, _v$34, _v$35, _v$36);
		}
	});
}
function EmptyState(props) {
	var _v$41, _v$42, _v$45, _v$46, _v$48, _v$49;
	var _v$39 = ssrHydrationKey(), _v$40 = () => ssrClassName(cn("flex flex-col items-center gap-3 px-6 py-12 text-center", props.class)), _v$43 = escape(Show({
		get when() {
			return props.icon;
		},
		get children() {
			return _v$41 = ssrHydrationKey(), _v$42 = escape(Icon({
				get name() {
					return props.icon;
				},
				size: 26
			})), ssr(_tmpl$12, _v$41, _v$42);
		}
	})), _v$44 = () => escape(props.title);
	return ssr(_tmpl$15, _v$39, _v$40, _v$43, _v$44, escape(Show({
		get when() {
			return props.description;
		},
		get children() {
			return _v$45 = ssrHydrationKey(), _v$46 = () => escape(props.description), ssr(_tmpl$13, _v$45, _v$46);
		}
	})), escape(Show({
		get when() {
			return props.action;
		},
		get children() {
			return _v$48 = ssrHydrationKey(), _v$49 = () => escape(props.action), ssr(_tmpl$14, _v$48, _v$49);
		}
	})));
}
//#endregion
export { cn as _, Avatar as a, Divider as c, Stat as d, StatusDot as f, Icon as g, Spinner as h, ListRow as i, Eyebrow as l, IconButton as m, Card as n, AvatarStack as o, Button as p, EmptyState as r, Chip as s, Callout as t, ProgressBar as u };
