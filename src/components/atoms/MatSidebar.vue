<template>
  <div
    class="mat-sidebar mat-scrollbar-hidden"
    :class="{ 'is-mobile': isMobile, open: value }"
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
          <slot :overlay="isOverlay" />
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="isOverlay && value"
        @click="close"
        class="close-box">
      </div>
    </transition>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Velocity from 'velocity-animate';

@Component({})
export default class MatSidebar extends Vue {
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
      duration: 400,
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
      duration: 400,
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
    .close-box {
      position: fixed;
      width: 100%;
      background: rgba(0,0,0,0.3);
      top: 0;
      bottom: 0;
      z-index: -1;
    }
    min-height: 100%;
    box-sizing: border-box;
    &-inner {
      &-block {
        width: 300px;
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
