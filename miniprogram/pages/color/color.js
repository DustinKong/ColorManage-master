const db = wx.cloud.database();
const app = getApp();
const list = db.collection('colorlist');
Page({
  data: {
    name: '',
    colorpart1: [],
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
      'rank': '110',
    }, ],
    // messages: [{
    //     'union': 'XXX',
    //     'rank': '15°',
    //     'score': 62.55,
    //     'date': 6.66,
    //     'name': 3.47
    //   },
    //   {
    //     'union': 'XXX',
    //     'rank': '45°',
    //     'score': 64.58,
    //     'date': 4.11,
    //     'name': 1.56
    //   },
    //   {
    //     'union': 'XXX',
    //     'rank': '110°',
    //     'score': 66.98,
    //     'date': 3.33,
    //     'name': 7.64
    //   }
    // ]
  },
  getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = (color.length == 1) ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },
  save() {
    var that = this
    if (!that.data.name)
      wx.showToast({
        title: '请填写颜色名称！',
        duration: 2000,
      })
    else {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      var userid = wx.getStorageSync('userinfo')
      console.log('userid', userid)
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      // console.log("当前时间戳为：" + timestamp);
      var n = timestamp * 1000;
      var date = new Date(n);
      //年  
      var Y = date.getFullYear();
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时  
      var nowtime = Y + '-' + M + '-' + D
      var entity = {}
      entity.color = that.data.colorlist
      entity.name = that.data.name
      entity.time = nowtime
      entity.colornum=this.getRandomColor()
      wx.cloud.callFunction({
        name: 'uploadmycolor',
        data: {
          id: userid,
          obj: entity
        },
        success: function (res) {
          wx.hideLoading()
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
        },
        fail: function (res) {
          console.log(res)
        },
      })

      wx.cloud.callFunction({
        name: 'uploadAllColor',
        data: {
          id: userid,
          name: that.data.name,
          color: that.data.colorlist,
          date: nowtime,
          colornum:this.getRandomColor()
        },
        success: function (res) {
          console.log(res)

        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
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
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo
          //     wx.setStorageSync('userInfo', res.userInfo)
          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
          console.log('good')
        } else {
          // 未授权，跳转到授权页面
          console.log('no auth')
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    })

    var that = this
    console.log('chooseid', app.globalData.chooseid)
    list.doc(app.globalData.chooseid).get({
      success: function (res) {
        console.log(res)
        that.setData({
          colorpart1: res.data
        })
      }
    })
    var t1=this.getRandomColor()
    var t2=this.getRandomColor()
    this.setData({
      bk1:t1,
      bk2:t2
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