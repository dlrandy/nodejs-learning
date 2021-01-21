import { inflateRaw, deflateRaw } from 'zlib';

import { promisify } from 'util';
import { Buffer } from 'buffer';

const inflateRawAsync = promisify(inflateRaw);
const deflateRawAsync = promisify(deflateRaw);

export const zlibMiddleware = function () {
    return {
        inbound(message) {
            return inflateRawAsync(Buffer.from(message));
        },
        outbound(message) {
            return deflateRawAsync(message);
        },
    };
};
