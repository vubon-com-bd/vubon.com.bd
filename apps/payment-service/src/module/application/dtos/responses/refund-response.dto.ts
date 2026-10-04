/**
 * Refund Response DTOs
 * @module payment-service/application/dtos/responses
 */
export interface RefundResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly orderId?: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly gatewayRefundId?: string;
  readonly processedAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RefundPublicResponseDTO {
  readonly id: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly createdAt: string;
  readonly processedAt?: string;
}

export interface RefundRequestResponseDTO {
  readonly success: true;
  readonly refundId: string;
  readonly status: string;
  readonly refundedAmount: number;
}

export interface RefundSummaryResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface RefundListResponseDTO {
  readonly items: readonly RefundSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
