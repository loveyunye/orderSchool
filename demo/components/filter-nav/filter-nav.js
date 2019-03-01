// components/filter-nav/filter-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemNum: -1,
    itemName1: '全部',
    itemName2: '品牌',
    itemName3: '特色',
    selectBrandId: -1, //选择的品牌ID
    selectServiceId: -1, //选择的服务ID
    selectRegion: {
      item: 0,
      sideList: [], //侧边导航的list
      list: [], //详情list
      selectDistrictId: -1, //选择的大区ID
      selectAreaId: -1, //选择的小区ID
      selectLineId: -1, //选择的地铁线ID
      selectStationId: -1 //选择的地铁站ID
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
