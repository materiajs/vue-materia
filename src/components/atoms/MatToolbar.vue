<script>
import { Component } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  functional: true,
  props: {
    color: String,
    gradient: String,
    gradientColor: String,
    noPadding: Boolean,
    round: String,
    // eslint-disable-next-line no-bitwise
    shadow: Boolean | String,
    size: String,
  },
})
export default class Toolbar extends MatThemeComponent {
  // eslint-disable-next-line class-methods-use-this
  render(createElement, { props, listeners, slots }) {
    return createElement(
      'div',
      {
        class: [
          'mat-toolbar',
          props.shadow ? 'mat-box-shadow-heavy' : '',
          props.size, props.noPadding ? '' : 'with-padding',
        ],
        style: props.initTheme(props),
      },
      slots().default,
    );
  }
}
</script>

<style scoped lang="scss">
  $box-shadow-heavy:
    0px 2px 4px -1px rgba(0,0,0,0.2),
  0px 4px 5px 0px rgba(0,0,0,0.14),
  0px 1px 10px 0px rgba(0,0,0,0.12);
  .mat-toolbar {
  align-items: center;
  background: var(--color);
  border-radius: var(--round);
  color: var(--text-color);
  display: flex;
  height: 60px;
  position: relative;

  &.xs {
    height: 40px;
    font-size: 15px;
  }
  &.small {
    height: 45px;
  }
  &.large {
    height: 75px;
  }
  &.mat-box-shadow-heavy {
    z-index: 3;
    box-shadow: $box-shadow-heavy;
  }
    &.with-padding {
      padding: 0 15px;
    }
  /*>* {*/
  /*  height: 100%;*/
  /*}*/
}
</style>
