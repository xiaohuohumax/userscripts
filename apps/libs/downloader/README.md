# Downloader

**资源下载器（下载资源、Zip 压缩、下载到本地）**

<a href="https://github.com/xiaohuohumax/userscripts/tree/main/apps/libs/downloader">
  <img src="https://img.shields.io/badge/GITHUB-项目地址-brightgreen?style=for-the-badge&logo=github" alt="项目地址" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/MIT-开源协议-orange?style=for-the-badge&logo=github" alt="开源协议" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/apps/libs/downloader/CHANGELOG.md">
  <img src="https://img.shields.io/badge/CHANGELOG-更新日志-blue?style=for-the-badge&logo=github" alt="更新日志" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/issues">
  <img src="https://img.shields.io/badge/issues-问题反馈-yellow?style=for-the-badge&logo=github" alt="问题反馈" />
</a>

## 📖 使用方式

1. 添加 `// @require https://***/downloader.js` 库引用
2. 添加 `// @grant GM_download` 下载权限
3. 使用 `downloader` 方法下载资源

```typescript
// ==UserScript==
// ***
// @require      https://***/downloader.js?sha384-***
// @grant        GM_download
// ==/UserScript==

(async () => {
  'use strict'
  // 异步调用
  await downloader({
    filename: 'index.zip', // 文件名
    resources: [ // 资源列表
      { name: 'index.txt', url: location.href },
    ],
    concurrency: 10, // 并发数
    onProgress(index) { // 下载进度回调
      console.log(`正在下载第 ${index + 1} 个资源`)
    },
  })
})()
```

## 🚨 免责声明

- 本脚本仅供学习交流使用
- 请勿用于任何商业用途
- 使用本脚本产生的任何后果由用户自行承担

## ♻ 其他说明

GreasyFork 或者 ScriptCat 回复不及时，问题反馈推荐直接在 Github 提 Issue。

**如果觉得本脚本对你有帮助，欢迎点个 ⭐ Star 支持一下！**
