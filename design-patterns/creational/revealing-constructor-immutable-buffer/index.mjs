import { ImmutableBuffer } from './immutableBuffer.mjs';

const hello = 'Hello!';

const immutable = new ImmutableBuffer(hello.length, ({ write }) => {
    write(hello);
});

console.log(String.fromCharCode(immutable.readInt8(0)));
