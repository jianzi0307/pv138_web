<template>
  <div>
    <Submenu :name="model.id" v-if="hasChildren">
      <template slot="title">
        <Icon :type="model.icon"/>
        {{model.label}}
      </template>
      <TreeItem v-for="child in model.children" :key="child.id" :model="child"></TreeItem>
    </Submenu>
    <MenuItem v-else :name="model.route">
      <Icon v-if="model.icon" :type="model.icon"/>
      {{model.label}}
    </MenuItem>
  </div>
</template>

<script>
// 菜单递归组件
export default {
  name: "TreeItem",
  props: ["model"],
  components: {},
  computed: {
    hasChildren: function() {
      return this.model.children && this.model.children.length;
    }
  },
  data: function() {
    return {
      open: true
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
