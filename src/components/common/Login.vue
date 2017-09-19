<template>
<!-- Form -->
  <el-dialog title="用户登录" :visible.sync="dialogLoginVisible" size="tiny">
    <el-form :model="form" :rules="rules" ref="form">

      <el-form-item label="用户手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="用户密码" :label-width="formLabelWidth" prop="pwd">
        <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
        <el-input v-model="form.captcha" auto-complete="off" style="width:100px;float:left"></el-input>
        <template>
          <img style="margin-left:50px" onclick="this.src=this.src+'?'" :src="this.HOST+'/Captcha'" />
        </template>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <div class="reg">没有账号？请点击 <span @click="dialogReg">注册</span></div>
      <el-button @click="dialogLoginVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" 
        v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="加载中，请稍后" >确 定</el-button>
    </div>
  </el-dialog>

</template>


<script>
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
              if(value == '')
                callback(new Error('请输入手机号'));
              else if(!(/^1[34578]\d{9}$/.test(value)))
                callback(new Error('手机号码有误，请重填'));
              else
                callback();
            };

      return {
        fullscreenLoading:false,
        dialogLoginVisible: false,
        form: {
          phone: '',
          pwd:'',
          captcha:''
        },
        rules: {
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '输入不足6位', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 5, max: 5, message: '输入不正确', trigger: 'blur' }
          ],
        },
        formLabelWidth: '125px'
      };
    },
     methods: {
       LoginHandle(data){
          this.$emit('LoginHandle',data);
        },
       dialogHandle(){
         this.dialogLoginVisible = !this.dialogLoginVisible;
       },
      dialogReg(){
        this.$emit('dialogReg');
        this.dialogHandle();
      },
      submitForm(formName) {
        this.fullscreenLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.HOST+'/Passport/Login',{
              'phone':this.form.phone,
              'pwd':this.form.pwd,
              'captcha':this.form.captcha
            })
            .then(response => {
                this.fullscreenLoading = false;
                if(response.data.status=='success'){
                  this.LoginHandle(response.data);
                  this.setCookie('uuid',response.data.uuid,3);
                  this.successDlg('登录成功');
                  this.dialogHandle();
                }
                else{
                  this.errorDlg(response.data.msg);
                }
            }, response => {
                this.fullscreenLoading = false;
                this.errorDlg('登录失败，请重试');
                this.dialogHandle();
            })
          } else {
            this.errorDlg('信息未填写完');
            this.fullscreenLoading = false;
            return false;
          }
        });
      },
      successDlg(msg) {
        this.$notify({
          title: '成功',
          message: msg,
          type: 'success'
        });
      },
      errorDlg(msg) {
        this.$notify.error({
          title: '错误',
          message: msg
        });
      },
     }
  };
</script>

<style>
.el-input__inner{
  max-width:250px;
}
.reg{
  color:#48576a;
  float:left;
}
.reg span{
  color:#20a0ff;
  cursor: pointer;
}
</style>