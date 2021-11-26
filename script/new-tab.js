const e = (selector) => document.querySelector(selector)

let getBlockList = () => {
  const bls = ['瓜', '阿门的论坛', 'MIAA-494', '紳士漫畫', '琉璃神社', '前端面试']
  return bls
}

let parseHost = (url) => {
  let host = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
  return host.replace(/^www\./, '')
}

let parseProtocol = (url) => {
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

const genButton = (i) => {
  let http = parseProtocol(i.url)
  let host = parseHost(i.url)

  // 可用的 api
  // https://api.clowntool.cn/getico/?url=baidu.com
  let iconFinder = `https://icon.horse/icon/${host}`
  const buttonDom = `
    <a href=${i.url} target='_blank'>
      <div class="btn m-2 btn-outline w-48 flex-row flex-nowrap justify-start">
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

const __main = () => {
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
      e('#bookmarks-tree-container').innerHTML += laneDom
    })
  })
}

window.addEventListener('load', () => {
  __main()
})
