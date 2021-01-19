import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { JsonConfig } from './jsonConfig.mjs';
import { IniConfig } from './iniConfig.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
    const iniConfig = new IniConfig();
    await iniConfig.load(join(__dirname, 'samples', 'conf.ini'));
    iniConfig.set('book.nodejs', 'design patterns');
    await iniConfig.save(join(__dirname, 'samples', 'conf_mod.ini'));

    const jsonConfig = new JsonConfig();
    await jsonConfig.load(join(__dirname, 'samples', 'conf.json'));
    jsonConfig.set('book.nodejs', 'design patterns');
    await jsonConfig.save(join(__dirname, 'samples', 'conf_mod.json'));
}

main();
