import { AirWest } from './Shipper/ShipperCompanies/AirWest';
import { ChicagoSprint } from './Shipper/ShipperCompanies/ChicagoSprint';
import { PacificParcel } from './Shipper/ShipperCompanies/PacificParcel';
import FragileDecorator from './FragileDecorator';
import DoNotLeaveDecorator from './DoNotLeaveDecorator';
import ReturnReceiptRequestedDecorator from './ReturnReceiptRequestedDecorator';

export interface IShipData {
  shipmentID: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
}

export enum Wrapper {
  Letter,
  Package,
  OverSized
}

export enum Companies {
  AirWest,
  ChicagoSprint,
  PacificParcel
}

export const companiesMap = {
  [Companies.AirWest]: AirWest,
  [Companies.ChicagoSprint]: ChicagoSprint,
  [Companies.PacificParcel]: PacificParcel
}

export enum Mark {
  Fragile,
  DoNotLeave,
  ReturnReceiptRequested,
}

export const MarksDecoratorMap = {
  [Mark.Fragile]: FragileDecorator,
  [Mark.DoNotLeave]: DoNotLeaveDecorator,
  [Mark.ReturnReceiptRequested]: ReturnReceiptRequestedDecorator
}
