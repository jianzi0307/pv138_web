<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
    <Icon :type="icon" :size="size"/>
  </a>
</template>
<script>
export default {
  name: "sider-trigger",
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: "navicon-round"
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange() {
      console.log(this.collapsed, "SDF");
      this.$emit("onChangeEvent", !this.collapsed);
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin trans {
  transition: transform 0.2s ease;
}
$size: 40px;
.sider-trigger-a {
  padding: 6px;
  width: $size;
  height: $size;
  display: inline-block;
  text-align: center;
  color: #5c6b77;
  margin-top: 12px;
  i {
    @include trans;
    vertical-align: top;
  }
  &.collapsed i {
    transform: rotateZ(90deg);
    @include trans;
  }
}
</style>