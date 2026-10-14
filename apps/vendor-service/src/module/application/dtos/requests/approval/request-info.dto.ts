/**
 * Request Info Request DTO
 * @module vendor-service/application/dtos/requests/approval
 */
export interface RequestInfoRequestDTO {
  readonly vendorId: string;
  readonly infoNeeded: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
