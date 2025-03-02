import { ID, VERSION } from 'virtual:meta'

const THRESHOLD: number = 300
const CLEANED: number = 0

let timer: number = CLEANED

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
        window.open(link.href, '_blank')
      }, THRESHOLD)
    }
  }
})
