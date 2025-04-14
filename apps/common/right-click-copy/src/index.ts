import { GM_registerMenuCommand, GM_setClipboard } from '$'
import { ID, VERSION } from 'virtual:meta'
import Store from './store'
import View from './view'

const THRESHOLD: number = 300
const CLEANED: number = 0

let timer: number = CLEANED
const store = new Store()
const view = new View(store)

console.log(`${ID}(v${VERSION})`)

function copy(selection?: string) {
  selection && GM_setClipboard(selection, 'text')
}

async function paste(target: HTMLInputElement | HTMLTextAreaElement, isContenteditable: boolean, isInput: boolean) {
  const clipboardContext = await navigator.clipboard.readText()
  if (isContenteditable) {
    const range = window.getSelection()!.getRangeAt(0)
    range.deleteContents()
    range.insertNode(document.createTextNode(clipboardContext))
  }
  else if (isInput) {
    target.value = clipboardContext.trim()
  }
}

document.addEventListener('contextmenu', async (e: MouseEvent) => {
  const target = e.target as HTMLElement | null
  if (!target) {
    return
  }
  const selection = window.getSelection()?.toString()
  const isContenteditable = target.hasAttribute('contenteditable')
  const isInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement

  const isCopy = !!selection && !isInput

  if (!((isCopy && store.enableCopy) || ((isInput || isContenteditable) && store.enablePaste))) {
    return
  }

  if (timer > CLEANED) {
    // double click
    clearTimeout(timer)
    timer = CLEANED
    if (store.copyTrigger === 'double' && isCopy) {
      e.preventDefault()
      copy(selection)
      return
    }
    if (store.pasteTrigger === 'double' && isInput) {
      e.preventDefault()
      await paste(target, isContenteditable, isInput)
      return
    }
    return
  }

  if (store.copyTrigger === 'single') {
    e.preventDefault()
  }

  timer = setTimeout(() => {
    // single click
    timer = CLEANED
    if (store.copyTrigger === 'single' && isCopy) {
      copy(selection)
      return
    }
    if (store.pasteTrigger === 'single' && isInput) {
      paste(target, isContenteditable, isInput)
    }
  }, THRESHOLD)
})

GM_registerMenuCommand('修改配置', view.config)
