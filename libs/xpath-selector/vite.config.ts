import defineConfig from 'lib-default-config'
import { author, description, license, version } from './package.json'

export default defineConfig({
  meta: {
    name: 'XPath Selector',
    namespace: 'xiaohuohumax/userscripts/xpath-selector',
    version,
    author: author.name,
    description,
    license,
  },
  lib: {
    name: 'xpathSelector',
    outDir: '../../dist/',
  },
})
