/**
 * Payment Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type { PaymentStatusValue } from '@vubon/shared-types/business/payment';

export interface PaymentTransactionSummaryDTO {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly reference?: string;
  readonly createdAt: string;
}

export interface PaymentResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly userId: string;
  readonly type: string;
  readonly status: PaymentStatusValue;
  readonly method: string;
  readonly gateway?: string;
  readonly amount: number;
  readonly currency: string;
  readonly gatewayPaymentId?: string;
  readonly idempotencyKey?: string;
  readonly refundedAmount: number;
  readonly refundableRemaining: number;
  readonly retryAttempts: number;
  readonly authorizedAt?: string;
  readonly capturedAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly expiredAt?: string;
  readonly failureReason?: string;
  readonly failureCode?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PaymentPublicResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: PaymentStatusValue;
  readonly method: string;
  readonly gateway?: string;
  readonly amount: number;
  readonly currency: string;
  readonly refundedAmount: number;
  readonly createdAt: string;
  readonly capturedAt?: string;
}

export interface PaymentInitiateResponseDTO {
  readonly success: true;
  readonly paymentId: string;
  readonly status: PaymentStatusValue;
  readonly redirectUrl?: string;
  readonly gatewayPaymentId?: string;
}

export interface PaymentSummaryResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface PaymentListResponseDTO {
  readonly items: readonly PaymentSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PaymentStatsResponseDTO {
  readonly totalPayments: number;
  readonly totalCaptured: number;
  readonly totalRefunded: number;
  readonly averageAmount: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byGateway: Readonly<Record<string, number>>;
}

export interface PaymentDetailResponseDTO {
  readonly payment: PaymentResponseDTO;
  readonly transactions: readonly PaymentTransactionSummaryDTO[];
}
