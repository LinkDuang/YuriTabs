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
    let templateElem = e('#template-card-width')
    let content = templateElem.content.cloneNode(true)

    let cardWidth = localStorage.getItem('cardWidth')
    if (cardWidth === null) {
      content.querySelector('#widthRange').value = 3
      content.querySelector('#widthRangeValue').innerHTML = genCardWidthValue(3)
    } else {
      content.querySelector('#widthRange').value = cardWidth
      content.querySelector('#widthRangeValue').innerHTML = genCardWidthValue(cardWidth)
    }
    this.appendChild(content)
  }

  // 首次被插入 DOM 时被调用
  connectedCallback() {
    let range = this.querySelector('#widthRange')
    range.addEventListener('input', (event) => {
      let value = event.target.value
      this.querySelector('#widthRange').value = value
      this.querySelector('#widthRangeValue').innerHTML = genCardWidthValue(value)
      localStorage.setItem('cardWidth', value)
      __genTabs()
    })
  }
}

customElements.define('setter-card-width', CardWidth)
