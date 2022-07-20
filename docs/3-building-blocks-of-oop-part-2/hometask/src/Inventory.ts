import { Item } from './Item';
import { ItemComparator } from './ItemComparator';
import { ItemValueComparator } from './ItemValueComparator';

export class Inventory {
  private items: Item[];
  public addItem = (item: Item): void => {
    this.items.push(item);
  }
  public sort = (comparator: ItemComparator = new ItemValueComparator()): void => {
    this.items.sort(comparator.compare);
  }
  public toString = (): string => this.items.join(', ');
}
