export default [
  {
    path: '/auth',
    component: () => import('@/modules/auth/auth.vue'),
    children: [
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('@/modules/auth/register/register.vue')
      },
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/modules/auth/login/login.vue')
      }
    ]
  }
];
