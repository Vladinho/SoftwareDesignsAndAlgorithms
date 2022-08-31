import { IDijkstra, Node, Path, WeightedGraph } from './types';
import { IGraph } from './graph';

export class Dijkstra implements IDijkstra<string> {
  constructor (private graph: IGraph) {}
  private findAllPaths(vertex1: string, vertex2: string): Path[] {
    const vertexes = Object.values(this.graph.vertexes)
      .reduce<{[key: string]: number}>((acc, cur) => {
      return { ...acc, [cur.key]: Infinity, [vertex1]: 0 }
    }, {})
    const startNode = this.graph.vertexes[vertex1];
    const visited: {[key: string]: string} = {};
    const paths: Path[] = []
    const visit = (node: Node, path: Path) => {
      node.connections
        .map((c, index, arr) => {
          const distance = c.weight + path.distance;
          vertexes[c.neighbor.key] = vertexes[c.neighbor.key] > distance ? distance : vertexes[c.neighbor.key];
          if (index === arr.length - 1) {
            visited[node.key] = node.key;
          }
          const newPath = {distance, path: [...path.path, c.neighbor.key]}
          if (c.neighbor.key === vertex2) {
            paths.push(newPath);
            return null;
          }
          if (!visited[c.neighbor.key]) {
            return {newPath, node: c.neighbor};
          }
        }).forEach((opt) => {
          if (opt) {
            visit(opt.node, opt.newPath);
          }
      });
    }
    visit(startNode, {distance: 0, path: [startNode.key]});
    return paths;
  }
  findShortestPath(vertex1: string, vertex2: string): Path {
    const arr = this.findAllPaths(vertex1, vertex2);
    return arr.length ? arr.reduce((acc, cur) => (acc.distance < cur.distance) ? acc : cur) : { distance: Infinity, path: []}
  };
  findAllShortestPaths(vertex: string): Record<string, Path> {
    const paths: { [key: string]: Path } = {};
    let count = 0;
    this.graph.visitAllNodes((node, fromNode) => {
      if (node.key === vertex) {
        return
      }
      paths[`${count}`] = this.findShortestPath(vertex, node.key);
      count++;
    });
    return paths;
  };
}
