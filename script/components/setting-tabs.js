insertTemplate((dom) => {
  dom.innerHTML += `
    <template id="setting-tabs">
      <div class="tabs">
        <a data-key="theme" class="tab-picker tab tab-lifted tab-active">主题</a>
        <a data-key="layout" class="tab-picker tab tab-lifted">布局</a>
        <a data-key="other" class="tab-picker tab tab-lifted">其他</a>
      </div>
    </template>
  `
})

class SettingTabs extends HTMLElement {
  constructor() {
    super()
    // 构造
    let templateElem = e('#setting-tabs')
    let content = templateElem.content.cloneNode(true)

    // 监听
    let pks = content.querySelectorAll('.tab-picker')
    pks.forEach((picker) => {
      picker.addEventListener('click', () => this.onPicker(picker))
    })
    this.appendChild(content)
  }

  onPicker(newTab) {
    // 去掉原来的
    let oldTab = e(`.tab-picker.tab-active`)
    oldTab.classList.remove('tab-active')
    newTab.classList.add('tab-active')

    let oldContent = e(`tab-content[data-content-key="${oldTab.dataset.key}"]`)
    oldContent.setAttribute('show', 'false')

    let nextContent = e(`tab-content[data-content-key="${newTab.dataset.key}"]`)
    nextContent.setAttribute('show', 'true')
  }
}

customElements.define('setting-tabs', SettingTabs)
