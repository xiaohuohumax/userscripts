# XPath Selector

**一个 XPath 选择器库，快速节点获取数据**

<a href="https://github.com/xiaohuohumax/userscripts/tree/main/apps/libs/xpath-selector">
  <img src="https://img.shields.io/badge/GITHUB-项目地址-brightgreen?style=for-the-badge&logo=github" alt="项目地址" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/MIT-开源协议-orange?style=for-the-badge&logo=github" alt="开源协议" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/blob/main/apps/libs/xpath-selector/CHANGELOG.md">
  <img src="https://img.shields.io/badge/CHANGELOG-更新日志-blue?style=for-the-badge&logo=github" alt="更新日志" />
</a>
<a href="https://github.com/xiaohuohumax/userscripts/issues">
  <img src="https://img.shields.io/badge/issues-问题反馈-yellow?style=for-the-badge&logo=github" alt="问题反馈" />
</a>

## 📖 使用方式

### ✍ 添加元数据

```typescript
// @require      https://**/xpath-selector.js?*
```
### 📥 参数说明

**Options 参数说明：**

| 参数名       | 类型   | 是否必填 | 默认值     | 说明                                                                                                                              |
| ------------ | ------ | -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `expression` | string | 是       |            | 要获取的节点的 XPath 表达式                                                                                                       |
| `returnType` | string | 是       |            | 获取结果的类型，可选值：`string`、`strings`、`number`、`numbers`、`boolean`、`nodes`、`first-node`、`map`、`array`、`all-results` |
| `node`       | Node   | 否       | `document` | 要搜索的节点                                                                                                                      |

### 📦 使用示例

**获取 title 节点的文本内容**

```typescript
const title = xpathSelector({
  expression: '//title/text()',
  returnType: 'string'
})
console.log(title) // hello world
```

**获取所有 p 节点的文本内容**

```typescript
const pList = xpathSelector({
  expression: '//p/text()',
  returnType: 'strings'
})
console.log(pList) // ['hello', 'world']
```

**统计所有 a 节点的个数**

```typescript
const aCount = xpathSelector({
  expression: 'count(//a)',
  returnType: 'number'
})
console.log(aCount) // 2
```

**判断是否存在 section 节点**

```typescript
const hasSection = xpathSelector({
  expression: 'boolean(//section)',
  returnType: 'boolean'
})
console.log(hasSection) // true
```

**获取全部的 a 节点**

```typescript
const aList = xpathSelector({
  expression: '//a',
  returnType: 'nodes'
})
console.log(aList) // [<a>hello</a>, <a>world</a>]
```

**获取第一个 a 节点**

```typescript
const firstA = xpathSelector({
  expression: '//a',
  returnType: 'first-node'
})
console.log(firstA) // <a>hello</a>
```

**获取 html 节点的全部属性**

```typescript
const htmlAttributes = xpathSelector({
  expression: `map:merge(
    for $attr in //html/@*
    return map:entry(local-name($attr), string($attr))
  )`,
  returnType: 'map'
})
console.log(htmlAttributes) // {lang: "en", charset: "UTF-8"}
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
