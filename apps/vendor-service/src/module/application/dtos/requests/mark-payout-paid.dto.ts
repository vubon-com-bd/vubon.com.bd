/**
 * MarkPayoutPaidRequestDto — confirm payout completion
 * @module vendor-service/application/dtos/requests
 */
export class MarkPayoutPaidRequestDto {
  payoutId!: string;
  transactionId!: string;
  reference?: string;
  paidBy!: string;
  idempotencyKey?: string;
}
