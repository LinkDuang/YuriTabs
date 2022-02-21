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

let findLane = (dom) => {
  if (dom.classList.contains('lane')) {
    return dom
  } else {
    return findLane(dom.parentElement)
  }
}

const __registerDropEvents = () => {
  setTimeout(() => {
    // 卡片拖拽
    let cards = [...es('.link-card')].map((i) => i.parentElement)
    // console.log('cards', cards)
    cards.forEach((i) => {
      i.addEventListener('dragstart', (card) => {
        window.dropItem = card.target.id.split('node_')[1]
      })

      i.addEventListener('drop', (event) => {
        event.stopPropagation()
        let lane = findLane(event.target)
        lane.style.background = 'none'

        let targetId = lane.id.split('group_')[1]
        // log(`容器响应结束，从 ${window.dropItem} -> ${targetId}`)
        let start = window.dropItem
        let end = {
          parentId: targetId,
        }
        chrome.bookmarks.move(start, end, () => {
          // 移动过去好了？
          let targetContainer = e(`#group_${targetId}`)
          let moveObject = e(`#node_${window.dropItem}`).parentElement
          targetContainer.appendChild(moveObject)
          window.dropItem = null
        })
      })

      i.addEventListener('dragover', (event) => {
        event.preventDefault()
        let lane = findLane(event.target)
        lane.style.background = '#1f904e'
      })
      i.addEventListener('dragleave', (event) => {
        event.preventDefault()
        let lane = findLane(event.target)
        lane.style.background = 'none'
      })

      // i.addEventListener('drop', (lane) => {
      //   lane.preventDefault()
      // })
      // i.addEventListener('dragover', (lane) => {
      //   lane.preventDefault()
      // })
      // i.addEventListener('dragend', (card) => {})
    })

    // 响应
    // let lanes = es('.lane')
    // lanes.forEach((i) => {
    //   i.addEventListener('drop', (event) => {
    //     event.stopPropagation()
    //     let lane = findLane(event.target)
    //     lane.style.background = 'none'
    //     let targetId = lane.id.split('group_')[1]
    //     // log(`容器响应结束，从 ${window.dropItem} -> ${targetId}`)
    //     let start = window.dropItem
    //     let end = {
    //       parentId: targetId,
    //     }
    //     chrome.bookmarks.move(start, end, () => {
    //       // 移动过去好了？
    //       let targetContainer = e(`#group_${targetId}`)
    //       let moveObject = e(`#node_${window.dropItem}`).parentElement
    //       targetContainer.appendChild(moveObject)
    //       window.dropItem = null
    //     })
    //   })
    //   i.addEventListener('dragover', (event) => {
    //     event.preventDefault()
    //     let lane = findLane(event.target)
    //     // log('容器响应，持续收到拖拽事件，drop', lane)
    //     lane.style.background = '#1f904e'
    //   })
    //   i.addEventListener('dragleave', (event) => {
    //     event.preventDefault()
    //     let lane = findLane(event.target)
    //     // log('容器响应，持续收到拖拽事件，drop', lane)
    //     lane.style.background = 'none'
    //   })
    // })
  }, 200)
}

const renderTree = (array, renderNode) => {
  array.forEach((i) => {
    let container = document.createElement('div')
    renderNode.appendChild(container)
    if (i.children) {
      container.className = 'lane ml-1 border-l-4 mb-4'
      container.id = `group_${i.id}`
      container.insertAdjacentHTML('beforeend', i.title)
      renderTree(i.children, container)
    } else {
      // 渲染自己
      container.className = 'mx-3 w-44'
      let iconUrl = getIconUrl(i)
      let html = `
      <a href=${i.url} 
        id="node_${i.id}"
        draggable="true"
        class="link-card link-item btn normal-case w-full mb-2 mt-2 btn-outline flex-row flex-nowrap justify-start p-2">
        <div class="avatar">
          <div class="rounded-full w-5 h-5 mr-2">
            <img src="${iconUrl}" class="icon-img" draggable="false" />
          </div>
        </div>
        <div class="link-title whitespace-nowrap overflow-hidden">
          ${i.title}
        </div>
      </a>
      `
      container.insertAdjacentHTML('beforeend', html)
    }
  })
}

window.addEventListener('load', () => {
  e('.square').classList.remove('hidden')
  // __genTabs()
  // renderBookmarksEditMode()
  chrome.bookmarks.getTree((tree) => {
    // 树结构修剪
    let cutedTree = tree[0].children[0].children
    const container = e('#bookmarks-tree-container')
    renderTree(cutedTree, container)
    __registerDropEvents()
  })
})

// __genTabs 一旦被调用，就会立即触发页面全部重新渲染，这点毋庸置疑
// 页面重新渲染可以有顺序吗？一个 2 秒动画里面，逐个渲染如何？

let mockTree = [
  {
    id: '0',
    title: '',
    children: [
      {
        id: '1',
        parentId: '0',
        title: '书签栏',
        children: [
          {
            id: '5',
            parentId: '1',
            title: '工作站',
            children: [
              { id: '215', parentId: '5', title: 'wolai工作台', url: 'xx.xx' },
              { id: '199', parentId: '5', title: '开发中心', url: 'xx.xx' },
            ],
          },
          {
            id: '20',
            parentId: '1',
            title: '图书馆',
            children: [
              { id: '216', parentId: '20', title: '测试图书链接', url: 'xx.xx' },
              { id: '22', parentId: '20', title: '图书 Types', url: 'xx.xx' },
              {
                id: '30',
                parentId: '20',
                title: '图书文件夹',
                children: [
                  { id: '80', parentId: '30', title: '无产阶级', url: 'xx.xx' },
                  { id: '81', parentId: '30', title: '资本主义', url: 'xx.xx' },
                ],
              },
            ],
          },
          { id: '30', parentId: '1', title: '广场', children: [] },
        ],
      },
      {
        id: '2',
        parentId: '0',
        title: '其他书签',
        children: [
          {
            id: '108',
            parentId: '2',
            title: '3d 打印',
            children: [
              {
                id: '110',
                index: 0,
                parentId: '108',
                title: 'Thingiverse - Digital Designs for Physical Objects',
                url: 'https://www.thingiverse.com/',
              },
            ],
          },
        ],
      },
    ],
  },
]
