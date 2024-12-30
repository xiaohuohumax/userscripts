import { GM_addValueChangeListener, GM_getValue, GM_setValue } from '$'

type State = 'desc' | 'asc' | 'default'

interface ChangeListener {
  (state: State): void
}

export default class Store {
  state: State = 'default'
  private listeners: ChangeListener[] = []
  private readonly SORT_ICON_MAP: Record<State, string> = {
    desc: '▴',
    asc: '▾',
    default: '=',
  }

  constructor() {
    this.state = GM_getValue('state', 'default') as State
    GM_addValueChangeListener('state', (_key, _oldValue, newValue, remote) => {
      if (remote) {
        this.state = newValue as State
        this.listeners.forEach(listener => listener(this.state))
      }
    })
  }

  addChangeListener(listener: ChangeListener) {
    this.listeners.push(listener)
  }

  toggleState() {
    const states = Object.keys(this.SORT_ICON_MAP) as State[]
    this.state = states[(states.indexOf(this.state) + 1) % states.length]
    GM_setValue('state', this.state)
  }

  updateState(state: State) {
    this.state = state
    GM_setValue('state', this.state)
  }

  get sortIcon() {
    return this.SORT_ICON_MAP[this.state]
  }
}
