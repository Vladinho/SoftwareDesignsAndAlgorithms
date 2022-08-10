import { IShipData, Wrapper } from '../types';

class Shipper {
  constructor (protected shipData: IShipData, protected wrapper: Wrapper) {
  }
  protected getPackagePrice: () => number;
  getCost = () => {
    return this.getPackagePrice() * this.shipData.weight;
  }
}

export default Shipper;
