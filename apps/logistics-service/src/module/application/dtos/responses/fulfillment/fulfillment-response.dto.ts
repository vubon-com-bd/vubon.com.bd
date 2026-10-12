/**
 * Fulfillment Response DTOs
 * @module logistics-service/application/dtos/responses/fulfillment
 */
import type {
  FulfillmentTypeValue,
  FulfillmentStatusValue,
  FulfillmentPriorityValue,
} from '@vubon/shared-types/logistics';

export interface FulfillmentResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly status: FulfillmentStatusValue;
  readonly type: FulfillmentTypeValue;
  readonly priority: FulfillmentPriorityValue;
  readonly itemIds: readonly string[];
  readonly itemCount: number;
  readonly assignedTo?: string;
  readonly pickedAt?: string;
  readonly packedAt?: string;
  readonly shippedAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: string;
  readonly slaDueAt?: string;
  readonly slaBreached: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface FulfillmentListResponseDTO {
  readonly items: readonly FulfillmentResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
