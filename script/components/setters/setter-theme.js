insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-theme-picker">
      <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex">
          <i class="gg-dark-mode"></i>
          <span class="label-text ml-2">δΈ»ι’θ²</span>
        </div>
        <div class="btn-group">
          <input
            type="radio"
            name="themes"
            data-title="π ζ΅θ²"
            data-value="light"
            class="theme-buttons btn btn-sm"
          />
          <input
            type="radio"
            name="themes"
            data-title="π ζ·±θ²"
            data-value="dark"
            class="theme-buttons btn btn-sm"
          />
          <input
            type="radio"
            name="themes"
            data-title="θ·ιη³»η»"
            data-value="system"
            class="theme-buttons btn btn-sm"
          />
        </div>
        <label class="cursor-pointer label flex items-center ml-auto">
          <span class="label-text text-xs mr-1">ιθΉη―</span>
          <input id="neon-toggle" type="checkbox" checked="checked" class="toggle" />
        </label>
      </div>
    </template>
  `
})

class ThemePicker extends HTMLElement {
  constructor() {
    super()
    // ζι 
    let templateElem = e('#template-theme-picker')
    let content = templateElem.content.cloneNode(true)

    // εε§ε
    this.setThemePicker(content)
    this.setMaterialPickerShow()

    // ηε¬ε¨
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
    // ε¨εζ’ theme ηζΆεοΌεζΆεζ’ζθ΄¨

    // εζ’ζθ΄¨ε·δ½ζδ½οΌ
    let root = e(`:root`)
    // ζΈι€εζ₯η
    let lastMatClass = root.classList.value
    if (lastMatClass) {
      root.classList.remove(lastMatClass)
    }
    // εζ’δΈΊε½εη
    let theme = root.dataset.theme
    let nextMatNo = localStorage.getItem(`${theme}-material`)
    root.classList.add(`${theme}-material-${nextMatNo}`)
  }
}

customElements.define('setter-theme', ThemePicker)
