const counter = require('./counter.js');

console.log(counter.count);
counter.increment();
console.log(counter.count);
counter.count++;
console.log(counter.count);
counter.increment();
console.log(counter.count);
