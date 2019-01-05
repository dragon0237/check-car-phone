<template>
    <div class="process">
      <div class="process_pic">
        <img src="../../static/images/sign.png" alt="">
      </div>
      <div class="process_top">
        <div class="appoint">
          <span>在线预约</span><span class="arrive_app">到站预约/代价预约</span>
        </div>
        <div class="part">
          <ul>
            <li>在线下单</li>
            <li>自驾到车检站</li>
            <li>到站检车<p>省去排队时间</p></li>
            <li>填单等待<p>填写外检单、年检表格</p></li>
            <li>交接还车</li>
            <li>年检结束</li>
          </ul>
        </div>
        <div class="part part_right">
          <ul>
            <li><img src="../../static/images/phone.png" alt="">在线下单</li>
            <li><img src="../../static/images/car12.png" alt="">自驾/代驾上门到车检站</li>
            <li><img src="../../static/images/server-security.png" alt="">到站师傅全程服务</li>
            <li><img src="../../static/images/rest.png" alt="">车主贵宾厅休息</li>
            <li><img src="../../static/images/man3.png" alt="">交接还车</li>
            <li><img src="../../static/images/check.png" alt="">年检结束</li>
          </ul>
        </div>
      </div>
      <div class="process_bottom">
        <div class="bot_title prepare">
          我们的优势？
        </div>
        <div class="bot_cell">
          <img src="../../static/images/safe.png" alt="">安全年检
          <p>提供最高50万代驾险，全程保障您的爱车安全</p>
        </div>
        <div class="bot_cell">
          <img src="../../static/images/ware.png" alt="">收费透明
          <p>透明收费标准，无二次收费</p>
        </div>
        <div class="bot_cell">
          <img src="../../static/images/liucheng.png" alt="">流程简便
          <p>一键下单，全程为您服务</p>
        </div>
        <div class="bot_cell">
          <img src="../../static/images/time.png" alt="">快速高效
          <p>资深专业工作人员，最快当天下单拿证</p>
        </div>
      </div>
      <foot-nav></foot-nav>
    </div>
</template>

<script>
  import footNav from '../components/common/foot'
    export default {
        name: "server_process",
      components: {
        footNav
      },
    }
</script>

<style scoped>
  .process_bottom{
    clear: both;
    padding: 10px 20px;
  }
  .process{
    width: 100%;
  }
  .process img{
    width: 100%;
    height: 100%;
  }
  .prepare{
    margin: 0 auto 20px;
    width: 10rem;
    line-height: 2rem;
    text-align: center;
    color: #ffffff;
    background: -webkit-linear-gradient(left, #5fdaff, #457eff);
    background: -o-linear-gradient(right, #5fdaff, #457eff);
    background: -moz-linear-gradient(right, #5fdaff, #457eff);
    background: linear-gradient(to  right, #5fdaff, #457eff);
    -webkit-border-radius: 0.2rem;
    -moz-border-radius: 0.2rem;
    border-radius: 0.2rem;
  }
  .bot_cell img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .bot_cell{
    font-size: 20px;
    font-weight: bold;
    color: #039be5;
  }
  .bot_cell p{
    font-size: 16px;
    font-weight: normal;
    color: #999999;
  }
  .appoint{
    width: 90%;
    margin: 0 auto;
  }
  .appoint span{
    display: inline-block;
    width: 50%;
    line-height: 40px;
    text-align: center;
    color: #039be5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #039be5;
  }
  .appoint .arrive_app{
    color: #fafafa;
    background-color: #039be5;
  }
  .part{
    float: left;
    width: 42%;
    text-align: right;
  }
  .part ul{
    list-style: none;
    width: 100%;
    padding: 0;
  }
  .part ul li{
    height: 50px;
  }
  .part ul li p{
    margin: 0;
    padding: 5px 0 0 0;
    line-height: 0;
    font-size: 10px;
    color: #999999;
  }
  .part_right{
    width: 54%;
    text-align: left;
  }
  .part_right img{
    width: 25px;
    height: 25px;
    margin: 0 15px;
    vertical-align: middle;
  }
</style>
