/* eslint-disable no-restricted-syntax */
import split from 'split2';

async function main() {
    const stream = process.stdin.pipe(split());
    for await (const line of stream) {
        console.log(`you wrote: ${line}`);
    }
}

main();
