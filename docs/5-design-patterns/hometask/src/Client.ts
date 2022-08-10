import Shipment from './Shipment';
import { IShipData, Mark, MarksDecoratorMap } from './types';
import { MarkDecorator } from './Decorator';

interface IClient {
  sendShipRequest: (params: IShipData, marks?: Mark[]) => void
}

class Client implements IClient {
  constructor () {
  }
  sendShipRequest = (data, marks: Mark[] = []): MarkDecorator => {
    return  marks.reduce<MarkDecorator>((acc, cur) => {
      return new MarksDecoratorMap[cur](acc as Shipment);
    }, new Shipment(data));
  }
}

export default Client;