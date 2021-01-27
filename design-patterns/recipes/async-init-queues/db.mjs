/* eslint-disable consistent-return */
import { EventEmitter } from 'events';

class DB extends EventEmitter {
    constructor() {
        super();

        this.connected = false;
        this.commandQueue = [];
    }

    async query(queryString) {
        if (!this.connected) {
            console.log(`Request queued: ${queryString}`);

            return new Promise((resolve, reject) => {
                const command = () => {
                    this.query(queryString).then(resolve, reject);
                };
                this.commandQueue.push(command);
            });
        }
        console.log(`Query executed: ${queryString}`);
    }

    connect() {
        setTimeout(() => {
            this.connected = true;
            this.emit('connected');
            this.commandQueue.forEach((command) => command());
            this.commandQueue = [];
        }, 500);
    }
}

export const db = new DB();
