import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import WelCome from '../components/WelCome'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'

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
      { path: '/roles', component: Roles }
    ],
    redirect: '/welcome'
  },
]
const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 函数，放行    next()    next('/login')强制跳转
  if (to.path === '/login') return next();
  let tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});


export default router
