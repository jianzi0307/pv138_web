const configs = [{
    url: '/manage/common/login',
    method: 'post',
    data: {
        code: 1000,
        message: '登录成功',
        data: {
            auth: {
                token: '75822928846e26f4ec90cb4749f74671',
                expire: new Date().getTime()
            },
            user: {
                code: '00000000000000000000000000',
                userName: '测试',
                mobile: '186124443223',
                stationId: 5, // 岗位： 1 管理员 2 总监 3 大区经理 4 地区经理 5 销售代表 6 BD
                stationName: '管理员',
                districtId: '42', // 大区
                status: 1,
                userId: 0
            }
        }
    }
}]

export default configs
