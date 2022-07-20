import { Weapon } from './Weapon';

export class Bow extends Weapon {
  constructor (baseDamage: number, baseDurability: number, value: number, weight: number) {
    super('bow', value, weight, baseDamage, baseDurability);
    this.setBaseDamage(50);
    this.setBaseDurability(70);
  }
  polish = (): void => {
    const newDurability = this.getDurabilityModifier() + Weapon.MODIFIER_CHANGE_RATE;
    this.setDurabilityModifier(newDurability > 1 ? 1 : newDurability);
  }
}