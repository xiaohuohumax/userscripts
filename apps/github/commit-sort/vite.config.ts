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
        name: 'GitHub 仓库文件按提交时间排序📅（GitHub Commit Sort）',
        description: 'GitHub 仓库无法快速查看最新的变更文件？试试这个 GitHub 仓库文件按提交时间排序的用户脚本吧！',
        icon: 'https://github.githubassets.com/favicons/favicon-dark.png',
        namespace: 'xiaohuohumax/userscripts/github-commit-sort',
        license: 'MIT',
        updateURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-commit-sort.user.js',
        downloadURL: 'https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-commit-sort.user.js',
        noframes: true,
        match: [
          'https://github.com/*',
        ],
      },
    }),
  ],
})
