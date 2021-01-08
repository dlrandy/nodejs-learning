/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Readable } from 'stream';
import Chance from 'chance';

const chance = new Chance();
export default class RandomStream extends Readable {
    constructor(options) {
        super(options);
        this.emittedBytes = 0;
    }

    _read(size) {
        const chunk = chance.string({ length: size });
        this.push(chunk, 'utf-8');
        this.emittedBytes += chunk.length;
        if (chance.bool({ likelihood: 5 })) {
            this.push(null);
        }
    }
}
let emittedBytes = 0;
export const randomStream = new Readable({
    read(size) {
        const chunk = chance.string({ length: size });
        this.push(chunk, 'utf-8');
        emittedBytes += chunk.length;
        if (chance.bool({ likelihood: 5 })) {
            this.push(null);
        }
    },
});
