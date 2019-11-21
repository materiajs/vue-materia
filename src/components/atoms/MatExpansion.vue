<template>
  <div
    class="mat-expansion"
    :class="[direction]"
  >
    <slot />
  </div>
</template>

<script type="text/tsx">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import Velocity from 'velocity-animate';

@Component({})
// @name MatExpansion
// @displayName Expansion
// @tag mat-expansion
// Expansion component
export default class MatExpansion extends Vue {
  @Prop({ type: Boolean })
  value;

  @Prop({
    // left
    // right
    // up
    // down
    type: String,
    default: 'right',
  })
  direction;

  collapseSection(element) {
    Velocity(element, {
      width: 0,
      'min-width': 0,
    }, {
      duration: 400,
      easing: [700, 50],
    });
  }

  expandSection(element) {
    const sectionWidth = element.firstChild.clientWidth;
    element.style.width = '0';
    Velocity(element, {
      width: sectionWidth,
      'min-width': sectionWidth,
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

<style scoped lang="scss">
  .mat-expansion {
    transition:height 0.3s ease-out;
    width: 0;
    overflow: hidden;
    position: relative;
    display: flex;
    &.right {
      justify-content: flex-end;
    }
    >* {
      flex-shrink: 0;
    }
  }
</style>
