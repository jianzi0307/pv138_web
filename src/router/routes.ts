const routes: any[] = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/pages/home/home.vue')
      },
      {
        path: '/t',
        name: 'compTest',
        component: () => import('@/pages/single/test.vue')
      },
      {
        path: '/comp/score',
        name: 'compScore',
        component: () => import('@/pages/single/compScore.vue')
      },
    ]
  },
  {
    path: '/auth',
    component: () => import('@/pages/auth/auth.vue'),
    children: [
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('@/pages/auth/register/register.vue')
      },
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/pages/auth/login/login.vue')
      }
    ]
  },
  {
    path: '/product',
    component: () => import('@/pages/index.vue'),
    children: [
      {
        path: 'mass',
        name: 'product.mass',
        component: () => import('@/pages/product/mass.vue')
      },
      {
        path: 'master',
        name: 'product.master',
        component: () => import('@/pages/product/master.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'errorDenied',
    meta: {},
    component: () => import('@/pages/error/401.vue')
  },
  {
    path: '/500',
    name: 'errorServer',
    meta: {},
    component: () => import('@/pages/error/500.vue')
  },
  {
    path: '*',
    name: 'errorNotFound',
    meta: {},
    component: () => import('@/pages/error/404.vue')
  }
]
export default routes
