// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import http from '@/utils/http'

// 手机密码登录
export const postLogin = ({ account, accountType, password }: any) => {
  return http.post('auth/login', {
    account,
    accountType,
    password
  });
}

// 手机验证码登录
export const postLoginPhone = ({ account, accountType, secCode }: any) => {
  return http.post('auth/login_phone', {
    account,
    accountType,
    secCode
  });
};

// 注册
export const postRegister = (payload: any) => {
  return http.post('auth/register', payload)
}

// 发送验证码
export const postSendSmsCode = (payload: any) => {
  console.log(payload, '<<<');
  return http.post('c/sms', payload);
};

// 短信验证码验证
export const smsVerify = (payload: any) => {
  return http.get('c/sms/verify', { params: payload });
};

// 找回密码
export const findPassword = (payload: any) => {
  return http.post('auth/password', payload);
};

// 获取当前用户信息
export const loadUserData = () => http.get('/api/users/me').catch((err: any) => console.log(err));

// 获取当前用户权限列表
// export const loadUserPermission = () => http.get('/api/user/me/permission').catch((err: any) => console.log(err));
export const loadUserPermission = () => {
  const per = require('@/assets/permission.json');
  console.log(per);
  return Promise.resolve(per);
}

// 用户授权后获取到auth_code，后续绑定公众号给当前登录用户
export const bindOfficialToUser = (payload: any) => {
  return http.post('api/officials/bind', payload);
}

// revoke current token
// export const revokeToken = (token: string) => http.post('/oauth/tokens/' + token)
