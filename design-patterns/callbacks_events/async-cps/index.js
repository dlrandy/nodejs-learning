function addAsyncCps(a, b, callback) {
    setTimeout(() => {
        callback(a + b);
    }, 100);
}
console.log('before');
addAsyncCps(1, 2, (result) => console.log(`Result: ${result}`));
console.log('after');
