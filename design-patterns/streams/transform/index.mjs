import { ReplaceStream } from './replace-stream.mjs';

const replaceStream = new ReplaceStream('World', 'Nodejs');
replaceStream.on('data', (chunk) => console.log(chunk.toString()));

replaceStream.write('Hello W');
replaceStream.write('orld!');
replaceStream.end();
