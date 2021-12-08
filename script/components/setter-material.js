insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-material-picker">
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

    // 初始化
    let theme = this.getAttribute('theme')
    content.querySelectorAll('.material-button').forEach((button) => {
      let material = button.dataset.material
      button.classList.add(`${theme}-material-${material}`)

      let matNo = localStorage.getItem(`${theme}-material`)
      button.classList.toggle('active', material == matNo)
      // button highlight
      // 读取 local，然后设置
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
}

customElements.define('setter-material', MaterialPicker)
