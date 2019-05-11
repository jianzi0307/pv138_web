<template>
  <Poptip v-if="hasChildren" trigger="hover" placement="right-start" :title="model.label">
    <DropdownItem>
      {{model.label}}
      <Icon type="ios-arrow-forward"></Icon>
    </DropdownItem>
    <DropdownMenu slot="content">
      <tree-dropdown-item v-for="child in model.children" :key="child.id" :model="child"></tree-dropdown-item>
    </DropdownMenu>
  </Poptip>
  <DropdownItem v-else>{{model.label}}</DropdownItem>
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
</style>