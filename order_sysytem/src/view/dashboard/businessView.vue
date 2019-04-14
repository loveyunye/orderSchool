<template>
  <div  :style="{height: minHeight}" id="BusinessView">
    <div class="order-status">
      <div>
        <img src="https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"  alt="" width="100%">
      </div>
      <div>
        <div class="order-block">未接收订单：<span class="order">{{orderNoget}}</span> </div>
        <div class="order-block">派送中订单：<span class="order">{{orderNoSend}}</span> </div>
        <div class="order-block"><el-button size="medium" type="primary" @click="goOrder">进入订单页查看</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax.js';
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      minHeight: '',
      userObject:{},
      userId: '',
      timer: null,

      orderNoget: 0,
      orderNoSend: 0

    };
  },
  computed: {
    ...mapGetters([
      'userMess'
    ])
  },
  methods: {
    getOrderByStatus() {

      const userId = JSON.parse(this.userMess).user_id;
      ajax('/sys/order/getOrderSystem',{
        userId,
        status: 0,
        start: 0,
        length: 100
      }).then(res => {
        console.log(res)
        this.orderNoget = res.total;
      });
      ajax('/sys/order/getOrderSystem',{
        userId,
        status: 1,
        start: 0,
        length: 100
      }).then(res => {
        console.log(res);
        this.orderNoSend = res.total;
      })
    },
    goOrder() {
      this.$router.push({path: '/orderList'});
    }
  },
  mounted() {
    this.minHeight = (document.body.clientHeight - 120 - 80 - 100 ) + 'px';
    this.getOrderByStatus();
  },
  destroyed() {

  }
}
</script>
<style lang="scss">
  #BusinessView {
    // width: 100%;
		// box-sizing: border-box;
    &>div {
      background-color: #fff;
      height: 100%;
      width: 100%;
      
    }
    .order-status {
      height: 100%;
      display: flex;
      &>div {
        width: 50%;
        height: 100%;
        overflow: hidden;
        

      } 
      div.order-block {
        height: 110px;
        width: 100%;
        line-height: 100px;
        overflow: hidden;
        text-align: center;
        font-size: 20px;
        span.order {
          font-size: 70px;
          color: #409EFF;
          margin-left: 100px;
          font-weight: 500;
        }
      }
      div.order-block:first-child {
        padding-top: 40px;
      }

    }
  }
</style>
