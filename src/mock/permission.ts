const configs = [{
  url: '/api/user/me/permission',
  method: 'get',
  data: {
    code: 0,
    message: 'ok',
    data: [
      {
        id: '1',
        icon: 'ios-chatbubbles',
        label: '公众号列表',
        route: 'console.official.list'
      },
      {
        id: '2',
        icon: 'md-people',
        label: '粉丝管理',
        children: [
          {
            id: '2-1',
            label: '全部粉丝',
            route: 'console.user.list'
          }
        ]
      },
      {
        id: '3',
        icon: 'ios-paper-plane',
        label: '消息群发',
        children: [
          {
            id: '3-1',
            label: '高级群发',
            route: 'console.mass.advanced'
          },
          {
            id: '3-2',
            label: '客服群发',
            route: 'console.mass.custom'
          },
          {
            id: '3-3',
            label: '模板群发',
            route: 'console.mass.template'
          }
        ]
      },
      {
        id: '4',
        icon: 'md-stats',
        label: '查看报表',
        children: [
          {
            id: '4-1',
            label: '今日概况',
            route: 'console.datacube.summary'
          }
        ]
      },
      {
        id: '5',
        icon: 'md-hammer',
        label: '权限设置',
        children: [
          {
            id: '5-1',
            label: '子账号',
            route: 'console.setting.staff'
          },
          {
            id: '5-2',
            label: '角色管理',
            route: 'console.setting.role'
          }
        ]
      }
    ]
  }
}]

export default configs
