/* eslint-disable consistent-return */
import { CancelError } from './cancelError.mjs';

export const createAsyncCancelable = (generatorFunc) => {
    return function asyncCancelable(...args) {
        const iterator = generatorFunc(...args);
        let cancelRequest = false;
        function cancel() {
            cancelRequest = true;
        }
        const promise = new Promise((resolve, reject) => {
            async function nextStep(prevResult) {
                if (cancelRequest) {
                    return reject(new CancelError());
                }
                if (prevResult.done) {
                    return resolve(prevResult.value);
                }
                try {
                    nextStep(iterator.next(await prevResult.value));
                } catch (err) {
                    try {
                        await nextStep(iterator.throw(err));
                    } catch (err2) {
                        reject(err2);
                    }
                }
            }

            nextStep({});
        });

        return {
            promise,
            cancel,
        };
    };
};
