<template functional>
  <div :class="[ 'mat-card']" :style="props.initTheme(props)">
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
}
</script>

<style scoped lang="scss">
  @import "../../styles/main";
  // Card
  .mat-card {
    background: white;
    box-shadow: $box-shadow-standard;
    padding: 15px;

    &-light {
      background: white;
      box-shadow: $box-shadow-light;
    }
  }
</style>
