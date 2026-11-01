/**
 * CollectionMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { ProductCollectionEntity } from '../../domain/entities/product-collection.entity.js';
import type {
  CollectionTypeValue,
  CollectionStatusValue,
} from '@vubon/shared-types/business/product';
import type {
  CollectionResponseDTO,
  CollectionPublicResponseDTO,
  CollectionSummaryResponseDTO,
  CollectionListResponseDTO,
  CollectionStatsResponseDTO,
} from '../dtos/responses/collection-response.dto.js';

export class CollectionMapper {
  static toResponse(entity: ProductCollectionEntity): CollectionResponseDTO {
    const vo = entity.vo;
    const now = new Date().toISOString();
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug,
      description: vo.description,
      type: vo.type.value as CollectionTypeValue,
      status: (entity.isActive ? 'active' : 'inactive') as CollectionStatusValue,
      imageUrl: vo.imageUrl,
      bannerUrl: undefined,
      productIds: vo.productIds.map((p) => p.value),
      productCount: vo.productCount,
      isFeatured: vo.isFeatured,
      sortOrder: vo.sortOrder,
      startAt: vo.startAt,
      endAt: vo.endAt,
      isActive: vo.isActive(now),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: ProductCollectionEntity): CollectionPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug,
      imageUrl: vo.imageUrl,
      productCount: vo.productCount,
    };
  }

  static toSummary(entity: ProductCollectionEntity): CollectionSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug,
      type: vo.type.value as CollectionTypeValue,
      productCount: vo.productCount,
      isFeatured: vo.isFeatured,
    };
  }

  static toListResponse(
    entities: readonly ProductCollectionEntity[],
    total: number,
    page: number,
    limit: number,
  ): CollectionListResponseDTO {
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
    totalProductRefs: number;
    byType: Readonly<Record<string, number>>;
  }): CollectionStatsResponseDTO {
    return { ...stats };
  }
}
