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
      type: Number | String,
      default: 1,
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
  },
})
export default class MatInput extends MatThemeComponent {
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-input {
    @mixin variables($min-height, $font-size) {
      min-height: $min-height;
      font-size: $font-size;
    }

    @include variables(45px, 1rem);
    &.lg {
      @include variables(60px, 1.1rem);
    }
    &.xl {
      @include variables(75px, 1.2rem);
    }
    border-radius: var(--round);
    border: 1px solid var(--text-color, #212121);
    color: var(--text-color);
    cursor: text;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    min-width: 250px;
    input {
      flex: 1;
      background: rgba(0,0,0,0);
      color: inherit;
      padding: 20px 20px 10px;
    }
    &-placeholder {
      color: var(--text-color);
      margin: 0 -3px;
      padding: 0 3px;
      position: absolute;
      top: 50%;
      left: 20px;
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
        top: 25%;
        font-size: 0.7em;
      }
    }
  }
</style>
