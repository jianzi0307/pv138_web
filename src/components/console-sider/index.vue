<template>
  <!-- class="sider" -->
  <Sider width="170" hide-trigger collapsible v-model="isCollapsed" collapsed-width="64">
    <!-- 加 accordion 开启手风琴模式 -->
    <Menu
      accordion
      :class="menuitemClasses"
      :active-name="currentMenu"
      :open-names="parentRoutes"
      theme="light"
      width="auto"
      @on-select="onMenuSelectedHandler"
    >
      <tree-item v-for="model in menus" :key="model.label" :model="model" :collaped="isCollapsed"></tree-item>
    </Menu>
  </Sider>
</template>
<script>
import { create } from "@/utils/comp-creater";
import TreeItem from "@/components/tree-item/index.vue";
import store from "@/store";

export default create({
  name: "console-sider",
  props: ["menus", "collapsed"],
  components: {
    TreeItem
  },
  computed: {
    currentMenu() {
      return store.getters.getCurrentMenu;
    },
    // 父路由列表
    parentRoutes() {
      const routes = [];
      for (let route of this.$route.matched) {
        if (route.name !== store.getters.getCurrentMenu) {
          routes.push(route.name);
        }
      }
      return routes;
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  watch: {
    collapsed(curr, old) {
      if (curr === old) {
        return;
      }
      this.isCollapsed = curr;
    }
  },
  data: function() {
    return {
      isCollapsed: false
      // siderMenus: []
    };
  },
  // watch: {
  //   menus(curr, old) {
  //     console.log("alskjflsajflj==>", curr);
  //     this.siderMenus = curr;
  //   }
  // },
  methods: {
    onMenuSelectedHandler(name) {
      this.$emit("onMenuSelectedEvent", name);
    }
  },
  mounted() {
    this.isCollapsed = this.collapsed;
  }
});
</script>

<style lang="scss" scoped>
.console-sider-wrapper {
  background-color: white;
}
/deep/ .ivu-menu,
/deep/ .ivu-layout-sider {
  position: static;
}
/deep/ li {
  white-space: nowrap;
}
/deep/ span {
  display: inline-block;
  overflow: hidden;
  width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
/deep/ i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu {
  /deep/ .ivu-menu-submenu-title-icon {
    display: none;
  }
  /deep/ span {
    width: 0px;
    transition: width 0.2s ease;
  }
  /deep/ i {
    transform: translateX(-2px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
}
</style>

