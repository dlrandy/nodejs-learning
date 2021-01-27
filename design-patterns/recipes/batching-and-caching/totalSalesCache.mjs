import { totalSales as totalSalesRaw } from './totalSales.mjs';

const CACHE_TTL = 20 * 1000;

const cache = new Map();

export const totalSales = (product) => {
    if (cache.has(product)) {
        console.log('Cache hit');
        return cache.get(product);
    }

    const resultPromise = totalSalesRaw(product);
    cache.set(product, resultPromise);
    resultPromise
        .then(() => {
            setTimeout(() => {
                cache.delete(product);
            }, CACHE_TTL);
        })
        .catch((err) => {
            cache.delete(product);
            throw err;
        });

    return resultPromise;
};
