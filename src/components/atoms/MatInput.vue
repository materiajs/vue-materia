<template functional>
  <div
    class="mat-input"
    :class="{ focused: props.value !== '', [props.size]: props.size }"
    :style="{
      ...props.initTheme(props),
    }"
  >
    <slot />
    <input
      v-if="type !== 'textarea'"
      :class="{ focused: props.value !== '' }"
      ref="mat-input"
      :value="props.value"
      :type="type"
      @input="({ target: { value } }) => listeners.input(value)"
    >
    <div
      tabindex="-1"
      class="mat-input-placeholder"
    >
      <div class="mat-frame-placeholder-bg"></div>
      <slot name="placeholder">
        {{ props.placeholder }}
      </slot>
    </div>
    <slot name="input-right" />
  </div>
</template>

<script>
import { Component } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  functional: true,
  props: {
    color: {
      type: String,
    },
    round: {
      type: Number,
      default: 5,
    },
    disabled: Boolean,
    focusBorderColor: {
      type: String,
      default: 'white',
    },
    placeholder: {
      type: String,
      default: 'Enter text',
    },
    type: String,
    value: {
      type: String,
      default: '',
    },
    size: String,
  },
})
export default class MatInput extends MatThemeComponent {
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-input {
    border-radius: var(--round);
    border: 1px solid var(--text-color, #212121);
    color: var(--text-color);
    cursor: text;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    min-width: 250px;
    min-height: 45px;
    input {
      flex: 1;
      background: rgba(0,0,0,0);
      color: inherit;
      padding: 20px 15px 10px;
      font-size: 0.8em;
    }
    &-placeholder {
      color: var(--text-color);
      margin: 0 -3px;
      padding: 0 3px;
      position: absolute;
      top: 50%;
      font-size: 14px;
      left: 15px;
      transform: translateY(-50%);
      transition: top $standard-transition-t-e, font-size $standard-transition-t-e;
      user-select: none;
      outline: none;
    }
    &:focus-within, &.focused {
      .mat-input-placeholder {
        .mat-frame-placeholder-bg {
          content: '';
          position: absolute;
          width: 100%;
          height: 50%;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        top: 10px;
        font-size: 0.7em;
      }
    }
  }
</style>
