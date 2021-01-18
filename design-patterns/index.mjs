/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
//  call的控制流模式
//  sequential
{
    const tasks = [];
    function iterate(index) {
        if (index === tasks.length) {
            console.log('finish');
            return;
        }
        const task = tasks[index];
        task((err) => {
            if (err) {
                throw err;
            }
            iterate(index + 1);
        });
    }

    iterate(0);
}
//  concurrent
{
    const tasks = [];
    let completed = 0;
    tasks.forEach((task) => {
        task(() => {
            if (++completed === tasks.length) {
                return console.log('finished');
            }
        });
    });
}
//  limited concurrent
{
    const tasks = [];
    const concurrency = 3;
    let running = 0;

    function next() {
        if (tasks.length === 0) {
            console.log('finish');
            return;
        }
        while (running < concurrency && tasks.length) {
            const task = tasks.shift();
            task(() => {
                running--;
                setTimeout(() => {
                    next();
                }, 0);
            });
            running++;
        }
    }

    next();
}

// promise的控制流模式;
//  sequential
// forawait/forEach/forOf/
{
    const tasks = [];
    let promise = Promise.resolve();
    let completed = 0;
    for (const task of tasks) {
        promise = promise.then(() =>
            task((err) => {
                if (++completed === tasks.length) {
                    return console.log('finish');
                }
                if (err) {
                    return console.error(err);
                }
            })
        );
    }
}

// reduce
{
    const tasks = [];
    const promise = tasks.reduce(
        (prev, task) => prev.then(() => task()),
        Promise.resolve
    );
}
//  concurrent
// map+all
{
    const tasks = [];
    const promises = tasks.map((t) => t());
    Promise.all(promises).then((responses) => console.log(responses));
}

//  limited concurrent
{
    class TaskQueue {
        constructor(concurrency) {
            this.queue = [];
            this.concurrency = concurrency;
            this.running = 0;
        }

        runTask(task) {
            return new Promise((resolve, reject) => {
                this.queue.push(() => task().then(resolve, reject));
                process.nextTick(this.next.bind(this));
            });
        }

        next() {
            while (this.running < this.concurrency && this.queue.length) {
                const task = this.queue.shift();
                task().finally(() => {
                    this.running--;
                    this.next();
                });
                this.running++;
            }
        }
    }
}

// async / await的控制流模式;
//  sequential
{
    async function sequential(tasks) {
        for (const task of tasks) {
            await task();
        }
    }
}

//  concurrent
{
    async function concurrent(tasks) {
        const promises = tasks.map((t) => t());
        await Promise.all(promises);
    }
}
//  limited concurrent

{
    class TaskQueue {
        constructor(concurrency) {
            this.queue = [];
            this.consumerQueue = [];
            for (let i = 0; i < concurrency; i++) {
                this.consumer();
            }
        }

        async consumer() {
            while (true) {
                try {
                    const task = await this.getNextTask();
                    await task();
                } catch (err) {
                    console.error(err);
                }
            }
        }

        async getNextTask() {
            return new Promise((resolve) => {
                if (this.queue.length !== 0) {
                    return resolve(this.queue.shift());
                }
                this.consumerQueue.push(resolve);
            });
        }

        runTask(task) {
            //producer
            return new Promise((resolve, reject) => {
                const taskWrapper = () => {
                    const taskPromise = task();
                    taskPromise.then(resolve, reject);
                    return taskPromise;
                };

                if (this.consumerQueue.length !== 0) {
                    const consumer = this.consumerQueue.shift();
                    consumer(taskWrapper);
                } else {
                    this.queue.push(taskWrapper);
                }
            });
        }
    }
}
