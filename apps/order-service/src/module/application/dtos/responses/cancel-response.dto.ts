/**
 * Cancel Response DTOs
 * @module order-service/application/dtos/responses
 */

export interface CancelResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly reason: string;
  readonly status: string;
  readonly requestedBy: string;
  readonly approvedBy?: string;
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly requestedAt: string;
  readonly processedAt?: string;
}

export interface CancelSummaryDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly reason: string;
  readonly requestedAt: string;
}

export interface CancelListResponseDTO {
  readonly items: readonly CancelSummaryDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
