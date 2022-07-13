import { IWeaponProps, Weapon } from './Weapon';

interface IBowProps extends IWeaponProps{
  value: number;
  weight: number;
}

export class Bow extends Weapon {
  constructor (props: IBowProps) {
    super({ ...props, name: 'bow'});
    this.setBaseDamage(50);
    this.setBaseDurability(70);
  }
  polish = (): void => {
    const newDurability = this.getDurabilityModifier() + Weapon.MODIFIER_CHANGE_RATE;
    this.setDurabilityModifier(newDurability > 1 ? 1 : newDurability);
  }
}