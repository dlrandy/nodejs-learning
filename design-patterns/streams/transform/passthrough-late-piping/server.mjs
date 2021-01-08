import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { basename, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename']);
    const destFilename = join(__dirname, 'received_files', filename);

    console.log(`File request received: ${filename}`);

    req.pipe(createWriteStream(destFilename)).on('finish', () => {
        res.writeHead(201, { 'Content-Type': 'text/plain' });
        res.end('ok\n');
        console.log(`File saved: ${destFilename}`);
    });
});

server.listen(3000, () => console.log('Listening on http://localhost:3000'));
