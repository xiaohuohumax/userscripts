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
        'name': '右键超链接快速打开新标签页（Common Right Click Tab）',
        'description': '用户可以通过右键点击【普通链接、鼠标选中带链接的文字】等方式快速打开新标签页。效果类似于【Ctrl+左键】点击链接。',
        'icon': 'https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg',
        'namespace': 'xiaohuohumax/userscripts/common-right-click-tab',
        'license': 'MIT',
        'updateURL': 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-tab.user.js',
        'downloadURL': 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-tab.user.js',
        'noframes': true,
        'run-at': 'document-start',
        'match': [
          'http*://*/*',
        ],
      },
    }),
  ],
})
