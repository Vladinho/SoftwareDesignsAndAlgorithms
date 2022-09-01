import { Queue } from './queue';
import { IPriorityQueue, Task } from './types';

export class PriorityQueue implements IPriorityQueue {
  private TIME_DELAY = 100;
  private queues: {
    [key: number]: Queue
  } = {};
  private runId = 0;
  addTasks = (tasks) => {
    tasks.forEach(({ task, priority }) => this.addTask(task, priority));
    setTimeout(this.run);
  }
  private addTask = (task: Task, priority: number) => {
    if (this.queues[priority]) {
      this.queues[priority].addTask(task);
    } else {
      const q = new Queue();
      q.addTask(task);
      this.queues[priority] = q;
    }
  }
  private run = async () => {
    const runId = this.runId + 1;
    this.runId = runId;
    const arr = Object.keys(this.queues).sort((a, b) => +a - +b);
    for await (const priority of arr) {
        while (this.queues[priority].lastNode && this.runId === runId) {
          await new Promise((res) => {
            setTimeout(() => {
              if (this.runId !== runId) {
                return;
              }
              this.queues[priority].takeNode()?.task();
              res()
            }, this.TIME_DELAY)
          })
        }
    }
  }
}
