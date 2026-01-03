import { defineConfig } from 'vite'
import meta from 'vite-plugin-meta'
import monkey from 'vite-plugin-monkey'

export default defineConfig({
  build: {
    outDir: '../../../dist/',
  },
  plugins: [
    meta(),
    monkey({
      entry: 'src/index.ts',
      userscript: {
        name: 'GitHub 仪表盘页面自动加载更多（GitHub Dashboard Auto More）',
        description: '我负责点，你负责看！',
        icon: 'https://github.githubassets.com/favicons/favicon-dark.png',
        namespace: 'xiaohuohumax/userscripts/github-dashboard-auto-more',
        license: 'MIT',
        updateURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-dashboard-auto-more.user.js',
        downloadURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-dashboard-auto-more.user.js',
        noframes: true,
        match: [
          'https://github.com',
        ],
      },
    }),
  ],
})
