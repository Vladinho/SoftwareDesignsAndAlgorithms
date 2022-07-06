interface IPoint {
  x: number;
  y: number;
  toString: () => string;
  distance: ((point?: Point) => number) | ((x: number, y: number) => number);
}

export class Point implements IPoint {
  constructor (public x: number = 0, public y: number = 0) {}
  toString = () => `(${this.x}, ${this.y})`;
  distance = (...args) => {
    switch (args.length) {
      case 1: return this.getDistanceBetweenPoints(args[0]);
      case 2: return this.getDistanceBetweenPoints(new Point(args[0], args[1]));
      default: return this.getDistanceBetweenPoints(new Point());
    }
  }
  private getDistanceBetweenPoints = (endPoint: Point) => {
    const y = endPoint.x - this.x;
    const x = endPoint.y - this.y;
    return Math.sqrt(x * x + y * y);
  }
}
