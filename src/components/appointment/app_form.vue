 <template>
  <mu-container>
    <div class="font_pic">
			<img v-if="refresh_img" :src="headpic" id="ex_img" class="upload_pic">
			<span v-if="! isReadonly">上传行驶证的正面照片</span>
			<!-- capture='camera'  -->
      <input class="fileInput" accept="image/*" type="file" id="avater" name="file" @change="update" />

    </div>
    <mu-form :model="form" class="mu-demo-form pa " label-position="left" label-width="100" style="padding-bottom: 80px;">

      <mu-form-item prop="select" label="车辆类型">
        <mu-select v-model="form.carType" :readonly="isReadonly">
          <mu-option v-for="(index,item) in options" :key="index" :label="index" :value="item" :readonly="isReadonly"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-form-item prop="plateNum" label="车辆号牌" :rules="carIdRules">
        <mu-text-field v-model="form.plateNum" prop="plateNum" :readonly="isReadonly"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="vinId" label="车辆识别代号" :rules="vinIdRules">
        <mu-text-field v-model="form.vinId" prop="vinId" max-length="17" :readonly="isReadonly"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="date" label="车辆注册日期">
				<span>{{form.registerDate}}</span>
        <!-- <mu-date-input v-model="form.registerDate" container="dialog" :disabled="isReadonly"  full-width></mu-date-input> -->
      </mu-form-item>
			<mu-form-item prop="date" label="车辆使用性质">
				<!-- <mu-date-input v-model="form.registerDate" container="dialog" :disabled="isReadonly"  full-width></mu-date-input> -->
				<span>{{form.use_character}}</span>
			</mu-form-item>
			<!-- <mu-flex align-items="center" :disabled="isReadonly" style="padding-bottom: 8px;">
				<span style="margin-right: 16px;">使用性质:</span>
				<mu-radio v-model="operateCar" style="margin-right: 16px;" checked value="1" label="是" ></mu-radio>
				<mu-radio v-model="operateCar" style="margin-right: 16px;" value="0" label="否" ></mu-radio>
			</mu-flex> -->
      
			<mu-button class="editBtn" round color="success" v-if="isReadonly" @click="editInfo">修改</mu-button>
			<mu-button class="nextBtn" @click="to_next" v-if="isSave" color="primary">保存</mu-button>
			<mu-circular-progress v-if="this.loading" class="loading demo-circular-progress" :size="36" text="图片解析中">
			</mu-circular-progress>
    </mu-form>
    <mu-dialog title="提示信息" width="360" :open.sync="openSimple">
      {{msg}}
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </mu-container>


</template>

