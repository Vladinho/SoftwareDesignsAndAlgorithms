import { Point } from './Point';

export abstract class Shape {
    private MIN_POINTS_NUMBER = 3;
    constructor (
      private points: Point[],
      protected color: string = 'green',
      protected filled: boolean = true,
      ) {
        if (this.MIN_POINTS_NUMBER > this.points.length) {
            throw new Error(`Min points number is ${this.MIN_POINTS_NUMBER}, but you have only ${this.points.length}.`);
        }
    }
    abstract getType(): string;
    toString = () => {
        const points = this.points.reduce((acc, cur, currentIndex) => {
            return currentIndex ? `${acc}, ${cur.toString()}` : cur.toString();
        }, '')
        return `A Shape with color of ${this.color} and ${this.filled ? '' : 'not '}filled. Points: ${points}.`
    }
    getPerimeter = (): number => {
        return this.points.reduce((acc, cur, currentIndex) => {
            return acc + (currentIndex ? cur.distance(this.points[currentIndex - 1]) : cur.distance(this.points[this.points.length - 1]));
        }, 0)
    }
}
