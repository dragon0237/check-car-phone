<<!--第三步--上传图片-->
<template>
    <div class="app_msg_t">
      <steper></steper>
      <div class="o_pic">
        <img src="/static/images/sign.png" alt="">
      </div>
      <div class="upload_pic">

      </div>
      <input type="file">
      <mu-button class="nextBtn" :to="({name:'index'})" color="primary">完成</mu-button>
    </div>
</template>

<script>
  import steper from '../common/steper'
    export default {
        name: "app_msg_t",
      components:{
        steper,
      }
    }
</script>

<style scoped>
.o_pic{
  width: 100%;
  height: 10rem;
}
.o_pic img{
  width: 100%;
  height: 100%;
}
</style>