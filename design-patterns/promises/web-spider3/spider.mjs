/* eslint-disable no-use-before-define */
import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.mjs';
import { promisify } from 'util';

const mkdirpPromises = promisify(mkdirp);
function download(url, filename) {
    console.log(`Download ${url}`);
    let content;
    return superagent
        .get(url)
        .then((res) => {
            content = res.text;
            return mkdirpPromises(dirname(filename));
        })
        .then(() => fsPromises.writeFile(filename, content))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`);
            return content;
        });
}

function spiderLinks(currentUrl, content, nesting) {
    let promise = Promise.resolve();
    if (nesting === 0) {
        return promise;
    }
    const links = getPageLinks(currentUrl, content);

    promise = Promise.all(links.map((link) => spider(link, nesting - 1)));
    return promise;
}

const spidering = new Set();

export const spider = (url, nesting) => {
    if (spidering.has(url)) {
        return Promise.resolve();
    }
    spidering.add(url);
    const filename = urlToFilename(url);
    return fsPromises
        .readFile(filename, 'utf-8')
        .catch((err) => {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            return download(url, filename);
        })
        .then((content) => spiderLinks(url, content, nesting));
};
