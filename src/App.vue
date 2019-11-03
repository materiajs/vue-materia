<template>
  <div id="app">
    <mat-toolbar
      :no-padding="true"
      :shadow="shadow"
      z-index="5"
      color="blue-grey-2"
    >
    <mat-nav-link @click="() => sidebar = !sidebar">
        Sidebar
      </mat-nav-link>
    </mat-toolbar>
    <div class="main">
      <mat-sidebar v-model="sidebar" color="blue-grey-3">
        <Sidebar />
        <template slot="content">
          <mat-container
            height="100%"
            width="100%"
            color="blue-grey-5"
          >
            <mat-container
              max-width="800px"
              padding="15px"
            >
              <component-selector @input="onSelectComponent" />
              <div
                class="component"
                v-for="(component, idx) in components"
                :key="idx"
                @click="() => onClickComponent(component)"
              >
                <component
                  :is="component.componentDesc.tag[0]"
                  v-bind="component.propValues"
                >
                  {{ component.componentDesc.tag[0] }}
                </component>
              </div>
            </mat-container>
          </mat-container>
          <mat-expansion :value="selectedComponent !== null">
           <mat-container
             color="blue-grey-3"
             width="700px"
             height="100%"
           >
             <mat-toolbar
               v-if="selectedComponent"
               color="support-2"
             >
               {{ selectedComponent.componentDesc.displayName[0]}}
               <mat-button @click="() => selectedComponent = null">Close</mat-button>
             </mat-toolbar>
             <mat-list v-if="selectedComponent">
               <template v-for="(prop, idx) in selectedComponent.props">
                 <mat-color-select
                   v-if="prop.name === 'color'"
                   :key="`${selectedComponent.name}-${prop.name}-${idx}-color-select`"
                   @input="color => updateSelectedComponentPropValues('color', color.name)"
                 />
                 <mat-menu
                   v-else-if="prop.typeDesc"
                   :key="`${selectedComponent.name}-${prop.name}-${idx}-menu`"
                   :value="propMenus[prop.name]"
                   @input="val => updatePropMenus(prop.name, val)"
                 >
                   <div slot="trigger">
                     <mat-list-item
                       :key="`${selectedComponent.name}-${prop.name}-${idx}-list-item`"
                       @click="() => updatePropMenus(prop.name, true)"
                     >
                       {{ prop.name }}
                     </mat-list-item>
                   </div>
                   <mat-list>
                     <mat-list-item
                       v-for="option in prop.typeDesc"
                       :key="option"
                       @click="() => updateSelectedComponentPropValues(prop.name, option)"
                     >
                       {{ option }}
                     </mat-list-item>
                   </mat-list>
                 </mat-menu>
               </template>
             </mat-list>
           </mat-container>
          </mat-expansion>
        </template>
      </mat-sidebar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import uuid from 'uuid/v4';
import ComponentTree from '@/ComponentTree.vue';
import ComponentSelector from '@/components/molecules/ComponentSelector.vue';
import Sidebar from '@/Sidebar.vue';

@Component({
  components: {
    Sidebar,
    ComponentTree,
    ComponentSelector,
  },
})
export default class App extends Vue {
  modal = false;

  sidebar = true;

  shadow = true;

  components = [];

  selectedComponent = null;

  propMenus = {};

  get getModal() {
    return this.modal;
  }

  set getModal(value) {
    this.modal = value;
    this.$forceUpdate();
  }

  setModal() {
    this.modal = true;
    this.$forceUpdate();
  }

  onClickComponent(component) {
    console.log(component);
    this.selectedComponent = component;
  }

  onSelectComponent(component) {
    component.id = uuid();
    this.components.push(component);
  }

  updatePropMenus(propName, value) {
    this.propMenus = {
      ...this.propMenus,
      [propName]: value,
    };
  }

  updateSelectedComponentPropValues(propName, value) {
    const idx = this.components.findIndex(c => c.id === this.selectedComponent.id);
    const match = this.components[idx];
    this.components.splice(idx, 1, {
      ...this.selectedComponent,
      propValues: {
        ...match.propValues,
        [propName]: value,
      },
    });
    // this.refreshValues();
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

  body, html, #app {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  #app {
    display: flex;
    flex-direction: column;
    font-family: Nunito, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .main {
      display: flex;
      flex: 1;
      .body {
        flex: 1;
      }
    }
  }
</style>
