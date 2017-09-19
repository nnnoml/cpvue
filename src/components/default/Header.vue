<template>
  <div>

    <el-menu class="el-menu-demo" mode="horizontal">
      <router-link class="el-menu-item title" to="/" tag="li">首页</router-link>
      <router-link class="el-menu-item title" to="about" tag="li">关于</router-link>

      <el-submenu index=""  v-if="login.status">
        <template slot="title">{{login.name}}</template>
        <router-link class="el-menu-item title" to="/" tag="li">登出</router-link>
        <router-link class="el-menu-item title" to="about" tag="li">个人信息</router-link>
      </el-submenu>

      <el-menu-item style="float:right" index="" @click="dialogLogin" v-else>登录</el-menu-item>

    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props:['login'],
    methods: {
      dialogLogin(){
       this.$emit('dialogLogin');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu--horizontal .el-submenu{
  float:right;margin-right:20px;
}
.el-submenu .el-menu-item{
  min-width:120px;
  text-align:center;
}
</style>
