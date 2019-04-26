<template>
  <div class="wrapper">
    <Layout class="layout">
      <pv138-console-header
        :logo="logo"
        :dropdowns="headerDropdownItems"
        :menus="menuItems"
        @dropdownClickEvent="dropdownClickEventHandler"
      ></pv138-console-header>
      <Layout class="layout-body">
        <Content>
          <Layout class="layout-content-container">
            <pv138-console-sider :menus="sidebarMenu" @onMenuSelectedEvent="onMenuSelectedHandler"></pv138-console-sider>
            <Content :style="{padding: '24px'}">
              <Breadcrumb>
                <BreadcrumbItem
                  v-for="route in crumbList"
                  :key="route.name"
                  :to="{name:route.name}"
                >{{route.meta.name}}</BreadcrumbItem>
              </Breadcrumb>
               <div class="page-content"><router-view></router-view></div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<style lang="scss" scoped>
@import "./console.scss";
html,
body {
  height: 100%;
  padding: 0;
}
.wrapper {
  height: 100%;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { mapActions } from 'vuex';
import Util from '@/utils/util';
import { ConsoleHeader, ConsoleSider } from '@/components';
import store from '@/store';

@Component({
  components: {
    [ConsoleHeader.name]: ConsoleHeader,
    [ConsoleSider.name]: ConsoleSider
  },
  computed: {
    sidebarMenu() {
      return store.getters.getSiderMenus;
    },
    crumbList() {
      return store.getters.getCrumbList.filter((route: any) => {
        return route.name !== 'console.home';
      });
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
})
class Console extends Vue {
  protected logo: any = require('@/assets/logo.svg');
  // 下拉菜单
  protected headerDropdownItems: any[] = [
    {
      divided: true,
      icon: 'md-contact',
      label: '账号信息',
      name: 'profile'
    },
    {
      divided: true,
      icon: 'md-log-out',
      label: '退出登录',
      name: 'exit'
    }
  ];
  // 顶部菜单
  protected menuItems: any[] = [
    // { route: "console.officials", label: "使用帮助" },
  ];

  protected async dropdownClickEventHandler(name: string) {
    const self: any = this;
    switch (name) {
      case 'fullscreen':
        Util.toggleFullScreen();
        break;
      case 'profile':
        break;
      case 'exit':
        await self.logout();
        // self.$Message.success("成功退出");
        // self.$router.replace({ name: "auth.login" });
        // 防止切换角色时addRoutes重复添加路由导致出现警告
        window.location.reload();
        break;
    }
  }

  protected async onMenuSelectedHandler(name: string) {
    const self: any = this;
    self.$router.push({ name });
  }
}

export default Console;
</script>

