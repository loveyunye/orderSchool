<template>
  <div  :style="{height: minWidth}" id="BusinessView">
    <div>您有新的订单</div>
    <div>您有新的订单</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minWidth: '',
    }
  },
  mounted() {
    this.minWidth = (document.body.clientHeight - 120 - 80 - 100 ) + 'px'
  }
}
</script>
<style lang="scss">
  #BusinessView {
    // width: 100%;
		// box-sizing: border-box;
    display: flex;
    margin-top: 10px; 
    div {
      background-color: #fff;
      height: 100%;
    }
  }
</style>
