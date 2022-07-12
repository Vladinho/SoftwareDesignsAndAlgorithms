import { Comparable } from './Comparable';

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
    protected readonly id;
    protected value;
    protected name;
    protected weight;
    protected constructor ({ name, value, weight }: IItemProps) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.weight = weight;
        id++;
    }

    static reset = () => id = 0;
    public compareTo({ weight }: Item): number {
        if (this.weight > weight) {
            return -1;
        } else if (this.weight === weight) {
            return 0;
        } else {
            return 1;
        }
    }
    public toString() {
        return `${this.name} − Value: ${this.value}, Weight: ${this.weight}`;
    }
    private getId = () => this.id;
    private getValue = () => this.value;
    private getName = () => this.name;
    private getWeight = () => this.weight;
    private setValue = (value: number) => this.value = value;
    private setName = (name: string) => this.name = name;
    private setWeight = (weight: number) => this.weight = weight;
}
