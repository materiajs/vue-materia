<template>
  <div id="app">
    <mat-toolbar shadow="true" color="primary">Hello</mat-toolbar>
    <div class="main">
      <mat-button color="primary-3" space="right">Test</mat-button>
      <mat-button color="primary" space="right" :outline="true">Test</mat-button>
      <mat-button color="primary-4" space="right" :outline="true">Test</mat-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MatToolbar from './components/atoms/Toolbar.vue';
import MatButton from './components/atoms/MatButton.vue';

@Component({
  components: {
    MatButton,
    MatToolbar,
  },
})
export default class App extends Vue {
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
      padding: 15px;
    }
  }
</style>
