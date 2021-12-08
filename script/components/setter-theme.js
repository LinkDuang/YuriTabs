insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-theme-picker">
      <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex">
          <i class="gg-dark-mode"></i>
          <span class="label-text ml-2">主题色</span>
        </div>
        <div class="btn-group">
          <input
            type="radio"
            name="themes"
            data-title="🌝 浅色"
            data-value="light"
            class="theme-buttons btn btn-sm"
          />
          <input
            type="radio"
            name="themes"
            data-title="🌚 深色"
            data-value="dark"
            class="theme-buttons btn btn-sm"
          />
          <input
            type="radio"
            name="themes"
            data-title="跟随系统"
            data-value="system"
            class="theme-buttons btn btn-sm"
          />
        </div>
      </div>
    </template>
  `
})

class ThemePicker extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-theme-picker')
    let content = templateElem.content.cloneNode(true)

    // 初始化
    this.setThemePicker(content)
    this.setMaterialPickerShow()

    // 监听器
    let buttons = content.querySelectorAll('.theme-buttons')
    buttons.forEach((i) => {
      i.addEventListener('change', (event) => {
        let theme = event.target.dataset.value
        setTheme(theme)
        localStorage.setItem('theme', theme)
        this.setMaterialPickerShow()
        this.setMaterialBackground()
      })
    })

    this.appendChild(content)
  }

  connectedCallback() {}

  setThemePicker(content) {
    let theme = localStorage.getItem('theme')
    if (theme === null || theme === 'system') {
      setTheme('system')
      content.querySelector(`input[data-value='system']`).checked = true
    } else if (theme === 'light') {
      content.querySelector(`input[data-value='light']`).checked = true
      setTheme('light')
    } else if (theme === 'dark') {
      setTheme('dark')
      content.querySelector(`input[data-value='dark']`).checked = true
    }
  }

  setMaterialPickerShow() {
    let theme = localStorage.getItem('theme')
    let light = e(`setter-material[theme='light']`)
    let dark = e(`setter-material[theme='dark']`)

    if (theme === 'system') {
      light.setAttribute('show', 'true')
      dark.setAttribute('show', 'true')
    }
    if (theme === 'light') {
      light.setAttribute('show', 'true')
      dark.setAttribute('show', 'false')
    }
    if (theme === 'dark') {
      light.setAttribute('show', 'false')
      dark.setAttribute('show', 'true')
    }
  }

  setMaterialBackground() {
    // 在切换 theme 的时候，同时切换材质

    // 切换材质具体操作：
    let root = e(`:root`)
    // 清除原来的
    let lastMatClass = root.classList.value
    if (lastMatClass) {
      root.classList.remove(lastMatClass)
    }
    // 切换为当前的
    let theme = root.dataset.theme
    let nextMatNo = localStorage.getItem(`${theme}-material`)
    root.classList.add(`${theme}-material-${nextMatNo}`)
  }
}

customElements.define('setter-theme', ThemePicker)
