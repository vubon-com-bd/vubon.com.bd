/**
 * DeleteVendorRequestDto — soft-delete input
 * @module vendor-service/application/dtos/requests
 */
export class DeleteVendorRequestDto {
  vendorId!: string;
  reason?: string;
  idempotencyKey?: string;
}
