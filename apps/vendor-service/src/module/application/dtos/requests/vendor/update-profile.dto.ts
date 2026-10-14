/**
 * Update Vendor Profile Request DTO
 * @module vendor-service/application/dtos/requests/vendor
 */
export interface UpdateProfileRequestDTO {
  readonly vendorId: string;
  readonly name?: string;
  readonly displayName?: string;
  readonly tagline?: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly website?: string;
  readonly socialLinks?: readonly string[];
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
