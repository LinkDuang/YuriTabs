insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-search-config">
     <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex">
          <i class="gg-presentation"></i>
          <span class="label-text ml-2">搜索选项</span>
        </div>
        <div class="w-3/4 flex">
          <label class="cursor-pointer label flex items-center">
            <span class="label-text text-xs mr-1">搜索时检索书签</span>
            <input
              id="search-in-markbooks-toggle"
              type="checkbox"
              checked="checked"
              class="toggle"
            />
          </label>
        </div>
      </div>
    </template>
  `
})

class SearchConfig extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-search-config')
    let content = templateElem.content.cloneNode(true)

    // 初始化
    let findMarks = localStorage.getItem('findInMarks')
    let toggle = content.querySelector('#search-in-markbooks-toggle')
    toggle.checked = true
    if (findMarks === 'false') {
      toggle.checked = false
    }

    toggle.addEventListener('change', (event) => {
      let v = event.target.checked
      localStorage.setItem('findInMarks', v)
    })

    this.appendChild(content)
  }

  // 首次被插入 DOM 时被调用
  connectedCallback() {}
}

customElements.define('setter-search-config', SearchConfig)
