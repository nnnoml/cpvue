<template>
  <div class = "box" >
    <Headertpl v-bind:login="login_status"></Headertpl>
    <Pagetpl></Pagetpl>
    <Footertpl></Footertpl>
  </div>

</template>

<script>
import Headertpl from './default/Header.vue'
import Banner from './default/Banner.vue'
import Footertpl from './default/Footer.vue'
import Pagetpl from './default/Page.vue'

export default {
  data () {
    return {
        login_status: 'true'
    }
  },
  components: {
    Headertpl,
    Banner,
    Pagetpl,
    Footertpl
  }
}
</script>

<style scoped>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
