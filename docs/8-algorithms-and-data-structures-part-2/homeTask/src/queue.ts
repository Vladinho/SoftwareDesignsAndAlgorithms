import { INode, Task } from './types';

export class Queue {
  rootNode: INode | null = null;
  lastNode: INode | null = null;
  addTask = (task: Task) => {
    const node: INode = {
      task,
      next: null
    }
    if (this.lastNode) {
      this.lastNode.next = node;
      this.lastNode = node
    } else {
      this.rootNode = node;
      this.lastNode = node;
    }
  }
  takeNode = (): INode | null => {
    const node = this.rootNode;
    this.rootNode = this.rootNode?.next || null;

    if (!this.rootNode) {
      this.lastNode = null;
    }
    return node;
  }
}
