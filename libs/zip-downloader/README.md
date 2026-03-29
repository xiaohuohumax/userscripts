# Zip Downloader

**资源下载器（下载资源、Zip 压缩、下载到本地）**

<a href="https://github.com/xiaohuohumax/userscripts/tree/main/libs/zip-downloader">
  <img src="https://img.shields.io/badge/GITHUB-项目地址-brightgreen?style=for-the-badge&logo=github" alt="项目地址" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/MIT-开源协议-orange?style=for-the-badge&logo=github" alt="开源协议" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/libs/zip-downloader/CHANGELOG.md">
  <img src="https://img.shields.io/badge/CHANGELOG-更新日志-blue?style=for-the-badge&logo=github" alt="更新日志" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/issues">
  <img src="https://img.shields.io/badge/issues-问题反馈-yellow?style=for-the-badge&logo=github" alt="问题反馈" />
</a>

## 📥 参数说明

**Options 参数说明：**

| 参数名        | 类型                                             | 是否必填 | 默认值                                    | 说明                                                                                                   |
| ------------- | ------------------------------------------------ | -------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `filename`    | string                                           | 否       |                                           | 保存的文件名，**添加此参数时会将压缩包保存到本地，未配置返回压缩包的 Blob 对象**                       |
| `resources`   | (Resource \| () => Promise\<Resource\>)[]        | 是       |                                           | 资源列表，数组，每个元素为对象，包含 `name` 和 `url` 或者 `blob` 字段                                  |
| `concurrency` | number                                           | 否       | `10`                                      | 并发数，默认 `10`                                                                                      |
| `onProgress`  | (index: number) => Promise\<void\>               | 否       |                                           | 下载进度回调函数，参数为当前正在下载的资源索引                                                         |
| `onError`     | (error: Error, index: number) => Promise\<void\> | 否       | `async (error, index) => { throw error }` | 下载出错回调函数，参数为当前出错的资源索引和错误信息，默认抛出异常阻止后续下载，可配置为空函数忽略错误 |

**Resource 参数说明：**

| 参数名 | 类型                            | 是否必填 | 默认值 | 说明          |
| ------ | ------------------------------- | -------- | ------ | ------------- |
| `name` | string                          | 是       |        | 资源名称      |
| `url`  | string                          | 否       |        | URL 类型资源  |
| `blob` | Blob 或者 () => Promise\<Blob\> | 否       |        | Blob 类型资源 |

## 📦 使用示例

**下载，压缩，并保存到本地**

```typescript
await zipDownloader({
  filename: 'index.zip',
  resources: [
    { name: 'index.html', url: location.href },
    {
      name: 'hello.txt',
      blob: new Blob(['hello world'], { type: 'text/plain' }),
    },
    {
      name: 'example.txt',
      blob: () => fetch('https://example.com').then(response => response.blob()),
    },
    () => fetch('https://example.com').then(response => ({
      name: 'example2.txt',
      blob: () => response.blob(),
    })),
  ],
  concurrency: 10,
  async onProgress(index) {
    console.log(`正在下载第 ${index + 1} 个资源`)
  },
})
```

**仅下载和压缩**

```typescript
const blob = await zipDownloader({
  resources: [
    { name: 'index.html', url: location.href },
    {
      name: 'hello.txt',
      blob: new Blob(['hello world'], { type: 'text/plain' }),
    },
    {
      name: 'example.txt',
      blob: () => fetch('https://example.com').then(response => response.blob()),
    },
    () => fetch('https://example.com').then(response => ({
      name: 'example2.txt',
      blob: () => response.blob(),
    })),
  ],
  concurrency: 10,
  async onProgress(index) {
    console.log(`正在下载第 ${index + 1} 个资源`)
  },
})
// 自行处理
// GM_download(URL.createObjectURL(blob), 'index.zip')
```

**忽略异常的资源**

```typescript
await zipDownloader({
  filename: 'index.zip',
  resources: [
    { name: 'index.html', url: location.href },
    {
      name: 'hello.txt',
      blob: new Blob(['hello world'], { type: 'text/plain' }),
    },
    {
      name: 'example.txt',
      blob: () => fetch('https://example.com').then(response => response.blob()),
    },
    () => fetch('https://example.com').then(response => ({
      name: 'example2.txt',
      blob: () => response.blob(),
    })),
  ],
  concurrency: 10,
  async onProgress(index) {
    console.log(`正在下载第 ${index + 1} 个资源`)
  },
  async onError(error, index) {
    console.warn(`处理第 ${index} 个资源时出现异常: ${error}`)
    // throw error 不跑出异常
  }
})
```

## 📖 使用方式

### 方式一：直接引入库文件

```typescript
// ==UserScript==
// @require      https://**/zip-downloader.js?*
// @grant        GM_download
// ==/UserScript==

(async function () {
  'use strict'
  await zipDownloader({
    filename: 'index.zip',
    resources: [
      { name: 'index.html', url: location.href },
      {
        name: 'hello.txt',
        blob: new Blob(['hello world'], { type: 'text/plain' }),
      },
    ],
    concurrency: 10,
    async onProgress(index) {
      console.log(`正在下载第 ${index + 1} 个资源`)
    },
  })
})()
```

### 方式二：vite + vite-plugin-monkey [推荐]

1. 初始化项目

```shell
npm create monkey
```

2. 安装 zip-downloader 依赖

```shell
npm i @xiaohuohumax/zip-downloader
```

3. 在 main.ts 中使用 zip-downloader

```typescript
import zipDownloader from '@xiaohuohumax/zip-downloader'

await zipDownloader({
  filename: 'index.zip',
  resources: [
    { name: 'index.html', url: location.href },
    {
      name: 'hello.txt',
      blob: new Blob(['hello world'], { type: 'text/plain' }),
    },
  ],
  concurrency: 10,
  async onProgress(index) {
    console.log(`正在下载第 ${index + 1} 个资源`)
  },
})
```

1. 修改 vite.config.ts 排除 zip-downloader 依赖和添加 GM_download 权限

```typescript
import { defineConfig } from 'vite'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      build: {
        externalGlobals: {
          '@xiaohuohumax/zip-downloader': cdn.jsdelivr('zipDownloader', 'dist/index.lib.js'),
        },
      },
      userscript: {
        grant: ['GM_download']
      },
    }),
  ],
})
```

## 🧩 依赖项目

- [zip.js](https://github.com/gildas-lormeau/zip.js) Zip 压缩库
- [p-limit](https://github.com/sindresorhus/p-limit) 并发限制库

## 🚨 免责声明

- 本脚本仅供学习交流使用
- 请勿用于任何商业用途
- 使用本脚本产生的任何后果由用户自行承担

## ♻ 其他说明

GreasyFork 或者 ScriptCat 回复不及时，问题反馈推荐直接在 Github 提 Issue。

**如果觉得本脚本对你有帮助，欢迎点个 ⭐ Star 支持一下！**
