<template>
  <div class="console-sider-wrapper">
    <slot></slot>
    <Sider class="sider" hide-trigger collapsible v-model="collapsed" collapsed-width="64">
      <!-- 加 accordion 开启手风琴模式 -->
      <Menu
        :active-name="currentMenu"
        :open-names="parentRoutes"
        theme="light"
        width="auto"
        @on-select="onMenuSelectedHandler"
      >
        <tree-item v-for="model in menus" :key="model.label" :model="model"></tree-item>
      </Menu>
    </Sider>
  </div>
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
    }
  },
  data: function() {
    return {
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
    // this.siderMenus = this.menus;
  }
});
</script>

<style lang="scss" scoped>
.sider {
  overflow: auto;
  background: #fff;

  width: 170px !important;
  min-width: 170px !important;
  max-width: 170px !important;
  /deep/ .ivu-layout-sider-children {
    .ivu-menu {
      position: inherit;
    }
  }
}
</style>

