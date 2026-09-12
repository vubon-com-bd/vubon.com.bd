import { BaseEntity } from '../common/base.types';
import { LOGISTICS } from '@vubon/shared-constants/src/logistics/logistics.constants';
import { Shipment } from './shipment.types';
import { Delivery } from './delivery.types';
import { Warehouse } from './warehouse.types';
import { Fulfillment } from './fulfillment.types';

export interface LogisticsHoliday {
  date: Date;
  name: string;
  isClosed: boolean;
}

export interface LogisticsMetadata {
  timezone: string;
  currency: string;
  defaultWarehouse?: string;
  defaultCourier?: string;
  shippingZones: string[];
  holidays: LogisticsHoliday[];
}

export interface Logistics extends BaseEntity {
  logisticsId: string;
  shipments: Shipment[];
  deliveries: Delivery[];
  warehouses: Warehouse[];
  fulfillments: Fulfillment[];
  status: keyof typeof LOGISTICS.STATUS | string;
  totalShipments: number;
  totalDeliveries: number;
  totalWarehouses: number;
  totalFulfillments: number;
  isActive: boolean;
  metadata: LogisticsMetadata;
}
