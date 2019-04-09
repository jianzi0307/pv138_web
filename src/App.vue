<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Util from '@/utils/util';

@Component({ components: {} })
export default class App extends Vue {
  public mounted() {
    const doc = window.document.documentElement;
    const dataDpr: number = Number(doc.getAttribute('data-dpr'));
    if (dataDpr !== Util.getDeviceRatio()) {
      doc.setAttribute('data-dpr', dataDpr.toString());
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("style/index.scss");
</style>
