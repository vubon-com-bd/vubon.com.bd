/**
 * CollectionMapper
 */
import { CollectionEntity } from '../../domain/entities/collection.entity.js';
import type { CollectionResponseDTO } from '../dtos/responses/collection-response.dto.js';
import type { Slug, Url } from '@vubon/shared-types/common';

export class CollectionMapper {
  static toResponse(c: CollectionEntity): CollectionResponseDTO {
    return {
      id: c.id,
      name: c.name.value,
      slug: c.slug.value as Slug,
      description: c.description,
      type: c.type,
      status: c.status,
      imageUrl: c.imageUrl as Url | undefined,
      bannerUrl: c.bannerUrl as Url | undefined,
      productIds: c.productIds,
      productCount: c.productCount,
      isFeatured: c.isFeatured,
      sortOrder: c.sortOrder,
      startAt: c.startAt,
      endAt: c.endAt,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  }

  static toResponseList(collections: readonly CollectionEntity[]): readonly CollectionResponseDTO[] {
    return collections.map((c) => CollectionMapper.toResponse(c));
  }
}
