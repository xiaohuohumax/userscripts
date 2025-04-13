import { GM_addValueChangeListener, GM_getValue, GM_setValue } from '$'
import { ID } from 'virtual:meta'

const LAST_VERSION = 2

interface ConfigV0 {
  version: 0
}

interface ConfigV1 {
  version: 1
  active: boolean
}

export interface Config {
  version: 2
  active: boolean
  trigger: 'double' | 'single'
}

type UnFormatConfig = ConfigV0 | ConfigV1 | Config

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
      active: true,
      trigger: 'single',
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

  public get active() {
    return this.config.active
  }

  public set active(value: Config['active']) {
    this.config.active = value
    this.saveConfig()
  }

  public get trigger() {
    return this.config.trigger
  }

  public set trigger(value: Config['trigger']) {
    this.config.trigger = value
    this.saveConfig()
  }
}
