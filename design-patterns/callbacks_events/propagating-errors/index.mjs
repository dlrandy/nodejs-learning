/* eslint-disable no-shadow */
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readJSON(filename, callback) {
    readFile(join(__dirname, filename), 'utf-8', (err, data) => {
        let parsed;
        if (err) {
            return callback(err);
        }
        try {
            parsed = JSON.parse(data);
        } catch (err) {
            return callback(err);
        }
        callback(null, parsed);
    });
}

const cb = (err, data) => {
    if (err) {
        return console.error(err, '---');
    }
    console.log(data);
};
// readJSON('valid.json', cb);
readJSON('invalid.json', cb);
