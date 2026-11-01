/**
 * Fulfillment Response DTOs
 * @module order-service/application/dtos/responses
 */

export interface FulfillmentResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly vendorId?: string;
  readonly status: string;
  readonly type: string;
  readonly itemIds: readonly string[];
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly fulfilledAt?: string;
  readonly deliveredAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface FulfillmentSummaryDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly type: string;
  readonly itemCount: number;
  readonly trackingNumber?: string;
  readonly createdAt: string;
}

export interface FulfillmentListResponseDTO {
  readonly items: readonly FulfillmentSummaryDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
