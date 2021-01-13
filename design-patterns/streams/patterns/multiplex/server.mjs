import { createWriteStream } from 'fs';
import { createServer } from 'net';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function demultiplexChannel(source, destinations) {
    let currentChannel = null;
    let currentLength = null;

    source
        .on('readable', () => {
            let chunk;
            if (currentChannel === null) {
                chunk = source.read(1);
                currentChannel = chunk && chunk.readUInt8(0);
            }

            if (currentLength === null) {
                chunk = source.read(4);
                currentLength = chunk && chunk.readUInt32BE(0);
                if (currentLength === null) {
                    return null;
                }
            }

            chunk = source.read(currentLength);
            if (chunk === null) {
                return null;
            }

            console.log(`Received packet from: ${currentChannel}`);
            destinations[currentChannel].write(chunk);
            currentChannel = null;
            currentLength = null;
        })
        .on('end', () => {
            destinations.forEach((destination) => destination.end());
            console.log('Source channel closed');
        });
}

const server = createServer((socket) => {
    const stdoutStream = createWriteStream(join(__dirname, 'stdout.log'));
    const stderrStream = createWriteStream(join(__dirname, 'stderr.log'));
    demultiplexChannel(socket, [stdoutStream, stderrStream]);
});

server.listen(3000, () => console.log('server started'));
