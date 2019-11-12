// pages/detail/detail.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    ps: [],
    isActivity: false,
    isShouCang: true,
    showModal: false,
    date: '0000-00-00',
    time: '00:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!options.id) {
      this.getData();
    } else {
      this.setData({
        article: options,
        ps: options.text.split('\n')
      })
    }
  },
  /**
   * 不足自动补0
   */
  timeAdd0(str) {
    if (str.length <= 1) {
      str = '0' + str;
    }
    return str
  },
  /**
   * 下一篇文章
   */
  next() {
    this.getData();
    // 返回顶部
    wx.pageScrollTo({
      scrollTop: 0
    });
  },
  /**
   * 获取文章信息
   */
  getData() {
    this.setData({
      isActivity: !this.data.isActivity
    });
    wx.request({
      url: 'https://mall.petoffice.tech/mryw/article/random',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        this.setData({
          article: res.data,
          ps: res.data.text.split('\n')
        });
        wx.showToast({
          title: res.data.name,
          icon: 'loading'
        });
      }
    });
  },
  /**
   * 收藏文章
   */
  shoucang() {
    wx.request({
      url: 'https://mall.petoffice.tech/mryw/article/collect',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        openId: wx.getStorageSync('openId'),
        articleId: this.data.article.id
      },
      success: (res) => {
        wx.showToast({
          title: res.data
        });
      }
    });
  },
  /**
   * 跳转收藏页面
   */
  tolist() {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  /**
   * 跳转提醒页面
   */
  toNotice() {
    let myDate = new Date();
    this.setData({
      date: this.timeAdd0(myDate.getFullYear() + '') + '-' + this.timeAdd0((myDate.getMonth() + 1) + '') + '-' + this.timeAdd0(myDate.getDate() + ''),
      time: this.timeAdd0(myDate.getHours() + '') + ':' + this.timeAdd0(myDate.getMinutes() + '')
    });
    wx.requestSubscribeMessage({
      tmplIds: ['cT4L02cREfczGqo3LeuhAExlpuiPh18r2HeSHROM9E8'],
      success: (res) =>  {
        console.log(res);
        if (res['cT4L02cREfczGqo3LeuhAExlpuiPh18r2HeSHROM9E8'] == 'accept'){
          this.setData({
            showModal: true
          })
        }
      }
    })
  },
  saveMsg(){
    wx.request({
      url: 'https://mall.petoffice.tech/mryw/message/saveMessage',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        openId: wx.getStorageSync('openId'),
        dateTime: this.data.date+' '+this.data.time
      },
      success: (res) => {
        wx.showToast({
          title: res.data
        });
        this.setData({
          showModal: false
        })
      }
    });
  },
  /**
   * 隐藏模态框
   */
  hideModal() {
    this.setData({
      showModal: false
    })
  },
  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
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