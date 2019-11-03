<template functional>
  <div
    class="mat-container"
    :style="props.initTheme(props)"
  >
    <slot />
  </div>
</template>

<script type="text/tsx">
import { Component, Prop } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({})
// @name MatContainer
// @displayName Container
// @tag mat-container
// Container component
export default class MatContainer extends MatThemeComponent {
  @Prop({ type: String })
  padding;

  @Prop({ default: 'auto', type: String })
  margin;

  @Prop({ default: 'block', type: String })
  display;

  @Prop({ type: String })
  maxWidth;

  @Prop({ default: 'initial', type: String })
  cursor;
}
</script>

<style scoped>

</style>
