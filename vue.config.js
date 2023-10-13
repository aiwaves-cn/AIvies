const { defineConfig } = require('@vue/cli-service')
const proxyMiddleware = require('http-proxy-middleware')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    // port:18875,
    proxy: {
      // "/api": {
      //   target: "http://192.168.110.200:18876/api/",
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "",
      //   }
      // },
    },
  },
  publicPath: "/"
})
