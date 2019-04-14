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
      },
      {
        path: 'password/forget',
        name: 'auth.password.forget',
        component: () => import('@/modules/auth/password/forget.vue')
      },
      {
        path: 'password/reset',
        name: 'auth.password.reset',
        component: () => import('@/modules/auth/password/reset.vue')
      },
      {
        path: 'agreement',
        name: 'auth.agreement',
        component: () => import('@/modules/auth/agreement/agreement.vue')
      }
    ]
  }
];
