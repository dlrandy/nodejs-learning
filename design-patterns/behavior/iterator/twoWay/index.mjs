/* eslint-disable no-empty */
function* twoWay() {
    try {
        const what = yield null;
        yield `Hello ${what}`;
    } catch (err) {
        yield `Hello error: ${err.message}`;
    }
}
console.log('passing a value back to the generator:');
const two = twoWay();
two.next();
console.log(two.next('world'));
console.log('using throw():');
const twoException = twoWay();
twoException.next();
console.log(twoException.throw(new Error('Boom!')));

console.log('using return():');
const twoReturn = twoWay();
console.log(twoReturn.return('myReturnValue'));
