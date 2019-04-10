<template>
  <div>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br>
    <br>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// import { Button } from "iview";
// import Table from "iview";
// Vue.component("Button", Button);
// Vue.component("Table", Table);

@Component
export default class Test extends Vue {}
</script>

<style lang="scss" scoped>
</style>


