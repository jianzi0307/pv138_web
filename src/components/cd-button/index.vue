<template>
  <Button
    type="primary"
    @click="loadingProcess"
    :disabled="actived"
    :loading="btnStatus === 'loading'"
  >{{title}}</Button>
</template>

<script>
import { create } from "@/utils/comp-creater";

export default create({
  name: "cd-button",
  props: ["label", "payload", "status", 'cd'],
  data: function() {
    return {
      title: this.label,
      btnPayload: "",
      cooldown: this.cd || 60,
      actived: false,
      btnStatus: "idle"
    };
  },
  // 创建针对props属性的watch来同步组件外对props的修改
  watch: {
    payload(val) {
      this.btnPayload = val;
    },
    status(currVal, old) {
      if (currVal === old) {
        return;
      }
      this.btnStatus = currVal;
      if (this.btnStatus === "idle") {
        this.title = this.label;
        this.actived = false;
      }
      if (this.btnStatus === "cooldown") {
        this.interval();
        this.actived = true;
      }
    }
  },
  methods: {
    loadingProcess() {
      let self = this;
      self.$emit("cdButtonLoadingProcess");
    },
    interval() {
      let self = this;
      let t = self.cooldown;
      self.title = t + "秒";
      self.actived = true;
      let i = setInterval(function() {
        if (t > 1) {
          self.title = --t + "秒";
          self.actived = true;
        } else {
          window.clearInterval(i);
          self.$emit("cdButtonCooldownFinish");
          self.actived = false;
        }
      }, 1000);
    }
  },
  mounted() {
    const self = this;
    self.btnStatus = self.status;
    self.btnPayload = self.payload;
  }
});
</script>
