---
title: vue3开发，vite配置
date: "2025-2-23"
outline: [2,3]
tags: "vite,vue3"
---

# {{ $frontmatter.title }}


## vite插件

[插件列表](https://github.com/vitejs/awesome-vite#plugins)

## 基本配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import { extname } from 'node:path'

let imageReg = /jpg|png|jpeg/i
let cssReg = /css/i
let mediaReg = /ogg/i

// https://vitejs.dev/config/
export default defineConfig(({ cmd, mode }) => {
  let env = loadEnv(mode, process.cwd())
  console.debug('当前模式', mode, '当前环境变量', env)

  return {
    plugins: [
      //自动引api
      AutoImport({
        // targets to transform
        include: [
          /\.js?$/,
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],

        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          {
            'tdesign-vue-next': [
              'MessagePlugin',
              'DialogPlugin'
            ]
          }
        ],
        // Include auto-imported packages in Vite's `optimizeDeps` options
        // Recommend to enable
        viteOptimizeDeps: true,

        // Inject the imports at the end of other imports
        injectAtEnd: true,
      }),
      //自动引组件
      Components({
        include: [
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
            resolveIcons: true
          })
        ],
      }),
      vue(),
      //https://vite-plugin-mock-dev-server.netlify.app/
      mockDevServerPlugin({
        wsPrefix: "/ws",
        include: ["mock/**/*.mock.js"]
      }),
    ],
    //基础路径
    base: './',
    resolve: {
      //路径别名
      alias: {
        "@views": resolve('src/client/views'),
        "@services": resolve('src/client/services'),
        "@utils": resolve('src/client/utils'),
        "@directives": resolve("src/client/directives"),
        "@api": resolve('src/client/api')
      },
      //模块解析需要加后缀否
      extensions: [".vue", ".js", ".json"]
    },
    server: {
      proxy: {

      }
    },
    //类似webpack的definePlugin，为代码静态注入一些数据
    define: {

    },
    //打包优化
    build: {
      rollupOptions: {
        output: {
          //分包
          manualChunks: function manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            return null;
          },
          //打包资源按路径存放
          assetFileNames(assetInfo) {
            let name = assetInfo.names[0]
            let ext = extname(name)
            let dir = ''
            if (imageReg.test(ext)) {
              dir = 'imgs/'
            } else if (cssReg.test(ext)) {
              dir = 'css/'
            } else if (mediaReg.test(ext)) {
              dir = 'media/'
            }
            return `assets/${dir}[name]-[hash][extname]`
          }
        }
      },
    }
  }
})

```