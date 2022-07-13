import { Comparable } from './Comparable';
import { ItemValueComparator } from './ItemValueComparator';

let id = 0;

export interface IItemProps {
    name: string;
    value: number;
    weight: number;
}

interface IItem {
    toString: () => string;
}

export abstract class Item implements Comparable<Item>, IItem {
    private itemValueComparator = new ItemValueComparator();
    protected readonly id: number;
    protected value: number;
    protected name: string;
    protected weight: number;
    protected constructor ({ name, value, weight }: IItemProps) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.weight = weight;
        id++;
    }
    static reset = () => id = 0;
    public compareTo(item: Item): number {
        return this.itemValueComparator.compare(this, item);
    }
    public toString() {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight}`;
    }
    public getId = () => this.id;
    public getValue = () => this.value;
    public getName = () => this.name;
    public getWeight = () => this.weight;
    public setValue = (value: number) => this.value = value;
    public setName = (name: string) => this.name = name;
    public setWeight = (weight: number) => this.weight = weight;
    abstract use: () => string;
}
