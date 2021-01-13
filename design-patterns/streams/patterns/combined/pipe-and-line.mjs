import { createReadStream, createWriteStream } from 'fs';
import { Transform, pipeline } from 'stream';
import { strict as assert } from 'assert';
import { fileURLToPath } from 'url';
import { join } from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const streamA = createReadStream(
    join(__dirname, '..', '..', '..', '..', 'package.json')
);

const streamB = new Transform({
    transform(chunk, enc, done) {
        this.push(chunk.toString().toUpperCase());
        done();
    },
});

const streamC = createWriteStream(
    join(__dirname, '..', '..', '..', '..', 'package-uppercase.json')
);

const pipelineReturn = pipeline(streamA, streamB, streamC, (err) => {
    if (err) {
        console.error('Pipeline failed.', err);
    } else {
        console.log('Pipeline succeeded.');
    }
});

console.log(assert.strictEqual(streamC, pipelineReturn));

const pipeReturn = streamA.pipe(streamB).pipe(streamC);
console.log(assert.strictEqual(streamC, pipeReturn));
