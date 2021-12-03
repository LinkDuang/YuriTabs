// 监听系统变化：https://juejin.cn/post/6966794966165094414

// const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
// themeMedia.addListener(e => {
//     if (e.matches) {
//         console.log('light')
//     } else {
//         console.log('dark')
//     }
// });

const initTheme = () => {
  let theme = localStorage.getItem('theme')
  if (theme === null || theme === 'system') {
    setTheme('system')
    e(`input[data-value='system']`).checked = true
  } else if (theme === 'light') {
    e(`input[data-value='light']`).checked = true
    setTheme('light')
  } else if (theme === 'dark') {
    setTheme('dark')
    e(`input[data-value='dark']`).checked = true
  }
}

const initHola = () => {
  let holaText = localStorage.getItem('hola')
  if (holaText !== null) {
    e('#hola-b').innerHTML = holaText
    e('#hola-f').innerHTML = holaText
    e('#hola-input').value = holaText
  }

  let neonToggle = localStorage.getItem('neonToggle')
  e('#neon-toggle').checked = true

  if (neonToggle === 'false') {
    e('#hola-b').classList.remove('neon-text')
    e('#neon-toggle').checked = false
  }
}

const initCardWidth = () => {
  // card width
  let cardWidth = localStorage.getItem('cardWidth')
  if (cardWidth === null) {
    e('#widthRange').value = 3
    e('#widthRangeValue').innerHTML = genRangeText(3)
  } else {
    e('#widthRange').value = cardWidth
    e('#widthRangeValue').innerHTML = genRangeText(cardWidth)
  }
}

// 初始化数据，localStorage
const dataInit = () => {
  initTheme()
  initHola()
  initCardWidth()
}

// 绑定主题开关（缺少初始化和数据本地储存）
const themeEvents = () => {
  let buttons = es('.theme-buttons')
  buttons.forEach((i) => {
    i.addEventListener('change', (event) => {
      let theme = event.target.dataset.value
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

// 拷贝按钮事件
const copyButtonsEvents = () => {
  es('.copyButton').forEach((i) => {
    i.addEventListener('click', () => {
      let v = i.dataset.value
      navigator.clipboard.writeText(v)
    })
  })
}

// 设置宽度范围事件
const setWidthRangeEvents = () => {
  let range = e('#widthRange')
  range.addEventListener('input', (event) => {
    let value = event.target.value
    e('#widthRange').value = value
    e('#widthRangeValue').innerHTML = genRangeText(value)
    localStorage.setItem('cardWidth', value)
    __genTabs()
  })
}

// 问候语事件
const holaEvents = () => {
  let input = e('#hola-input')
  input.addEventListener('input', (event) => {
    let v = event.target.value
    localStorage.setItem('hola', v)
    e('#hola-b').innerHTML = v
    e('#hola-f').innerHTML = v
  })

  e('#neon-toggle').addEventListener('change', (event) => {
    let v = event.target.checked
    localStorage.setItem('neonToggle', v)
    if (v === true) {
      e('#hola-b').classList.add('neon-text')
    } else {
      e('#hola-b').classList.remove('neon-text')
    }
  })
}

const __register_events = () => {
  dataInit()
  themeEvents()
  copyButtonsEvents()
  setWidthRangeEvents()
  holaEvents()
  keyboardEvents()
}
__register_events()
