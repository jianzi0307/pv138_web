<template>
  <div>
    <i-button>HI</i-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Button from 'iview';
Vue.component('Button', Button);

@Component({
//   components: {
//   }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
</style>