<script>

    export default {
        name: "app_form",
      data () {
        return {
					refresh_img: true,
					isUploadImg: false,
					isReadonly: false,
					isSave: false,
					carIdRules: [
						{validate: (val) => !!val, message: '必须填写车牌号'},
						{validate: (val) => this.isLicensePlate(val), message: '车牌号有误'}
					],
					vinIdRules: [
						{validate: (val) => !!val, message: '必须填写车辆识别代号'},
						{validate: (val) => val.length == 17 , message: '请正确输入17位的车辆识别代号'}
					],
          options: {
            5:'五座汽车',
            7:'七座汽车'
          },
          msg:"",
          openSimple: false,
          labelPosition: 'left',
          form: {
            carType: '',
            plateNum: '',
            vinId: '',
            registerDate: '',
						use_character:''

          },
          loading: false,
					operateCar: '1',
          headpic: '/static/images/camera-iris.png'
        }
      },
      methods: {
        editInfo(){
          this.isReadonly = false
					this.isSave = true
        },
				// 驾驶证校验
				isLicensePlate(str) {
					return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(str)
				},
        to_next(){
          this.$ajax.post("/check-car/app/check/user/addUserCar", {
            "carType": this.form.carType == '五座汽车'?5:7,
            "plateNum": this.form.plateNum,
            "vinId": this.form.vinId,
            "registerDate": this.form.registerDate
            // "operateCar": this.operateCar
          }).then((res)=> {
            if (res.data.code ==200){
              if (this.$route.query.type == 1){
                this.$router.push({name:'agent'});
              }
              this.isReadonly = true;
							this.isSave=false
            }else if (res.data.code == 500){
              this.isReadonly = false;
              this.openSimple = true;
              this.msg = res.data.msg
            }
          });
        },
        closeSimpleDialog () {
          this.openSimple = false;
        },
				upload_img(param){
					console.log(param)
					console.log(param.get('file'))
					console.log("开始上传")
					this.$ajax.post('/check-car/app/check/uploadCarPic',param,{timeout: 5000})
						.then((res)=>{
							if(res.data.code == 200){
								// setTimeout("window.location.reload()",2000);
								console.log(new Date())
								this.loading = false;
								this.form.plateNum = res.data.plate_num
								this.form.vinId = res.data.vin
								this.form.registerDate = res.data.register_date
								this.form.use_character = res.data.use_character
								this.headpic = "/static/images/模糊.jpg"
								this.$toast.success('选择您的车辆类型');
								this.isSave=true
							}else if (res.data.code == 500) {
								this.loading = false;
								this.openSimple = true;
								this.msg = res.data.msg;
							}else if(res.data.code ==401){
								setTimeout(this.$router.push({name: 'login'}),3000);
								this.$toast.info("登陆失效，请重新登陆");
							}
						}).catch(() => {
							if(this.loading == false){
								this.$toast.error('请求超时，刷新重试')
								console.log('超时')
								setTimeout("window.location.reload()",3000);
							}
						})
				},
// 				upload_img_ajax(param){
// 					$.ajax({ url: "http://114.115.215.44:8080/check-car/app/check/uploadCarPic",
// 						data: {"file": param.get('file')},
// 						beforeSend: function(xhr){
// 							xhr.setRequestHeader("token",JSON.parse(localStorage.getItem('USER')).token);
// 						},
// 						success: function(data){
// 							this.loading = false;
// 							this.$toast.success('选择您的车辆类型');
// 							console.log(data)
// 						},
// 					});
// 					
// 				},
        update(e){
// 					let ua = navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase()
// 					let isWX = /MicroMessenger/i.test(ua)
// 					if(isWX){
// 						this.msg='请点开右上角，从外部打开'
// 						this.openSimple=true
// 						return
// 					}
					console.log(new Date().getTime())
					console.log(e)
          this.$toast.info('5秒内若如结果，可刷新重试')
          let file = e.target.files[0];
          let param = new window.FormData(); //创建form对象
          param.append('file',file);//通过append向form对象添加数据
					console.log(new Date())
					this.loading = true;
					setTimeout(this.upload_img(param),2000)
					this.upload_img(param)
        }
      },
      created(){
				let userInfo = JSON.parse(localStorage.getItem('USER'));
				if(!userInfo){
					this.$router.push({name: 'login'})
				}else{
					let nowdate = new Date()
					if((nowdate.getTime() - userInfo.date)/1000 > userInfo.expire){
						localStorage.clear()
						this.$router.push({name: 'login'})
					}
				}
				
        this.$ajax.get("/check-car/app/check/user/getCarInfo", {
        }).then((res)=> {
					 console.log(res)
          if (res.data.code ==200){
						console.log(res.data)
            this.isReadonly = true;
            this.form.carType = res.data.carInfo.carType==5?'五座汽车':'七座汽车';
            this.form.plateNum = res.data.carInfo.plateNum;
            this.form.vinId = res.data.carInfo.vin;
            this.form.registerDate = res.data.carInfo.registerDate;
						this.form.use_character = res.data.carInfo.useCharacter;
						this.headpic = "/static/images/模糊.jpg"
            // this.headpic = 'http://localhost:8080/check-car/app/sms/showCarPic/'+res.data.carInfo.userId+'/'+res.data.carInfo.plateNum;
            // this.operateCar = JSON.stringify(res.data.carInfo.operateCar);
						
          }else if(res.data.code ==401){
						// setTimeout(this.$router.push({name: 'login'}),3000);
						this.$toast.info("登陆失效，请重新登陆");
					}
					else if(res.data.code ==500){
						console.log(res.data.msg)
						// Toast.info('请先上传照片');
						this.$toast.info(res.data.msg);
					}
        });
      }
    }
</script>

<style scoped>
.font_pic{
  margin-bottom: 2rem;
  height: 10rem;
  /* background-color: #ffa2c4; */
}

.upload_pic{
	width: 100%;
	height: 100%;
}
.font_pic span{
	margin-left: 36%;
	margin-top: 21%;
	font-size: 14px;
	font-weight: 500;
}
/* .font_pic img{
  width: 100%;
  height: 100%;
} */
.nextBtn{
	height: 100%;
  margin-left: 15px;
  width: 90%;
}

.editBtn{
	height: 100%;
	margin-bottom: 10px;
  margin-left: 30%;
  width: 40%;
}
.suporse{
  margin: 0.5rem auto;
  text-align: center;
}
/*定义上传*/
.fileInput{

  width: 98%;
  height: 160px;
  position: absolute;
  right: 0;
  top: 72px;
  opacity: 0
}
.loading{
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 9999;
}

</style>
