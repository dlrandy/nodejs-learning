/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { Transform } from 'stream';

export class ParallelStream extends Transform {
    constructor(concurrency, userTransform, opts) {
        super({ objectMode: true, ...opts });
        this.userTransform = userTransform;
        this.running = 0;
        this.terminateCb = null;
        this.continueCb = null;
        this.concurrency = concurrency;
    }

    _transform(chunk, enc, done) {
        this.running++;
        this.userTransform(
            chunk,
            enc,
            this.push.bind(this),
            this._onComplete.bind(this)
        );
        if (this.running < this.concurrency) {
            done();
        } else {
            this.continueCb = done;
        }
        // done();
    }

    _flush(done) {
        if (this.running > 0) {
            this.terminateCb = done;
        } else {
            done();
        }
    }

    _onComplete(err) {
        this.running--;
        if (err) {
            return this.emit('error', err);
        }

        const tmpCb = this.continueCb;
        this.continueCb = null;
        tmpCb && tmpCb();
        if (this.running === 0) {
            // eslint-disable-next-line no-unused-expressions
            this.terminateCb && this.terminateCb();
        }
    }
}
