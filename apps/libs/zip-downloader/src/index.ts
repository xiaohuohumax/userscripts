import { BlobReader, BlobWriter, HttpReader, ZipWriter } from '@zip.js/zip.js'
import pLimit from 'p-limit'

export interface UrlResource {
  name: string
  url: string | URL
}

export interface BlobResource {
  name: string
  blob: Blob
}

function isBlobResource(resource: Resource): resource is BlobResource {
  return (resource as BlobResource).blob instanceof Blob
}

export type Resource = UrlResource | BlobResource

interface OptionsBase {
  resources: Resource[]
  concurrency?: number
  onProgress?: (index: number) => Promise<void>
}

export interface SaveOptions extends OptionsBase {
  filename: string
}

function isSaveOptions(options: Options): options is SaveOptions {
  return 'filename' in options
}

export interface ZipOptions extends OptionsBase { }

export type Options = ZipOptions | SaveOptions

export default async function zipDownloader(options: SaveOptions): Promise<void>
export default async function zipDownloader(options: ZipOptions): Promise<Blob>
export default async function zipDownloader(options: Options): Promise<void | Blob> {
  const writer = new ZipWriter(new BlobWriter('application/zip'))
  const limit = pLimit(options.concurrency || 10)
  await Promise.all(options.resources.map((resource, index) => limit(async () => {
    await options.onProgress?.(index)
    const reader = isBlobResource(resource)
      ? new BlobReader(resource.blob)
      : new HttpReader(resource.url)
    return writer.add(resource.name, reader)
  })))
  const blob = await writer.close()
  if (!isSaveOptions(options)) {
    return blob
  }
  GM_download(URL.createObjectURL(blob), options.filename)
}
