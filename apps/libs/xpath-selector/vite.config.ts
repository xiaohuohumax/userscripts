import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import { author, description, license, version } from './package.json'

export default defineConfig({
  plugins: [
    banner({
      content: `// ==UserScript==
// @name         DXPath Selector 一个 XPath 选择器库，快速获取节点数据
// @namespace    xiaohuohumax/userscripts/xpath-selector
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
      fileName: () => 'xpath-selector.js',
      name: 'xpathSelector',
    },
  },
})
