/**
 * BrandMapper
 */
import { BrandEntity } from '../../domain/entities/brand.entity.js';
import type { BrandResponseDTO } from '../dtos/responses/brand-response.dto.js';
import type { BrandId, Slug, Url } from '@vubon/shared-types/common';

export class BrandMapper {
  static toResponse(b: BrandEntity): BrandResponseDTO {
    return {
      id: b.id as BrandId,
      name: b.name.value,
      slug: b.slug.value as Slug,
      description: b.description,
      logoUrl: b.logo.value as Url | undefined,
      bannerUrl: b.bannerUrl as Url | undefined,
      website: b.website as Url | undefined,
      status: b.status,
      isFeatured: b.isFeatured,
      productCount: b.productCount,
      country: b.country,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
    };
  }

  static toResponseList(brands: readonly BrandEntity[]): readonly BrandResponseDTO[] {
    return brands.map((b) => BrandMapper.toResponse(b));
  }
}
