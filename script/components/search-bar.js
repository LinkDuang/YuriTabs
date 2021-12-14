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
    this.cooldown = true
    this.timer = null
  }

  setEngine(input) {
    let { queryUrl, placeholder } = getEngineText()
    input.placeholder = placeholder
    input.dataset.queryUrl = queryUrl
  }

  searchEvents = (input) => {
    input.addEventListener('input', () => {
      // Input
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.cooldown = false
      this.timer = setTimeout(() => {
        this.cooldown = true
        this.timer = null

        // 正好做了防抖，就在这里处理
        // 0，每次进入网页，清空 sessionStorage 中的 value (浏览器自动做)
        
        // 1，将 value 写入 sessionStorage
        // 2，触发 gen
        // 3，gen 读取 value
        // 4，将对应的数据标记上 hightlight
        // __genTabs()
      }, 200)
    })

    // 如果用 keydown 监听，那么 Enter 会在输入法上屏的时候触发
    input.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        if (this.cooldown === false) {
          return
        }
        let v = input.value
        if (v.length > 0) {
          // Enter
          let q = input.dataset.queryUrl
          window.location.href = `${q}${v}`
        }
      }
    })
  }
}

customElements.define('search-bar', SearchBar)
