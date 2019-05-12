<template>
  <div class="wrapper" v-if="tableData.length>0">高级群发</div>
  <div class="prompt" v-else>
    <pv138-authorize-prompt></pv138-authorize-prompt>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AuthorizePrompt } from '@/components';

@Component({
  components: {
    [AuthorizePrompt.name]: AuthorizePrompt
  }
})
class AdvancedMass extends Vue {
  protected tableData: any[] = [];
}

export default AdvancedMass;
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: white;
  padding: 20px;
  height: 100%;
}
.prompt {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
</style>

