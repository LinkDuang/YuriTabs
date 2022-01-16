insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-material-picker">
      <style>
        /* 材质选择按钮 */
        .material-button.active {
          border: #560df8 3px solid;
        }
        .material-button.active:hover {
          border: #581dd6 3px solid;
        }
      </style>
      <div class="flex items-center justify-start h-16 mt-4">
        <div class="w-1/4 flex items-center">
          <i class="gg-color-bucket ml-1"></i>
          <span class="name-label label-text ml-5"></span>
        </div>

        <div class="w-3/4 flex mt-8">
          <div class="space-x-2 carousel carousel-center rounded-sm">
            <div data-material="none" class="material-button w-20 h-16 btn btn-outline btn-square btn-lg">无</div>
            <div data-material="1" class="material-button border-2 w-20 h-16 btn btn-square btn-lg"></div>
            <div data-material="2" class="material-button border-2 w-20 h-16 btn btn-square btn-lg"></div>
            <div data-material="3" class="material-button border-2 w-20 h-16 btn btn-square btn-lg"></div>
            <div data-material="4" class="material-button border-2 w-20 h-16 btn btn-square btn-lg"></div>
          </div>
        </div>
      </div>
    </template>
  `
})

class MaterialPicker extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-material-picker')
    let content = templateElem.content.cloneNode(true)

    // 初始化，默认值
    let theme = this.getAttribute('theme')
    let matNo = localStorage.getItem(`${theme}-material`)
    if (matNo === null) {
      matNo = '2'
      localStorage.setItem(`${theme}-material`, '2')
    }

    // 初始化材质按钮
    content.querySelectorAll('.material-button').forEach((button) => {
      let material = button.dataset.material
      button.classList.add(`${theme}-material-${material}`)
      button.classList.toggle('active', material == matNo)
    })
    content.querySelector('.name-label').innerHTML = this.getAttribute('name')
    this.changeMaterial()

    // 监听器
    let buttons = content.querySelectorAll('.material-button')
    buttons.forEach((i) => {
      i.addEventListener('click', (event) => {
        let matNo = event.target.dataset.material
        buttons.forEach((i) => {
          i.classList.remove('active')
        })
        event.target.classList.add('active')
        localStorage.setItem(`${theme}-material`, matNo)
        this.changeMaterial()
      })
    })
    this.appendChild(content)
  }

  changeMaterial() {
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

  static get observedAttributes() {
    return ['show']
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    // 如果没有设置 show 属性，则不显示
    if (attrName === 'show') {
      this.classList.toggle('hidden', newValue === 'false')
    }
  }
}

customElements.define('setter-material', MaterialPicker)
