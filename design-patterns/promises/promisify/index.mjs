import { randomBytes } from 'crypto';

function promisify(callbackBasedApi) {
    return function promisified(...args) {
        return new Promise((resolve, reject) => {
            const newArgs = [
                ...args,
                // eslint-disable-next-line consistent-return
                function (err, res) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(res);
                },
            ];

            callbackBasedApi(...newArgs);
        });
    };
}

const randomBytesP = promisify(randomBytes);
randomBytesP(32).then((buffer) =>
    console.log(`Random bytes: ${buffer.toString()}`)
);
