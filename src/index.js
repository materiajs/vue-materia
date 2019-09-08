import VueMq from 'vue-mq';
import theme from '@materiajs/theme';
import MatRoundable from './directives/roundable';
import MatBackground from './directives/background';
import MatSetColor from './directives/set-color';
import MatRipple from './directives/ripple';

// const components = {
//   ...blocks,
//   ...composites,
//   ...structures,
// };

export default {
  install: (Vue, { options }) => {
    Vue.directive('mat-roundable', MatRoundable);
    Vue.directive('mat-background', MatBackground);
    Vue.directive('mat-set-color', MatSetColor);
    Vue.directive('mat-ripple', MatRipple);

    // Vue.prototype.$materiajs = $materiajs;
    // Object.keys(components)
    //   .forEach((name) => {
    //     Vue.component(name, components[name]);
    //   });
    theme.setTheme(theme.themes.palette1);
    // Overwrite
    if (options.theme) {
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
