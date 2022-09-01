export type Task = () => void;

export interface INode {
  task: Task;
  next: INode | null;
}

export interface ITask {
  task: Task;
  priority: number;
}

export interface IQueue {
  rootNode: INode | null;
  lastNode: INode | null;
  addTask: (task: Task) => void;
  takeNode: () => INode | null;
}

export interface IPriorityQueue {
  addTasks: (tasks: ITask[]) => void;
}
