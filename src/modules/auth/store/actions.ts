import { userTokenStorageKey } from '@/config';

import { ActionContext } from 'vuex';
import localforage from 'localforage';
import _ from 'lodash';
import * as services from '@/utils/services'
import * as TYPES from './mutations-types';
import { setHttpHeaderToken } from '@/utils/http';

// 尝试登录
export const attemptLogin = ({ dispatch }: any, payload: any) => {
  return services.postLogin(payload)
    .then(({ data }) => {
      console.log(data, '<<<<<登录成功');
      dispatch('setToken', data);
    })
    .then(() => dispatch('loadUser'))
    .then(() => dispatch('loadPermission'))
};

// 手机验证码登录
export const attemptLoginPhone = ({ dispatch }: any, payload: any) => {
  return services.postLoginPhone(payload)
    .then(({ data }) => {
      console.log(data, '<<<<<登录成功');
      dispatch('setToken', data);
    })
    .then(() => { dispatch('loadUser') })
    .then(() => { dispatch('loadPermission') })
};

// 尝试注册
export const attemptRegister = ({ dispatch }: any, payload: any) => {
  return services.postRegister(payload)
    .then(({ data }) => {
      console.log(data, '<<<<<注册成功');
      dispatch('setToken', data);
    })
    .then(() => dispatch('loadUser'))
    .then(() => dispatch('loadPermission'))
};

// 发送验证码
export const sendSmsCode = (context: ActionContext<any, any>, payload: any) => {
  return services.postSendSmsCode(payload);
};

// 短信验证码检查
export const smsVerify = (context: ActionContext<any, any>, payload: any) => {
  return services.smsVerify(payload);
};

// 找回密码
export const findPassword = (context: ActionContext<any, any>, payload: any) => {
  return services.findPassword(payload);
};

// 退出
export const logout = ({ dispatch }: any) => {
  return localforage.removeItem(userTokenStorageKey)
    .then(() => dispatch('setToken', null))
    .then(() => dispatch('setUser', {}))
    .then(() => dispatch('setPermission', null))
    .then(() => dispatch('setMenus', []))
};

// 设置用户
export const setUser = ({ commit }: any, data: any) => {
  commit(TYPES.SET_USER, data);
  Promise.resolve(data);
};

// 设置Token
export const setToken = ({ commit }: any, payload: any) => {
  const token = _.isEmpty(payload) ? null : payload.token || payload;
  commit(TYPES.SET_TOKEN, token);
  setHttpHeaderToken(token);
  return Promise.resolve(token);
};

/**
 * 获取并更新用户信息
 * 抛错则说明token是无效的，直接退出系统
 */
export const loadUser = (context: ActionContext<any, any>) => {
  services.loadUserData()
    .then(({ data }: any) => {
      console.log(data, '<<<<< 当前用户信息');
      context.dispatch('setUser', data);
    })
    .catch(() => { context.dispatch('logout') });
};

