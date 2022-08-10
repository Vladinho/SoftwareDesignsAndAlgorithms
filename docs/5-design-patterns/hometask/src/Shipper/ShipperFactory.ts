import { Companies, companiesMap, IShipData, Wrapper } from '../types';
import Shipper from './Shipper';

class ShipperFactory {
  constructor () {
  }
  createShipper = (shipData: IShipData, wrapper: Wrapper): Shipper => {
    const companiesCodes = [
      {
        name: Companies.AirWest,
        codes: [1, 2, 3],
      },
      {
        name: Companies.ChicagoSprint,
        codes: [4, 5, 6],
      },
      {
        name: Companies.PacificParcel,
        codes: [7, 8, 9]
      }
    ]
    const shipper = companiesCodes.find(({name, codes}) => {
      return codes.some(c => c === Number(shipData.toZipCode[0]))
    });
    if (!shipper) {
      throw new Error('Your zip code is not supported!');
    }
    const ShipperCompany = companiesMap[shipper.name];
    return new ShipperCompany(shipData, wrapper)
  }
}
export default ShipperFactory;
