/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.mjs';

function saveFile(filename, contents, cb) {
    mkdirp(path.dirname(filename), (err) => {
        if (err) {
            return cb(err);
        }
        fs.writeFile(filename, contents, cb);
    });
}

function download(url, filename, cb) {
    console.log(`Downloading ${url} into ${filename}`);
    superagent.get(url).end((err, res) => {
        if (err) {
            return cb(err);
        }
        saveFile(filename, res.text, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, res.text);
        });
    });
}

export const spider = (url, cb) => {
    const filename = urlToFilename(url);
    fs.access(filename, (err) => {
        if (!err || err.code !== 'ENOENT') {
            return cb(null, filename, false);
        }
        download(url, filename, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, filename, true);
        });
    });
};
