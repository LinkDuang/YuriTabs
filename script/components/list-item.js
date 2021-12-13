insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-list-item">
      <div class="m-1 indicator flex items-center">
        <div class="badge badge-primary h-2"></div>
        <div class="list-content ml-4 place-items-center">
          ???
        </div>
      </div>
    </template>
  `
})

class ListItem extends HTMLElement {
  constructor() {
    super()
    let templateElem = e('#template-list-item')
    let content = templateElem.content.cloneNode(true)
    let child = this.innerHTML
    this.innerHTML = ''
    content.querySelector('.list-content').innerHTML = child
    this.appendChild(content)
  }
}

customElements.define('list-item', ListItem)
