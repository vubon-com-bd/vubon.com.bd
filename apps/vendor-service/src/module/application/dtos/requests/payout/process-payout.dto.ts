/**
 * Process Payout Request DTO
 * @module vendor-service/application/dtos/requests/payout
 */
export interface ProcessPayoutRequestDTO {
  readonly payoutId: string;
  readonly transactionId?: string;
  readonly notes?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
