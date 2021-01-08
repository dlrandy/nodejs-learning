import parallelTransform from 'parallel-transform';

/* eslint-disable no-underscore-dangle */
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import split from 'split';
import superagent from 'superagent';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
pipeline(
    createReadStream(process.argv[2]),
    split(),
    parallelTransform(4, async function (url, done) {
        if (!url) {
            return done();
        }
        try {
            await superagent.head(url, { timeout: 5 * 1000 });
            this.push(`${url} is up \n`);
        } catch (err) {
            this.push(`${url} is down ]\n`);
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
