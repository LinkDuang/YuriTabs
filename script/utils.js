const log = console.log.bind(console)
const e = (selector) => document.querySelector(selector)
const es = (selector) => document.querySelectorAll(selector)

const insertTemplate = (callback) => {
  // 这里本来不用这么扭曲，但是现在找不到好的插件可以用
  // 如果不使用 .innerHTML = xx 这种写法的话，
  // html 模板字符串就没有高亮功能
  // 后期找到可靠的插件可以替代这种写法
  callback(e('#templates'))
}

const getBlockList = () => {
  const bls = localStorage.getItem('blockList')
  if (bls === null) {
    return []
  }
  try {
    let r = JSON.parse(bls)
    if (Array.isArray(r)) {
      return r.filter((x) => x !== '')
    }
    return []
  } catch (e) {
    return []
  }
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

const getCardWidth = () => {
  let widthDict = {
    1: 'w-32',
    2: 'w-36',
    3: 'w-40',
    4: 'w-44',
    5: 'w-48',
    6: 'w-52',
    7: 'w-56',
    8: 'w-60',
  }
  let cardWidth = localStorage.getItem('cardWidth')
  if (!cardWidth === null || widthDict[cardWidth] === undefined) {
    return widthDict['5']
  }
  return widthDict[cardWidth]
}

const getCardSpace = () => {
  let spaceDict = {
    1: 'mx-2',
    2: 'mx-2.5',
    3: 'mx-3',
    4: 'mx-3.5',
    5: 'mx-4',
    6: 'mx-5',
    7: 'mx-6',
    8: 'mx-7',
  }
  let cardSpace = localStorage.getItem('cardSpace')
  if (!cardSpace === null || spaceDict[cardSpace] === undefined) {
    return spaceDict['3']
  }
  return spaceDict[cardSpace]
}

const genCardWidthValue = (k) => {
  let rangeDict = {
    1: '8 rem',
    2: '9 rem',
    3: '10 rem',
    4: '11 rem',
    5: '12 rem',
    6: '13 rem',
    7: '14 rem',
    8: '15 rem',
  }
  return rangeDict[k]
}

const genCardSpaceValue = (k) => {
  let spaceDict = {
    1: '0.5 rem',
    2: '0.625 rem',
    3: '0.75 rem',
    4: '0.875 rem',
    5: '1 rem',
    6: '1.25 rem',
    7: '1.5 rem',
    8: '1.75 rem',
  }
  return spaceDict[k]
}
