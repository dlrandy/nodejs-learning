import { createPostStatusCmd } from './createPostStatusCmd.mjs';
import { statusUpdateService } from './statusUpdateService.mjs';
import { Invoker } from './invoker.mjs';

const invoker = new Invoker();
const command = createPostStatusCmd(statusUpdateService, 'HI!');
invoker.run(command);
invoker.undo();
invoker.delay(command, 1000 * 3);
invoker.runRemotely(command);
