<template>
  <div
    class="mat-sidebar mat-scrollbar-hidden"
    :class="{ 'is-mobile': isMobile, open: value }"
  >
    <template v-if="!isMobile">
      <div
        :style="this.initTheme(this.$props)"
      >
        <transition
          @beforeEnter="beforeEnter"
          @afterEnter="afterEnter"
          @beforeLeave="beforeLeave"
          @enter="enter"
          @leave="leave"
          @afterLeave="afterLeave"
        >
          <div
            v-if="value"
            class="mat-sidebar-inner"
          >
            <div class="mat-sidebar-inner-block">
              <slot />
            </div>
          </div>
        </transition>
      </div>
      <slot name="content" />
    </template>
    <drawer-layout v-else>
      <div class="drawer" slot="drawer">
        <div
          class="mat-sidebar-inner"
        >
          <div class="mat-sidebar-inner-block">
            <slot />
          </div>
        </div>
      </div>
      <div class="content" slot="content">
        <slot name="content"></slot>
      </div>
    </drawer-layout>
  </div>
</template>


<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import Velocity from 'velocity-animate';
import { DrawerLayout } from 'vue-drawer-layout';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  components: {
    DrawerLayout,
  },
})
export default class MatSidebar extends MatThemeComponent {
  @Prop({
    type: String,
    default: 'default',
  })
  color;

  @Prop({
    type: Boolean,
    default: false,
  })
  overlay;

  @Prop({
    type: Boolean,
    default: true,
  })
  value;

  mobileStyles = {
    beforeEnter: {
      width: '100%',
    },
    enter: {
      translateX: [0, '-100%'],
    },
    beforeLeave: {
      translateX: [0, '-100%'],
    },
    leave: {
      translateX: ['-100%', 0],
    },
  };

  regularStyles = {
    beforeEnter: {
      width: '0',
    },
    enter: {
      translateX: [0, '-300px'],
      width: '300px',
    },
    beforeLeave: {
      width: '300px',
      translateX: [0, '-300px'],
    },
    leave: {
      width: '0px',
      translateX: ['-300px', 0],
    },
  };

  get isMobile() {
    // @ts-ignore
    return ['xs', 'sm', 'md'].includes(this.$mq);
  }

  get styles() {
    return this.isMobile ? this.regularStyles : this.regularStyles;
  }

  get isOverlay() {
    return (this.overlay || this.isMobile);
  }

  beforeEnter(el) {
    const styles = this.styles.beforeEnter;
    Object.keys(styles)
      .forEach((attr) => {
        el.style[attr] = styles[attr]; // eslint-disable-line
      });
  }

  enter(el, done) {
    Velocity(el, this.styles.enter, {
      complete: done,
      duration: 200,
      easing: 'easeInOutQuart',
    });
  }

  afterEnter(el) {
    el.style.cssText = ''; // eslint-disable-line
  }

  beforeLeave(el) {
    const styles = this.styles.beforeLeave;
    Object.keys(styles)
      .forEach((attr) => {
        el.style[attr] = styles[attr]; // eslint-disable-line
      });
  }

  leave(el, done) {
    Velocity(el, this.styles.leave, {
      complete: done,
      duration: 200,
      easing: 'easeInOutQuart',
    });
  }

  afterLeave() {}

  close() {
    this.$emit('input', !this.value);
  }
}
</script>

<style scoped lang="scss">
  .mat-sidebar {
    width: 100% !important;
    min-height: 100%;
    box-sizing: border-box;
    display: flex;
    &-inner {
      position: relative;
      width: 300px;
      .drag-button {
        position: absolute;
        left: 100%;
        color: black;
        padding: 15px;
        background: grey;
        touch-action: none;
        user-select: none;
      }
    }
    .actions {
      position: absolute;
      transform: translateY(-100%);
      width: 100%;
      background: rgb(38, 50, 56);
      color: white;
    }
  }
</style>
