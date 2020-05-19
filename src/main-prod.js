import Vue from 'vue';
import App from './App.vue';
import router from './router';
// 导入 element 组件
// import './plugins/element.js';
// 导入全局样式表
import './assets/css/global.css';
// 导入字体图标
import './assets/fonts/iconfont.css';
// 导入表单树
import TreeTable from 'vue-table-with-tree-grid';

// 导入进度条包
import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
// 导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入时间轴 css
// import './plugins/timeline/timeline.css'
// import './plugins/timeline-item/timeline-item.css'
// 导入 echarts
import echarts from 'echarts';

// 导入axios
import axios from 'axios';

// 导入城市数据
import cityData from './assets/js/citydata.js';
// 设置 echarts 用法
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  console.log(config);
  NProgress.start();
  // Authorization 第一次登录请求是 null
  config.headers.Authorization = window.sessionStorage.getItem('token');
  // 最后必须要 return config
  return config;
});
// 在 response 拦截器中隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
});
// 设置城市组件使用方式
Vue.prototype.cityData = cityData;

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;
// 注册表单树组件
Vue.component('tree-table', TreeTable);
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor);

Vue.filter('dataFormat', function(originVal) {
  function addZero(i) {
    return i < 10 ? '0' + i : i + '';
  }
  const dt = new Date(originVal);
  let y = dt.getFullYear();
  let m = dt.getMonth() + 1;
  let d = dt.getDay();
  let hh = dt.getHours();
  let mm = dt.getMinutes();
  let ss = dt.getSeconds();
  y = addZero(y);
  m = addZero(m);
  d = addZero(d);
  hh = addZero(hh);
  mm = addZero(mm);
  ss = addZero(ss);

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
