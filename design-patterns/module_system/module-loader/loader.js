/* eslint-disable no-eval */
const originalRequire = require;

const fs = originalRequire('fs');

function loadModule(filename, module, require) {
    const sourceCode = `
      (function(module, exports, require){
        ${fs.readFileSync(filename)}
      })(module, module.exports, require)
    `;
    eval(sourceCode);
}

// eslint-disable-next-line no-global-assign
require = function require(moduleName) {
    console.log(`Require invoked for module: ${moduleName}`);
    const id = require.resolve(moduleName);
    if (require.cache[id]) {
        return require.cache[id].exports;
    }
    const module = {
        exports: {},
        id,
    };
    require.cache[id] = module;
    loadModule(id, module, require);
    return module.exports;
};

require.cache = {};
require.resolve = (moduleName) => {
    return originalRequire.resolve(moduleName);
};

require(process.argv[2]);
