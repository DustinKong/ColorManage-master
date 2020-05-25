//app.js
App({
  onLaunch: function () {
    //初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({

        traceUser: true
      })  
    }
    //获取系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();   //右上角胶囊按钮坐标信息
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo
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
          console.log('no')
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  //全局变量
  globalData: {
    openid:'',
    username:'',
    startTimeText: '',
    endTimeText: '',
    room: '',
    chooseid:'',
    chooseidtofind:''
  }
})