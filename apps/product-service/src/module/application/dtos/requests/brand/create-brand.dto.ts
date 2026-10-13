/**
 * Create Brand Request DTO
 * @module product-service/application/dtos/requests/brand
 */
export interface CreateBrandRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly website?: string;
  readonly country?: string;
  readonly isFeatured?: boolean;
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
