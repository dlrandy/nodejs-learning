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

function finish() {
    console.log('All tasks executed');
}

tasks.forEach((task) => {
    task(() => {
        if (++completed === tasks.length) {
            finish();
        }
    });
});
