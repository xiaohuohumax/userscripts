import { GM_xmlhttpRequest } from '$'
import getUrls from 'get-urls'
import jsQR from 'jsqr'

export type Target = HTMLImageElement | HTMLCanvasElement | URL

export function getFirstUrl(text: string): URL | undefined {
  return Array.from(getUrls(text)).map(url => new URL(url)).shift()
}

export async function targetToImage(target: Target): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = event => reject(new Error(`加载图片数据异常: ${event.toString()}`))
    if (target instanceof HTMLImageElement || target instanceof URL) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: target instanceof URL ? target.toString() : target.src,
        responseType: 'blob',
        onload: (response) => {
          if (response.status !== 200) {
            reject(new Error(`获取图片数据异常: ${response.status} ${response.statusText}`))
            return
          }
          image.src = URL.createObjectURL(response.response)
        },
        onerror: event => reject(new Error(`获取图片数据异常: ${event.error}`)),
      })
    }
    else {
      image.src = target.toDataURL()
    }
  })
}

export function decodeQrCode(image: HTMLImageElement): string[] {
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

  return results
}
