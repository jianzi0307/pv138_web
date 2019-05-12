import { consoleHomeName } from '@/config';

class Util {

  public static getRouteTitleHandled(route: any) {
    const router = { ...route }
    const meta = { ...route.meta }
    router.meta = meta;
    return router;
  }

  /**
   * 判断打开的标签列表里是否已存在这个新添加的路由对象
   */
  public static routeHasExist(tagsNavList: any, routeItem: any) {
    const len = tagsNavList.length
    let res = false
    Util.doCustomTimes(len, (index: number) => {
      if (Util.routeEqual(tagsNavList[index], routeItem)) {
        res = true;
      }
    })
    return res
  }

  // times 回调函数需要执行的次数 callback 回调函数
  public static doCustomTimes(times: number, callback: any) {
    let i = -1
    while (++i < times) {
      callback(i)
    }
  }
  // 如果该newRoute已经存在则不再添加 list 现有标签导航列表 newRoute 新添加的路由原信息对象
  public static getNewTagList(list: any, newRoute: any) {
    const { name, path, meta } = newRoute
    const newList: any = [...list]
    if (newList.findIndex((item: any) => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
  }

  // list 标签列表 name 当前关闭的标签名
  public static getNextRoute(list: any, route: any) {
    let res = {};
    if (list.length === 2) {
      res = Util.getHomeRoute(list);
    } else {
      const index = list.findIndex((item: any) => Util.routeEqual(item, route));
      if (index === list.length - 1) res = list[list.length - 2];
      else res = list[index + 1];
    }
    return res;
  }

  // 用于找到路由列表中name为home的对象 routers 路由列表数组
  public static getHomeRoute(routers: any, homeName = consoleHomeName) {
    let i = -1;
    const len = routers.length;
    let homeRoute = {};
    while (++i < len) {
      const item = routers[i];
      if (item.children && item.children.length) {
        const res: any = Util.getHomeRoute(item.children, homeName);
        if (res.name) return res;
      } else {
        if (item.name === homeName) homeRoute = item;
      }
    }
    return homeRoute;
  }

  // 判断两个对象是否相等，这两个对象的值只能是数字或字符串
  public static objEqual(obj1: any, obj2: any) {
    const keysArr1 = Object.keys(obj1);
    const keysArr2 = Object.keys(obj2);
    if (keysArr1.length !== keysArr2.length) return false;
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
    /* eslint-disable-next-line */
    else return !keysArr1.some((key: any) => obj1[key] !== obj2[key]);
  }

  // 根据name/params/query判断两个路由对象是否相等
  public static routeEqual(route1: any, route2: any) {
    const params1 = route1.params || {};
    const params2 = route2.params || {};
    const query1 = route1.query || {};
    const query2 = route2.query || {};
    return (route1.name === route2.name) && Util.objEqual(params1, params2) && Util.objEqual(query1, query2);
  }

  // 递归生成拥有权限的路由
  public static recursionRouter(userRouter = [], allRouter: any[] = []) {
    const realRoutes: any[] = [];
    allRouter.forEach((v: any, i) => {
      userRouter.forEach((item: any, index) => {

        if (item.name === v.meta.name) {
          console.log('=====', item.name, v.meta.name);
          if (item.children && item.children.length > 0) {
            v.children = Util.recursionRouter(item.children, v.children);
          }
          v.meta.id = item.id || 0;
          realRoutes.push(v);
        }
      })
    });
    return realRoutes;
  }

  // 递归为所有有子路由的路由设置第一个children.path为默认路由
  public static setDefaultRoute(routes: any[]) {
    routes.forEach((v, i) => {
      if (v.children && v.children.length > 0) {
        v.redirect = { name: v.children[0].name };
        Util.setDefaultRoute(v.children);
      }
    });
  }

  // 通过路由生成菜单
  public static createMenus(routes: any[]) {
    const menus: any[] = [];
    routes.forEach((v, i) => {
      const menu: any = {};
      if (v.children && v.children.length > 0) {
        menu.children = Util.createMenus(v.children);
      }
      menu.id = v.meta.id;
      if (v.meta.hasOwnProperty('icon')) {
        menu.icon = v.meta.icon;
      }
      menu.label = v.meta.name;
      menu.route = v.name;
      menus.push(menu);
    });
    return menus;
  }

  // 生产日期格式的文件名
  public static dateFileName = (fileName: string) => {
    const date = new Date()
    const Y = date.getFullYear()
    const M = (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1)
    const D = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    return `${Y}${M}${D}/${Y}${M}${D}${h}${m}${s}.${fileName.split('.')[1]}`
  }

  /**
   * 时间戳转日期格式
   */
  public static dateFormat = (timestamp: number) => {
    const date = new Date(timestamp)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    // let h = date.getHours() + ':'
    // let m = date.getMinutes() + ':'
    // let s = date.getSeconds()
    return Y + M + D
  }

  /**
   * 获取query参数
   */
  public static getQueryString = (name: string) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return unescape(r[2])
    }
    return null
  }

