/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cache = new Map();

function consistenRead(filename) {
    if (cache.has(filename)) {
        return cache.get(filename);
    }
    console.log(__dirname);
    const data = readFileSync(join(__dirname, filename), 'utf-8');

    cache.set(filename, data);
    return data;
}

const data = consistenRead('data.txt');

console.log(`First call data: ${data}`);
const data2 = consistenRead('data.txt');

console.log(`Second call data: ${data2}`);
