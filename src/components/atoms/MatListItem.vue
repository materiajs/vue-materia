<template functional>
  <div
    v-on="listeners.click ? { click: listeners.click } : {}"
    :class="{ active: props.active }"
    class="mat-list-item"
    v-mat-ripple
    tabindex="0"
  >
    <a v-if="props.href" :href="props.href">
      <slot></slot>
    </a>
    <slot v-else />
  </div>
</template>

<script>
import t from 'vue-types';

export default {
  name: 'ListItem',
  props: {
    active: t.bool.def(false),
    color: t.string.def(''),
    href: t.string,
  },
};
</script>

<style lang="scss" scoped>
  .mat-list-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    min-height: 45px;
    padding: 0 15px;
    a {
      color: inherit;
      padding: 15px;
      display: block;
      text-decoration: none;
    }
    &.active, &:hover, &:focus {
      background: rgba(0,0,0,0.05);
      outline: none;
    }
  }
</style>
