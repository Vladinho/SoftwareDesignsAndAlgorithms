import { INode, IQueue, Task } from './types';

export class Queue implements IQueue {
  rootNode = null;
  lastNode = null;
  addTask = (task) => {
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
  takeNode = () => {
    const node = this.rootNode;
    this.rootNode = this.rootNode?.next || null;

    if (!this.rootNode) {
      this.lastNode = null;
    }
    return node;
  }
}
