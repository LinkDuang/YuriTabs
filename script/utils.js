const e = (selector) => document.querySelector(selector)
const es = (selector) => document.querySelectorAll(selector)

const getBlockList = () => {
  const bls = ['瓜', '阿门的论坛', 'MIAA-494', '紳士漫畫', '琉璃神社', '前端面试']
  return bls
}

const parseHost = (url) => {
  let host = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
  return host.replace(/^www\./, '')
}

const parseProtocol = (url) => {
  let protocol = url.split('://')[0]
  return protocol.toUpperCase()
}

const flatDeep = (arr) => {
  let flatedArray = arr.reduce((acc, val) => {
    let o = {
      title: val.title,
      url: val.url,
    }
    let next = o
    if (val.url === undefined) {
      // menu.push(val.title)
    } else {
    }
    if (Array.isArray(val.children)) {
      next = flatDeep(val.children)
    }
    return acc.concat(next)
  }, [])

  return flatedArray
}

const getSystemTheme = () => {
  const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
  return themeMedia.matches ? 'light' : 'dark'
}

const setTheme = (theme) => {
  if (theme === 'system') {
    theme = getSystemTheme()
  }
  e('html').dataset.theme = theme
}
