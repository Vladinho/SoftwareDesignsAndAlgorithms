import Shipper from '../Shipper';
import { IShipData, Wrapper } from '../../types';

export class AirWest extends Shipper {
  constructor (shipData: IShipData, wrapper: Wrapper) {
    super(shipData, wrapper);
  }
  protected getPackagePrice = () => {
    const packageMap = {
      [Wrapper.Letter]: 0.39,
      [Wrapper.Package]: 0.25,
      [Wrapper.OverSized]: 10.25,
    }
    return packageMap[this.wrapper];
  }
}