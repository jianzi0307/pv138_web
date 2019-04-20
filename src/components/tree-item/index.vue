<template>
  <div>
    <Submenu :name="itemModel.id" v-if="hasChildren">
      <template slot="title">
        <Icon :type="itemModel.icon"/>
        {{itemModel.label}}
      </template>
      <tree-item v-for="child in itemModel.children" :key="child.id" :model="child"></tree-item>
    </Submenu>
    <MenuItem v-else :name="itemModel.route">
      <Icon v-if="itemModel.icon" :type="itemModel.icon"/>
      {{itemModel.label}}
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
      itemModel: {},
      open: true
    };
  },
  watch: {
    model(curr, old) {
      this.itemModel = curr;
    }
  },
  mounted() {
    this.itemModel = this.model;
  }
};
</script>
<style lang="scss" scoped>
</style>
