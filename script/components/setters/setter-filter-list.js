insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-filter-list">
      <div class="flex items-center justify-start h-16">
        <div
          class="w-1/4 flex items-center tooltip"
          data-tip="如果书签标题、URL 包含这里填入的文本，则会被自动隐藏，使用空格分隔多个条件。"
        >
          <i class="gg-edit-flip-h"></i>
          <span class="label-text ml-2">隐藏书签</span>
        </div>
        <div class="w-3/4 flex items-items">
          <input
            type="text"
            placeholder="例如 hyrule.cn，多个条件用空格分隔"
            class="input input-bordered h-10 w-full"
            id="filterListInput"
          />
        </div>
      </div>
    </template>
  `
})

class FilterList extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-filter-list')
    let content = templateElem.content.cloneNode(true)

    // 初始化
    let blockList = getBlockList()
    let input = content.querySelector('#filterListInput')

    if (blockList.length !== 0) {
      input.value = blockList.join(' ')
    }

    // 监听器
    input.addEventListener('input', (event) => {
      let value = event.target.value
      let arr = JSON.stringify(value.split(' '))
      localStorage.setItem('blockList', arr)
      __genTabs()
    })

    this.appendChild(content)
  }

  // 首次被插入 DOM 时被调用
  connectedCallback() {}
}

customElements.define('setter-filter-list', FilterList)
