import { Shape } from './Shape';
import { Point } from './Point';

export class Triangle extends Shape {
  constructor (private p1: Point, private p2: Point, private p3: Point, color?: string, filled?: boolean) {
    super([p1, p2, p3], color, filled);
  }
  getType (): string {
    return `${this.defineType()} triangle`;
  }
  toString = (): string => {
    return `Triangle[v1=(${this.p1.x}, ${this.p1.y}),v2=(${this.p2.x}, ${this.p2.y}),v3=(${this.p3.x}, ${this.p3.y})]`
  }
  private defineType = (): string => {
    const sides = [this.p1, this.p2, this.p3]
      .map((cur, index, arr) =>
        cur.distance(arr[index === arr.length - 1 ? 0 : index + 1]));
    const sameSidesCount = sides.length + 1 - new Set(sides).size;
    switch (sameSidesCount) {
      case 3: return 'equilateral';
      case 2: return 'isosceles';
      default: return 'scalene';
    }
  }
}
