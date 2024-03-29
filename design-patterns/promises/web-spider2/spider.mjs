import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirpPromises from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.mjs';
import { promisify } from 'util';

// const mkdirpPromises = promisify(mkdirp);
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
    for (const link of links) {
        promise = promise.then(() => spider(link, nesting - 1));
    }
    return promise;
}

export const spider = (url, nesting) => {
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
