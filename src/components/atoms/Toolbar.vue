<template functional>
  <div
    class="mat-toolbar"
    :class="[
    props.shadow ? 'mat-box-shadow-heavy' : '',
    props.size,
    props.noPadding ? '' : 'with-padding'
    ]"
    v-mat-background:[props.gradient]="[props.color, props.gradientColor]"
    v-mat-roundable="props.round"
  >
    <slot />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    color: String,
    gradient: String,
    gradientColor: String,
    noPadding: Boolean,
    round: String,
    shadow: Boolean | String,
    size: String,
  },
})
export default class Toolbar extends Vue {
}
</script>

<style scoped lang="scss">
  $box-shadow-heavy: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  .mat-toolbar {
  align-items: center;
  display: flex;
  height: 60px;
  position: relative;

  &.xs {
    height: 40px;
    font-size: 15px;
  }
  &.small {
    height: 45px;
  }
  &.large {
    height: 75px;
  }
  &.mat-box-shadow-heavy {
    z-index: 3;
    box-shadow: $box-shadow-heavy;
  }
    &.with-padding {
      padding: 0 15px;
    }
  /*>* {*/
  /*  height: 100%;*/
  /*}*/
}
</style>
