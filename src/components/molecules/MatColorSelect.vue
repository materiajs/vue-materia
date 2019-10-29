<template>
  <mat-menu v-model="menu">
    <template slot="trigger">
      <slot name="trigger">
        <div
          v-if="selectedColor"
          class="color-with-label"
          :style="{ cursor: 'pointer' }"
        >
          <div
            :style="{background: selectedColor.value}"
            class="color"
          />
          <span class="color-label">
          {{ getSentenceCase(selectedColor.name) }}
        </span>
        </div>
        <div
          v-else
          class="color-with-label"
        >
          Choose color
        </div>
      </slot>
    </template>
    <mat-list>
      <mat-list-item
        v-for="item in paletteColors"
        :key="item.value"
        @click="() => selectedColor = item"
      >
        <div class="color-with-label">
          <div
            :style="{background: item.value}"
            class="color"
          />
          <span class="color-label">
            {{ getSentenceCase(item.name) }}
          </span>
        </div>
      </mat-list-item>
    </mat-list>
  </mat-menu>
</template>

<script type="text/tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import theme from '@materiajs/theme';

@Component()
// @name MatColorSelect
// @displayName Color Select
// @tag mat-color-select
// Color select component
export default class MatColorSelect extends Vue {
  @Prop({ default: null, type: Object })
  value;

  menu = false;

  get paletteColors() {
    return Object.keys(theme.palette)
      .map(paletteColor => ({
        name: paletteColor,
        value: theme.palette[paletteColor],
      }));
  }

  get selectedColor() {
    return this.value;
  }

  set selectedColor(value) {
    this.$emit('input', value);
  }

  getSentenceCase(text) {
    const repl = text.replace(/-/g, ' ');
    return (repl.charAt(0).toUpperCase() + repl.slice(1)).replace(/\b\w/g, l => l.toUpperCase());
  }
}
</script>

<style scoped lang="scss">
  .color-with-label {
    display: flex;
    align-items: center;
    min-height: 45px;
    .color {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
</style>
