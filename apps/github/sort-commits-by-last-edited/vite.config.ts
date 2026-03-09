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
        name: 'GitHub 仓库文件按提交时间排序（Sort Github Commits By Last Edited）',
        description: 'GitHub 仓库无法快速查看最新的变更文件？试试这个 GitHub 仓库文件按提交时间排序的用户脚本吧！',
        icon: 'https://github.githubassets.com/favicons/favicon-dark.png',
        namespace: 'xiaohuohumax/userscripts/sort-github-commits-by-last-edited',
        license: 'MIT',
        updateURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/sort-github-commits-by-last-edited.user.js',
        downloadURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/sort-github-commits-by-last-edited.user.js',
        noframes: true,
        match: [
          'https://github.com/*',
        ],
      },
    }),
  ],
})
