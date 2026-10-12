/**
 * CompleteSettlementRequestDto — attach payout and finalize
 * @module vendor-service/application/dtos/requests
 */
export class CompleteSettlementRequestDto {
  settlementId!: string;
  payoutId!: string;
  completedBy!: string;
  idempotencyKey?: string;
}
