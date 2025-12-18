import defineConfig from 'lib-default-config'
import { author, description, license, version } from './package.json'

export default defineConfig({
  meta: {
    name: 'Zip Downloader',
    namespace: 'xiaohuohumax/userscripts/zip-downloader',
    version,
    author: author.name,
    description,
    license,
  },
  lib: {
    name: 'zipDownloader',
    outDir: '../../dist/',
  },
})
