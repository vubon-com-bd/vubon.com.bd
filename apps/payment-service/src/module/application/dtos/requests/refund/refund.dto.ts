/**
 * Refund Request DTOs
 * @module payment-service/application/dtos/requests/refund
 */
import type { RefundPaymentRequestSchemaType } from '@vubon/shared-schemas/business/payment';

export type RequestRefundRequestDTO = RefundPaymentRequestSchemaType;

export interface ApproveRefundRequestDTO {
  readonly refundId: string;
  readonly approvedBy?: string;
}

export interface ProcessRefundRequestDTO {
  readonly refundId: string;
  readonly gatewayRefundId?: string;
}

export interface CompleteRefundRequestDTO {
  readonly refundId: string;
  readonly gatewayRefundId?: string;
}

export interface FailRefundRequestDTO {
  readonly refundId: string;
  readonly reason: string;
  readonly code?: string;
}

export interface CancelRefundRequestDTO {
  readonly refundId: string;
  readonly reason?: string;
}
