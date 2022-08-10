import Client from './Client';
import { mockShipData1, mockShipData2 } from './mockShipData';
import { Mark } from './types';

const shipment = new Client().sendShipRequest(mockShipData1, [Mark.Fragile, Mark.DoNotLeave, Mark.ReturnReceiptRequested]);
console.log('id:', shipment.getInstance().getShipmentId());
console.log(shipment.ship());

const shipment2 = new Client().sendShipRequest(mockShipData2, [Mark.DoNotLeave]);
console.log('id:', shipment2.getInstance().getShipmentId());
console.log(shipment2.ship());