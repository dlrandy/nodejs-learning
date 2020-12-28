/* eslint-disable no-underscore-dangle */
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cache = new Map();

function iconsistenRead(filename, cb) {
    if (cache.has(filename)) {
        process.nextTick(() => cb(cache.get(filename)));
    } else {
        console.log(__dirname);
        readFile(join(__dirname, filename), 'utf-8', (err, data) => {
            cache.set(filename, data);
            cb(data);
        });
    }
}
function createFileReader(filename) {
    const listeners = [];
    iconsistenRead(filename, (value) => {
        listeners.forEach((listener) => listener(value));
    });

    return {
        onDataReady: (listener) => listeners.push(listener),
    };
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady((data) => {
    console.log(`First call data: ${data}`);
    const reader2 = createFileReader('data.txt');
    reader2.onDataReady((data2) => {
        console.log(`Second call data: ${data2}`);
    });
});
