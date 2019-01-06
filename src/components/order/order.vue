<template>
    <div class="order">
      <div class="order_title">
        订单详情
      </div>
      <div class="order_body" v-model="order_list">
        <p><span class="lab">订单编号:</span><span>{{order_list.orderId}}</span></p>
        <p><span class="lab">订单详情:</span><span>{{order_list.orderSubject}}</span></p>
        <p><span class="lab">预约时间:</span><span>{{order_list.orderTime}}</span></p>
        <p><span class="lab">订单价格:</span><span>￥{{order_list.orderMoney}}</span></p>
      </div>
      <div class="pay_for">
        <div class="go_charge" @click="go_charge" >
          支付宝支付
        </div>
      </div>
      <div class="pay_for">
        <div class="go_charge" @click="go_wxcharge" >
          微信支付
        </div>
      </div>
    </div>
</template>

<script>

    export default {
        name: "order",
      data(){
          return{
            order_list:{

            },
          }
      },
      methods:{
        go_charge(){

					window.open("http://129.204.110.142:8080"+"/check-car/app/alipay/goAlipay/"+this.order_list.orderId);

					this.$router.push({name:'order_list'})
        },
        go_wxcharge(){
          alert('敬请期待')
        }
      },
      created(){
        this.$ajax.get("/check-car/app/check/userOrders", {
        }).then((res)=> {
          if (res.data.code == 200) {

              this.order_list = res.data.data[0].orderEntity;
          }
        });
      }
    }
</script>

<style scoped>
.order_title{
  line-height: 60px;
  text-align: center;
  background-color: #dddddd;
}
.order_body p{
  padding: 0 15px;
}
.lab{
  display: inline-block;
  width: 80px;
  margin-right: 20px;
  text-align: right;
}
.pay_for{
  width: 50%;
  float: left;
  padding: 5px 10px;
}
.go_charge{
  margin: 0 auto;
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  background-color: #00bcd4;
  color: #fafafa;
}
</style>
