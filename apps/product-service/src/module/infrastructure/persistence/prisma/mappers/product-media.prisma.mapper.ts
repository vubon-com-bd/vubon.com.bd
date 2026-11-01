/**
 * ProductMediaPrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductMediaEntity } from '../../../../domain/entities/product-media.entity.js';
import { ProductMediaVO, type ProductMediaItem, type MediaType } from '../../../../domain/value-objects/composites/product-media.vo.js';

export interface PrismaProductMediaRow {
  id: string;
  productId: string;
  items: unknown;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class ProductMediaPrismaMapper {
  static toDomain(raw: PrismaProductMediaRow): ProductMediaEntity {
    const items = Array.isArray(raw.items) ? (raw.items as ProductMediaItem[]) : [];

    const vo = ProductMediaVO.reconstitute({
      productId: raw.productId,
      items: items.map((i) => ({
        url: i.url,
        type: i.type as MediaType,
        alt: i.alt,
        order: i.order,
        isPrimary: i.isPrimary,
      })),
      thumbnailUrl: raw.thumbnailUrl ?? undefined,
      videoUrl: raw.videoUrl ?? undefined,
    });

    return ProductMediaEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
    });
  }

  static toPersistence(entity: ProductMediaEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId,
      items: vo.items.map((i) => ({
        url: i.url,
        type: i.type,
        alt: i.alt,
        order: i.order,
        isPrimary: i.isPrimary,
      })),
      thumbnailUrl: vo.thumbnailUrl ?? null,
      videoUrl: vo.videoUrl ?? null,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
