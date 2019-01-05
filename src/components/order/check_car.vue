<template>
  <div class="check">
    <steper></steper>
    <div class="sign_pic">
      <img src="/static/images/sign.png" alt="">
    </div>
    <div class="check_car">
      <div class="check_font checkPic">
        <input class="fileInput" type="file" id="check_font" name="file" accept="image/png,image/gif,image/jpeg" @change="check_font" />
        <img src="../../../static/images/sign.png" id="font_img" alt="">
      </div>
      <div class="check_back checkPic">
        <input class="fileInput" type="file" id="check_back" name="file" accept="image/png,image/gif,image/jpeg" @change="check_back" />
        <img :src="check_backPic" id="back_img" alt="">
      </div>
    </div>

    <div class="evaluate" @click="to_evaluate">完成</div>
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

        }
      },
      methods: {
        to_evaluate() {
          this.$router.push({name:'order_list'})
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
  .check_car{
    height: 100px;
  }
  .sign_pic{
    width: 100%;
    height: 200px;
  }
  .sign_pic img{
    width: 100%;
    height: 100%;
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
