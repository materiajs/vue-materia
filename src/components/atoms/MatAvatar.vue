<template>
  <div class="mat-avatar">
    <img
      class=""
      :class="[size]"
      :style="style"
      :src="src" :alt="alt">
    <div
      v-if="$slots.default"
      class="mat-avatar-info">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import t from 'vue-types';

export default {
  name: 'Avatar',
  props: {
    size: t.string,
    src: t.string,
    alt: t.string,
    borderRadius: t.string.def('50%'),
  },
  computed: {
    style() {
      return {
        'border-radius': this.borderRadius,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  .mat-avatar {
    display: flex;
    align-items: center;
    img {
      max-width: 100%;
      max-height: calc(100% - 10px);
      border: 2px solid white;
      box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.3);
      &.xs {
        width: 32px;
        height: 32px;
      }
      &.small {
        width: 45px;
        height: 45px;
      }
      &.regular {
        width: 100px;
        height: 100px;
      }
    }
    &-info {
      margin-left: 15px;
    }
  }
</style>
