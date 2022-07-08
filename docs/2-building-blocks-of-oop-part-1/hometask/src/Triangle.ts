import { IShape, Shape } from './Shape';
import { Point } from './Point';

interface ITriangle extends IShape {
  getType: () => ('equilateral triangle' | 'isosceles triangle' | 'scalene triangle');
}

export class Triangle extends Shape implements  ITriangle {
  constructor (private p1: Point, private p2: Point, private p3: Point, color?: string, filled?: boolean) {
    super([p1, p2, p3], color, filled);
  }
  toString = () => {
    return `Triangle[v1=(${this.p1.x}, ${this.p1.y}),v2=(${this.p2.x}, ${this.p2.y}),v3=(${this.p3.x}, ${this.p3.y})]`
  }
  getType = () => {
    const sides = [this.p1, this.p2, this.p3]
      .map((cur, index, arr) =>
        cur.distance(arr[index === arr.length - 1 ? 0 : index + 1]));
    const sameSidesCount = sides.length + 1 - new Set(sides).size;
    switch (sameSidesCount) {
      case 3: return 'equilateral triangle';
      case 2: return 'isosceles triangle';
      default: return 'scalene triangle';
    }
  }
}
