/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import path from 'path';

import { URL } from 'url';

import slug from 'slug';
import cheerio from 'cheerio';

function getLinkUrl(currentUrl, element) {
    const parsedLink = new URL(element.attribs.href || '', currentUrl);
    const currentParsedUrl = new URL(currentUrl);
    if (
        parsedLink.hostname !== currentParsedUrl.hostname ||
        !parsedLink.pathname
    ) {
        return null;
    }

    return parsedLink.toString();
}

export const urlToFilename = (url) => {
    const parsedUrl = new URL(url);
    const urlPath = parsedUrl.pathname
        .split('/')
        .filter((component) => component !== '')
        .map((component) => slug(component, { remove: null }))
        .join('/');
    let filename = path.join(parsedUrl.hostname, urlPath);
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html';
    }
    return filename;
};

export const getPageLinks = (currentUrl, body) => {
    return Array.from(cheerio.load(body)('a'))
        .map((element) => getLinkUrl(currentUrl, element))
        .filter(Boolean);
};
