/**
 * Update Brand Request DTO
 * @module product-service/application/dtos/requests/brand
 */
import type { BrandStatusSchemaType } from '@vubon/shared-schemas/business';

export interface UpdateBrandRequestDTO {
  readonly brandId: string;
  readonly name?: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly website?: string;
  readonly status?: BrandStatusSchemaType;
  readonly isFeatured?: boolean;
  readonly country?: string;
  readonly actorId?: string;
}
