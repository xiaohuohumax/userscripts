import { defineConfig } from 'vite'
import meta from 'vite-plugin-meta'
import monkey, { cdn } from 'vite-plugin-monkey'

export default defineConfig({
  build: {
    outDir: '../../../dist/',
  },
  plugins: [
    meta(),
    monkey({
      entry: 'src/index.ts',
      build: {
        externalGlobals: {
          sweetalert: cdn.unpkg('swal', 'dist/sweetalert.min.js'),
        },
      },
      userscript: {
        name: 'Bilibili 动态卡片拦截（Bilibili Dynamic Block）',
        description: '此脚本可以依据规则拦截 Bilibili 动态卡片。',
        icon: 'https://static.hdslb.com/mobile/img/512.png',
        namespace: 'xiaohuohumax/userscripts/bilibili-dynamic-block',
        license: 'MIT',
        updateURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/bilibili-dynamic-block.user.js',
        downloadURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/bilibili-dynamic-block.user.js',
        noframes: true,
        match: [
          'https://t.bilibili.com/*',
          'https://space.bilibili.com/*',
        ],
      },
    }),
  ],
})
