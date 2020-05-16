const db = wx.cloud.database();
const app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    avatarUrl: '',
    userInfo: {},
    userName: 'null',
    userPhone: 'null',
    elements: [{
        title: '发布支部活动',
        name: 'order',
        icon: 'like',
        color: 'blue',
        path: 'act1'
      },
      {
        title: '发布志愿服务',
        name: 'order',
        icon: 'settings',
        color: 'cyan',
        path: 'act2'
      },
      {
        title: '管理支部党员',
        name: 'order',
        icon: 'settings',
        color: 'orange',
        path: 'act3'
      },
      {
        title: '发布学习任务',
        name: 'order',
        icon: 'settings',
        color: 'red',
        path: 'act4'
      },
      
    ]
  },
  tonote(e){
    wx.navigateTo({
      url: '/pages/join1_note/join1_note',
    })
  },
  exit() {
    wx.redirectTo({
      url: '/pages/gotopage/gotopage',
    })
  },
  todetail(e){
    wx.navigateTo({
      url: '/pages/index_detail/index_detail',
    })
  },
  onLoad: function(options) {
    var t = wx.getStorageSync('user')
    this.setData({
      userInfo: t
    })
    var t2 = wx.getStorageSync('name')
    this.setData({
      userName: t2
    })
  }
})