/* eslint-disable no-underscore-dangle */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Config } from './config.mjs';
import { jsonStrategy, iniStrategy } from './strategies.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
    const iniConfig = new Config(iniStrategy);
    await iniConfig.load(join(__dirname, 'samples', 'conf.ini'));
    iniConfig.set('book.nodejs', 'design patterns');
    await iniConfig.save(join(__dirname, 'samples', 'conf_mod.ini'));

    const jsonConfig = new Config(jsonStrategy);
    await jsonConfig.load(join(__dirname, 'samples', 'conf.json'));
    jsonConfig.set('book.nodejs', 'design patterns');
    await jsonConfig.save(join(__dirname, 'samples', 'conf_mod.json'));
}

main();
