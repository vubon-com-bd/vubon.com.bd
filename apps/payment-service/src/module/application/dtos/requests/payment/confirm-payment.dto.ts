/**
 * ConfirmPaymentRequestDTO
 * @module payment-service/application/dtos/requests/payment
 *
 * Confirms a payment (POST /payments/:id/confirm).
 * Handles gateway callback / manual confirm.
 *
 * PaymentGatewayValue comes from shared-types (canonical).
 */
import type { PaymentGatewayValue } from '@vubon/shared-types/business/payment';

export interface ConfirmPaymentRequestDTO {
  readonly paymentId: string;
  readonly gatewayReference?: string;
  readonly gatewaySignature?: string;
  readonly gatewayData?: Readonly<Record<string, unknown>>;
  readonly confirmedAmount?: number;
  readonly currency?: string;
  readonly confirmedBy?: string;
  readonly idempotencyKey?: string;
}

export interface ConfirmPaymentContextDTO {
  readonly request: ConfirmPaymentRequestDTO;
  readonly userId: string;
  readonly gateway?: PaymentGatewayValue;
}
