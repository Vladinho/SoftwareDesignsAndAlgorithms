import { Weapon } from './Weapon';

export class Sword extends Weapon {
  private MAX_DAMAGE_COEFFICIENT = 1.25;
  constructor (baseDurability: number, baseDamage: number, value: number, weight: number) {
    super('sword', value, weight, baseDamage, baseDurability);
    this.setBaseDamage(70);
    this.setBaseDurability(90);
  }
  polish = (): void => {
    const newDurability = this.getDurabilityModifier() + Weapon.MODIFIER_CHANGE_RATE;
    const maxValue = this.getBaseDamage() * this.MAX_DAMAGE_COEFFICIENT;
    this.setDurabilityModifier(newDurability > maxValue ? maxValue : newDurability);
  }
}