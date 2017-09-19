<template>
    <div class="main">
        <router-view
                keep-alive
                transition="fade"
                transition-mode='out-in' 
                :login="login" 
                @LoginSuccess="LoginSuccess"
                v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中，请稍后"
                ></router-view>
    </div>
</template>

<script>


export default {
  data () {
    return {
      login:{
        status : false,
        name   : '-'
      },
      fullscreenLoading:false,
    }
  },
  methods:{
    LoginSuccess(data){
      this.login.status = true;
      this.login.name = data.name;
    }
  },
  mounted:function(){
    if(this.getCookie('uuid')!=0){
          this.fullscreenLoading = true;
            this.$http.post(this.HOST+'/Passport/Check',{
              'uuid':this.getCookie('uuid')
            })
            .then(response => {
                this.fullscreenLoading = false;
                if(response.data.status=='success'){
                  this.LoginSuccess(response.data);
                  this.setCookie('uuid',response.data.uuid,3);
                }
            })
          }
    }
  }
</script>
