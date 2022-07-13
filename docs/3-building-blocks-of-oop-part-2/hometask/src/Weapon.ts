import { Item } from './Item';

interface IWeapon {
  getDamage: () => number;
  getDurability: () => number;
  use: () => string;
}

export class Weapon extends Item implements IWeapon {
  private damageModifier: number = 0;
  private durabilityModifier: number = 0;
  static MODIFIER_CHANGE_RATE: 0.05;

  constructor (name, value, weight, private baseDamage, private baseDurability) {
    super(name, value, weight);
  }

  private checkIsBroken = (): boolean => this.getDurability() < 0;
  getDamage = () => this.baseDamage + this.damageModifier;
  getDurability = () => this.baseDurability + this.durabilityModifier;
  setDurabilityModifier = (n: number): void => { this.durabilityModifier = n };
  getDurabilityModifier = (): number => this.durabilityModifier;
  setDamageModifier = (n: number): void => { this.damageModifier = n };
  getDamageModifier = (): number => this.damageModifier;
  setBaseDamage = (n: number): void => { this.baseDamage = n };
  getBaseDamage = (): number => this.baseDamage;
  setBaseDurability = (n: number): void => { this.baseDurability = n };
  getBaseDurability = (): number => this.baseDurability;
  toString = () =>
    `${this.name} − Value: ${this.value}, Weight: ${this.weight}, Damage: ${this.getDamage()}, Durability: ${this.getDurability()}`;
  use = () => {
    if (this.checkIsBroken()) {
      return 'You can\'t use the hammer, it is broken.';
    }
    this.durabilityModifier -= Weapon.MODIFIER_CHANGE_RATE;
    return `You use the ${this.name}, dealing ${this.getDamage()} points of damage.${this.checkIsBroken() ? ` The ${this.name} breaks.` : ''}`
  };
}
