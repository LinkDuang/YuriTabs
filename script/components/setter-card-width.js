insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-card-width">
    <div class="flex items-center justify-start h-16">
          <div class="w-1/4 flex items-center">
            <i class="gg-display-fullwidth"></i>
            <span class="label-text ml-2">卡片宽度</span>
          </div>
          <div class="w-2/4">
            <label for="">
              <span id="widthRangeValue"></span>
              <input id="widthRange" type="range" max="5" min="1" step="1" class="range" />
            </label>
          </div>
        </div>
    </template>
  `
})

class CardWidth extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-card-width')
    let content = templateElem.content.cloneNode(true)

    // 初始化
    let wr = content.querySelector('#widthRange')
    let wrv = content.querySelector('#widthRangeValue')
    let cardWidth = localStorage.getItem('cardWidth')
    if (cardWidth === null) {
      wr.value = 3
      wrv.innerHTML = genCardWidthValue(3)
    } else {
      wr.value = cardWidth
      wrv.innerHTML = genCardWidthValue(cardWidth)
    }

    // 监听器
    wr.addEventListener('input', (event) => {
      let value = event.target.value
      wr.value = value
      wrv.innerHTML = genCardWidthValue(value)
      localStorage.setItem('cardWidth', value)
      __genTabs()
    })

    this.appendChild(content)
  }

  // 首次被插入 DOM 时被调用
  connectedCallback() {}
}

customElements.define('setter-card-width', CardWidth)
