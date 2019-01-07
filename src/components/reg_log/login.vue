<template>
  <div class="login">
    <h2>预检车平台</h2>
    <mu-container class="login_box">
      <mu-paper class="demo-paper headpic" circle :z-depth="0"></mu-paper>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-position="left" label-width="80">
        <mu-form-item label="手机号" prop="mobile">
          <mu-text-field max-length="11" v-model="validateForm.mobile" prop="mobile"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password">
          <mu-text-field type="password" max-length="16" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <div class="forget">
          <span>忘记密码？</span>
         <!-- <span style="float: right">使用滴滴账号登录</span>-->
        </div>
        <mu-form-item>
          <mu-button color="primary" @click="submit">登录</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
    <div class="toReg">
      <router-link  :to="{name:'register'}">
        新用户？点击这里注册
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
    name: "login",
    form: {
      input: ''
    },
    data() {
      return {
        validateForm: {
          mobile: '',
          password: ''
        },
        resState: false,
        openSimple: false,
        msg:'',
        date:0
      }
    },
    methods: {
      submit() {
				console.log("into login")
        const date1 = new Date();
        // let params = {mobile:18241033575,password:123456,token:'4556'};
        // sessionStorage.setItem('USER',JSON.stringify(params));
        this.$refs.form.validate().then((result) => {
          if (result) {
            this.$ajax.post("/check-car/app/login", {
              "mobile": this.validateForm.mobile,
              "password": this.validateForm.password
            }).then((res)=>{
              // 响应成功回调
              if (res.data.code == 200) {
                let params = {};
                  params.expire = res.data.expire;
                  params.token = res.data.token;
                  params.date = new Date();
								localStorage.clear();
                localStorage.setItem('USER',JSON.stringify(params));
								console.log("------")
								console.log(JSON.parse(localStorage.getItem('USER')));
								
                //保存session
                  //跳转到首页
                this.$router.push({name: 'index'})
                }else if (res.data.code == 500) {
                  this.openSimple = true
                  this.msg = res.data.msg
                }
              })
          }
        });
      },
      closeSimpleDialog () {
        this.openSimple = false;
      }
    }
  }
</script>

<style scoped>
  .login h2 {
    margin: 3rem auto;
    text-align: center;
  }

  .login_box {
    width: 17.44rem;
    height: 27.38rem;
    margin-bottom: 4rem;
    border: 0.06rem solid #bbbbbb;
    border-radius: 0.63rem;
    box-shadow: 0 0 1.25rem #aaaaaa;
  }

  .headpic {
    margin: 2rem auto;
    width: 9rem;
    height: 7rem;
    background-color: #00acc1;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .toReg {
    /*display: inline-block;*/
    text-align: center;
  }
</style>

