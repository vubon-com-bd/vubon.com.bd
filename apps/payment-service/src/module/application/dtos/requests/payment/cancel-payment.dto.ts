/**
 * CancelPaymentRequestDTO
 * @module payment-service/application/dtos/requests/payment
 *
 * Cancels a pending/authorized payment.
 */
export interface CancelPaymentRequestDTO {
  readonly paymentId: string;
  readonly reason: string;
  readonly cancelledBy?: string;
  readonly idempotencyKey?: string;
}

export interface CancelPaymentContextDTO {
  readonly request: CancelPaymentRequestDTO;
  readonly actorId?: string;
}
