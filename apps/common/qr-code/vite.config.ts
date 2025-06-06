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
          'jsqr': cdn.unpkg('jsQR', 'dist/jsQR.js'),
          'notiflix/build/notiflix-notify-aio': cdn.unpkg('Notiflix', 'build/notiflix-notify-aio.js'),
        },
      },
      userscript: {
        'name': '图片二维码识别（Common QR Code）',
        'description': '右键图片，识别二维码并复制到剪贴板。',
        'icon': 'https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg',
        'namespace': 'xiaohuohumax/userscripts/common-qr-code',
        'license': 'MIT',
        'updateURL': 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-qr-code.user.js',
        'downloadURL': 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-qr-code.user.js',
        'noframes': true,
        'run-at': 'document-start',
        'match': [
          'http*://*/*',
        ],
      },
    }),
  ],
})
