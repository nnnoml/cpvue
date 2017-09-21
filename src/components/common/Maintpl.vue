<template>
  <div v-if="valid_status" class="main_center">
    <el-row :gutter="20">
      <el-col :span="8"><h1>10086</h1></el-col>
      <el-col :span="8">
        <el-checkbox-group class="option" v-model="Option_check_list" @change="play_status">
          <el-checkbox-button v-for="opt in Option" :label="opt" :key="opt">{{opt}}</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
      <el-col :span="8">1</el-col>
    </el-row>

<el-row v-for="cp in cp_list" type="flex" :gutter="0" justify="center">
      <el-col :span="1">{{cp.code}}</el-col>
      <el-col v-if="wan_status" :span="4">
        <el-row :gutter="20">
          <el-col :span="10" v-html="zhijie1(wan(cp.code),'wan')"></el-col>
          <el-col :span="7"><span class="dddfault">1</span></el-col>
          <el-col :span="7">{{cp.code | wan | zhijie3('wan')}}</el-col>
        </el-row>
      </el-col>
      <el-col v-if="qian_status" :span="4">
        <el-row :gutter="20">
          <el-col :span="8">q</el-col>
          <el-col :span="8">10086</el-col>
          <el-col :span="8">10086</el-col>
        </el-row>
      </el-col>
      <el-col v-if="bai_status" :span="4">
        <el-row :gutter="20">
          <el-col :span="8">b</el-col>
          <el-col :span="8">10086</el-col>
          <el-col :span="8">10086</el-col>
        </el-row>
      </el-col>
      <el-col v-if="shi_status" :span="4">
        <el-row :gutter="20">
          <el-col :span="8">s</el-col>
          <el-col :span="8">10086</el-col>
          <el-col :span="8">10086</el-col>
        </el-row>
      </el-col>
      <el-col v-if="ge_status" :span="4">
        <el-row :gutter="20">
          <el-col :span="8">g</el-col>
          <el-col :span="8">10086</el-col>
          <el-col :span="8">10086</el-col>
        </el-row>
      </el-col>
</el-row>


  </div>
</template>
<script>
  const Options = ['上海', '北京', '广州', '深圳','西安'];
  const SelectOptions = ['模式一', '模式二'];
  const mode = [
    //model1
    [
      [1,2,4,6,8,10],//0
      [1,2,4,6,8,10],//1
      [2,4,5,7,9,10],//2
      [1,3,5,7,8,10],//3
      [1,3,4,6,7,9],//4
      [2,3,5,6,8,9],//5
      [2,3,5,6,8,9],//6
      [1,3,4,6,7,9],//7
      [1,3,5,7,8,10],//8
      [2,4,5,7,9,10],//9
    ]
  ];
  export default {
    data () {
      return {
        valid_status:true,//登录状态
        Option_check_list:[],//头部选中记录
        Option: Options,//头部选择器
        
        cp_list:[],//中奖列表
        cp_list_single : [],//分解中奖列表存储
        wan_status:false,
        wan_mode:1,
        qian_status:false,
        qian_mode:1,
        bai_status:false,
        bai_mode:1,
        shi_status:false,
        shi_mode:1,
        ge_status:false,
        ge_mode:1,
      };
    },
    filters: {
        wan(value){ return parseInt(value/10000);},
        zhijie1(value,mode_status)
        {
          var ret='';
          for(var i=0; i<6; i++){
           ret = ret + '<span>' + mode[0][value][i] + '</span>';
          }
          
          return ret;
        },
        zhijie2(value,mode_status)
        {
          return 'zhijie2';
        },
        zhijie3(value,mode_status)
        {
          return 'zhijie3';
        }
    },
    methods:{
        wan(value){ return parseInt(value/10000);},
        zhijie1(value,mode_status)
        {
          var ret='';
          for(var i=0; i<6; i++){
           ret = ret + "<span class='default'>" + mode[0][value][i] + "</span>";
          }
          
          return ret;
        },
        zhijie2(value,mode_status)
        {
          return 'zhijie2';
        },
        zhijie3(value,mode_status)
        {
          return 'zhijie3';
        },

        in_array(search,array){
            for(var i in array){
                if(array[i]==search){
                    return true;
                }
            }
            return false;
        },
        play_status(){

          this.wan_status = this.in_array('上海',this.Option_check_list);
          this.qian_status = this.in_array('北京',this.Option_check_list);
          this.bai_status = this.in_array('广州',this.Option_check_list);
          this.shi_status = this.in_array('深圳',this.Option_check_list);
          this.ge_status = this.in_array('西安',this.Option_check_list);
        },
        
    },
    mounted:function(){
      setInterval(()=>{
      //     //检测玩家是否过期
          if(this.getCookie('uuid')!=0){
              this.$http.post(this.HOST+'/Main',{
                'uuid':this.getCookie('uuid')
              })
              .then(response => {
                  if(response.data.status=='success' && response.data.valid_status){
                    this.valid_status = true
                    this.cp_list[this.cp_list.length-1] != response.data.cp_list[response.data.cp_list.length-1];
                    this.cp_list = response.data.cp_list;
                  }else{
                      window.location.href='/';
                  }
              })
          }
          else window.location.href='/';
      },1000);
    }
  }
</script>

<style scoped>
.main_center{ background:#fff; overflow:hidden; font-family:'微软雅黑';}
.main_center .option{ margin-top:10px; text-align:center;}
.main_center h1{text-indent:10px;}
.main_center .dddfault{font-size:12px; border:1px solid #ccc; width:7px;height:18px; padding:0px 3px; display:block; float:left; overflow:hidden;}
.main_center .red{font-size:12px; border:1px solid #ccc; width:7px;height:18px; padding:0px 3px; display:block; float:left; overflow:hidden;}
.main_center .gray{font-size:12px; border:1px solid #ccc; width:7px;height:18px; padding:0px 3px; display:block; float:left; overflow:hidden;}
.main_center .white{font-size:12px; border:1px solid #ccc; width:7px;height:18px; padding:0px 3px; display:block; float:left; overflow:hidden;}
</style>