import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { Quantity } from '../common/quantity.types';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/src/logistics/shipment-status.constants';
import { SHIPMENT } from '@vubon/shared-constants/src/logistics/shipment.constants';
import { Courier } from './courier.types';
import { Tracking } from './tracking.types';

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface ShipmentAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface ShipmentItem {
  itemId: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: Quantity;
  weight: number;
  dimensions: Dimensions;
  price: Money;
}

export interface ShipmentMetadata {
  notes?: string;
  specialInstructions?: string;
  isFragile: boolean;
  isHazardous: boolean;
  temperatureSensitive: boolean;
  temperatureRange?: string;
}

export interface Shipment extends BaseEntity {
  shipmentId: string;
  shipmentNumber: string;
  orderId: string;
  status: keyof typeof SHIPMENT_STATUS | string;
  type: keyof typeof SHIPMENT.SHIPMENT_TYPES | string;
  priority: keyof typeof SHIPMENT.SHIPMENT_PRIORITY | string;
  courier: Courier;
  tracking: Tracking;
  items: ShipmentItem[];
  totalItems: number;
  totalWeight: number;
  totalVolume: number;
  packaging: unknown;
  originAddress: ShipmentAddress;
  destinationAddress: ShipmentAddress;
  shippingCost: Money;
  insuranceCost: Money;
  totalCost: Money;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  isDelivered: boolean;
  isCancelled: boolean;
  isReturned: boolean;
  metadata: ShipmentMetadata;
}
