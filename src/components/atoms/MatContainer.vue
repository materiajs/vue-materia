<template functional>
  <div
    class="mat-container"
    :style="{
      ...props.initTheme(props),
      ...props.containerTheme(props),
    }"
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
  @Prop({
    type: Function,
    default: props => ({
      display: props.display,
      flex: props.flex,
      height: props.height,
      width: props.width,
      'max-width': props.maxWidth,
      'min-width': props.minWidth,
    }),
  })
  containerTheme;

  @Prop({
    // 5px
    // 15px
    // 20px
    type: String,
  })
  padding;

  @Prop({ type: String })
  margin;

  @Prop({ type: String })
  flex;

  @Prop({ type: String })
  display;

  @Prop({ type: String })
  maxWidth;

  @Prop({ type: String })
  minWidth;

  @Prop({ type: String })
  cursor;
}
</script>

<style scoped>

</style>
