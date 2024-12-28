import { GM_addValueChangeListener, GM_getValue, GM_setValue } from '$'
import { ID } from './constant'

const LAST_VERSION = 1

interface Config {
  version: 1
  blockRules: string[]
  showStat: boolean
}

interface ConfigV0 {
  version: 0
}

type UnFormatConfig = ConfigV0 | Config

interface ConfigChangeListener {
  (config: Config): void
}

export default class Store {
  private config: Config = null!
  private readonly ID: string = `${ID}-config`
  private listeners: ConfigChangeListener[] = []

  constructor() {
    this.loadConfig()
    GM_addValueChangeListener<UnFormatConfig>(this.ID, (_key, _oldValue, newValue, remote) => {
      if (remote) {
        this.config = this.configFormat(newValue)
        this.listeners.forEach(listener => listener(this.config))
      }
    })
  }

  public loadConfig() {
    const config = GM_getValue<UnFormatConfig | undefined>(this.ID, undefined)
    this.config = this.configFormat(config)
    !config && this.saveConfig()
    console.log('加载配置：', this.config)
  }

  private saveConfig() {
    GM_setValue(this.ID, this.config)
    this.listeners.forEach(listener => listener(this.config))
  }

  public addConfigChangeListener(listener: ConfigChangeListener) {
    this.listeners.push(listener)
  }

  private configFormat(data: UnFormatConfig | undefined): Config {
    const config: Config = {
      version: LAST_VERSION,
      blockRules: [],
      showStat: false,
    }
    if (!data) {
      return config
    }
    if (data.version === 0) {
      // v0 => v1
      return config
    }
    // ...
    return Object.assign(config, data)
  }

  public addBlockRule(rule: string | string[] | undefined) {
    if (!rule) {
      return
    }
    for (const r of Array.isArray(rule) ? rule : [rule]) {
      const rTrim = r.trim()
      if (rTrim === '' || this.config.blockRules.includes(rTrim)) {
        continue
      }
      this.config.blockRules.unshift(rTrim)
    }

    this.saveConfig()
  }

  public deleteBlockRule(rule: string | undefined): boolean {
    if (!rule) {
      return false
    }
    const index = this.config.blockRules.indexOf(rule)
    if (index === -1) {
      return false
    }
    this.config.blockRules.splice(index, 1)
    this.saveConfig()
    return true
  }

  public updateBlockRule(oldRule: string, newRule: string) {
    const index = this.config.blockRules.indexOf(oldRule)
    if (index === -1) {
      return
    }
    this.config.blockRules[index] = newRule
    this.saveConfig()
  }

  public clearBlockRules() {
    this.config.blockRules = []
    this.saveConfig()
  }

  public get blockRules(): string[] {
    return this.config.blockRules
  }

  public get showStat(): boolean {
    return this.config.showStat
  }

  public async exportConfig(): Promise<boolean> {
    try {
      const data = JSON.stringify(this.config, null, 2)
      const blob = new Blob([data], { type: 'text/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${ID}-config.json`
      a.click()
      URL.revokeObjectURL(url)
      return true
    }
    catch {
      return false
    }
  }

  public async importConfig(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        try {
          const oldRules = this.config.blockRules
          this.config = this.configFormat(JSON.parse(reader.result as string))
          this.addBlockRule(oldRules)
          resolve(true)
        }
        catch {
          resolve(false)
        }
      }
    })
  }

  public toggleShowStat() {
    this.config.showStat = !this.config.showStat
    this.saveConfig()
  }
}
