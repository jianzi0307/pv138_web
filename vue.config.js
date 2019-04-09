module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },
  productionSourceMap: false,
  // baseUrl: process.env.BASE_URL,
  publicPath: process.env.BASE_URL,
  outputDir: process.env.OUTPUT_DIR,
  devServer: {
    port: 80
  },
};