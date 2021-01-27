import { parentPort } from 'worker_threads';
import { SubsetSum } from '../subset-sum.mjs';

parentPort.on('message', (msg) => {
    const subsetSum = new SubsetSum(msg.sum, msg.set);

    subsetSum.on('match', (data) => {
        parentPort.postMessage({ event: 'match', data });
    });

    subsetSum.on('end', (data) => {
        parentPort.postMessage({ event: 'end', data });
    });

    subsetSum.start();
});
