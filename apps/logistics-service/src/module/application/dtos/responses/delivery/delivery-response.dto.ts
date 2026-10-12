/**
 * Delivery Response DTOs
 * @module logistics-service/application/dtos/responses/delivery
 */
import type { DeliveryStatusValue, DeliveryTypeValue } from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export interface DeliveryAttemptResponseDTO {
  readonly id: string;
  readonly attemptNumber: number;
  readonly status: string;
  readonly reason?: string;
  readonly driverId?: string;
  readonly attemptedAt: string;
  readonly location?: string;
  readonly images: readonly string[];
  readonly notes?: string;
}

export interface DeliveryResponseDTO {
  readonly id: string;
  readonly shipmentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly status: DeliveryStatusValue;
  readonly type: DeliveryTypeValue;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly recipientName?: string;
  readonly recipientPhone?: string;
  readonly deliveryAddress: Address;
  readonly scheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly arrivedAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly attemptCount: number;
  readonly remainingAttempts: number;
  readonly attempts: readonly DeliveryAttemptResponseDTO[];
  readonly proofType?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DeliveryListResponseDTO {
  readonly items: readonly DeliveryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
