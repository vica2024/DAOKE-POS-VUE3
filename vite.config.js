import { resolve } from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import { vitePluginForArco } from '@arco-plugins/vite-vue';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import { version } from './package.json';

export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(version), // 将版本号添加到环境变量
  },
  //mode: 'development',
  server: {
    host: '0.0.0.0',
    port: 6100,
    proxy: {
      '/devApi': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/devApi/, ''),
      }
    },
    open: false,
  },
  plugins: [
    vue(),
    vueJsx(),
    vitePluginForArco({
      style: 'css'
    }),
    configCompressPlugin('gzip'),
    configVisualizerPlugin(),
  ],
  test: {
    globals: true, // 启用全局测试 API（如 describe、it 等）
    environment: 'jsdom', // 使用 jsdom 模拟 DOM 环境
    setupFiles: './setupTests.js', // 初始化文件路径
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, './src/assets'),
      },
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  css: {
    postcss: './postcss.config.js', // 指定 PostCSS 配置文件路径
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/breakpoint.less'
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
})
