<template>
  <div class="component-tree">

    <div @click="propModal = true">
      <component
        v-if="component"
        :is="component.tag"
      >{{ component.name }}</component>
    </div>
    <slot />
    <mat-modal
      v-if="component"
      v-model="propModal">
      <mat-card>
        <mat-toolbar color="support-2">
          Props
        </mat-toolbar>
        <mat-list>
          <template v-for="(prop, idx) in componentInfo.props">
            <mat-menu
              :key="`${component.name}-${prop.name}-${idx}-menu`"
              :value="propMenus[prop.name]" @input="val => updatePropMenus(prop.name, val)">
              <div slot="trigger">
                <mat-list-item
                  :key="`${component.name}-${prop.name}-${idx}-list-item`"
                  @click="() => updatePropMenus(prop.name, true)"
                >
                  {{ prop.name }}
                </mat-list-item>
              </div>
              <mat-list>
                <mat-list-item
                  v-for="option in prop.typeDesc"
                  :key="option"
                >
                  {{ option }}
                </mat-list-item>
              </mat-list>
            </mat-menu>
          </template>
        </mat-list>
      </mat-card>
    </mat-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  data: () => ({
    menu: false,
    propMenus: {},
    propModal: false,
    components: [
      {
        name: 'Button',
        tag: 'mat-button',
        wrapper: true,
      },
      {
        name: 'Container',
        tag: 'mat-container',
        wrapper: true,
      },
      {
        name: 'Toolbar',
        tag: 'mat-toolbar',
      },
    ],
    selectedComponents: [],
  }),
})
export default class ComponentTree extends Vue {
  @Prop({ type: Object })
  component;

  get componentInfo() {
    if (!this.component) return null;
    const allComponents = Object.keys(this.allComponents)
      .map(key => this.allComponents[key]);
    return allComponents
      .find(component => component.componentDesc.tag
        && component.componentDesc.tag[0] === this.component.tag);
  }

  updatePropMenus(propName, value) {
    console.log('updating', propName, value);
    this.propMenus = {
      ...this.propMenus,
      [propName]: value,
    };
  }
}
</script>
