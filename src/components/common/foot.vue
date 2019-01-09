<template>
  <mu-container id="footer">
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item :to="{name:'index'}" value="/" title="预约年检" icon="restore"></mu-bottom-nav-item>
        <mu-bottom-nav-item :to="{name:'server_process'}" value="/server_process" title="服务流程" icon="device_hub"></mu-bottom-nav-item>
        <mu-bottom-nav-item :to="{name:'mine'}" value="/mine/mine" title="我的" icon="person"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>
    export default {
        name: "foot",
      data() {
          return{
            bottomNav:'process'
          }
      },
      created(){
        this.bottomNav =this.$route.path;
      },
      methods:{
        handleChange (value) {
          this.bottomNav = value
        }
      }
    }
</script>

<style scoped>
  @import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
  @import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
  @import "../icon/iconfont/material-icons.css";
#footer{
  position: fixed;
  bottom: 0;
}
.appointment{
  width: 100%;
}
</style>
