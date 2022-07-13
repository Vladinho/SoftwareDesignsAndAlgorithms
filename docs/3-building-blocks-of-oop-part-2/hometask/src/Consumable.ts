import { IItemProps, Item } from './Item';

interface IConsumable {
  use: () => string;
}

interface IConsumableProps extends IItemProps {
  spoiled: boolean
}

export class Consumable extends Item implements IConsumable {
  private isSpoiled: boolean
  private isConsumed: boolean

  constructor ({name, value, weight, spoiled}: IConsumableProps) {
    super({name, value, weight});
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
