<template>

  <div class="login">
    <h2>注册</h2>
    <mu-container class="login_box">
      <!-- <mu-paper class="demo-paper headpic" circle :z-depth="0">
          <div class="imageFileInput">
            <input class="fileInput" type="file" id="avater" name="file" accept="image/png,image/gif,image/jpeg" @change="update" />
            <img :src="headpic" id="ex_img">
          </div>
      </mu-paper> -->
			<div>
				<h2 class="head">预检车平台</h2>
			</div>
      <mu-form class="mu-demo-form" ref="form" :model="validateForm" label-position="left" label-width="80">
        <mu-form-item label="姓名" prop="username" :rules="usernameRules">
          <mu-text-field max-length="10" v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="手机号" prop="mobile" :rules="mobileRules">
          <mu-text-field max-length="11" v-model="validateForm.mobile" prop="mobile"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field max-length="16"  type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">注册</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
    <div class="to_login">
      <router-link :to="{name:'login'}">
        已经有账号了？点击登录
      </router-link>
    </div>
    <mu-dialog title="提示信息" width="360" :open.sync="openSimple">
      {{msg}}
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </div>

</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        usernameRules: [
          {validate: (val) => !!val, message: '必须填写姓名'},
          {validate: (val) => val.length >= 1, message: '用户名长度大于2小于5'}
        ],
        mobileRules: [
          {validate: (val) => !!val, message: '必须填写手机号'},
          {validate: (val) => val.length >= 10 && val.length <= 12, message: '手机号有误'}
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写密码'},
          {validate: (val) => val.length >= 6 && val.length <= 16, message: '密码长度大于6小于16'}
        ],
        validateForm: {
          username: "",
          password: "",
          mobile: ""
        },
        openSimple: false,
        msg:'',
        sign: false,
        headpic: '../../../static/images/people.png'
      }
    },
    methods: {

       //上传头像
      update(e){
        console.log(e);
        console.log(document.getElementById('avater'));
        let file = e.target.files[0];
        let param = new window.FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        }; //添加请求头
        this.$ajax.post('/check-car/app/uploadHP/'+this.validateForm.mobile,param,config)
          .then(response=>{
            console.log(response.data);
          })
        },
      submit () {
        this.$refs.form.validate().then((result) => {
          if(result){
            this.$ajax.post("/check-car/app/register", {"username":this.validateForm.username,"password":this.validateForm.password,"mobile":this.validateForm.mobile}).then((res)=>{
              // 响应成功回调
              console.log(res);
              if(res.data.code == 200){
                this.openSimple = true;
                this.msg = '注册成功';
                this.sign = true
								let params = {};
									params.expire = res.data.expire;
									params.token = res.data.token;
									params.date = new Date();
								localStorage.clear();
								localStorage.setItem('USER',JSON.stringify(params));

              }else{
                this.openSimple = true;
                this.msg = res.data.msg;
                this.sign = false
              }
            }, function(res){
              // 响应错误回调
            });
          }
        });
      },
      closeSimpleDialog () {
        this.openSimple = false;
        if (this.sign) {
          this.$router.push({name:'index'})
        }
      }
    },
    created(){


    },
    closeSimpleDialog () {
      this.openSimple = false;
      this.$router.push({name:'login'})
    }
  }
</script>

<style scoped>
  .login h2{
    margin: 3rem auto;
    text-align: center;
  }
	.head{
		text-align: center;
		font-weight: 450;
	}
  .login_box{
    width: 17.44rem;
    height: 27.38rem;
    margin-bottom: 3rem;
    border: 0.06rem solid #bbbbbb;
    border-radius: 0.63rem;
    box-shadow: 0 0 1.25rem #aaaaaa;
  }
  .headpic{
    margin: 2rem auto;
    width: 9rem;
    height: 7rem;
    background-color: #00acc1;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .to_login{
    text-align: center;
  }
  .imageFileInput{
    width: 9rem;
    height: 7rem;
    border-radius: 50%;
    position: absolute;
    background-color: red;
  }
  .imageFileInput img{
    width: 100%;
    height: 100%;
  }
  /*定义上传*/
  .fileInput{
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>

