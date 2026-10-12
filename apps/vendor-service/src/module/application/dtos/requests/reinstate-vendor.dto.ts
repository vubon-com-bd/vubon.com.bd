/**
 * ReinstateVendorRequestDto — lift a suspension
 * @module vendor-service/application/dtos/requests
 */
export class ReinstateVendorRequestDto {
  vendorId!: string;
  liftedBy!: string;
  notes?: string;
  idempotencyKey?: string;
}
