<template>
  <div class="check">
    <steper></steper>
    <div class="check_car">
      <div class="check_font checkPic">
        <input class="fileInput" type="file" id="check_font" name="file" accept="image/png,image/gif,image/jpeg" @change="check_font" />
        <img :src="check_fontPic" id="font_img" alt="">
      </div>
      <div class="check_back checkPic">
        <input class="fileInput" type="file" id="check_back" name="file" accept="image/png,image/gif,image/jpeg" @change="check_back" />
        <img :src="check_backPic" id="back_img" alt="">
      </div>
    </div>
    <mu-form class="mu-demo-form receiver" ref="form" :model="Form" label-position="left" label-width="100">
      <mu-form-item label="接待人姓名" prop="username" :rules="usernameRules">
        <mu-text-field max-length="10" v-model="Form.receiver_name" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="接待人手机号" prop="mobile" :rules="mobileRules">
        <mu-text-field max-length="11" v-model="Form.receiver_call" prop="mobile"></mu-text-field>
      </mu-form-item>
    </mu-form>
    <div class="evaluate" @click="start_check">开始检车</div>
  </div>
</template>

<script>
  import steper from '../common/steper'
    export default {
        name: "check_car",
      components:{
        steper,
      },
      data(){
          return{
            usernameRules: [
              {validate: (val) => !!val, message: '必须填写姓名'},
              {validate: (val) => val.length >= 1, message: '用户名长度大于2小于5'}
            ],
            mobileRules: [
              {validate: (val) => !!val, message: '必须填写手机号'},
              {validate: (val) => val.length >= 10 && val.length <= 12, message: '手机号有误'}
            ],
            Form: {
              receiver_name: "",
              receiver_call: ""
            },
            check_fontPic: '../../../static/images/uploadCar.png',
            check_backPic: '../../../static/images/uploadCar.png'
        }
      },
      methods: {
        start_check() {
          this.$ajax.post('check-car/app/check/checkCar',{"orderId":this.$route.query.orderId,"receiver_name":this.Form.receiver_name,"receiver_call":this.Form.receiver_call})
            .then((res)=>{
              if(res.data.code == 200) {
                this.$router.push({name:'checked_car',query:{orderId:this.$route.query.orderId}})
              }
            })
        },
        //上传车外照片
        check_font(e){
          console.log(e);
          console.log(document.getElementById('avater'));
          let file = e.target.files[0];
          let param = new window.FormData(); //创建form对象
          param.append('file',file);//通过append向form对象添加数据
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头
          this.$ajax.post('/check-car/app/check/uploadBeforeImage', param , config)
            .then(res=>{
              console.log(res.data);
            })
        },
        //上传车内照片
        check_back(e){
          console.log(e);
          console.log(document.getElementById('avater'));
          let file = e.target.files[0];
          let param = new window.FormData(); //创建form对象
          param.append('file',file);//通过append向form对象添加数据
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头
          this.$ajax.post('/check-car/app/check/uploadBeforeImage',param,config)
            .then(res=>{
              console.log(res.data);
            })
        },
      }
    }
</script>

<style scoped>
  .receiver{
    margin-top: 50px;
  }
  .sign_pic{
    width: 100%;
    height: 200px;
  }
  .sign_pic img{
    width: 100%;
    height: 100%;
  }
  .check_car{
    height: 100px;
  }
  .checkPic{
    position: relative;
    width: 160px;
    height: 100px;
    background-color: #00bcd4;
  }
  .check_font{
    float: left;
  }
  .checkPic img{
    width: 100%;
    height: 100%;
  }
  .check_back{
    float: right;
  }
  .checkPic .fileInput{
    width: 160px;
    height: 100px;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .evaluate{
    clear: both;
    margin: 100px auto 0;
    width: 90%;
    line-height: 60px;
    background-color: #00bcd4;
    color: #fafafa;
    text-align: center;
    font-size: 16px;
  }
</style>
