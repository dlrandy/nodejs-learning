/* eslint-disable no-underscore-dangle */
import { createReadStream } from 'fs';
import parse from 'csv-parse';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { FilterByCountry } from './filter-by-country.mjs';
import { SumProfit } from './sum-profit.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvParser = parse({ columns: true });
createReadStream(join(__dirname, 'data.csv'))
    .pipe(csvParser)
    .pipe(new FilterByCountry('Italy'))
    .pipe(new SumProfit())
    .pipe(process.stdout);
