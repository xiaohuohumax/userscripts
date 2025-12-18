# XPath Selector

**一个 XPath 选择器库，快速获取节点数据**

<a href="https://github.com/xiaohuohumax/userscripts/tree/main/libs/xpath-selector">
  <img src="https://img.shields.io/badge/GITHUB-项目地址-brightgreen?style=for-the-badge&logo=github" alt="项目地址" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/MIT-开源协议-orange?style=for-the-badge&logo=github" alt="开源协议" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/libs/xpath-selector/CHANGELOG.md">
  <img src="https://img.shields.io/badge/CHANGELOG-更新日志-blue?style=for-the-badge&logo=github" alt="更新日志" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/issues">
  <img src="https://img.shields.io/badge/issues-问题反馈-yellow?style=for-the-badge&logo=github" alt="问题反馈" />
</a>

## 📥 参数说明

### 通用函数 xpathSelector(options: Options)

**Options 参数说明：**

| 参数名       | 类型   | 是否必填 | 默认值     | 说明                                                                                                                              |
| ------------ | ------ | -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | string | 是       |            | 要获取的节点的 XPath 表达式                                                                                                       |
| `returnType` | string | 是       |            | 获取结果的类型，可选值：`string`、`strings`、`number`、`numbers`、`boolean`、`nodes`、`first-node`、`map`、`array`、`all-results` |
| `node`       | Node   | 否       | `document` | 要搜索的节点                                                                                                                      |

```typescript
const title = xpathSelector({
  expression: '//title/text()',
  returnType: 'string'
})
console.log(title) // hello world
```

### 快捷函数 xpathSelector.select[returnType](expression: string, node?: Node)

**Options 参数说明：**

| 参数名       | 类型   | 是否必填 | 默认值     | 说明                                             |
| ------------ | ------ | -------- | ---------- | ------------------------------------------------ |
| `returnType` | string | 是       |            | 函数名，可选值见上方 Options.returnType 参数说明 |
| `expression` | string | 是       |            | 要获取的节点的 XPath 表达式                      |
| `node`       | Node   | 否       | `document` | 要搜索的节点                                     |

```typescript
const title = xpathSelector.selectString('//title/text()')
console.log(title) // hello world
```

## 📖 使用方式

### 方式一：直接引入库文件

```typescript
// ==UserScript==
// @require      https://**/xpath-selector.js?*
// ==/UserScript==

(function () {
  'use strict'
  const title = xpathSelector.selectString('//title/text()')
  console.log(title) // hello world
})()
```

### 方式二：vite + vite-plugin-monkey [推荐]

1. 初始化项目

```shell
npm create monkey
```

2. 安装 xpath-selector 依赖

```shell
npm i @xiaohuohumax/xpath-selector
```

3. 在 main.ts 中使用 xpath-selector

```typescript
import xpathSelector from '@xiaohuohumax/xpath-selector'

const button = xpathSelector.selectFirstNode<HTMLButtonElement>('//button')
console.log(button) // Output: <button>Click Me</button>
```

4. 修改 vite.config.ts 排除 xpath-selector 依赖

```typescript
import { defineConfig } from 'vite'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      build: {
        externalGlobals: {
          '@xiaohuohumax/xpath-selector': cdn.jsdelivr('xpathSelector', 'dist/index.lib.js'),
        },
      },
    }),
  ],
})
```

## 📦 使用示例

```html
<!DOCTYPE html>
<html lang="en" charset="UTF-8">
<head>
    <title>hello world</title>
</head>
<body>
    <p>hello</p>
    <p>world</p>
    <a href="#">hello</a>
    <a href="#">world</a>
    <section>
        <!-- section内容 -->
    </section>
</body>
</html>
```

**获取 title 节点的文本内容**

```typescript
const title = xpathSelector.selectString('//title/text()')
console.log(title) // hello world
```

**获取所有 p 节点的文本内容**

```typescript
const pList = xpathSelector.selectStrings('//p/text()')
console.log(pList) // ['hello', 'world']
```

**统计所有 a 节点的个数**

```typescript
const aCount = xpathSelector.selectNumber('count(//a)')
console.log(aCount) // 2
```

**判断是否存在 section 节点**

```typescript
const hasSection = xpathSelector.selectBoolean('boolean(//section)')
console.log(hasSection) // true
```

**获取全部的 a 节点**

```typescript
const aList = xpathSelector.selectNodes('//a')
console.log(aList) // [<a>hello</a>, <a>world</a>]
```

**获取第一个 a 节点**

```typescript
const firstA = xpathSelector.selectFirstNode('//a')
console.log(firstA) // <a>hello</a>
```

**获取 html 节点的全部属性**

```typescript
const htmlAttributes = xpathSelector.selectMap(`map:merge(
  for $attr in //html/@*
  return map:entry(local-name($attr), string($attr))
)`)
console.log(htmlAttributes) // {lang: "en", charset: "UTF-8"}
```

**获取自定义 html 节点的 title 节点的文本内容**

```typescript
const customHtmlTitle = xpathSelector.selectString(
  '//title/text()',
  new DOMParser().parseFromString('<html><title>Hello</title></html>', 'text/html'),
)
console.log(customHtmlTitle) // Hello
```

## 🧩 依赖项目

- [fontoxpath](https://github.com/FontoXML/fontoxpath) XPath 引擎

## 🚨 免责声明

- 本脚本仅供学习交流使用
- 请勿用于任何商业用途
- 使用本脚本产生的任何后果由用户自行承担

## ♻ 其他说明

GreasyFork 或者 ScriptCat 回复不及时，问题反馈推荐直接在 Github 提 Issue。

**如果觉得本脚本对你有帮助，欢迎点个 ⭐ Star 支持一下！**
