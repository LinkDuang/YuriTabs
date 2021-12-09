// 监听系统变化：https://juejin.cn/post/6966794966165094414

// const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
// themeMedia.addListener(e => {
//     if (e.matches) {
//         console.log('light')
//     } else {
//         console.log('dark')
//     }
// });

// 键盘事件
const keyboardEvents = () => {
  document.addEventListener('keydown', (event) => {
    let { key } = event
    let settingModal = e('#setting-modal')
    if (key === 'Escape') {
      if (settingModal.checked === true) {
        settingModal.checked = false
      }
    }
    if (key === ',') {
      if (settingModal.checked === false) {
        settingModal.checked = true
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

// 问候语事件
const holaEvents = () => {
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

// 搜索事件
const searchEvents = () => {
  // 如果用 input 监听，那么 Enter 无法触发
  // e('#search-bar').addEventListener('input', (event) => {
  //   console.log('event', event.data)
  // })

  // 如果用 keydown 监听，那么 Enter 会在输入法上屏的时候触发
  e('#search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      let v = e('#search-bar').value
      if (v.length > 0) {
        window.location.href = `https://www.google.com/search?q=${v}`
      }
    }
  })

  // 解决方案猜想：
  // input 事件在输入法上屏的时候，标记一个 100ms 的时间 cooldown = true
  // 在 100ms 后 cooldown = false
  // keydown 时，if cooldown === true，那么不操作
}

const __register_events = () => {
  copyButtonsEvents()
  keyboardEvents()
  holaEvents()
  searchEvents()
}
__register_events()
