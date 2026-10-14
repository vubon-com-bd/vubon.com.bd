/**
 * Complete Settlement Request DTO
 * @module vendor-service/application/dtos/requests/settlement
 */
export interface CompleteSettlementRequestDTO {
  readonly settlementId: string;
  readonly payoutId?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
