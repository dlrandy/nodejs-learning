/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
export default class Matrix {
    constructor(inMatrix) {
        this.data = inMatrix;
    }

    get(row, column) {
        if (row >= this.data.length || column >= this.data[row].length) {
            throw new RangeError('out of bounds');
        }
        return this.data[row][column];
    }

    set(row, column, value) {
        if (row >= this.data.length || column >= this.data[row].length) {
            throw new RangeError('out of bounds');
        }
        this.data[row][column] = value;
    }

    [Symbol.iterator]() {
        let nextRow = 0;
        let nextColumn = 0;
        return {
            next: () => {
                if (nextRow === this.data.length) {
                    return { done: true };
                }

                const currVal = this.data[nextRow][nextColumn];

                if (nextColumn === this.data[nextRow].length - 1) {
                    nextRow++;
                    nextColumn = 0;
                } else {
                    nextColumn++;
                }

                return { value: currVal };
            },
        };
    }
}
