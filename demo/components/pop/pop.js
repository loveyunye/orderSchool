Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  },
  /** 
   * 组件的属性列表 
   * 用于组件自定义设置 
  */
  properties: {
    message: { type: String, value: '提示信息' }
  },
  /** 
   * 私有数据,组件的初始数据 
   * 可用于模版渲染 
   */
  data: { // 弹窗显示控制 
    isShow: true,
    widthScreen: null,
    moveData: null

  },
  /**
   * 组件的方法列表 
   * 更新属性和数据的方法与更新页面数据的方法类似 
  */
  methods: {
    /** 
    * 公有方法 
    */
    //隐藏弹框 
    hideDialog() {
      var animation = wx.createAnimation({
        duration: 1000,
        delay: 0,
        timingFunction: "ease",
      });
      animation.translate(0, 0).step({ duration: 500 })
      this.setData({ moveData: animation.export() })
    },
    //展示弹框 
    showDialog() {
      var animation = wx.createAnimation({
        duration: 1000,
        delay: 0,
        timingFunction: "ease",
      });
      animation.translate(-160, 0).step({ duration: 500 })
      this.setData({ moveData: animation.export() })
    },
    // 弹出缩紧
    popShowHide(){
      const vm = this;
      vm.showDialog()
      setTimeout(function () {
        vm.hideDialog()
      }, 2000);
    }
  },
})