<template>
  <Sider class="sider" hide-trigger>
    <!-- 加 accordion 开启手风琴模式 -->
    <Menu :active-name="currentMenu" :open-names="['console.user']" theme="light" width="auto" @on-select="onMenuSelectedHandler">
      <tree-item v-for="model in menus" :key="model.label" :model="model"></tree-item>
    </Menu>
  </Sider>
</template>
<script>
import { create } from "@/utils/comp-creater";
import TreeItem from "@/components/tree-item/index.vue";
import store from "@/store";

export default create({
  name: "console-sider",
  props: ["menus"],
  components: {
    TreeItem
  },
  computed: {
    currentMenu() {
      return store.getters.getCurrentMenu;
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

