<template functional>
  <div
    class="mat-floating-button-group"
    :style="{ right: props.right, bottom: props.bottom }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { Component } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  functional: true,
  props: {
    bottom: {
      type: String,
      default: '30px',
    },
    right: {
      type: String,
      default: '30px',
    },
  },
})
export default class MatFloatingButtonGroup extends MatThemeComponent {
  get floatingButtonGroupStyle() {
    const { right, bottom } = this;
    return {
      right,
      bottom,
    };
  }
}
</script>

<style scoped lang="scss">
  .mat-floating-button-group {
    bottom: 15px;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 15px;
    /deep/ .mat-button {
      margin-bottom: 5px;
      border-radius: 50%;
    }
  }
</style>
