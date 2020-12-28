/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { EventEmitter } from 'events';

const __dirname = dirname(fileURLToPath(import.meta.url));

class FindRegexClass extends EventEmitter {
    constructor(regex) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFile(file) {
        this.files.push(file);
        return this;
    }

    find() {
        this.files.forEach((file) =>
            readFile(join(__dirname, file), 'utf-8', (err, data) => {
                if (err) {
                    return this.emit('error', err);
                }
                this.emit('filtered', file);
                const match = data.match(this.regex);
                if (match) {
                    match.forEach((element) => {
                        this.emit('found', file, element);
                    });
                }
            })
        );

        return this;
    }
}

const findRegex = new FindRegexClass(/hello/g);
findRegex
    .addFile('invalid.json')
    .addFile('valid.json')
    .find()
    .on('filtered', (file) => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', (err) => console.error(`Error emitted ${err.message}`));
