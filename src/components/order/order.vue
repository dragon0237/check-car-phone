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
          <img src="/static/images/zhifubao.png" alt="">支付宝支付
        </div>
      </div>
      <div class="pay_for">
        <div class="go_charge" @click="go_wxcharge" >
          <img src="/static/images/weixin.png" alt="">微信支付
        </div>
      </div>
			<mu-dialog title="提示信息" width="360" :open.sync="openSimple">
				{{msg}}
				<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">关闭</mu-button>
			</mu-dialog>
			<input type="text" v-show="false" v-model="alipay_url" />
			<mu-dialog title="请将如下网址复制到浏览器打开" width="360" :open.sync="openSimple2">
				{{alipay_url}}
				<mu-button slot="actions" flat color="primary"
					v-clipboard:copy="alipay_url" 
					v-clipboard:success="onCopy"
					v-clipboard:error="onError">复制到剪切板</mu-button>
				<mu-button slot="actions" flat @click="closeSimpleDialog">关闭</mu-button>
			</mu-dialog>
      <foot-nav></foot-nav>
    </div>
</template>

<script>
  import footNav from '../../components/common/foot'
    export default {
        name: "order",
      components: {
        footNav
      },
      data(){
          return{
						alipay_url:'',
						openSimple: false,
						openSimple2: false,
						msg: '',
            order_list:{

            },
          }
      },
      methods:{
        go_charge(){
					let ua = navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase()
					let isWX = /MicroMessenger/i.test(ua)
					if(isWX){
						this.openSimple2=true
						this.alipay_url= "http://114.115.215:8080"+"/check-car/app/alipay/goAlipay/"+this.order_list.orderId
						
					}else{
							window.open("http://114.115.215:8080"+"/check-car/app/alipay/goAlipay/"+this.order_list.orderId);
							this.$router.push({name:'order_list'})
					}
// 					window.open("http://114.115.215.44:8080"+"/check-car/app/alipay/goAlipay/"+this.order_list.orderId);
// 					this.$router.push({name:'order_list'})
        },onCopy(){
					this.$toast.info("复制成功");
				},onError(){
					this.$toast.error("复制失败");
				},go_wxcharge(){
          alert('敬请期待')
        },
				closeSimpleDialog(){
					this.openSimple=false
					this.openSimple2=false
				}
      },
      created(){
        this.$ajax.get("/check-car/app/check/getOrder?orderId="+this.$route.query.orderId, {
        }).then((res)=> {
					console.log(res)
          if (res.data.code == 200) {
							
              this.order_list = res.data.data.orderEntity;
          }else if(res.data.code ==401){
						this.$toast.info("登陆失效，请重新登陆");
					}else{
						this.msg= res.data.msg
						this.openSimple=false
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
  .go_charge img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>
