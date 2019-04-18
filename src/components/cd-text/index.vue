<template>
  <span>{{title}}</span>
</template>

<script>
import { create } from "@/utils/comp-creater";

export default create({
  name: "cd-text",
  props: ["cd", "label"],
  data: function() {
    return {
      title: this.label || `${this.cd}秒`,
      cooldown: this.cd || 60
    };
  },
  // 创建针对props属性的watch来同步组件外对props的修改
  watch: {
  },
  methods: {
    interval() {
      let self = this;
      let t = self.cooldown;
      self.title = t + "秒";
      let i = setInterval(function() {
        if (t > 1) {
          self.title = --t + "秒";
        } else {
          window.clearInterval(i);
          self.$emit("cdTextCooldownFinish");
        }
      }, 1000);
    }
  },
  mounted() {
    this.interval();
  }
});
</script>
