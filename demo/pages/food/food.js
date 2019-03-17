// pages/food.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeName: '全部',
    moveData: null,
    showSelect:false,
    imgHeadUrl:'',
    // 
    params: {
      dinnerName: '',
      dinnerType: '',
      length: 20,
      start: 0,
      userId: ''
    },
    paramsBak: {
      dinnerName: '',
      dinnerType: '',
      length: 20,
      start: 0,
      userId: ''
    },
    dinnerList:[],
    dinnerType: []
  },
  // 获取菜单
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    const vm = this
    wx.request({
      url: app.globalData.urlHead+`/mobile/dinner/getDinner`,
      data: this.data.params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        vm.setData({
          dinnerList: res.data.data.map(item => {
            return Object.assign({},item , {
              imgSrc: app.globalData.urlHead+JSON.parse(item.dinner_photo)[0].url
            })
          })
        })
        wx.hideLoading()
      }
    })
  },
  // 跳转
  touchFood(e){
    const { dinner_id, user_id } = e.currentTarget.dataset.view
    console.log(dinner_id,user_id)
    wx.showLoading({
      title: '跳转中',
    })
    wx.request({
      url: app.globalData.urlHead + `/sys/user/getUserById`,
      data: {
        user_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.setStorageSync('storeMessage', res.data[0])
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/storeDetail/storeDetail?dinner_id=' + dinner_id,
        })
      }
    })

  },
  // 类型切换
  selectDinnerType(e){
    const { dinnerType_id, type_name } = e.currentTarget.dataset.text
    const dinnerType_ever = this.data.params.dinnerType
    this.setData({
      showSelect: !this.data.showSelect,
      typeName: type_name,
      params: Object.assign({}, this.data.params, { dinnerType: dinnerType_id })
    },function(){
    })
    this.getList()
  },
  showDinnerType(){
    this.setData({
      showSelect: !this.data.showSelect
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
    const dinnerArr = [{
      dinnerType_id: '',
      type_name: '全部'
    }].concat(app.globalData.dinnerType)
    this.setData({
      dinnerType: dinnerArr
    })
  },

  inputSearch(){
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
      params: Object.assign({},this.data.paramsBak)
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      params: Object.assign({}, this.data.params, {length: this.data.params.length+10})
    })
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})