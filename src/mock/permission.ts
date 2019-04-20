const configs = [{
  url: '/api/user/me/permission',
  method: 'get',
  data: {
    code: 0,
    message: 'ok',
    data: [
      {
        id: 1,
        name: '公众号列表'
      },
      {
        id: 2,
        name: '粉丝管理',
        children: [
          {
            name: '全部粉丝'
          }
        ]
      },
      {
        id: 3,
        name: '消息群发',
        children: [
          {
            id: 31,
            name: '高级群发'
          },
          {
            id: 32,
            name: '客服群发'
          },
          {
            id: 33,
            name: '模板群发'
          }
        ]
      },
      {
        id: 4,
        name: '查看报表',
        children: [
          {
            id: 41,
            name: '今日概况'
          }
        ]
      },
      {
        id: 5,
        name: '权限设置',
        children: [
          {
            id: 51,
            name: '子账号'
          },
          {
            id: 52,
            name: '角色管理'
          }
        ]
      }
    ]
  }
}]

export default configs
