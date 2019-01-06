<template>
    <div class="mine">
      <div class="mine_list">
        <div class="list_headpic">
          <img src="/static/images/sign.png" alt=""><span v-if="this.state" @click="to_login">登录</span><span @click="exist" v-if="!this.state">退出</span>
        </div>
        <router-link class="appointment" :to="{name:'order_list'}">
          <div class="list_cell">
            <img src="/static/images/order_list_blue.png" alt=""><span>当前订单</span><img class="to_right" src="/static/images/right.png" alt="">
          </div>
        </router-link>
        <router-link class="appointment" :to="{name:'history_list'}">
          <div class="list_cell">
            <img src="/static/images/list.png" alt=""><span>历史订单</span><img class="to_right" src="/static/images/right.png" alt="">
          </div>
        </router-link>
        <router-link class="appointment" :to="{name:'app_msg'}">
          <div class="list_cell">
            <img src="/static/images/card.png" alt=""><span>行驶证信息</span><img class="to_right" src="/static/images/right.png" alt="">
          </div>
        </router-link>
        <router-link class="appointment" :to="{name:'me_msg'}">
          <div class="list_cell">
            <img src="/static/images/man3.png" alt=""><span>个人信息</span><img class="to_right" src="/static/images/right.png" alt="">
          </div>
        </router-link>
      </div>
      <foot-nav></foot-nav>
    </div>
</template>

<script>
  import footNav from '../../components/common/foot'
    export default {
        name: "mine",
      components: {
        footNav
      },
      data(){
          return{
            state: true
          }
      },
      methods: {
        to_login(){
          this.$router.push({name:'login'})
        },
        exist() {
          localStorage.clear();
          this.$router.push({name:'login'})
        }
      },
      created() {
          let islogin = localStorage.getItem('USER');
          this.state = islogin == undefined?true:false;
      }
  }
</script>

<style scoped>

  .list_headpic{
    padding: 10px;
    border-bottom: 1px solid #999;
  }
  .list_headpic img{
    width: 80px;
    height: 80px;
    -webkit-border-radius: 100000px;
    -moz-border-radius: 100000px;
    border-radius: 100000px;
    vertical-align: middle;
  }
  .list_headpic span{
    width: 200px;
    padding-left: 50px;
    display: inline-block;
    line-height: 80px;
  }
  .list_cell{
    padding: 15px 10px;
    border-bottom: 1px solid #999;
    color: #666666;
  }
  .list_cell img{
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }
  .list_cell span{
    margin-left: 40px;
  }
  .to_right{
    float: right;
  }
</style>
