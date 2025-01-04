import type { Plugin } from 'vite'
import { loadPackageJSON } from 'local-pkg'

const virtualModuleId = 'virtual:meta'
const resolvedVirtualModuleId = `\0${virtualModuleId}`

export default function vitePluginMeta(): Plugin {
  return {
    name: 'vite-plugin-meta',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const pkg = await loadPackageJSON()
        if (!pkg) {
          throw new Error('Failed to load package.json')
        }
        const meta: Meta = {
          ID: pkg.name || '',
          VERSION: pkg.version || '',
        }
        const exportItems = Object.entries(meta).map(([key, value]) => {
          return `export const ${key} = ${JSON.stringify(value)};`
        })
        return `${exportItems.join('\n')}export default ${JSON.stringify(meta)};`
      }
    },
  }
}
