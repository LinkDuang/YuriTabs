insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-setter-icon-style">
    <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex">
          <i class="gg-edit-noise "></i>
          <span class="label-text ml-2">图标风格</span>
        </div>
    
        <div class="btn-group">
          <input
            type="radio"
            name="iconSytle"
            data-title="网站图标"
            data-key="icon"
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="iconSytle"
            data-title="灰阶"
            data-key="gray"
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="iconSytle"
            data-title="彩虹"
            data-key="rainbow"
            class="theme-buttons btn btn-sm normal-case"
          />
        </div>
      </div>
    </template>
  `
})

class SetterIconSytle extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-setter-icon-style')
    let content = templateElem.content.cloneNode(true)

    // 初始化
    let iconStyle = localStorage.getItem('iconStyle')
    if (iconStyle === null || iconStyle === 'icon') {
      content.querySelector(`input[data-key='icon']`).checked = true
    } else if (iconStyle === 'gray') {
      content.querySelector(`input[data-key='gray']`).checked = true
    } else if (iconStyle === 'rainbow') {
      content.querySelector(`input[data-key='rainbow']`).checked = true
    }

    // 监听器
    let buttons = content.querySelectorAll(`input[name='iconSytle']`)
    buttons.forEach((i) => {
      i.addEventListener('change', (event) => {
        let style = event.target.dataset.key
        localStorage.setItem('iconStyle', style)
        __genTabs()
      })
    })

    // render
    this.appendChild(content)
  }
}

customElements.define('setter-icon-style', SetterIconSytle)
