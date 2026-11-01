/**
 * RetryPaymentRequestDTO
 * @module payment-service/application/dtos/requests/payment
 *
 * Retries a failed/declined payment (max 3 attempts).
 */
export interface RetryPaymentRequestDTO {
  readonly paymentId: string;
  readonly gateway?: string;
  readonly idempotencyKey?: string;
  readonly reason?: string;
}

export interface RetryPaymentContextDTO {
  readonly request: RetryPaymentRequestDTO;
  readonly attemptCount: number;
  readonly actorId?: string;
}
