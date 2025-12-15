import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import { author, description, version } from './package.json'

export default defineConfig({
  plugins: [
    banner({
      content: `// ==UserScript==
// @name         Downloader 资源下载器（下载资源、Zip 压缩、下载到本地）
// @namespace    xiaohuohumax/userscripts/downloader
// @version      ${version}
// @author       ${author.name}
// @description  ${description}
// @license      MIT
// @icon         https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg
// @source       https://github.com/xiaohuohumax/userscripts.git
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
      fileName: () => 'downloader.js',
      name: 'downloader',
    },
  },
})
