/**
 * Reinstate Vendor Request DTO
 * @module vendor-service/application/dtos/requests/suspension
 */
export interface ReinstateVendorRequestDTO {
  readonly vendorId: string;
  readonly suspensionId?: string;
  readonly reason?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
