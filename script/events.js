// 监听系统变化：https://juejin.cn/post/6966794966165094414

// const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
// themeMedia.addListener(e => {
//     if (e.matches) {
//         console.log('light')
//     } else {
//         console.log('dark')
//     }
// });

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
const setCardWidthEvents = () => {
  let range = e('#widthRange')
  range.addEventListener('input', (event) => {
    let value = event.target.value
    e('#widthRange').value = value
    e('#widthRangeValue').innerHTML = genCardWidthValue(value)
    localStorage.setItem('cardWidth', value)
    __genTabs()
  })
}

// 设置卡片间隔事件
const setCardSpaceEvents = () => {
  let range = e('#cardSpace')
  range.addEventListener('input', (event) => {
    let value = event.target.value
    e('#cardSpace').value = value
    e('#cardSpaceValue').innerHTML = genCardSpaceValue(value)
    localStorage.setItem('cardSpace', value)
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
  themeEvents()
  copyButtonsEvents()
  setCardWidthEvents()
  setCardSpaceEvents()
  holaEvents()
  keyboardEvents()
}
__register_events()
