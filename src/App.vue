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
        <mat-input v-model="item"  />
        <br>
        <mat-button space="right" v-mat-ripple :outline="true">Hello</mat-button>
        <mat-button space="right">Test</mat-button>
        <mat-button color="primary" space="right" :outline="true">Test</mat-button>
        <mat-button color="primary-4"  space="right" :outline="true">Test</mat-button>
        <mat-modal v-model="getModal">
          <mat-card>
            Yeow
          </mat-card>
          <mat-button>
            Test
          </mat-button>
        </mat-modal>
        <mat-button @click="() => setModal(!getModal)">Modal</mat-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  data: () => ({
    item: '',
    sidebar: false,
  }),
})
export default class App extends Vue {
  modal = false;

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
