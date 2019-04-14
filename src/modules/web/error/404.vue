<template>
  <div class="error-wrapper">
    <img class="img-autosize" width="100%" :src="errorNotFound">
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class ErrorNotFound extends Vue {
  protected errorNotFound: any = require('@/assets/error/404.jpg');
}
</script>


<style lang="scss" scoped>
.error-wrapper {
  height: 500px;
  width: 600px; 
  margin: 0 auto;
  position: relative;
  top: 200px;
}
</style>
