/**
 * ReturnShipment Response DTOs
 * @module logistics-service/application/dtos/responses/return-shipment
 */
import type {
  ReturnShipmentTypeValue,
  ReturnShipmentStatusValue,
  ReturnReasonValue,
} from '@vubon/shared-types/logistics';
import type { Address } from '@vubon/shared-types/common';

export interface ReturnShipmentResponseDTO {
  readonly id: string;
  readonly rmaNumber: string;
  readonly orderId: string;
  readonly originalShipmentId?: string;
  readonly userId: string;
  readonly status: ReturnShipmentStatusValue;
  readonly type: ReturnShipmentTypeValue;
  readonly reason: ReturnReasonValue;
  readonly description?: string;
  readonly images: readonly string[];
  readonly itemIds: readonly string[];
  readonly itemCount: number;
  readonly pickupAddress: Address;
  readonly pickupScheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly inspectedAt?: string;
  readonly inspectedBy?: string;
  readonly restockable: boolean;
  readonly refundAmount?: number;
  readonly refundCurrency?: string;
  readonly restockFeeAmount?: number;
  readonly trackingNumber?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReturnShipmentListResponseDTO {
  readonly items: readonly ReturnShipmentResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
