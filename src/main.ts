import Vue from 'vue';
import theme from '@materiajs/theme';
import App from './App.vue';

Vue.config.productionTip = false;
theme.setTheme(theme.themes.palette1);

new Vue({
  render: h => h(App),
}).$mount('#app');
