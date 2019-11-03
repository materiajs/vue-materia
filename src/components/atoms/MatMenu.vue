<template>
  <div
    class="mat-menu-wrapper"
    :class="{ root }"
    :style="{ top: `${top}px`, left: `${left}px` }"
  >
    <div
      class="mat-menu-trigger"
      @click="$emit('input', true)"
    >
      <slot name="trigger">
        Menu
      </slot>
    </div>
    <transition name="fade">
      <div
        v-if="(isMobile || root) && value"
        @click.stop="onClickOutside"
        class="overlay"></div>
    </transition>
    <transition
      v-on="transitions.down"
    >
      <div
        v-if="value"
        :class="[position, size]"
        class="mat-menu"
        ref="menu-main"
      >
        <div
          v-on-clickaway="onClickOutside"
          class="mat-menu-body mat-scrollbar-hidden mat-card-light mat-box-shadow-heavy"
          :style="this.initTheme(this.$props)"
        >
          <div class="header">
            <slot name="header" />
          </div>
          <slot>
            Menu body
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/tsx">
import { mixin as clickaway } from 'vue-clickaway';
import t from 'vue-types';
import { Component, Prop } from 'vue-property-decorator';
import sizeable from '../../mixins/sizeable';
import mediaQuery from '../../mixins/media-query';
import transitions from '@/utils/transitions';
import MatThemeComponent from './MatThemeComponent.vue';

@Component({
  mixins: [
    clickaway,
    sizeable,
    mediaQuery,
  ],
  props: {
    position: t.oneOf(['bottom-left', 'bottom-right']).def('bottom-left'),
    value: t.bool.def(false),
    root: t.bool.def(false),
  },
})
// @name MatMenu
// @displayName Menu
// @tag mat-menu
// @group Menus
// Menu component
export default class MatMenu extends MatThemeComponent {
  @Prop({ default: 'default', type: String })
  color;

  top = 0;

  left = 0;

  transitions = transitions;

  originalParent = null;

  get bottomLeft() {
    return this.position === 'bottom-left';
  }

  get getTransitionName() {
    if (this.isMobile) {
      return 'slide-up-down';
    }
    return this.bottomLeft ? 'explode-left' : 'explode';
  }

  mounted() {
    if (this.root && this.$el && this.$el.parentNode) {
      this.originalParent = this.$el.parentNode;
      this.originalParent.addEventListener('click', this.onClickParent, false);
      this.originalParent.removeChild(this.$el);
      document.getElementById('app').appendChild(this.$el);
    }
  }

  onClickOutside() {
    this.$emit('input', false);
  }

  onClickParent(e) {
    this.top = e.pageY + 15;
    if (this.bottomLeft) {
      this.left = Math.max(0, e.pageX - this.$refs['menu-main'].clientWidth + 15);
    } else {
      this.left = Math.max(0, e.pageX + this.$refs['menu-main'].clientWidth - 15);
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  .mat-menu-wrapper {
    &.root {
      position: fixed;
      z-index: 30;
    }
    .overlay {
      position: fixed;
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,0.3);
      top: 0;
      z-index: 15;
      left: 0;
    }
    .mat-menu-trigger {
      cursor: pointer;
    }
    .mat-menu {
      min-width: 280px;
      position: absolute;
      z-index: 100;
      .header {
        position: sticky;
        top: 0;
        z-index: 5;
      }
      &-body {
        border-radius: 5px;
        max-height: 50vh;
      }

      &.bottom-right {
        right: 0;
        &:before {
          right: 7px;
          left: unset;
        }
        &:after {
          right: 8px;
          left: unset;
        }
      }
      &.large {
        min-width: 480px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .mat-menu {
      width: 100%;
      position: fixed;
      top: 50%;
      left: 0;
      margin-top: 0px;
      height: 50%;
      &-body {
        height: 100%;
        border-radius: 0;
      }
    }
  }
</style>
