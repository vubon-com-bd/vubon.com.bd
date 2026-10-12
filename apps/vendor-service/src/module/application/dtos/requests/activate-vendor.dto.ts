/**
 * ActivateVendorRequestDto — flip vendor to active
 * @module vendor-service/application/dtos/requests
 */
export class ActivateVendorRequestDto {
  vendorId!: string;
  activatedBy?: string;
  idempotencyKey?: string;
}
