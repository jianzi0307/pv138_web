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
      },
      {
        path: 'dashboard',
        component: () => import('@/modules/web/dashboard/dashboard.vue'),
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '/',
            name: 'dashboard.home',
            component: () => import('@/modules/web/dashboard/home/home.vue'),
            meta: {
              requiresAuth: true
            }
          }
        ]
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
