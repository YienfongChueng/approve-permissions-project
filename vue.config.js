const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://49.235.128.49:5058',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api':  ''
        // }
      }
    },
    client: {
      overlay: false
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variable.scss";'
      }
    }
  }
  
})
