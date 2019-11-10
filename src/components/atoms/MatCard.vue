<template functional>
  <div
    :class="['mat-card', props.round ? `round-${props.round}` : '']"
    :style="props.initTheme(props)"
  >
    <slot />
  </div>
</template>

<script type="text/tsx">
import { Component, Prop } from 'vue-property-decorator';
import t from 'vue-types';
import MatThemeComponent from './MatThemeComponent.vue';
import { defaultAccentColor } from '../../mixins/themeable';

@Component({
  props: {
    hideOnMq: t.string,
    overflow: t.string.def('initial'),
    padding: t.string.def('15px'),
  },
})
// @name MatCard
// @displayName Card
// @tag mat-card
// Card component
export default class MatCard extends MatThemeComponent {
  @Prop({ default: 'default', type: String })
  color;

  @Prop({
    // 5px
    // 15px
    // 20px
    type: String,
  })
  padding;

  @Prop({
    // 1
    // 2
    // 3
    // 4
    // 5
    type: String,
  })
  round;
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  // Card
  .mat-card {
    background: white;
    box-shadow: $box-shadow-standard;
    border-radius: var(--round);

    &-light {
      background: white;
      box-shadow: $box-shadow-light;
    }
  }
</style>
