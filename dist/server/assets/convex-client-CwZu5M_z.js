import { n as setupConvex } from "./convex-solid-C7zNHFqU.js";
import { t as getServerFnById } from "./__tanstack-start-server-fn-resolver-B2cM8EuV.js";
import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-CqXZf4BL.js";
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId, importer) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (importer ? await importer() : await getServerFnById(functionId))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/library/server.ts
var fetchAuth = createServerFn({ method: "GET" }).handler(createSsrRpc("51de4247e605ed3b55db0e2e4e90f3268146e84a3ce4a2e07e39e04b0286e35b"));
var fetchUser = createServerFn({ method: "GET" }).handler(createSsrRpc("65aa840670bebd5bd48aeeefdffd0693948df05509a4dca8216e3b24a144fc37"));
createServerFn({ method: "POST" }).handler(createSsrRpc("16878795beb25fe90629a4dc7b51f3ffd36fe494fa231467bab96024e7a15f2f"));
var convexClient = setupConvex("https://hidden-pheasant-120.convex.cloud");
function refreshAuth() {
	convexClient.setAuth(async () => {
		const { token } = await fetchAuth();
		return token;
	});
}
refreshAuth();
//#endregion
export { fetchAuth as n, fetchUser as r, convexClient as t };
