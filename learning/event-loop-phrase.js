/* eslint-disable no-console */
// const fs = require('fs');

// setImmediate(() => console.log(1));
// Promise.resolve().then(() => console.log(2));
// process.nextTick(() => console.log(3));
// fs.readFile(__filename, () => {
//     console.log(4);
//     setTimeout(() => console.log(5));
//     setImmediate(() => console.log(6));
//     process.nextTick(() => console.log(7));
// });
// console.log(8);
//------------------

const sleepSt = (t) => new Promise((r) => setTimeout(r, t));
const sleepIm = () => new Promise((r) => setImmediate(r));
(async () => {
    setImmediate(() => console.log(1));
    console.log(2);
    await sleepSt(0);
    setImmediate(() => console.log(3));
    console.log(4);
    await sleepIm();
    setImmediate(() => console.log(5));
    console.log(6);
    await 1;
    setImmediate(() => console.log(7));
    console.log(8);
})();
