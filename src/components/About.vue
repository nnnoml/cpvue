<template>
  <div class = "box" >
    <Headertpl :login="login"  @dialogLogin="dialogLogin"></Headertpl>
    <Pagetpl></Pagetpl>
    <Footertpl></Footertpl>
    <Login ref="login" @dialogReg="dialogReg" @LoginHandle="LoginHandle"></Login>
    <Register ref="register"></Register>
  </div>

</template>

<script>
import Headertpl from './default/Header.vue'
import Footertpl from './default/Footer.vue'
import Pagetpl from './default/Page.vue'
import Login from './common/Login.vue'
import Register from './common/Register.vue'

export default {
  data () {
    return {
    }
  },
  props:['login'],
  components: {
    Headertpl,
    Pagetpl,
    Footertpl,
    Login,
    Register
  },
  methods:{
    LoginHandle(data){
      this.$emit('LoginSuccess',data);
    },
    dialogLogin(){
      this.$refs.login.dialogHandle();
    },
    dialogReg(){
      this.$refs.register.dialogHandle();
    }
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
