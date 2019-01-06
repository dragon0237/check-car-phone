import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import register from '../components/reg_log/register'
import login from '../components/reg_log/login'
import server_process from '../components/server_process'
import order from '../components/order/order'
import order_list from '../components/order/order_list'
import history_list from '../components/order/history_list'
import check_car from '../components/order/check_car'
import evaluate from '../components/order/evaluate'
import agent from '../components/appointment/agent'
import mine from '../components/mine/mine'
import me_msg from '../components/mine/me_msg'
import charge from '../components/appointment/charge'
import app_msg from '../components/appointment/app_msg'
import app_msg_s from '../components/appointment/app_msg_s'
import app_msg_t from '../components/appointment/app_msg_t'
import steper from '../components/common/steper'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'


Vue.use(MuseUI);

Vue.use(Router);


// 数据请求
import Axios from 'axios'
// 129.204.110.142
Axios.defaults.baseURL = 'http://129.204.110.142:8080';
// Axios.defaults.baseURL = '/api';
Vue.prototype.$ajax = Axios;



let userInfo = JSON.parse(localStorage.getItem('USER'));
if (userInfo) {
  Axios.interceptors.request.use(config => {
    let token = userInfo.token;
  if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.token = token;
  }
  return config
}, error => {
    /*return Promise.reject(error)*/
  })
}



//全局组件



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/app_msg',
      name: 'app_msg',
      component: app_msg
    },
    {
      path: '/steper',
      name: 'steper',
      component: steper
    },
    {
      path: '/app_msg_s',
      name: 'app_msg_s',
      component: app_msg_s
    },
    {
      path: '/app_msg_t',
      name: 'app_msg_t',
      component: app_msg_t
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/order_list',
      name: 'order_list',
      component: order_list
    },
    {
      path: '/history_list',
      name: 'history_list',
      component: history_list
    },
    {
      path: '/check_car',
      name: 'check_car',
      component: check_car
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate
    },
    {
      path: '/server_process',
      name: 'server_process',
      component: server_process
    },
    {
      path: '/agent',
      name: 'agent',
      component: agent
    },
    {
      path: '/charge',
      name: 'charge',
      component: charge
    },
    {
      path: '/mine/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/mine/me_msg',
      name: 'me_msg',
      component: me_msg
    }
  ]
})
