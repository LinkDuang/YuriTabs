insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-card-space">
      <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex items-center">
          <i class="gg-display-spacing"></i>
          <span class="label-text ml-2">按钮间距</span>
        </div>
        <div class="w-3/4">
          <label for="">
            <span id="cardSpaceValue"></span>
            <input id="cardSpace" type="range" max="8" min="1" step="1" class="range" />
          </label>
        </div>
      </div>
    </template>
  `
})

class CardSpace extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-card-space')
    let content = templateElem.content.cloneNode(true)
    
    // 初始化
    let cardSpace = localStorage.getItem('cardSpace')
    let cs = content.querySelector('#cardSpace')
    let csv = content.querySelector('#cardSpaceValue')
    if (cardSpace === null) {
      cs.value = 1
      csv.innerHTML = genCardSpaceValue(1)
    } else {
      cs.value = cardSpace
      csv.innerHTML = genCardSpaceValue(cardSpace)
    }

    // 监听器
    cs.addEventListener('input', (event) => {
      let value = event.target.value
      cs.value = value
      csv.innerHTML = genCardSpaceValue(value)
      localStorage.setItem('cardSpace', value)
      __genTabs()
    })
    
    this.appendChild(content)
  }

  // 首次被插入 DOM 时被调用
  connectedCallback() {}
}

customElements.define('setter-card-space', CardSpace)
