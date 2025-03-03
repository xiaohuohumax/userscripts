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
        'name': '🖱右键超链接快速打开新标签页📑（Common Right Click Tab）',
        'description': '右键超链接即可快速打开新标签页，并且新标签页可以配置前台或后台运行。效果与 Ctrl + 左键单击超链接相同。',
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
