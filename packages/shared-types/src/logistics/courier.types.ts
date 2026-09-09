import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { COURIER } from '@vubon/shared-constants/src/logistics/courier.constants';
import { Dimensions } from './shipment.types';

export interface CourierRate {
  zone: string;
  baseRate: Money;
  perKgRate: Money;
  perItemRate: Money;
  fuelSurcharge: number;
}

export interface Courier extends BaseEntity {
  courierId: string;
  name: string;
  code: string;
  status: keyof typeof COURIER.STATUS | string;
  type: keyof typeof COURIER.TYPES | string;
  serviceType: keyof typeof COURIER.SERVICE_TYPES | string;
  phone: string;
  email: string;
  address: string;
  website?: string;
  logo?: string;
  trackingUrl: string;
  apiKey?: string;
  apiSecret?: string;
  maxWeight: number;
  maxDimensions: Dimensions;
  supportedZones: string[];
  rates: CourierRate[];
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
