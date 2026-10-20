/**
 * Return Response DTOs
 * @module order-service/application/dtos/responses
 */

export interface ReturnResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly customerId: string;
  readonly status: string;
  readonly reason: string;
  readonly itemIds: readonly string[];
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly restockFee?: number;
  readonly currency: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly refundedAt?: string;
  readonly closedAt?: string;
}

export interface ReturnSummaryDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly reason: string;
  readonly requestedAt: string;
}

export interface ReturnListResponseDTO {
  readonly items: readonly ReturnSummaryDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
