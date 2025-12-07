import { debounce } from 'radash'
import { ID, VERSION } from 'virtual:meta'

console.log(`${ID}(v${VERSION})`)

function autoClick() {
  const selectors = '.ajax-pagination-btn.color-bg-overlay'
  const moreButton = document.querySelector<HTMLButtonElement>(selectors)
  if (!moreButton) {
    return
  }
  const rect = moreButton.getBoundingClientRect()
  const isVisible = rect.top < window.innerHeight * 2 && rect.bottom > 0
  isVisible && moreButton.click()
}

const handleScroll = debounce({ delay: 100 }, autoClick)
handleScroll()
window.addEventListener('scroll', handleScroll)
