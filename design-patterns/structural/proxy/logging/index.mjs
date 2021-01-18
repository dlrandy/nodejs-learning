import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createLoggingWritable } from './writable.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const writable = createWriteStream(join(__dirname, 'test.txt'));
const writableProxy = createLoggingWritable(writable);

writableProxy.write('First chunk \n');
writableProxy.write('Second chunk \n');
writable.write('This is not logged \n');
writableProxy.end();
