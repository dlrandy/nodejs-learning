import { CancelError } from './cancelError.mjs';

export const createCancelWrapper = () => {
    let cancelRequest = false;

    function cancel() {
        cancelRequest = true;
    }

    function cancelWrapper(func, ...args) {
        if (cancelRequest) {
            return Promise.reject(new CancelError());
        }

        return func(...args);
    }

    return { cancelWrapper, cancel };
};
