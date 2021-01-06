/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { promisify } from 'util';
import { urlToFilename, getPageLinks } from './utils.mjs';

const mkdirpPromises = promisify(mkdirp);
async function download(url, filename) {
    console.log(`Download ${url}`);
    const { text: content } = await superagent.get(url);

    await mkdirpPromises(dirname(filename));

    await fsPromises.writeFile(filename, content);

    console.log(`Downloaded and saved: ${url}`);
    return content;
}

async function spiderLinks(currentUrl, content, nesting) {
    let promise;
    if (nesting === 0) {
        return promise;
    }
    const links = getPageLinks(currentUrl, content);
    for (const link of links) {
        // eslint-disable-next-line no-use-before-define
        promise = await spider(link, nesting - 1);
    }
    return promise;
}

export const spider = async (url, nesting) => {
    const filename = urlToFilename(url);
    let content;
    try {
        content = await fsPromises.readFile(filename, 'utf-8');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
        content = await download(url, filename);
    }
    return spiderLinks(url, content, nesting);
};
