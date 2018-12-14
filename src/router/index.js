import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import wrapper from 'src/components/wrapper';
import login from 'src/components/login';
import user from 'src/components/mainComponents/power/user';
import userAdd from 'src/components/mainComponents/power/userAdd';
import powerGroup from 'src/components/mainComponents/power/powerGroup';
import powerGroupAdd from 'src/components/mainComponents/power/powerGroupAdd';
import powerGroupMenu from 'src/components/mainComponents/power/powerGroupMenu';

const router = new Router({
  routes: [
    {path: '/login', name: '登录', component: login},
    {
      path: '/home',
      name: '主页',
      component: wrapper,
      children: [
        {path: '/home', redirect: 'user'},
        {path: '/home/user', name: '用户', component: user},
        {path: '/home/userAdd', name: '新增用户', component: userAdd},
        {path: '/home/powerGroup', name: '权限', component: powerGroup},
        {path: '/home/powerGroupAdd', name: '新增权限', component: powerGroupAdd},
        {path: '/home/powerGroupMenu', name: '权限设置', component: powerGroupMenu},
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  window.scrollTo(0, 0);
  next()
});

export default router
