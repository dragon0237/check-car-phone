// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'

import Toast from 'muse-ui-toast';


import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// import '/static/iconfont/material-icons.css'


Vue.use(MuseUI);
Vue.use(Toast);

Vue.config.productionTip = false;
Vue.use(Resource);

//Axios请求拦截器，随着业务的复杂，Axios层的使用将会越来越复杂，写个精简版的就行了。


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

});
