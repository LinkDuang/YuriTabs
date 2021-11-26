const e = (selector) => document.querySelector(selector)

let parseHost = (url) => {
  let host = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
  return host.replace(/^www\./, '')
}

let parseProtocol = (url) => {
  let protocol = url.split('://')[0]
  return protocol.toUpperCase()
}

const genButton = (i) => {
  let http = parseProtocol(i.url)
  let host = parseHost(i.url)

  const buttonDom = `
    <a href=${i.url} target='_blank'>
      <div class="btn m-2 btn-outline">
        <div class="avatar">
          <div class="rounded-full w-5 h-5 mr-2">
            <img src="${http}://${host}/favicon.ico" loading="lazy"  />
          </div>
        </div>
        ${i.title}
      </div>
    </a>
  `

  return buttonDom
}

const genButtonDom = (i) => {
  let http = parseProtocol(i.url)
  let host = parseHost(i.url)

  let aTag = document.createElement('a')
  aTag.href = i.url
  aTag.setAttribute('target', '_blank')
  let div1 = document.createElement('div')
  div1.classList.add('btn', 'm-2', 'btn-outline')
  aTag.appendChild(div1)

  let div2 = document.createElement('div')
  div2.classList.add('avatar')
  div1.appendChild(div2)

  let div3 = document.createElement('div')
  div3.classList.add('rounded-full', 'w-5', 'h-5', 'mr-2')
  div2.appendChild(div3)

  // 先不添加img标签，先自己请求一次图片，如果是error则append默认图片的img标签，如果是成功的话就append所该img标签。当然，个人觉得没必要这样做。。。。。
  let img = document.createElement('img')
  img.setAttribute('src', `${http}://${host}/favicon.ico`)

  div3.appendChild(img)
  div1.appendChild(document.createTextNode(i.title))
  return aTag
}

const blockList = []

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

const __main = () => {
  let book = chrome.bookmarks
  book.getTree((tree) => {
    let page = tree[0].children[0]
    console.log('page one', page)
    let books = flatDeep(tree)
    let filted = books.filter(
      (i) => !blockList.some((block) => i.title.includes(block) || i.url.includes(block)),
    )
    let buttonGroup = filted.map((i) => genButton(i))
    console.log(buttonGroup)
    // let buttonDomGroup = filted.map((i) => genButtonDom(i))

    // e('#bookmarks-tree-container').innerHTML = buttonGroup.join('')
    // buttonDomGroup.map((i) => e('#bookmarks-tree-container').appendChild(i))
  })
}

window.addEventListener('load', () => {
  __main()
})
