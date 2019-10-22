<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  functional: true,
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    gradient: String,
    gradientColor: String,
    round: String,
    // eslint-disable-next-line no-bitwise
    outline: Boolean | String,
    // eslint-disable-next-line no-bitwise
    shadow: Boolean | String,
    size: String,
    space: String,
  },
})
export default class MatButton extends MatThemeComponent {
  // eslint-disable-next-line
  render(createElement, { props, listeners, slots }) {
    return createElement(
      'button',
      {
        class: [
          'mat-button',
          `space-${props.space}`, props.outline ? 'outline' : '', props.shadow ? 'shadow' : '',
        ],
        style: props.initTheme(props),
        on: {
          click: (e) => {
            listeners.click(e);
          },
        },
        directives: [
          {
            name: 'mat-ripple',
          },
        ],
      },
      slots().default,
    );
  }
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
