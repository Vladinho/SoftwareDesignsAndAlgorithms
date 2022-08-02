import IdGenerator from './IdGenerator';
import { IShipData, Wrapper } from './types';
import ShipperFactory from './Shipper/ShipperFactory';

interface IShipment {
  getInstance: () => Shipment;
  getShipmentId: () => number;
  ship: () => string;
}

const BASE_COST = 39;

class Shipment implements IShipment {
  private readonly wrapper: Wrapper;
  constructor (private shipData: IShipData) {
    if (shipData.weight < 16) {
      this.wrapper = Wrapper.Letter
    } else if (shipData.weight < 160) {
      this.wrapper = Wrapper.Package
    } else {
      this.wrapper = Wrapper.OverSized;
    }
  }
  getInstance = () => this;
  getShipmentId = () => {
    if (!this.shipData.shipmentID) {
      this.shipData.shipmentID = new IdGenerator().createId()
    }
    return this.shipData.shipmentID;
  };
  ship = () => {
    const { fromAddress, fromZipCode, toAddress, toZipCode, weight} = this.shipData;
    const baseCost = BASE_COST * weight;
    const shipper = new ShipperFactory().createShipper(this.shipData, this.wrapper);
    return `Shipment with the ID ${this.getShipmentId()} will be picked up from ${fromZipCode} ${fromAddress} 
    and shipped to ${toZipCode} ${toAddress} Cost = ${baseCost + shipper.getCost()}`
  };
}

export default Shipment;
