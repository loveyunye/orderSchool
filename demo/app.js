//app.js
App({
  onLaunch: function () {
    const vm = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var userInfo = wx.getStorageSync('userInfo') || null
    if(userInfo){
      this.globalData.userInfo = userInfo
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=',
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   success: function (res) {
        //     console.log(res.data.openid) //获取openid
        //   }
        // })
        console.log(res.code)

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })


    // 获取菜单品种信息
    wx.request({
      url: `${this.globalData.urlHead}/sys/dinner/dinnerType`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        vm.globalData.dinnerType = res.data.map(item => item)
      }
    })
  },
  globalData: {
    userInfo: null,
    urlHead: 'http://localhost:3000',
    dinnerType: []
  },

})