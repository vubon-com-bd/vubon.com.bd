/**
 * FailPayoutRequestDto — mark payout as failed
 * @module vendor-service/application/dtos/requests
 */
export class FailPayoutRequestDto {
  payoutId!: string;
  reason!: string;
  failedBy!: string;
  idempotencyKey?: string;
}
