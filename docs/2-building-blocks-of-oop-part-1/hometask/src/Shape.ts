import { Point } from './Point';

export abstract class Shape {
    private MIN_POINTS_NUMBER = 3;
    constructor (
      private points: [Point, Point, ...Point[]],
      protected color: string = 'green',
      protected filled: boolean = true,
      ) {
        if (this.MIN_POINTS_NUMBER > this.points.length) {
            throw new Error();
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
