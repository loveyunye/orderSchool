// pages/orderDetail/orderDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dinnerList: [],
    orderMessage: {},
    urlHead: app.globalData.urlHead,
    statusObject: {
      0: '商家正在准备',
      1: '美食正在派送',
      2: '订单已经完成'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const vm = this;
    wx.getStorage({
      key: 'orderDetail',
      success: function(res) {
        console.log(JSON.parse(res.data.order_content))


        vm.setData({
          orderMessage: Object.assign({},res.data),
          dinnerList: JSON.parse(res.data.order_content)
        })
      },
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