<template functional>
  <div
    class="mat-container"
    :style="{
    padding: props.padding,
    cursor: props.cursor,
  }"
  >
    <slot />
  </div>
</template>

<script type="text/tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
// @name MatContainer
// @displayName Container
// @tag mat-container
// Container component
export default class MatContainer extends Vue {
  @Prop({ default: '15px', type: String })
  padding;

  @Prop({ default: 'initial', type: String })
  cursor;
}
</script>

<style scoped>

</style>
