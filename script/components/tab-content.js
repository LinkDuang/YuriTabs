insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="tab-content"></template>
  `
})

class TabContent extends HTMLElement {
  constructor() {
    super()
    let templateElem = e('#tab-content')
    let content = templateElem.content.cloneNode(true)
    this.appendChild(content)
  }

  static get observedAttributes() {
    return ['show']
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    // 如果没有设置 show 属性，则不显示
    if (attrName === 'show') {
      console.log('show 变化', newValue)
      this.classList.toggle('hidden', newValue === 'false')
    }
  }
}

customElements.define('tab-content', TabContent)
