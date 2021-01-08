/* eslint-disable no-underscore-dangle */
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import split from 'split';
import superagent from 'superagent';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ParallelStream } from './parallel-stream.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
pipeline(
    createReadStream(process.argv[2]),
    split(),
    new ParallelStream(4, async (url, enc, push, done) => {
        if (!url) {
            return done();
        }
        try {
            await superagent.head(url, { timeout: 5 * 1000 });
            push(`${url} is up \n`);
        } catch (err) {
            push(`${url} is down ]\n`);
        }
        done();
    }),
    createWriteStream(join(__dirname, 'results.txt')),
    (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log('All urls have been checked');
    }
);
