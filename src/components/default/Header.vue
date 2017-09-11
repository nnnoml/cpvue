<template>
  <div>

    <el-menu class="el-menu-demo" mode="horizontal">
      <router-link class="el-menu-item title" to="/" tag="li">首页</router-link>
      <router-link class="el-menu-item title" to="about" tag="li">关于</router-link>

      <el-submenu index=""  v-if="login=='true'">
        <template slot="title">user_name</template>
        <router-link class="el-menu-item title" to="/" tag="li">loginout</router-link>
        <router-link class="el-menu-item title" to="about" tag="li">setting</router-link>
      </el-submenu>
      
      <el-menu-item style="float:right" index="" v-else>login in</el-menu-item>

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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu--horizontal .el-submenu{
  float:right;
}
</style>
