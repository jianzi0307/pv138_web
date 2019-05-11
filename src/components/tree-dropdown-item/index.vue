<template>
  <Poptip v-if="hasChildren" trigger="hover" placement="right-start" :title="model.label">
    <Cell :title="model.label" class="cell">
      <Icon type="ios-arrow-forward" slot="extra"></Icon>
    </Cell>
    <div slot="content">
      <tree-dropdown-item v-for="child in model.children" :key="child.id" :model="child"></tree-dropdown-item>
    </div>
  </Poptip>
  <Cell :title="model.label" :name="model.route" v-else></Cell>
</template>
<script>
// 菜单递归组件
export default {
  name: "tree-dropdown-item",
  props: ["model"],
  components: {},
  computed: {
    hasChildren: function() {
      return this.model.children && this.model.children.length;
    }
  },
  watch: {
    model(curr, old) {
      // this.model = curr;
    }
  }
};
</script>
<style lang="scss" scoped>
.cell {
  padding-right: 30px;
}
</style>