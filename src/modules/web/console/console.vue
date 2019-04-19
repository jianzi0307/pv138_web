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
            <pv138-console-sider :menus="siderMenus"></pv138-console-sider>
            <Content :style="{padding: '24px'}">
              <router-view></router-view>
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
import { mapActions } from 'vuex';
import Util from '@/utils/util';
import { ConsoleHeader, ConsoleSider } from '@/components';

@Component({
  components: {
    [ConsoleHeader.name]: ConsoleHeader,
    [ConsoleSider.name]: ConsoleSider
  },
  methods: {
    ...mapActions(['logout'])
  }
})
class Dashboard extends Vue {
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
  // 侧边栏菜单
  protected siderMenus: any[] = [
    {
      id: '1',
      icon: 'ios-chatbubbles',
      label: '公众号列表',
      route: 'console.officials'
    },
    {
      id: '2',
      icon: 'md-people',
      label: '粉丝管理',
      children: [
        {
          id: '2-1',
          label: '全部粉丝',
          route: 'console.users'
        }
      ]
    },
    {
      id: '3',
      icon: 'ios-paper-plane',
      label: '消息群发',
      children: [
        {
          id: '3-1',
          label: '高级群发',
          route: 'console.users'
        },
        {
          id: '3-2',
          label: '客服群发',
          route: 'console.users'
        },
        {
          id: '3-3',
          label: '模板群发',
          route: 'console.users'
        }
      ]
    },
    {
      id: '4',
      icon: 'md-stats',
      label: '查看报表',
      children: [
        {
          id: '4-1',
          label: '高级群发',
          route: 'console.users'
        },
        {
          id: '4-2',
          label: '客服群发',
          route: 'console.users'
        },
        {
          id: '4-3',
          label: '模板群发',
          route: 'console.users'
        }
      ]
    },
    {
      id: '5',
      icon: 'md-hammer',
      label: '权限设置',
      children: [
        {
          id: '5-1',
          label: '子账号',
          route: 'console.users'
        },
        {
          id: '5-2',
          label: '角色管理',
          route: 'console.users'
        }
      ]
    }
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
        self.$Message.success('成功退出');
        self.$router.push({ name: 'auth.login' });
        break;
    }
  }
}

export default Dashboard;
</script>

