import { AirWest } from './Shipper/ShipperCompanies/AirWest';
import { ChicagoSprint } from './Shipper/ShipperCompanies/ChicagoSprint';
import { PacificParcel } from './Shipper/ShipperCompanies/PacificParcel';

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
