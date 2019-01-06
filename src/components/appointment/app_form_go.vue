<template>
  <mu-container>
    <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
      <mu-form-item prop="date" label="到站时间">
        <mu-date-input v-model="form.orderTime" type="dateTime" actions></mu-date-input>
      </mu-form-item>
      <mu-form-item prop="select" label="燃油类型">
        <mu-select v-model="form.fuelType">
          <mu-option v-for="(index,item) in fuelType" :key="index" :label="index" :value="item"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-form-item prop="select" label="驱动类型">
        <mu-select v-model="form.driverType">
          <mu-option v-for="(index,item) in driverType" :key="index" :label="index" :value="item"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-button class="nextBtn" @touchstart="comfired" color="primary">确认</mu-button>
    </mu-form>
    <mu-dialog title="提示信息" width="360" :open.sync="openSimple">
      {{msg}}
      <mu-button slot="actions" flat color="primary" @touchstart="closeSimpleDialog">关闭</mu-button>
    </mu-dialog>
  </mu-container>
</template>

<script>
    export default {
        name: "app_form_go",
      data () {
        return {
          options: [
            '微型车', '小型车', '中型车', '大型车'
          ],
          msg:"",
          fuelType: {
            1:"汽油",
            2:"柴油",
            3:"混合油",
            4:"液化石油气",
            5:"天然气",
            6:"甲醇",
            7:"乙醇",
            8:"太阳能",
            9:"电",
            10:"生物燃料",
            11:"氢",
          },
          driverType:{
            1:"前驱",
            2:"后驱",
            3:"四驱"
          },
          openSimple: false,
          labelPosition: 'left',
          form: {
            orderTime: '',
            fuelType: '',
            driverType: ''
          },
          select:{

          },
          agentId:""
        }
      },
      methods:{
        comfired(){
          let date = JSON.stringify(this.form.orderTime);
          date = date.replace("T"," ");
          date = date.slice(1,20);
          this.$ajax.post("/check-car/app/check/addOrder", {
            "agentId": this.$route.query.agentId,
            "orderTime": date,
            "fuelType": this.form.fuelType,
            "driverType": this.form.driverType
          }).then((res)=> {
            if (res.data.code === 200) {
              this.$router.push({name:'order',query:{orderId:res.data.orderId,orderTime:res.data.orderTime,order_subject:res.data.order_subject,basePrice:res.data.basePrice,operatePrice:res.data.operatePrice,orderMoney:res.data.orderMoney}});
            }else if (res.data.code == 500){
              this.openSimple = true;
              this.msg = res.data.msg
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

</style>

