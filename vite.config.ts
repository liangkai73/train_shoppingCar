import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      'https://liangkai73.github.io/train_Engineered/api': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // base: '/train_Engineered',
  build: {
    // 输出目录
    outDir: 'dist',
    // 静态资产处理
    assetsDir: 'assets',
    // CSS 打包策略（例如：'css' 或 ['css', { modules: true }]）
    cssCodeSplit: true,
    // 指定 rollup 插件
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash][extname]'
      },
      plugins: [
        // 使用插件示例
        visualizer({ open: true })
      ]
    }
  },

  plugins: [react()]
})
