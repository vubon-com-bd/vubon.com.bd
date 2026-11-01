/**
 * Approve Payout Request DTO
 * @module vendor-service/application/dtos/requests/payout
 */
export interface ApprovePayoutRequestDTO {
  readonly payoutId: string;
  readonly notes?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
