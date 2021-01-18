import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import level from 'level';
import { createFSAdapter } from './fs.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = level(join(__dirname, 'db'), {
    valueEncoding: 'binary',
});
const fs = createFSAdapter(db);

fs.writeFile('file.txt', 'Hello!', () => {
    fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
        if (err) {
            return console.error(err);
        }
        console.log(res);
    });
});

fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
    console.error(err);
});
