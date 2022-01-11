insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-search-bar">
      <div class="flex flex-col w-screen relative bottom-6">
        <input
          type="text"
          placeholder=""
          class="search-bar input input-bordered rounded-3xl h-12 mx-auto transition-all w-120 z-10"
          id="search-input"
          data-queryUrl=""
        />
        <div 
          id="quickly-container"
          open="false"
          class="mx-auto h-0 pt-12 flex flex-nowrap overflow-x-scroll hide-scrollbar w-120 bg-base-200 z-0 rounded-3xl transition-all">
        </div>
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
    this.quicklyButtons = []
    this.expansionOpen = false
  }

  setEngine(input) {
    let { queryUrl, placeholder } = getEngineText()
    input.placeholder = placeholder
    input.dataset.queryUrl = queryUrl
  }

  searchEvents = (input) => {
    let shake = new AntiShakeEvent(() => {
      // 正好做了防抖，就在这里处理
      this.skw = input.value
      let qc = e('#quickly-container')
      qc.innerHTML = ''
      this.quicklyButtons = []

      let findInMarks = localStorage.getItem('findInMarks')
      if (findInMarks !== 'false') {
        this.setLinkCardStyle()
        if (this.skw === '') {
          this.closeExpansionArea()
        }
      }
    }, 100)
    input.addEventListener('input', shake.register())

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
      let kw = this.skw.toLowerCase()
      let keyInHref = i.href.toLowerCase().includes(kw)
      let keyInTitle = title.toLowerCase().includes(kw)
      if (!keyInTitle && !keyInHref) {
        this.blur(i) // 模糊
      } else {
        this.light(i) // 高亮
        this.insertQuickly(i)
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

  insertQuickly = (i) => {
    let qc = e('#quickly-container')
    // if (this.quicklyButtons.length < 5) {
    this.openExpansionArea()
    this.quicklyButtons.push('占位符')
    let card = i.cloneNode(true)
    card.querySelector('.avatar').remove()

    card.classList.remove('link-card')
    card.classList.remove('link-item')
    card.classList.remove('w-full')
    card.classList.remove('mb-2')
    card.classList.remove('mt-2')
    card.classList.add('w-32')
    card.classList.add('mr-1')
    card.classList.add('btn-sm')
    qc.appendChild(card)
  }

  // 打开扩展区
  openExpansionArea() {
    if (this.expansionOpen === true) {
      return
    }
    this.expansionOpen = true
    let qc = e('#quickly-container')
    qc.classList.add('h-24')
    qc.classList.add('p-2')
    qc.classList.add('pt-14')
    qc.classList.remove('rounded-3xl')
    qc.classList.add('rounded-tr-3xl')
    qc.classList.add('rounded-tl-3xl')
    qc.classList.add('rounded-br-xl')
    qc.classList.add('rounded-bl-xl')
  }

  // 关闭拓展区
  closeExpansionArea() {
    if (this.expansionOpen === false) {
      return
    }
    this.expansionOpen = false
    let qc = e('#quickly-container')
    qc.classList.remove('h-24')
    qc.classList.add('rounded-3xl')
    qc.classList.remove('rounded-tr-3xl')
    qc.classList.remove('rounded-tl-3xl')
    qc.classList.remove('p-2')
    qc.classList.remove('pt-14')
  }
}

customElements.define('search-bar', SearchBar)
