import { BlobWriter, HttpReader, ZipWriter } from '@zip.js/zip.js'
import pLimit from 'p-limit'

export interface Resource {
  name: string
  url: string | URL
}

export interface Options {
  filename: string
  resources: Resource[]
  concurrency?: number
  onProgress?: (index: number) => Promise<void>
}

export default async function downloader(options: Options): Promise<void> {
  const writer = new ZipWriter(new BlobWriter('application/zip'))
  const limit = pLimit(options.concurrency || 10)
  await Promise.all(options.resources.map((resource, index) => limit(async () => {
    await options.onProgress?.(index)
    return writer.add(resource.name, new HttpReader(resource.url))
  })))
  const blob = await writer.close()
  const url = URL.createObjectURL(blob)
  GM_download(url, options.filename)
}
