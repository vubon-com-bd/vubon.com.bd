/**
 * Reject Payout Request DTO
 * @module vendor-service/application/dtos/requests/payout
 */
export interface RejectPayoutRequestDTO {
  readonly payoutId: string;
  readonly reason: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
