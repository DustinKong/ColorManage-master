const db = wx.cloud.database();
const app = getApp();
const list = db.collection('colorlist');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorlist: [],
    foundcolor: [],
    messages: [{
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
      'rank': '110',
    }]
  },

  findcolor(e) {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    wx.cloud.callFunction({
      name: 'findrecipe',
      data: {
        id: that.data.colorlist._id
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('chooseidtofind', app.globalData.chooseidtofind)
    list.doc(app.globalData.chooseidtofind).get({
      success: function (res) {
        console.log(res)
        that.setData({
          colorlist: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})