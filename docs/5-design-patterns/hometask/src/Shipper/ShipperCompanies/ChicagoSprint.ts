import Shipper from '../Shipper';
import { IShipData, Wrapper } from '../../types';

export class ChicagoSprint extends Shipper {
  constructor (shipData: IShipData, wrapper: Wrapper) {
    super(shipData, wrapper);
  }
  protected getPackagePrice = () => {
    const packageMap = {
      [Wrapper.Letter]: 0.42,
      [Wrapper.Package]: 0.20,
      [Wrapper.OverSized]: 0.20,
    }
    return packageMap[this.wrapper];
  }
}