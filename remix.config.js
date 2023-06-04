/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverModuleFormat: "cjs",
  future: {
    v2_errorBoundary: false,
    v2_meta: false,
    v2_normalizeFormMethod: false,
    v2_routeConvention: true,
  },
  devServer: {
    webSocketServer: {
      options: {
        port: 8003,
      },
    },
    liveReloadServer: {
      options: {
        port: 8004,
      },
    },
  },
};
