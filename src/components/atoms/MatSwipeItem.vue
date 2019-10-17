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
          'mat-swipe-item',
        ],
      },
      slots().default,
    );
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-swipe-item {
    scroll-snap-align: start;
    display: inline-block;
    padding: 15px;
    min-width: calc(100% - 30px);
  }
</style>
