// pages/store.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeName: '全部',
    moveData: null,
    showSelect: false,
    imgHeadUrl: app.globalData.urlHead,


    // 
    params: {
      name: '',
      length: 10,
      start: 0
    },
    paramsBak: {
      name: '',
      length: 10,
      start: 0
    },
    storeList: [],
    storeType: []
  },
  // 获取菜单
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    const vm = this
    wx.request({
      url: app.globalData.urlHead + `/sys/user/getUserList`,
      data: this.data.params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        vm.setData({
          storeList: res.data.data.map(item => {
            return Object.assign({}, item, {
              portrait:   item.portrait
            })
          })
        })
        wx.hideLoading()
      }
    })
  },
  // 跳转
  touchstore(e) {
    wx.setStorageSync('storeMessage', e.currentTarget.dataset.view)
    wx.navigateTo({
      url: '/pages/storeDetail/storeDetail'
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

  radioChange(e) {

  },
  inputSearch() {
    console.log('搜索')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      params: Object.assign({}, this.data.paramsBak),
      imgHeadUrl: app.globalData.urlHead
    })
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
      params: Object.assign({}, this.data.paramsBak)
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      params: Object.assign({}, this.data.params, { length: this.data.params.length + 10 })
    })
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})