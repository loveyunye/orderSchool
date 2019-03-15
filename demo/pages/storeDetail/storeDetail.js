// pages/storeDetail/storeDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 已选菜品
    selectDinnerList:[],
    orderForm:{
      order_content:'',
      mobile_userId: '',
      business_id: '',
      order_status: '',
      create_time: '',
      remark: '',
      total_price: 0,
      total_num: 0,
    },

    //
    storeMessage:null,
    params: {
      dinnerName: '',
      dinnerType: '',
      length: 100,
      start: 0,
      userId: ''
    },
    dinner_id:0,
    dinnerList: [],
    dinnerListBak: [],
    dinnerType: [],
    selectType: ''
  },
  /**
   * 一些自定义方法
   */
  selectDinnerType(e){
    const { dinnerType_id } = e.currentTarget.dataset.text;
    this.setData({
      selectType: dinnerType_id,
      dinnerList: this.data.dinnerListBak.filter(item => {
        if (!dinnerType_id) {
          return true
        } else {
          console.log(item.dinnerType_id === dinnerType_id, item.dinnerType_id)
          return item.dinner_type === dinnerType_id
        }
      })
    })
  },
  pageInit(){
    const vm = this
    wx.getStorage({
      key: 'storeMessage',
      success: function (res) {
        vm.setData({
          storeMessage: Object.assign({},res.data,{
            portrait: app.globalData.urlHead+res.data.portrait
          }),
          params: Object.assign({},vm.data.params,{userId: res.data.user_id})
        })
        console.log(vm.data.dinner_id)
        vm.getList()
      },
    })
  },
  // 获取所有菜品，并初始化值
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    const vm = this
    wx.request({
      url: app.globalData.urlHead + `/mobile/dinner/getDinner`,
      data: this.data.params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let selectDinnerList = []
        let orderForm = {
          order_content: '',
          mobile_userId: app.globalData.userInfo.mobile_userId,
          business_id: vm.data.storeMessage.user_id,
          order_status: 0,
          total_price: 0,
          total_num: 0,
        }
        if(vm.data.dinner_id){
          selectDinnerList = res.data.data.filter(item => {
            return item.dinner_id === vm.data.dinner_id
          })
          orderForm.total_num = 1
          orderForm.total_price = selectDinnerList[0].dinner_price
          orderForm.order_content = JSON.stringify(selectDinnerList)
        }

        vm.setData({
          dinnerList: res.data.data.map(item => {
            return Object.assign({}, item, {
              imgSrc: app.globalData.urlHead + JSON.parse(item.dinner_photo)[0].url
            })
          }),
          dinnerListBak: res.data.data.map(item => {
            return Object.assign({}, item, {
              imgSrc: app.globalData.urlHead + JSON.parse(item.dinner_photo)[0].url
            })
          }),

          selectDinnerList: selectDinnerList,
          orderForm: orderForm
        })
        wx.hideLoading()
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.hasOwnProperty('dinner_id')){
      this.setData({
        dinner_id:+options.dinner_id
      })
    }
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.pageInit()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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