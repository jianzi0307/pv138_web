import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const qs = require('qs')

class Http {
  private _baseUrl: string;
  private _axios: AxiosInstance;
  public static readonly instance: Http = new Http(process.env.VUE_APP_API_BASE_URL);
  private constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._axios = axios.create({
      baseURL: this._baseUrl,
      headers: {
      }
    });
    this._axios.defaults.timeout = 10 * 1000; // 10 sec
    // this._cacheTime = 24 * 60; // 24 hours
    this._axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // this._axios.defaults.paramsSerializer = (params) => {
    //   return qs.stringify(params, { arrayFormat: 'repeat' });
    // };
    // 拦截器
    this._axios.interceptors.response.use((response: any) => {
      if (response && response.hasOwnProperty('data')) {
        const data = response.data
        if (data && data.hasOwnProperty('code')) {
          const code = parseInt(data.code, 10)
          if (code !== 0) {
            // (iView).Message.error(`${data.msg}(${data.code})`)
            if (code === 4996 || code === 4997) {
              // store.commit('SET_CLEAR')
              // router.replace('/login')
            }
            return Promise.reject(response)
          } else {
            return response
          }
        }
        return response
      }
    }, (err: any) => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误(400)'
            break
          case 401:
            err.message = '未授权，请重新登录(401)'
            break
          case 403:
            err.message = '拒绝访问(403)'
            break
          case 404:
            err.message = '请求出错(404)'
            break
          case 408:
            err.message = '请求超时(408)'
            break
          case 500:
            err.message = '服务器错误(500)'
            break
          case 501:
            err.message = '服务未实现(501)'
            break
          case 502:
            err.message = '网络错误(502)'
            break
          case 503:
            err.message = '服务不可用(503)'
            break
          case 504:
            err.message = '网络超时(504)'
            break
          case 505:
            err.message = 'HTTP版本不受支持(505)'
            break
          default:
            err.message = `连接出错(${err.response.status})!`
        }
      } else {
        err.message = '连接服务器失败!'
      }
      // (iView).Message.error(err.message)
      return Promise.reject(err)
    })
  }

  public setAuthorizationHeader(token: string) {
    if (token) {
      this._axios.defaults.headers.Authorization = token;
    } else {
      this.removeAuthorizationHeader();
    }
  }

  public removeAuthorizationHeader() {
    delete this._axios.defaults.headers.Authorization;
  }

  public getBaseURL() {
    return this._baseUrl;
  }

  public post(url: string, data?: any, config?: AxiosRequestConfig) {
    if (data) {
      data = qs.stringify(data, { arrayFormat: 'indices' });
    }
    return this._axios.post(url, data, config);
  }

  public get(url: string, config?: AxiosRequestConfig) {
    return this._axios.get(url, config);
  }
}

export default Http;
