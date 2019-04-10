<template>
  <div  :style="{height: minHeight}" id="BusinessView">
    <div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minHeight: '',
    }
  },
  mounted() {
    this.minHeight = (document.body.clientHeight - 120 - 80 - 100 ) + 'px'
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
      width: 100%;
      display: flex;
    }
  }
</style>
