import { GM_openInTab, GM_registerMenuCommand } from '$'
import { ID, VERSION } from 'virtual:meta'
import Store from './store'
import View from './view'

const THRESHOLD: number = 300
const CLEANED: number = 0

let timer: number = CLEANED
const store = new Store()
const view = new View(store)

console.log(`${ID}(v${VERSION})`)

document.addEventListener('contextmenu', (e) => {
  if (timer > CLEANED) {
    clearTimeout(timer)
    timer = CLEANED
  }
  else {
    const element = e.target as HTMLElement
    const link = element.closest('a')
    if (link) {
      e.preventDefault()
      timer = setTimeout(() => {
        timer = CLEANED
        GM_openInTab(link.href, { active: store.active })
      }, THRESHOLD)
    }
  }
})

GM_registerMenuCommand('切换超链接打开方式(前台/后台)', view.toggleActive)
