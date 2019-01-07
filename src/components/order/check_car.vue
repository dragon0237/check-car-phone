<template>
  <div class="check">
    <steper></steper>
    <div class="check_car">
      <div class="check_font checkPic">
        <input class="fileInput" type="file" id="check_font" name="file" accept="image/png,image/gif,image/jpeg" @change="car_out" />
        <img :src="car_out_img" id="font_img" alt="">
				<span >上传一张您车辆的外部照片</span>
      </div>
      <div class="check_back checkPic">
        <input class="fileInput" type="file" id="check_back" name="file" accept="image/png,image/gif,image/jpeg" @change="car_in" />
        <img :src="car_in_img" id="back_img" alt="">
				<span >上传一张您车辆的内部照片</span>
      </div>
    </div>
    <mu-form class="mu-demo-form receiver" ref="form" :model="Form" label-position="left" label-width="100">
      <mu-form-item label="接待人姓名" prop="username" >
        <mu-text-field max-length="10" v-model="Form.receiver_name" prop="username"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="接待人手机号" prop="mobile" >
        <mu-text-field max-length="11" v-model="Form.receiver_call" prop="mobile"></mu-text-field>
      </mu-form-item>
    </mu-form>
		<mu-dialog title="提示信息" width="360" :open.sync="openSimple">
			{{msg}}
			<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
		</mu-dialog>
		
		<mu-dialog title="提示信息" width="360" :open.sync="openSimple2">
			检车开始
			<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog2">返回订单页面</mu-button>
		</mu-dialog>
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
						openSimple: false,
						openSimple2: false,
						msg: '',
//             usernameRules: [
//               {validate: (val) => !!val, message: '必须填写姓名'},
//               {validate: (val) => val.length >= 1, message: '用户名长度大于2小于5'}
//             ],
//             mobileRules: [
//               {validate: (val) => !!val, message: '必须填写手机号'},
//               {validate: (val) => val.length >= 10 && val.length <= 12, message: '手机号有误'}
//             ],
            Form: {
              receiver_name: "",
              receiver_call: ""
            },
            car_out_img: '../../../static/images/uploadCar.png',
            car_in_img: '../../../static/images/uploadCar.png'
        }
      },
      methods: {
        start_check() {
          this.$ajax.post('check-car/app/check/checkCar',
					{"orderId":this.$route.query.orderId,
					"receiver_name":this.Form.receiver_name,
					"receiver_call":this.Form.receiver_call
					}).then((res)=>{
              if(res.data.code == 200) {
                this.openSimple2=true
              }
            })
        },
        //上传车外照片
        car_out(e){
          console.log(e);
          console.log(document.getElementById('avater'));
          let file = e.target.files[0];
          let param = new window.FormData(); //创建form对象
          param.append('file',file);//通过append向form对象添加数据
					param.append('type','0');
					param.append('orderId',this.$route.query.orderId);
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头
          this.$ajax.post('/check-car/app/check/uploadBeforeImage', param , config)
            .then(res=>{
              console.log(res.data);
							if(res.data.code==200){
								this.car_out_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/1';
							}else if (res.data.code==500){
								this.openSimple=true
								this.msg=res.data.msg
								this.car_out_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/1';
							}
            })
        },
        //上传车内照片
        car_in(e){
          console.log(e);
          console.log(document.getElementById('avater'));
          let file = e.target.files[0];
          let param = new window.FormData(); //创建form对象
          param.append('file',file);//通过append向form对象添加数据
					param.append('type','1');
					param.append('orderId',this.$route.query.orderId);
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头
          this.$ajax.post('/check-car/app/check/uploadBeforeImage',param,config)
            .then(res=>{
              console.log(res.data)
							if(res.data.code==200){
								this.car_in_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/2';
							}else if (res.data.code==500){
								this.openSimple=true
								this.msg=res.data.msg
								this.car_in_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/2';
							}
            })
        },
				closeSimpleDialog(){
					this.openSimple=false
				},closeSimpleDialog2(){
					this.openSimple=false
					this.$router.push({name:'order_list'})
				}
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
	.check_car span{
		font-size: 10px;
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
