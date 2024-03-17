import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/magicman-ui/plugin/dist/",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true // 允许在 Less 中使用 JavaScript 表达式
      }
    }
  },
  build: {
    // false 表示禁用CSS 代码拆分，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // 指定生成的 bundle 的格式
        // iife – 自执行函数，适用于 <script> 标签（如果你想为你的应用程序创建 bundle，那么你可能会使用它）。iife 表示“自执行 函数表达式”
        format: 'iife',
        entryFileNames: 'assets/[name].js', // 入口文件  
        chunkFileNames: 'assets/[name].js', // 非入口块文件  
        assetFileNames: 'assets/[name].[ext]'// 定义静态资源文件命名方式
      }
    }
  }
})
