import type Store from './store'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})

export default class View {
  constructor(private store: Store) { }

  public config = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: '设置',
      html: `<p style="margin: 0 !important; text-align: left;">超链接打开模式:</p>
      <select id="active-mode" class="swal2-select" style="width: 100%; margin: .75rem 0 !important;">
        <option value="background">后台</option>
        <option value="foreground">前台</option>
      </select>
      <p style="margin: 0 !important; text-align: left;">超链接触发模式:</p>
      <select id="trigger-mode" class="swal2-select" style="width: 100%; margin: .75rem 0 !important;">
        <option value="double">右键双击</option>
        <option value="single">右键单击</option>
      </select>`,
      willOpen: (popup) => {
        const activeMode = popup.querySelector('#active-mode') as HTMLSelectElement
        const triggerMode = popup.querySelector('#trigger-mode') as HTMLSelectElement
        activeMode.value = this.store.active ? 'foreground' : 'background'
        triggerMode.value = this.store.trigger
      },
      preConfirm: () => {
        const activeMode = document.getElementById('active-mode') as HTMLSelectElement
        const triggerMode = document.getElementById('trigger-mode') as HTMLSelectElement
        return {
          activeMode: activeMode.value,
          triggerMode: triggerMode.value,
        }
      },
      showCancelButton: true,
      confirmButtonText: '保存',
      cancelButtonText: '取消',
    })

    if (!isConfirmed) {
      await Toast.fire({
        icon: 'warning',
        title: '已取消设置',
      })
      return
    }

    this.store.active = value.activeMode === 'foreground'
    this.store.trigger = value.triggerMode

    await Toast.fire({
      icon: 'success',
      title: '设置已保存',
    })
  }
}
