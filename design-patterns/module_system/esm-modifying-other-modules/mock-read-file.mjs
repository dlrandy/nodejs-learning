import fs from 'fs';

const originalReadFile = fs.readFile;

let mockedResponse = null;

function mockedReadFile(path, cb) {
    setImmediate(() => cb(null, mockedResponse));
}

export const mockEnable = (responseWith) => {
    mockedResponse = responseWith;
    fs.readFile = mockedReadFile;
};

export const mockDisable = () => {
    fs.readFile = originalReadFile;
};
