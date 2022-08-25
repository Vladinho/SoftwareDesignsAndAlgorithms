import { Node, WeightedGraph } from './types';

export interface IGraph extends WeightedGraph<string> {
  vertexes: { [key: string]: Node };
  enterNode: Node | null;
  visitAllNodes: (callback: (node: Node, fromNode: Node) => void, startNode?: Node) => void;
}

export class Graph implements IGraph {
  // private rootNode: null | Node;
  public vertexes: { [key: string]: Node } = {};
  public enterNode: Node | null = null;
  public addVertex = (key: string) => {
    const newNode = { key, connections: [] };
    if (!this.enterNode) {
      this.enterNode = newNode
    }
    this.vertexes[key] = newNode
  }
  public addEdge = (vertex1: string, vertex2: string, weight: number) => {
    const v1 = this.vertexes[vertex1];
    const v2 = this.vertexes[vertex2];
    if (!v1 || !v2) {
      return;
    }
    v1.connections.push({ neighbor: v2, weight });
    v2.connections.push({ neighbor: v1, weight });
  }

  public visitAllNodes = (callback: (node: Node, fromNode: Node) => void, startNode?: Node) => {
    const start = startNode || this.enterNode;
    if (!start) {
      return;
    }
    const visited: { [key: string]: string} = {};
    let prevNode: Node = start;
    const visit = (node: Node) => {
      visited[node.key] = node.key;
      callback(node, prevNode);
      prevNode = node;
      node.connections.forEach((c) => !visited[c.neighbor.key] && visit(c.neighbor));
    };
    visit(start);
  }
}
