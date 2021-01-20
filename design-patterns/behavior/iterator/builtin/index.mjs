import Matrix from './matrix.mjs';

const matrix22 = new Matrix([
    ['11', '12'],
    ['21', '22'],
]);

console.log('for...of');
for (const ele of matrix22) {
    console.log(ele);
}
console.log('spread operator');
const flattenedMatrix = [...matrix22];
console.log(flattenedMatrix);
const [oneOne, oneTwo, twoOne, twoTwo] = matrix22;
console.log(oneOne, oneTwo, twoOne, twoTwo);
