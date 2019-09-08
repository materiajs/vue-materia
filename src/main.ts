import Vue from 'vue';
import theme from '@materiajs/theme';
import App from './App.vue';
import MatRoundable from './directives/roundable';
import MatBackground from './directives/background';
import MatSetColor from './directives/set-color';
import MatRipple from './directives/ripple';

Vue.config.productionTip = false;
theme.setTheme(theme.themes.palette1);

Vue.directive('mat-roundable', MatRoundable);
Vue.directive('mat-background', MatBackground);
Vue.directive('mat-set-color', MatSetColor);
Vue.directive('mat-ripple', MatRipple);

new Vue({
  render: h => h(App),
}).$mount('#app');
