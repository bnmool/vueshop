import Vue from 'vue';
import VueRouter from 'vue-router';

// import Login from '../components/Login'
const Login = () => import(/* webpackChunkName:"Login_Home_WelCome" */ '../components/Login');
// import Home from '../components/Home'
const Home = () => import(/* webpackChunkName:"Login_Home_WelCome" */ '../components/Home');
// import WelCome from '../components/WelCome'
const WelCome = () => import(/* webpackChunkName:"Login_Home_WelCome" */ '../components/WelCome');

// import Users from '../components/user/Users';
const Users = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/user/Users');
// import Rights from '../components/power/Rights';
const Rights = () =>
  import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/power/Rights');
// import Roles from '../components/power/Roles';
const Roles = () => import(/* webpackChunkName:"Users_Rights_Roles" */ '../components/power/Roles');

// import Categories from '../components/goods/Cate';
const Categories = () =>
  import(/* webpackChunkName:"Categories_Params" */ '../components/goods/Cate');
// import Params from '../components/goods/Params';
const Params = () =>
  import(/* webpackChunkName:"Categories_Params" */ '../components/goods/Params');

// import GoodsList from '../components/goods/List';
const GoodsList = () => import(/* webpackChunkName:"GoodsList_Add" */ '../components/goods/List');
// import Add from '../components/goods/Add';
const Add = () => import(/* webpackChunkName:"GoodsList_Add" */ '../components/goods/Add');

// import Order from '../components/order/Order';
const Order = () => import(/* webpackChunkName:"Order_Report" */ '../components/order/Order');
// import Report from '../components/report/Report';
const Report = () => import(/* webpackChunkName:"Order_Report" */ '../components/report/Report');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '/welcome', component: WelCome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ],
    redirect: '/welcome'
  }
];
const router = new VueRouter({
  routes
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 函数，放行    next()    next('/login')强制跳转
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});

export default router;
