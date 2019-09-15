<template>
  <div id="app">
    <mat-toolbar
      shadow="true"
      color="primary"
    >
      <mat-button color="primary-7">Hello</mat-button>
      <mat-input v-model="item" />
    </mat-toolbar>
    <div class="main">
      <mat-input v-model="item"  />
      <br>
      <mat-button v-mat-ripple outline="true">Hello</mat-button>
      <mat-button space="right">Test</mat-button>
      <mat-button color="primary" space="right" :outline="true">Test</mat-button>
      <mat-button color="primary-4" space="right" :outline="true">Test</mat-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MatToolbar from './components/atoms/MatToolbar.vue';
import MatButton from './components/atoms/MatButton.vue';
import MatInput from './components/atoms/MatInput.vue';

@Component({
  components: {
    MatButton,
    MatToolbar,
    MatInput,
  },
  data: () => ({
    item: '',
  }),
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
