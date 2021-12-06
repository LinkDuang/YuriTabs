
const initHola = () => {
  let neonToggle = localStorage.getItem('neonToggle')
  e('#neon-toggle').checked = true

  if (neonToggle === 'false') {
    e('#hola-b').classList.remove('neon-text')
    e('#neon-toggle').checked = false
  }
}


// 初始化数据，localStorage
const dataInit = () => {
  // initTheme()
  initHola()
}

dataInit()
