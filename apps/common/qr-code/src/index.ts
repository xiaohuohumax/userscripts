import type { ImageElement } from './utils'
import { GM_registerMenuCommand, GM_setClipboard } from '$'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import Swal from 'sweetalert'
import { ID, VERSION } from 'virtual:meta'
import { decodeQrCode, isUrl } from './utils'

console.log(`${ID}(v${VERSION})`)

let image: ImageElement | null = null

GM_registerMenuCommand('Decode QR Code', () => {
  if (!image) {
    return Notify.warning('未选择图片, 请先右键选择图片')
  }

  decodeQrCode(image).then((results) => {
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
  }).finally(() => (image = null))
})

document.addEventListener('contextmenu', (event) => {
  if (event.target instanceof HTMLImageElement || event.target instanceof HTMLCanvasElement) {
    image = event.target
  }
})
