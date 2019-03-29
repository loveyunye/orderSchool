<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

import ajax from '@/utils/ajax.js'

const animationDuration = 3000
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    show: {
      default: false
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    show(newVal) {
      if(newVal) {
        this.initChart();
      }
    }
  },
  methods: {
    initChart() {
      if(!this.show){
        return;
      } 
      this.chart = echarts.init(this.$el, 'macarons')
      ajax('/sys/order/businessRank').then(res => {
        const numberArr = res.map(item => item.number);
        const priceArr = res.map(item => item.price);
        const nameArr = res.map(item => item.name);
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params, ticket, callback) {
              console.log(params[0].name);
              const orderNumer = res.filter(item => item.name === params[0].name)[0].number;
              return  `<span style="display:inline-block;
              margin-right:5px;border-radius:10px;
              width:10px;height:10px;background-color:#2ec7c9;"></span>收入：${params[0].data}<br/>
              <span style="display:inline-block;
              margin-right:5px;border-radius:10px;
              width:10px;height:10px;background-color:#2ec7c9;"></span>数量：${orderNumer}<br/>
              `;
            }  
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: nameArr,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '收入',
            type: 'bar',
            barWidth: '30%',
            data: priceArr,
            animationDuration
          }]
        })
      })
    }
  }
}
</script>
<style lang="scss" >
  #businessRank {
    background-color: #fff;

  }
</style>