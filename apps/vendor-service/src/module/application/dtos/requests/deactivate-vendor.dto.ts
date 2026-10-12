/**
 * DeactivateVendorRequestDto — vendor self-deactivation
 * @module vendor-service/application/dtos/requests
 */
export class DeactivateVendorRequestDto {
  vendorId!: string;
  reason?: string;
  idempotencyKey?: string;
}
