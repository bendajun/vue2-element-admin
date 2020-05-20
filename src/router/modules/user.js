import Layout from '@/Layout/index.vue';

export default [
  {
    path: '/user',
    name: 'user',
    redirect: '/user-one',
    meta: {
      roles: ['admin', 'manager', 'visitor'],
      name: '用户管理',
      icon: 'yonghumingchengICO'
    },
    component: Layout,
    children: [
      {
        path: '/user-one',
        name: 'userOne',
        meta: {
          roles: ['admin', 'manager'],
          name: '用户管理1',
          icon: 'renjijiaohu',
        },
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/user-two',
        name: 'userTwo',
        meta: {
          roles: ['admin', 'manager', 'visitor'],
          name: '用户管理2',
          icon: 'renshidangan',
        },
        component: () => import('@/views/user/user-two/index.vue')
      }
    ]
  },
];
