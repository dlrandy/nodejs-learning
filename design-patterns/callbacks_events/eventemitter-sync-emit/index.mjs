/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { readFileSync } from 'fs';
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
        this.files.forEach((file) => {
            let content;
            try {
                content = readFileSync(join(__dirname, file), 'utf-8');
            } catch (error) {
                return this.emit('error', error);
            }

            this.emit('filtered', file);
            const match = content.match(this.regex);
            if (match) {
                match.forEach((element) => {
                    this.emit('found', file, element);
                });
            }
        });

        return this;
    }
}

const findRegex = new FindRegexClass(/hello/g);
findRegex
    .addFile('invalid.json')
    .addFile('valid.json')
    .on('filtered', (file) => console.log(`${file} was read`))
    .find()
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', (err) => console.error(`Error emitted ${err.message}`));
