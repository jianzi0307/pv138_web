
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
          // message
          break;
        case 403:
          break;
        case 401:
          break;
        case 500:
        case 501:
        case 503:
        default:
          // message
          break;
      }
      return Promise.reject(error.response)
    }
  )
};
