import type Store from './store'
import swal from 'sweetalert'

export default class View {
  constructor(private store: Store) { }

  public toggleActive = () => {
    this.store.active = !this.store.active
    swal(`超链接右键已切换为 [${this.store.active ? '前台' : '后台'}] 模式打开`, '', 'success')
  }
}
