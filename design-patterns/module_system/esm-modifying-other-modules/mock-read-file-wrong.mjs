import * as fs from 'fs'; // module object, which has immutable properties

const originalReadFile = fs.readFile;

let mockedResponse = null;

function mockedReadFile(path, cb) {
    setImmediate(() => {
        cb(null, mockedResponse);
    });
}

export function mockEnable(respondWith) {
    mockedResponse = respondWith;
    fs.readFile = mockedReadFile;
}

export function mockDisable() {
    fs.readFile = originalReadFile;
}
