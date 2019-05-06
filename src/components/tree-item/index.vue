<template>
  <div>
    <Submenu :name="model.route" v-if="hasChildren && !collaped">
      <template slot="title">
        <Icon :type="model.icon"/>
        <span>{{model.label}}</span>
      </template>
      <tree-item v-for="child in model.children" :key="child.id" :model="child"></tree-item>
    </Submenu>
    <MenuItem v-else :name="model.route">
      <Icon v-if="model.icon" :type="model.icon"/>
      <span>{{model.label}}</span>
    </MenuItem>
  </div>
</template>

<script>
// 菜单递归组件
export default {
  name: "tree-item",
  props: ["model", "collaped"],
  components: {},
  computed: {
    hasChildren: function() {
      return this.model.children && this.model.children.length;
    }
  },
  data: function() {
    return {
      // model: {},
      open: true
    };
  },
  watch: {
    model(curr, old) {
      // this.model = curr;
    }
  },
  mounted() {
    // this.model = this.model;
  }
};
</script>
<style lang="scss" scoped>
</style>
