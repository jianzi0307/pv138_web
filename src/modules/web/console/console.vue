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
        <Layout :style="{background: '#f5f7f9'}">
          <tags-nav
            :value="$route"
            :homeName="homeName"
            @input="tagClickHandler"
            :list="tagList"
            @on-close="tagCloseHandler"
          />
          <div style="padding: 24px;">
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
          </div>
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
import { Vue, Component, Watch } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { mapActions } from 'vuex';
import Util from '@/utils/util';
import { ConsoleHeader, ConsoleSider, TagsNav } from '@/components';
import { consoleHomeName } from '@/config';
import store from '@/store';

@Component({
  components: {
    [ConsoleHeader.name]: ConsoleHeader,
    [ConsoleSider.name]: ConsoleSider,
    [TagsNav.name]: TagsNav
  },
  computed: {
    sidebarMenu() {
      return store.getters.getSiderMenus;
    },
    crumbList() {
      return store.getters.getCrumbList.filter((route: any) => {
        return route.name !== consoleHomeName;
      });
    },
    tagList() {
      return store.getters.getTagNavList;
    }
  },
  methods: {
    ...mapActions(['logout', 'setTagNavList', 'closeTag', 'addTag'])
  }
})
class Console extends Vue {
  protected homeName: string = consoleHomeName;
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

  protected tagClickHandler(item: any) {
    this.$router.push({ name: item.name });
  }

  protected tagCloseHandler(res: any, type: string, route: any) {
    const self: any = this;
    if (type !== 'others') {
      if (type === 'all') {
        this.$router.push({ name: consoleHomeName });
      } else {
        if (Util.routeEqual(this.$route, route)) {
          self.closeTag(route);
        }
      }
    }
    self.setTagNavList(res);
  }

  protected mounted() {
    const self: any = this;
    document.body.style.height = document.documentElement.scrollHeight + 'px';
    self.setTagNavList();

    const { name, params, query, meta } = this.$route;
    self.addTag({
      route: { name, params, query, meta }
    });
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!self.tagList.find((item: any) => item.name === this.$route.name)) {
      self.$router.push({
        name: consoleHomeName
      });
    }
  }

  @Watch('$route')
  public routeChanged(newRoute: any, oldVal: string) {
    console.log(newRoute, '<<<<');
    const self: any = this;
    const { name, query, params, meta } = newRoute;
    self.addTag({
      route: { name, query, params, meta },
      type: 'push'
    });
    self.setTagNavList(Util.getNewTagList(self.tagList, newRoute));
  }
}

export default Console;
</script>

