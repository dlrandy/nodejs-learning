/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.mjs';

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

export const spider = (url, nesting, cb) => {
    const filename = urlToFilename(url);
    fs.readFile(filename, 'utf-8', (err, fileContent) => {
        if (err) {
            if (err.code !== 'ENOENT') {
                return cb(err);
            }
            return download(url, filename, (err, requestContent) => {
                if (err) {
                    return cb(err);
                }
                spiderLinks(url, requestContent, nesting, cb);
            });
        }

        spiderLinks(url, fileContent, nesting, cb);
    });
};

function spiderLinks(currentUrl, body, nesting, cb) {
    if (nesting === 0) {
        return process.nextTick(cb);
    }

    const links = getPageLinks(currentUrl, body);

    if (links.length === 0) {
        return process.nextTick(cb);
    }

    function iterate(index) {
        if (index === links.length) {
            return cb();
        }
        spider(links[index], nesting - 1, (err) => {
            if (err) {
                return cb(err);
            }
            iterate(index + 1);
        });
    }

    iterate(0);
}
