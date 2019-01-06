<template>
    <div class="me_msg">
      <div class="order_title">
        修改个人信息
      </div>
      <mu-container class="login_box">
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
          <mu-form-item label="确认密码" prop="surepassword" :rules="surepasswordRules">
            <mu-text-field max-length="16"  type="password" v-model="validateForm.surepassword" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="primary" @click="update">修改</mu-button>
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
      methods: {
        update(){
          if (this.validateForm.password !== this.validateForm.surepassword){
            this.openSimple = true;
            this.msg = '两次密码不一致';
            return
          }
          this.$refs.form.validate().then((result) => {
            if(result){
              this.$ajax.post("/check-car/app/check/updateUser", {"username":this.validateForm.username,"password":this.validateForm.password,"mobile":this.validateForm.mobile}).then((res)=>{
                // 响应成功回调
                console.log(res);
                if(res.data.code == 200){
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
