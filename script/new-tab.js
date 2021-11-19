const e = (selector) => document.querySelector(selector)

const addLine = (line) => {
  e('#bookmarks-tree').innerHTML += line
}
const __main = () => {
  let book = chrome.bookmarks
  book.getTree((tree) => {
    let page = tree[0].children[0]
    console.log('bookPage', page)
    // addLine(`<h1>${page.title}</h1>`)
    // page.children.forEach((docSet) => {
    //   addLine(`<h3>${docSet.title}</h3>`)
    //   docSet.children.forEach((site) => {
    //     addLine(`<p>${site.title}</p>`)
    //   })
    // })

    const flatDeep = (arr, d) => {
      return d > 0
        ? arr.reduce((acc, val) => {
            // console.log('acc', acc)
            // console.log('val', val)
            let o = {
              title: val.title,
              url: val.url,
            }
            let next = o
            if (val.url === undefined) {
              console.log('这是个目录', val.title)
            }
            if (Array.isArray(val.children)) {
              next = flatDeep(val.children, d - 1)
            }
            return acc.concat(next)
          }, [])
        : arr.slice()
    }

    let a2 = flatDeep(tree, Infinity)
    console.log(a2)

    // let leaf = tree.flat(Infinity)
    // console.log('leaf', leaf)
  })
}

window.addEventListener('load', () => {
  __main()
})
