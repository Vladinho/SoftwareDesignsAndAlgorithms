import Shipper from '../Shipper';
import { IShipData, Wrapper } from '../../types';

export class PacificParcel extends Shipper {
  constructor (shipData: IShipData, wrapper: Wrapper) {
    super(shipData, wrapper);
  }
  protected getPackagePrice = () => {
    const packageMap = {
      [Wrapper.Letter]: 0.51,
      [Wrapper.Package]: 0.19,
      [Wrapper.OverSized]: 0.02,
    }
    return packageMap[this.wrapper];
  }
}