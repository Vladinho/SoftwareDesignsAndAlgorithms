import { Item } from './Item';
import { BaseComparator, ItemComparator } from './ItemComparator';

export class ItemValueComparator extends BaseComparator implements ItemComparator {
  public compare(first: Item, second: Item) {
    return this.compareTwoValues(first.getValue(), second.getValue());
  }
}
