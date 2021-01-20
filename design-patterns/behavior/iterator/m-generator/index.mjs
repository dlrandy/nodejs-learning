import Matrix from './matrix.mjs';

const matrix22 = new Matrix([
    ['11', '12'],
    ['21', '22'],
]);

const iterator = matrix22[Symbol.iterator]();
let iterationResult = iterator.next();
while (!iterationResult.done) {
    console.log(iterationResult.value);
    iterationResult = iterator.next();
}
