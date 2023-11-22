const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true, // 设置为true 高级语法向下兼容，false 不会
  productionSourceMap: false, // 设置为false,减少包大小，压缩处理等，不利于调试
  lintOnSave: process.env.NODE_ENV !== 'production',
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
  },
  // 配置webpack
  configureWebpack: {
    // 排除三方包
    externals: { // {key:value}
        // 'vue': 'Vue',
        // "element-ui": 'ELEMENT'
    },
    plugins: [
        new CompressionWebpackPlugin({ // 压缩插件
            algorithm: 'gzip', // 压缩方式
            test: /\.js$|\.css$/, // 匹配文件名
            threshold: 10240 // 阈值  代表大于设置值生成压缩文件
        }),
        new HtmlWebpackExternalsPlugin({ // 内网打包
          externals: [
            {
              module: 'vue',
              entry: {
                path: 'dist/vue.min.js',
                type: 'js'
              },
              global: 'Vue'
            },
            {
              module: 'element-ui',
              entry: ['lib/index.js', 'lib/theme-chalk/index.css'],
              supplements: ['lib/theme-chalk/fonts/'],
              global: 'ELEMENT'
            },
            {
              module: 'axios',
              entry: {
                path: 'dist/axios.min.js'
              },
              global: 'axios'
            },
            {
              module: 'echarts',
              entry: {
                path: 'dist/echarts.min.js',
                attributes: {
                  async: ''
                }
              },
              global: 'echarts'
            }
          ]
        })
      ]
  },
  // 代码拆分
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', // 如果是生产环境才会处理拆分
    config => {
        config.optimization.splitChunks({
            chunks: 'all', // 同步异步同时执行
            minSize: 2000, // 大于2KB需要拆分
            cacheGroups: {
                // 提取三方包
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, // 值越大，优先级越高
                    chunks: 'initial'
                },
                // 提取组件包
                commons: {
                    name: 'chunk-commons',
                    test: path.resolve('src/components'),
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        })
    })
  }
  
})
