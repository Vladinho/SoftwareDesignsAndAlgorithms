import { Consumable } from './Consumable';

export class Pizza extends Consumable {
  private numberOfSlices: number;
  private slicesEaten: number = 0;
  constructor (numberOfSlices: number, spoiled: boolean) {
    super('Pizza', 300, 500, spoiled);
    this.numberOfSlices = numberOfSlices;
  }

  public eat = () => {
    if (this.slicesEaten < this.numberOfSlices) {
      this.slicesEaten++;
      return `You eat a slice of ${this.name}.`;
    } else {
      this.setConsumed(true);
    }
    return ''
  }
}