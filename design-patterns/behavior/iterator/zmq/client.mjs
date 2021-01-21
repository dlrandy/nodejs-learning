import zeromq from 'zeromq';
import MiddlewareManager from './middlewareManager.mjs';
import { jsonMiddleware } from './jsonMiddleware.mjs';
import { zlibMiddleware } from './zlibMiddleware.mjs';

async function main() {
    const socket = new zeromq.Request();
    await socket.connect('tcp://127.0.0.1:5000');
    const zmqm = new MiddlewareManager(socket);
    zmqm.use(zlibMiddleware());
    zmqm.use(jsonMiddleware());
    zmqm.use({
        inbound(message) {
            console.log('Echoed back', message);
            return message;
        },
    });

    setInterval(() => {
        zmqm.send({ action: 'ping', echo: Date.now() }).catch((err) =>
            console.error(err)
        );
    }, 1000);

    console.log('Client connected');
}

main();
