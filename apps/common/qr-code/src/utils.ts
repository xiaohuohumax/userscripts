import { GM_xmlhttpRequest } from '$'

import jsQR from 'jsqr'

export async function decodeQrCode(url: string): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      const { width, height } = image
      const canvas = new OffscreenCanvas(width, height)
      const context = canvas.getContext('2d')!
      context.drawImage(image, 0, 0)
      const imageData = context.getImageData(0, 0, width, height)
      resolve(jsQR(imageData.data, width, height)?.data.replace(/^\s+|\s+$/g, ''))
    }

    image.onerror = reject

    GM_xmlhttpRequest({
      method: 'GET',
      url,
      anonymous: true,
      responseType: 'blob',
      onload: (response) => {
        if (response.status !== 200) {
          reject(new Error(`Failed to load image: ${response.status} ${response.statusText}`))
          return
        }
        image.src = URL.createObjectURL(response.response)
      },
      onerror: reject,
    })
  })
}
