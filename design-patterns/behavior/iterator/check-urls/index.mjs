import superagent from 'superagent';

export default class CheckUrls {
    constructor(urls) {
        this.urls = urls;
    }

    [Symbol.asyncIterator]() {
        const urlsIterator = this.urls[Symbol.iterator]();

        return {
            async next() {
                const iteratorResult = urlsIterator.next();
                if (iteratorResult.done) {
                    return { done: true };
                }
                const url = iteratorResult.value;
                try {
                    const checkResult = await superagent.head(url).redirects();
                } catch (err) {}
            },
        };
    }
}
