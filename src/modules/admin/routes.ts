export default [
  {
    path: '/admin',
    component: () => import('@/modules/admin/admin.vue'),
    children: [
      // dashboard
      {
        path: 'dash',
        name: 'admin.dash',
        component: () => import('@/modules/admin/dash.vue')
      }
    ]
  }
];
