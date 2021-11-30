const genButton = (i) => {
  let host = parseHost(i.url)
  let iconFinder = `https://icon.horse/icon/${host}`
  const buttonDom = `
    <a href=${i.url} >
      <div class="btn m-2 btn-outline w-48 flex-row flex-nowrap justify-start p-2">
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

const __genTabs = () => {
  // console.log(navigator.clipboard)
  const container = e('#bookmarks-tree-container')
  container.innerHTML = ''
  let book = chrome.bookmarks
  book.getTree((tree) => {
    let page = tree[0].children[0]
    let pool = page.children
    pool.forEach((lane) => {
      let marks = flatDeep(lane.children)
      let blockList = getBlockList()
      let filted = marks.filter(
        (i) => !blockList.some((block) => i.title.includes(block) || i.url.includes(block)),
      )

      let buttonGroup = filted.map((i) => genButton(i))
      let laneDom = `
        <div class="lane w-52">
          <div class="pl-3 card-title">
            ${lane.title}
          </div>
          <div class="">
            ${buttonGroup.join('')}
          </div>
        </div>
      `
      container.innerHTML += laneDom
    })
  })
}

window.addEventListener('load', () => {
  __genTabs()
})
