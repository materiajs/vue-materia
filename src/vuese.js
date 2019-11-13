const vuese = require('@vuese/parser');
const fs = require('fs');
const glob = require('glob');

const { parser } = vuese;

try {
  glob(`${__dirname}/components/atoms/**/*.vue`, {}, (err, files) => {
    const parserRes = {};
    const parseFromPath = (path) => {
      const source = fs.readFileSync(path, 'utf-8');
      return parser(source);
    };
    const themePath = `${__dirname}/components/atoms/MatThemeComponent.vue`;
    const themeComponent = parseFromPath(themePath);
    files.forEach((path) => {
      const component = parseFromPath(path);
      const propertyName = path.split('/').pop().replace('.vue', '');
      if (
        component.componentDesc.extends
        && component.componentDesc.extends.includes('MatThemeComponent')
      ) {
        component.props = [
          ...themeComponent.props,
          ...component.props,
        ];
        console.log(component.props);
      }
      parserRes[propertyName] = component;
    });
    const path = './src/vuese.json';
    // console.log(parserRes);
    fs.writeFileSync(path, JSON.stringify(parserRes, null, 2));
  });
} catch (e) {
  console.error(e);
}
