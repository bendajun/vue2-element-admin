import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import { getLocalToken } from '@/utils/auth';

// Route Module
import home from './modules/home';
import menus from './modules/menus';
import user from './modules/user';

import Login from '@/views/login/index.vue';

Vue.use(VueRouter);

export const defaultRoutes = [ // 路由的name最好和组件的name保持一致
  {
    path: '/',
    redirect: '/home',
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
  },
];
export const asyncRouteMap = [
  ...home,
  ...menus,
  ...user,
];

export const errorRoutes = [
  {
    path: '*',
    hidden: true,
    name: 'notFound',
    component: () => import(/* webpackChunkName: 'error' */ '@/views/error/404.vue'),
  },
];

// 无须鉴权的白名单路由
const whiteListRoutes = [
  '/login',
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: [...defaultRoutes],
});

router.beforeEach(async(to, from, next) => {
  if (getLocalToken()) { // 存在token时，走这里
    if (!store.getters['app/roles']) { // 没有用户角色先获取角色，根据角色动态渲染路由
      const data = await store.dispatch('app/fetchRoles');
      const roles = data.roles;
      store.dispatch('app/generateRoutes', roles);
      const addRoutes = store.getters['app/addRoutes'];
      router.addRoutes(addRoutes);
      router.addRoutes(errorRoutes);
      next({ ...to, replace: true });
    } else { // 有角色了就直接放行
      next();
    }
  } else { // token不存在的时候就走这里
    if (whiteListRoutes.includes(to.path)) {
      return next();
    } else { // 没token，又没在白名单路由里直接跳转到登录页
      next('/login');
    }
  }
});

// 创建动态路由
export function filterAsyncRoutes(asyncRouteMap, roles) {
  let addRoutes = [];
  if (roles.includes('admin')) {
    addRoutes = asyncRouteMap;
  } else { // 普通管理员
    asyncRouteMap.forEach(route => {
      const tmp = { ...route };
      if (hasPermission(roles, tmp)) {
        if (Array.isArray(tmp.children)) {
          tmp.children = filterAsyncRoutes(tmp.children, roles); // 闭包查找所有该roles下的路由
        }
        addRoutes.push(tmp);
      }
    });
  }
  return addRoutes;
}

export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(role => roles.includes(role));
  }
  return true; // 没有meta字段直接加载
}

export default router;
