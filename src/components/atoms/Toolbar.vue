<template>
  <div
    class="mat-toolbar"
    :class="[shadow ? 'mat-box-shadow-heavy' : '', size]"
    v-mat-background:[gradient]="[color, gradientColor]"
    v-mat-roundable="round"
  >
    <slot />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import MatBackground from '../../directives/background';
import MatRoundable from '../../directives/roundable';

@Component({
  props: {
    color: String,
    gradient: String,
    gradientColor: String,
    noPadding: Boolean,
    round: String,
    shadow: Boolean,
    size: String,
  },
  directives: {
    MatBackground,
    MatRoundable,
  },
})
export default class Toolbar extends Vue {
}
</script>

<style scoped lang="scss">
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
  }
  /*>* {*/
  /*  height: 100%;*/
  /*}*/
}
</style>
