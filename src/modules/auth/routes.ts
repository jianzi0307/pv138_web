export default [
  {
    path: '/auth',
    component: () => import('@/modules/auth/auth.vue'),
    children: [
      // 注册
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('@/modules/auth/register/register.vue')
      },
      // 登录
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/modules/auth/login/login.vue')
      },
      // 找回密码
      {
        path: 'password/forget',
        name: 'auth.password.forget',
        component: () => import('@/modules/auth/password/forget.vue')
      },
      // 重置密码
      {
        path: 'password/reset',
        name: 'auth.password.reset',
        component: () => import('@/modules/auth/password/reset.vue')
      },
      // 注册协议
      {
        path: 'agreement',
        name: 'auth.agreement',
        component: () => import('@/modules/auth/agreement/agreement.vue')
      }
    ]
  }
];
