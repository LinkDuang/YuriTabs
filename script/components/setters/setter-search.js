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
            data-key="google"
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="searchEngine"
            data-title="Baidu"
            data-key="baidu"
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="searchEngine"
            data-title="Bing"
            data-key="bing"
            class="theme-buttons btn btn-sm normal-case"
          />
          <input
            type="radio"
            name="searchEngine"
            data-title="DuckDuckGo"
            data-key="duckDuckGo"
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
    let searchEngine = localStorage.getItem('searchEngine')
    if (searchEngine === null || searchEngine === 'google') {
      content.querySelector(`input[data-key='google']`).checked = true
    } else if (searchEngine === 'baidu') {
      content.querySelector(`input[data-key='baidu']`).checked = true
    } else if (searchEngine === 'bing') {
      content.querySelector(`input[data-key='bing']`).checked = true
    } else if (searchEngine === 'duckDuckGo') {
      content.querySelector(`input[data-key='duckDuckGo']`).checked = true
    }

    // 监听器
    let buttons = content.querySelectorAll(`input[name='searchEngine']`)

    buttons.forEach((i) => {
      i.addEventListener('change', (event) => {
        let theme = event.target.dataset.key
        localStorage.setItem('searchEngine', theme)

        let input = e('#search-input')
        let { queryUrl, placeholder } = getEngineText()
        input.placeholder = placeholder
        input.dataset.queryUrl = queryUrl
      })
    })

    // render
    this.appendChild(content)
  }
}

customElements.define('setter-search', SetterSearch)
