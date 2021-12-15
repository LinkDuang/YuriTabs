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
        this.skw = input.value
        let findInMarks = localStorage.getItem('findInMarks')
        if (findInMarks !== 'false') {
          this.setLinkCardStyle()
        }
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

  setLinkCardStyle() {
    let links = es('.link-card')
    links.forEach((i) => {
      if (this.skw === '') {
        this.light(i)
        return
      }
      let title = i.querySelector('.link-title').innerHTML
      let keyInHref = i.href.includes(this.skw)
      let keyInTitle = title.includes(this.skw)
      if (!keyInTitle && !keyInHref) {
        this.blur(i) // 模糊
      } else {
        this.light(i) // 高亮
      }
    })
  }

  light = (i) => {
    i.classList.remove('lighted')
    i.classList.remove('filter')
    i.classList.remove('blur-sm')
    i.classList.remove('grayscale')
  }

  blur = (i) => {
    i.classList.add('lighted')
    i.classList.add('filter')
    i.classList.add('blur-sm')
    i.classList.add('grayscale')
  }
}

customElements.define('search-bar', SearchBar)
