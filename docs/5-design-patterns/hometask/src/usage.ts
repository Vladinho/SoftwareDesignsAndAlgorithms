import Client from './Client';
import { mockShipData1, mockShipData2 } from './mockShipData';

const shipment = new Client().sendShipRequest(mockShipData1);
console.log('id:', shipment.getShipmentId());
console.log(shipment.ship());

const shipment2 = new Client().sendShipRequest(mockShipData2);
console.log('id:', shipment2.getShipmentId());
console.log(shipment2.ship());