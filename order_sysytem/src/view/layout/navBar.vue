<template>
  <div class="nav-container">
    <div class="link">
      <!-- <router-link v-for="(item,index) in routerArr" :key="index" :to="item.path" class="linkBtn">{{item.name}}</router-link> -->
      <span v-if="token" style="margin-left:50px;">欢迎您,{{name}}</span> &nbsp;
      <span @click="logOut" v-if="token" style="cursor: pointer;color:blue;text-decoration: underline;">
        退出
      </span>
      <span @click="logIn" v-else  style="cursor:pointer;margin-left:50px; text-decoration: underline;">登录</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'
import ajax from '@/utils/ajax'

export default {
  data() {
    return {
       routerArr:[{
         path: '/dashboard',
         name: '首页'
       },
       {
         path: '/convention',
         name: '预约'
       },{
         path: '/personal',
         name: '我的'
       }],
       token:Cookie.get('Token-Auth'),
    }
  },
  computed:{
    
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    logIn(){
      this.$router.push({ path: '/login'})

    },
    logOut() {
      this.$confirm('确定退出吗?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
          this.$store.dispatch('LogOut').then(()=>{
            this.$router.push({ path: '/login'})
            this.token = Cookie.get('Token-Auth')
          })
        // })

        
      }).catch(()=>{
        
      })
    }
  },
  mounted() {
    
  }
  
}
</script>
<style lang="scss" scoped>
  .nav-container {
      border-bottom: 1px #cecece solid;
      width: 100%;
      margin: 0 auto;
      padding: 5px 0;
      overflow: hidden;
      div.logo,div.title {
        float: left;
       
      }
      div.link {
        float: right;
        line-height: 50px;
        margin-right: 40px;
        

      }

      

  }
</style>
