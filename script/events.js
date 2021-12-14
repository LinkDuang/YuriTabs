// 键盘事件
const keyboardEvents = () => {
  document.addEventListener('keydown', (event) => {
    let { code } = event
    let settingModal = e('#setting-modal')
    if (code === 'Escape') {
      let open = settingModal.checked === true
      if (open) {
        settingModal.checked = false
      }
    }
    if (code === 'Comma') {
      let noOpen = settingModal.checked === false
      let noFocused = e('#search-input') !== document.activeElement
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

const getImageBase64 = (src) => {
  return new Promise((resolve) => {
    // mode: 'no-cors' 意味着无法拿到 base64
    // mode: 'cors' 意味着可以拿到 base64，但是可能会有跨域问题
    fetch(src, { mode: 'cors' })
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `${src}`, blob)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
      })
      .catch((err) => {
        let dcd = local.get('__disableCacheDomain', [])
        dcd.push(src)
        local.set('__disableCacheDomain', dcd)
      })
  })
}

// 图片缓存
const imagesCacheEvent = () => {
  let images = es('.icon-img')
  images.forEach((i) => {
    let isBase64 = i.src.startsWith('data:')
    let icons = local.get('cacheIcons', {})
    let cached = i.src in icons
    if (isBase64 || cached) {
      // 已经命中缓存，不必再设定监听器
      // console.log('命中缓存')
      return
    }
    let dcd = local.get('__disableCacheDomain', [])
    if (dcd.includes(i.src)) {
      // console.log('在禁用缓存列表中，不允许缓存', i.src)
      return
    }
    i.addEventListener('load', () => {
      getImageBase64(i.src).then((base64) => {
        let icons = local.get('cacheIcons', {})
        icons[i.src] = base64
        local.set('cacheIcons', icons)
      })
    })
  })
}

const __register_events = () => {
  copyButtonsEvents()
  keyboardEvents()
  holaEvents()
  // setTimeout(() => {
  // imagesCacheEvent()
  // }, 1000)
  setTimeout(() => {
    imagesCacheEvent()
  }, 500)
}
__register_events()
