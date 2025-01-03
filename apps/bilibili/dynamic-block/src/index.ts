import { GM_registerMenuCommand } from '$'
import { debounce } from 'radash'
import { ID, VERSION } from './constant'
import Store from './store'
import View from './view'
import './style.css'

const FILTERED_CLASS = `${ID}-filtered`
const store = new Store()
const view = new View(store)

let configHasChange = false
let blockCount = 0

function filterDynamicByRules(dynamicContent: string) {
  return store.blockRules.some((rule) => {
    try {
      const regex = new RegExp(rule, 'i')
      return regex.test(dynamicContent)
    }
    catch {
      return false
    }
  })
}

function filterDynamic() {
  // 参考自：https://greasyfork.org/zh-CN/scripts/478174/code
  const cards = Array.from(document.querySelectorAll<HTMLDivElement>('.bili-dyn-list__item'))

  const filteredCards = cards.filter((card) => {
    if (card.classList.contains(FILTERED_CLASS) && !configHasChange) {
      return false
    }
    card.classList.add(FILTERED_CLASS)

    if (filterDynamicByRules(card.textContent || '')) {
      return true
    }

    const contexts = Array.from(card.querySelectorAll<HTMLDivElement>('.bili-rich-text__content'))

    return contexts.some((c) => {
      const hasGoodsSpan = c.querySelector('span[data-type="goods"]')
      const hasLotterySpan = c.querySelector('span[data-type="lottery"]')
      const hasVoteSpan = c.querySelector('span[data-type="vote"]')
      return hasGoodsSpan || hasLotterySpan || hasVoteSpan
    })
  })

  filteredCards.forEach((card) => {
    card.remove()
    blockCount++
    if (import.meta.env.DEV) {
      const content = card.textContent?.trim()?.replaceAll('\n', () => '')
      console.log(`已拦截 ${blockCount} 条动态：${content}`)
    }
    view.updateStatInfo(`已拦截 ${blockCount} 条动态`)
  })

  configHasChange = false
}

console.log(`${ID}(v${VERSION})`)

const filterDynamicDebounced = debounce({ delay: 600 }, filterDynamic)
const observer = new MutationObserver(filterDynamicDebounced)
observer.observe(document.body, {
  childList: true,
  subtree: true,
})

store.addConfigChangeListener(() => {
  configHasChange = true
  console.log('屏蔽规则更新，重新过滤动态')
  filterDynamicDebounced()
})

GM_registerMenuCommand('管理屏蔽规则', view.renderConfig)
GM_registerMenuCommand('隐藏/显示统计信息', () => {
  store.toggleShowStat()
  view.renderStat()
})
