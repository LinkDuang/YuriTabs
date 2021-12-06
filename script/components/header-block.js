insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="page-header-block">
      <div class="hola-container h-48 w-screen flex items-center justify-center text-5xl select-none">
        <span class="neon-text" id="hola-b">Hola Yuri Tabs</span>
        <span class="absolute" id="hola-f">Hola Yuri Tabs</span>
      </div>
      <label for="setting-modal" class="btn btn-circle btn-ghost fixed right-5 top-5">
        <i class="gg-bulb"></i>
      </label>
    </template>
  `
})

class HeaderBlock extends HTMLElement {
  constructor() {
    super()
    let templateElem = e('#page-header-block')
    let content = templateElem.content.cloneNode(true)
    let holaText = localStorage.getItem('hola')
    if (holaText !== null) {
      content.querySelector('#hola-b').innerHTML = holaText
      content.querySelector('#hola-f').innerHTML = holaText
    }
    this.appendChild(content)
  }
}

customElements.define('header-block', HeaderBlock)
