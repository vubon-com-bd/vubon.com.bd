/**
 * UpdateVendorRequestDto — vendor profile update input
 * @module vendor-service/application/dtos/requests
 */
export class UpdateVendorRequestDto {
  vendorId!: string;
  name?: string;
  displayName?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  website?: string;
  idempotencyKey?: string;
}
