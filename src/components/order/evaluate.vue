<template>
    <div class="evaluate">
      <p>您的意见和建议是我们前进的动力:</p>
      <mu-container>
        <mu-form :model="form" class="mu-demo-form" label-position="top" label-width="100">
          <mu-form-item prop="select" label="评分">
            <mu-select v-model="form.select">
              <mu-option v-for="option,index in options" :key="option" :label="option" :value="option"></mu-option>
            </mu-select>
          </mu-form-item>
          <mu-form-item prop="textarea" label="评语">
            <mu-text-field multi-line :rows="3" :rows-max="6" v-model="form.textarea"></mu-text-field>
          </mu-form-item>
        </mu-form>
      </mu-container>
      <div class="submit" @click="sub_evaluate">提交</div>
    </div>
</template>

<script>
    export default {
        name: "evaluate",
      data(){
          return{
            options: [
              '10', '9', '8', '7',
              '6', '5', '4', '3',
              '2', '1'
            ],
            form: {
              select: '10',
              textarea: ''
            }
          }
      },methods: {
        sub_evaluate() {
          this.$ajax.post('check-car/app/check/assess',{"orderId": this.$route.query.orderId,"orderScore": this.form.select,"orderAccess": this.form.textarea})
            .then((res)=>{
              if (res.data.code == 200){
                this.$router.push({name:'order_list'})
              }
            })
        }
      }
    }
</script>

<style scoped>
.submit{
  margin: 20px auto 0;
  width: 90%;
  line-height: 60px;
  background-color: #00bcd4;
  text-align: center;
  color: #fafafa;
  font-size: 16px;
}
</style>
