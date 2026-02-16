var vm = require('vm');
var fs = require('fs');
var esbuild = require('esbuild');
var obj = {}, obj2 = {};

function build(name, code) {
    console.log('Build command:', name);
    var ctx = vm.createContext({$export: {}});
    vm.runInContext(code, ctx);
    obj[name] = ctx.$export;
    var alt = {};
    Object.keys(obj[name]).forEach(key => {
        if(key == 'handler') {
            alt.handler = '[handler]';
        } else {
            alt[key] = obj[name][key];
        }
    });
    
    obj2[name] = alt;
}

fs.readdirSync('cmmds').forEach(file => {
    build(file.slice(0, -3), fs.readFileSync('cmmds/' + file, 'utf8'));
});

var json = JSON.stringify(obj2);
Object.keys(obj).forEach(key => {
    json = json.replace('"[handler]"', obj[key].handler.toString());
});
json = 'setCmmds(' + json + ');' + fs.readFileSync('config.js', 'utf8');
var minified = esbuild.transformSync(json, {
    minifyWhitespace: true,
    minifyIdentifiers: false,
    minifySyntax: false,
    legalComments: 'none',
    target: 'es5'
});
fs.writeFileSync('dist/config.js', minified.code);
fs.copyFileSync('assets/index.html', 'dist/index.html');
fs.copyFileSync('LICENSE.txt', 'dist/LICENSE.txt');
console.log('Success!');