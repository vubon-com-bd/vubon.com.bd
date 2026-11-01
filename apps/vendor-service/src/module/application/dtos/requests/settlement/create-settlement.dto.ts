/**
 * Create Settlement Request DTO
 * @module vendor-service/application/dtos/requests/settlement
 */
export interface CreateSettlementRequestDTO {
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly orderIds?: readonly string[];
  readonly notes?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
