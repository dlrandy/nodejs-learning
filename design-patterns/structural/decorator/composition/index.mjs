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

class EnhancedCalculator {
    constructor(calculator) {
        this.calculator = calculator;
    }

    add() {
        const addend2 = this.getValue();
        const addend1 = this.getValue();
        const result = addend1 + addend2;
        this.putValue(result);
        return result;
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
const enhancedCalculator = new EnhancedCalculator(calculator);

enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());
enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply());
enhancedCalculator.putValue(0);
console.log(enhancedCalculator.divide());
