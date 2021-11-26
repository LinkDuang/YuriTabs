// function createDOM(htmlText) {
//   return new DOMParser().parseFromString(htmlText, 'text/html')
// }

// function createTemplate(templateText) {
//   const dom = createDOM(templateText)
//   const template = dom.querySelector('template')
//   return template
// }

// const temp = createTemplate(`
//     <template id="markbook">
//       <a href="?????" target="_blank">
//         <div class="btn m-2 btn-outline w-48 flex-row flex-nowrap justify-start">
//           <div class="avatar">
//             <div class="rounded-full w-5 h-5 mr-2">
//               <img src="???????" loading="lazy" />
//             </div>
//           </div>
//           <div class="whitespace-nowrap overflow-hidden overflow-ellipsis">tititititit</div>
//         </div>
//       </a>
//     </template>
// `)

// class Markbook extends HTMLElement {
//   constructor() {
//     super()
//     // var shadow = this.attachShadow({ mode: 'closed' })
//     // var templateElem = document.getElementById('markbook')
//     var templateElem = temp

//     // console.log('markbook constructor', templateElem)
//     var content = templateElem.content.cloneNode(true)
//     this.appendChild(content)
//   }
// }

fetch('./markbook.html')
  .then((stream) => stream.text())
  .then((text) => {
    customElements.define(
      'mark-book',
      class extends HTMLElement {
        constructor() {
          super()
          // this.attachShadow({ mode: 'open' }).innerHTML = text
        }
      },
    )
  })

// window.customElements.define('mark-book', Markbook)
