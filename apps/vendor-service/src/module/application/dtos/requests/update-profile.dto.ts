/**
 * UpdateVendorProfileRequestDto — public-facing profile update
 * @module vendor-service/application/dtos/requests
 */
export class UpdateVendorProfileRequestDto {
  vendorId!: string;
  tagline?: string;
  about?: string;
  logoUrl?: string;
  bannerUrl?: string;
  categories?: readonly string[];
  languages?: readonly string[];
  socialLinks?: Readonly<Record<string, string>>;
  idempotencyKey?: string;
}
