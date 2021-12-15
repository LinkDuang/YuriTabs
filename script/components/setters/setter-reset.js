insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="template-setter-reset">
      <div class="flex items-center justify-start h-16">
        <div class="w-1/4 flex items-center">
          <i class="gg-drop-opacity"></i>
          <span class="label-text ml-2">恢复选项</span>
        </div>
        <div class="w-3/4 flex">
          <div class="tooltip" data-tip="仅清空 icon 图标的缓存，下次会尝试重新获取">
            <button id="reset-icon-cache" class="btn btn-sm btn-outline mr-2">
              清理icon缓存
            </button>
          </div>
          <button id="reset-all" class="btn btn-sm btn-outline btn-error ml-auto">
            重置所有设置
          </button>
        </div>
      </div>
    </template>
  `
})

class SetterReset extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#template-setter-reset')
    let content = templateElem.content.cloneNode(true)

    // 监听器
    let resetIcon = content.querySelector(`#reset-icon-cache`)
    resetIcon.addEventListener('click', (event) => {
      localStorage.removeItem('cacheIcons')
      localStorage.removeItem('__disableCacheDomain')
      __genTabs()
    })

    let resetAll = content.querySelector(`#reset-all`)
    resetAll.addEventListener('click', (event) => {
      localStorage.clear()
      __genTabs()
    })

    // render
    this.appendChild(content)
  }
}

customElements.define('setter-reset', SetterReset)
