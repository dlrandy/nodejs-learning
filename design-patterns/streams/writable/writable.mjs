/* eslint-disable no-underscore-dangle */
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ToFileStream } from './to-file-stream.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tfs = new ToFileStream();
tfs.write({
    path: join(__dirname, 'files', 'file1.txt'),
    content: 'Hello',
});
tfs.write({
    path: join(__dirname, 'files', 'file2.txt'),
    content: 'Node.js',
});
tfs.write({
    path: join(__dirname, 'files', 'file3.txt'),
    content: 'streams',
});
tfs.end(() => console.log('All files created'));
