/**
 * BrandMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { BrandEntity } from '../../domain/entities/brand.entity.js';
import type { BrandStatusValue } from '@vubon/shared-types/business/product';
import type {
  BrandResponseDTO,
  BrandPublicResponseDTO,
  BrandSummaryResponseDTO,
  BrandListResponseDTO,
  BrandStatsResponseDTO,
} from '../dtos/responses/brand-response.dto.js';

export class BrandMapper {
  static toResponse(entity: BrandEntity): BrandResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      description: vo.description,
      logoUrl: vo.logo?.value,
      bannerUrl: vo.bannerUrl,
      website: vo.website,
      status: vo.status as BrandStatusValue,
      isFeatured: vo.isFeatured,
      productCount: vo.productCount,
      country: vo.country,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: BrandEntity): BrandPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      logoUrl: vo.logo?.value,
      productCount: vo.productCount,
    };
  }

  static toSummary(entity: BrandEntity): BrandSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      logoUrl: vo.logo?.value,
      productCount: vo.productCount,
      isFeatured: vo.isFeatured,
    };
  }

  static toListResponse(
    entities: readonly BrandEntity[],
    total: number,
    page: number,
    limit: number,
  ): BrandListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toStatsResponse(stats: {
    total: number;
    activeCount: number;
    featuredCount: number;
    totalProducts: number;
  }): BrandStatsResponseDTO {
    return { ...stats };
  }
}
