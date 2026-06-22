//#region \0#tanstack-start-server-fn-resolver
var manifest = {
	"51de4247e605ed3b55db0e2e4e90f3268146e84a3ce4a2e07e39e04b0286e35b": {
		functionName: "fetchAuth_createServerFn_handler",
		importer: () => import("./server-Dqgr30_S.js")
	},
	"65aa840670bebd5bd48aeeefdffd0693948df05509a4dca8216e3b24a144fc37": {
		functionName: "fetchUser_createServerFn_handler",
		importer: () => import("./server-Dqgr30_S.js")
	},
	"16878795beb25fe90629a4dc7b51f3ffd36fe494fa231467bab96024e7a15f2f": {
		functionName: "addNumber_createServerFn_handler",
		importer: () => import("./server-Dqgr30_S.js")
	}
};
async function getServerFnById(id) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = await serverFnInfo.importer();
	if (!fnModule) {
		console.info("serverFnInfo", serverFnInfo);
		throw new Error("Server function module not resolved for " + id);
	}
	const action = fnModule[serverFnInfo.functionName];
	if (!action) {
		console.info("serverFnInfo", serverFnInfo);
		console.info("fnModule", fnModule);
		throw new Error(`Server function module export not resolved for serverFn ID: ${id}`);
	}
	return action;
}
//#endregion
export { getServerFnById as t };
