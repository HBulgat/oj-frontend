const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  // 转译依赖项
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
