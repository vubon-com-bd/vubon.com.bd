/**
 * ApprovePayoutRequestDto — admin approves payout
 * @module vendor-service/application/dtos/requests
 */
export class ApprovePayoutRequestDto {
  payoutId!: string;
  approvedBy!: string;
  note?: string;
  idempotencyKey?: string;
}
