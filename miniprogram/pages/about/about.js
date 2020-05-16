const db = wx.cloud.database();
const app = getApp();
const admin = db.collection('user');

Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    github: '',
    userinfo: '',
    infoall: [],
    type: ""
  },

  clickGit: function() {
    wx.setClipboardData({
      data: this.data.github,
      success: res => {
        wx.showToast({
          title: '以复制地址！',
          duration: 2000,
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var t = wx.getStorageSync('name')
    this.setData({
      userinfo: t
    })
    admin.where({
      name: this.data.userinfo
    }).get({
      success: (res) => {
        console.log(res.data)
        let user = res.data;
        this.setData({
          infoall: user
        })
        if (user[0].index == '0') {
          this.setData({
            type: '入党积极分子'
          })
        }
        else if (user[0].index == '1') {
          this.setData({
            type: '发展对象'
          })
        }
        else if (user[0].index == '2') {
          this.setData({
            type: '预备党员'
          })
        }
        else if (user[0].index == '3') {
          this.setData({
            type: '正式党员'
          })
        }
      }
    })
  },

})