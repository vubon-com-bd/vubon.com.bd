/**
 * RejectPayoutRequestDto — admin rejects payout
 * @module vendor-service/application/dtos/requests
 */
export class RejectPayoutRequestDto {
  payoutId!: string;
  rejectedBy!: string;
  reason!: string;
  idempotencyKey?: string;
}
