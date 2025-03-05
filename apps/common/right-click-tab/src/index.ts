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
  if (timer > CLEANED) {
    clearTimeout(timer)
    timer = CLEANED
  }
  else {
    const href = tryGetUrl(e.target as Element)?.trim()

    if (href) {
      if (import.meta.env.DEV) {
        console.log(`open ${href} in ${store.active ? 'foreground' : 'background'} mode`)
      }
      e.preventDefault()
      timer = setTimeout(() => {
        timer = CLEANED
        GM_openInTab(href, { active: store.active })
      }, THRESHOLD)
    }
  }
})

GM_registerMenuCommand('切换超链接打开方式(前台/后台)', view.toggleActive)
