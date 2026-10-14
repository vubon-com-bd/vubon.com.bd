/**
 * Approve Vendor Request DTO
 * @module vendor-service/application/dtos/requests/approval
 */
export interface ApproveVendorRequestDTO {
  readonly vendorId: string;
  readonly notes?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
