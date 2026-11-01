/**
 * PartialRefundRequestDTO
 * @module payment-service/application/dtos/requests/refund
 *
 * Partial refund — amount < original payment amount.
 */
export interface PartialRefundRequestDTO {
  readonly paymentId: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason: string;
  readonly note?: string;
  readonly idempotencyKey?: string;
}

export interface PartialRefundContextDTO {
  readonly request: PartialRefundRequestDTO;
  readonly actorId?: string;
  readonly remainingRefundable: number;
}
