<template>
  <div id="app">
    <mat-toolbar color="primary">Hello</mat-toolbar>
    <iframe src="https://local.hubspot.com/test-notifications-example-app/6096958/?openSidebar=tue" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MatToolbar from './components/atoms/Toolbar.vue';

@Component({
  components: {
    MatToolbar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
  body, html {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
