/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
function* fruitGenerator() {
    yield 'peach';
    yield 'watermelon';
    yield 'summer';
}

const it = fruitGenerator();
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log('Using for...of:');

for (const fruit of fruitGenerator()) {
    console.log(fruit);
}
