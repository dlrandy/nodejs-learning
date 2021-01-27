/* eslint-disable no-plusplus */
import { EventEmitter } from 'events';

export class SubsetSum extends EventEmitter {
    constructor(sum, set) {
        super();
        this.sum = sum;
        this.set = set;
        this.totalSubsets = 0;
    }

    combine(set, subset) {
        for (let i = 0; i < set.length; i++) {
            const newSubset = subset.concat(set[i]);
            this.combine(set.slice(i + 1), newSubset);
            this.processSubset(newSubset);
        }
    }

    processSubset(subset) {
        console.log('Subset', ++this.totalSubsets, subset);
        const res = subset.reduce((prev, item) => prev + item, 0);
        if (res === this.sum) {
            this.emit('match', subset);
        }
    }

    start() {
        this.combine(this.set, []);
        this.emit('end');
    }
}
