function delayError(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Error after ${milliseconds} ms`));
        }, milliseconds);
    });
}

async function playingWithErrors(throwSyncError) {
    try {
        if (throwSyncError) {
            throw new Error('this is a syncchronous error');
        }
        await delayError(1000);
    } catch (error) {
        console.error(`we have an error: ${error.message}`);
    } finally {
        console.log('Done');
    }
}

playingWithErrors(true);
playingWithErrors(false);
