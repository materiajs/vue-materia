<template>
  <div
    @click.stop="$emit('componentClicked', component)"
    class="component"
    :class="{ selected: isSelected }"
  >
    <component
      :is="component.componentDesc.tag[0]"
      v-bind="component.propValues"
    >
      <template v-if="!children.length">
        {{ component.componentDesc.displayName[0] }}
      </template>
      <component-display
        v-for="child in children"
        :key="child.id"
        :component="child"
        :all-components="allComponents"
        :selected-component="selectedComponent"
        @componentClicked="component => $emit('componentClicked', component)"
      />
    </component>
  </div>
</template>

<script type="text/tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ComponentDisplay extends Vue {
  @Prop({ type: Object })
  component;

  @Prop({ type: Object })
  selectedComponent;

  @Prop({ type: Array })
  allComponents;

  get children() {
    return this.allComponents
      .filter(component => component.parent === this.component.id);
  }

  get isSelected() {
    return this.selectedComponent && this.selectedComponent.id === this.component.id;
  }
}
</script>

<style lang="scss" scoped>
  .component {
    transition: all 0.1s ease-in-out;
    &.selected {
      transform: scale(1.005);
      position: relative;
      z-index: 1;
      /deep/  >*{
        box-shadow: 0 10px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22) !important;
      }
    }
    /deep/  >*{
      transition: all 0.1s ease-in-out;
    }
  }
</style>
