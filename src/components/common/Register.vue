<template>
<!-- Form -->
  <el-dialog title="用户注册" :visible.sync="dialogRegisterVisible" size="tiny">
    <el-form :model="form" :rules="rules" ref="form">

      <el-form-item label="用户手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="用户密码" :label-width="formLabelWidth" prop="pwd">
        <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="pwd2">
        <el-input type="password" v-model="form.pwd2" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="推荐人手机" :label-width="formLabelWidth" prop="recommend_phone">
        <el-input v-model="form.recommend_phone" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
        <el-input v-model="form.captcha" auto-complete="off" style="width:100px;float:left"></el-input>
        <template>
          <img style="margin-left:50px" onclick="this.src=this.src+'?'" :src="this.HOST+'/Captcha'" />
        </template>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogRegisterVisible = false">取 消</el-button>
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

        var validatePass = (rule, value, callback) => {
            if (value === '') 
                callback(new Error('请输入密码'));
            else if(value.length<6)  
                callback(new Error('密码必须6位以上'));
            else {
            if (this.form.pwd2 !== '') {
                this.$refs.form.validateField('pwd2');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.form.pwd) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };

      return {
        fullscreenLoading:false,
        dialogRegisterVisible: false,
        form: {
            phone:'',
            name: '',
            pwd:'',
            pwd2:'',
            recommend_phone : '',
            captcha:''
        },
        rules: {
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
            { min: 2,max:5 , message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, validator: validatePass, trigger: 'blur' },
          ],
          pwd2: [
            { required: true, validator: validatePass2, trigger: 'blur' },
          ],
          recommend_phone: [
            { required: true, validator: checkPhone, trigger: 'blur' },
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 5, max: 5, message: '输入不正确', trigger: 'blur' }
          ]
        },
        formLabelWidth: '125px'
      };
    },
     methods: {
       dialogHandle(){
        this.dialogRegisterVisible = !this.dialogRegisterVisible;
       },
      submitForm(formName) {
        this.fullscreenLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.fullscreenLoading = false;
            alert('submit!');
          } else {
            this.fullscreenLoading = false;
            console.log('error submit!!');
            return false;
          }
        });
      }
     }
  };
</script>

<style>
.el-input__inner{
  max-width:250px;
}
</style>