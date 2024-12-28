import type Store from './store'
import swal from 'sweetalert'
import { ID } from './constant'

export default class View {
  private statInfo: string = ''
  private statElement: HTMLDivElement = null!

  constructor(private store: Store) {
    this.initStatElement()
    this.store.addConfigChangeListener(() => this.renderStat())
  }

  private async confirm(title: string, icon: string, confirmText: string = '确认'): Promise<boolean> {
    return await swal({
      title,
      icon,
      buttons: {
        confirm: {
          text: confirmText,
          value: true,
        },
      },
    })
  }

  public renderConfig = async () => {
    const element = document.createElement('div')
    const emptyContent = '<div class="empty">这里啥也没有~~~</div>'
    let inputHasFile = false

    element.innerHTML = `<div>
      <input type="file" id="fileInput" accept=".json" style="display: none;">
      <div class="add-rule-container">
        <input type="text" id="addInput" class="swal-content__input" placeholder="请输入屏蔽规则(支持正则表达式)">
        <button id="addButton" class="swal-button">添加</button>
      </div>
      <hr/>
      <div class="rules-container"></div>
    </div>`

    const addInput = element.querySelector('#addInput') as HTMLInputElement
    const addButton = element.querySelector('#addButton') as HTMLButtonElement
    const fileInput = element.querySelector('#fileInput') as HTMLInputElement
    const rulesContainer = element.querySelector('.rules-container') as HTMLDivElement

    const renderRuleItems = () => {
      const ruleItems = this.store.blockRules.map((rule) => {
        return `<div class="rules-item">
        <input type="text" class="swal-content__input" disabled value="${rule}"/>
        <div class="bili-modal__close" data-rule="${rule}"></div>
      </div>`
      })
      rulesContainer.innerHTML = ruleItems.length > 0
        ? ruleItems.join('')
        : emptyContent
    }

    renderRuleItems()

    element.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (target.classList.contains('bili-modal__close')) {
        const rule = target.dataset.rule
        if (this.store.deleteBlockRule(rule)) {
          renderRuleItems()
        }
      }
    })

    addButton.addEventListener('click', () => {
      const rule = addInput.value.trim()
      if (rule) {
        this.store.addBlockRule(rule)
        renderRuleItems()
        addInput.value = ''
      }
    })

    addInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        addButton.click()
      }
    })

    fileInput.addEventListener('change', async () => {
      const files = fileInput.files
      if (files && files.length > 0) {
        const state = await this.store.importConfig(files[0])
        inputHasFile = true
        await this.confirm(`导入${state ? '成功' : '失败'}`, state ? 'success' : 'error')
        this.renderConfig()
      }
    })

    const mode = await swal({
      title: '设置',
      content: {
        element,
      },
      dangerMode: true,
      buttons: {
        clear: {
          text: '清空规则',
          value: 'clear',
          className: 'swal-button--danger',
        },
        export: {
          text: '导出配置',
          value: 'export',
          className: 'swal-button--confirm',
        },
        import: {
          text: '导入配置',
          value: 'import',
          className: 'swal-button--success',
        },
      },
    })

    if (mode === 'clear') {
      const confirm = await await swal({
        title: '确认清空规则？',
        icon: 'warning',
        buttons: {
          close: {
            text: '取消',
            value: false,
          },
          confirm: {
            text: '确认',
            value: true,
            className: 'swal-button--danger',
          },
        },
      })
      if (confirm) {
        this.store.clearBlockRules()
      }
      this.renderConfig()
    }
    else if (mode === 'import') {
      fileInput.click()
      window.addEventListener('focus', () => {
        // 用户未选择文件
        setTimeout(async () => {
          if (inputHasFile) {
            return
          }
          await this.confirm('未选择文件', 'error')
          this.renderConfig()
        }, 300)
      }, { once: true })
    }
    else if (mode === 'export') {
      const state = await this.store.exportConfig()
      await this.confirm(`导出${state ? '成功' : '失败'}`, state ? 'success' : 'error')
      this.renderConfig()
    }
  }

  private initStatElement() {
    const id = `${ID}-stat`
    const statElement = document.getElementById(id)
    if (!statElement) {
      this.statElement = document.createElement('div')
      this.statElement.id = id
      document.body.appendChild(this.statElement)
    }
    else {
      this.statElement = statElement as HTMLDivElement
    }
    this.statElement.addEventListener('click', () => {
      this.renderConfig()
    })
  }

  public renderStat = async () => {
    this.statElement.style.display = this.store.showStat
      ? 'block'
      : 'none'
    this.statElement.innerHTML = this.statInfo
  }

  public updateStatInfo = (statInfo: string) => {
    this.statInfo = statInfo
    this.renderStat()
  }
}
