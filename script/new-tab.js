const genButton = (i) => {
  let host = parseHost(i.url)
  let iconFinder = `https://icon.horse/icon/${host}`
  const buttonDom = `
    <a href=${i.url} >
      <div class="link-item btn w-full mb-2 mt-2 btn-outline flex-row flex-nowrap justify-start p-2">
        <div class="avatar">
          <div class="rounded-full w-5 h-5 mr-2">
            <img src="${iconFinder}" loading="lazy"  />
          </div>
        </div>
        <div class="whitespace-nowrap overflow-hidden overflow-ellipsis">
          ${i.title}
        </div>
      </div>
    </a>
  `
  return buttonDom
}

const genLaneWithLaneData = (rawLane) => {
  let marks = flatDeep(rawLane.children)
  let blockList = getBlockList()
  let filted = marks.filter(
    (i) => !blockList.some((block) => i.title.includes(block) || i.url.includes(block)),
  )
  let buttonGroup = filted.map((i) => genButton(i))
  let width = getCardWidth()
  let margin = getCardSpace()

  let laneDom = `
    <div class="lane ${margin} ${width}">
      <div class="pl-3 card-title">
        ${rawLane.title}
      </div>
      <div class="">
        ${buttonGroup.join('')}
      </div>
    </div>
  `
  return laneDom
}

const __genTabs = () => {
  const container = e('#bookmarks-tree-container')
  container.innerHTML = ''
  let book = chrome.bookmarks
  book.getTree((tree) => {
    let page = tree[0].children[0]
    let pool = page.children
    let other = {
      children: [],
      title: '尚未整理',
    }
    pool.forEach((lane) => {
      if (!lane.children) {
        other.children.push(lane)
        return
      }
      let laneDom = genLaneWithLaneData(lane)
      container.innerHTML += laneDom
    })
    if (other.children.length > 0) {
      let laneDom = genLaneWithLaneData(other)
      container.innerHTML += laneDom
    }
  })
}

window.addEventListener('load', () => {
  __genTabs()
  e('.square').classList.remove('hidden')
})
