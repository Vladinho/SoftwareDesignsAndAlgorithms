import { Item } from './Item';
import { BaseComparator, ItemComparator } from './ItemComparator';

export class ItemWeightComparator extends BaseComparator implements ItemComparator {
    public compare(first: Item, second: Item) {
        const firstWeight = first.getWeight();
        const secondWeight = second.getWeight();
        return this.compareTwoValues(firstWeight, secondWeight);
    }
}
