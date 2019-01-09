<template>
    <div class="evaluate">
      <div class="check_car">
        <div class="check_font checkPic">
          <input class="fileInput" type="file" id="check_font" name="file" accept="image/png,image/gif,image/jpeg" @change="check_font" />
          <img :src="car_out_img" id="font_img" alt="">
					<span >上传一张您车辆的外部照片</span>
        </div>
        <div class="check_back checkPic">
          <input class="fileInput" type="file" id="check_back" name="file" accept="image/png,image/gif,image/jpeg" @change="check_back" />
          <img :src="car_in_img" id="back_img" alt="">
					<span >上传一张您车辆的内部照片</span>
        </div>
      </div>
      <div class="star">
        <p>评价</p>
        <div class="grade">
          <img  v-for="(item,index) in options" :data-id=index  :src=item alt="" @click="choose_star" />
          <span class="eva_det">{{eva_msgDet}}</span>
        </div>
      </div>
      <mu-container>
        <mu-form :model="form" class="mu-demo-form eva_form" label-position="top" label-width="100">
          <mu-form-item prop="textarea" label="评语">
            <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.textarea"></mu-text-field>
          </mu-form-item>
        </mu-form>
				
				<mu-dialog title="提示信息" width="360" :open.sync="openSimple">
					{{msg}}
					<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
				</mu-dialog>
				
				<mu-dialog title="提示信息" width="360" :open.sync="openSimple2">
					评价完成
					<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog2">返回首页</mu-button>
				</mu-dialog>
      </mu-container>
      <div class="submit" @click="sub_evaluate">提交</div>
    </div>
</template>

<script>
    export default {
        name: "evaluate",
      data(){
          return{
						openSimple: false,
						msg: '',
						openSimple2: false,
            options: {
              1: '/static/images/xingxingshixin.png',
              2: '/static/images/xingxingshixin.png',
              3: '/static/images/xingxingshixin.png',
              4: '/static/images/xingxingshixin.png',
              5: '/static/images/xingxingshixin.png'
            },
            store: 5,
            eva_msg: {
              1: '差评',
              2: '可以接受',
              3: '不错',
              4: '良好',
              5: '非常好'
            },
            eva_msgDet: '非常好',
            form: {
              textarea: ''
            },
            car_out_img: '/static/images/uploadCar.png',
            car_in_img: '/static/images/uploadCar.png'
          }
      },methods: {
        sub_evaluate() {
          this.$ajax.post('check-car/app/check/assess',
					{"orderId": this.$route.query.orderId,
					"orderScore": this.store,
					"orderAssess": this.form.textarea,
					}).then((res)=>{
              if (res.data.code == 200){
								this.openSimple2=true
              }else{
								this.openSimple=true
								this.msg=res.data.msg
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
					param.append('type','0');
					param.append('orderId',this.$route.query.orderId);
          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          }; //添加请求头
          this.$ajax.post('/check-car/app/check/uploadAfterImage', param , config)
            .then(res=>{
              console.log(res.data);
							if(res.data.code==200){
								this.car_out_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/3';
							}else if (res.data.code==500){
								this.openSimple=true
								this.msg=res.data.msg
								this.car_out_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/3';
							}
            })
        },
        //上传车内照片
        check_back(e){
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
          this.$ajax.post('/check-car/app/check/uploadAfterImage',param,config)
            .then(res=>{
              console.log(res.data);
							if(res.data.code==200){
								this.car_in_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/4';
							}else if (res.data.code==500){
								this.openSimple=true
								this.msg=res.data.msg
								this.car_in_img = 'http://129.204.110.142:8080/check-car/app/showCarPic/'+res.data.userId+'/'+this.$route.query.orderId+'/4';
							}
            })
        },
        choose_star(e) {
          for (let i = 1;i < 6;i++){
            this.options[i] = '/static/images/xingxing.png';
          }
          let id = e.target.getAttribute('data-id');
          let len = parseInt(id) + 1;
          this.store = len - 1;
          this.eva_msgDet = this.eva_msg[id];
          for (let i = 1;i < len;i++){
            this.options[i] = '/static/images/xingxingshixin.png';
          }
        },
				closeSimpleDialog(){
					this.openSimple=false
				},
				closeSimpleDialog2(){
					this.openSimple2=false
					this.$router.push({name:'index'})
				}
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
  .eva_form{
    margin-top: 20px;
  }
  .star{
    margin-top: 50px;
  }
  .star p{
    padding: 10px;
  }
  .grade{
    padding: 0 40px;
  }
  .grade img{
    margin-right: 10px;
  }
  .eva_det{
    margin-left: 10px;
    font-size: 14px;
    color: #ff0785;
  }
</style>
