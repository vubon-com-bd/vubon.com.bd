import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { DELIVERY_STATUS } from '@vubon/shared-constants/src/logistics/delivery-status.constants';
import { Shipment } from './shipment.types';
import { Driver } from './driver.types';
import { Vehicle } from './vehicle.types';
import { Route } from './route.types';

export interface DeliveryItem {
  itemId: string;
  productId: string;
  productName: string;
  quantity: number;
  weight: number;
}

export interface DeliveryAttempt {
  attemptNumber: number;
  attemptedAt: Date;
  status: 'attempted' | 'delivered' | 'failed';
  reason?: string;
  notes?: string;
}

export interface DeliveryMetadata {
  isPriority: boolean;
  isExpress: boolean;
  requiresSignature: boolean;
  requiresPhoto: boolean;
  requiresOtp: boolean;
  ageRestricted: boolean;
}

export interface Delivery extends BaseEntity {
  deliveryId: string;
  deliveryNumber: string;
  orderId: string;
  shipmentId: string;
  shipment: Shipment;
  status: keyof typeof DELIVERY_STATUS | string;
  type: string;
  window: string;
  driver: Driver;
  vehicle: Vehicle;
  route: Route;
  items: DeliveryItem[];
  totalItems: number;
  totalWeight: number;
  deliveryCost: Money;
  codAmount: Money;
  isCod: boolean;
  isCollected: boolean;
  collectedAt?: Date;
  collectedBy?: string;
  scheduledDate: Date;
  scheduledTime: string;
  startedAt?: Date;
  deliveredAt?: Date;
  deliveryAttempts: DeliveryAttempt[];
  maxAttempts: number;
  notes?: string;
  signature?: string;
  metadata: DeliveryMetadata;
}
