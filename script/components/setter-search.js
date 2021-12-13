insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-setter-search">
    <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex">
          <i class="gg-bot mt-1"></i>
          <span class="label-text ml-2.5">搜索工具</span>
        </div>
    
        <div class="btn-group">
          <input
            type="radio"
            name="searchEngine"
            data-title="Google"
            data-value="https://www.google.com/search?q="
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="searchEngine"
            data-title="Baidu"
            data-value="https://www.baidu.com/s?wd="
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="searchEngine"
            data-title="Bing"
            data-value="https://bing.com/search?q="
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="searchEngine"
            data-title="DuckDuckGo"
            data-value="https://duckduckgo.com/?q="
            class="theme-buttons btn btn-sm normal-case"
          />
        </div>
      </div>
    </template>
  `
})

class SetterSearch extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-setter-search')
    let content = templateElem.content.cloneNode(true)

    // 初始化

    // 监听器

    // render
    this.appendChild(content)
  }
}

customElements.define('setter-search', SetterSearch)
