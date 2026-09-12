import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { Quantity } from '../common/quantity.types';
import { FULFILLMENT } from '@vubon/shared-constants/src/logistics/fulfillment.constants';
import { Warehouse } from './warehouse.types';
import { Shipment } from './shipment.types';

export interface FulfillmentItem {
  itemId: string;
  productId: string;
  quantity: Quantity;
  location: string;
  status: 'pending' | 'picked' | 'packed' | 'labeled' | 'ready' | 'shipped';
}

export interface FulfillmentMetadata {
  batchId?: string;
  waveId?: string;
  zoneId?: string;
  pickerId?: string;
  packerId?: string;
  laborCost: Money;
  materialCost: Money;
}

export interface Fulfillment extends BaseEntity {
  fulfillmentId: string;
  orderId: string;
  status: keyof typeof FULFILLMENT.STATUS | string;
  type: keyof typeof FULFILLMENT.FULFILLMENT_TYPES | string;
  strategy: keyof typeof FULFILLMENT.PICKING_STRATEGIES | string;
  warehouse: Warehouse;
  shipment: Shipment;
  items: FulfillmentItem[];
  totalItems: number;
  totalWeight: number;
  totalVolume: number;
  pickingStartedAt?: Date;
  pickingCompletedAt?: Date;
  packingStartedAt?: Date;
  packingCompletedAt?: Date;
  labelingStartedAt?: Date;
  labelingCompletedAt?: Date;
  readyToShipAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  notes?: string;
  metadata: FulfillmentMetadata;
}
