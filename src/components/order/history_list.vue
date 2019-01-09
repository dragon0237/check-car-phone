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
				<p><span class="lab" v-if=" '订单拒绝'==item.orderEntity.orderState ">拒绝缘由:</span>
				<span>{{item.orderEntity.rejectReason}}</span></p>
				<p><span class="lab">预约时间:</span><span>{{item.orderEntity.orderTime}}</span></p>
			</div>
		</div>
		<div class="alert-demo-wrapper">
			<mu-alert color="warning" @delete="alert1 = false" delete v-if="alert1" transition="mu-scale-transition">
				<mu-icon left></mu-icon>没有订单啊，快去下单吧~
			</mu-alert>
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
				alert1: false,
				isRefuse: false,
				order_list: {}
			}
		},
		created() {
			this.$ajax.get("/check-car/app/check/userOrders", {}).then((res) => {
				if (res.data.code == 200) {
					console.log(res.data.data)
					this.order_list = this.modifyState(res.data.data);
				}
			});
		},
		methods: {
			modifyState(list) {
				var newList = new Array()
				for (var index in list) {
					var s = list[index]
					s.orderEntity.orderState = this.updateState(list[index].orderEntity.orderState)
					newList.push(list[index])
				}
				return newList

			},
			// 订单状态：1：下单成功；2：支付成功；3：配单成功；4：开始检车；5：订单完成；
			// 					6：评论完成；7：订单拒绝；8：取消订单；9：订单处理失败；10：订单修改；11：支付失败
			updateState(state) {
				if (state == 1) {
					return '下单成功'
				} else if (state == 2) {
					return '支付成功'
				} else if (state == 3) {
					return '配单成功'
				} else if (state == 4) {
					return '开始检车'
				} else if (state == 5) {
					return '订单完成'
				} else if (state == 6) {
					return '评论完成'
				} else if (state == 7) {
					return '订单拒绝'
				} else if (state == 8) {
					return '订单已取消'
				} else if (state == 9) {
					return '订单处理失败'
				} else if (state == 10) {
					return '订单修改'
				} else if (state == 11) {
					return '支付失败'
				}
			},toggleAlert () {
				this.alert1 = !this.alert1;
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

	.list_cell {
		border-bottom: 3px solid #666666;
	}

	.history_list h3 {
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
.alert-demo-wrapper {
  width: 100%;
  > .mu-alert {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  > .mu-button {
    margin: 0 auto;
    display: block;
  }
}

.mu-scale-transition-enter-active,
.mu-scale-transition-leave-active {
  transition: transform .45s cubic-bezier(0.23, 1, 0.32, 1), opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
  backface-visibility: hidden;
}

.mu-scale-transition-enter,
.mu-scale-transition-leave-active {
  transform: scale(0);
  opacity: 0;
}
</style>
