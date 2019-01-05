<!--第二步--预约检车-->
<template>
  <div class="app_msg_s">
    <steper></steper>
    <s_form></s_form>
  </div>
</template>

<script>
  import steper from '../common/steper'
  import s_form from '../appointment/app_form_go'
    export default {
        name: "app_msg_s",
      components:{
        steper,
        s_form
      }
    }
</script>

<style scoped>

</style>
