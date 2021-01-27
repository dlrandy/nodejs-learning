/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
/* eslint-disable consistent-return */
import { EventEmitter } from 'events';

const METHODS_REQUIRING_CONNECTION = ['query'];
const deactivate = Symbol('deactivate');

class InitializedState {
    async query(queryString) {
        console.log(`Query executed: ${queryString}`);
    }
}

class QueuingState {
    constructor(db) {
        this.db = db;
        this.commandQueue = [];

        METHODS_REQUIRING_CONNECTION.forEach((methodName) => {
            this[methodName] = function (...args) {
                console.log(`Command queued: ${methodName}, ${args}`);
                return new Promise((resolve, reject) => {
                    const command = () => {
                        db[methodName](...args).then(resolve, reject);
                    };
                    this.commandQueue.push(command);
                });
            };
        });
    }

    [deactivate]() {
        this.commandQueue.forEach((command) => command());
        this.commandQueue = [];
    }
}

class DB extends EventEmitter {
    constructor() {
        super();

        this.state = new QueuingState(this);
    }

    async query(queryString) {
        return this.state.query(queryString);
    }

    connect() {
        setTimeout(() => {
            this.connected = true;
            this.emit('connected');
            const oldState = this.state;
            this.state = new InitializedState(this);
            // eslint-disable-next-line no-unused-expressions
            oldState[deactivate] && oldState[deactivate]();
        }, 500);
    }
}

export const db = new DB();
