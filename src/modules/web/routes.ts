// 初始路由
export default [
  {
    path: '/',
    component: () => import('@/modules/web/web.vue'),
    children: [
      {
        path: '/',
        name: 'web.home',
        component: () => import('@/modules/web/home/home.vue')
      },
      {
        path: 'product/mass',
        name: 'product.mass',
        component: () => import('@/modules/web/product/mass.vue')
      },
      {
        path: 'product/master',
        name: 'product.master',
        component: () => import('@/modules/web/product/master.vue')
      }
    ]
  }
];

// 动态添加的路由
export const DynamicRoutes = [
  {
    path: '/console',
    name: 'console',
    component: () => import('@/modules/web/console/console.vue'),
    meta: {
      name: '首页',
      requiresAuth: true
    },
    children: [
      {
        path: 'home',
        name: 'console.home',
        component: () => import('@/modules/web/console/home/home.vue'),
        meta: {
          name: '首页',
          icon: 'md-home',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/401',
    name: 'error.denied',
    meta: {},
    component: () => import('@/modules/web/error/401.vue')
  },
  {
    path: '/500',
    name: 'error.internal',
    meta: {},
    component: () => import('@/modules/web/error/500.vue')
  },
  {
    path: '*',
    name: 'error.notfound',
    meta: {},
    component: () => import('@/modules/web/error/404.vue')
  }
];
