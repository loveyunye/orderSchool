<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  
  color: #2c3e50;
  
  a {
    text-decoration: none;
  }
  font-size: 14px;
  
  ul > li {
    list-style: none;
    
  }
  background-color: #f0f0f0;
  // a {
  //   text-decoration: none;
  // }

}
ul,li {
  margin: 0;
  padding: 0;
}
</style>
