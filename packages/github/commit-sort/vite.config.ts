import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

export default defineConfig({
  build: {
    outDir: '../../../dist/',
  },
  plugins: [
    monkey({
      entry: 'src/index.ts',
      userscript: {
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
