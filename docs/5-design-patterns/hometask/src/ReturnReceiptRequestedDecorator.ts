import Shipment from './Shipment';
import Decorator  from './Decorator';

class ReturnReceiptRequestedDecorator extends Decorator{
  constructor (shipment: Shipment) {
    super(shipment);
  };
  ship = () => {
    return `${this.decorator.ship()}\n**MARK RETURN RECEIPT REQUESTED**`;
  }
}

export default ReturnReceiptRequestedDecorator;
