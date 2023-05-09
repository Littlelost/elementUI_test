const { defineConfig } = require('@vue/cli-service')
// 引入element-plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 设置css的主入口文件
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/css/styles.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "api": "@/api",
        "components": "@/components",
        "css": "@/css",
        "util": "@/util",
        "views": "@/views"
      },
      extensions: [".vue",'.js', '.json', '.ts']
    }
  }
})
