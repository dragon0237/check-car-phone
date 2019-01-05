<!--第一步基本信息-->
<template>
  <div class="f_app">
    <steper></steper>
    <f_form></f_form>
  </div>
</template>

<script>
  import steper from '../common/steper'
  import f_form from '../appointment/app_form'
    export default {
        name: "app_msg",
      components:{
          steper,
          f_form
      },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('USER'));
		
		console.log("userInfo:" + userInfo)

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

</style>