  /**
   * 获取某范围数字数组
   */
  public static rangeNumbers = (start: any, end: any) => {
    return Array(end - start + 1).fill(0).map((v, i) => i + start)
  }

  /*
  * 设置cookie
  * */
  public static setCookie = (name: string, value: any) => {
    // 缓存过期时间
    const Days = 30
    const exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' +
      exp.toUTCString() + ';path=/'
  }
  /*
  * 获取cookie
  * */
  public static getCookie = (name: string) => {
    const arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const reg = arr
    const match = document.cookie.match(reg)
    if (match) {
      return unescape(match[2])
    } else {
      return null
    }
  }
  /*
  * 清除cookie
  * */
  public static clearCookie = (name: string) => {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = Util.getCookie(name)
    if (cval !== null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString() +
        ';path=/'
    }
  }
  /*
  * range
  * */
  public static range = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max)
  }
  /*
  * 判断是否为对象
  * */
  public static isObj = (value: any) => {
    return value !== null &&
      (typeof value === 'object' || typeof value === 'function')
  }
  /*
   * 转成小写
   * */
  public static toLowerCase = (str: any) => {
    if (str !== '') { return str.toLocaleLowerCase() }
  }
  /*
   * 转成大写
   * */
  public static toUpperCase = (str: any) => {
    if (str !== '') { return str.toLocaleUpperCase() }
  }
  /*
   * 存储localStorage
   * */
  public static setStore = (name: string, content: any) => {
    if (!name || !content || !window.localStorage) { return }
    if (typeof content !== 'string') { content = JSON.stringify(content) }
    window.localStorage.setItem(name, content)
  }
  /*
   * 获取localStorage
   * */
  public static getStore = (name: string) => {
    if (!name || !window.localStorage) { return }
    let value = window.localStorage.getItem(name)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        // value = value
      }
    }
    return value
  }
  /*
   * 删除localStorage
   * */
  public static removeStore = (name: string) => {
    if (!name || !window.localStorage) { return }
    window.localStorage.removeItem(name)
  }
  /*
   * 清空localStorage
   * */
  public static clearStore = () => {
    if (!window.localStorage) { return }
    window.localStorage.clear()
  }

  /*
   * 存储sessionStorage
   * */
  public static setSession = (name: string, content: any) => {
    if (!name || !content || !window.sessionStorage) { return }
    if (typeof content !== 'string') { content = JSON.stringify(content) }
    window.sessionStorage.setItem(name, content)
  }
  /*
   * 获取sessionStorage
   * */
  public static getSession = (name: string) => {
    if (!name || !window.sessionStorage) { return }
    let value = window.sessionStorage.getItem(name)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        // value = value
      }
    }
    return value
  }
  /*
   * 删除sessionStorage
   * */
  public static removeSession = (name: string) => {
    if (!name || !window.sessionStorage) { return }
    window.sessionStorage.removeItem(name)
  }
  /*
   * 清空sessionStorage
   * */
  public static clearSession = () => {
    if (!window.sessionStorage) { return }
    window.sessionStorage.clear()
  }

  /*
   * 保留两位小数
   * */
  public static KeepTwoFloat = (num: number) => {
    const _num = Math.round(num * 100) / 100
    const _arr = _num.toString().split('.')
    if (_arr.length === 1) {
      return _num.toString() + '.00'
    }
    if (_arr.length > 1) {
      if (_arr[1].length < 2) {
        return _num.toString() + '0'
      }
      return _num.toString()
    }
  }
  /*
   * 判断空值
   * */
  public static isEmpty = (keys: any) => {
    if (typeof keys === 'string') {
      /*eslint-disable*/
      keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, '')
      if (keys === '' || keys === null || keys === 'null' || keys ===
        'undefined') {
        return true
      } else {
        return false
      }
    } else if (typeof keys === 'undefined') { // 未定义
      return true
    } else if (typeof keys === 'number') {
      return false
    } else if (typeof keys === 'boolean') {
      return false
    } else if (typeof keys === 'object' && !Array.isArray(keys)) {
      if (JSON.stringify(keys) === '{}') {
        return true
      } else if (keys === null) { // null
        return true
      } else {
        return false
      }
    } else if (keys instanceof Array && keys.length === 0) {
      return true
    } else {
      return false
    }
  }
  /*
   * 返回两位小数
   * */
  public static getTwoFixedNum = (num: number) => {
    return num.toFixed(2)
  }
  /*
   * 获取元素的样式值
   * */
  public static getComStyle = (el: any, style: any) => {
    return parseInt(window.getComputedStyle(el, null)[style], 0)
  }
  /*
   * 计算dpr
   * */
  public static getDeviceRatio = (): number => {
    //    const isAndroid = window.navigator.appVersion.match(/android/gi)
    const isIPhone = window.navigator.appVersion.match(/iphone/gi)
    const devicePixelRatio = window.devicePixelRatio
    let dpr
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3) {
        dpr = 3
      } else if (devicePixelRatio >= 2) {
        dpr = 2
      } else {
        dpr = 1
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1
    }
    return dpr
  }
}

export default Util;
