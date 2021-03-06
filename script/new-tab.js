let grayColors = {
  9: 'bg-gray-900',
  8: 'bg-gray-800',
  7: 'bg-gray-700',
  6: 'bg-gray-600',
  5: 'bg-gray-500',
  4: 'bg-gray-400',
  3: 'bg-gray-300',
  2: 'bg-gray-200',
  1: 'bg-gray-100',
  0: 'bg-gray-50',
}

let rainbowColors = {
  0: 'bg-red-400',
  1: 'bg-orange-400',
  2: 'bg-yellow-400',
  3: 'bg-lime-400',
  4: 'bg-green-400',
  5: 'bg-cyan-400',
  6: 'bg-sky-400',
  7: 'bg-violet-400',
  8: 'bg-purple-400',
}

const getIconUrl = (i) => {
  let host = parseHost(i.url)
  let url = `https://icon.horse/icon/${host}`
  let iconUrl = ''
  let icons = local.get(`cacheIcons`, {})
  if (url in icons) {
    iconUrl = icons[url]
  } else {
    iconUrl = url
  }
  return iconUrl
}

const genButton = (i, iconStyle, laneIndex) => {
  // icons
  if (iconStyle === null) {
    iconStyle = 'icon'
  }
  let iconUrl = getIconUrl(i)
  let dict = {
    icon: `<div class="rounded-full w-5 h-5 mr-2">
              <img src="${iconUrl}" class="icon-img" draggable="false" />
          </div>`,
    gray: `<div class="rounded-full w-5 h-5 mr-2 ${grayColors[laneIndex]}"></div>`,
    rainbow: `<div class="rounded-full w-5 h-5 mr-2 ${rainbowColors[laneIndex]}"></div>`,
  }

  //render
  const buttonDom = `
    <a href=${i.url} 
      draggable="false" 
      class="link-card link-item btn btn-ghost normal-case w-full mb-1 flex-row flex-nowrap justify-start p-2">
      <div class="avatar">
        ${dict[iconStyle]} 
      </div>
      <div class="link-title whitespace-nowrap overflow-hidden">
        ${i.title}
      </div>
    </a>
  `
  return buttonDom
}

const genLaneWithLaneData = (rawLane, laneIndex) => {
  let marks = flatDeep(rawLane.children)
  let blockList = getBlockList()
  let filted = marks.filter(
    (i) => !blockList.some((block) => i.title.includes(block) || i.url.includes(block)),
  )
  if (filted.length === 0) {
    // 过滤完之后一个都没有了，就隐藏这根泳道
    return ``
  }
  let iconStyle = localStorage.getItem('iconStyle') // icon | gray | rainbow

  let buttonGroup = filted.map((i) => genButton(i, iconStyle, laneIndex))

  let laneDom = `
    <div class="card-title truncate border-b-2 text-xl">
      ${rawLane.title}
    </div>
    <div class="">
      ${buttonGroup.join('')}
    </div>
  `
  return laneDom
}

const __genTabs = () => {
  const container = e('#bookmarks-tree-container')
  container.innerHTML = ''
  let book = chrome.bookmarks
  let width = getCardWidth()
  let margin = getCardSpace()

  book.getTree((tree) => {
    let page = tree[0].children[0]
    let pool = page.children
    let other = {
      children: [],
      title: '尚未整理',
    }
    pool.forEach((lane, laneIndex) => {
      if (!lane.children) {
        other.children.push(lane)
        return
      }
      let laneDom = genLaneWithLaneData(lane, laneIndex)
      // 方案1，最坏，更慢一些的方法
      // container.innerHTML += laneDom

      // 方案2，略好一点
      // let div = document.createElement('div')
      // div.className = `lane ${margin} ${width}`
      // div.innerHTML = laneDom
      // container.appendChild(div)

      // 方案3，完美
      let html = `
        <div class="lane ${margin} ${width}">
          ${laneDom}
        </div>
      `
      container.insertAdjacentHTML('beforeend', html)
    })

    if (other.children.length > 0) {
      let laneDom = genLaneWithLaneData(other, pool.length - 1)
      let html = `
        <div class="lane ${margin} ${width}">
          ${laneDom}
        </div>
      `
      container.insertAdjacentHTML('beforeend', html)
    }
  })
}

window.addEventListener('load', () => {
  e('.square').classList.remove('hidden')
  __genTabs()
})
