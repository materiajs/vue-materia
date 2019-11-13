<template>
  <mat-list>
    <mat-list-item
      v-for="item in sidebarItems"
      :key="item.name"
    >
      {{ item.componentDesc.displayName[0] }}
    </mat-list-item>
  </mat-list>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import components from './vuese.json';

@Component({
  data: () => ({
    components,
  }),
})
export default class Sidebar extends Vue {
  components;

  get sidebarItems() {
    return Object.keys(this.components)
      .map(key => this.components[key])
      .filter(component => component.componentDesc.displayName
        && component.componentDesc.displayName.length);
  }
}
</script>
