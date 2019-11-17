<template>
  <div
    @click.stop="onClickCheckbox"
    class="mat-checkbox"
    :style="{
      ...initTheme($props),
    }"
  >
    <div
      :class="{ checked: value, [type]: true, margin }"
      class="mat-checkbox-box mat-flex-center">
      <i
        class="mat-absolute-center"
        :class="[getPrefix, getIcon]"
      />
    </div>
    <div class="mat-checkbox-label">
      <slot />
    </div>
  </div>
</template>

<script>
import { Prop, Component } from 'vue-property-decorator';
import MatThemeComponent from '@/components/atoms/MatThemeComponent.vue';

@Component({})
export default class MatCheckbox extends MatThemeComponent {
  @Prop({ type: String, default: 'default' })
  color;

  @Prop({ default: true, type: Boolean })
  margin;

  @Prop({ default: 'default', type: String })
  type;

  @Prop({ default: false, type: Boolean })
  value;

  get getIcon() {
    if (this.type === 'star') {
      return 'fa-star';
    }
    return 'fa-check';
  }

  get getPrefix() {
    if (this.type === 'star') {
      return this.value ? 'fas' : 'far';
    }
    return 'fas';
  }

  onClickCheckbox() {
    this.$emit('input', !this.value);
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";

  $frame-size: 20px;
  .mat-checkbox {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    background: none!important;
    user-select: none;
    &-box {
      position: relative;
      border-radius: 5px;
      font-size: 14px;
      display: inline-block;
      min-height: $frame-size;
      min-width: $frame-size;
      padding: 0;

      &.margin {
        margin-right: 10px;
      }
      &.default {
        border: 1px solid var(--text-color);
        color: white;
        i {
          opacity: 0;
          transition: all 0.1s ease-in-out;
          font-size: 12px;
        }
        &.checked {
          background: var(--primary);
          i {
            opacity: 1;
          }
        }
      }
      &.star {
        transition: all .6s cubic-bezier(.64,-0.34,.48,1.11);
        font-size: 18px;
        width: 22px;
        &.checked {
          transform: rotate(360deg);
          color: #ffe500;
        }
      }
    }
  }
</style>
