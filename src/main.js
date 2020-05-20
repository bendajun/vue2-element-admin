import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import './icons'; // 全局注册SvgIcon组件，生成svg-sprite
import constant from './constant';
import './directives'; // 全局指令注册
import './filters'; // 全局过滤器注册
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$const = constant;
Vue.prototype.$api = api;
dayjs.locale('zh-cn');
Vue.prototype.$dayjs = dayjs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
