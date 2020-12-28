import glob from 'glob';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

glob(join(__dirname, 'data/*.txt'), (err, files) => {
    if (err) {
        return console.error(err);
    }
    console.log(`All files found: ${JSON.stringify(files)}`);
}).on('match', (match) => console.log(`Match found: ${match}`));
