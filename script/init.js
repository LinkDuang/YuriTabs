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
    e('#widthRangeValue').innerHTML = genCardWidthValue(3)
  } else {
    e('#widthRange').value = cardWidth
    e('#widthRangeValue').innerHTML = genCardWidthValue(cardWidth)
  }
}

const initCardSpace = () => {
  // card space
  let cardSpace = localStorage.getItem('cardSpace')
  if (cardSpace === null) {
    e('#cardSpace').value = 1
    e('#cardSpaceValue').innerHTML = genCardSpaceValue(1)
  } else {
    e('#cardSpace').value = cardSpace
    e('#cardSpaceValue').innerHTML = genCardSpaceValue(cardSpace)
  }
}

// 初始化数据，localStorage
const dataInit = () => {
  initTheme()
  initHola()
  initCardWidth()
  initCardSpace()
}

dataInit()
