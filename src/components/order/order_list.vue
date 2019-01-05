<template>
  <div class="order">
    <div class="order_title">
      订单列表
    </div>
    <div class="order_body" v-model="order_list">
      <h3>{{order_list.orderSubject}}</h3>
      <p><span class="lab">订单编号:</span><span>{{order_list.orderId}}</span></p>
      <p><span class="lab">预约时间:</span><span>{{order_list.orderTime}}</span></p>
      <p><span class="lab">预约地址:</span><span>{{agentAddress}}</span></p>
      <p><span class="lab">订单价格:</span><span>￥{{order_list.orderMoney}}</span></p>
      <p><span class="lab">订单状态:</span><span>{{order_list.orderState}}</span></p>
      <div v-if="this.order_state == 0" @click="to_payfor" class="to_check">去付款</div>
      <div v-if="this.order_state == 1" @click="to_checkcar" class="to_check">去检车</div>
      <div v-if="this.order_state == 5" @click="to_evaluate" class="to_check">去评价</div>
      <div v-if="this.order_state < 5" class="to_cancel">取消订单</div>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
  import footNav from '../../components/common/foot'

  export default {
    name: "order_list",
    components: {
      footNav
    },
    data() {
      return {
        order_list: {},
        agentAddress: "",
        order_state: 0
      }
    },
    created() {
      this.$ajax.get("/check-car/app/check/userOrders", {}).then((res) => {
        if (res.data.code == 200) {
            this.order_list = res.data.data[0].orderEntity;
            let alipayNotifyEntity = res.data.data[0].alipayNotifyEntity;
            this.agentAddress = res.data.data[0].agentEntity.agentAddress;
            this.order_state = res.data.data[0].orderEntity.orderState;
          if (alipayNotifyEntity && alipayNotifyEntity.tradeStatus == 'TRADE_SUCCESS') {
              this.order_list.orderState = "支付成功";
            } else {
              switch (this.order_list.orderState) {
                case 1:
                  this.order_list.orderState = "下单成功";
                  break;
                case 2:
                  this.order_list.orderState = "配单成功";
                  break;
                case 3:
                  this.order_list.orderState = "订单拒绝";
                  break;
                case 4:
                  this.order_list.orderState = "开始检车";
                  break;
                case 5:
                  this.order_list.orderState = "订单完成";
                  break;
                case 6:
                  this.order_list.orderState = "订单处理失败";
                  break;
                case 7:
                  this.order_list.orderState = "评论完成";
                  break;
                default :
                  this.order_list.orderState = ''
              }
            }
          }
      });
    },
    methods:{
      to_payfor(){
        this.$router.push({name:'order'})
      },
      to_checkcar(){
        this.$router.push({name:'check_car'})
      },
      to_evaluate(){
        this.$router.push({name:'evaluate',query:{orderId: this.order_list.orderId}})
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
  .order_body h3{
    text-align: center;
    padding: 0 10px;
  }
  .order_body p {
    padding: 0 15px;
  }

  .lab {
    display: inline-block;
    width: 80px;
    margin-right: 20px;
    text-align: right;
  }

  .to_check {
    margin: 20px auto 0;
    width: 90%;
    line-height: 60px;
    background-color: #00bcd4;
    text-align: center;
    color: #fafafa;
    font-size: 16px;
  }
  .to_cancel{
    margin: 20px auto 0;
    width: 90%;
    line-height: 60px;
    border: 1px solid #666;
    text-align: center;
    color: #666;
    font-size: 16px;
  }
</style>
