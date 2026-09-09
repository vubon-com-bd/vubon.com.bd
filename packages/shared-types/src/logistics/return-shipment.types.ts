import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { RETURN_SHIPMENT } from '@vubon/shared-constants/src/logistics/return-shipment.constants';
import { Shipment } from './shipment.types';
import { ReturnReason } from './return-reason.types';
import { Courier } from './courier.types';

export interface ReturnShipmentItem {
  itemId: string;
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
  condition: string;
  refundAmount: Money;
}

export interface ReturnShipment extends BaseEntity {
  returnShipmentId: string;
  orderId: string;
  originalShipmentId: string;
  originalShipment: Shipment;
  status: keyof typeof RETURN_SHIPMENT.STATUS | string;
  type: keyof typeof RETURN_SHIPMENT.RETURN_SHIPMENT_TYPES | string;
  reason: ReturnReason;
  items: ReturnShipmentItem[];
  totalItems: number;
  totalWeight: number;
  returnCost: Money;
  shippingCost: keyof typeof RETURN_SHIPMENT.RETURN_SHIPPING_COST | string;
  courier: Courier;
  trackingNumber: string;
  requestedAt: Date;
  approvedAt?: Date;
  pickedUpAt?: Date;
  receivedAt?: Date;
  inspectedAt?: Date;
  completedAt?: Date;
  isCompleted: boolean;
  metadata: Record<string, unknown>;
}
