import { IItemProps, Item } from './Item';

export interface IWeaponProps {
  baseDamage: number;
  baseDurability: number;
}

interface IWeapon {
  getDamage: () => number;
  getDurability: () => number;
  use: () => string;
}

export class Weapon extends Item implements IWeapon {
  private baseDamage: number;
  private damageModifier: number = 0;
  private baseDurability: number;
  private durabilityModifier: number = 0;
  static MODIFIER_CHANGE_RATE: 0.05;

  constructor ({name, value, weight, baseDamage, baseDurability}: IWeaponProps & IItemProps) {
    super({name, value, weight});
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
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
    const isBroken = this.checkIsBroken();
    return `You use the ${this.name}, dealing ${this.getDamage()} points of damage.${isBroken ? ` The ${this.name} breaks.` : ''}`
  };
}
