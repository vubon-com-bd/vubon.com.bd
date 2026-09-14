/**
 * Return Shipment Types
 * @module shared-types/logistics
 */

import type { BaseEntity } from '../common/base';
import type { OrderId, ShipmentId, UserId } from '../common/primitives';
import type {
  ReturnShipmentStatusValue,
  ReturnShipmentTypeValue,
  ReturnReasonValue,
} from './return-reason.types';

export interface ReturnShipment extends BaseEntity<string> {
  readonly rmaNumber: string;
  readonly orderId: OrderId;
  readonly originalShipmentId?: ShipmentId;
  readonly userId: UserId;
  readonly status: ReturnShipmentStatusValue;
  readonly type: ReturnShipmentTypeValue;
  readonly reason: ReturnReasonValue;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly itemIds: readonly string[];
  readonly pickupAddress: string;
  readonly pickupScheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly inspectedAt?: string;
  readonly inspectedBy?: UserId;
  readonly restockable: boolean;
  readonly refundAmount?: number;
  readonly refundCurrency?: string;
  readonly restockFeeAmount?: number;
  readonly trackingNumber?: string;
  readonly notes?: string;
}

export interface ReturnShipmentPublic {
  readonly id: string;
  readonly rmaNumber: string;
  readonly status: ReturnShipmentStatusValue;
  readonly type: ReturnShipmentTypeValue;
  readonly reason: ReturnReasonValue;
  readonly createdAt: string;
}

export interface ReturnShipmentCreateInput {
  readonly orderId: OrderId;
  readonly type: ReturnShipmentTypeValue;
  readonly reason: ReturnReasonValue;
  readonly itemIds: readonly string[];
  readonly description?: string;
  readonly images?: readonly string[];
}
