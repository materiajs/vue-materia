const vuese = require('@vuese/parser');
const fs = require('fs');
const glob = require('glob');

const { parser } = vuese;

try {
  glob(`${__dirname}/components/atoms/**/*.vue`, {}, (err, files) => {
    const parserRes = {};
    files.forEach((path) => {
      const source = fs.readFileSync(path, 'utf-8');
      const component = parser(source);
      const propertyName = path.split('/').pop().replace('.vue', '');
      parserRes[propertyName] = component;
    });
    const path = './dist/vuese.json';
    fs.writeFileSync(path, JSON.stringify(parserRes, null, 2));
  });
} catch (e) {
  console.error(e);
}
