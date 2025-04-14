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
      html: `<p style="margin: 0 !important; text-align: left;">是否启用右键复制功能:</p>
      <div class="swal2-radio" style="width: 100%; margin: .75rem 0 !important; text-align: left;">
        <label style="display: inline-block; margin-left: 0 !important;"><input type="radio" name="enable-copy" value="true"><span class="swal2-label">开启</span></label>
        <label style="display: inline-block;"><input type="radio" name="enable-copy" value="false"><span class="swal2-label">关闭</span></label>
      </div>
      <p style="margin: 0 !important; text-align: left;">复制触发模式:</p>
      <select id="copy-trigger-mode" class="swal2-select" style="width: 100%; margin: .75rem 0 !important;">
        <option value="double">右键双击</option>
        <option value="single">右键单击</option>
      </select>
      <p style="margin: 0 !important; text-align: left;">是否启用右键粘贴功能:</p>
      <div class="swal2-radio" style="width: 100%; margin: .75rem 0 !important; text-align: left;">
        <label style="display: inline-block; margin-left: 0 !important;"><input type="radio" name="enable-paste" value="true"><span class="swal2-label">开启</span></label>
        <label style="display: inline-block;"><input type="radio" name="enable-paste" value="false"><span class="swal2-label">关闭</span></label>
      </div>
      <p style="margin: 0 !important; text-align: left;">粘贴触发模式:</p>
      <select id="paste-trigger-mode" class="swal2-select" style="width: 100%; margin: .75rem 0 !important;">
        <option value="double">右键双击</option>
        <option value="single">右键单击</option>
      </select>`,
      willOpen: (popup) => {
        const copyTriggerMode = popup.querySelector('#copy-trigger-mode') as HTMLSelectElement
        const pasteTriggerMode = popup.querySelector('#paste-trigger-mode') as HTMLSelectElement
        copyTriggerMode.value = this.store.copyTrigger
        pasteTriggerMode.value = this.store.pasteTrigger
        const enableCopy = popup.querySelector(`input[name="enable-copy"][value="${this.store.enableCopy}"]`) as HTMLInputElement
        enableCopy.checked = true
        const enablePaste = popup.querySelector(`input[name="enable-paste"][value="${this.store.enablePaste}"]`) as HTMLInputElement
        enablePaste.checked = true
      },
      preConfirm: () => {
        const copyTriggerMode = document.getElementById('copy-trigger-mode') as HTMLSelectElement
        const pasteTriggerMode = document.getElementById('paste-trigger-mode') as HTMLSelectElement
        const enableCopy = document.querySelector(`input[name="enable-copy"]:checked`) as HTMLInputElement
        const enablePaste = document.querySelector(`input[name="enable-paste"]:checked`) as HTMLInputElement

        return {
          copyTriggerMode: copyTriggerMode.value,
          pasteTriggerMode: pasteTriggerMode.value,
          enableCopy: enableCopy.value === 'true',
          enablePaste: enablePaste.value === 'true',
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

    this.store.copyTrigger = value.copyTriggerMode
    this.store.pasteTrigger = value.pasteTriggerMode
    this.store.enableCopy = value.enableCopy
    this.store.enablePaste = value.enablePaste

    await Toast.fire({
      icon: 'success',
      title: '设置已保存',
    })
  }
}
