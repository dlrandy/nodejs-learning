/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import CheckUrls from './checkUrls.mjs';

async function main() {
    const checkUrls = new CheckUrls([
        'https://nodejsdesignpatterns.com',
        'https://example.com',
        'https://mustbedownforsurehopefully.com',
    ]);

    for await (const status of checkUrls) {
        console.log(status);
    }
}

main();
