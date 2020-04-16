import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
// 导入全局样式表
import './assets/css/global.css';
// 导入字体图标
import './assets/fonts/iconfont.css';
// 导入表单树
import TreeTable from 'vue-table-with-tree-grid';


// 导入axios
import axios from 'axios';
Vue.prototype.$http = axios;
// 配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  console.log(config);
  // Authorization 第一次登录请求是 null
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 最后必须要 return config
  return config;
});


// 关闭生产模式下给出的提示
Vue.config.productionTip = false;
// 注册表单树组件
Vue.component('tree-table',TreeTable);


new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
// 导入 TreeTable  组件
import TreeTable from "vue-table-with-tree-grid"
// 导入全局样式表
import './assets/css/global.css';
// 导入字体图标
import './assets/fonts/iconfont.css';


// 导入axios
import axios from 'axios';
Vue.prototype.$http = axios;
// 配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  console.log(config);
  // Authorization 第一次登录请求是 null
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 最后必须要 return config
  return config;
});


// 关闭生产模式下给出的提示
Vue.config.productionTip = false;
// 使用 component 注册成全局组件
Vue.component('tree-table',TreeTable);




new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
