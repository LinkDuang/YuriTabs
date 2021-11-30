// 监听系统变化：https://juejin.cn/post/6966794966165094414

// const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
// themeMedia.addListener(e => {
//     if (e.matches) {
//         console.log('light')
//     } else {
//         console.log('dark')
//     }
// });

// 初始化数据，localStorage

const dataInit = () => {
  let theme = localStorage.getItem('theme')
  if (theme === null || theme === 'system') {
    setTheme('system')
    e(`input[data-title='system']`).checked = true
  } else if (theme === 'light') {
    e(`input[data-title='light']`).checked = true
    setTheme('light')
  } else if (theme === 'dark') {
    setTheme('dark')
    e(`input[data-title='dark']`).checked = true
  }
}

// 绑定主题开关（缺少初始化和数据本地储存）
const themeEvents = () => {
  let buttons = es('.theme-buttons')
  buttons.forEach((i) => {
    i.addEventListener('change', (event) => {
      let theme = event.target.dataset.title
      setTheme(theme)
      localStorage.setItem('theme', theme)
    })
  })
}

// 键盘事件
const keyboardEvents = () => {
  document.addEventListener('keydown', (event) => {
    let { key } = event
    if (key === 'Escape') {
      let settingModal = e('#setting-modal')
      if (settingModal.checked === true) {
        e('#setting-modal').checked = false
      }
    }
  })
}

// 拷贝
const copyButtonsEvents = () => {
  es('.copyButton').forEach((i) => {
    i.addEventListener('click', () => {
      let v = i.dataset.value
      navigator.clipboard.writeText(v)
    })
  })
}

const __register_events = () => {
  dataInit()
  themeEvents()
  copyButtonsEvents()
  keyboardEvents()
}
__register_events()
