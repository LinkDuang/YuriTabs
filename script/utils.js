const e = (selector) => document.querySelector(selector)
const es = (selector) => document.querySelectorAll(selector)

const getBlockList = () => {
  const bls = localStorage.getItem('blockList')
  if (bls === null) {
    return []
  }
  try {
    let r = JSON.parse(bls)
    return Array.isArray(r) ? r : []
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
    1: 'w-40',
    2: 'w-44',
    3: 'w-48',
    4: 'w-52',
    5: 'w-56',
  }
  let cardWidth = localStorage.getItem('cardWidth')
  if (!cardWidth === null || widthDict[cardWidth] === undefined) {
    return widthDict['3']
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
  }
  let cardSpace = localStorage.getItem('cardSpace')
  if (!cardSpace === null || spaceDict[cardSpace] === undefined) {
    return spaceDict['3']
  }
  return spaceDict[cardSpace]
}



const genCardWidthValue = (k) => {
  let rangeDict = {
    1: '10 rem',
    2: '11 rem',
    3: '12 rem',
    4: '13 rem',
    5: '14 rem',
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
  }
  return spaceDict[k]
}
