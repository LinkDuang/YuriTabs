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

const __register_events = () => {
  copyButtonsEvents()
  keyboardEvents()
  holaEvents()
}
__register_events()
