export type Task = () => void;

export interface INode {
  task: Task;
  next: INode | null;
}

export interface ITask {
  task: Task;
  priority: number;
}
