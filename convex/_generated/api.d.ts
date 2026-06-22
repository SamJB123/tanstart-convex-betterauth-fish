/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as catch_tables from "../catch/tables.js";
import type * as geospatial from "../geospatial.js";
import type * as governance_tables from "../governance/tables.js";
import type * as http from "../http.js";
import type * as identity_model from "../identity/model.js";
import type * as identity_tables from "../identity/tables.js";
import type * as licensing_applications from "../licensing/applications.js";
import type * as licensing_tables from "../licensing/tables.js";
import type * as myFunctions from "../myFunctions.js";
import type * as quota_tables from "../quota/tables.js";
import type * as reference_geometries from "../reference/geometries.js";
import type * as reference_tables from "../reference/tables.js";
import type * as reporting_tables from "../reporting/tables.js";
import type * as seed from "../seed.js";
import type * as shared_validators from "../shared/validators.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "catch/tables": typeof catch_tables;
  geospatial: typeof geospatial;
  "governance/tables": typeof governance_tables;
  http: typeof http;
  "identity/model": typeof identity_model;
  "identity/tables": typeof identity_tables;
  "licensing/applications": typeof licensing_applications;
  "licensing/tables": typeof licensing_tables;
  myFunctions: typeof myFunctions;
  "quota/tables": typeof quota_tables;
  "reference/geometries": typeof reference_geometries;
  "reference/tables": typeof reference_tables;
  "reporting/tables": typeof reporting_tables;
  seed: typeof seed;
  "shared/validators": typeof shared_validators;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("@convex-dev/better-auth/_generated/component.js").ComponentApi<"betterAuth">;
  geospatial: import("@convex-dev/geospatial/_generated/component.js").ComponentApi<"geospatial">;
};
