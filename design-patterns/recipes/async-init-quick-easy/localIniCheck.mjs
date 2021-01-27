import { once } from 'events';
import { db } from './db.mjs';

db.connect();

async function updateLatestAccess() {
    if (!db.connected) {
        await once(db, 'connected');
    }
    await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`);
}

updateLatestAccess();

setTimeout(() => {
    updateLatestAccess();
}, 600);
