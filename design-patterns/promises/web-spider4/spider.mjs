/* eslint-disable no-use-before-define */
import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { promisify } from 'util';
import { urlToFilename, getPageLinks } from './utils.mjs';
import { TaskQueue } from './TaskQueue.mjs';

// const mkdirp = promisify(mkdirp);
function download(url, filename) {
    console.log(`Download ${url}`);
    let content;
    return superagent
        .get(url)
        .then((res) => {
            content = res.text;
            return mkdirp(dirname(filename));
        })
        .then(() => fsPromises.writeFile(filename, content))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`);
            return content;
        });
}

function spiderLinks(currentUrl, content, nesting, queue) {
    let promise = Promise.resolve();
    if (nesting === 0) {
        return promise;
    }
    const links = getPageLinks(currentUrl, content);

    promise = Promise.all(
        links.map((link) => spiderTask(link, nesting - 1, queue))
    );
    return promise;
}

const spidering = new Set();

export const spiderTask = (url, nesting, queue) => {
    if (spidering.has(url)) {
        return Promise.resolve();
    }
    console.log(queue, 'queue');
    spidering.add(url);
    const filename = urlToFilename(url);
    return queue
        .runTask(() =>
            fsPromises.readFile(filename, 'utf-8').catch((err) => {
                if (err.code !== 'ENOENT') {
                    throw err;
                }
                return download(url, filename);
            })
        )
        .then((content) => spiderLinks(url, content, nesting, queue));
};

export const spider = (url, nesting, concurrency) => {
    const queue = new TaskQueue(concurrency);
    return spiderTask(url, nesting, queue);
};
