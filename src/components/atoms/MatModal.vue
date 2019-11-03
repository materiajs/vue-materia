<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  functional: true,
  props: {
    size: String,
    value: Boolean,
  },
})
export default class MatModal extends MatThemeComponent {
  // eslint-disable-next-line
  render(createElement, { props, listeners, slots }) {
    const body = createElement(
      'div',
      {
        class: [
          'mat-modal-content',
          'mat-box-shadow-heavy',
          props.size,
        ],
      },
      slots().default,
    );
    const inner = createElement(
      'div',
      {
        class: ['mat-modal-background'],
        on: {
          click: (event) => {
            if (event.target !== event.currentTarget) return;
            if (listeners.input) listeners.input(false);
          },
        },
        directives: [{
          name: 'show',
          value: props.value,
        }],
      },
      [body],
    );
    const background = createElement(
      'transition',
      {
        props: {
          name: 'fade',
          appear: true,
        },
      },
      [inner],
    );
    return createElement(
      'div',
      {
        class: [
          'mat-modal',
          props.value ? 'open' : '',
        ],
        style: props.initTheme(props),
      },
      [background],
    );
  }
}
</script>

<style scoped lang="scss">
  .mat-modal {
    position: fixed;
    height: 0;
    width: 100%;
    left: 0;
    bottom: 0;
    top: 0;
    z-index: 15;
    overflow: scroll;
    -ms-overflow-style: none;  // IE 10+
    scrollbar-width: none;  // Firefox
    &::-webkit-scrollbar {
      display: none;  // Safari and Chrome
    }

    &.open {
      height: 100%;
    }

    &-background {
      position: fixed;
      top: 0;
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,0.3);
      left: 0;
    }

    &-content {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 360px;
      top: 50%;
      max-height: 95vh;
      z-index: 20;
    }
  }

  .rise-enter-active, .rise-leave-active {
    transition: all .5s cubic-bezier(.5,.33,.37,1.11);
  }
  .rise-enter,
  .rise-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translate(0, 100vh);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter,
  .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @media screen and (max-width: 768px) {
    .mat-modal-content {
      min-width: 90vw;
      margin-bottom: 0;
      max-height: 100vh;
    }

    .large {
      top: 0;
      bottom: 0;
      transform: translate(0, 0);
      left: 0;
      max-width: 100vw;
      width: 100vw;
    }
  }
</style>
