import { GM_registerMenuCommand, GM_setClipboard } from '$'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import swal from 'sweetalert'
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

    const element = document.createElement('div')
    element.textContent = data
    element.style.fontSize = '16px'
    element.style.padding = '10px'
    element.style.border = '1px solid #ccc'
    element.style.borderRadius = '5px'
    element.style.maxHeight = '200px'
    element.style.overflowY = 'auto'

    swal({
      icon: 'success',
      title: '识别成功',
      content: {
        element,
      },
      buttons: {
        confirm: {
          text: '复制到剪贴板',
          value: 'copy',
        },
      },
    }).then((result) => {
      if (result === 'copy') {
        GM_setClipboard(data, 'text')
        Notify.success('已复制到剪贴板')
      }
    })
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
