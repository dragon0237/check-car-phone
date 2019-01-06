<!--第一步基本信息-->
<template>
  <div class="f_app">
    <div class="order_title">
      行驶证信息
    </div>
    <f_form></f_form>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
  import f_form from '../appointment/app_form'
  import footNav from '../../components/common/foot'
    export default {
        name: "app_msg",
      components:{
          f_form,
          footNav
      },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('USER'));

		console.log("userInfo:" + userInfo);

    if (userInfo != ''&&userInfo != undefined) {
      //认证登录状态
    }else {
      this.$router.push({name: 'login'})
    }
    if (userInfo){
      let nowdate = new Date();
      if ((nowdate - userInfo.date)/1000 > userInfo.expire) {
        localStorage.clear();
        this.$router.push({name: 'login'})
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
