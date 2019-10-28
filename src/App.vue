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
      <mat-button space="right" v-mat-ripple outline="true">Hello</mat-button>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MatToolbar from './components/atoms/MatToolbar.vue';
import MatButton from './components/atoms/MatButton.vue';
import MatInput from './components/atoms/MatInput.vue';
import MatModal from './components/atoms/MatModal.vue';
import MatCard from './components/atoms/MatCard.vue';
import vuese from './vuese.json';

@Component({
  components: {
    MatButton,
    MatToolbar,
    MatInput,
    MatModal,
    MatCard,
  },
  data: () => ({
    item: '',
  }),
})
export default class App extends Vue {
  modal = false;

  get getModal() {
    console.log(vuese);
    return this.modal;
  }

  set getModal(value) {
    console.log('settings', value);
    this.modal = value;
    this.$forceUpdate();
  }

  setModal() {
    this.modal = true;
    console.log('log');
    console.log(this.modal);
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
      padding: 15px;
    }
  }
</style>
