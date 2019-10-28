import Vue from 'vue';
import theme from '@materiajs/theme';
import App from './App.vue';
import MatBackground from './directives/background';
import MatSetColor from './directives/set-color';
import MatRipple from './directives/ripple';
import VueMateria from './index';

Vue.use(VueMateria);

Vue.config.productionTip = false;
theme.setTheme(theme.themes.palette1);

Vue.directive('mat-background', MatBackground);
Vue.directive('mat-set-color', MatSetColor);
Vue.directive('mat-ripple', MatRipple);

theme.init();

new Vue({
  render: h => h(App),
}).$mount('#app');
