import { once } from 'events';
import { db } from './db.mjs';

async function initialize() {
    db.connect();
    await once(db, 'connected');
}

async function updateLatestAccess() {
    await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`);
    console.log('query done');
}

initialize().then(() => {
    updateLatestAccess();

    setTimeout(() => {
        updateLatestAccess();
    }, 600);
});
