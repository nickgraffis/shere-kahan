import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: false
        })
      ],
    }),
    Icons(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@app', replacement: path.resolve(__dirname, './src/pages/app') },
      { find: '@shared', replacement: path.resolve(__dirname, './src/shared') },
      { find: '@root', replacement: path.resolve(__dirname, './') }
    ],
  },
  server: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/.netlify/functions',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
