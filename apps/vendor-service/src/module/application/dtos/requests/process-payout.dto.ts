/**
 * ProcessPayoutRequestDto — move payout to processing
 * @module vendor-service/application/dtos/requests
 */
export class ProcessPayoutRequestDto {
  payoutId!: string;
  processedBy!: string;
  idempotencyKey?: string;
}
