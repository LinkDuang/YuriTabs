insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-mark-book">
      
    </template>
  `
})

class MarkBook extends HTMLElement {
  constructor() {
    super()
    let templateElem = e('#template-mark-book')
    let content = templateElem.content.cloneNode(true)
    // let child = this.innerHTML
    // this.innerHTML = ''
    // content.querySelector('.list-content').innerHTML = child
    this.appendChild(content)
  }
}

customElements.define('mark-book', MarkBook)
