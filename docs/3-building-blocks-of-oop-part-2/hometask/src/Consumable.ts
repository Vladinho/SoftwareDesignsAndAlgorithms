import { Item } from './Item';

interface IConsumable {
  use: () => string;
}

export class Consumable extends Item implements IConsumable {
  private isSpoiled: boolean
  private isConsumed: boolean

  constructor (name: string, value: number, weight: number, private spoiled: boolean) {
    super(name, value, weight);
    this.isSpoiled = spoiled;
  }

  public use = () => {
    if (this.isConsumed) {
      return `There is nothing left of the ${this.name} to consume.`;
    }
    if (this.isSpoiled) {
      return `${this.eat()}\nYou feel sick.`
    }
    return this.eat();
  };
  protected eat = () => {
    this.setConsumed(true);
    return `You eat the ${this.name}.`
  };
  protected setConsumed = (consumed: boolean) => this.isConsumed = consumed;
}
