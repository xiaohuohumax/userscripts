import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import { author, description, license, version } from './package.json'

export default defineConfig({
  plugins: [
    banner({
      content: `// ==UserScript==
// @name         Zip Downloader 资源下载器（下载资源、Zip 压缩、下载到本地）
// @namespace    xiaohuohumax/userscripts/zip-downloader
// @version      ${version}
// @author       ${author.name}
// @description  ${description}
// @license      ${license}
// ==/UserScript==
`,
      verify: false,
    }),
  ],
  build: {
    outDir: '../../../dist/',
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      fileName: () => 'zip-downloader.js',
      name: 'zipDownloader',
    },
  },
})
