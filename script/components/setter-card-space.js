insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-card-space">
      <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex items-center">
          <i class="gg-display-spacing"></i>
          <span class="label-text ml-2">卡片间距</span>
        </div>
        <div class="w-2/4">
          <label for="">
            <span id="cardSpaceValue"></span>
            <input id="cardSpace" type="range" max="5" min="1" step="1" class="range" />
          </label>
        </div>
      </div>
    </template>
  `
})

class CardSpace extends HTMLElement {
  constructor() {
    super()
    let templateElem = e('#template-card-space')
    let content = templateElem.content.cloneNode(true)

    let cardSpace = localStorage.getItem('cardSpace')
    if (cardSpace === null) {
      content.querySelector('#cardSpace').value = 1
      content.querySelector('#cardSpaceValue').innerHTML = genCardSpaceValue(1)
    } else {
      content.querySelector('#cardSpace').value = cardSpace
      content.querySelector('#cardSpaceValue').innerHTML = genCardSpaceValue(cardSpace)
    }
    this.appendChild(content)
  }

  // 首次被插入 DOM 时被调用
  connectedCallback() {
    let range = this.querySelector('#cardSpace')
    range.addEventListener('input', (event) => {
      let value = event.target.value
      this.querySelector('#cardSpace').value = value
      this.querySelector('#cardSpaceValue').innerHTML = genCardSpaceValue(value)
      localStorage.setItem('cardSpace', value)
      __genTabs()
    })
  }
}

customElements.define('setter-card-space', CardSpace)
