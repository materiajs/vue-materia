<template>
  <div class="mat-expansion">
    <slot />
  </div>
</template>

<script type="text/tsx">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import Velocity from 'velocity-animate';

@Component()
export default class MatExpansion extends Vue {
  @Prop({ type: Boolean })
  value;

  collapseSection(element) {
    const sectionWidth = element.scrollWidth;
    Velocity(element, {
      width: 0,
      'min-width': 0,
    }, {
      duration: 400,
      easing: [700, 50],
    });
  }

  expandSection(element) {
    const sectionWidth = element.scrollWidth;
    element.style.width = '0';
    Velocity(element, {
      width: `${sectionWidth}px`,
      'min-width': `${sectionWidth}px`,
    }, {
      duration: 340,
      easing: [700, 50],
    });
  }

  @Watch('value', {
    immediate: true,
  })
  onValue(value) {
    if (value) {
      this.$nextTick(() => this.expandSection(this.$el));
    } else {
      this.$nextTick(() => this.collapseSection(this.$el));
    }
  }
}
</script>

<style scoped>
  .mat-expansion {
    transition:height 0.3s ease-out;
    width: 0;
    overflow: hidden;
  }
</style>
