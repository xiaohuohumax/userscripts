import { GM_xmlhttpRequest } from '$'

import jsQR from 'jsqr'

export async function decodeQrCode(url: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      const results = []

      const { width, height } = image
      const canvas = new OffscreenCanvas(width, height)
      const context = canvas.getContext('2d')!
      context.drawImage(image, 0, 0)

      while (true) {
        const imageData = context.getImageData(0, 0, width, height)
        const code = jsQR(imageData.data, width, height)
        if (!code) {
          break
        }
        const result = code.data.replace(/^\s+|\s+$/g, '')

        // 将 Canvas 中的已读取二维码用白色多边形覆盖掉, 再次读取其他的二维码
        context.fillStyle = 'white'
        context.beginPath()
        const { topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner } = code.location
        context.moveTo(topLeftCorner.x, topLeftCorner.y)
        context.lineTo(topRightCorner.x, topRightCorner.y)
        context.lineTo(bottomRightCorner.x, bottomRightCorner.y)
        context.lineTo(bottomLeftCorner.x, bottomLeftCorner.y)
        context.lineTo(topLeftCorner.x, topLeftCorner.y)
        context.fill()
        context.closePath()

        results.push(result)
      }

      resolve(results)
    }

    image.onerror = reject

    GM_xmlhttpRequest({
      method: 'GET',
      url,
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
