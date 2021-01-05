/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
function makeSampleTask(name) {
    return (cb) => {
        console.log(`${name} started`);
        setTimeout(() => {
            console.log(`${name} completed`);
            cb();
        }, Math.random() * 2000);
    };
}

const tasks = [
    makeSampleTask('Task 1'),
    makeSampleTask('Task 2'),
    makeSampleTask('Task 3'),
    makeSampleTask('Task 4'),
];

let completed = 0;
const concurrency = 2;
let running = 0;
let index = 0;

function finish() {
    console.log('All tasks executed');
}

function next() {
    while (running < concurrency && index < tasks.length) {
        const task = tasks[index++];
        task(() => {
            if (++completed === tasks.length) {
                return finish();
            }
            running--;
            next();
        });
        running++;
    }
}

next();
