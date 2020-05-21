Page({
  data: {
    TabCur: 0,
    index:0,
    scrollLeft: 0,
    list: ['官方配方', '个人配方'],
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
})