// import { Message } from 'iview';
import { Vue } from 'vue-property-decorator';


export default (http: any) => {
  http.interceptors.request.use(
    (config: any) => {
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  http.interceptors.response.use(
    (response: any) => {
      return response.data;
    },
    (error: any) => {
      if (!error['response']) {
        console.log(error.code, error.message);
        Vue.prototype.$Message.error(error.message);
        return Promise.reject(error);
      }
      switch (error.response.status) {
        // 请求参数有误
        case 400:
          Vue.prototype.$Message.error(error.response.data.msg || '请求参数有误');
          break;
        // 未认证
        case 401:
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login';
          }
          break;
        // 无权限
        case 403:
          Vue.prototype.$Message.error(error.response.data.msg || '您没有此操作权限！');
          break;
        // 不存在的接口
        case 404:
          Vue.prototype.$Message.error(error.response.data.msg || '不存在的接口地址！');
          break;
        case 422:
          Vue.prototype.$Message.error(error.response.data.msg || 'Unprocessable Entity');
          break;
        // 服务器内部错误
        case 500:
        // 未实现的服务
        case 501:
        // 服务无效
        case 503:
        default:
          Vue.prototype.$Message.error('服务器开小差了，请稍后再试~！');
          break;
      }
      return Promise.reject(error.response);
    }
  )
};
