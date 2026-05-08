import { GM_registerMenuCommand } from '$'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import QRCode from 'qrcode'
import { ID, VERSION } from 'virtual:meta'
import { decodeQrCode, getFirstUrl, type Target, targetToImage } from './utils'
import { showDecodeResults, showEncodeQrCode } from './view'

let target: Target | undefined
let selection: string | undefined

function handleDecodeQrCode() {
  if (selection !== undefined) {
    const url = getFirstUrl(selection)
    if (url === undefined) {
      return Notify.warning('选择的文本中未找到有效的链接, 请先右键选择有效的链接')
    }
    target = url
  }

  if (target === undefined) {
    return Notify.warning('未选择图片或图片链接, 请先右键选择图片或图片链接')
  }

  targetToImage(target)
    .then(decodeQrCode)
    .then(showDecodeResults)
    .catch(error => Notify.failure(error.message))
    .finally(() => target = undefined)
}

async function handleEncodeQrCode() {
  if (selection === undefined) {
    return Notify.warning('未选择文字, 请先右键选择文字')
  }

  QRCode.toDataURL(selection)
    .catch((error) => { throw new Error(`生成二维码失败: ${error.message}`) })
    .then(showEncodeQrCode)
    .catch(error => Notify.failure(error.message))
    .finally(() => selection = undefined)
}

console.log(`${ID}(v${VERSION})`)

GM_registerMenuCommand('识别二维码 (Decode QR Code)', handleDecodeQrCode)
GM_registerMenuCommand('生成二维码 (Encode QR Code)', handleEncodeQrCode)

document.addEventListener('contextmenu', (event) => {
  if (event.target instanceof HTMLImageElement || event.target instanceof HTMLCanvasElement) {
    target = event.target
  }
})

document.addEventListener('selectionchange', () => {
  selection = document.getSelection()?.toString() || ''
  selection = selection.length > 0 ? selection : undefined
})
