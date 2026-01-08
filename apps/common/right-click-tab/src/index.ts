import { GM_openInTab, GM_registerMenuCommand } from '$'
import getUrls from 'get-urls'
import { ID, VERSION } from 'virtual:meta'
import Store from './store'
import View from './view'

const THRESHOLD: number = 300
const CLEANED: number = 0

let timer: number = CLEANED
const store = new Store()
const view = new View(store)

console.log(`${ID}(v${VERSION})`)

function tryGetUrls(element: Element): string[] | undefined {
  const selection = window.getSelection()?.toString()
  if (selection) {
    const urls = Array.from(getUrls(selection))
    if (urls.length > 0) {
      return urls
    }
  }

  const link = element.closest('a')
  if (link && link.href) {
    return [link.href]
  }
}

document.addEventListener('contextmenu', (e: MouseEvent) => {
  const urls = tryGetUrls(e.target as Element)

  if (!urls) {
    return
  }

  if (timer > CLEANED) {
    // double click
    clearTimeout(timer)
    timer = CLEANED
    if (store.trigger === 'double') {
      e.preventDefault()
      urls.forEach(url => GM_openInTab(url, { active: store.active }))
    }
    return
  }

  if (import.meta.env.DEV) {
    console.log(`open ${urls} in ${store.active ? 'foreground' : 'background'} mode`)
  }

  if (store.trigger === 'single') {
    e.preventDefault()
  }

  timer = setTimeout(() => {
    // single click
    timer = CLEANED
    if (store.trigger === 'single') {
      urls.forEach(url => GM_openInTab(url, { active: store.active }))
    }
  }, THRESHOLD)
})

GM_registerMenuCommand('修改配置', view.config)
