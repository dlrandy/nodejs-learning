/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { EventEmitter } from 'events';

const __dirname = dirname(fileURLToPath(import.meta.url));

function findRegex(files, regex) {
    const emitter = new EventEmitter();
    files.forEach((file) =>
        readFile(join(__dirname, file), 'utf-8', (err, data) => {
            if (err) {
                return emitter.emit('error', err);
            }
            emitter.emit('filtered', file);
            const match = data.match(regex);
            if (match) {
                match.forEach((element) => {
                    emitter.emit('found', file, element);
                });
            }
        })
    );
    return emitter;
}

findRegex(['invalid.json', 'valid.json'], /hello/g)
    .on('filtered', (file) => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', (err) => console.error(`Error emitted ${err.message}`));
