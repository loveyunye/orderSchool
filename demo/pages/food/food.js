// pages/food.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      dinnerName: '',
      dinnerType: '',
      length: 3,
      start: 0,
      userId: ''
    },
    paramsBak: {
      dinnerName: '',
      dinnerType: '',
      length: 10,
      start: 0,
      userId: ''
    },
    dinnerList:[]
  },
  // 获取菜单
  getList() {
    let vm = this
    wx.request({
      url: app.globalData.urlHead+`/mobile/dinner/getDinner`,
      data: this.data.params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        vm.setData({
          dinnerList: res.data.data
        })
        console.log(res)
        if (res.data.length === 0) {
          
        } else {
          
        }

      }
    })

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
    this.getList()
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
    this.setData({
      params: Object.assign({},this.data.paramsBak)
    })
    this.getList()
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