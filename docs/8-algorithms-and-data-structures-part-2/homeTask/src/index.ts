import { PriorityQueue } from './priorityQueue';
import { ITask } from './types';

const MAX_PRIORITY = 1000;
const pq = new PriorityQueue();
const tasks: ITask[] = [];

for(let i = 0; i < 10000; i++) {
  const priority = Math.floor(Math.random() * MAX_PRIORITY) + 1;
  tasks.push({
    priority,
    task: () => console.log(`priority is ${priority}`)
  })
}

pq.addTasks(tasks);

setTimeout(() => {
  const tasks2 = []
  for(let i = 0; i < 1000; i++) {
    const priority = Math.floor(Math.random() * MAX_PRIORITY) + 1;
    tasks2.push({
      priority,
      task: () => console.log(`priority is ${priority}`)
    })
  }
  console.log('new jobs are added into queue !!!');
  pq.addTasks(tasks2);
}, 3000)
