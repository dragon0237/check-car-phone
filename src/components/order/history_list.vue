<template>
  <div class="history_list">
    <div class="order_title">
      历史订单
    </div>
    <div class="order_list" v-for="(item,index) in order_list" :key="index">
      <div class="list_cell">
        <h3>{{item.orderEntity.orderSubject}}</h3>
        <p><span class="lab">订单编号:</span><span>{{item.orderEntity.orderId}}</span></p>
        <p><span class="lab">订单状态:</span><span>{{item.orderEntity.orderState}}</span></p>
        <p><span class="lab">预约时间:</span><span>{{item.orderEntity.orderTime}}</span></p>
      </div>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
  import footNav from '../../components/common/foot'
    export default {
        name: "history_list",
      components: {
        footNav
      },
      data() {
        return {
          order_list: {}
        }
      },
      created() {
        this.$ajax.get("/check-car/app/check/userOrders", {}).then((res) => {
          if (res.data.code == 200) {
            /*let alipayNotifyEntity = res.data.data[0].alipayNotifyEntity;
            if (alipayNotifyEntity && alipayNotifyEntity.tradeStatus == 'TRADE_SUCCESS') {
              this.order_list.orderState = "支付成功";
            } else {
              switch (this.order_list.orderState) {
                case 1:
                  this.order_list.orderState = "下单成功";
                  break;
                case 2:
                  this.order_list.orderState = "付款成功";
                  break;
                case 3:
                  this.order_list.orderState = "配单成功";
                  break;
                case 4:
                  this.order_list.orderState = "已开始检车";
                  break;
                case 5:
                  this.order_list.orderState = "订单完成";
                  break;
                case 6:
                  this.order_list.orderState = "评论完成";
                  break;
                case 7:
                  this.order_list.orderState = "订单拒绝";
                  break;
                case 10:
                  this.order_list.orderState = "订单修改，等待代理商确认";
                  break;
                default :
                  this.order_list.orderState = ''
              }
            }*/
            this.order_list = res.data.data;
          }
        });
      }
    }
</script>

<style scoped>
  .order_title {
    line-height: 60px;
    text-align: center;
    background-color: #dddddd;
  }
  .list_cell{
    border-bottom: 3px solid #666666;
  }
  .history_list h3{
    text-align: center;
    padding: 0 10px;
  }
  .history_list p {
    padding: 0 15px;
  }
  .lab {
    display: inline-block;
    width: 80px;
    margin-right: 20px;
    text-align: right;
  }
</style>
