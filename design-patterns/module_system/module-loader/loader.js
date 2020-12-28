/* eslint-disable no-eval */
const originalRequire = require;

const fs = originalRequire('fs');

function loadModule(filename, module, require) {
    const sourcecode = `
    (function(module, exports, require){
      ${fs.readFileSync(filename, 'utf-8')}

    })(module, module.exports, require)
  `;
    eval(sourcecode);
}

// eslint-disable-next-line no-global-assign
require = function require(moduleName) {};

require.cache = {};
