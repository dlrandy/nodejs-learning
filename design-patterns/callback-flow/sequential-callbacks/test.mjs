function asyncOperation(cb) {
    process.nextTick(cb);
}

function task3(cb) {
    asyncOperation(() => cb());
}
function task2(cb) {
    asyncOperation(() => task3(cb));
}

function task1(cb) {
    asyncOperation(() => task2(cb));
}
task1(() => {
    console.log('tasks 1, 2 and 3 executed');
});
