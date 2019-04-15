import { Message } from 'iview'

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
// tslint:disable-next-line: no-string-literal
      if (!error['response']) {
        return Promise.reject(error);
      }
      switch (error.response.status) {
        case 422:
          const data = error.response.data.errors;
          let content = '';
          Object.keys(data).map((key) => {
            const value = data[key];
            content = value[0]
          });
          Message.error(content);
          return;
          break;
        case 403:
          Message.error(error.response.data.message || '您没有此操作权限！')
          return;
          break;
        case 401:
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login'
          }
          break;
        case 500:
        case 501:
        case 503:
        default:
          Message.error('服务器开小差了，请稍后再试~！')
          return;
          break;
      }
      return Promise.reject(error.response)
    }
  )
};
