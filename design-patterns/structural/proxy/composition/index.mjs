/* eslint-disable max-classes-per-file */
class StackCalculator {
    constructor() {
        this.stack = [];
    }

    putValue(value) {
        this.stack.push(value);
    }

    getValue() {
        return this.stack.pop();
    }

    peekValue() {
        return this.stack[this.stack.length - 1];
    }

    clear() {
        this.stack = [];
    }

    divide() {
        const divisor = this.getValue();
        const dividend = this.getValue();
        const result = dividend / divisor;
        this.putValue(result);
        return result;
    }

    multiply() {
        const multiplicand = this.getValue();
        const multiplier = this.getValue();
        const result = multiplier * multiplicand;
        this.putValue(result);
        return result;
    }
}

class SafeCalculator {
    constructor(calculator) {
        this.calculator = calculator;
    }

    divide() {
        const divisor = this.calculator.peekValue();
        if (divisor === 0) {
            throw Error('Division by 0');
        }
        return this.calculator.divide();
    }

    putValue(value) {
        return this.calculator.putValue(value);
    }

    getValue() {
        return this.calculator.getValue();
    }

    peekValue() {
        return this.calculator.peekValue();
    }

    clear() {
        return this.calculator.clear();
    }

    multiply() {
        return this.calculator.multiply();
    }
}

const calculator = new StackCalculator();
const safeCalculator = new SafeCalculator(calculator);

calculator.putValue(3);
calculator.putValue(2);
console.log(calculator.multiply());

safeCalculator.putValue(2);
console.log(safeCalculator.multiply());

calculator.putValue(0);
console.log(calculator.divide());

safeCalculator.clear();
safeCalculator.putValue(4);
safeCalculator.putValue(0);
console.log(safeCalculator.divide());
