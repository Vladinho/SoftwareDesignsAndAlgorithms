import Shipment from './Shipment';
import Decorator from './Decorator';

class FragileDecorator extends Decorator{
  constructor (shipment: Shipment) {
    super(shipment);
  };
  ship = () => {
    return `${this.decorator.ship()}\n**MARK FRAGILE**`;
  }
}

export default FragileDecorator;
