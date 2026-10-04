/**
 * InitiatePaymentRequestDTO
 * @module payment-service/application/dtos/requests/payment
 *
 * Shape derives from ProcessPaymentRequestSchema in shared-schemas.
 */
import type {
  ProcessPaymentRequestSchemaType,
  VerifyPaymentRequestSchemaType,
} from '@vubon/shared-schemas/business/payment';

export type InitiatePaymentRequestDTO = ProcessPaymentRequestSchemaType;
export type VerifyPaymentRequestDTO = VerifyPaymentRequestSchemaType;

export interface CapturePaymentRequestDTO {
  readonly paymentId: string;
  readonly amount?: number;
  readonly idempotencyKey?: string;
}

export interface FailPaymentRequestDTO {
  readonly paymentId: string;
  readonly reason: string;
  readonly code?: string;
}

export interface CancelPaymentRequestDTO {
  readonly paymentId: string;
  readonly reason?: string;
}

export interface RetryPaymentRequestDTO {
  readonly paymentId: string;
  readonly idempotencyKey?: string;
}

export interface MarkChargebackRequestDTO {
  readonly paymentId: string;
  readonly amount: number;
  readonly reason?: string;
}
