/**
 * Delete Vendor Request DTO
 * @module vendor-service/application/dtos/requests/vendor
 */
export interface DeleteVendorRequestDTO {
  readonly vendorId: string;
  readonly force?: boolean;
  readonly reason?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
