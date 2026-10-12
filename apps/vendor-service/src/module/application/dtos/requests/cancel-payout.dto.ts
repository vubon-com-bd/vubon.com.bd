/**
 * CancelPayoutRequestDto — cancel a pending payout
 * @module vendor-service/application/dtos/requests
 */
export class CancelPayoutRequestDto {
  payoutId!: string;
  cancelledBy!: string;
  reason?: string;
  idempotencyKey?: string;
}
