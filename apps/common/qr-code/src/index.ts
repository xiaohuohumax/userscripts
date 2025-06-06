import { GM_registerMenuCommand, GM_setClipboard } from '$'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { ID, VERSION } from 'virtual:meta'

import { decodeQrCode } from './utils'

console.log(`${ID}(v${VERSION})`)

let image: HTMLImageElement | null = null

GM_registerMenuCommand('Decode QR Code', () => {
  if (!image) {
    return Notify.warning('未选择图片, 请先右键选择图片')
  }
  decodeQrCode(image.src).then((data) => {
    if (data === undefined) {
      return Notify.warning('未识别到二维码, 请确认图片是否有效')
    }
    Notify.success('识别成功, 已复制到剪贴板')
    GM_setClipboard(data, 'text')
  }).catch((error) => {
    Notify.failure('识别失败, 请检查图片是否有效')
    console.error(error)
  }).finally(() => (image = null))
})

document.addEventListener('contextmenu', (event) => {
  if (event.target instanceof HTMLImageElement) {
    image = event.target
  }
})
