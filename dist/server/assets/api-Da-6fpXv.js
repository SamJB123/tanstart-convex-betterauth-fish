import { g as toReferencePath, m as anyApi } from "./auth-server-Kohr0d1z.js";
//#region node_modules/.pnpm/convex@1.39.1_react@19.2.6/node_modules/convex/dist/esm/server/components/index.js
function createChildComponents(root, pathParts) {
	return new Proxy({}, { get(_, prop) {
		if (typeof prop === "string") return createChildComponents(root, [...pathParts, prop]);
		else if (prop === toReferencePath) {
			if (pathParts.length < 1) {
				const found = [root, ...pathParts].join(".");
				throw new Error(`API path is expected to be of the form \`${root}.childComponent.functionName\`. Found: \`${found}\``);
			}
			return `_reference/childComponent/` + pathParts.join("/");
		} else return;
	} });
}
var componentsGeneric = () => createChildComponents("components", []);
//#endregion
//#region convex/_generated/api.js
/**
* Generated `api` utility.
*
* THIS CODE IS AUTOMATICALLY GENERATED.
*
* To regenerate, run `npx convex dev`.
* @module
*/
/**
* A utility for referencing Convex functions in your app's API.
*
* Usage:
* ```js
* const myFunctionReference = api.myModule.myFunction;
* ```
*/
var api = anyApi;
componentsGeneric();
//#endregion
export { api as t };
