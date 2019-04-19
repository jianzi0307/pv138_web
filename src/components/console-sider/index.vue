<template>
  <Sider class="sider" hide-trigger>
    <!-- 加 accordion 开启手风琴模式 -->
    <Menu active-name="0" theme="light" width="auto" >
      <MenuItem name="0">
        <Icon type="md-home"/>首页
      </MenuItem>
      <TreeItem v-for="model in siderMenus" :key="model.label" :model="model"></TreeItem>
    </Menu>
  </Sider>
</template>
<script>
import { create } from "@/utils/comp-creater";
import TreeItem from "@/components/tree-item/index.vue";
export default create({
  name: "console-sider",
  props: ["menus"],
  components: {
    TreeItem
  },
  data: function() {
    return {
      siderMenus: []
    };
  },
  methods: {
    createMenus(menus) {}
  },
  mounted() {
    this.siderMenus = this.menus;
    this.createMenus(this.siderMenus);
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

