import zeromq from 'zeromq';
import MiddlewareManager from './middlewareManager.mjs';
import { jsonMiddleware } from './jsonMiddleware.mjs';
import { zlibMiddleware } from './zlibMiddleware.mjs';

async function main() {
    const socket = new zeromq.Reply();
    await socket.bind('tcp://127.0.0.1:5000');
    const zmqm = new MiddlewareManager(socket);
    zmqm.use(zlibMiddleware());
    zmqm.use(jsonMiddleware());
    zmqm.use({
        async inbound(message) {
            console.log('Received', message);
            if (message.action === 'ping') {
                await this.send({ action: 'pong', echo: message.echo });
            }
            return message;
        },
    });

    console.log('Server started');
}

main();
