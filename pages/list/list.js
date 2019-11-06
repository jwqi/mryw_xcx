// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles:[],
    chooseId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectionList();
  },
  /**
   * 获取收藏列表
   */
  getCollectionList(){
    wx.request({
      url: 'https://mall.petoffice.tech/mryw/article/getCollectionList',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openId: wx.getStorageSync('openId')
      },
      success: (res) => {
        this.setData({
          articles: res.data
        })
      }
    });
  },
  /**
   * 跳转文章页
   */
  toDetail(e){
    let { id, name, author, text } = e.currentTarget.dataset;
    wx.reLaunch({
     url: '/pages/detail/detail?id=' + id + '&name=' + name + '&author=' + author + '&text=' + text,
   })
  },
  /**
   * 长按
   */
  handleLongPress(e) {
    let {id} = e.currentTarget.dataset;
    this.setData({
      chooseId:id
    })
    console.log("长按",id);
  },
  /**
   * 删除收藏文章
   */
  delCollectionArticle(){
    wx.request({
      url: 'https://mall.petoffice.tech/mryw/article/delCollection?openId=' + wx.getStorageSync('openId') + "&articleId=" + this.data.chooseId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'DELETE',
      success: (res) => {
        this.setData({
          chooseId:0
        });
        wx.showToast({
          title: res.data
        });
        this.getCollectionList();
      }
    });
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