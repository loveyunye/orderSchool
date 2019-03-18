
import { formatTime } from '../../utils/util.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowOrder: [],
    historyOrder: [],
    urlHead: app.globalData.urlHead
  },
  /** 
   * 自定义方法 
   */
  // 跳转
  touchstore(e) {
    const {  business_id } = e.currentTarget.dataset.view
    wx.showLoading({
      title: '跳转中',
    })
    wx.request({
      url: app.globalData.urlHead + `/sys/user/getUserById`,
      data: {
        user_id: business_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.setStorageSync('storeMessage', res.data[0])
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/storeDetail/storeDetail'
        })
      }
    })
  },
  orderDetail(e) {
    const orderMessage = e.currentTarget.dataset.item
    wx.setStorage({
      key: 'orderDetail',
      data: orderMessage,
    })
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail'
    })
  },
  getOrderList(status){
    return new Promise((resolve,reject) => {
      wx.request({
        url: app.globalData.urlHead+'/mobile/order/getOrderMobile',
        data: {
          mobile_userId: app.globalData.userInfo.mobile_userId,
          isHistory: status?1:0
        },
        success(res){
          resolve(res.data.map(item => {
            return Object.assign(item, { create_time: formatTime(new Date(item.create_time)) })
          }))
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getOrderList().then(res => {

    // })
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
    const vm = this;
    //正在进行的订单
    this.getOrderList(false).then(nowOrder => {
      vm.setData({
        nowOrder: nowOrder
      })
    });
    // 已经完成的订单
    this.getOrderList(true).then(historyOrder => {
      vm.setData({
        historyOrder: historyOrder
      })
    });
  },
  onHide: function(){

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