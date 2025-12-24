import type { Target } from './utils'
import { GM_download, GM_registerMenuCommand, GM_setClipboard } from '$'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import QRCode from 'qrcode'
import Swal from 'sweetalert'
import { ID, VERSION } from 'virtual:meta'

import { decodeQrCode, isUrl, tryGetUrls } from './utils'

console.log(`${ID}(v${VERSION})`)

let target: Target | null = null
let selection: string | null = null

function handleDecodeQrCodeMenuClick() {
  if (selection !== null) {
    const urls = tryGetUrls(selection)
    if (urls.length === 0) {
      return Notify.warning('选择的文本中未找到有效的链接, 请确认文本是否有效')
    }
    target = urls[0]
  }

  if (target === null) {
    return Notify.warning('未选择图片或图片链接, 请先右键选择图片或图片链接')
  }

  decodeQrCode(target).then((results) => {
    if (results.length === 0) {
      return Notify.warning('未识别到二维码, 请确认图片是否有效')
    }
    const isMultiple = results.length > 1

    const element = document.createElement('div')
    for (const [index, result] of results.entries()) {
      const resultButton = document.createElement('button')
      resultButton.innerHTML = result
      resultButton.style.fontSize = '16px'
      resultButton.style.maxHeight = '200px'
      resultButton.style.overflowY = 'auto'
      resultButton.style.width = '100%'
      resultButton.className = 'swal-button swal-button--cancel'
      if (index > 0) {
        resultButton.style.marginTop = '10px'
      }
      resultButton.dataset.result = result
      if (isUrl(result)) {
        const div = document.createElement('div')
        div.style.display = 'flex'
        const a = document.createElement('a')
        a.href = result
        a.target = '_blank'
        a.textContent = '跳转'
        a.style.marginLeft = '10px'
        a.style.fontSize = '14px'
        a.style.flexShrink = '0'
        a.style.display = 'inline-flex'
        a.style.alignItems = 'center'
        a.style.justifyContent = 'center'
        a.className = 'swal-button swal-button--cancel'
        div.appendChild(resultButton)
        div.appendChild(a)
        element.appendChild(div)
      }
      else {
        element.appendChild(resultButton)
      }
    }

    element.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement && event.target.dataset.result) {
        GM_setClipboard(event.target.dataset.result, 'text')
        Notify.success('已复制到剪贴板')
        Swal.close!()
      }
    })

    Swal({
      icon: 'success',
      title: '识别成功',
      text: isMultiple ? '识别到多个二维码, 点击文本内容可单独复制' : undefined,
      content: {
        element,
      },
      buttons: {
        confirm: {
          text: isMultiple ? '全部复制到剪贴板' : '复制到剪贴板',
          value: 'copy',
        },
      },
    }).then((result) => {
      if (result === 'copy') {
        GM_setClipboard(results.join('\n'), 'text')
        Notify.success('已复制到剪贴板')
      }
    })
  }).catch((error) => {
    Notify.failure('识别失败, 请检查图片是否有效')
    console.error(error)
  }).finally(() => (target = null))
}

async function handleEncodeQrCodeMenuClick() {
  if (selection === null) {
    return Notify.warning('未选择文字, 请先右键选择文字')
  }

  const dataUrl = await QRCode.toDataURL(selection)
  const element = document.createElement('img')
  element.src = dataUrl
  element.style.margin = '0 auto'

  Swal({
    icon: 'success',
    title: '生成二维码成功',
    content: {
      element,
    },
    buttons: {
      confirm: {
        text: '保存到本地',
        value: 'save',
      },
    },
  }).then((result) => {
    if (result === 'save') {
      GM_download({ name: 'qrcode.png', url: dataUrl, saveAs: true })
    }
  }).finally(() => (selection = null))
}

GM_registerMenuCommand('Decode QR Code', handleDecodeQrCodeMenuClick)
GM_registerMenuCommand('Encode QR Code', handleEncodeQrCodeMenuClick)

document.addEventListener('contextmenu', (event) => {
  if (event.target instanceof HTMLImageElement || event.target instanceof HTMLCanvasElement) {
    target = event.target
  }
})

document.addEventListener('selectionchange', () => {
  selection = document.getSelection()?.toString() || null
})
