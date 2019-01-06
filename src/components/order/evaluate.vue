<template>
    <div class="evaluate">
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
      <mu-container>
        <mu-form :model="form" class="mu-demo-form" label-position="top" label-width="100">
          <mu-form-item prop="textarea" label="评语">
            <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.textarea"></mu-text-field>
          </mu-form-item>
        </mu-form>
      </mu-container>
      <div class="submit" @click="sub_evaluate">提交</div>
    </div>
</template>

<script>
    export default {
        name: "evaluate",
      data(){
          return{
            form: {
              textarea: ''
            },
            check_fontPic: '../../../static/images/uploadCar.png',
            check_backPic: '../../../static/images/uploadCar.png'
          }
      },methods: {
        sub_evaluate() {
          this.$ajax.post('check-car/app/check/assess',{"orderId": this.$route.query.orderId,"orderScore": this.form.select,"orderAccess": this.form.textarea})
            .then((res)=>{
              if (res.data.code == 200){
                this.$router.push({name:'order_list'})
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
.submit{
  margin: 20px auto 0;
  width: 90%;
  line-height: 60px;
  background-color: #00bcd4;
  text-align: center;
  color: #fafafa;
  font-size: 16px;
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
</style>
