const db = wx.cloud.database();
const app = getApp();
const list = db.collection('colorlist');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorpart1:[],
    colorlist: [],
    chooseindex: 0,
    messages: [{
        'union': 'XXX',
        'rank': '15°',
        'score': 80,
        'date': '2020/3/31',
        'name': 'XXX活动名称',
        'checked': false,
      },
      {
        'union': 'XXX',
        'rank': '45°',
        'score': 80,
        'date': '2020/3/31',
        'name': 'XXX活动名称',
        'checked': false,
      },
      {
        'union': 'XXX',
        'rank': '110°',
        'score': 80,
        'date': '2020/3/31',
        'name': 'XXX活动名称',
        'checked': false,
      }
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.currentTarget.dataset.id)
    let num = parseInt(e.currentTarget.dataset.id)
    let t = 'colorlist[' + e.currentTarget.dataset.id + '].checked'
    this.setData({
      [t]: !this.data.colorlist[num].checked,
      delindex:e.currentTarget.dataset.id,
      chooseindex: e.currentTarget.dataset._id
    })
  },
  choose1(e) {
    app.globalData.chooseid = this.data.chooseindex
    wx.switchTab({
      url: '/pages/color/color',
    })
  },
  choose2(e) {
    app.globalData.chooseidtofind = this.data.chooseindex
    wx.switchTab({
      url: '/pages/find/find',
    })
  },

  choose3(e) {
    console.log(this.data.chooseindex)
    wx.showModal({
      title: '确定',
      content: '确定要删除这条记录吗？',
      cancelText: '取消',
      confirmText: '确认删除',
      success: res => {
        if (res.confirm) {
          list.doc(this.data.chooseindex).remove({
            success: function(res) {
              console.log(res.data)
            }
          })
          this.data.colorlist.splice(this.data.delindex, 1);
          this.setData({
            colorlist:this.data.colorlist
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    list.get({
      success: function (res) {
        console.log(res)
        that.setData({
          colorlist: res.data
        })
      }
    })
  },
})