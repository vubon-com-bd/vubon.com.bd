/**
 * Transaction Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type {
  TransactionTypeValue,
  TransactionStatusValue,
} from '@vubon/shared-types/business/payment';

export interface TransactionResponseDTO {
  readonly id: string;
  readonly paymentId: string;
  readonly type: TransactionTypeValue;
  readonly status: TransactionStatusValue;
  readonly amount: number;
  readonly currency: string;
  readonly gatewayReference?: string;
  readonly reference?: string;
  readonly failureReason?: string;
  readonly settledAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TransactionSummaryResponseDTO {
  readonly id: string;
  readonly type: TransactionTypeValue;
  readonly status: TransactionStatusValue;
  readonly amount: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface TransactionListResponseDTO {
  readonly items: readonly TransactionSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface TransactionStatsResponseDTO {
  readonly total: number;
  readonly totalAmount: number;
  readonly currency: string;
  readonly byType: Readonly<Record<string, number>>;
  readonly byStatus: Readonly<Record<string, number>>;
}
