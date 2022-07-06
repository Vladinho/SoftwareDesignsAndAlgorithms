interface IPoint {
  x: number;
  y: number;
  toString: () => string;
  distance: ((point?: Point) => number) | ((x: number, y: number) => number);
}

export class Point implements IPoint {
  constructor (public x: number = 0, public y: number = 0) {}
  toString = () => `(${this.x}, ${this.y})`;
  distance = (...args): number => {
    switch (args.length) {
      case 1: return this.getDistanceBetweenPoints(args[0]);
      case 2: return this.getDistanceBetweenPoints(new Point(args[0], args[1]));
      default: return this.getDistanceBetweenPoints(new Point());
    }
  }
  private roundToTwo(num: number): number {
    return Math.round(num * 100) / 100
  }
  private getDistanceBetweenPoints = (endPoint: Point): number => {
    const y = endPoint.x - this.x;
    const x = endPoint.y - this.y;
    return this.roundToTwo(Math.sqrt(x * x + y * y));
  }
}
