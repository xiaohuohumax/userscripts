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
          sweetalert2: cdn.unpkg('Swal', 'dist/sweetalert2.all.min.js'),
        },
      },
      userscript: {
        'name': '右键快速复制/粘贴文本（Common Right Click Copy）',
        'description': '用户可以通过右键点击选中的文本，快速复制到剪贴板，然后在输入框中右键即可快速粘贴剪贴板的文本（PS：对应复制限制的网站暂不支持）。',
        'icon': 'https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg',
        'namespace': 'xiaohuohumax/userscripts/common-right-click-copy',
        'license': 'MIT',
        'updateURL': 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-copy.user.js',
        'downloadURL': 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-copy.user.js',
        'noframes': true,
        'run-at': 'document-start',
        'match': [
          'http*://*/*',
        ],
      },
    }),
  ],
})
