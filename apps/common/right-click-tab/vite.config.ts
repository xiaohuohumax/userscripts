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
        'name': 'Common Right Click Tab',
        'description': '浏览器右键修改：超链接单击改为在新标签页打开，双击为原右键菜单',
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
