<template>
	<div class="sider-container">
    <div class="title">
      校园订餐
    </div>
		<ul>
      <li v-for="(item,index) in routerArr" :key="index">
        <router-link   :to="item.path" class="linkBtn"><i :class="'el-icon-'+item.icon"></i> {{item.title}}</router-link>
      </li>
    </ul>
	</div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import { constantRouterMap } from '../../router'
	export default {
    data(){
      return {
        routerArr:[]
      }
    },
		computed: {
			...mapGetters([
        'token'
      ])
		},
		mounted(){
      let routerArr = []
      constantRouterMap.forEach(item => {
          if(item.auth === 'common' || item.auth === this.token){
            routerArr.push(item)
          }
      })
      this.routerArr = routerArr.map(item => item)
    }
	}
	
</script>

<style type="text/scss" lang="scss">
  .sider-container {
    min-height: 100vh;
    background-color: #001529;
    .title {
      height: 60px;
      color: #1890ff;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
    }

    .linkBtn {
      color: #ccc;
      display: inline-block;
      line-height: 20px;
      // padding: 5px 10px;
      // border-radius: 4px;
      text-indent: 10px;
      width: 100%;
      // text-align: center;
      height: 40px;
      line-height: 40px;
      margin-bottom: 5px;
    }
    .linkBtn:nth-child(4) {
      margin-right: 30px;
    }
    .active {
      color: #fff;
      background-color: #1890ff;
    }

  }

</style>
