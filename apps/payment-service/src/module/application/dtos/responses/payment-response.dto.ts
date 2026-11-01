/**
 * Payment Response DTOs
 * @module payment-service/application/dtos/responses
 *
 * Multi-shape output:
 *  - Full (admin)
 *  - Public (customer-safe)
 *  - Summary (list views)
 *  - List (paginated)
 *  - Stats (aggregated)
 *  - Initiate (POST create)
 */
import type {
  PaymentStatusValue,
  PaymentMethodValue,
  PaymentGatewayValue,
} from '@vubon/shared-types/business/payment';

// ─── Full (admin) ──────────────────────────
export interface PaymentResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly userId: string;
  readonly status: PaymentStatusValue;
  readonly method: PaymentMethodValue;
  readonly gateway?: PaymentGatewayValue;
  readonly amount: number;
  readonly currency: string;
  readonly gatewayReference?: string;
  readonly refundedAmount?: number;
  readonly failureReason?: string;
  readonly failureCode?: string;
  readonly authorizedAt?: string;
  readonly capturedAt?: string;
  readonly paidAt?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ────────────────
export interface PaymentPublicResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: PaymentStatusValue;
  readonly method: PaymentMethodValue;
  readonly amount: number;
  readonly currency: string;
  readonly refundedAmount?: number;
  readonly createdAt: string;
  readonly capturedAt?: string;
}

// ─── Summary (list views) ──────────────────
export interface PaymentSummaryResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: PaymentStatusValue;
  readonly amount: number;
  readonly currency: string;
  readonly createdAt: string;
}

// ─── List (paginated) ──────────────────────
export interface PaymentListResponseDTO {
  readonly items: readonly PaymentSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ─────────────────────────────────
export interface PaymentStatsResponseDTO {
  readonly total: number;
  readonly totalAmount: number;
  readonly averageAmount: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byMethod: Readonly<Record<string, number>>;
}

// ─── Initiate (POST create) ────────────────
export interface PaymentInitiateResponseDTO {
  readonly success: true;
  readonly paymentId: string;
  readonly status: PaymentStatusValue;
  readonly redirectUrl?: string;
  readonly gatewayReference?: string;
}
