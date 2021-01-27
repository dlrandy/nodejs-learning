import { totalSales as totalSalesRaw } from './totalSales.mjs';

const runningRequests = new Map();

export const totalSales = (product) => {
    if (runningRequests.has(product)) {
        console.log('Batching');
        return runningRequests.get(product);
    }

    const resultPromise = totalSalesRaw(product);
    runningRequests.set(product, resultPromise);
    resultPromise.finally(() => {
        runningRequests.delete(product);
    });

    return resultPromise;
};
