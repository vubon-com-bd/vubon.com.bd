/**
 * Delivery Core Types
 * @module shared-types/logistics
 */

import type { BaseEntity } from '../common/base';
import type { ShipmentId, OrderId, UserId, Phone } from '../common/primitives';
import type { Address } from '../common/geo';
import type { DeliveryStatusValue, DeliveryAttemptStatusValue } from './delivery-status.types';
import type { DeliveryTypeValue } from './delivery-type.types';

export interface Delivery extends BaseEntity<string> {
  readonly shipmentId: ShipmentId;
  readonly orderId: OrderId;
  readonly userId?: UserId;
  readonly status: DeliveryStatusValue;
  readonly type: DeliveryTypeValue;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly recipientName?: string;
  readonly recipientPhone?: Phone;
  readonly deliveryAddress: Address;
  readonly scheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly arrivedAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly attempts: readonly DeliveryAttempt[];
  readonly proofOfDelivery?: ProofOfDelivery;
  readonly notes?: string;
}

export interface DeliveryAttempt {
  readonly id: string;
  readonly attemptNumber: number;
  readonly status: DeliveryAttemptStatusValue;
  readonly reason?: string;
  readonly driverId?: string;
  readonly attemptedAt: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly images?: readonly string[];
  readonly notes?: string;
}

export interface ProofOfDelivery {
  readonly type: 'signature' | 'otp' | 'photo' | 'id_verification' | 'contactless';
  readonly signatureUrl?: string;
  readonly photoUrl?: string;
  readonly otp?: string;
  readonly idNumber?: string;
  readonly recipientName?: string;
  readonly capturedAt: string;
}

export interface DeliveryPublic {
  readonly id: string;
  readonly shipmentId: ShipmentId;
  readonly status: DeliveryStatusValue;
  readonly type: DeliveryTypeValue;
  readonly deliveredAt?: string;
  readonly attempts: number;
}

export interface DeliveryScheduleInput {
  readonly shipmentId: ShipmentId;
  readonly driverId: string;
  readonly vehicleId?: string;
  readonly scheduledAt: string;
  readonly routeId?: string;
}

export interface DeliveryCompleteInput {
  readonly deliveryId: string;
  readonly proof: ProofOfDelivery;
  readonly notes?: string;
}

export interface DeliveryFailInput {
  readonly deliveryId: string;
  readonly reason: string;
  readonly images?: readonly string[];
  readonly notes?: string;
}
