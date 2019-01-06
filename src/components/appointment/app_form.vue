 <template>
  <mu-container>
    <div class="font_pic">
			<img v-if="refresh_img" :src="headpic" id="ex_img" :class="isUploadImg ? 'upload_pic2' : 'upload_pic' ">
			<span v-if="! isReadonly">上传行驶证的正面照片</span>
      <input class="fileInput" type="file" id="avater" name="file" accept="image/png,image/gif,image/jpeg" :disabled="isReadonly" @change="update" />

    </div>
    <mu-form :model="form" class="mu-demo-form" label-position="left" label-width="100">

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
        <mu-date-input v-model="form.registerDate" container="dialog" :disabled="isReadonly"  full-width></mu-date-input>
      </mu-form-item>
			<mu-flex align-items="center" :disabled="isReadonly" style="padding-bottom: 8px;">
				<span style="margin-right: 16px;">是否为运营车:</span>
				<mu-radio v-model="operateCar" style="margin-right: 16px;" checked value="1" label="是" ></mu-radio>
				<mu-radio v-model="operateCar" style="margin-right: 16px;" value="0" label="否" ></mu-radio>
			</mu-flex>
      <mu-circular-progress v-if="this.loading" class="loading demo-circular-progress" :size="36"></mu-circular-progress>
			<mu-button class="editBtn" round color="success" v-if="isReadonly" @click="editInfo">修改</mu-button>
			<mu-button class="nextBtn" @click="to_next" v-if="!isReadonly" color="primary">保存</mu-button>

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
            registerDate: ''

          },
          loading: false,
					operateCar: '1',
          headpic: '../../../static/images/uploadCar.png'
        }
      },
			computed: {
				img_class: function(){
					if(this.isReadonly){
						return upload_pic2;
					}else{
						return upload_pic;
					}
				}
			},
      methods: {
        editInfo(){
          this.isReadonly = false
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
            "registerDate": this.form.registerDate,
						// ( == true? 1: 0)
            "operateCar": this.operateCar
          }).then((res)=> {
            if (res.data.code ==200){
              if (this.$route.query.type == 1){
                this.$router.push({name:'agent'});
              }
              this.isReadonly = true;
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
        update(e){
          this.loading = true;
          let file = e.target.files[0];
          let param = new window.FormData(); //创建form对象
          param.append('file',file);//通过append向form对象添加数据
          this.$ajax.post('/check-car/app/check/uploadCarPic',param)
            .then((res)=>{
              if(res.data.code == 200){
                this.isUploadImg=true;
								this.refresh_img=false;
								this.refresh_img=true;
                this.$ajax.get("/check-car/app/check/user/getCarInfo")
                  .then((res)=> {
                    if (res.data.code ==200){
                      // == 1 ? true:false
                      // this.form.operateCar = res.data.carInfo.operateCar
                      this.form.carType = res.data.carInfo.carType==5?'五座汽车':'七座汽车';
                      this.form.plateNum = res.data.carInfo.plateNum;
                      this.form.vinId = res.data.carInfo.vin;
                      this.form.registerDate = res.data.carInfo.registerDate;
                      this.headpic = 'http://129.204.110.142:8080/check-car/app/sms/showCarPic/'+res.data.carInfo.userId+'/'+res.data.carInfo.plateNum;
                      this.operateCar = JSON.stringify(res.data.carInfo.operateCar);
                      // this.isReadonly=true;
                      this.isUploadImg=true;
                    }else if (res.data.code == 500) {
                      this.openSimple = true;
                      this.msg = res.data.msg
                    }
                    this.loading = false;
                  });
							}else if (res.data.code == 500) {
                this.loading = false;
                this.openSimple = true;
                this.msg = res.data.msg;
              }
            })
        }
      },
      created(){
        this.$ajax.get("/check-car/app/check/user/getCarInfo", {
        }).then((res)=> {
          if (res.data.code ==200){
            this.isReadonly = true;
            this.form.carType = res.data.carInfo.carType==5?'五座汽车':'七座汽车';
            this.form.plateNum = res.data.carInfo.plateNum;
            this.form.vinId = res.data.carInfo.vin;
            this.form.registerDate = res.data.carInfo.registerDate;
            this.headpic = 'http://129.204.110.142:8080/check-car/app/sms/showCarPic/'+res.data.carInfo.userId+'/'+res.data.carInfo.plateNum;
            this.operateCar = JSON.stringify(res.data.carInfo.operateCar);
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
  margin-left: 15px;
  width: 90%;
}

.editBtn{
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
