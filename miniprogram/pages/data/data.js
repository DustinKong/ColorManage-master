Page({
  data: {
    TabCur: 0,
    index: 0,
    index2: 0,
    index3: 0,
    scrollLeft: 0,
    num: '',
    list: ['官方配方', '个人配方'],
    picker: ['asd', 'qw', 'class'],
    picker2: ['宝马', '奔驰', '奥迪'],
    picker3: ['轿车', 'suv', 'mpv'],
    foundcolor: []
  },
  getcolor(e) {
    this.setData({
      num: e.detail.value
    })
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
  PickerChange2(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
  },
  PickerChange3(e) {
    console.log(e);
    this.setData({
      index3: e.detail.value
    })
  },
  search() {
    var that = this
    if (this.data.colornum) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      wx.cloud.callFunction({
        name: 'searchrecipe',
        data: {
          colorband: that.data.picker[that.data.index],
          carband: that.data.picker2[that.data.index2],
          colornum: that.data.num,
          cartype: that.data.picker3[that.data.index3]
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          if (res.result.data.length) {
            wx.showToast({
              title: '找到数据！',
              duration: 1000,
            })
            that.setData({
              foundcolor: res.result.data
            })
          } else {
            wx.showToast({
              title: '未找到数据！',
              duration: 1000,
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    } else {
      wx.showToast({
        title: '请输入内部色号！',
        duration: 1000
      })
    }
  }
})