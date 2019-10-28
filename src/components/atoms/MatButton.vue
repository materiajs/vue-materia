<template functional>
  <button
    class="mat-button"
    :class="[`space-${props.space}`, props.outline ? 'outline' : '', props.shadow ? 'shadow' : '']"
    :style="props.initTheme(props)"
    v-on="listeners"
    v-mat-ripple
  >
    <slot />
  </button>
</template>

<script type="text/tsx">
import { Component, Prop } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({})
// @name MatButton
// @displayName Button
// @tag mat-button
// @group Buttons
// Button component
export default class MatButton extends MatThemeComponent {
  @Prop({ default: 'primary', type: String })
  color;

  @Prop({ type: String })
  gradient;

  @Prop({ type: String })
  gradientColor;

  @Prop({ type: Boolean })
  shadow;

  // ['xs', 'small']
  @Prop({ type: String })
  size;

  @Prop({ type: Boolean })
  outline;

  @Prop({ type: String })
  space;
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-button {
    align-items: center;
    background: var(--color);
    color: var(--text-color);
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: inline-flex;
    font-size: 14px;
    outline: none;
    padding: 10px 20px;
    transform: scale(1);
    transition: all 0.15s cubic-bezier(.41,.15,.55,1.19);
    white-space: nowrap;
    z-index: 3;
    user-select: none;
    &.space {
      &-right {
        margin-right: 10px;
      }
      &-left {
        margin-left: 10px;
      }
    }
    >* {
      min-width: 15px;
    }
    &.shadow {
      &:hover {
        box-shadow: $box-shadow-light;
      }
    }
    &.outline {
      background: none !important;
      color: var(--color) !important;
      border: 1px solid var(--color) !important;
      box-shadow: none;
    }
  }
</style>
