import { IWeaponProps, Weapon } from './Weapon';

interface ISwordProps extends IWeaponProps{
  value: number;
  weight: number;
}

export class Sword extends Weapon {
  private MAX_DAMAGE_COEFFICIENT = 1.25;
  constructor (props: ISwordProps) {
    super({ ...props, name: 'sword'});
    this.setBaseDamage(70);
    this.setBaseDurability(90);
  }
  polish = (): void => {
    const newDurability = this.getDurabilityModifier() + Weapon.MODIFIER_CHANGE_RATE;
    const maxValue = this.getBaseDamage() * this.MAX_DAMAGE_COEFFICIENT;
    this.setDurabilityModifier(newDurability > maxValue ? maxValue : newDurability);
  }
}