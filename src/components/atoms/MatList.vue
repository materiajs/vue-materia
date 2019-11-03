<template functional>
  <div
    class="mat-list"
    :class="{ bordered: props.bordered }"
    :style="props.initTheme(props)"
  >
    <slot />
  </div>
</template>

<script type="text/tsx">
import { Component, Prop } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  props: {
    bordered: {
      type: Boolean,
      default: false,
    },
  },
})
// @name MatList
// @displayName List
// @tag mat-list
// List
export default class MatList extends MatThemeComponent {}
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  .mat-list {
    &.bordered {
      border: 1px solid $primary-color-light;
    }
  }
</style>
