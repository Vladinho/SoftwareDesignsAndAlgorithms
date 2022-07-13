import { Item } from './Item';
import { Comparator } from './Comparator';

export interface ItemComparator extends Comparator<Item> {
    compare(first: Item, second: Item): number;
}

export class BaseComparator {
    public compareTwoValues = <T>(first: T, second: T): (1 | 0 | -1) => {
        if (first > second) {
            return -1;
        } else if (first === second) {
            return 0;
        } else {
            return 1;
        }
    }
}
