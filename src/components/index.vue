<template>
  <div class="main">
    <div class="top_pic">
      <img src="../../static/images/banner3.png" alt="">
    </div>
    <div class="main_box">
      <mu-carousel hide-controls class="banner">
        <mu-carousel-item>
          <img :src="'../../static/images/banner1.png'">
        </mu-carousel-item>
        <mu-carousel-item>
          <img :src="'../../static/images/banner2.png'">
        </mu-carousel-item>
      </mu-carousel>
      <div class="main_cell">
        <div class="main_cell_title">
          <span>车检服务</span>
        </div>
        <div class="main_cell_body">
          <router-link class="appointment" :to="{name:'app_msg'}">
            <div class="head_pic">
              <img src="../../static/images/car.png" alt="">
            </div>
            <div class="pic_msg">
              <p>在线预约 </p>
              <p>一键预约年检，快速办理</p>
            </div>
          </router-link>
          <!--:to="{name:'index'}"-->
          <div class="appointment" @click="replace">
            <div class="head_pic">
              <img src="../../static/images/people.png" alt="">
            </div>
            <div class="pic_msg">
              <p>代驾预约 </p>
              <p>代驾年检，每人一对一办理</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main_cell">
        <div class="main_cell_title">
          <span>车检须知</span>
        </div>
        <div class="main_cell_body">
          <div class="prepare">
            年检需要准备些什么？
          </div>
          <div class="need">
            <p><img src="../../static/images/circle.png" alt=""><span>机动车行驶证件(正、副本)</span></p>
            <p><img src="../../static/images/circle.png" alt=""><span>车主身份证或居住证原件(或代理人身份证原件)</span></p>
            <p><img src="../../static/images/circle.png" alt=""><span>有效期内的交强险副本原件(含车船税、挂车提供车船税)</span></p>
            <p><img src="../../static/images/circle.png" alt=""><span>单位车辆需要提供单位出具的委托书(需单位公章)</span></p>
            <p><img src="../../static/images/circle.png" alt=""><span>三角警示牌</span></p>
          </div>
          <div class="prepare">
            那些车需要年检？
          </div>
          <div class="need">
            <p><img src="../../static/images/circle.png" alt=""><span>注册登记日期超过6年的私家车(6年后1年一检)</span></p>
            <p><img src="../../static/images/circle.png" alt=""><span>面包车、7座及7座以上车辆(前6年每2年一检，6年后1年一检)</span></p>
            <p><img src="../../static/images/circle.png" alt=""><span>营运车辆(前5年每1年一检，第6年起每半年一检)</span></p>
          </div>
        </div>
      </div>
      <div class="main_cell">
        <div class="main_cell_title">
          <span>优势</span>
        </div>
        <div class="main_cell_body">
          <div class="cell_left">
            <div class="cell_box">
              <div class="lrtitle">
                传统汽车年检
              </div>
              <div class="lrbody">
                <ol>
                  <li>车主前往检测站</li>
                  <li>排队等待</li>
                  <li>上交车钥匙</li>
                  <li>填写外检单</li>
                  <li>营业厅缴费</li>
                  <li>填写年检表格</li>
                  <li>等待领取报告单</li>
                  <li>取车离开</li>
                  <li>年检结束</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="cell_left">
            <div class="cell_box">
              <div class="lrtitle master">
                年检
              </div>
              <div class="lrbody mas_ul">
                <ul>
                  <li><img src="../../static/images/xd.png" alt="">在线下单</li>
                  <li class="left_dashed"></li>
                  <li><img src="../../static/images/clgl.png" alt="">自驾/代驾</li>
                  <li class="left_dashed"></li>
                  <li><img src="../../static/images/nianjian.png" alt="">到站年检</li>
                  <li class="left_dashed"></li>
                  <li><img src="../../static/images/jiaojie.png" alt="">交接还车</li>
                  <li class="left_dashed"></li>
                  <li><img src="../../static/images/jiesu.png" alt="">年检结束</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="com_msg">
      <p>客服电话:<span>&nbsp;&nbsp;000-000-0000</span></p>
      <p>北京百集利科技有限公司</p>
    </div>
    <mu-dialog title="提示信息" width="360" :open.sync="openSimple">
      {{msg}}
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>
    </mu-dialog>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
  import footNav from '../components/common/foot'
  export default {
    name: "index",
    components: {
      footNav
    },
    data() {
      return {
        banner: 'banner',
        bannerImg: '',
        openSimple: false,
        msg: '敬请期待'
      }
    },
    methods: {
      replace(){
        this.openSimple = true;
      },
      closeSimpleDialog () {
        this.openSimple = false;
      },
    }
  }
</script>

<style scoped>
  .main{
    padding-bottom: 56px;
  }
  .head_pic{
    float: left;
    margin: 15px;
    width: 60px;
    height: 60px;
  }
  .head_pic img{
    width: 100%;
    height: 100%;
  }
  .top_pic {
    width: 100vw;
    height: 12.5rem;
    background-color: #00bbd4;
  }
  .top_pic img{
    width: 100%;
    height: 100%;
  }
  .main_box {
    margin: 0 auto;
    width: 95%;
  }
  .main_box img{
    width: 100%;
    height: 100%;
  }
  .banner {
    margin-top: 1rem;
    height: 5rem;
    border-radius: 0.3rem;
  }
  .main_cell_title{
    line-height: 40px;
    background-color: #fff;
  }
  .main_cell_title span{
    border-left: 2px solid #00bbd4;
    padding: 0 5px;
  }
  .main_cell_body{
    width: 100%;
    /*height: 20rem;*/
    background-color: #fff;
  }
  .main_cell_body img{
    width: 100%;
    height: 100%;
  }
  .prepare{
    margin: 0 auto;
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
  .appointment{
    display: block;
    margin-bottom: 15px;
    padding: 5px;
    width: 100%;
    box-shadow: 0 0 0.3rem 0 #05d4be;
  }
  .appointment p{
    color: #444444;
  }
  .left_dashed{
    margin-left: 10px;
    height: 15px;
    border-left: 1px dashed #5882E2;
  }
  .need img{
    vertical-align: middle;
    width: 16px;
    height: 16px;
  }
  .com_msg{
    clear: both;
    padding: 5px 0;
    line-height: 12px;
    width: 100%;
    background-color: #efefef;
  }
  .com_msg p{
    text-align: center;
    font-size: 12px;
    color: #666666;
  }
  .com_msg p span{
    color: #1ed1ff;
  }
  .cell_left{
    float: left;
    width: 50%;
  }
  .cell_box{
    width: 90%;
    margin: 0 auto;
  }
  .cell_left{
    background-color: #ffffff;
    color: #666666;
    padding-bottom: 5px;
  }
  .cell_box{
    min-height: 265px;
    box-shadow: 0 0 0.3rem 0 #05d4be;
  }
  .lrtitle{
    line-height: 40px;
    text-align: center;
    padding: 5px 15px;
    background-color: #9e9e9e;
    color: #222222;
    border-radius: 2px;
  }
  .master{
    background: -webkit-linear-gradient(left, #5fdaff, #457eff);
    background: -o-linear-gradient(right, #5fdaff, #457eff);
    background: -moz-linear-gradient(right, #5fdaff, #457eff);
    background: linear-gradient(to  right, #5fdaff, #457eff);
    color: #fafafa;
  }
  .mas_ul ul{
    list-style: none;
  }
  .mas_ul img{
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 25px;
    height: 25px;
  }
</style>
