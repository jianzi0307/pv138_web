<template>
  <div class="layout wrapper">
    <Layout>
      <!-- 头部 -->
      <pv138-console-header
        :logo="logo"
        :dropdowns="headerDropdownItems"
        :menus="menuItems"
        @dropdownClickEvent="dropdownClickEventHandler"
        @onCollChangeEvent="onCollChangeEventHandler"
      ></pv138-console-header>
      <Layout class="ivu-layout-has-sider">
        <!-- 侧边栏 -->
        <pv138-console-sider
          :collapsed="collapsed"
          :menus="sidebarMenu"
          @onMenuSelectedEvent="onMenuSelectedHandler"
        ></pv138-console-sider>
        <!-- 内容 -->
        <Layout :style="{padding: '24px',background: '#f5f7f9'}">
          <Breadcrumb class="breadcrumb">
            <BreadcrumbItem
              v-for="route in crumbList"
              :key="route.name"
              :to="{name:route.name}"
            >{{route.meta.name}}</BreadcrumbItem>
          </Breadcrumb>
          <Content class="page-content">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<style lang="scss" scoped>
@import "./console.scss";
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
  // 侧边栏折叠
  protected collapsed: boolean = false;
  // 下拉菜单
  protected headerDropdownItems: any[] = [
    {
      divided: false,
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

  protected async onCollChangeEventHandler(coll: boolean) {
    this.collapsed = coll;
  }

  protected async onMenuSelectedHandler(name: string) {
    const self: any = this;
    self.$router.push({ name });
  }

  protected mounted() {
    document.body.style.height = document.documentElement.scrollHeight + 'px';
  }
}

export default Console;
</script>

