<template>
  <div id="app">
    <mat-toolbar
      shadow="true"
      color="primary"
    >
      <mat-nav-link @click="() => sidebar = !sidebar">
        Sidebar
      </mat-nav-link>
    </mat-toolbar>
    <div class="main">
      <mat-sidebar v-model="sidebar">
        <mat-list>
          <mat-list-item>
            Heya
          </mat-list-item>
          <mat-list-item>
            Heya
          </mat-list-item>
          <mat-list-item>
            Heya
          </mat-list-item>
        </mat-list>
      </mat-sidebar>
      <div class="body">
        <mat-toolbar :color="color && color.name">
          {{ color && color.name }}
        </mat-toolbar>
        <mat-color-select v-model="color" />
        <mat-toolbar :color="color && color.name">
          {{ color && color.name }}
        </mat-toolbar>
        <mat-toolbar :color="color && color.name">
          {{ color && color.name }}
        </mat-toolbar>
<!--        <mat-menu v-model="menu">-->
<!--          <mat-container-->
<!--            slot="trigger"-->
<!--            cursor="pointer"-->
<!--          >-->
<!--            Triggerrrr-->
<!--          </mat-container>-->
<!--          <mat-button>Test</mat-button>-->
<!--        </mat-menu>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  data: () => ({
  }),
})
export default class App extends Vue {
  modal = false;

  menu = false;

  color = null;

  sidebar = false;

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
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

  body, html {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: Nunito, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .main {
      display: flex;
      .body {
        flex: 1;
        padding: 15px;
      }
    }
  }
</style>
