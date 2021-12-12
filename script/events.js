// 键盘事件
const keyboardEvents = () => {
  document.addEventListener('keydown', (event) => {
    let { key } = event
    let settingModal = e('#setting-modal')
    if (key === 'Escape') {
      let open = settingModal.checked === true
      if (open) {
        settingModal.checked = false
      }
    }
    if (key === ',') {
      let noOpen = settingModal.checked === false
      let noFocused = e('#search-bar') !== document.activeElement
      if (noOpen && noFocused) {
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
  let cooldown = true

  e('#search-bar').addEventListener('input', (event) => {
    cooldown = false
    setTimeout(() => {
      cooldown = true
    }, 100)
  })

  // 如果用 keydown 监听，那么 Enter 会在输入法上屏的时候触发
  e('#search-bar').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (cooldown === false) {
        return
      }
      let v = e('#search-bar').value
      if (v.length > 0) {
        window.location.href = `https://www.google.com/search?q=${v}`
      }
    }
  })
}

const __register_events = () => {
  copyButtonsEvents()
  keyboardEvents()
  holaEvents()
  searchEvents()
}
__register_events()
