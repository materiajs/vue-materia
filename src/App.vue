<template>
  <div id="app">
    <mat-toolbar
      :no-padding="true"
      :shadow="shadow"
      z-index="5"
      color="blue-grey-2"
    >
      <mat-nav-link @click="() => sidebar = !sidebar">
        <mat-logo>
          Sidebar
        </mat-logo>
      </mat-nav-link>
      <mat-nav-link>
        <mat-menu v-model="menu">
          <mat-avatar
            slot="trigger"
            size="small"
            src="https://yt3.ggpht.com/a-/AAuE7mB6UdWfnxd56C-205HHDPSZpyr4j6rr30HCyYXgSw=s88-c-k-c0xffffffff-no-rj-mo">
            Andy Feely
          </mat-avatar>
          <div>
            Sign out
          </div>
        </mat-menu>
      </mat-nav-link>
    </mat-toolbar>
    <div class="main">
      <mat-expansion v-model="sidebar">
        <mat-container
          color="support-4"
          width="300px"
          height="100%"
        >
          <Sidebar />
        </mat-container>
      </mat-expansion>

      <mat-container
        height="100%"
        width="100%"
        color="light-blue-3"
      >
        <div @click="closeEditComponent()">
          <mat-container
            max-width="800px"
            padding="15px"
          >
            <component-selector @input="onSelectComponent" />
            <mat-input
                v-model="input"
                size="xl"
                round="5"
            ></mat-input>
            <br>
            <mat-input
                v-model="input"
                size="lg"
                round="7"
            ></mat-input>
            <br>
            <mat-input v-model="input"></mat-input>
            <br>
            <mat-checkbox v-model="checkbox">
              Nice!
            </mat-checkbox>
            <br>
            <br>
            <component-selector @input="onSelectComponent" />
            <br>
            <component-display
              v-for="(component, idx) in rootComponents"
              :key="idx"
              :component="component"
              :selected-component="selectedComponent"
              :all-components="components"
              @componentClicked="onClickComponent"
            >
            </component-display>
          </mat-container>
        </div>
      </mat-container>
      <mat-expansion :value="editComponentSidebar">
        <mat-container
          color="support-4"
          width="420px"
          height="100%"
          padding="15px"
        >
          <mat-toolbar
            v-if="selectedComponent"
            color="support-2"
          >
            {{ selectedComponent.componentDesc.displayName[0]}}
            <mat-button @click="closeEditComponent">Close</mat-button>
          </mat-toolbar>
          <br>
          <template v-if="selectedComponentParent">
            <mat-toolbar
              size="xs"
              color="support-3">
              Parent
            </mat-toolbar>
            <mat-list>
              <mat-list-item
                padding="15px"
                @click="selectedComponent = { ...selectedComponentParent }"
              >
                {{ selectedComponentParent.componentDesc.displayName[0] }}
              </mat-list-item>
            </mat-list>
          </template>
          <mat-button @click="() => swipe = 0">
            0
          </mat-button>
          <mat-button @click="() => swipe = 1">
            One
          </mat-button>
          <mat-swipe :value="swipe">
            <mat-swipe-item>
              <mat-toolbar
                size="xs"
                color="support-3">
                Children
              </mat-toolbar>
              <br>
              <component-selector @input="component =>
             onSelectComponent({ ...component, parent: this.selectedComponent.id })">
              </component-selector>
              <div>
                <mat-list>
                  <mat-list-item
                    v-for="child in getSelectedComponentChildren"
                    :key="child.id"
                    @click="selectedComponent = { ...child }"
                  >
                    {{ child.componentDesc.displayName[0] }}
                  </mat-list-item>
                </mat-list>
              </div>
            </mat-swipe-item>
            <mat-swipe-item>
              <mat-toolbar
                size="xs"
                color="support-3">
                Props
              </mat-toolbar>
              <br>
              <mat-list v-if="selectedComponent">
                <template v-for="(prop, idx) in selectedComponent.props">
                  <mat-color-select
                    v-if="prop.name === 'color' || prop.name === 'gradient'"
                    :key="`${selectedComponent.name}-${prop.name}-${idx}-color-select`"
                    :value="selectedComponent.color"
                    @input="color => updateSelectedComponentPropValues(prop.name, color)"
                  />
                  <mat-list-item
                    v-else-if="prop.type === 'Boolean'"
                    :key="`${selectedComponent.name}-${prop.name}-${idx}-checkbox`"
                  >
                    <mat-checkbox
                      :value="selectedComponent.propValues &&
                      selectedComponent.propValues[prop.name]"
                      @input="val => updateSelectedComponentPropValues(prop.name, val)"
                    >
                      {{ prop.name }}
                    </mat-checkbox>
                  </mat-list-item>
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
            </mat-swipe-item>
          </mat-swipe>
          <br>
        </mat-container>
      </mat-expansion>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import uuid from 'uuid/v4';
import ComponentSelector from '@/components/molecules/ComponentSelector.vue';
import Sidebar from '@/Sidebar.vue';
import ComponentDisplay from '@/components/molecules/ComponentDisplay.vue';

@Component({
  components: {
    ComponentDisplay,
    Sidebar,
    ComponentSelector,
  },
})
export default class App extends Vue {
  modal = false;

  menu = false;

  sidebar = true;

  input = '';

  editComponentSidebar = false;

  checkbox = false;

  shadow = true;

  components = [];

  selectedComponent = null;

  propMenus = {};

  swipe = 0;

  get getModal() {
    return this.modal;
  }

  set getModal(value) {
    this.modal = value;
    this.$forceUpdate();
  }

  get rootComponents() {
    return this.components
      .filter(component => !component.parent);
  }

  get getSelectedComponentChildren() {
    if (!this.selectedComponent) return [];
    return this.components
      .filter(component => component.parent === this.selectedComponent.id);
  }

  get selectedComponentParent() {
    if (!this.selectedComponent) return null;
    return this.components
      .find(component => component.id === this.selectedComponent.parent);
  }

  setModal() {
    this.modal = true;
    this.$forceUpdate();
  }

  onSelectComponent(component) {
    const id = uuid();
    this.components.push({
      ...component,
      id,
    });
  }

  onClickComponent(component) {
    this.selectedComponent = component;
    this.editComponentSidebar = true;
  }

  closeEditComponent() {
    this.editComponentSidebar = false;
    setTimeout(() => {
      this.selectedComponent = null;
    }, 200);
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
    const updated = {
      ...this.selectedComponent,
      propValues: {
        ...match.propValues,
        [propName]: value,
      },
    };
    this.components.splice(idx, 1, updated);
    this.selectedComponent = updated;
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
