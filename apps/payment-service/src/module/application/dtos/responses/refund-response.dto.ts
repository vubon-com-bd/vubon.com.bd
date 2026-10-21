/**
 * Refund Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type { RefundStatusValue } from '@domain/primitives/refund-status.vo';
import type { RefundReasonValue } from '@domain/primitives/refund-reason.vo';

export interface RefundResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly status: RefundStatusValue;
  readonly amount: number;
  readonly currency: string;
  readonly reason: RefundReasonValue;
  readonly note?: string;
  readonly approvedBy?: string;
  readonly completedAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RefundSummaryResponseDTO {
  readonly id: string;
  readonly status: RefundStatusValue;
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

export interface RefundStatsResponseDTO {
  readonly total: number;
  readonly totalRefunded: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byReason: Readonly<Record<string, number>>;
}

export interface RefundInitiateResponseDTO {
  readonly success: true;
  readonly refundId: string;
  readonly status: RefundStatusValue;
}
