<template>
    <div class="me_msg">
      <div class="order_title">
        修改个人信息
      </div>
      <mu-container class="login_box">
        <mu-form class="mu-demo-form" ref="form" :model="validateForm" label-position="left" label-width="80">
          <mu-form-item label="姓名" prop="username" :rules="usernameRules">
            <mu-text-field max-length="10" v-model="validateForm.username" prop="username" :readonly="isReadonly_name">	
						<mu-button color="primary" @click="updateType(1)">修改</mu-button>
						</mu-text-field>
          </mu-form-item>
          <mu-form-item label="手机号" prop="mobile" :rules="mobileRules">
            <mu-text-field max-length="11" v-model="validateForm.mobile" prop="mobile" :readonly="isReadonly_mobile">
							<mu-button color="primary" @click="updateType(2)">修改</mu-button>
						</mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field max-length="16"  type="password" v-model="validateForm.password" prop="password" :readonly="isReadonly_password">
							<mu-button color="primary" @click="updateType(3)">修改</mu-button>
						</mu-text-field>
          </mu-form-item>
          <mu-form-item label="确认密码" prop="surepassword" :rules="surepasswordRules" v-if="! isReadonly_password">
            <mu-text-field max-length="16"  type="password" v-model="validateForm.surepassword" prop="password"></mu-text-field>
          </mu-form-item>
         <mu-form-item>
            <mu-button color="primary" @click="update" v-if="isSave">保存</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-container>
      <foot-nav></foot-nav>
      <mu-dialog title="提示信息" width="360" :open.sync="openSimple">
        {{msg}}
        <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
      </mu-dialog>
    </div>
</template>

<script>
  import footNav from '../../components/common/foot'
    export default {
        name: "me_msg",
      components: {
        footNav
      },
      data() {
        return {
					btn_msg: '修改',
					isReadonly_name: true,
					isReadonly_mobile: true,
					isReadonly_password: true,
					isSave: false,
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
          surepasswordRules: [

          ],
          validateForm: {
            username: "",
            password: "",
            mobile: "",
            surepassword: ""
          },
          openSimple: false,
          msg:'',
          sign: false,
        }
      },
			created(){
				this.$ajax.get("/check-car/app/check/userInfo", {
				}).then((res)=> {
					if (res.data.code ==200){
						console.log(res)
						console.log(res.data.data.username)
						this.validateForm.username = res.data.data.username
						this.validateForm.mobile = res.data.data.mobile
						this.validateForm.password = '123456789'
					}else{
						this.isReadonly_name = false
						this.isReadonly_mobile = false
						this.isReadonly_password = false
					}
				});
				
			},
      methods: {
				updateType(type){
					console.log(type)
					if(type == 1){
						this.isReadonly_name=false
					}else if(type == 2){
						this.isReadonly_mobile=false
					}else if(type == 3){
						this.validateForm.password=''
						this.isReadonly_password = false
					}
					this.isSave=true
				},
        update(){
					let username
					let mobile
					let password
					
          if (this.isReadonly_password == false && this.validateForm.password !== this.validateForm.surepassword){
            this.openSimple = true;
            this.msg = '两次密码不一致';
            return
          }
					if(this.isReadonly_name == false){
						username = this.validateForm.username
					}
					if(this.isReadonly_mobile == false){
						mobile = this.validateForm.mobile
					}
					if(this.isReadonly_password == false){
						password = this.validateForm.password
					}
					
          this.$refs.form.validate().then((result) => {
            if(result){
              this.$ajax.post("/check-car/app/check/updateUser", 
							{"username":username,
							"password":password,
							"mobile":mobile,
							}).then((res)=>{
                // 响应成功回调
                console.log(res);
                if(res.data.code == 200){
									this.isReadonly_name=true
									this.isReadonly_mobile=true
									this.isReadonly_password = true
									this.isSave=false
									
                  this.openSimple = true;
                  this.msg = '修改成功';
                  this.sign = true;

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
      }
    }
</script>

<style scoped>
	
  .order_title {
    line-height: 60px;
    text-align: center;
    background-color: #dddddd;
  }
</style>
