<template>
  <div class="mat-swipe mat-scrollbar-hidden">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  props: {
    gradient: String,
    value: Number,
  },
})
export default class MatSwipe extends MatThemeComponent {
  @Watch('value', { immediate: true })
  onValue(value) {
    this.$nextTick(() => {
      if (this.$slots.default) {
        this.$slots.default[value].elm.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    });
    // [value].fnContext.$el.scrollIntoView();
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-swipe {
    scroll-snap-points-y: repeat(300px);
    font-family: sans-serif;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    white-space: nowrap;
    display: flex;
  }
</style>
