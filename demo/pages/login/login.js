// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'15879021032',
    password: '123456',
    confirmPassword: '',
    hasRegister: true,
  },
  // 双向绑定
  bindKeyPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  bindKeyPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindKeyConfirm(e){
    this.setData({
      confirmPassword: e.detail.value
    })
  },
  // 
  userInfoHandler: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    let userObject = e.detail.userInfo
    console.log(app.globalData)

    // wx.showLoading({
    //   title: '登录中',
    // })
    wx.request({
      url: `http://localhost:3000/mobile/customer/getUser`,
      data: {
        password: this.data.password,
        phone: this.data.phone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // wx.hideLoading()
        
        console.log(res)
        if(res.data.length ===0 ){
          wx.showToast({
            title: '密码账号不存在',
            // icon: 'loading',
            duration: 2000
          })
          // wx.showModal({
          //   title: '提示',
          //   content: '这是一个模态弹窗',
          //   success(res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定')
          //     } else if (res.cancel) {
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
        }else {
          wx.switchTab({
            url: '/pages/order/order',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
          })
        }
        
      }
    })
  },
  registerHandler(e){
    
  },
  registerTarget(){
    this.setData({
      hasRegister: !this.data.hasRegister
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