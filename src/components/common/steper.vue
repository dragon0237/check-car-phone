<template>
  <div>
    <mu-stepper class="stepper" :active-step="activeStep">
      <mu-step>
        <mu-step-label>
          基本信息
        </mu-step-label>
      </mu-step>
      <mu-step>
        <mu-step-label>
          预约检车
        </mu-step-label>
      </mu-step>
      <mu-step>
        <mu-step-label>
          到站检车
        </mu-step-label>
      </mu-step>
    </mu-stepper>
  </div>
</template>

<script>
  import app_form from '../appointment/app_form'
  export default {
    name: "steper",
    components: {
      app_form
    },
    data() {
      return {
        activeStep: 0
      };
    },
    created(){
      if (this.$route.path === '/app_msg_s') {
        this.activeStep = 1
      }else if (this.$route.path === '/check_car') {
        this.activeStep = 2
      }else {
        this.activeStep = 0
      }


      // console.log(this.$route.path);
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
