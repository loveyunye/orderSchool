// pages/login/login.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone:'15879021032',
    password: '123456',
    confirmPassword: '123456',
    hasRegister: true,
    dialog: null,
    popMessage: '提示信息'
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
  // 切换注册
  registerTarget() {
    this.setData({
      hasRegister: !this.data.hasRegister
    })
  },
  // 弹出层
  popMessage(mess){
    const vm = this;
    vm.popMess.popShowHide();
    vm.setData({
      popMessage: mess
    });
  },
  // 登录
  userInfoHandler: function (e) {
    let vm = this
    wx.showLoading({
      title: '登录中',
    })
    wx.request({
      url: `${app.globalData.urlHead}/mobile/customer/getUser`,
      data: {
        password: this.data.password,
        phone: this.data.phone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        if(res.data.length ===0 ){
          vm.popMessage('登录信息有误')
        }else {
          app.globalData.userInfo = res.data[0]
          wx.setStorageSync('userInfo', res.data[0])
          wx.switchTab({
            url: '/pages/food/food',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
          })
        }
        
      }
    })
  },
  registerHandler(e){
    const vm = this
    if (!(/^1[34578]\d{9}$/.test(this.data.phone))){
      vm.popMessage('手机号格式有误')
      return
    }
    if(this.data.password!==this.data.confirmPassword){
      vm.popMessage('两次密码不同')
      return
    }
    console.log(submitObj)
    const submitObj = Object.assign({}, e.detail.userInfo,{
      password: this.data.password,
      phone: this.data.phone,
      remark: '暂无',
      address: '暂无'
    })
    wx.showLoading({
      title: '加载中',
    })


    wx.request({
      url: `${app.globalData.urlHead}/mobile/customer/createUser`,
      data: submitObj,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        if(res.data.handler === false){
          vm.popMessage('手机号已被注册');
        } else {
          app.globalData.userInfo = Object.assign({},submitObj,{mobile_userId: res.data.inserId})
          wx.setStorageSync('userInfo', app.globalData.userInfo)
          wx.switchTab({
            url: '/pages/food/food',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
          })
        }
      }
    })
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
    if(app.globalData.userInfo){
      wx.switchTab({
        url: '/pages/food/food',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
      })
    }
    this.popMess = this.selectComponent('#popMess');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})