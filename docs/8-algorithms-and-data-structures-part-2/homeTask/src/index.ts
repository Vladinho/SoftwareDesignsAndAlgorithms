import { PriorityQueue } from './priorityQueue';
import { ITask } from './types';

const MAX_PRIORITY = 100000000;
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
