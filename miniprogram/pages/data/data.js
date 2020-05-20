Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    list: ['官方配方', '个人配方']
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})