import Layout from '@/Layout/index.vue';

export default [
  {
    path: '/home',
    name: 'home',
    redirect: '/home-one',
    meta: {
      roles: ['admin', 'manager', 'visitor'],
      name: '首页',
      icon: 'shouye'
    },
    component: Layout,
    children: [
      {
        path: '/home-one',
        name: 'homeOne',
        meta: {
          keepAlive: true,
          roles: ['admin', 'manager', 'visitor'],
          name: '首页列表',
          icon: 'liebiao',
          affix: true, // 有这个属性的会被app-tag-view一直显示且不可删除
        },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/home-two',
        name: 'homeTwo',
        meta: {
          keepAlive: true,
          roles: ['admin', 'manager', 'visitor'],
          name: '首页列表2',
          icon: 'yewubaobiao',
        },
        component: () => import('@/views/home/home-two/index.vue'),
      },
    ]
  },
];
