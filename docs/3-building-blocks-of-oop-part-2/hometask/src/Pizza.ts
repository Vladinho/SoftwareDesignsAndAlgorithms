import { Consumable } from './Consumable';

interface IPizzaProps {
  numberOfSlices: number;
  spoiled: boolean;
}

export class Pizza extends Consumable {
  private numberOfSlices: number;
  private slicesEaten: number = 0;
  constructor ({ numberOfSlices, spoiled }: IPizzaProps) {
    super({
      name: 'Pizza',
      value: 300,
      weight: 500,
      spoiled
    });
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