// pages/storeDetail/storeDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收齐放下
    downStatus:false,
    orderStatus: false,
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
  //goOrder下单
  goOrder(){
    if(this.data.orderStatus){
      wx.showModal({
        title: '下单提示',
        content: '确定之后就不能更改了',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  // 选择类型
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
  upDownHandler() {
    this.setData({
      downStatus: !this.data.downStatus
    })
  },
  // 菜单操作
  selectHandler(dinner,addStatus){
    const vm = this;
    let selectItemIndex = vm.data.selectDinnerList.findIndex(item => item.dinner_id === dinner.dinner_id), 
    selectDinnerList = vm.data.selectDinnerList.map(item => item);
    if(addStatus){
      if (selectItemIndex>=0){
        selectDinnerList[selectItemIndex].number++
      } else {
        selectDinnerList.push(Object.assign({}, dinner, { number: 1 }))
      }
    } else {
      selectDinnerList[selectItemIndex].number --
      selectDinnerList = selectDinnerList.filter(item => item.number>0)
    }

    let total_num = 0, total_price = 0;
    for (let i = 0; i < selectDinnerList.length; i++){
      total_num += selectDinnerList[i].number
      total_price += selectDinnerList[i].number * selectDinnerList[i].dinner_price
    }
    vm.setData({
      selectDinnerList: selectDinnerList,
      orderForm:Object.assign({},vm.data.orderForm,{
        total_num: total_num,
        total_price: total_price,
        order_content: JSON.stringify(selectDinnerList)
      }),
      orderStatus: total_num?true:false
    })
  },
  addSelectDinner(e){
    const {view} = e.currentTarget.dataset
    this.selectHandler(view,true)
  },
  deleteSelectDinner(e){
    const { view } = e.currentTarget.dataset
    this.selectHandler(view, false)
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
          orderForm: orderForm
        })

        if (vm.data.dinner_id) {
          selectDinnerList = res.data.data.filter(item => {
            return item.dinner_id === vm.data.dinner_id
          })
          vm.selectHandler(selectDinnerList[0],true)
        }
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