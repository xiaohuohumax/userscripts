import type { UserConfig } from 'vite'
import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

function toKebabCase(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export interface Meta {
  name: string
  version: string
  author: string
  description: string
  license: string
  namespace: string
  [key: string]: string
}

export interface Options {
  meta: Meta
  lib: {
    name: string
    entry?: string
    outDir: string
  }
}

export default function (options: Options): UserConfig {
  function content(filename: string) {
    if (!filename.endsWith('.iife.js')) {
      return
    }
    const keyMax = Object.keys(options.meta).reduce((acc, cur) => Math.max(acc, cur.length), 0)
    const lines = Object.entries(options.meta)
      .map(([key, value]) => `// ${key.padEnd(keyMax)} ${value}`)
    return `// ==UserScript==\n${lines.join('\n')}\n// ==/UserScript==\n`
  }

  return defineConfig({
    plugins: [
      banner({ content, verify: false }),
      dts({ rollupTypes: true }),
      viteStaticCopy({
        targets: [
          {
            src: `dist/index.lib.js`,
            dest: path.join(process.cwd(), options.lib.outDir),
            rename: `${toKebabCase(options.lib.name)}.lib.js`,
          },
        ],
      }),
    ],
    build: {
      minify: false,
      lib: {
        entry: options.lib.entry || 'src/index.ts',
        formats: ['iife', 'es'],
        fileName: format => format === 'iife' ? '[name].lib.js' : '[name].js',
        name: options.lib.name,
      },
    },
  })
}
