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
    try {
        mkdirp.sync(path.dirname(filename));

        fs.writeFile(filename, contents, cb);
    } catch (err) {
        return cb(err);
    }
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
            console.log(`Downloaded and saved: ${url}`);
            cb(null, res.text);
        });
    });
}

function spiderLinks(currentUrl, body, nesting, queue) {
    if (nesting === 0) {
        return;
    }

    const links = getPageLinks(currentUrl, body);

    if (links.length === 0) {
        return;
    }

    links.forEach((link) => spider(link, nesting - 1, queue));
}

export function spiderTask(url, nesting, queue, cb) {
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
                spiderLinks(url, requestContent, nesting, queue);
                return cb();
            });
        }

        spiderLinks(url, fileContent, nesting, queue);
        return cb();
    });
}

const spidering = new Set();

export function spider(url, nesting, queue) {
    if (spidering.has(url)) {
        return;
    }
    spidering.add(url);
    queue.pushTask((done) => spiderTask(url, nesting, queue, done));
}
