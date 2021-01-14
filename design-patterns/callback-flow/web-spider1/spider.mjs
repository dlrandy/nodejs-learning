/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { fileURLToPath } from 'url';

import { urlToFilename } from './utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const spider = (url, cb) => {
    const filename = path.join(__dirname, urlToFilename(url));
    fs.access(filename, (err) => {
        if (err && err.code === 'ENOENT') {
            console.log(`Downloading ${url} into ${filename}`);
            superagent.get(url).end((err, res) => {
                if (err) {
                    cb(err);
                } else {
                    try {
                        mkdirp.sync(path.dirname(filename));

                        fs.writeFile(filename, res.text, (err) => {
                            if (err) {
                                cb(err);
                            } else {
                                cb(null, filename, true);
                            }
                        });
                    } catch (err) {
                        cb(err);
                    }
                }
            });
        } else {
            cb(null, filename, false);
        }
    });
};
