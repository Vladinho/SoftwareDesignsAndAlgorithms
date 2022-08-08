import Shipment from './Shipment';

export interface MarkDecorator {
  getInstance: () => Shipment;
  ship: () => string;
}

abstract class Decorator implements MarkDecorator{
  protected shipment;
  protected constructor (protected decorator: Shipment) {
    this.shipment = this.decorator.getInstance();
  };
  getInstance = () => this.shipment;
  abstract ship;
}

export default Decorator;