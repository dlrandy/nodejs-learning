/* eslint-disable no-plusplus */
class Logger {
    constructor(name) {
        this.name = name;
        this.count = 0;
    }

    log(message) {
        this.count++;
        console.log(`[${this.name}] ${message}`);
    }

    info(message) {
        this.log(`info: ${message}`);
    }

    verbose(message) {
        this.log(`verbose: ${message}`);
    }
}

module.exports = new Logger('DEFAULT');
module.exports.Logger = Logger;
