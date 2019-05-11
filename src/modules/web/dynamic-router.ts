// 需要权限判断的所有路由
const dynamicRoutes = [
  {
    path: 'official/list',
    name: 'console.official.list',
    component: () => import('@/modules/web/console/official/list.vue'),
    meta: {
      name: '公众号列表',
      icon: 'ios-chatbubbles',
      requiresAuth: true
    },
  },
  {
    path: 'user',
    name: 'console.user',
    component: () => import('@/modules/web/console/user/index.vue'),
    meta: {
      name: '粉丝管理',
      icon: 'md-people',
      requiresAuth: true
    },
    children: [
      {
        path: 'list',
        name: 'console.user.list',
        component: () => import('@/modules/web/console/user/list.vue'),
        meta: {
          name: '全部粉丝',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: 'mass',
    name: 'console.mass',
    component: () => import('@/modules/web/console/mass/index.vue'),
    meta: {
      name: '消息群发',
      icon: 'ios-paper-plane',
      requiresAuth: true
    },
    children: [
      {
        path: 'ai',
        name: 'console.mass.ai',
        component: () => import('@/modules/web/console/mass/ai.vue'),
        meta: {
          name: '智能推送',
          requiresAuth: true
        },
        children: [
          {
            path: 'aiai',
            name: 'aaa',
            component: () => import('@/modules/web/console/mass/ai.vue'),
            meta: {
              name: '你好',
              requiresAuth: true
            },
          },
          {
            path: 'aiaiai',
            name: 'bbb',
            component: () => import('@/modules/web/console/mass/ai.vue'),
            meta: {
              name: '你好2',
              requiresAuth: true
            },
          }
        ]
      },
      {
        path: 'advanced',
        name: 'console.mass.advanced',
        component: () => import('@/modules/web/console/mass/advanced.vue'),
        meta: {
          name: '高级群发',
          requiresAuth: true
        }
      },
      {
        path: 'custom',
        name: 'console.mass.custom',
        component: () => import('@/modules/web/console/mass/custom.vue'),
        meta: {
          name: '客服消息',
          requiresAuth: true
        }
      },
      {
        path: 'template',
        name: 'console.mass.template',
        component: () => import('@/modules/web/console/mass/template.vue'),
        meta: {
          name: '模板群发',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: 'datacube',
    name: 'console.datacube',
    component: () => import('@/modules/web/console/datacube/index.vue'),
    meta: {
      name: '查看报表',
      icon: 'md-stats',
      requiresAuth: true
    },
    children: [
      {
        path: 'summary',
        name: 'console.datacube.summary',
        component: () => import('@/modules/web/console/datacube/summary.vue'),
        meta: {
          name: '今日概况',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: 'setting',
    name: 'console.setting',
    component: () => import('@/modules/web/console/setting/index.vue'),
    meta: {
      name: '权限设置',
      icon: 'md-hammer',
      requiresAuth: true
    },
    children: [
      {
        path: 'staff',
        name: 'console.setting.staff',
        component: () => import('@/modules/web/console/setting/staff.vue'),
        meta: {
          name: '子账号',
          requiresAuth: true
        }
      },
      {
        path: 'role',
        name: 'console.setting.role',
        component: () => import('@/modules/web/console/setting/role.vue'),
        meta: {
          name: '角色管理',
          requiresAuth: true
        }
      }
    ]
  }
];

export default dynamicRoutes
