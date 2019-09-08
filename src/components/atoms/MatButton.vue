<template functional>
  <button
    v-mat-ripple
    v-on="listeners"
    :class="[`space-${props.space}`, props.outline ? 'outline' : '']"
    class="mat-button"
    v-mat-roundable="props.round"
    v-mat-set-color="props.color"
    v-mat-background:[props.gradient]="[props.color, props.gradientColor]"
  >
    <slot />
  </button>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    color: String,
    gradient: String,
    gradientColor: String,
    round: String,
    outline: Boolean,
    shadow: Boolean,
    size: String,
    space: String,
  },
})
export default class MatButton extends Vue {
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-button {
    align-items: center;
    background: none;
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
    &:hover {
      box-shadow: $box-shadow-light;
    }
    &.outline {
      background: none !important;
      color: var(--color) !important;
      border: 1px solid var(--color) !important;
      box-shadow: none;
    }
  }
</style>
