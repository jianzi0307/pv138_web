const routes: any[] = [
  {
    path: '/',
    component: () => import('@/pages/home.vue'),
    children: [
      {
        path: '/',
        // redirect: '/dash'
        name: 'home',
        component: () => import('@/pages/index.vue')
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
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/components/login.vue')
  // },
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
