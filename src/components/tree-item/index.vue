<template>
  <Submenu :name="model.route" v-if="hasChildren">
    <template slot="title" v-if="collaped">
      <Poptip trigger="hover" placement="right-start" :title="model.label" transfer>
        <Icon :type="model.icon"/>
        <DropdownMenu slot="content">
          <tree-dropdown-item v-for="child in model.children" :key="child.id" :model="child"></tree-dropdown-item>
        </DropdownMenu>
      </Poptip>
    </template>

    <template slot="title" v-if="!collaped">
      <Icon :type="model.icon"/>
      <span>{{model.label}}</span>
    </template>
    <template v-if="!collaped">
      <tree-item v-for="child in model.children" :key="child.id" :model="child"></tree-item>
    </template>
  </Submenu>

  <MenuItem v-else :name="model.route">
    <template v-if="collaped">
      <Tooltip placement="right-start" :content="model.label" theme="light" transfer>
        <Icon v-if="model.icon" :type="model.icon"/>
      </Tooltip>
    </template>
    <template v-if="!collaped">
      <Icon v-if="model.icon" :type="model.icon"/>
      <span>{{model.label}}</span>
    </template>
  </MenuItem>
</template>

<script>
import TreeDropdownItem from "@/components/tree-dropdown-item/index.vue";

// 菜单递归组件
export default {
  name: "tree-item",
  props: ["model", "collaped"],
  components: {
    TreeDropdownItem
  },
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
  }
};
</script>
<style lang="scss" scoped>
</style>
