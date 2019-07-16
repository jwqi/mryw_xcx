// pages/detail/detail.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    ps: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (!options.id){
      this.getData();
    } else {
      this.setData({
        detail: options,
        ps: options.text.split('\n')
      })
    }
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
    wx.request({
      url: 'http://www.jwqi.top/mryw/article/random',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data);
        this.setData({
          detail: res.data,
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
      url: 'http://www.jwqi.top/mryw/article/collect',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        openId: wx.getStorageSync('openId'),
        articleId: this.data.detail.id
      },
      success: (res) => {
        console.log(res.data);
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
    wx.redirectTo({
      url: '/pages/list/list',
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