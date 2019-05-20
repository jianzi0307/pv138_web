import _ from 'lodash';
import Util from '@/utils/util';
import * as services from '@/utils/services';
import defaultRoutes, { DynamicRoutes } from '@/modules/web/routes';
import router from '@/router/index';
import dynamicRouter from '@/modules/web/dynamic-router';
import { consoleHomeName } from '@/config';

export default {
  module: {
    state: {
      // 所有路由
      permissionList: null,
      // 侧边栏菜单
      sidebarMenu: [],
      // 当前选中的导航栏
      currentMenu: '',
      // 面包屑
      crumbList: [],
      // 标签栏
      get tagsNavList() {
        const list = localStorage.tagsNavList
        return list ? JSON.parse(list) : []
      },
      set tagsNavList(value) {
        localStorage.tagsNavList = JSON.stringify(value);
      }
    },
    mutations: {
      SET_USER_PERMISSION(state: any, routes: any) {
        console.log('权限列表：', routes);
        state.permissionList = routes
      },
      SET_SIDER_MENUS(state: any, menu: any) {
        state.sidebarMenu = menu
      },
      SET_CURRENT_MENU(state: any, currMenu: any) {
        state.currentMenu = currMenu;
      },
      SET_CRUMB_LIST(state: any, list: any) {
        state.crumbList = list;
      },
      SET_TAGS_NAV_LIST(state: any, list: any) {
        let tagList = []
        if (list) {
          tagList = [...list]
        } else {
          tagList = state.tagsNavList || []
        }
        if (tagList[0] && tagList[0].name !== consoleHomeName) tagList.shift()
        const homeTagIndex = tagList.findIndex((item: any) => item.name === consoleHomeName)
        if (homeTagIndex > 0) {
          const homeTag = tagList.splice(homeTagIndex, 1)[0]
          tagList.unshift(homeTag)
        }
        state.tagsNavList = tagList
      },
      CLOSE_TAG(state: any, route: any) {
        const tag = state.tagsNavList.filter((item: any) => Util.routeEqual(item, route));
        route = tag[0] ? tag[0] : null;
        if (!route) return;
        const nextRoute = Util.getNextRoute(state.tagsNavList, route);
        state.tagsNavList = state.tagsNavList.filter((item: any) => {
          return !Util.routeEqual(item, route);
        });
        router.push(nextRoute);
      },
      ADD_TAG(state: any, { route, type = 'unshift' }: any) {
        const r: any = Util.getRouteTitleHandled(route);
        if (!Util.routeHasExist(state.tagsNavList, r)) {
          if (type === 'push') state.tagsNavList.push(r);
          else {
            if (r.name === consoleHomeName) {
              const lis: any[] = state.tagsNavList;
              lis.unshift(r);
              state.tagsNavList = lis;
            }
            else {
              const list: any[] = state.tagsNavList
              state.tagsNavList = list.splice(1, 0, r);
            }
          }
          state.tagsNavList = [...state.tagsNavList];
        }
      },
    },
    actions: {
      // 设置侧边栏菜单
      setMenus({ commit }: any, data: any) {
        commit('SET_SIDER_MENUS', data);
        Promise.resolve(data);
      },
      // 设置当前菜单 
      setCurrentMenu({ commit }: any, currMenu: any) {
        commit('SET_CURRENT_MENU', currMenu);
        Promise.resolve(currMenu);
      },
      // 设置面包屑
      setCrumbList({ commit }: any, list: any) {
        commit('SET_CRUMB_LIST', list);
        Promise.resolve(list);
      },
      // 设置标签栏
      setTagNavList({ commit }: any, list: any) {
        commit('SET_TAGS_NAV_LIST', list);
        Promise.resolve(list);
      },
      // 添加标签
      addTag({ commit }: any, data: any) {
        commit('ADD_TAG', data);
        Promise.resolve(data);
      },
      // 关闭标签
      closeTag({ commit }: any, route: any) {
        commit('CLOSE_TAG', route);
        Promise.resolve(route);
      },
      // 设置用户权限
      setPermission({ commit }: any, data: any) {
        commit('SET_USER_PERMISSION', data);
        console.log('data=>', data);
        Promise.resolve(data);
      },
      // 请求用户权限
      async loadPermission({ dispatch }: any) {
        const permissionList = await services.loadUserPermission();
        console.log(permissionList.data, '<<<<< 当前用户权限');
        console.log(dynamicRouter, '<<<< 动态路由');
        // 根据权限过滤用户路由
        const routes = Util.recursionRouter(permissionList.data, dynamicRouter);

        console.log('routes==>', routes);

        // 合并路由
        const consoleRootRoute: any = DynamicRoutes.find((v: any) => v.name === 'console');
        const children = consoleRootRoute.children;
        children.push(...routes);

        // 生成侧边栏导航菜单
        console.log(children, '<<<<<< children');
        dispatch('setMenus', Util.createMenus(children));
        Util.setDefaultRoute([consoleRootRoute]);

        // 初始路由
        const initialRoutes = defaultRoutes;

        // 动态添加路由
        router.addRoutes(DynamicRoutes);

        // 最终完整路由表
        dispatch('setPermission', [...initialRoutes, ...DynamicRoutes]);
      }
    },
    getters: {
      hasPermission(state: any) { return !_.isEmpty(state.permissionList); },
      getSiderMenus(state: any) { return state.sidebarMenu; },
      getCurrentMenu(state: any) { return state.currentMenu },
      getCrumbList(state: any) { return state.crumbList },
      getTagNavList(state: any) { return state.tagsNavList }
    }
  }
};
