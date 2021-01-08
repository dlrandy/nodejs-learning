/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { Writable } from 'stream';
import { promises as fs } from 'fs';
import { dirname } from 'path';
import mkdirp from 'mkdirp';

export class ToFileStream extends Writable {
    constructor(options) {
        super({ ...options, objectMode: true });
    }

    _write(chunk, encoding, cb) {
        return mkdirp(dirname(chunk.path))
            .then(() => {
                console.log(chunk.path);
                return fs.writeFile(chunk.path, chunk.content);
            })
            .then(() => cb())
            .catch(cb);
    }
}

export const tfs = new Writable({
    objectMode: true,
    write(chunk, encoding, cb) {
        mkdirp(dirname(chunk.path))
            .then(() => fs.writeFile(chunk.path, chunk.content))
            .then(() => cb())
            .catch(cb);
    },
});
