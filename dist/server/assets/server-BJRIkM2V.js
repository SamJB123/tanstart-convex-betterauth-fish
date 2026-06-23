import { i as redirect } from "./redirect-BwM679Xn.js";
import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-CqXZf4BL.js";
import { n as fetchAuthQuery, r as getToken, t as fetchAuthMutation } from "./auth-server-Kohr0d1z.js";
import { t as api } from "./api-Da-6fpXv.js";
//#region node_modules/.pnpm/@tanstack+start-server-core@1.167.9/node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/library/server.ts?tss-serverfn-split
var fetchAuth_createServerFn_handler = createServerRpc({
	id: "51de4247e605ed3b55db0e2e4e90f3268146e84a3ce4a2e07e39e04b0286e35b",
	name: "fetchAuth",
	filename: "src/library/server.ts"
}, (opts) => fetchAuth.__executeServer(opts));
var fetchAuth = createServerFn({ method: "GET" }).handler(fetchAuth_createServerFn_handler, async () => {
	return { token: await getToken() };
});
var fetchUser_createServerFn_handler = createServerRpc({
	id: "65aa840670bebd5bd48aeeefdffd0693948df05509a4dca8216e3b24a144fc37",
	name: "fetchUser",
	filename: "src/library/server.ts"
}, (opts) => fetchUser.__executeServer(opts));
var fetchUser = createServerFn({ method: "GET" }).handler(fetchUser_createServerFn_handler, async () => {
	try {
		return await fetchAuthQuery(api.auth.getCurrentUser, {});
	} catch (error) {
		throw redirect({ to: "/" });
	}
});
var addNumber_createServerFn_handler = createServerRpc({
	id: "16878795beb25fe90629a4dc7b51f3ffd36fe494fa231467bab96024e7a15f2f",
	name: "addNumber",
	filename: "src/library/server.ts"
}, (opts) => addNumber.__executeServer(opts));
var addNumber = createServerFn({ method: "POST" }).handler(addNumber_createServerFn_handler, async () => {
	return await fetchAuthMutation(api.myFunctions.addNumber, { value: Math.floor(Math.random() * 100) });
});
//#endregion
export { addNumber_createServerFn_handler, fetchAuth_createServerFn_handler, fetchUser_createServerFn_handler };
