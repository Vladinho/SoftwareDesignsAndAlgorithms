import Shipment from './Shipment';
import { IShipData } from './types';

interface IClient {
  sendShipRequest: (params: IShipData) => void
}

class Client implements IClient {
  constructor () {
  }
  sendShipRequest = (data: IShipData): Shipment => {
    return  new Shipment(data);
  }
}

export default Client;