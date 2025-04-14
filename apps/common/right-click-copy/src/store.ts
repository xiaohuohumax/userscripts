import { GM_addValueChangeListener, GM_getValue, GM_setValue } from '$'
import { ID } from 'virtual:meta'

const LAST_VERSION = 1

interface ConfigV0 {
  version: 0
}

export interface Config {
  version: 1
  enableCopy: boolean
  enablePaste: boolean
  copyTrigger: 'double' | 'single'
  pasteTrigger: 'double' | 'single'
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
      enableCopy: true,
      enablePaste: true,
      copyTrigger: 'double',
      pasteTrigger: 'double',
    }
    if (!data) {
      return config
    }
    if (data.version === 0) {
      // v0 => v1
      // return config
    }
    // ...
    return Object.assign(config, data)
  }

  public get copyTrigger() {
    return this.config.copyTrigger
  }

  public set copyTrigger(value: Config['copyTrigger']) {
    this.config.copyTrigger = value
    this.saveConfig()
  }

  public get pasteTrigger() {
    return this.config.pasteTrigger
  }

  public set pasteTrigger(value: Config['pasteTrigger']) {
    this.config.pasteTrigger = value
    this.saveConfig()
  }

  public get enableCopy() {
    return this.config.enableCopy
  }

  public set enableCopy(value: Config['enableCopy']) {
    this.config.enableCopy = value
    this.saveConfig()
  }

  public get enablePaste() {
    return this.config.enablePaste
  }

  public set enablePaste(value: Config['enablePaste']) {
    this.config.enablePaste = value
    this.saveConfig()
  }
}
