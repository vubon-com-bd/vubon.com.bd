/**
 * Delivery Request DTOs
 * @module logistics-service/application/dtos/requests/delivery
 */
import type { DeliveryStatusValue, DeliveryTypeValue } from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export interface ScheduleDeliveryRequestDTO {
  readonly shipmentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly type: DeliveryTypeValue;
  readonly deliveryAddress: Address;
  readonly recipientName?: string;
  readonly recipientPhone?: string;
  readonly scheduledAt?: string;
}

export interface AssignDeliveryDriverRequestDTO {
  readonly deliveryId: string;
  readonly driverId: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
}

export interface AddDeliveryAttemptRequestDTO {
  readonly deliveryId: string;
  readonly status: string;
  readonly reason?: string;
  readonly driverId?: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly images?: readonly string[];
  readonly notes?: string;
}

export interface CompleteDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly proofType: 'signature' | 'otp' | 'photo' | 'id_verification' | 'contactless';
  readonly signatureUrl?: string;
  readonly photoUrl?: string;
  readonly otp?: string;
  readonly idNumber?: string;
  readonly recipientName?: string;
  readonly receivedBy?: string;
}

export interface FailDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly reason: string;
}

export interface RescheduleDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly reason: string;
}

export interface CancelDeliveryRequestDTO {
  readonly deliveryId: string;
  readonly reason?: string;
}

export interface DeliveryListFilterDTO {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly driverId?: string;
  readonly status?: DeliveryStatusValue;
  readonly type?: DeliveryTypeValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
