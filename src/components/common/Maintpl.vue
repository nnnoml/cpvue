<template>
  <div v-if="valid_status" class="main_center">
    <el-row :gutter="0">
      <el-col :span="8"><h1>10086</h1></el-col>
      <el-col :span="8">
        <el-checkbox-group class="option" v-model="Option_check_list" @change="play_status">
          <el-checkbox-button v-for="opt in Option" :label="opt" :key="opt">{{opt}}</el-checkbox-button>
        </el-checkbox-group>
      </el-col>
      <el-col :span="8">1</el-col>
    </el-row>

<el-row v-for="cp in cp_list" type="flex" :gutter="0" class="main_center_item"  :style="{ width: cp_width + 'px' }">
      <div>{{cp.qihao}}</div>|
      <div>{{cp.code}}</div>
      <div v-if="wan_status">
          <div class="zhijie1">
          <span @click="choosespan(cp.qihao,item,index)" v-for="(item,index) in zhijie1(cp,'wan')" :class="item.status">
              {{item.code}}
          </span>
          </div>
          <div class="zhijie2"><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span></div>
          <div class="zhijie3"><span>1</span><span>1</span><span>1</span><span>1</span></div>
      </div>
      <div v-if="qian_status">
          <div class="zhijie1">
          <span v-for="item in zhijie1(cp,'wan')" :class="item.status=='selected' ? 'selected' : 'noselect'">
              {{item.code}}
          </span>
          </div>
          <div class="zhijie2"><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span></div>
          <div class="zhijie3"><span>1</span><span>1</span><span>1</span><span>1</span></div>
      </div>
      <div v-if="bai_status">
          <div class="zhijie1">
          <span v-for="item in zhijie1(cp,'wan')" :class="item.status=='selected' ? 'selected' : 'noselect'">
              {{item.code}}
          </span>
          </div>
          <div class="zhijie2"><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span></div>
          <div class="zhijie3"><span>1</span><span>1</span><span>1</span><span>1</span></div>
      </div>
      <div v-if="shi_status">
          <div class="zhijie1">
          <span v-for="item in zhijie1(cp,'wan')" :class="item.status=='selected' ? 'selected' : 'noselect'">
              {{item.code}}
          </span>
          </div>
          <div class="zhijie2"><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span></div>
          <div class="zhijie3"><span>1</span><span>1</span><span>1</span><span>1</span></div>
      </div>
      <div v-if="ge_status">
          <div class="zhijie1">
          <span v-for="item in zhijie1(cp,'wan')" :class="item.status=='selected' ? 'selected' : 'noselect'">
              {{item.code}}
          </span>
          </div>
          <div class="zhijie2"><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span></div>
          <div class="zhijie3"><span>1</span><span>1</span><span>1</span><span>1</span></div>
      </div>
</el-row>


  </div>
</template>
<script>
  import Vue from 'vue'

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
        Option: Options,//模式选择器
        
        cp_width:795,//中段宽度 150 + 320x
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
    methods:{
        wan(value){ return parseInt((value.toString()).slice(0,1));},
        qian(value){ return parseInt((value.toString()).slice(1,1));},
        bai(value){ return parseInt((value.toString()).slice(2,1));},
        shi(value){ return parseInt((value.toString()).slice(3,1));},
        ge(value){ return parseInt((value.toString()).slice(4,1));},
        //肢解1号
        zhijie1(cp,mode_status)
        { 
          // let last_cp_single = ;
          let num;
          this.cp_list_single[cp.qihao]=new Array();
          if(mode_status == 'wan') num = this.wan(cp.code);
          for(let i=0; i<10; i++){
              this.cp_list_single[cp.qihao][i]=new Array();
              this.cp_list_single[cp.qihao][i]['code']='';
              this.cp_list_single[cp.qihao][i]['status_num']=1;
              this.cp_list_single[cp.qihao][i]['status']='noselect';
            for(let j=0; j<6;j++){
              if(mode[0][num][j] == i+1) {
                  this.cp_list_single[cp.qihao][i]['code']=this.PrefixInteger(i+1,2);
                  this.cp_list_single[cp.qihao][i]['status_num']=1;
                  this.cp_list_single[cp.qihao][i]['status']='selected';
                }
            }
          }
          // console.log(this.cp_list_single);
         return this.cp_list_single[cp.qihao];
        },
        zhijie2(cp,mode_status)
        {
          return 'zhijie2';
        },
        zhijie3(cp,mode_status)
        {
          return 'zhijie3';
        },
        //补0大法
        PrefixInteger(num, n) {
            return (Array(n).join(0) + num).slice(-n);
        },
        in_array(search,array){
            for(var i in array){
                if(array[i]==search){
                    return true;
                }
            }
            return false;
        },
        choosespan(qihao,item,index){
          // for(let i=0;i<this.cp_list_single[qihao][index].length;i++){
          //     if(this.cp_list_single[qihao][index]['code']!='') this.cp_list_single[qihao][index]['status']='selected';
          //     else this.cp_list_single[qihao][index]['status']='noselect';
          // }
          Vue.set(this.cp_list_single[qihao][index], 'status', 'jj');
          console.log(this.cp_list_single[qihao],item,index);
        },
        play_status(){

          this.wan_status = this.in_array('上海',this.Option_check_list);
          this.qian_status = this.in_array('北京',this.Option_check_list);
          this.bai_status = this.in_array('广州',this.Option_check_list);
          this.shi_status = this.in_array('深圳',this.Option_check_list);
          this.ge_status = this.in_array('西安',this.Option_check_list);

          if(this.Option_check_list.length>2 && this.Option_check_list.length<=3) this.cp_width = 1115;
          else if(this.Option_check_list.length>3 && this.Option_check_list.length<5) this.cp_width = 1435;
          else if(this.Option_check_list.length>=5) this.cp_width = 1755;
          else this.cp_width = 795;
        },
    },
    mounted:function(){
      // setInterval(()=>{
      setTimeout(()=>{
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
.main_center{ background:#fff;font-family:'微软雅黑';}
.main_center .option{ margin-top:10px; text-align:center;}
.main_center h1{text-indent:10px;}
.main_center span{font-size:12px; border:1px solid #ccc; width:14px;height:18px;text-align:center; display:block; float:left; overflow:hidden;}
.main_center_item {margin:0px auto;}
.main_center_item div{ float:left}
.main_center_item .zhijie1{ background:#999;}
.main_center_item .zhijie2{ background:#666;}
.main_center_item .zhijie3{ background:#999;}
/*
.main_center .selected{ background:red}
.main_center .noselect{ background:#ccc}
*/
.main_center .jj{ background:red}
</style>