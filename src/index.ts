import { VueConstructor as VueInterface } from 'vue/types/vue.d';
import VueMq from 'vue-mq';
import theme from '@materiajs/theme';
import MatBackground from './directives/background';
import MatSetColor from './directives/set-color';
import MatRipple from './directives/ripple';

import * as atoms from './components/atoms/index';
// import * as blocks from './components/blocks/index';
// import * as composites from './components/composites/index';
// import * as structures from './components/structures/index';

const components = {
  ...atoms,
  // ...blocks,
  // ...composites,
  // ...structures,
};

export default {
  install: (Vue: VueInterface, options) => {
    Vue.directive('mat-background', MatBackground);
    Vue.directive('mat-set-color', MatSetColor);
    Vue.directive('mat-ripple', MatRipple);
    theme.init();
    Object.keys(components)
      .forEach((name) => {
        Vue.component(name, components[name]);
      });
    theme.setTheme(theme.themes.palette1);
    // Overwrite
    if (options && options.theme) {
      theme.setTheme(theme.themes[options.theme]);
    }
    Vue.use(VueMq, {
      breakpoints: { // default breakpoints - customize this
        xs: 360,
        sm: 480,
        md: 768,
        lg: 1250,
        xl: Infinity,
      },
      defaultBreakpoint: 'lg', // customize this for SSR
    });
  },
  palette: theme.palette,
};
