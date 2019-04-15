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
        return Promise.reject(error);
      }
      switch (error.response.status) {
        case 422:
          const data = error.response.data.errors;
          let content = '';
          Object.keys(data).map((key) => {
            const value = data[key];
            content = value[0];
          });
          Vue.prototype.$Message.error(content);
          break;
        case 403:
          Vue.prototype.$Message.error(error.response.data.message || '您没有此操作权限！')
          break;
        case 401:
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login'
          }
          break;
        case 404:
          Vue.prototype.$Message.error('不存在的接口地址！')
          break;
        case 500:
        case 501:
        case 503:
        default:
          Vue.prototype.$Message.error('服务器开小差了，请稍后再试~！')
          break;
      }
      return Promise.reject(error.response);
    }
  )
};
