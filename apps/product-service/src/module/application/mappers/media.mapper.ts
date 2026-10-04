/**
 * MediaMapper
 */
import { ProductMediaEntity } from '../../domain/entities/product-media.entity.js';
import type { MediaItemDTO } from '../services/interfaces/media.service.interface.js';

export class MediaMapper {
  static toDTO(m: ProductMediaEntity): MediaItemDTO {
    return {
      id: m.id,
      productId: m.productId,
      type: m.type,
      url: m.url,
      thumbnailUrl: m.thumbnailUrl,
      alt: m.alt,
      sortOrder: m.sortOrder,
      sizeBytes: m.sizeBytes,
      isPrimary: m.isPrimary,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    };
  }

  static toDTOList(items: readonly ProductMediaEntity[]): readonly MediaItemDTO[] {
    return items.map((m) => MediaMapper.toDTO(m));
  }
}
