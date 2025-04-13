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

function tryGetUrl(element: Element): string | null {
  const selection = window.getSelection()?.toString()
  if (selection) {
    const urls = Array.from(getUrls(selection))
    return urls.length > 0
      ? urls[0]
      // : selection
      : null
  }

  const link = element.closest('a')
  return link?.href || null
}

document.addEventListener('contextmenu', (e: MouseEvent) => {
  const href = tryGetUrl(e.target as Element)?.trim()

  if (!href) {
    return
  }

  if (timer > CLEANED) {
    // double click
    clearTimeout(timer)
    timer = CLEANED
    if (store.trigger === 'double') {
      e.preventDefault()
      GM_openInTab(href, { active: store.active })
    }
    return
  }

  if (import.meta.env.DEV) {
    console.log(`open ${href} in ${store.active ? 'foreground' : 'background'} mode`)
  }

  if (store.trigger === 'single') {
    e.preventDefault()
  }

  timer = setTimeout(() => {
    // single click
    timer = CLEANED
    if (store.trigger === 'single') {
      GM_openInTab(href, { active: store.active })
    }
  }, THRESHOLD)
})

GM_registerMenuCommand('修改配置', view.config)
