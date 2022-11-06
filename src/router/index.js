import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '@/layout';

Vue.use(Router);

export const constantRoutes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/demo',
        component: () => import('@/views/demo'),
        name: 'Demo',
        meta: { title: '测试', icon: 'dashboard', affix: false },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/demo'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
];

// 防止连续点击多次路由报错
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
