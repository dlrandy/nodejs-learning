/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-await-in-loop */
import superagent from 'superagent';

export default class CheckUrls {
    constructor(urls) {
        this.urls = urls;
    }

    async *[Symbol.asyncIterator]() {
        for (const url of this.urls) {
            try {
                const checkResult = await superagent.head(url).redirects(2);
                yield `${url} is up, status: ${checkResult.status}`;
            } catch (err) {
                yield `${url} is down, error: ${err.message}`;
            }
        }
    }
}
