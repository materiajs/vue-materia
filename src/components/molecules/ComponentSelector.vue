<template>
  <div>
    <mat-menu v-model="menu">
      <mat-button slot="trigger">
        Select component
      </mat-button>
      <mat-container>
        <mat-list>
          <mat-list-item
            v-for="component in componentOptions"
            :key="component.tag"
            @click="() => $emit('input', component)"
          >
            {{ component.componentDesc.displayName[0] }}
          </mat-list-item>
        </mat-list>
      </mat-container>
    </mat-menu>
  </div>
</template>

<script type="text/tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import components from '../../../dist/vuese.json';

@Component({
  data: () => ({
    components,
  }),
})
export default class MatComponentSelector extends Vue {
  @Prop({ type: Object })
  value;

  menu = false;

  components;

  get componentOptions() {
    return Object.keys(this.components)
      .map(key => this.components[key])
      .filter(component => component.componentDesc.displayName
        && component.componentDesc.displayName.length);
  }
}
</script>

<style scoped>

</style>
