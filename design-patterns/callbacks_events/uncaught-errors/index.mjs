/* eslint-disable no-shadow */
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readJSONThrows(filename, callback) {
    readFile(join(__dirname, filename), 'utf-8', (err, data) => {
        if (err) {
            return callback(err);
        }
        const parsed = JSON.parse(data);
        return callback(null, parsed);
    });
}

const cb = (err, data) => {
    if (err) {
        return console.error(err, '---');
    }
    console.log(data);
};

try {
    readJSONThrows('invalid.json', cb);
} catch (err) {
    console.log('This will NOT catch the JSON parsing exception');
}

process.on('uncaughtException', (err) => {
    console.error(
        `This will catch at last the JSON parsing exception: ${err.message}`
    );

    process.exit();
});
