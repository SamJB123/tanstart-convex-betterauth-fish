//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({
	"routes": {
		"__root__": {
			"filePath": "/Users/sambide/GitHub/tanstart-convex-betterauth-fish/src/routes/__root.tsx",
			"children": [
				"/",
				"/_authed",
				"/about",
				"/ui",
				"/api/auth/$"
			],
			"preloads": ["/assets/main-BE5GlHhk.js"]
		},
		"/": {
			"filePath": "/Users/sambide/GitHub/tanstart-convex-betterauth-fish/src/routes/index.tsx",
			"preloads": ["/assets/routes-CAoUKrU9.js", "/assets/auth-client-DIfsgAbo.js"]
		},
		"/_authed": {
			"filePath": "/Users/sambide/GitHub/tanstart-convex-betterauth-fish/src/routes/_authed.tsx",
			"children": ["/_authed/dashboard"],
			"preloads": ["/assets/_authed-CSy0y572.js"]
		},
		"/about": {
			"filePath": "/Users/sambide/GitHub/tanstart-convex-betterauth-fish/src/routes/about.tsx",
			"preloads": ["/assets/about-zfsazvHW.js"]
		},
		"/ui": {
			"filePath": "/Users/sambide/GitHub/tanstart-convex-betterauth-fish/src/routes/ui.tsx",
			"preloads": ["/assets/ui-2VNs2S_I.js"]
		},
		"/_authed/dashboard": {
			"filePath": "/Users/sambide/GitHub/tanstart-convex-betterauth-fish/src/routes/_authed/dashboard.tsx",
			"preloads": ["/assets/dashboard-DqIOvUuY.js", "/assets/auth-client-DIfsgAbo.js"]
		}
	},
	"clientEntry": "/assets/main-BE5GlHhk.js"
});
//#endregion
export { tsrStartManifest };
