// pages/order/order.js
const list = Array.from(new Array(2)).map((_val, i) => ({
  avatar: '',
  shopName: '老板娘很忙饭庄',
  price: '12.5',
  date: '2018-12-11 11:32',
  dinnerName: '青椒肉丝咖喱炒饭',
  commentStatus: +`${i}`%2===0?true:false,
  orderId: i
})); 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyOrderList: list ,
    nowOrder:{
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
})