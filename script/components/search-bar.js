insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-search-bar">
      <div class="flex w-screen relative bottom-6">
        <input
          type="text"
          placeholder=""
          class="search-bar input input-bordered rounded-3xl h-12 mx-auto transition-all"
          id="search-input"
          data-queryUrl=""
        />
      </div>
    </template>
  `
})

class SearchBar extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-search-bar')
    let content = templateElem.content.cloneNode(true)

    // 初始化，placeholder
    let input = content.querySelector('#search-input')
    this.setEngine(input)

    // 监听
    this.searchEvents(input)

    // render
    this.appendChild(content)
  }

  setEngine(input) {
    let { queryUrl, placeholder } = getEngineText()
    input.placeholder = placeholder
    input.dataset.queryUrl = queryUrl
  }

  searchEvents = (input) => {
    // 如果用 input 监听，那么 Enter 无法触发
    let cooldown = true

    input.addEventListener('input', (event) => {
      cooldown = false
      setTimeout(() => {
        cooldown = true
      }, 100)
    })

    // 如果用 keydown 监听，那么 Enter 会在输入法上屏的时候触发
    input.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        if (cooldown === false) {
          return
        }
        let v = input.value
        if (v.length > 0) {
          let q = input.dataset.queryUrl
          window.location.href = `${q}${v}`
        }
      }
    })
  }
}

customElements.define('search-bar', SearchBar)
