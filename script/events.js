const __register_events = () => {
  // 绑定主题开关（缺少初始化和数据本地储存）
  e('#themes-toggle').addEventListener('change', (event) => {
    e('html').dataset.theme = event.target.checked ? 'dark' : 'light'
  })
}
__register_events()
