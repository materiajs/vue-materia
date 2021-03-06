<template>
  <div class="mat-chip-list">
    <div class="mat-chip-list-title" v-if="title" v-text="title"></div>
    <div class="mat-chip-list-wrapper">
      <mat-chip
        v-for="chip in chipsList"
        :key="chip.id"
        v-bind="chip" />
      <a
        v-if="hasInitialMax && !showAll"
        class="show-all-link"
        :action="onClickShowAll"
        v-text="showAllPlaceholderText"></a>
      <slot />
    </div>
  </div>
</template>

<script>
import t from 'vue-types';
import MatChip from '../../blocks/chip/Chip.vue';

export default {
  name: 'mat-chip-list',
  components: {
    MatChip,
  },
  data: () => ({
    showAll: false,
  }),
  props: {
    chips: t.arrayOf(t.object).loose,
    title: t.string,
    initialMax: t.number.def(0),
  },
  computed: {
    chipsList() {
      if (this.hasInitialMax && !this.showAll) {
        return this.chips.slice(0, this.initialMax);
      }
      return this.chips;
    },
    hasInitialMax() {
      return this.initialMax && this.initialMax < this.chips.length;
    },
    showAllPlaceholderText() {
      return `Show all (${this.chips.length - this.initialMax} more)`;
    },
  },
  methods: {
    onClickShowAll() {
      this.showAll = true;
    },
  },
};
</script>

<style scoped lang="scss">
  .mat-chip-list {
    display: inline;
    &-title {
      font-weight: bold;
      font-size: 14px;
      padding-bottom: 5px;
    }
    &-wrapper {
      align-items: center;
      display: inline-flex;
      flex-wrap: wrap;
      >* {
        margin-right: 3px;
        margin-bottom: 2px;
        margin-top: 2px;
      }
      .show-all-link {
        margin-left: 5px;
      }
    }
  }
</style>
