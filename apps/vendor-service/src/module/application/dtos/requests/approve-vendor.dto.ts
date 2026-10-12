/**
 * ApproveVendorRequestDto
 * @module vendor-service/application/dtos/requests
 */
export class ApproveVendorRequestDto {
  vendorId!: string;
  reviewedBy!: string;
  note?: string;
  idempotencyKey?: string;
}
