import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { basename, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createDecipheriv, randomBytes } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const secret = randomBytes(24);
console.log(`Generated secret: ${secret.toString('hex')}`);

const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename']);
    const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex');
    const destFilename = join(__dirname, 'received_files', filename);
    console.log(`file request received: ${filename}`);
    req.pipe(createDecipheriv('aes192', secret, iv))
        .pipe(createGunzip())
        .pipe(createWriteStream(destFilename))
        .on('finish', () => {
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('ok\n');
            console.log(`File saved: ${destFilename}`);
        })
        .on('error', (err) => {
            console.log(err, '--------++++++----');
        });
});

server.listen(3000, () => console.log('Listening on http://localhost:3000'));
