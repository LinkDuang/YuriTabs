insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-hola-input">
      <div class="flex items-center justify-start h-16">
          <div class="w-1/4 flex items-center">
            <i class="gg-pen"></i>
            <span class="label-text ml-2">问候语</span>
          </div>

          <div class="w-3/4 flex items-items">
            <input
              type="text"
              placeholder="例如: Hola Yuri"
              class="input input-bordered h-10 w-full"
              id="hola-input"
            />
          </div>
        </div>
    </template>
  `
})

class HolaInput extends HTMLElement {
  constructor() {
    super()
    let templateElem = e('#template-hola-input')
    let content = templateElem.content.cloneNode(true)

    let holaText = localStorage.getItem('hola')
    if (holaText !== null) {
      content.querySelector('#hola-input').value = holaText
    }
    this.appendChild(content)
  }

  connectedCallback() {
    let input = this.querySelector('#hola-input')
    input.addEventListener('input', (event) => {
      let v = event.target.value
      localStorage.setItem('hola', v)
      e('#hola-b').innerHTML = v
      e('#hola-f').innerHTML = v
    })
  }
}

customElements.define('setter-hola-input', HolaInput)
