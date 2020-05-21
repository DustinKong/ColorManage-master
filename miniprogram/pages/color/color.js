// pages/color/color.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    colorlist: [{
      'first': 0,
      'second': 0,
      'third': 0,
      'rank': '15',
    }, {
      'first': 0,
      'second': 0,
      'third': 0,
      'rank': '45',
    }, {
      'first': 0,
      'second': 0,
      'third': 0,
      'rank': '1',
    }, ],
    messages: [{
        'union': 'XXX',
        'rank': '15°',
        'score': 62.55,
        'date': 6.66,
        'name': 3.47
      },
      {
        'union': 'XXX',
        'rank': '45°',
        'score': 64.58,
        'date': 4.11,
        'name': 1.56
      },
      {
        'union': 'XXX',
        'rank': '110°',
        'score': 66.98,
        'date': 3.33,
        'name': 7.64
      }
    ]
  },
  save(){
    var that=this
    var userid=wx.getStorageSync('userinfo')
    console.log('userid',userid)
    wx.cloud.callFunction({
      name: 'uploadmycolor',
      data: {
        color: that.data.colorlist ,
        id: userid
      }, success: function (res) {
        console.log(res)
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          // success: function () {
            // setTimeout(function () {
            //   wx.switchTab({
            //     url: '/pages/index/index',
            //   })
            // }, 2000);
          // }
        })
      }, fail: function (res) {
        console.log(res)
      }
    })
  },
  getname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getnum1(e) {
    // console.log('1',e.currentTarget.dataset.id)
    let tmp = e.currentTarget.dataset.id
    let t
    if (tmp == 0)
      t = "colorlist[0].first"
    else if (tmp == 1)
      t = "colorlist[1].first"
    else
      t = "colorlist[2].first"
    this.setData({
      [t]: e.detail.value
    })
  },
  getnum2(e) {
    // console.log('2',e.currentTarget.dataset.id)
    let tmp = e.currentTarget.dataset.id
    let t
    if (tmp == 0)
      t = "colorlist[0].second"
    else if (tmp == 1)
      t = "colorlist[1].second"
    else
      t = "colorlist[2].second"
    this.setData({
      [t]: e.detail.value
    })
  },
  getnum3(e) {
    // console.log('3',e.currentTarget.dataset.id)
    let tmp = e.currentTarget.dataset.id
    let t
    if (tmp == 0)
      t = "colorlist[0].third"
    else if (tmp == 1)
      t = "colorlist[1].third"
    else
      t = "colorlist[2].third"
    this.setData({
      [t]: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})