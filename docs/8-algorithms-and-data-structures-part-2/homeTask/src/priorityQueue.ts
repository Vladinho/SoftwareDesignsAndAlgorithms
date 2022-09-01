import { Queue } from './queue';
import { ITask, Task } from './types';

export class PriorityQueue {
  private queues: {
    [key: number]: Queue
  } = {};
  addTasks = (tasks: ITask[]) => {
    tasks.forEach(({ task, priority }) => this.addTask(task, priority));
    this.run();
  }
  private addTask = (task: Task, priority) => {
    if (this.queues[priority]) {
      this.queues[priority].addTask(task);
    } else {
      const q = new Queue();
      q.addTask(task);
      this.queues[priority] = q;
    }
  }
  private run = () => {
    Object.keys(this.queues)
      .sort((a, b) => +a - +b)
      .forEach((priority) => {
        while (this.queues[priority].lastNode) {
          const task = this.queues[priority].takeNode()?.task;
          task && setTimeout(task)
        }
      })
  }
}
