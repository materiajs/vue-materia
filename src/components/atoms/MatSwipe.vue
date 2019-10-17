<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  functional: true,
  props: {
    gradient: String,
  },
})
export default class MatSwipe extends MatThemeComponent {
  render(createElement, { props, listeners, slots }) {
    return createElement(
      'div',
      {
        class: [
          'mat-swipe mat-scrollbar-hidden',
        ],
      },
      slots().default,
    );
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-swipe {
    background: green;
    scroll-snap-points-y: repeat(300px);
    font-family: sans-serif;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
</style>
