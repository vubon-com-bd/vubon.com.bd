/**
 * BrandResponseDTO
 */
import type { BrandId, Slug, Url } from '@vubon/shared-types/common';

export interface BrandResponseDTO {
  readonly id: BrandId;
  readonly name: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly logoUrl?: Url;
  readonly bannerUrl?: Url;
  readonly website?: Url;
  readonly status: string;
  readonly isFeatured: boolean;
  readonly productCount: number;
  readonly country?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
