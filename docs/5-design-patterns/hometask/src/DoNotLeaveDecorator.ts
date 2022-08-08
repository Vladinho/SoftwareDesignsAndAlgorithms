import Shipment from './Shipment';
import Decorator from './Decorator';

class DoNotLeaveDecorator extends Decorator{
  constructor (shipment: Shipment) {
    super(shipment);
  };
  ship = () => {
    return `${this.decorator.ship()}\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**`;
  }
}

export default DoNotLeaveDecorator;
