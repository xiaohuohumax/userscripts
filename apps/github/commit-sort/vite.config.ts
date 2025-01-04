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
        name: 'GitHub Commit Sort',
        description: 'GitHub 仓库文件按提交时间排序',
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
