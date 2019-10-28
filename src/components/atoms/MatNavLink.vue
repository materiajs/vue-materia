<template>
  <div
    @click="$emit('click')"
    class="mat-nav-link mat-flex-center mat-standard-transition"
    @click.native="e => $emit('click.native', e)"
    v-mat-ripple
  >
    <div class="mat-nav-link-wrapper">
      <template v-if="href">
        <a :href="href" :target="target">
          <slot />
        </a>
      </template>
      <slot v-else />
    </div>
  </div>
</template>

<script>
import t from 'vue-types';

export default {
  name: 'NavLink',
  props: {
    href: t.string,
    target: t.string,
  },
};
</script>

<style scoped lang="scss">
  .mat-nav-link {
    align-items: center;
    color: inherit;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0 15px;
    position: relative;
    text-decoration: none;
    user-select: none;
    a {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      background: rgba(0,0,0,0.075);
    }
    &-wrapper {
      min-width: 60px;
      display: flex;
      justify-content: center;
    }
    @media (hover: none) {
      background: none !important;
    }
  }
</style>
