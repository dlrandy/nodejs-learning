const t1 = setTimeout(() => {
    console.log(1);
}, 1_000_000);
const t2 = setTimeout(() => {
    console.log(2);
}, 2_000_000);
// ...
t1.unref();
// ...
clearTimeout(t2);
